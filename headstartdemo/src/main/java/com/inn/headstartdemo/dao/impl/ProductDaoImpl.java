package com.inn.headstartdemo.dao.impl;

import java.math.BigInteger;
import java.util.List;


import javax.persistence.Query;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;


import com.inn.headstartdemo.model.Product;
import java.lang.Integer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.dao.IProductDao;
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
public class ProductDaoImpl extends HibernateGenericDao<Integer, Product> implements IProductDao {
	
	/** The logger. */
	private Logger logger=LoggerFactory.getLogger(ProductDaoImpl.class);
	
	
	public ProductDaoImpl() {
		super(Product.class);
	}

	    
	/**
	 * 
	 *Returns the new Product record
	 *@parameter product of type  Product
	 *@returns a new Product
	 * 
	 */
	@ExceptionHandler @Override
	public Product create(@Valid Product product)throws DataAccessException {
	
	logger.info("Create record by an entity :"+product);
	Product newEntity=super.create(product);
	
	return newEntity;
	}

	/**
	 * 
	 *Returns the updated Product record
	 *@parameter anEntity of type  Product
	 *@returns a updated Product record
	 * 
	 */
	@ExceptionHandler @Override
	public Product update(@Valid Product product) throws DataAccessException {
	logger.info("update record by an entity :"+product);
		
		
		return super.update(product);
	}

	/**
	 * 
	 *Method to remove Product record
	 *@parameter product of type  Product
	 * 
	 */
	@ExceptionHandler @Override
	public void delete(@Valid Product product) throws DataAccessException {
	logger.info("Deleting record by an entity :"+product);

		super.delete(product);

	}
	

	/**
	 * 
	 *Method to remove Product record by primary key
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
	 *Returns the list of Product record 
	 *@returns  Product record
	 * 
	 */
	@ExceptionHandler @Override
	public List<Product> findAll() throws NoResultException,EmptyResultDataAccessException{
		return super.findAll();
	}
	
	/**
	 * 
	 *Returns  the record of Product  finding by primary key 
	 *@parameter primary key  of type Integer
	 *@returns a Product record
	 * 
	 */
	@ExceptionHandler @Override
	public Product findByPk(@NotNull Integer integerPk) throws NoResultException,EmptyResultDataAccessException{
	logger.info("Find record by Primary Key :"+integerPk);
	
		return super.findByPk(integerPk);
	}

	
		
		
		
	@ExceptionHandler public Long getTotalCount(){
			return ((Long)this.getEntityManager().createQuery("select count(x) from Product x  ").getSingleResult());		
		}
}
