
package  com.inn.headstartdemo.dao.impl;

import java.text.ParseException;
import java.util.Date;
import java.util.EnumSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;
import javax.validation.Valid;

import org.apache.commons.lang.time.DateUtils;
import org.hibernate.Session;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import  com.inn.headstartdemo.dao.IAuditDao;
import  com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import  com.inn.headstartdemo.model.Audit;
import  com.inn.headstartdemo.exceptions.ValueNotFoundException;
import  com.inn.headstartdemo.audit.AuditActionName;




/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
 
/**
 * 
 *Audit Dao 
 *
 */
@Repository("auditDao")
public class AuditDaoImpl  extends HibernateGenericDao<Long, Audit>  implements IAuditDao
{
	/** The logger. */
	private Logger logger=LoggerFactory.getLogger(AuditDaoImpl.class);
	
	/**
	 * Instantiates a new audit dao.
	 */
	public AuditDaoImpl()
	{
		super(Audit.class);
	}

    /**
	 * 
	 *method to create audit 
	 *@parameter audit of type Audit
	 *@returns newaudit entity
	 * 
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public Audit create(@Valid Audit audit) {
		return super.create(audit);
	}

    /**
	 * 
	 *method to update audit 
	 *@parameter audit of type Audit
	 *@returns updated audit entity
	 * 
	 */
	@Override
	public Audit update(@Valid Audit audit) {
		return super.update(audit);
	}


    /**
	 * 
	 *method to find list of all audit record 
	 *@returns list of audit
	 * 
	 */
	@Override
	public List<Audit> findAll() {
		return super.findAll();
	}

    /**
	 * 
	 *method to find audit by primary key
	 *@parameter auditPk of type Long 
	 *@returns audit record
	 * 
	 */
	@Override
	public Audit findByPk(Long auditPk) {
		return (super.findByPk(auditPk));
	}
	
	
	/** Audit criteria enum */
	public static enum AuditCriteria{
		USERFULLNAME("USERFULLNAME"),
		ACTIONNAME("ACTIONNAME"),
		ACTIONTYPE("ACTIONTYPE"),
		SUCCESS("SUCCESS");		
		public String toString() {
			return name();
		}
		@SuppressWarnings("unused")
		private String name;
		
		AuditCriteria(String name) {
			this.name = name;
		}


	}
	
	private Set<AuditCriteria> criteriaSet=EnumSet.allOf(AuditCriteria.class);

    /**
	 * 
	 *Returns the List audit search record finding by criteria 
	 *@parameter searchCriteria of type JSONObject 
	 *@returns audit record
	 * 
	 */
	public List<Audit> search(JSONObject searchCriteria) throws ValueNotFoundException,JSONException, ParseException{
		Session session = (Session) getEntityManager().getDelegate();
		configureFilters(searchCriteria,session);
		return getAudits();
	}

	public List<Audit> getAudits() throws ValueNotFoundException  {
		return getAuditBySearchCriteria();
	}

    /**
	 * 
	 *Returns the List audit record 
	 *@throws ValueNotFoundException
	 *@returns audit 
	 * 
	 */
	public List<Audit> getAuditBySearchCriteria() throws ValueNotFoundException{
		logger.info("in getAuditBySearchCriteria");
		List<Audit> audits ;
		try
		{
		Query query = getEntityManager().createNamedQuery("getAudits").setMaxResults(1000);
		audits= query .getResultList();
		}
		catch(Exception e)
		{
		 logger.error(e.getMessage());
			logger.debug("no audit available");
			throw new ValueNotFoundException(e);
		}
		return audits;
	}
	/**
	 * 
	 *Returns the List audit record from logged users 
	 *@throws ValueNotFoundException
	 *@returns audit 
	 * 
	 */
	public List<Audit> getLoggedInUsers() throws ValueNotFoundException{
		logger.info("in getLoggedInUsers");
		List<Audit> audits ;
		try
		{
		Query query = getEntityManager().createNamedQuery("getLoggedInUsersFromAudit");
		query = query.setParameter("login", AuditActionName.LOGIN);
		query = query.setParameter("logout", AuditActionName.LOGOUT);
		query = query.setParameter("passedDate", DateUtils.addDays(new Date(),-1));
		audits= query .getResultList();
		}
		catch(Exception e)
		{
		 logger.error(e.getMessage());
			logger.debug("no audit available");
			throw new ValueNotFoundException(e);
		}
		return audits;
	}
    /**
	 * 
	 *method to configure filters for audit 
	 *@parameter searchCriteria of type JSONObject
	 *@parameter session of type Session
	 * 
	 */
	private void configureFilters(JSONObject searchCriteria, Session session) throws JSONException, ValueNotFoundException, ParseException{
		Iterator<AuditCriteria> itr=criteriaSet.iterator();
		while(itr.hasNext()){
			AuditCriteria criteriaId=itr.next();
			if(searchCriteria.has(criteriaId.name())){
				enableFilter(criteriaId,searchCriteria.get(criteriaId.name()),session);
				
			}
		}
	}

    /**
	 * 
	 *method to enable filters for audit 
	 *@parameter criteriaId of type AuditCriteria
	 *@parameter session of type Session
	 *@parameter value of type Object
	 * 
	 */
	private void enableFilter(AuditCriteria criteriaId,Object value, Session session) throws JSONException, ValueNotFoundException, ParseException{
		logger.info("Enabling filter..");
		switch(criteriaId){
				case USERFULLNAME:{
					session.enableFilter("userfullnameFilter").setParameter("userfullname","%" +(String)value + "%");
					break;
					
				}
				case ACTIONTYPE:{
					session.enableFilter("actiontypeFilter").setParameter("actiontype", (String)value);
					break;
					
				}
				case ACTIONNAME :{
					session.enableFilter("actionnameFilter").setParameter("actionname", (String)value);
					break;
				}
				case SUCCESS :{
					session.enableFilter("successFilter").setParameter("success", (String)value);
					break;
				}

			}
	}
	
	public Long getTotalCount(){
	 		return ((Long)this.getEntityManager().createQuery("select count(x) from Audit x").getSingleResult());		
		}

}
