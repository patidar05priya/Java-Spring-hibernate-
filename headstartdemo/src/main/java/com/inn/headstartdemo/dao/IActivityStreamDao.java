package com.inn.headstartdemo.dao;

import  com.inn.headstartdemo.dao.generic.IGenericDao;
import  com.inn.headstartdemo.model.ActivityStream;

public interface IActivityStreamDao extends IGenericDao<Long,ActivityStream>  {
	
	public Long getTotalCount();
	

}
