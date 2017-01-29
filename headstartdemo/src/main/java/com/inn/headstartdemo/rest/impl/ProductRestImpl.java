package com.inn.headstartdemo.rest.impl;

import java.util.List;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.QueryParam;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.generic.IGenericService;
import com.inn.headstartdemo.rest.generic.AbstractCXFRestService;
import com.inn.headstartdemo.service.IProductService;
import com.inn.headstartdemo.model.Product;
import com.inn.headstartdemo.service.IElasticSearchService;
import com.inn.headstartdemo.rest.IProductRest;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.model.Product;
import java.lang.Integer;

import com.inn.headstartdemo.exceptions.ExceptionHandler;

import com.inn.headstartdemo.service.IActivityStreamService;
import com.inn.headstartdemo.audit.Auditable;
import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.audit.AuditActionType;
/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
import javax.validation.Valid;
 
/**
 * 
 * Rest 
 *
 */
 
@ExceptionHandler @Path("/Product")
@Produces("application/json")
@Consumes("application/json")
@Service("ProductRestImpl")

public class ProductRestImpl extends AbstractCXFRestService<Integer, Product> implements IProductRest {
private Logger logger=LoggerFactory.getLogger(ProductRestImpl.class);
	public ProductRestImpl() {
		super(Product.class);
	}
	@Autowired
	private IProductService productService;
	
		@Autowired
	IElasticSearchService elasticSearchService;
	
	
	@Context
	private SearchContext context;

	

		@Autowired
	IActivityStreamService activityservice;
		
	/**
	 * 
	 *Returns the list of all Product
	 *@returns a list of Product
	 * 
	 */
	 @ExceptionHandler public List<Product> findAll()throws BusinessException{
	
	return productService.findAll();
	
	}

	/**
	 * 
	 *Returns the Product finding by id
	 *@parameter id of type Integer
	 *@returns a Product record 
	 * 
	 */	
	 @ExceptionHandler public Product findById(@QueryParam("") Integer id)throws BusinessException{
		
		logger.info("Find record by id :"+id);
		return productService.findById(id);
		
		 	}
	
	
	/**
	 * 
	 *Returns the record by searching Product name
	 *@parameter product of typeProduct 
	 *@returns a list of Product record
	 * 
	 */	
	@ExceptionHandler @GET
	public List<Product> search(@QueryParam("") Product product) throws BusinessException{
		return productService.search(product);
	}
	
		
	/**
	 * 
	 *Returns the list of Product by using lowerlimit and upper limit
	 *@path get path and produce Product list
	 *@parameter llimit ulimit of type integer in query param
	 *@returns a list of Product record
	 * 
	 */		
	@ExceptionHandler @GET
	@Path("search")
	@Produces("application/json")
	public List<Product> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit,@QueryParam("orderBy") String orderBy,@QueryParam("orderType") String orderType)throws BusinessException{
			return productService.searchWithLimitAndOrderBy(context,upperLimit,lowerLimit,orderBy,orderType);
		
	}


	
	/**
	 * 
	 *Returns the new Product record
	 *@path get path and produce Product record
	 *@parameter valid Product entity
	 *@returns a new Product record
	 * 
	 */	
	@ExceptionHandler @Override
	@POST
	@Path("create")
		@Auditable(actionType=AuditActionType.CREATE,actionName=AuditActionName.PRODUCT_CREATE)
		public Product create(@Valid Product product) throws BusinessException{
		logger.info("Create record for product : "+product);
		Users username =CustomerInfo.getUserInContext();
		
				product=productService.create(product);
		
				
				activityservice.createActivity(username.getFirstname()+" Created a Product "+product.getProductName(), product.getProductCode().toString(), "Product");
					
		return product;
		
	}

	/**
	 * 
	 *Returns the updated Product record
	 *@path get path and produces updated Product record
	 *@parameter valid Product entity
	 *@returns a updated Product record
	 * 
	 */	
	@ExceptionHandler @Override
	@PUT
	@Path("update")
		@Auditable(actionType=AuditActionType.UPDATE,actionName=AuditActionName.PRODUCT_UPDATE)
		public Product update(@Valid Product product) throws BusinessException{
	logger.info("Update record for product : "+product);
	Users username =CustomerInfo.getUserInContext();
		product=productService.update(product);
				
					activityservice.createActivity(username.getFirstname()+" Updated a Product "+product.getProductName(), product.getProductCode().toString(), "Product");
				
				return product;
		
	}

	/**
	 * 
	 *Returns the removed Product record
	 *@path get path and delete Product record 
	 *@parameter valid Product entity
	 *@returns a removed Product record
	 * 
	 */	
	@ExceptionHandler @Override
	@Path("delete")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PRODUCT_DELETE)
		public boolean remove(Product product) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Removing record by product :"+product);
	productService.remove(product);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Product "+product.getProductName(), product.getProductCode().toString(), "Product");
				
			
		return true;
	}

	/**
	 * 
	 *method remove audit action
	 *@path get path to remove audit action
	 *@parameter id of type Integer in path param
	 * 
	 */
	@ExceptionHandler @DELETE
	@Override
	@Path("delete/{id}")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PRODUCT_DELETE)
		public void removeById(@PathParam("id") Integer primaryKey) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Remove record by primary key :"+primaryKey);
		Product product=productService.findById(primaryKey);
		productService.removeById(primaryKey);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Product "+product.getProductName(), product.getProductCode().toString(), "Product");
				
			
	}
	
		
	@ExceptionHandler @Override
	public IGenericService<Integer, Product> getService() {
		return productService;
	}

	@ExceptionHandler @Override
	public SearchContext getSearchContext() {
		return context;
	}
		
	/**
	 * 
	 *Returns the list of audit action using id 
	 *@path get path to search audit action
	 *@parameter id of type Integer in query param
	 * 
	 */
	@ExceptionHandler @GET
	@Path("auditSearch")
	@Produces("application/json")
	public  String auditSearch(@QueryParam("id") Integer pk)throws BusinessException{
		return productService.findAudit(pk).toString();
	}
			
		
	@ExceptionHandler @GET
	@Path("totalCount")
	@Produces("application/json")
      public Long getTotalCount(){
				return productService.getTotalCount();
	}
	
}