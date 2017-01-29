package com.inn.headstartdemo.utils;

import java.io.File;



import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import javassist.CannotCompileException;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.NotFoundException;

public class ClassUtils {

	private static Logger logger = LoggerFactory.getLogger(ClassUtils.class);

	
	/**
	 * Returns true if class is a user defined class. 
	 * @param c1
	 * @return
	 */
	public static boolean isUserDefined(Class cl){
		
		if(isSimpleType(cl))
		{		return false;
		}
		if(Collection.class.isAssignableFrom(cl))
		{	return false;
		}
		if(cl.isArray())
		{	return false;
		}
		return true;
		
	}

	
	/**
	 * Return list of class files that exists under passed class directory
	 * having packageName
	 * 
	 * @param classDirectory
	 * @param packageName
	 * @return
	 */
	public static List<Class<Object>> findClassesFromPackage(
			String classDirectoryPath, String packageName)
			throws ClassNotFoundException {

		File classDirectory = new File(classDirectoryPath);

		List<Class<Object>> classes = new ArrayList<Class<Object>>();

		ClassPool pool = ClassPool.getDefault();
		String packagePath = packageName.replaceAll("\\.", "/");

		File packageDir = new File(classDirectory.getPath() + "/" + packagePath);

		try {
			pool.insertClassPath(classDirectory.getPath());

		} catch (NotFoundException e1) {
		 logger.error(e1.getMessage());
			throw new ClassNotFoundException();
		}

		File[] files = packageDir.listFiles();

		if (files != null)
			{for (File file : files) {
				if (file.isDirectory()) {
					continue;
				} else if (file.getName().endsWith(".class")) {

					String completeClassName = packageName + "."
							+ file.getName().replaceFirst(".class", "");

				

					logger.debug("Trying to load class [" + completeClassName
							+ "]");

					try {
						CtClass ctClass = pool.get(completeClassName);
						Class webServiceClass = ctClass.toClass();
						classes.add(webServiceClass);

					} catch (NotFoundException e) {
						 logger.error(e.getMessage());
						throw new ClassNotFoundException("Class ["
								+ completeClassName + "] not found");
					} catch (CannotCompileException e) {
						 logger.error(e.getMessage());
						throw new ClassNotFoundException("Class ["
								+ completeClassName + "] cannot be compiled");
					}

					logger.debug("Successfully loaded class ["
							+ completeClassName + "]");

				}
}
			}

		return classes;
	}

	/**
	 * returns list of classes whose names are passed as second param. Classes
	 * will be searched in classDirectorypath
	 * 
	 * @param classDirectoryPath
	 * @param classNames
	 * @return
	 */
	public static List<Class<Object>> findClasses(String classDirectoryPath,
			String[] classNames) throws ClassNotFoundException {

		File classDirectory = new File(classDirectoryPath);

		List<Class<Object>> classes = new ArrayList<Class<Object>>();

		ClassPool pool = ClassPool.getDefault();

		try {
			pool.insertClassPath(classDirectory.getPath());

		} catch (NotFoundException e1) {
		 logger.error(e1.getMessage());
		}

		if (classNames != null)
		{	for (String className : classNames) {

				try {
					CtClass ctClass = pool.get(className);
					Class webServiceClass = ctClass.toClass();
					classes.add(webServiceClass);
				} catch (NotFoundException e) {
				 logger.error(e.getMessage());
					throw new ClassNotFoundException();
				} catch (CannotCompileException e) {
				 logger.error(e.getMessage());
				}

		}	}
		return classes;
	}

	public static InputStream getResource(ArrayList<String> cpDirs,
			String resourcePath) {
		URLClassLoader loader = new URLClassLoader(new URL[] {});

		if (cpDirs != null) {
			// Add directories to classpath
			for (String dir : cpDirs) {
				File file = new File(dir);
				try {
					Method method = loader.getClass().getDeclaredMethod(
							"addURL", new Class[] { URL.class });
					method.setAccessible(true);
					method
							.invoke(loader,
									new Object[] { file.toURI().toURL() });
				} catch (Exception t) {
				 logger.error(t.getMessage());
				}
			}
		}

		InputStream stream = loader.getResourceAsStream(resourcePath);

		return stream;

	}

	public static List<Class<Object>> findClassesFromPackages(
			String classDirectoryPath, List<String> packageNames)
			throws ClassNotFoundException {
		List<Class<Object>> jpaClasses = new LinkedList<Class<Object>>();

		if (packageNames != null) {
			for (String packageName : packageNames) {
				List<Class<Object>> temp = findClassesFromPackage(
						classDirectoryPath, packageName);

				if (temp != null && !temp.isEmpty())
				{		jpaClasses.addAll(temp);
				}
			}
		}

		return jpaClasses;
	}

	public static void writeFile(String dir, String fileName, String contents)
{
		File f = new File(dir);

		if (!f.exists()) {
			f.mkdirs();
		}

		File touch = new File(f, fileName);

		FileWriter w = null;
	try {
		w = new FileWriter(touch);
		
			w.write(contents);
		
		w.flush();
		w.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			 logger.error(e.getMessage());
		}

	}

	/**
	 * returns true if class is of simple type like Integer,Long, Short, String,
	 * Date or Enum etc.
	 * 
	 * @param cl
	 * @return
	 */
	public static boolean isSimpleType(Class cl) {
		if (Number.class.isAssignableFrom(cl)
				|| String.class.isAssignableFrom(cl)
				|| Date.class.isAssignableFrom(cl)
				|| Enum.class.isAssignableFrom(cl)|| cl.isPrimitive()||
				  Boolean.class.isAssignableFrom(cl))
		{		return true;
		}
		return false;

	}
	
	


	public static Class<Object> getParameterizedClass(Field field) {
		if (Collection.class.isAssignableFrom(field.getType())) {
			Type type = field.getGenericType();

			if (type instanceof ParameterizedType) {
				ParameterizedType aType = (ParameterizedType) type;
				Type[] fieldArgTypes = aType.getActualTypeArguments();
				for (Type fieldArgType : fieldArgTypes) {
					return (Class) fieldArgType;
				}
			}
		}

		return null;
	}

}
