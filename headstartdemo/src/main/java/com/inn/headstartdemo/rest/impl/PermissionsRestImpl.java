package com.inn.headstartdemo.rest.impl;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.headstartdemo.model.Permissions;
import com.inn.headstartdemo.service.IPermissionsService;
import com.inn.headstartdemo.utils.QueryObject;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.IActivityStreamService;
import com.inn.headstartdemo.service.generic.IGenericService;
import com.inn.headstartdemo.utils.AdvanceSearchResult;
import com.inn.headstartdemo.rest.generic.AbstractCXFRestService;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.audit.Auditable;
import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.audit.AuditActionType;


import com.inn.headstartdemo.exceptions.ExceptionHandler;
/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
/**
 * 
 * Rest of Permissions
 *
 */
 @ExceptionHandler
@Path("/Permissions")
@Produces("application/json")
@Consumes("application/json")
@Service("PermissionsRestImpl")

public class PermissionsRestImpl extends AbstractCXFRestService<Long, Permissions> {
private Logger logger=LoggerFactory.getLogger(PermissionsRestImpl.class);
	public PermissionsRestImpl() {
		super(Permissions.class);
	}
	@Autowired
	private IPermissionsService service;
	
	@Context
	private SearchContext context;
	@Autowired
	IActivityStreamService activityservice;
	
   /**
	 * 
	 *method to search list of permissions
	 *@returns Permissions
	 *
	 */
	 @ExceptionHandler
	public List<Permissions> findAll()throws BusinessException{
		return service.findAll();
	}
	
	/**
	 * 
	 *method to find permission by id
	 *@parameter id of type Long
	 *@returns Permission
	 *
	 */
	 @ExceptionHandler
	public Permissions findById(@QueryParam("") Long id)throws BusinessException{
	logger.info("Finding permission by id :"+id);
		return service.findById(id);
	}
	
	/**
	 * 
	 *method to find list of permissions by entity
	 *@parameter permission of type Permissions
	 *@returns Permissions
	 *
	 */
	@ExceptionHandler
	@GET
	public List<Permissions> search(@QueryParam("") Permissions permission)throws BusinessException{
	logger.info("Searching Permission list by permission :"+permission);
		return service.search(permission);
	}
	
	/**
	 * 
	 *method to search list of permissions 
	 *@path get path and produce result
	 *@parameter llimit ulimit of type Integer
	 *@returns Permissions
	 *
	 */
	 @ExceptionHandler
	@GET
	@Path("search")
	@Produces("application/json")
	public List<Permissions> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit)throws BusinessException{
		QueryObject queryObject = transform(context);
		if(lowerLimit != null && upperLimit != null){
			queryObject.setPaginationLowerLimit(lowerLimit);
			queryObject.setPaginationUpperLimit(upperLimit);
		}
	
		AdvanceSearchResult<Permissions> advanceResults = advanceSearch(queryObject);
		
		return advanceResults.getResults();
		
	}
    @ExceptionHandler
	@Override
	@POST
	@Path("create")
		@Auditable(actionType=AuditActionType.CREATE,actionName=AuditActionName.PERMISSION_CREATE)	
		public Permissions create(Permissions permission) throws BusinessException{
		Users username =CustomerInfo.getUserInContext();
    	Permissions permissions=service.create(permission);
    	activityservice.createActivity(username.getFirstname()+" Created a Permission "+permissions.getPermissionname(), permissions.getPermissionid().toString(), "Permissions");
    	
    
	return permissions;
	
}
    @ExceptionHandler
	@Override
	@PUT
	@Path("update")
		@Auditable(actionType=AuditActionType.UPDATE,actionName=AuditActionName.PERMISSION_UPDATE)	
		
	/**
	 * 
	 *method to update permissions 
	 *@parameter permission of type Permissions
	 *@returns update Permissions
	 *
	 */
	public Permissions update(Permissions permission)throws BusinessException {
	logger.info("Updating Permission by entity :"+permission);
	Users username =CustomerInfo.getUserInContext();
	
	activityservice.createActivity(username.getFirstname()+" Updated a Permission "+permission.getPermissionname(), permission.getPermissionid().toString(), "Permissions");
	
	return service.update(permission);
	}

    @ExceptionHandler
	@Override
	@Path("delete")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PERMISSION_DELETE)	
		public boolean remove(Permissions permission) throws BusinessException{
	logger.info("Removing Permission by entity :"+permission);
		service.remove(permission);
		Users username =CustomerInfo.getUserInContext();
		
		activityservice.createActivity(username.getFirstname()+" Deleted a Permission "+permission.getPermissionname(), permission.getPermissionid().toString(), "Permissions");
		
		return true;
	}

	/**
	 * 
	 *method to remove permissions by primarykey
	 *@path get path and id at pathparam
	 *@param primaryKey of type Long
	 *@return remove Permissions
	 *
	 */
	@ExceptionHandler
    @DELETE
	@Override
	@Path("/{id}")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.PERMISSION_DELETE)	
		public void removeById(@PathParam("id") Long primaryKey)throws BusinessException {
	logger.info("Removing Permission by primaryKey :"+primaryKey);
	Users username =CustomerInfo.getUserInContext();
	
	activityservice.createActivity(username.getFirstname()+" Deleted a Permission "+service.findById(primaryKey).getPermissionname(),service.findById(primaryKey).getPermissionid().toString(), "Permissions");

	service.removeById(primaryKey);
	}
	
	@ExceptionHandler
	@Override
	public IGenericService<Long, Permissions> getService() {
		return service;
	}
	
	@ExceptionHandler
	@Override
	public SearchContext getSearchContext() {
		return context;
	}
	@ExceptionHandler @GET
	@Path("totalCount")
	@Produces("application/json")
      public Long getTotalCount(){
				return service.getTotalCount();
	}
}
