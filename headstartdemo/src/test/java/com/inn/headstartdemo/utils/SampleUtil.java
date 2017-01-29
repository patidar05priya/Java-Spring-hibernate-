package com.inn.headstartdemo.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;


/**
 * Utility class to generate Sample object using the provided class
 * 
 * @author 
 * 
 */
public final class SampleUtil {
	/**
	 * Method to store transient properties of the class
	 */
	public static Map<String, Boolean> xmlTransientMap = new HashMap<String, Boolean>();

	/**
	 * Method remove generic as Sample generation will not be possible with
	 * generic
	 * 
	 * @param name
	 * @return String
	 */
	public static String unGenerify(String name) {
		if (name != null && name.contains("<")) {
			int ltStartIndex = name.indexOf("<");
			name = name.substring(0, ltStartIndex);
		}
		return getWrapperForPrimitive(name) == null ? name
				: getWrapperForPrimitive(name);
	}

	/**
	 * Enum to store the types of TestCategories
	 * 
	 * @author 
	 *
	 */
	public static enum TestCategory {
		Fault, Updated, Default, ServiceFault, ServiceUpdated, ServiceDefault
	};
	
	public static HashMap<Object, Class> custom = new HashMap();
	public static HashMap<Object, Class> primitive = new HashMap();
	/**
	 * Method to get the Testing Values for the objects
	 * 
	 * @param category Type of Testing
	 * @param inputClass Class for which sample values to be generated
	 * @param recursion If the class to be recursively parsed
	 * @param methodName
	 * @param packageType
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Object getTestValue(TestCategory category, Class inputClass,
			Set<Class> recursion, String methodName, String packageType)
	throws Exception {
		Object result=null;
		
		// System.out.println("Parameter Type "+type.getSimpleName());
		// System.out.println("MethodName["+methodName+"] PackageType["+packageType+"] type ["
		// + type +"]");
		if (!requiredParsing(inputClass)) {
			if (category.equals(TestCategory.Fault)) {
				result = faultValueMap.get(inputClass);
			} else if (category.equals(TestCategory.Updated)) {
				result =  updatedValueMap.get(inputClass);
			} else if (category.equals(TestCategory.Default)) {
				result =  defaultValueMap.get(inputClass);
			} else if (category.equals(TestCategory.ServiceFault)) {
				result =  serviceFaultValueMap.get(inputClass);
			} else if (category.equals(TestCategory.ServiceUpdated)) {
				result =  serviceUpdatedValueMap.get(inputClass);
			} else if (category.equals(TestCategory.ServiceDefault)) {
				result =  serviceDefaultValueMap.get(inputClass);
			}
			//primitive.put(inputClass, result);
			return result;
		} 
		else {
			if (recursion == null) {
				recursion = new HashSet<Class>();
			}
			if (inputClass.getSimpleName().startsWith("Set")
					|| inputClass.getSimpleName().startsWith("List")) {
				if (methodName != null && packageType != null) {
					Collection coll = null;
					String typeClassName = packageType + "."
					+ methodName.substring(3, methodName.length() - 1);
					// System.out.println("Collection encountered of type["+typeClassName+"]");
					// System.out.println("recursion["+recursion+"]");
					Class entityAttribClass = null;
					try {
						//System.out.println("typeClassName : " + typeClassName);
						entityAttribClass = Class.forName(typeClassName);
					} catch (Exception e) {
						System.out.println(e.getMessage());
						return null;
					}
					// System.out.println("working on ["+entityAttribClass+"] contains["+recursion.contains(entityAttribClass)+"]");

					if (inputClass.getSimpleName().startsWith("Set")) {
						coll = new HashSet();
					} else if (inputClass.getSimpleName().startsWith("List")) {
						coll = new ArrayList();
					}

					if (!recursion.contains(entityAttribClass)) {
						// recursion.add(entityAttribClass);
						Object obj=getTestValue(category, entityAttribClass,
								recursion, methodName, packageType);
						coll.add(obj);
						//custom.put(entityAttribClass, obj);
						return coll;
					} else {
						return null;
					}
				}
				return null;
			}
			if (!recursion.contains(inputClass)) {

				recursion.add(inputClass);
				Field[] fields = inputClass.getDeclaredFields();
				for(Field field:fields)
				{
					if(!requiredParsing(field.getType()))
					{
						//System.out.println("Primitive : " + inputClass + " " + field.getType() + " " + field.getName());
						primitive.put(field.getName(), inputClass);
					}
					else
					{
						//System.out.println("Custom : " + inputClass + " " + field.getType() + " " + field.getName());
						custom.put(field.getName(), inputClass);
					}
				}
				Object obj = getTestObject(category, inputClass, recursion, packageType);
				//custom.put(inputClass, obj);
				return obj;
			} else {
				if(!hasCustomObject(inputClass))
				{
					Object obj = getTestObject(category, inputClass, recursion, packageType);
					return obj;
				}
				else
				{
					return null;
				}
			}
		}
	}
	/**
	 * Method to get Testing objects
	 * @param category
	 * @param inputClass
	 * @param recursion
	 * @param pkgName
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Object getTestObject(TestCategory category,
			Class inputClass, Set<Class> recursion, String pkgName)
	throws Exception {
		//System.out.println("Getting object...........................");
		//System.out.println("input[" + inputClass + "] recursion[" + recursion
//				+ "]");
		Object obj = inputClass.getConstructor(null).newInstance(null);
		Method[] methArray = inputClass.getDeclaredMethods();
		if(recursion==null)
		{
			recursion = new HashSet();
			recursion.add(inputClass);
		}
		for (int i = 0; i < methArray.length; i++) {
			//System.out.println("Method : " + methArray[i].getName());
			// System.out.println("isXMLTransient(methArray[i], inputClass) "+isXMLTransient(methArray[i],
			// inputClass));
			if (methArray[i].getName().startsWith("set")
					&& !isXMLTransient(methArray[i], inputClass)) {
				//System.out.println("calling setter ["+methArray[i].getName()+"]");
				Class[] parameters = methArray[i].getParameterTypes();

				List<Object> argumets = new ArrayList<Object>();
				for (int j = 0; j < parameters.length; j++) {
					//System.out.println("Param : " + parameters[j]);
					if (category.equals(TestCategory.Updated)
							&& methArray[i].getName().endsWith("Id")) {
					
						argumets.add(getTestValue(TestCategory.Default,
								parameters[j], recursion, methArray[i]
								                                    .getName(), pkgName));
					} else if (category.equals(TestCategory.ServiceUpdated)
							&& methArray[i].getName().endsWith("Id")) {
						
						argumets.add(getTestValue(TestCategory.ServiceDefault,
								parameters[j], recursion, methArray[i]
								                                    .getName(), pkgName));
					} else {
						argumets.add(getTestValue(category, parameters[j],
								recursion, methArray[i].getName(), pkgName));
					}
				}
				//System.out.println("invoking method ["+methArray[i].getName()+"] with parameters["+argumets+"]");
				//System.out.println("object ["+obj.getClass()+"] obj["+obj+"]");
				methArray[i].invoke(obj, argumets.toArray());
			}
		}
		return obj;
	}
	/**
	 * Method to check the variable in transient
	 * 
	 * @param meth
	 * @param inputClass
	 * @return
	 */
	private static boolean isXMLTransient(Method meth, Class inputClass) {
		String genKey = inputClass.getName();
		genKey += "." + meth.getName().toLowerCase().charAt(3)
		+ meth.getName().substring(4);
		// System.out.println("Gen Key ["+genKey+"]");
		if (null != xmlTransientMap.get(genKey))
			return xmlTransientMap.get(genKey);
		else
			return false;
	}
	/**
	 * Method to check the property require parsing. 
	 * Primitive types values can be directly setup
	 * 
	 * @param type
	 * @return
	 */
	public static boolean requiredParsing(Class type) {
		return !defaultValueMap.keySet().contains(type);
	}
	/**
	 * 
	 * @return
	 */
	public static boolean hasCustomObject(Class clazz)
	{
		Field[] fields = clazz.getDeclaredFields();
				
		for(Field field: fields)
		{
			Class type = field.getType();
			if (requiredParsing(type))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 
	 * @param fullName
	 * @return
	 */
	public static String fetchGenerifed(String fullName) {
		if (fullName.contains("<")) {
			return fullName.substring(fullName.indexOf("<") + 1, fullName
					.indexOf(">"))
					+ ".class";
		} else {
			return "null";
		}

	}

	/**
	 * Method get Wrapper class for primitive types
	 * @param name
	 * @return
	 */
	private static String getWrapperForPrimitive(String name) {
		// TODO Auto-generated method stub
		return wrapperMap.get(name);
	}

	/**
	 * Method to create sample Files
	 * 
	 * @param testSamplesDirectoryName
	 * @param sampleFileName
	 * @return
	 * @throws IOException
	 */
	public static File createFile(String testSamplesDirectoryName,
			String sampleFileName) throws IOException {
		File file = new File(testSamplesDirectoryName + "/" + sampleFileName);
		if (file.exists()) {
			file.delete();
			file.createNewFile();
		} else {
			File testDirectory = new File(testSamplesDirectoryName);
			testDirectory.mkdirs();
			file = new File(testSamplesDirectoryName + "/" + sampleFileName);
			file.createNewFile();
		}
		return file;
	}

	/**
	 * Map to store mapping of primitive and corresponding Wrapper 
	 */
	private static Map<String, String> wrapperMap = new HashMap<String, String>();
	static {
		wrapperMap.put("int", "Integer");
		wrapperMap.put("float", "Float");
		wrapperMap.put("long", "Long");
		wrapperMap.put("double", "Double");
		wrapperMap.put("boolean", "Boolean");
	}
	/**
	 * Map to store default values for primitive and Wrapper types
	 */
	private static Map<Class, Object> defaultValueMap = new HashMap<Class, Object>();
	static {
		defaultValueMap.put(Integer.class, new Integer(1));
		defaultValueMap.put(Float.class, new Float(1.0f));
		defaultValueMap.put(String.class, "default");
		defaultValueMap.put(Long.class, new Long(1));
		defaultValueMap.put(Double.class, new Double(1.11d));
		defaultValueMap.put(int.class, new Integer(1));
		defaultValueMap.put(float.class, new Float(1.0f));
		defaultValueMap.put(long.class, new Long(1));
		defaultValueMap.put(double.class, new Double(1.11d));
		defaultValueMap.put(boolean.class, new Boolean("true"));
		defaultValueMap.put(Boolean.class, new Boolean("true"));
		defaultValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 */
	private static Map<Class, Object> updatedValueMap = new HashMap<Class, Object>();
	static {
		updatedValueMap.put(Integer.class, new Integer(2));
		updatedValueMap.put(Float.class, new Float(2.0f));
		updatedValueMap.put(String.class, "updated");
		updatedValueMap.put(Long.class, new Long(2));
		updatedValueMap.put(Double.class, new Double(2.22d));
		updatedValueMap.put(int.class, new Integer(2));
		updatedValueMap.put(float.class, new Float(2.0f));
		updatedValueMap.put(long.class, new Long(2));
		updatedValueMap.put(double.class, new Double(2.22d));
		updatedValueMap.put(boolean.class, new Boolean("true"));
		updatedValueMap.put(Boolean.class, new Boolean("true"));
		updatedValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 */
	private static Map<Class, Object> faultValueMap = new HashMap<Class, Object>();
	static {
		faultValueMap.put(Integer.class, new Integer(-1));
		faultValueMap.put(Float.class, new Float(-1.0f));
		faultValueMap.put(String.class, "fault");
		faultValueMap.put(Long.class, new Long(-1));
		faultValueMap.put(Double.class, new Double(-1.11d));
		faultValueMap.put(int.class, new Integer(-1));
		faultValueMap.put(float.class, new Float(-1.0f));
		faultValueMap.put(long.class, new Long(-1));
		faultValueMap.put(double.class, new Double(-1.11d));
		faultValueMap.put(boolean.class, new Boolean("true"));
		faultValueMap.put(Boolean.class, new Boolean("true"));
		faultValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 */
	private static Map<Class, Object> serviceDefaultValueMap = new HashMap<Class, Object>();
	static {
		serviceDefaultValueMap.put(Integer.class, new Integer(2));
		serviceDefaultValueMap.put(Float.class, new Float(2.0f));
		serviceDefaultValueMap.put(String.class, "svcDefault");
		serviceDefaultValueMap.put(Long.class, new Long(2));
		serviceDefaultValueMap.put(Double.class, new Double(2.22d));
		serviceDefaultValueMap.put(int.class, new Integer(2));
		serviceDefaultValueMap.put(float.class, new Float(2.0f));
		serviceDefaultValueMap.put(long.class, new Long(2));
		serviceDefaultValueMap.put(double.class, new Double(2.22d));
		serviceDefaultValueMap.put(boolean.class, new Boolean("true"));
		serviceDefaultValueMap.put(Boolean.class, new Boolean("true"));
		serviceDefaultValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 */
	private static Map<Class, Object> serviceUpdatedValueMap = new HashMap<Class, Object>();
	static {
		serviceUpdatedValueMap.put(Integer.class, new Integer(3));
		serviceUpdatedValueMap.put(Float.class, new Float(3.0f));
		serviceUpdatedValueMap.put(String.class, "svcUpdated");
		serviceUpdatedValueMap.put(Long.class, new Long(3));
		serviceUpdatedValueMap.put(Double.class, new Double(3.33d));
		serviceUpdatedValueMap.put(int.class, new Integer(3));
		serviceUpdatedValueMap.put(float.class, new Float(3.0f));
		serviceUpdatedValueMap.put(long.class, new Long(3));
		serviceUpdatedValueMap.put(double.class, new Double(3.33d));
		serviceUpdatedValueMap.put(boolean.class, new Boolean("true"));
		serviceUpdatedValueMap.put(Boolean.class, new Boolean("true"));
		serviceUpdatedValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 */
	private static Map<Class, Object> serviceFaultValueMap = new HashMap<Class, Object>();
	static {
		serviceFaultValueMap.put(Integer.class, new Integer(-2));
		serviceFaultValueMap.put(Float.class, new Float(-2.0f));
		serviceFaultValueMap.put(String.class, "svcFault");
		serviceFaultValueMap.put(Long.class, new Long(-2));
		serviceFaultValueMap.put(Double.class, new Double(-2.22d));
		serviceFaultValueMap.put(int.class, new Integer(-2));
		serviceFaultValueMap.put(float.class, new Float(-2.0f));
		serviceFaultValueMap.put(long.class, new Long(-2));
		serviceFaultValueMap.put(double.class, new Double(-2.22d));
		serviceFaultValueMap.put(boolean.class, new Boolean("true"));
		serviceFaultValueMap.put(Boolean.class, new Boolean("true"));
		serviceFaultValueMap.put(Date.class, new Date());

	}
	/**
	 * 
	 * @param obj
	 * @return
	 * @throws JAXBException
	 */
	public static String ObjectToXMLString (Object obj) throws JAXBException
	{
        JAXBContext context = JAXBContext.newInstance(obj.getClass());
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        marshaller.marshal(obj, out);
        return out.toString();
	}
	
	/**
	 * 
	 * @param obj
	 * @return
	 * @throws JAXBException
	 */
	public static Object XMLStringToObject (String xml, Object obj) throws JAXBException
	{
		//TODO
//        JAXBContext context = JAXBContext.newInstance(obj.getClass());
//        Marshaller marshaller = context.createMarshaller();
//        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
//        ByteArrayOutputStream out=new ByteArrayOutputStream();
//        marshaller.marshal(obj, out);
//        return out.toString();
		return null;
	}
	/**
	 * 
	 * @param input
	 * @return
	 */
	public static Object[][] to2DArray(Object input) 
	{
		if(input == null || !input.getClass().equals(List.class))
			return null;

		Object[] arrayoflist = ((List)input).toArray();
		Object[][] result = new Object[arrayoflist.length][];
		for (int i = 0; i < result.length; i++) {
			if(arrayoflist[i] instanceof List)
				result[i] = ((List<String>)arrayoflist[i]).toArray();
			else
				result[i] = new Object[]{arrayoflist[i]};
		}
		//System.out.println(result);
		return result;
	}
	/**
	 * 
	 * @param args
	 */
//	public static void main(String[] args) {
//		try {
//			Object obj = SampleUtil.getTestObject(
//					TestCategory.Default, com.inn.saas.model.Order.class,
//					null, "com.inn.saas.model");
//			//System.out.println(obj.toString());
//			System.out.println(SampleUtil.ObjectToXMLString(obj));
//			//System.out.println(SampleUtil.hm.toString());
//			for(Object key : SampleUtil.custom.keySet()) {
//			    Class value = SampleUtil.custom.get(key);
//			    System.out.println("Custom : " + key + " = " + value);
//			    if(SampleUtil.requiredParsing(value))
//			    {
//			    	//System.out.println(SampleUtil.ObjectToXMLString(value));
//			    	
//			    }
//			}
//			for(Object key : SampleUtil.primitive.keySet()) {
//			    Class value = SampleUtil.primitive.get(key);
//			    System.out.println("Primitive" + key + " = " + value);
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
}
