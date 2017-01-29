package com.inn.headstartdemo.rest.impl;

import java.util.ArrayList;
import java.util.Iterator;
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

import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.model.Audit;

import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.rest.generic.AbstractCXFRestService;
import com.inn.headstartdemo.service.IAuditService;
import com.inn.headstartdemo.service.generic.IGenericService;
import com.inn.headstartdemo.utils.AdvanceSearchResult;
import com.inn.headstartdemo.utils.QueryObject;
import com.inn.headstartdemo.exceptions.application.BusinessException;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
@Path("/Audit")
@Produces("application/json")
@Consumes("application/json")
@Service("auditRestImpl")

public class AuditRestImpl extends AbstractCXFRestService<Long, Audit> {
	private static Logger logger =LoggerFactory.getLogger(AuditRestImpl.class);
	public AuditRestImpl() {
		super(Audit.class);
	}
	@Autowired
	private IAuditService service;
	
	@Context
	private SearchContext context;
/**
 * find all audit list
 * @param void
 * @return List of Audit
 */
	public List<Audit> findAll()throws BusinessException{
		logger.debug("finding all audits");
		return service.findAll();
	}
	
	@GET
	@Path("findbyid/{id}")
/**
 * find Audit by id
 * @param id of type long
 * @return Audit 
 */
	public Audit findById(@PathParam("id") Long id)throws BusinessException{
		logger.debug("finding all audits for :{}",id);
		return service.findById(id);
	}
	
	@GET
	/**
	 * search Audit List
	 * @param audit  of type Audit 
	 * @return List of Audit
	 */
	public List<Audit> search(@QueryParam("") Audit audit)throws BusinessException{
		return service.search(audit);
	}
	@GET
	@Path("search")
	@Produces("application/json")
	/**
	 * search a list of Audit between two Limits
	 * @param lowerLimit of type integer
	 * @param upperLimit of type integer
	 * @return List of type Audit
	 */
	public List<Audit> search(@QueryParam("llimit") Integer lowerLimit, @QueryParam("ulimit") Integer upperLimit)throws BusinessException{
		logger.debug("finding all audits");
		return service.searchWithLimitAndOrderBy(context,upperLimit,lowerLimit,"date","desc");
	}

	@GET
	@Path("customisedSearch/{jsonObject}")
	@Produces("application/json")
	/**
	 * Audit Search
	 * @param searchCriteria of type JSONObject
	 * @return List
	 */
	public List<Audit> auditSearch(@PathParam("jsonObject")JSONObject searchCriteria)throws BusinessException{
		logger.debug("finding all audits by searchCriteria");
		List<Audit> auditList = new ArrayList<Audit>();
		try {
			auditList.addAll(service.auditSearch(searchCriteria));
		} catch (Exception e) {
			logger.error(e.getMessage());
		
		}
		
		return auditList;
		
	}

	@Override
	@POST
	/** create a Audit
	 *@param audit of type audit
	 *return null
	 */
	public Audit create(Audit audit) throws BusinessException{
		return null;
	}

	@Override
	@PUT
	/**
	 * Update audit 
	 *@param audit of type Audit
	 *@return null 
	 */

	public Audit update(Audit audit) throws BusinessException{
		return null;
	}

	@Override
	/**
	 * remove Audit
	 *@param audit of type Audit
	 *@return boolean 
	 */

	public boolean remove(Audit audit) throws BusinessException{
		return false;
	}

    @DELETE
	@Override
	@Path("/{id}")
	/**
	 * Remove Audit by primary key
	 *@param primary key
	 *@return null 
	 */

	public void removeById(@PathParam("id") Long primaryKey)throws BusinessException
    {
    	
	}

	@Override
	/**
	 * get services from IGenericServices
	 *@param void
	 *@return service 
	 */

	public IGenericService<Long, Audit> getService() {
		return service;
	}

	@Override
	/** get search context
	 *@param void
	 *@return context 
	 */

	public SearchContext getSearchContext() {
		return context;
	}
	
	/** get logged in users
	 * @return
	 * @throws ValueNotFoundException
	 */
	@GET
	@Path("LoggedInUsers")
	@Produces("application/json")
	public List<Audit> getLoggedInUsers() throws ValueNotFoundException{
		logger.debug("finding all audits by searchCriteria");
		return service.getLoggedInUsers();
	}
	
	
	@GET
	@Path("auditEnumValues")
	@Produces("application/json")
	public static List<String> getAuditActionNames()
	{
		List<String> enumList=new ArrayList<String>();
		AuditActionName[] l2=AuditActionName.values();
		for(AuditActionName l3:l2)
		{
			enumList.add(l3.toString());
	
		}
		return enumList;
		
		
		
	}

 @GET
	@Path("totalCount")
	@Produces("application/json")
      public Long getTotalCount(){
				return service.getTotalCount();
	}
}
