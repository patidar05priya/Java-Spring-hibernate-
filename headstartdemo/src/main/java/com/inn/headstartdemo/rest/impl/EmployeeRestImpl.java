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
import com.inn.headstartdemo.service.IEmployeeService;
import com.inn.headstartdemo.model.Employee;
import com.inn.headstartdemo.service.IElasticSearchService;
import com.inn.headstartdemo.rest.IEmployeeRest;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.model.Employee;
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
 
@ExceptionHandler @Path("/Employee")
@Produces("application/json")
@Consumes("application/json")
@Service("EmployeeRestImpl")

public class EmployeeRestImpl extends AbstractCXFRestService<Integer, Employee> implements IEmployeeRest {
private Logger logger=LoggerFactory.getLogger(EmployeeRestImpl.class);
	public EmployeeRestImpl() {
		super(Employee.class);
	}
	@Autowired
	private IEmployeeService employeeService;
	
		@Autowired
	IElasticSearchService elasticSearchService;
	
	
	@Context
	private SearchContext context;

	

		@Autowired
	IActivityStreamService activityservice;
		
	/**
	 * 
	 *Returns the list of all Employee
	 *@returns a list of Employee
	 * 
	 */
	 @ExceptionHandler public List<Employee> findAll()throws BusinessException{
	
	return employeeService.findAll();
	
	}

	/**
	 * 
	 *Returns the Employee finding by id
	 *@parameter id of type Integer
	 *@returns a Employee record 
	 * 
	 */	
	 @ExceptionHandler public Employee findById(@QueryParam("") Integer id)throws BusinessException{
		
		logger.info("Find record by id :"+id);
		return employeeService.findById(id);
		
		 	}
	
	
	/**
	 * 
	 *Returns the record by searching Employee name
	 *@parameter employee of typeEmployee 
	 *@returns a list of Employee record
	 * 
	 */	
	@ExceptionHandler @GET
	public List<Employee> search(@QueryParam("") Employee employee) throws BusinessException{
		return employeeService.search(employee);
	}
	
		
	/**
	 * 
	 *Returns the list of Employee by using lowerlimit and upper limit
	 *@path get path and produce Employee list
	 *@parameter llimit ulimit of type integer in query param
	 *@returns a list of Employee record
	 * 
	 */		
	@ExceptionHandler @GET
	@Path("search")
	@Produces("application/json")
	public List<Employee> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit,@QueryParam("orderBy") String orderBy,@QueryParam("orderType") String orderType)throws BusinessException{
			return employeeService.searchWithLimitAndOrderBy(context,upperLimit,lowerLimit,orderBy,orderType);
		
	}


	
	/**
	 * 
	 *Returns the new Employee record
	 *@path get path and produce Employee record
	 *@parameter valid Employee entity
	 *@returns a new Employee record
	 * 
	 */	
	@ExceptionHandler @Override
	@POST
	@Path("create")
		@Auditable(actionType=AuditActionType.CREATE,actionName=AuditActionName.EMPLOYEE_CREATE)
		public Employee create(@Valid Employee employee) throws BusinessException{
		logger.info("Create record for employee : "+employee);
		Users username =CustomerInfo.getUserInContext();
		
				employee=employeeService.create(employee);
		
				
				activityservice.createActivity(username.getFirstname()+" Created a Employee "+employee.getFirstName(), employee.getEmployeeNumber().toString(), "Employee");
					
		return employee;
		
	}

	/**
	 * 
	 *Returns the updated Employee record
	 *@path get path and produces updated Employee record
	 *@parameter valid Employee entity
	 *@returns a updated Employee record
	 * 
	 */	
	@ExceptionHandler @Override
	@PUT
	@Path("update")
		@Auditable(actionType=AuditActionType.UPDATE,actionName=AuditActionName.EMPLOYEE_UPDATE)
		public Employee update(@Valid Employee employee) throws BusinessException{
	logger.info("Update record for employee : "+employee);
	Users username =CustomerInfo.getUserInContext();
		employee=employeeService.update(employee);
				
					activityservice.createActivity(username.getFirstname()+" Updated a Employee "+employee.getFirstName(), employee.getEmployeeNumber().toString(), "Employee");
				
				return employee;
		
	}

	/**
	 * 
	 *Returns the removed Employee record
	 *@path get path and delete Employee record 
	 *@parameter valid Employee entity
	 *@returns a removed Employee record
	 * 
	 */	
	@ExceptionHandler @Override
	@Path("delete")
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.EMPLOYEE_DELETE)
		public boolean remove(Employee employee) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Removing record by employee :"+employee);
	employeeService.remove(employee);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Employee "+employee.getFirstName(), employee.getEmployeeNumber().toString(), "Employee");
				
			
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
		@Auditable(actionType=AuditActionType.DELETE,actionName=AuditActionName.EMPLOYEE_DELETE)
		public void removeById(@PathParam("id") Integer primaryKey) throws BusinessException{
	Users username =CustomerInfo.getUserInContext();
	logger.info("Remove record by primary key :"+primaryKey);
		Employee employee=employeeService.findById(primaryKey);
		employeeService.removeById(primaryKey);
				
				activityservice.createActivity(username.getFirstname()+" Deleted a Employee "+employee.getFirstName(), employee.getEmployeeNumber().toString(), "Employee");
				
			
	}
	
		
	@ExceptionHandler @Override
	public IGenericService<Integer, Employee> getService() {
		return employeeService;
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
		return employeeService.findAudit(pk).toString();
	}
			
		
	@ExceptionHandler @GET
	@Path("totalCount")
	@Produces("application/json")
      public Long getTotalCount(){
				return employeeService.getTotalCount();
	}
	
}
