package com.inn.headstartdemo.service;

import com.inn.headstartdemo.model.Orderdetail;

import com.inn.headstartdemo.service.generic.IGenericService;
import java.util.List;
import com.inn.headstartdemo.exceptions.application.BusinessException;

/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public interface IOrderdetailService extends IGenericService<Integer, Orderdetail> {


	public Long getTotalCount();
}