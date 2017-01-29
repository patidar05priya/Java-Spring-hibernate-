package com.inn.headstartdemo.utils;
public class StringUtils {

	public static boolean hasValue(String value) 
	{
		if(value == null || value.trim().length() == 0)
		{	return false; }
		return true;
	}

}
