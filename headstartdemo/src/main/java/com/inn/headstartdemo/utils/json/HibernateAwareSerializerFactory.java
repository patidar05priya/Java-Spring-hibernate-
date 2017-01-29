package com.inn.headstartdemo.utils.json;

import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.owasp.esapi.ESAPI;
import javax.persistence.Transient;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.BeanProperty;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.SerializerFactory;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.introspect.BasicBeanDescription;
import org.codehaus.jackson.map.ser.BeanPropertyWriter;
import org.codehaus.jackson.map.ser.BeanSerializerFactory;
import org.codehaus.jackson.type.JavaType;
import org.hibernate.collection.spi.PersistentCollection;
import org.hibernate.collection.internal.PersistentMap;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.BeanUtils;
import org.springframework.core.annotation.AnnotationUtils;


public class HibernateAwareSerializerFactory extends BeanSerializerFactory {
	
	public HibernateAwareSerializerFactory(SerializerFactory.Config config) {
		super(config);
	}

	/**
	 * Name of the property added during build-time byte-code instrumentation by
	 * Hibernate. It must be filtered out.
	 */
	private static final String FIELD_HANDLER_PROPERTY_NAME = "handler";
	private static final String HIBERNATE_LAZY_INITIALIZER = "hibernateLazyInitializer";
	@Override
	public JsonSerializer<Object> createSerializer(SerializationConfig serializationConfig,
			JavaType javaType, BeanProperty beanProperty) {

		Class<?> clazz = javaType.getRawClass();

		// check for all Hibernate proxy invariants and build custom serializers
		// for them
			if(String.class.isAssignableFrom(clazz)){
			return new JsonHtmlXssSerializer();
		}else{
			return super.createSerializer(serializationConfig, javaType, beanProperty);
			
		}

	}

	/**
	 * The purpose of this method is to filter out {@link Transient} properties
	 * of the bean from JSON rendering.
	 */
	@Override
	protected List<BeanPropertyWriter> filterBeanProperties(
			SerializationConfig config, BasicBeanDescription beanDesc,
			List<BeanPropertyWriter> props) {
		// filter out standard properties (e.g. those marked with @JsonIgnore)
		props = super.filterBeanProperties(config, beanDesc, props);

		filterInstrumentedBeanProperties(beanDesc, props);

		// now filter out the @Transient ones as they may trigger "lazy"
		// exceptions by
		// referencing non-initialized properties
		List<String> transientOnes = new ArrayList<String>();
		// BeanUtils and AnnotationUtils are utility methods that come from
		// the Spring Framework
		for (PropertyDescriptor pd : BeanUtils.getPropertyDescriptors(beanDesc
				.getBeanClass())) {
			Method getter = pd.getReadMethod();
			if (getter != null
					&& AnnotationUtils.findAnnotation(getter, Transient.class) != null) {
				transientOnes.add(pd.getName());
			}
		}

		// remove transient
		for (Iterator<BeanPropertyWriter> iter = props.iterator(); iter
				.hasNext();) {
			if (transientOnes.contains(iter.next().getName())) {
				iter.remove();
			}
		}

		return props;
	}

	private void filterInstrumentedBeanProperties(
			BasicBeanDescription beanDesc, List<BeanPropertyWriter> props) {

		// all beans that have build-time instrumented lazy-loaded properties
		// will implement FieldHandled interface.

		for (Iterator<BeanPropertyWriter> iter = props.iterator(); iter
				.hasNext();) {
			BeanPropertyWriter beanPropertyWriter = iter.next();

			if (beanPropertyWriter.getName()
					.equals(FIELD_HANDLER_PROPERTY_NAME)
					|| beanPropertyWriter.getName().equals(
							HIBERNATE_LAZY_INITIALIZER)) {
				iter.remove();
			}
		}
	}

	/**
	 * The purpose of this class is to perform graceful handling of custom
	 * Hibernate collections.
	 */
	private class PersistentCollectionSerializer extends JsonSerializer<Object> {
		private final JavaType javaType;
		private final SerializationConfig serializationConfig;
		private final BeanProperty beanProperty;

		public PersistentCollectionSerializer(
				SerializationConfig serializationConfig, JavaType javaType,
				BeanProperty beanProperty) {
			this.serializationConfig = serializationConfig;
			this.javaType = javaType;
			this.beanProperty = beanProperty;
		}

		@Override
		@SuppressWarnings("unchecked")
		public void serialize(Object value, JsonGenerator jgen,
				SerializerProvider provider) throws IOException {
			// avoid lazy initialization exceptions
			if (((PersistentCollection) value).wasInitialized()) {
				// construct an actual serializer from the built-in ones
				BasicBeanDescription basicBeanDescription = serializationConfig
						.introspect(javaType);

				JsonSerializer<Object> serializer = null;

				if (PersistentMap.class
						.isAssignableFrom(javaType.getRawClass())) {
					serializer = (JsonSerializer<Object>) buildMapSerializer(
							serializationConfig, javaType,
							basicBeanDescription, beanProperty);
				} else {
					serializer = (JsonSerializer<Object>) buildCollectionSerializer(
							serializationConfig, javaType,
							basicBeanDescription, beanProperty);
				}

				// delegate serialization to a built-in serializer
				serializer.serialize(value, jgen, provider);

			} else {
				jgen.writeNull();
			}

		}
	}

	/**
	 * The purpose of this class is to perform graceful handling of
	 * HibernateProxy objects.
	 */
	private class HibernateProxySerializer extends JsonSerializer<Object> {
		private final JavaType javaType;
		private final SerializationConfig serializationConfig;
		private final BeanProperty beanProperty;

		private HibernateProxySerializer(
				SerializationConfig serializationConfig, JavaType javaType,
				BeanProperty beanProperty) {
			this.serializationConfig = serializationConfig;
			this.javaType = javaType;
			this.beanProperty = beanProperty;
		}

		@Override
		public void serialize(Object value, JsonGenerator jgen,
				SerializerProvider provider) throws IOException {

			if (((HibernateProxy) value).getHibernateLazyInitializer()
					.isUninitialized()) {
				jgen.writeNull();
			} else {

				BasicBeanDescription basicBeanDescription = serializationConfig
						.introspect(javaType);

				JsonSerializer<Object> serializer = findBeanSerializer(
						serializationConfig, javaType, basicBeanDescription,
						beanProperty);

				// delegate serialization to a build-in serializer
				serializer.serialize(value, jgen, provider);
				
			}

		}
	}
	public class JsonHtmlXssSerializer extends JsonSerializer<Object> {	
		
		public JsonHtmlXssSerializer(){
			
		}
			   public void serialize(Object value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {			   
			      if (value != null) {
			    	 
			         String encodedValue = encodeHtml(value.toString());
			         jsonGenerator.writeString(encodedValue);
			      }
			   }
			   protected String encodeHtml(String html) {

					html=ESAPI.encoder().canonicalize(html,false,false);			 			 
					   return ESAPI.encoder().encodeForHTML(html);
					   
					}
				  
			}
}
