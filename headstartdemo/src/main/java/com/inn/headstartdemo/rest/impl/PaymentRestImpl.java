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
import com.inn.headstartdemo.service.IPaymentService;
import com.inn.headstartdemo.model.Payment;
import com.inn.headstartdemo.service.IElasticSearchService;
import com.inn.headstartdemo.rest.IPaymentRest;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.model.Payment;
import java.lang.Long;

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
 
@ExceptionHandler @Path("/Payment")
@Produces("application/json")
@Consumes("application/json")
@Service("PaymentRestImpl")

public class PaymentRestImpl extends AbstractCXFRestService<Long, Payment> implements IPaymentRest {
private Logger logger=LoggerFactory.getLogger(PaymentRestImpl.class);
	public PaymentRestImpl() {
		super(Payment.class);
	}
	@Autowired
	private IPaymentService paymentService;
	
		@Autowired
	IElasticSearchService elasticSearchService;
	
	
	@Context
	private SearchContext context;

	

		@Autowired
	IActivityStreamService activityservice;
		
	/**
	 * 
	 *Returns the list of all Payment
	 *@returns a list of Payment
	 * 
	 */
	 @ExceptionHandler public List<Payment> findAll()throws BusinessException{
	
	return paymentService.findAll();
	
	}

	/**
	 * 
	 *Returns the Payment finding by id
	 *@parameter id of type Long
	 *@returns a Payment record 
	 * 
	 */	
	 @ExceptionHandler public Payment findById(@QueryParam("") Long id)throws BusinessException{
		
		logger.info("Find record by id :"+id);
		return paymentService.findById(id);
		
		 	}
	
	
	/**
	 * 
	 *Returns the record by searching Payment name
	 *@parameter payment of typePayment 
	 *@returns a list of Payment record
	 * 
	 */	
	@ExceptionHandler @GET
	public List<Payment> search(@QueryParam("") Payment payment) throws BusinessException{
		return paymentService.search(payment);
	}
	
		
	/**
	 * 
	 *Returns the list of Payment by using lowerlimit and upper limit
	 *@path get path and produce Payment list
	 *@parameter llimit ulimit of type integer in query param
	 *@returns a list of Payment record
	 * 
	 */		
	@ExceptionHandler @GET
	@Path("search")
	@Produces("application/json")
	public List<Payment> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit,@QueryParam("orderBy") String orderBy,@QueryParam("orderType") String orderType)throws BusinessException{
			return paymentService.searchWithLimitAndOrderBy(context,upperLimit,lowerLimit,orderBy,orderType);
		
	}


	
	/**
	 * 
	 *Returns the new Payment record
	 *@path get path and produce Payment record
	 *@parameter valid Payment entity
	 *@returns a new Payment record
	 * 
	 */	
	@ExceptionHandler @Override
	@POST
	@Path("create")
		@Auditable(actionType=AuditActionType.CREATE,actionName=AuditActionName.PAYMENT_CREATE)
		public Payment create(@Valid Payment payment) throws BusinessException{
		logger.info("Create record for payment : "+payment);
		Users username =CustomerInfo.getUserInContext();
		
				payment=paymentService.create(payment);
		
				
				activityservice.createActivity(username.getFirstname()+" Created a Payment "+payment.getId(), payment.getId().toString(), "Payment");
					
		return payment;
		
	}

	/**
	 * 
	 *Returns the updated Payment record
	 *@path get path and produces updated Payment record
	 *@parameter valid Payment entity
	 *@returns a updated Payment record
	 * 
	 */	
	@ExceptionHandler @Override
	@PUT
	@Path("update")
		@Auditable(actionType=AuditActionType.UPDATE,actionName=AuditActionName.PAYMENT_UPDATE)
		public Payment update(@Valid Payment payment) throws BusinessException{
	logger.info("Update record for payment : "+payment);
	Users username =CustomerInfo.getUserInContext();
		payment=paymentService.update(payment);
				
					activityservice.createActivity(username.getFirstname()+" Updated a Payment "+payment.getId(), payment.getId().toString(), "Payment");
				
				return payment;
		
	}

	/**
	 * 
	 *Returns the removed Payment record
	 *@path get path and delete Payment record 
	 *@parameter valid Payment entity
	 *@returns a removed Payment record
	 * 
	 */	
	@ExceptionHandler @Override
	@Path("delete")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PAYMENT_DELETE)
		public boolean remove(Payment payment) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Removing record by payment :"+payment);
	paymentService.remove(payment);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Payment "+payment.getId(), payment.getId().toString(), "Payment");
				
			
		return true;
	}

	/**
	 * 
	 *method remove audit action
	 *@path get path to remove audit action
	 *@parameter id of type Long in path param
	 * 
	 */
	@ExceptionHandler @DELETE
	@Override
	@Path("delete/{id}")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PAYMENT_DELETE)
		public void removeById(@PathParam("id") Long primaryKey) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Remove record by primary key :"+primaryKey);
		Payment payment=paymentService.findById(primaryKey);
		paymentService.removeById(primaryKey);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Payment "+payment.getId(), payment.getId().toString(), "Payment");
				
			
	}
	
		
	@ExceptionHandler @Override
	public IGenericService<Long, Payment> getService() {
		return paymentService;
	}

	@ExceptionHandler @Override
	public SearchContext getSearchContext() {
		return context;
	}
		
	/**
	 * 
	 *Returns the list of audit action using id 
	 *@path get path to search audit action
	 *@parameter id of type Long in query param
	 * 
	 */
	@ExceptionHandler @GET
	@Path("auditSearch")
	@Produces("application/json")
	public  String auditSearch(@QueryParam("id") Long pk)throws BusinessException{
		return paymentService.findAudit(pk).toString();
	}
			
		
	@ExceptionHandler @GET
	@Path("totalCount")
	@Produces("application/json")
      public Long getTotalCount(){
				return paymentService.getTotalCount();
	}
	
}
