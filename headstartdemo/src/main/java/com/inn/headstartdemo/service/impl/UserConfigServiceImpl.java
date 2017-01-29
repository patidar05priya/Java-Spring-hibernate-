package com.inn.headstartdemo.service.impl;

import java.util.List;


import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inn.headstartdemo.dao.IUserConfigDao;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.application.BusinessException;

import com.inn.headstartdemo.exceptions.application.ValidationFailedException;
import com.inn.headstartdemo.model.UserConfig;
import com.inn.headstartdemo.service.IUserConfigService;
import com.inn.headstartdemo.service.generic.AbstractService;

@ExceptionHandler @Service
@Transactional
public class UserConfigServiceImpl extends AbstractService<Integer, UserConfig> implements IUserConfigService{
    private Logger logger=LoggerFactory.getLogger(UserConfigServiceImpl.class);
    private  IUserConfigDao userConfigDao;
   	@ExceptionHandler @Autowired
   	public void setDao(IUserConfigDao dao) {
   		super.setDao(dao);
   		userConfigDao = dao;
   	}
   	
	/**
	 * 
	 *Returns the list of UserConfig using entity
	 *@parameter userConfig to search record
	 *@returns a UserConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public List<UserConfig> search(UserConfig userConfig) throws BusinessException{
	logger.info("Finding record by userConfig name :"+userConfig);
		return super.search(userConfig);
	}

	
	
	/**
	 * 
	 *Returns the new valid UserConfig record
	 *@parameter UserConfig to create new record
	 *@returns a new UserConfig record
	 *@throws BusinessException 
	 *@throws UserConfigAlreadyExistException 
	 *@throws ValidationFailedException		
	 */
	@ExceptionHandler @Override
	public UserConfig create(@Valid UserConfig userConfig) throws BusinessException{
    logger.info("Create record by UserConfig :"+userConfig);
		try{
		return super.create(userConfig);
    	}catch(DataIntegrityViolationException ex)
    	{
    	    	throw new BusinessException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    	throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *Returns the updated valid UserConfig record
	 *@parameter UserConfig to updtae UserConfig record
	 * @throws BusinessException	
 	 * @throws ValidationFailedException	
 	 * @throws UserConfigAlreadyExistException	
	 *@returns a updated UserConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public UserConfig update(@Valid UserConfig userConfig)throws BusinessException {
	logger.info("Update record by userConfig :"+userConfig);
		try{
			return super.update(userConfig);
		}catch(DataIntegrityViolationException ex)
    	{
			throw new BusinessException(ex);
    		
    		
    	}catch(ConstraintViolationException  ex){
    		
    		throw new ValidationFailedException(ex);
    	}
	}

	/**
	 * 
	 *method to remove userConfig record
	 * @throws 	BusinessException
	 *@parameter userConfig  to remove userConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public void remove(UserConfig userConfig) throws BusinessException {
	logger.info("Remove record by userConfig :"+userConfig);
		try{
			super.remove(userConfig);
		}catch(DataIntegrityViolationException ex)
    	{
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException ex)
		{
			throw new BusinessException(ex);
		}
		
	}

	/**
	 * 
	 *method to remove userConfig record by primaryKey
	 *@throws BusinessException 	
	 *@parameter primaryKey  to remove userConfig 
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
			throw new BusinessException(ex);
		}
	}

}
