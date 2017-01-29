package com.inn.headstartdemo.service.impl;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inn.headstartdemo.dao.ISocialCredentialsDao;
import com.inn.headstartdemo.model.SocialCredentials;
import com.inn.headstartdemo.service.ISocialCredentialsService;
import com.inn.headstartdemo.service.generic.AbstractService;

import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import javax.persistence.NoResultException;
import org.springframework.dao.EmptyResultDataAccessException;
import com.inn.headstartdemo.exceptions.application.ValidationFailedException;

import org.springframework.dao.DataIntegrityViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.validation.ConstraintViolationException;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
/**
 * 
 * SocialCredentials Service 
 * 
 */
@Service
@Transactional
public class SocialCredentialsServiceImpl extends AbstractService<Integer,SocialCredentials > implements ISocialCredentialsService {
 private Logger logger=LoggerFactory.getLogger(SocialCredentialsServiceImpl.class);
 private  ISocialCredentialsDao entityDao;
	@Autowired
	public void setDao(ISocialCredentialsDao dao) {
		super.setDao(dao);
		entityDao = dao;
	}

    /**
	 * 
	 *Returns the socialCredentials of SocialCredentials
	 *@parameter socialCredentials of type SocialCredentials
	 *@throws BusinessException
	 *@returns an socialCredentials
	 * 
	 */
	@Override
	public List<SocialCredentials> search(SocialCredentials socialCredentials) throws BusinessException{
		return super.search(socialCredentials);
	}

    /**
	 * 
	 *Returns the socialCredentials of SocialCredentials by primary key
	 *@parameter primaryKey of type Integer
	 *@throws BusinessException
	 *@returns an socialCredentials 
	 * 
	 */
	@Override
	public SocialCredentials findById(Integer primaryKey) throws BusinessException{
		try{
		return super.findById(primaryKey);
		}
		catch(EmptyResultDataAccessException ex)
		{
		logger.error(ex.getMessage());
			throw new BusinessException(ex);
		}catch(NoResultException ex)
		{
			
			logger.error(ex.getMessage());
			throw new BusinessException(ex);
		}
	}

    /**
	 * 
	 *Returns the list of SocialCredentials
	 *@throws BusinessException
	 *@returns a list of socialCredentials
	 * 
	 */
	@Override
	public List<SocialCredentials> findAll() throws BusinessException{
	    	try{
			return super.findAll();
		}
		catch(EmptyResultDataAccessException ex)
		{
		logger.error(ex.getMessage());
			throw new BusinessException(ex);
		}catch(NoResultException ex)
		{
		logger.error(ex.getMessage());
			throw new BusinessException(ex);
		}

	}

    /**
	 * 
	 *Returns the new socialCredentials of SocialCredentials
	 *@parameter socialCredentials of type SocialCredentials
	 *@throws BusinessException
	 *@returns a new entity
	 * 
	 */
	@Override
	public SocialCredentials create(@Valid SocialCredentials socialCredentials) throws BusinessException{
		try{
		return super.create(socialCredentials);
		}catch(DataIntegrityViolationException ex)
    	{
    	logger.error(ex.getMessage());
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException  ex){
    		logger.error(ex.getMessage());
    		throw new BusinessException(ex);
    	}
	}

    /**
	 *  
	 *Returns the updated entity of SocialCredentials
	 *@parameter socialCredentials of type 
	 *@throws BusinessException
	 *@returns a update entity
	 * 
	 */
	@Override
	public SocialCredentials update(@Valid SocialCredentials socialCredentials)throws BusinessException {
		try{
		return super.update(socialCredentials);
		}catch(DataIntegrityViolationException ex)
    	{
    	logger.error(ex.getMessage());
    		throw new ValidationFailedException(ex);
    		
    	}catch(ConstraintViolationException  ex){
    		logger.error(ex.getMessage());
    		throw new BusinessException(ex);
    	}
	}

	/**
	 * 
	 *method to  remove the entity of SocialCredentials 
	 *@parameter socialCredentials of type SocialCredentials
	 *@throws BusinessException
	 * 
	 */
	@Override
	public void remove(SocialCredentials socialCredentials) throws BusinessException{
		super.remove(socialCredentials);
	}

	/**
	 * 
	 *method to  remove the entity of SocialCredentials by primary key
	 *@parameter primaryKey of type Integer
	 *@throws BusinessException
	 * 
	 */
	@Override
	public void removeById(Integer primaryKey) throws BusinessException{
		super.removeById(primaryKey);
	}

	
	/**
	 * 
	 *Returns the list of SocialCredentials find by FacebookID 
	 *@parameter id of type String
	 *@returns a list of entity
	 * 
	 */
	@Override
	public List<SocialCredentials> findByFacebookId(String id) {
		
		return entityDao.findByFacebookID(id);
	}
	
	/**
	 * 
	 *Returns the list of SocialCredentials find by GoogleID 
	 *@parameter id of type String
	 *@returns a list of entity
	 * 
	 */
	@Override
	public List<SocialCredentials> findByGoogleId(String id) {
		
		return entityDao.findByGoogleID(id);
	}
	

}
