package com.inn.headstartdemo.dao.impl;

import java.math.BigInteger;
import java.util.List;


import javax.persistence.Query;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;


import com.inn.headstartdemo.model.Orderdetail;
import java.lang.Integer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.dao.IOrderdetailDao;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import javax.persistence.NoResultException;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;


/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
 
/**
 * 
 *Dao 
 * 
 */
@ExceptionHandler @Dao
public class OrderdetailDaoImpl extends HibernateGenericDao<Integer, Orderdetail> implements IOrderdetailDao {
	
	/** The logger. */
	private Logger logger=LoggerFactory.getLogger(OrderdetailDaoImpl.class);
	
	
	public OrderdetailDaoImpl() {
		super(Orderdetail.class);
	}

	    
	/**
	 * 
	 *Returns the new Orderdetail record
	 *@parameter orderdetail of type  Orderdetail
	 *@returns a new Orderdetail
	 * 
	 */
	@ExceptionHandler @Override
	public Orderdetail create(@Valid Orderdetail orderdetail)throws DataAccessException {
	
	logger.info("Create record by an entity :"+orderdetail);
	Orderdetail newEntity=super.create(orderdetail);
	
	return newEntity;
	}

	/**
	 * 
	 *Returns the updated Orderdetail record
	 *@parameter anEntity of type  Orderdetail
	 *@returns a updated Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public Orderdetail update(@Valid Orderdetail orderdetail) throws DataAccessException {
	logger.info("update record by an entity :"+orderdetail);
		
		
		return super.update(orderdetail);
	}

	/**
	 * 
	 *Method to remove Orderdetail record
	 *@parameter orderdetail of type  Orderdetail
	 * 
	 */
	@ExceptionHandler @Override
	public void delete(@Valid Orderdetail orderdetail) throws DataAccessException {
	logger.info("Deleting record by an entity :"+orderdetail);

		super.delete(orderdetail);

	}
	

	/**
	 * 
	 *Method to remove Orderdetail record by primary key
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
	 *Returns the list of Orderdetail record 
	 *@returns  Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Orderdetail> findAll() throws NoResultException,EmptyResultDataAccessException{
		return super.findAll();
	}
	
	/**
	 * 
	 *Returns  the record of Orderdetail  finding by primary key 
	 *@parameter primary key  of type Integer
	 *@returns a Orderdetail record
	 * 
	 */
	@ExceptionHandler @Override
	public Orderdetail findByPk(@NotNull Integer integerPk) throws NoResultException,EmptyResultDataAccessException{
	logger.info("Find record by Primary Key :"+integerPk);
	
		return super.findByPk(integerPk);
	}

	
		
		
		
	@ExceptionHandler public Long getTotalCount(){
			return ((Long)this.getEntityManager().createQuery("select count(x) from Orderdetail x  ").getSingleResult());		
		}
}
