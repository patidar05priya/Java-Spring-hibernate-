package com.inn.headstartdemo.dao;
import com.inn.headstartdemo.dao.generic.IGenericDao;
import com.inn.headstartdemo.model.EmailNotifications;

public interface IEmailNotificationsDao  extends IGenericDao<Long,EmailNotifications>{
	public Long getTotalCount();
}
