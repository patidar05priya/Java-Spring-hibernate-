package com.inn.headstartdemo.dao.impl;

import java.util.List;

import javax.persistence.NoResultException;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;

import com.inn.headstartdemo.dao.IUserConfigDao;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.model.UserConfig;

@ExceptionHandler 
@Dao
public class UserConfigDaoImpl  extends HibernateGenericDao<Integer, UserConfig> implements IUserConfigDao{
    private Logger logger=LoggerFactory.getLogger(UserConfigDaoImpl.class);
    public UserConfigDaoImpl() {
	super(UserConfig.class);
    }
    /**
	 * 
	 *Returns the new userConfig record
	 *@parameter userConfig of type  userConfig
	 *@returns a new userConfig
	 * 
	 */
	@ExceptionHandler @Override
	public UserConfig create(@Valid UserConfig userConfig)throws DataAccessException {
	
	logger.info("Create record by an entity :"+userConfig);
		return super.create(userConfig);
		
		
	}

    /**
	 * 
	 *Returns the updated UserConfig record
	 *@parameter anEntity of type  UserConfig
	 *@returns a updated UserConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public UserConfig update(@Valid UserConfig userConfig) throws DataAccessException {
	logger.info("update record by an entity :"+userConfig);
	
		return super.update(userConfig);
	}
	
	/**
	 * 
	 *Method to remove userConfig record
	 *@parameter userConfig of type  userConfig
	 * 
	 */
	@ExceptionHandler @Override
	public void delete(@Valid UserConfig userConfig) throws DataAccessException {
	logger.info("Deleting record by an entity :"+userConfig);

		super.delete(userConfig);
	}

	/**
	 * 
	 *Method to remove UserConfig record by primary key
	 *@parameter primary key of type Integer  
	 * 
	 */
	@ExceptionHandler @Override
	public void deleteByPk(@NotNull Integer integerPk) throws DataAccessException{
	logger.info("Deleting record by primary key :"+integerPk);
	
		super.deleteByPk(integerPk);
	}
	
	/**
	 * 
	 *Returns the list of userConfig record 
	 *@returns  userConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public List<UserConfig> findAll() throws NoResultException,EmptyResultDataAccessException{
		return super.findAll();
	}
	
	/**
	 * 
	 *Returns  the record of userConfig  finding by primary key 
	 *@parameter primary key  of type Integer
	 *@returns a userConfig record
	 * 
	 */
	@ExceptionHandler @Override
	public UserConfig findByPk(@NotNull Integer integerPk) throws NoResultException,EmptyResultDataAccessException{
	logger.info("Find record by Primary Key :"+integerPk);
	
		return super.findByPk(integerPk);
	}

}
