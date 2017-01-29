package com.inn.headstartdemo.dao.impl;

import java.util.List;

import javax.persistence.Query;
import javax.validation.Valid;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.dao.ISocialCredentialsDao;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.model.SocialCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
/**
 * 
 * SocialCredentials Dao 
 * 
 */
@Dao
public class SocialCredentialsDaoImpl extends HibernateGenericDao<Integer, SocialCredentials> implements ISocialCredentialsDao {


private Logger logger=LoggerFactory.getLogger(SocialCredentialsDaoImpl.class);

	public SocialCredentialsDaoImpl() {
		super(SocialCredentials.class);
	}

    /**
	 * 
	 *Returns the new entity of SocialCredentials
	 *@parameter socialCredentials of type SocialCredentials
	 *@returns a new entity
	 * 
	 */
	@Override
	public SocialCredentials create(@Valid SocialCredentials socialCredentials) {
		return super.create(socialCredentials);
	}

    /**
	 *  
	 *Returns the updated entity of SocialCredentials
	 *@parameter socialCredentials of type SocialCredentials
	 *@returns a update entity
	 * 
	 */
	@Override
	public SocialCredentials update(@Valid SocialCredentials socialCredentials) {
		return super.update(socialCredentials);
	}

    /**
	 * 
	 *method to  delete the entity of SocialCredentials 
	 *@parameter socialCredentials of type SocialCredentials
	 * 
	 */
	@Override
	public void delete(SocialCredentials socialCredentials) {
		super.delete(socialCredentials);
	}

    /**
	 * 
	 *method to  delete the entity of SocialCredentials by primary key
	 *@parameter socialCredentialsPk of type Integer
	 * 
	 */
	@Override
	public void deleteByPk(Integer socialCredentialsPk) {
		super.deleteByPk(socialCredentialsPk);
	}

    /**
	 * 
	 *Returns the list of SocialCredentials
	 *@returns a list of entity
	 * 
	 */
	@Override
	public List<SocialCredentials> findAll() {
		return super.findAll();
	}

    /**
	 * 
	 *Returns the entity of SocialCredentials by primary key
	 *@parameter socialCredentialsPk of type Integer
	 *@returns an entity 
	 * 
	 */
	@Override
	public SocialCredentials findByPk(Integer socialCredentialsPk) {
		return (super.findByPk(socialCredentialsPk));
	}


    /**
	 * 
	 *Returns the list of SocialCredentials find by FacebookID 
	 *@parameter id of type String
	 *@returns a list of entity
	 * 
	 */
	@Override
	public List<SocialCredentials> findByFacebookID(String id) {
		List<SocialCredentials> listSocial=null;
		try{
			Query query =getEntityManager().createNamedQuery("findByFacebookID").setParameter("facebookId", id);
			return query.getResultList();
		  
		}catch(Exception e){	
logger.error("exception getting facebook users return antity");		
logger.error(""+e.getMessage());
				return listSocial;
		}
	
	
	}
	/**
	 * 
	 *Returns the list of SocialCredentials find by GoogleID 
	 *@parameter id of type String
	 *@returns a list of entity
	 * 
	 */
	@Override
	public List<SocialCredentials> findByGoogleID(String id){
		List<SocialCredentials> listSocial=null;
		try{
			Query query=getEntityManager().createNamedQuery("findByGoogleID").setParameter("googleId", id);
			return query.getResultList();
		}catch (Exception e) {
			logger.error("exception getting facebook users return antity");
			logger.error(""+e.getMessage());
			return listSocial;
		}
			
				
	}
	
	/**
	 * 
	 *method to find the SocialCredentials find by UserID 
	 *@parameter id of type Integer
	 *@returns a social entity
	 * 
	 */
	@Override
	public SocialCredentials findByUserId(Integer id) throws ValueNotFoundException {
		SocialCredentials social=null;
		try{
			Query query=getEntityManager().createNamedQuery("findByuserID").setParameter("userid",id);
			social=  (SocialCredentials)query.getSingleResult();
			return social;
		}catch (Exception e) {
		   logger.error(e.getMessage());
				 throw new ValueNotFoundException(e);
		}	
		
	}

}
