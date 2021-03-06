package com.inn.headstartdemo.security.spring;

import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.inn.headstartdemo.dao.IUsersDao;
import com.inn.headstartdemo.model.UserConfig;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.authentication.DomainAuthenticationToken;
import com.inn.headstartdemo.security.spring.context.ContextProvider;
/**
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public class CustomerInfo {

	public static Map<String, String> getCustomerInfo() 
	{
		// Get the SecurityContext object
		//SecurityContext sc = SecurityContextHolder.getContext();
		SecurityContext sc = SecurityContextHolder.getContextHolderStrategy().getContext();		

		// Get the Authentication object
		Authentication authentication = sc.getAuthentication();
		
		if(authentication == null)
			return null;
		
		// Get the UserDetails object 
		/*
		UserDetails userDetails = (UserDetails) currentUser.getPrincipal();
		Map<String, String> customerInfo = new HashMap<String, String>();
		customerInfo.put("username", userDetails.getUsername());
		*/
		Map<String, String> customerInfo = new HashMap<String, String>();
		if(authentication instanceof DomainAuthenticationToken)
		{
			DomainAuthenticationToken domainAuthenticationToken = (DomainAuthenticationToken)authentication;
			UserDetails userDetails = (UserDetails) domainAuthenticationToken.getPrincipal();
			customerInfo.put("username", userDetails.getUsername());
//			customerInfo.put("userid", domainAuthenticationToken.getUserid().toString());
			customerInfo.put("userid", domainAuthenticationToken.getUserid()+"");
		}
		
		return customerInfo;
	
	}
	public static Integer getCustomerUserId(){
	if(getCustomerInfo()==null)
	{	return null;
	}
	return Integer.parseInt(getCustomerInfo().get("userid"));
	
	}
	public static String getCustomerUsername(){
		if(getCustomerInfo()==null)
			return null;
			return getCustomerInfo().get("username");
		
	}

	public static Users getUserInContext(){
	
		IUsersDao userDao =ContextProvider.getContext().getBean(IUsersDao.class);
		
	return userDao.findByUserName(getCustomerUsername()); 
	}
	public static UserConfig getLocaleInContext(){
			IUsersDao userDao =(IUsersDao)ContextProvider.getContext().getBean(IUsersDao.class);
			return userDao.findByUserName(getCustomerUsername()).getUserConfig();	
					}

}
