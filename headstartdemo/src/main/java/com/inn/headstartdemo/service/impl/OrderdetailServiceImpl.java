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

import com.inn.headstartdemo.dao.IOrderdetailDao;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.exceptions.application.OrderdetailAlreadyExistException;
import com.inn.headstartdemo.exceptions.application.OrderdetailNotFoundException;
import com.inn.headstartdemo.exceptions.application.ValidationFailedException;
import com.inn.headstartdemo.model.Orderdetail;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.IElasticSearchService;
import com.inn.headstartdemo.service.IOrderdetailService;
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
public class OrderdetailServiceImpl extends AbstractService<Integer, Orderdetail> implements IOrderdetailService {
 private Logger logger=LoggerFactory.getLogger(OrderdetailServiceImpl.class);
 private  IOrderdetailDao orderdetailDao;
	@ExceptionHandler @Autowired
	public void setDao(IOrderdetailDao dao) {
		super.setDao(dao);
		orderdetailDao = dao;
	}
	 /** IElasticSearchService Bean injection */
	@Autowired
	IElasticSearchService elasticSearchService;
	
		/**
	 * 
	 *Returns the list of Orderdetail using entity
	 *@parameter orderdetail to search record
	 *@returns a Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Orderdetail> search(Orderdetail orderdetail) throws BusinessException{
	logger.info("Finding record by orderdetail name :"+orderdetail);
		return super.search(orderdetail);
	}

	/**
	 * 
	 *Returns the Orderdetail finding by id
	 *@parameter primaryKey to find Orderdetail
	 *@throws BusinessException
	 *@throws OrderdetailNotFoundException
	 *@returns a Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public Orderdetail findById(@NotNull Integer primaryKey)throws OrderdetailNotFoundException,BusinessException{
		logger.info("Finding record by primaryKey :"+primaryKey);
		try{
		return (super.findById(primaryKey));
		}
		catch(EmptyResultDataAccessException ex)
		{
			throw new OrderdetailNotFoundException(ex);
		}catch(NoResultException ex)
		{
			throw new OrderdetailNotFoundException(ex);
		}
	}

	/**
	 * 
	 *Returns the list of Orderdetail 
	 *@throws BusinessException
	 *@throws OrderdetailNotFoundException
	 *@returns a list of Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Orderdetail> findAll() throws BusinessException ,OrderdetailNotFoundException{
		try{
			return super.findAll();

		}
		catch(EmptyResultDataAccessException ex)
		{	
			throw new OrderdetailNotFoundException(ex);
		}catch(NoResultException ex)
		{
			throw new OrderdetailNotFoundException(ex);
		}
	}

	/**
	 * 
	 *Returns the new valid Orderdetail record
	 *@parameter orderdetail to create new record
	 *@returns a new Orderdetail record
	 *@throws BusinessException 
	 *@throws OrderdetailAlreadyExistException 
	 *@throws ValidationFailedException		
	 */
	@ExceptionHandler @Override
	public Orderdetail create(@Valid Orderdetail orderdetail) throws BusinessException{
    logger.info("Create record by orderdetail : "+orderdetail);
		try{	
    	Users username =CustomerInfo.getUserInContext();
			
	Orderdetail newEntity=super.create(orderdetail);
	
						

		
		elasticSearchService.createIndex(newEntity.getId().toString(),newEntity.getId().toString(),"Orderdetail");
		
	return newEntity;
    	
    	}catch(DataIntegrityViolationException ex)
    	{
				throw new OrderdetailAlreadyExistException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    	throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *Returns the updated valid Orderdetail record
	 *@parameter orderdetail to update Orderdetail record
	 * @throws BusinessException	
 	 * @throws ValidationFailedException	
 	 * @throws OrderdetailAlreadyExistException	
	 *@returns a updated Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public Orderdetail update(@Valid Orderdetail orderdetail)throws BusinessException {
	logger.info("Update record by orderdetail : "+orderdetail);	
		try{
			Users username =CustomerInfo.getUserInContext();		
			
			
			Orderdetail newEntity= super.update(orderdetail);
						
			try{
			 	elasticSearchService.updateDocument("Orderdetail", orderdetail.getId().toString(),"",orderdetail.getId().toString());
			}
			catch(DocumentMissingException ex)
			{
					logger.error(ex.getMessage());
				elasticSearchService.createIndex( orderdetail.getId().toString(),orderdetail.getId().toString(),"Orderdetail");
			}
			catch(NullPointerException e)
			{
				logger.error(e.getMessage());
			  elasticSearchService.createIndex( orderdetail.getId().toString(),orderdetail.getId().toString(),"Orderdetail");
			}
				return newEntity;
		
		}catch(DataIntegrityViolationException ex)
    	{
			throw new OrderdetailAlreadyExistException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    		throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *method to remove Orderdetail record
	 * @throws 	BusinessException
	 *@parameter orderdetail  to remove Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public void remove(Orderdetail orderdetail) throws BusinessException {
	logger.info("Remove record by orderdetail : "+orderdetail);	
		try{
			super.remove(orderdetail);
		}catch(DataIntegrityViolationException ex)
    	{
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException ex)
		{
			throw new OrderdetailAlreadyExistException(ex);
		}
				elasticSearchService.deleteDocument("Orderdetail", orderdetail.getId().toString());
			}

	/**
	 * 
	 *method to remove Orderdetail record by primaryKey
	 *@throws BusinessException 	
	 *@parameter primaryKey  to remove Orderdetail 
	 * 
	 */
	@ExceptionHandler @Override
	public void removeById(@NotNull Integer primaryKey) throws BusinessException  {
	logger.info("Remove record by primaryKey :"+primaryKey);
	try{	
			
						super.removeById(primaryKey);
					}catch(DataIntegrityViolationException ex)
    	{
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException ex)
		{
			throw new OrderdetailAlreadyExistException(ex);
		}
	  		elasticSearchService.deleteDocument("Orderdetail", primaryKey.toString());
			}
	

  @ExceptionHandler public Long getTotalCount(){
				return orderdetailDao.getTotalCount();
	}


}
