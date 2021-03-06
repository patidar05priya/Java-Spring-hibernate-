package com.inn.headstartdemo.security.mgmt;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import com.inn.headstartdemo.security.spring.PasswordExpiryConstants;

/**
 * Represents a place holder for Password features.
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public class PasswordFeatureBean 
{
	/**
	 * represents the context which holds the value for password features. 
	 */
	private Map<String, Object> context;
	/**
	 * initialize the PasswordFeatureBean with the given parameters.
	 * @param context
	 */
	public PasswordFeatureBean(Map<String, Object> context) 
	{
		if(context == null)
		{
			this.context = new HashMap<String, Object>();
		}
		else
		{
			this.context = context;
		}
	}
	/**
	 * default constructor for the PasswordFeatureBean.
	 */
	public PasswordFeatureBean()
	{
		this.context = new HashMap<String, Object>();
	}
	/**
	 * returns true when first time login feature is switched on.
	 * false if first time login feature is turned off.
	 * @return
	 */
	public boolean isFirstTimeLoginFeature()
	{
		Object ftlFeatureVal = getProperty(PasswordExpiryConstants.FIRST_TIME_CHANGE);
		if(ftlFeatureVal instanceof Integer)
		{
			return ((Integer) ftlFeatureVal).equals(1)? true:false;
		}
		else if(ftlFeatureVal instanceof String)
		{
			return "1".equals(ftlFeatureVal);
		}
		else if(ftlFeatureVal instanceof BigDecimal)
		{
			return (Integer.parseInt(((BigDecimal)ftlFeatureVal).toString())==1);
			
		}
		else if(ftlFeatureVal == null)
		{
			return false;
		}
		else
		{
			throw new IllegalArgumentException("Illegal value for firstTimeLogin feature ["+ftlFeatureVal+"]");
		}
	}
	/**
	 * @return returns the password expiration value set in the bean.
	 */
	public int getPasswordExpiryVal()
	{
		Object pe = getProperty(PasswordExpiryConstants.PASSWORD_EXPIRY);
		int peIntVal;
		if(pe instanceof Integer)
		{
			peIntVal = ((Integer)pe).intValue();
		}
		else if(pe instanceof String)
		{
			peIntVal = Integer.valueOf((String)pe);
		}
		else if(pe instanceof BigDecimal)
		{
			peIntVal = Integer.parseInt(((BigDecimal)pe).toString());
		}
		else
		{
			throw new IllegalArgumentException("Unsupported type for password expiry ["+pe+"] ");
		}
		
		return peIntVal;
	}
	/**
	 * sets the a value associated to key in the context.
	 * @param key
	 * @param value
	 */
	public void setProperty(String key, Object value)
	{
		if(context == null)
		{
			context = new HashMap<String, Object>();
		}
		context.put(key, value);
	}
	/**
	 * gets the value associated to key.
	 * @param key
	 * @return
	 */
	public Object getProperty(String key)
	{
		if(context != null)
		{
			return context.get(key);
		}
		return null; 
	}
	@Override
	public String toString() {
		if(context != null){
			return context.toString();
		}
		else{
			return "[]";
		}
	}
	
}
