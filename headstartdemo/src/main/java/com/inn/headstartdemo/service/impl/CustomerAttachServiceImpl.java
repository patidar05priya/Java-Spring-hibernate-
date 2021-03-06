package com.inn.headstartdemo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.io.IOUtils;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import java.lang.Long;
import java.lang.Integer;

import org.apache.cxf.jaxrs.ext.multipart.Multipart;

import java.util.List;

import com.inn.headstartdemo.service.generic.AbstractService;
import com.inn.headstartdemo.service.ICustomerAttachService;
import com.inn.headstartdemo.service.ICustomerService;
import com.inn.headstartdemo.service.IFileUploadsService;
import com.inn.headstartdemo.model.Customer;
import com.inn.headstartdemo.dao.ICustomerAttachDao;
import com.inn.headstartdemo.model.CustomerAttach;
import com.inn.headstartdemo.model.FileUploads;
import org.springframework.transaction.annotation.Transactional;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.exceptions.application.ValidationFailedException;
import javax.persistence.NoResultException;
import org.springframework.dao.EmptyResultDataAccessException;
/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
/**
 * 
 * EntityAttach Service 
 *
 */
@Service
@Transactional
public class CustomerAttachServiceImpl extends AbstractService<Integer, CustomerAttach> implements ICustomerAttachService {
	
	 /** The logger. */
	 private Logger logger=LoggerFactory.getLogger(CustomerAttachServiceImpl.class);
	
 	 /** The CustomerAttach dao. */
	ICustomerAttachDao entityDao;
	
	@Autowired
	public void setDao(ICustomerAttachDao  dao) {
		super.setDao(dao);
		entityDao = dao;
	}
	

   /** The fileUploads Service. */
	@Autowired
	public IFileUploadsService serviceImpl;
	
	/** The {entityParentName} Service. */
	@Autowired
	public ICustomerService cserviceImpl;
	
	/**
	 * 
	 *Returns the list of CustomerAttach using entity
	 *@parameter entity to search record
	 *@throws BusinessException
	 *@returns a CustomerAttach record
	 * 
	 */
	@Override
	public List<CustomerAttach> search(CustomerAttach customerAttach) throws BusinessException{
		return super.search(customerAttach);
	}

	/**
	 * 
	 *Returns the CustomerAttach finding by id
	 *@parameter primaryKey to find CustomerAttach
	 *@throws BusinessException
	 *@returns a CustomerAttach record
	 * 
	 */
	@Override
	public CustomerAttach findById(Integer primaryKey) throws BusinessException{
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
	 *Returns the list of CustomerAttach 
	 *@throws BusinessException
	 *@returns a list of CustomerAttach record
	 * 
	 */
	@Override
	public List<CustomerAttach> findAll() throws BusinessException  {
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
	 *Returns the new valid CustomerAttach record
	 *@parameter customerAttach to create new record
	 *@returns a new CustomerAttach record
	 *@throws BusinessException 
	 *@throws ValidationFailedException		
	 */
	@Override
	public CustomerAttach create(CustomerAttach customerAttach)throws BusinessException {
		try{
		return super.create(customerAttach);
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
	 *Returns the updated valid CustomerAttach record
	 *@parameter customerAttach to updtae CustomerAttach record
	 *@throws BusinessException	
 	 *@throws ValidationFailedException		
	 *@returns a updated CustomerAttach record
	 * 
	 */
	@Override
	public CustomerAttach update(CustomerAttach customerAttach)throws BusinessException {
		try{
		return super.update(customerAttach);
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
	 *method to remove CustomerAttach record
	 *@throws BusinessException
	 *@parameter customerAttach  to remove CustomerAttach record
	 * 
	 */
	@Override
	public void remove(CustomerAttach customerAttach) throws BusinessException{
		super.remove(customerAttach);
	}

	/**
	 * 
	 *method to remove CustomerAttach record by primaryKey
	 *@throws BusinessException 	
	 *@parameter primaryKey to remove CustomerAttach 
	 * 
	 */
	@Override
	public void removeById(Integer primaryKey) throws BusinessException{
		super.removeById(primaryKey);
	}

    /**
	 * 
	 *Returns add new entity of CustomerAttach
	 *@parameter Eid of type int
	 *@parameter filename of type String
	 *@parameter in of type InputStream	
	 *@returns a new entity of CustomerAttach
	 * 
	 */
public CustomerAttach add(int Eid,String filename,InputStream in) {
			
		try{
				
			CustomerAttach customerAttach=new CustomerAttach();
			FileUploads fileEntity=new FileUploads();
			String 	name =System.getProperty("catalina.base")+"/webapps/headstartdemo/uploads/Customer/";
		  	fileEntity.setFile(name);
			fileEntity=serviceImpl.create(fileEntity);
			(new File(System.getProperty("catalina.base")+"/webapps/headstartdemo/uploads/Customer/")).mkdirs();
			Customer parentEntity=cserviceImpl.findById(Eid);
			customerAttach.setCustomer(parentEntity);
			customerAttach.setFilename(filename);
			customerAttach.setFileUploads(fileEntity);
			name =System.getProperty("catalina.base")+"/webapps/headstartdemo/uploads/Customer/"+fileEntity.getId();
			
		   	(new File(name)).mkdir();

			name =System.getProperty("catalina.base")+"/webapps/headstartdemo/uploads/Customer/"+fileEntity.getId()+"/"+filename;
			File fileNew=new File(name);
	    	try {
	    	OutputStream out=new FileOutputStream(fileNew);
	    	byte buf[]=new byte[1024];
	    	int len;
	    	while((len=in.read(buf))>0)
	    	{
	    	out.write(buf,0,len);
	    	}
	    	
	    		out.close();
	    		in.close();
	    	} catch (IOException e) {
	    		// TODO Auto-generated catch block
	    	logger.error(e.getMessage());
	    	} 
			name ="/uploads/Customer/"+fileEntity.getId()+"/"+filename;
	    	fileEntity.setFile(name);
	    	fileEntity.setFilename(filename);
	    	serviceImpl.update(fileEntity);
			return 	customerAttach= super.create(customerAttach);
				}catch(BusinessException e)
		{
				logger.error("Exception Occured While audit"+e.getCause());
		}
		return null;
	}
}
