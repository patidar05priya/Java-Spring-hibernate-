package com.inn.headstartdemo.rest.impl;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;
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

import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.audit.AuditActionType;
import com.inn.headstartdemo.audit.Auditable;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.application.BusinessException;

import com.inn.headstartdemo.model.UserConfig;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.rest.generic.AbstractCXFRestService;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.IActivityStreamService;
import com.inn.headstartdemo.service.IUserConfigService;
import com.inn.headstartdemo.service.generic.IGenericService;

/**
 * 
 * Rest 
 *
 */
 
@ExceptionHandler @Path("/UserConfig")
@Produces("application/json")
@Consumes("application/json")
@Service("UserConfigRestImpl")

public class UserConfigRestImpl  extends AbstractCXFRestService<Integer,UserConfig> {
    private Logger logger=LoggerFactory.getLogger(UserConfigRestImpl.class);
	public UserConfigRestImpl() {
		super(UserConfig.class);
	}
	@Autowired
	private IUserConfigService userConfigService;
	
	@Context
	private SearchContext context;

	
		@Autowired
	IActivityStreamService activityservice;
		
		/**
		 * 
		 *Returns the record by searching userConfig name
		 *@parameter userConfig of typeuserConfig 
		 *@returns a list of userConfig record
		 * 
		 */	
		@ExceptionHandler @GET
		public List<UserConfig> search(@QueryParam("") UserConfig userConfig) throws BusinessException{
			return userConfigService.search(userConfig);
		}
		
			
		/**
		 * 
		 *Returns the list of userConfig by using lowerlimit and upper limit
		 *@path get path and produce userConfig list
		 *@parameter llimit ulimit of type integer in query param
		 *@returns a list of userConfig record
		 * 
		 */		
		@ExceptionHandler @GET
		@Path("search")
		@Produces("application/json")
	public List<UserConfig> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit,@QueryParam("orderBy") String orderBy,@QueryParam("orderType") String orderType)throws BusinessException{
					return userConfigService.searchWithLimitAndOrderBy(context,upperLimit,lowerLimit,orderBy,orderType);
			
		}


		
		/**
		 * 
		 *Returns the new userConfig record
		 *@path get path and produce userConfig record
		 *@parameter valid userConfig entity
		 *@returns a new userConfig record
		 * 
		 */	
		@ExceptionHandler @Override
		@POST
		@Path("create")
			public UserConfig create(@Valid UserConfig userConfig) throws BusinessException{
			Users username =CustomerInfo.getUserInContext();
		
				logger.info("Create record by userConfig :"+userConfig);
				userConfig=userConfigService.create(userConfig);
				String userLanguage="";
			if(userConfig.getUserLanguage().name().equals("en"))
			{
			    userLanguage="English";
			}
			if(userConfig.getUserLanguage().name().equals("sp"))
			{
			    userLanguage="Spanish";
			}
			if(userConfig.getUserLanguage().name().equals("fr"))
			{
			    userLanguage="French";
			}
			{
			    activityservice.createActivity(username.getFirstname()+" Created a userConfig "+userLanguage, userLanguage, "UserConfig");
			}
			return userConfig;
			
		}
		
		/**
		 * 
		 *Returns the updated userConfig record
		 *@path get path and produces updated userConfig record
		 *@parameter valid userConfig entity
		 *@returns a updated userConfig record
		 * 
		 */	
		@ExceptionHandler @Override
		@PUT
		@Path("update")
		public UserConfig update(@Valid UserConfig userConfig) throws BusinessException{
			Users username =CustomerInfo.getUserInContext();
		
			logger.info("Updating record by userConfig :"+userConfig);
				userConfig.setTimeZone(userConfigService.findById(userConfig.getId()).getTimeZone());
			userConfig=userConfigService.update(userConfig);
			String userLanguage="";
			if(userConfig.getUserLanguage().name().equals("en"))
			{
			    userLanguage="English";
			}
			if(userConfig.getUserLanguage().name().equals("sp"))
			{
			    userLanguage="Spanish";
			}
			if(userConfig.getUserLanguage().name().equals("fr"))
			{
			    userLanguage="French";
			}
					{
					    activityservice.createActivity(username.getFirstname()+" changed language to  "+userLanguage, userLanguage, "UserConfig");
					}
					return userConfig;
			
		}

		/**
		 * 
		 *Returns the removed userConfig record
		 *@path get path and delete userConfig record 
		 *@parameter valid userConfig entity
		 *@returns a removed userConfig record
		 * 
		 */	
		@ExceptionHandler @Override
		
			
			public boolean remove(UserConfig userConfig) throws BusinessException{
		Users username =CustomerInfo.getUserInContext();
		logger.info("Removing record by userConfig :"+userConfig);
		userConfigService.remove(userConfig);
					{
					    activityservice.createActivity(username.getFirstname()+" Deleted a userConfig "+userConfig.getUserid(), userConfig.getUserLanguage().toString(), "userConfig");
					}
					
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
			
			public void removeById(@PathParam("id") Integer primaryKey) throws BusinessException{
		Users username =CustomerInfo.getUserInContext();
		logger.info("Remove record by primary key :"+primaryKey);
		UserConfig userConfig=userConfigService.findById(primaryKey);
		userConfigService.removeById(primaryKey);
					{
					    activityservice.createActivity(username.getFirstname()+" Deleted a userConfig "+userConfig.getUserid(), userConfig.getUserLanguage().toString(), "userConfig");
					}
				
		}

		@ExceptionHandler @Override
		public IGenericService<Integer, UserConfig> getService() {
			return userConfigService;
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
			return userConfigService.findAudit(pk).toString();
		}


		@Override
		public UserConfig findById(Integer primaryKey)
			throws BusinessException {
		    // TODO Auto-generated method stub
		    return null;
		}


		@Override
		public List<UserConfig> findAll() throws BusinessException {
		    // TODO Auto-generated method stub
		    return null;
		}

}
