package com.inn.headstartdemo.utils;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.inn.headstartdemo.model.UserConfig;
import com.inn.headstartdemo.model.Users;
public class MyOwnExclusionStrategy implements ExclusionStrategy 
{
   @Override
   public boolean shouldSkipClass(Class<?> arg0) 
   {
	// TODO Auto-generated method stub
	return arg0==UserConfig.class;
   }
   @Override
   public boolean shouldSkipField(FieldAttributes arg0)
   {
	// TODO Auto-generated method stub
	return false;
   }
}
