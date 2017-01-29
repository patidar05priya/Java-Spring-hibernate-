package com.inn.headstartdemo.service;

import com.inn.headstartdemo.model.Payment;

import com.inn.headstartdemo.service.generic.IGenericService;
import java.util.List;
import com.inn.headstartdemo.exceptions.application.BusinessException;

/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public interface IPaymentService extends IGenericService<Long, Payment> {


	public Long getTotalCount();
}
