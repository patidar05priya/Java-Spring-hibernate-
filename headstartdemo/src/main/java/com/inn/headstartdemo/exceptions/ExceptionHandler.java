 package com.inn.headstartdemo.exceptions;
 
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * This annotation shall be used over the method to handle exception thrown by the method. 
 * 
 * @author
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface ExceptionHandler {
	
	boolean applyToAllMethods() default false;
	
	
}
 