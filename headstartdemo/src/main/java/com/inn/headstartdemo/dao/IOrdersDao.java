package com.inn.headstartdemo.dao;

import com.inn.headstartdemo.model.Orders;

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
public interface IOrdersDao extends IGenericDao<Integer, Orders> {

		
		
	public Long getTotalCount();

}
