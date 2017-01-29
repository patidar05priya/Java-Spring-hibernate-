package com.inn.headstartdemo.utils;

public class SmtpConfig {

	
	private String hostName;
	private String userName;
	private String port;
	private String password;
	private String expiryNotificationDuration;
	private String defaultExpiryInterval;
	private String maxAttempts;
	
	
	public String getExpiryNotificationDuration() {
		return expiryNotificationDuration;
	}
	public void setExpiryNotificationDuration(String expiryNotificationDuration) {
		this.expiryNotificationDuration = expiryNotificationDuration;
	}
	public String getDefaultExpiryInterval() {
		return defaultExpiryInterval;
	}
	public void setDefaultExpiryInterval(String defaultExpiryInterval) {
		this.defaultExpiryInterval = defaultExpiryInterval;
	}
	public String getMaxAttempts() {
		return maxAttempts;
	}
	public void setMaxAttempts(String maxAttempts) {
		this.maxAttempts = maxAttempts;
	}
	public String getHostName() {
		return hostName;
	}
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
