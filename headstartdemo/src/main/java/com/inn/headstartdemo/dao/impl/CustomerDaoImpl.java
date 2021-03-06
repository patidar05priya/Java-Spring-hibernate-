package com.inn.headstartdemo.dao.impl;

import java.math.BigInteger;
import java.util.List;


import javax.persistence.Query;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;


import com.inn.headstartdemo.model.Customer;
import java.lang.Integer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.dao.ICommentDao;
import com.inn.headstartdemo.dao.ICustomerDao;
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
public class CustomerDaoImpl extends HibernateGenericDao<Integer, Customer> implements ICustomerDao {
	
	/** The logger. */
	private Logger logger=LoggerFactory.getLogger(CustomerDaoImpl.class);
	
	
	public CustomerDaoImpl() {
		super(Customer.class);
	}

		@Autowired
    private ICommentDao commentDao;
        
	/**
	 * 
	 *Returns the new Customer record
	 *@parameter customer of type  Customer
	 *@returns a new Customer
	 * 
	 */
	@ExceptionHandler @Override
	public Customer create(@Valid Customer customer)throws DataAccessException {
	
	logger.info("Create record by an entity :"+customer);
	Customer newEntity=super.create(customer);
	
	return newEntity;
	}

	/**
	 * 
	 *Returns the updated Customer record
	 *@parameter anEntity of type  Customer
	 *@returns a updated Customer record
	 * 
	 */
	@ExceptionHandler @Override
	public Customer update(@Valid Customer customer) throws DataAccessException {
	logger.info("update record by an entity :"+customer);
		
		
		return super.update(customer);
	}

	/**
	 * 
	 *Method to remove Customer record
	 *@parameter customer of type  Customer
	 * 
	 */
	@ExceptionHandler @Override
	public void delete(@Valid Customer customer) throws DataAccessException {
	logger.info("Deleting record by an entity :"+customer);

		super.delete(customer);

	}
	

	/**
	 * 
	 *Method to remove Customer record by primary key
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
	 *Returns the list of Customer record 
	 *@returns  Customer record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Customer> findAll() throws NoResultException,EmptyResultDataAccessException{
		return super.findAll();
	}
	
	/**
	 * 
	 *Returns  the record of Customer  finding by primary key 
	 *@parameter primary key  of type Integer
	 *@returns a Customer record
	 * 
	 */
	@ExceptionHandler @Override
	public Customer findByPk(@NotNull Integer integerPk) throws NoResultException,EmptyResultDataAccessException{
	logger.info("Find record by Primary Key :"+integerPk);
	
		return super.findByPk(integerPk);
	}

	
		@ExceptionHandler @Override
	public Long getFileCountsByEntity(@NotNull Integer integerPk) {
		logger.info("Finding Entity File Counts by customer" + integerPk);
		
		try{
			Customer customer =  findByPk(integerPk);
			return (Long)this
				.getEntityManager()
				.createNamedQuery("getFileCountsByCustomer")
				.setParameter("customer", customer).getSingleResult();
		}
		catch(Exception e){
			logger.error(""+e.getMessage());
			return (long)0;
		}
	}
		
		@ExceptionHandler @Override
	public Long getCommentCountByEntity(@NotNull Integer integerPk) throws ValueNotFoundException{
		logger.info("Finding Entity Comments Counts by customer"
				+ integerPk);
		try{
			Customer customer =  findByPk(integerPk);
			Long count=commentDao.customerCommentCount(customer);
			return count;
		}
		catch(Exception e){
		logger.error(e.getMessage());
			 throw new ValueNotFoundException(e.getMessage());
		}
	}
		
		
	@ExceptionHandler public Long getTotalCount(){
			return ((Long)this.getEntityManager().createQuery("select count(x) from Customer x  ").getSingleResult());		
		}
}
