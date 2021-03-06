package com.inn.headstartdemo.service.impl;

import java.util.List;

import javax.persistence.NoResultException;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.elasticsearch.index.engine.DocumentMissingException;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inn.headstartdemo.dao.IPaymentDao;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.exceptions.application.PaymentAlreadyExistException;
import com.inn.headstartdemo.exceptions.application.PaymentNotFoundException;
import com.inn.headstartdemo.exceptions.application.ValidationFailedException;
import com.inn.headstartdemo.model.Payment;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.IElasticSearchService;
import com.inn.headstartdemo.service.IPaymentService;
import com.inn.headstartdemo.service.generic.AbstractService;



/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
 
/**
 * 
 * Service 
 *
 */
 
@ExceptionHandler @Service
@Transactional
public class PaymentServiceImpl extends AbstractService<Long, Payment> implements IPaymentService {
 private Logger logger=LoggerFactory.getLogger(PaymentServiceImpl.class);
 private  IPaymentDao paymentDao;
	@ExceptionHandler @Autowired
	public void setDao(IPaymentDao dao) {
		super.setDao(dao);
		paymentDao = dao;
	}
	 /** IElasticSearchService Bean injection */
	@Autowired
	IElasticSearchService elasticSearchService;
	
		/**
	 * 
	 *Returns the list of Payment using entity
	 *@parameter payment to search record
	 *@returns a Payment record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Payment> search(Payment payment) throws BusinessException{
	logger.info("Finding record by payment name :"+payment);
		return super.search(payment);
	}

	/**
	 * 
	 *Returns the Payment finding by id
	 *@parameter primaryKey to find Payment
	 *@throws BusinessException
	 *@throws PaymentNotFoundException
	 *@returns a Payment record
	 * 
	 */
	@ExceptionHandler @Override
	public Payment findById(@NotNull Long primaryKey)throws PaymentNotFoundException,BusinessException{
		logger.info("Finding record by primaryKey :"+primaryKey);
		try{
		return (super.findById(primaryKey));
		}
		catch(EmptyResultDataAccessException ex)
		{
			throw new PaymentNotFoundException(ex);
		}catch(NoResultException ex)
		{
			throw new PaymentNotFoundException(ex);
		}
	}

	/**
	 * 
	 *Returns the list of Payment 
	 *@throws BusinessException
	 *@throws PaymentNotFoundException
	 *@returns a list of Payment record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Payment> findAll() throws BusinessException ,PaymentNotFoundException{
		try{
			return super.findAll();

		}
		catch(EmptyResultDataAccessException ex)
		{	
			throw new PaymentNotFoundException(ex);
		}catch(NoResultException ex)
		{
			throw new PaymentNotFoundException(ex);
		}
	}

	/**
	 * 
	 *Returns the new valid Payment record
	 *@parameter payment to create new record
	 *@returns a new Payment record
	 *@throws BusinessException 
	 *@throws PaymentAlreadyExistException 
	 *@throws ValidationFailedException		
	 */
	@ExceptionHandler @Override
	public Payment create(@Valid Payment payment) throws BusinessException{
    logger.info("Create record by payment : "+payment);
		try{	
    	Users username =CustomerInfo.getUserInContext();
			
	Payment newEntity=super.create(payment);
	
						

		
		elasticSearchService.createIndex(newEntity.getId().toString(),newEntity.getId().toString(),"Payment");
		
	return newEntity;
    	
    	}catch(DataIntegrityViolationException ex)
    	{
				throw new PaymentAlreadyExistException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    	throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *Returns the updated valid Payment record
	 *@parameter payment to update Payment record
	 * @throws BusinessException	
 	 * @throws ValidationFailedException	
 	 * @throws PaymentAlreadyExistException	
	 *@returns a updated Payment record
	 * 
	 */
	@ExceptionHandler @Override
	public Payment update(@Valid Payment payment)throws BusinessException {
	logger.info("Update record by payment : "+payment);	
		try{
			Users username =CustomerInfo.getUserInContext();		
			
			
			Payment newEntity= super.update(payment);
						
			try{
			 	elasticSearchService.updateDocument("Payment", payment.getId().toString(),"",payment.getId().toString());
			}
			catch(DocumentMissingException ex)
			{
					logger.error(ex.getMessage());
				elasticSearchService.createIndex( payment.getId().toString(),payment.getId().toString(),"Payment");
			}
			catch(NullPointerException e)
			{
				logger.error(e.getMessage());
			  elasticSearchService.createIndex( payment.getId().toString(),payment.getId().toString(),"Payment");
			}
				return newEntity;
		
		}catch(DataIntegrityViolationException ex)
    	{
			throw new PaymentAlreadyExistException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    		throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *method to remove Payment record
	 * @throws 	BusinessException
	 *@parameter payment  to remove Payment record
	 * 
	 */
	@ExceptionHandler @Override
	public void remove(Payment payment) throws BusinessException {
	logger.info("Remove record by payment : "+payment);	
		try{
			super.remove(payment);
		}catch(DataIntegrityViolationException ex)
    	{
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException ex)
		{
			throw new PaymentAlreadyExistException(ex);
		}
				elasticSearchService.deleteDocument("Payment", payment.getId().toString());
			}

	/**
	 * 
	 *method to remove Payment record by primaryKey
	 *@throws BusinessException 	
	 *@parameter primaryKey  to remove Payment 
	 * 
	 */
	@ExceptionHandler @Override
	public void removeById(@NotNull Long primaryKey) throws BusinessException  {
	logger.info("Remove record by primaryKey :"+primaryKey);
	try{	
			
						super.removeById(primaryKey);
					}catch(DataIntegrityViolationException ex)
    	{
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException ex)
		{
			throw new PaymentAlreadyExistException(ex);
		}
	  		elasticSearchService.deleteDocument("Payment", primaryKey.toString());
			}
	

  @ExceptionHandler public Long getTotalCount(){
				return paymentDao.getTotalCount();
	}


}
