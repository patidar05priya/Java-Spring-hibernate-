package com.inn.headstartdemo.service;

import com.inn.headstartdemo.model.EmailNotifications;
import com.inn.headstartdemo.service.generic.IGenericService;
import com.inn.headstartdemo.model.Users;



public interface IEmailNotificationsService extends IGenericService<Long, EmailNotifications> {

	void createNotification(String text, String string, Users anEntity,String subject );
	public Long getTotalCount();
}
