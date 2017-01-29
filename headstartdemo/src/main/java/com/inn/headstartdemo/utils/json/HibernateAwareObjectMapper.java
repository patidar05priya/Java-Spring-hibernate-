package com.inn.headstartdemo.utils.json;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.MappingJsonFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig.Feature;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.module.SimpleModule;
import org.owasp.esapi.ESAPI;
import org.springframework.stereotype.Component;
import org.codehaus.jackson.map.ser.BeanSerializerFactory;

public class HibernateAwareObjectMapper extends ObjectMapper {

	
	public HibernateAwareObjectMapper() {
		/**
		 * Serialization stuff
		 */	
		super(new MappingJsonFactory());
		
		// construct a serializer factory
		
		setSerializerFactory(new HibernateAwareSerializerFactory(
				new BeanSerializerFactory.ConfigImpl()));	
		

	}
	
	 
	public void setPrettyPrint(boolean prettyPrint) {
		configure(Feature.INDENT_OUTPUT, prettyPrint);		
	}
	
	private class BooleanDeserializer<T extends Object> extends
			JsonDeserializer<Boolean> {
		final protected Class<?> valueClass = Boolean.class;

		@Override
		public Boolean deserialize(JsonParser jp, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
		
			return _parseBooleanPrimitive2(jp, ctxt);
		}

		protected final boolean _parseBooleanPrimitive2(JsonParser jp,
				DeserializationContext ctxt) throws IOException,
				JsonProcessingException {
			JsonToken t = jp.getCurrentToken();
			if (t == JsonToken.VALUE_TRUE) {
				return true;
			}
			if (t == JsonToken.VALUE_FALSE) {
				return false;
			}
			if (t == JsonToken.VALUE_NULL) {
				return false;
			}
			if (t == JsonToken.VALUE_NUMBER_INT) {
				return (jp.getIntValue() != 0);
			}
			if (t == JsonToken.VALUE_STRING) {
				String text = jp.getText().trim();
				if ("true".equals(text)) {
					return true;
				}
				if ("false".equals(text) || text.length() == 0) {
					return Boolean.FALSE;
				}

				if ("0".equals(text) || text.length() == 0) {
					return Boolean.FALSE;
				}

				if ("1".equals(text)) {
					return Boolean.TRUE;
				}
				throw ctxt.weirdStringException(valueClass,
						"only \"true\" or \"false\" recognized");
			}
		
			throw ctxt.mappingException(valueClass);
		}
	}

	private class AtomicBooleanDeserializer2<T extends Object> extends
			JsonDeserializer<AtomicBoolean> {
		final protected Class<?> valueClass = AtomicBoolean.class;

		@Override
		public AtomicBoolean deserialize(JsonParser jp,
				DeserializationContext ctxt) throws IOException,
				JsonProcessingException {
			return new AtomicBoolean(_parseBooleanPrimitive2(jp, ctxt));
		}

		protected final boolean _parseBooleanPrimitive2(JsonParser jp,
				DeserializationContext ctxt) throws IOException,
				JsonProcessingException {

			JsonToken t = jp.getCurrentToken();
			if (t == JsonToken.VALUE_TRUE) {
				return true;
			}
			if (t == JsonToken.VALUE_FALSE) {
				return false;
			}
			if (t == JsonToken.VALUE_NULL) {
				return false;
			}
			if (t == JsonToken.VALUE_NUMBER_INT) {
				return (jp.getIntValue() != 0);
			}
			if (t == JsonToken.VALUE_STRING) {
				String text = jp.getText().trim();
				if ("true".equals(text)) {
					return true;
				}
				if ("false".equals(text) || text.length() == 0) {
					return Boolean.FALSE;
				}

				if ("0".equals(text) || text.length() == 0) {
					return Boolean.FALSE;
				}

				if ("1".equals(text)) {
					return Boolean.TRUE;
				}
				throw ctxt.weirdStringException(valueClass,
						"only \"true\" or \"false\" recognized");
			}
			// Otherwise, no can do:
			throw ctxt.mappingException(valueClass);
		}

	}
}
