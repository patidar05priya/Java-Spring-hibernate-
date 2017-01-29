package com.inn.headstartdemo.dao;

import com.inn.headstartdemo.model.Customer;

import com.inn.headstartdemo.dao.generic.IGenericDao;
import java.util.List;
import javax.persistence.NoResultException;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;

/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public interface ICustomerDao extends IGenericDao<Integer, Customer> {

	    Long getCommentCountByEntity(Integer entityPk) throws ValueNotFoundException;
		
		Long getFileCountsByEntity(Integer entityPk);
		
	public Long getTotalCount();

}