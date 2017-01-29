package com.inn.headstartdemo.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;

/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
public class ConfigUtil {
	
	private static Logger logger=LoggerFactory.getLogger(ConfigUtil.class);
	
	/**
	 * Time (in milliseconds) after which all custom indices are recalculated
	 */

	/**
	 * sms email configuration keys
	 */
	public static final String SMS_ID = "SMS_ID";
	public static final String EMAIL_ID = "EMAIL_ID";
	public static final String EMAIL_PASSWORD = "EMAIL_PASSWORD";
	public static final String CONFIG_PROPS="config.properties";
	public static final String DB_PROPS="db.properties";
	public static final String APP_DEPLOY_URL="APP_DEPLOY_URL";
	public static final String APP_LOGIN_URL="APP_LOGIN_URL";
	public static final String ACTIVATION_TEMPALTE="activationmail.vm";
	public static final String BPMN_TEMPLATE="bpmnmail.vm";
	public static final String FORGET_PASSWORD_TEMPALTE="resetPassword.vm";
	public static final String HOST_NAME = "HOST_NAME";
	public static final String SMTP_PORT = "SMTP_PORT";
	public static final String PAGING_VALUE = "PAGING_VALUE";
	public static final String PROTOCOL="PROTOCOL";
	
	public static final String SSL_SOCKETFACTORY="SSL_SOCKETFACTORY";
	public static final String SOCKETFACTORY_FALLBACK="SOCKETFACTORY_FALLBACK";
	public static final String SOCKETFACTORY_PORT="SOCKETFACTORY_PORT";
	public static final String AUTH="AUTH";
	public static final String QUIT_WAIT="QUIT_WAIT";
	
	public static final String DB_CONNECTION_URL = "db.connection.url";
	public static final String DRIVER_CLASSNAME = "driverClassName";
	public static final String DB_CONNECTION_USERNAME = "db.connection.username";
	public static final String DB_CONNECTION_PASSWORD = "db.connection.password";
	
	public static final String FACEBOOK_GRAPH_API_USER_DETAIL_URL="FACEBOOK_GRAPH_API_USER_DETAIL_URL";
	public static final String GOOGLE_USER_DETAIL_URL="GOOGLE_USER_DETAIL_URL";
	public static final String FACEBOOK_APP_CLIENTID="FACEBOOK_APP_CLIENTID";
	public static final String FACEBOOK_APP_CLIENTKEY="FACEBOOK_APP_CLIENTKEY";
	public static final String DEFAULT_IMAGE_PATH="DEFAULT_IMAGE_PATH";	
	public static final String EXPIRY_NOTIFICATION_DURATION="EXPIRY_NOTIFICATION_DURATION";
	public static final String DEFAULT_EXPIRY_INTERVAL="DEFAULT_EXPIRY_INTERVAL";
	public static final String MAX_ATTEMPTS="MAX_ATTEMPTS";
	public static final String SECURITY_COOKIE_CSRF_NAME="SECURITY_COOKIE_CSRF_NAME";
	public static final String SECURITY_COOKIE_CSRF_TOKEN="csrfParam";
	

	
	
	
	
	private static PropertiesConfiguration config;
	
	private static PropertiesConfiguration dbConfig;
	
	static
	{
		try {
			config = new PropertiesConfiguration(CONFIG_PROPS);
			config.setReloadingStrategy(new FileChangedReloadingStrategy());
		} catch (ConfigurationException e) {
			// TODO Auto-generated catch block
			  logger.error(e.getMessage());
		}
		
		try {
			dbConfig = new PropertiesConfiguration(DB_PROPS);
			dbConfig.setReloadingStrategy(new FileChangedReloadingStrategy());
		} catch (ConfigurationException e) {
			// TODO Auto-generated catch block
		  logger.error(e.getMessage());
		}
		
	}
	
	
	
	public static String getConfigProp(String key)
	{		
			return (String) config.getProperty(key);
	}
	
	public static void  setConfigProp(String key,String value)
	{		
			 config.setProperty(key,value);
			 try {
				config.save();
			} catch (ConfigurationException e) {
			  logger.error(e.getMessage());
			}
	}
	
	
	public static String getDbProp(String key)
	{		
			return (String) dbConfig.getProperty(key);
	}
	
	public static void  setDbProp(String key,String value)
	{		
		dbConfig.setProperty(key,value);
			 try {
				 dbConfig.save();
			} catch (ConfigurationException e) {
				  logger.error(e.getMessage());
			}
	}
	
	
}
