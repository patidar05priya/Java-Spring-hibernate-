package com.inn.headstartdemo.dao.impl;


import java.util.Date;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.inn.headstartdemo.dao.ITokenDao;
import com.inn.headstartdemo.dao.annotation.Dao;
import com.inn.headstartdemo.dao.generic.impl.HibernateGenericDao;
import com.inn.headstartdemo.model.Token;
@Dao
public class TokenDao extends HibernateGenericDao<Integer, Token> implements ITokenDao{

	private Logger logger = LoggerFactory.getLogger(TokenDao.class);

	public TokenDao() {
		super(Token.class);
	}

	@Transactional (readOnly =false)
	public void createNewToken(Token token) {
				Query query = this.getEntityManager().createNativeQuery("INSERT INTO token (series,tokenValue,date,username) VALUES(:series,:tokenValue,:date,:username)").setParameter("series",token.getSeries()).setParameter("username",token.getUsername()).setParameter("tokenValue",token.getTokenValue()).setParameter("date",token.getDate());
				query.executeUpdate();
	}


	@Transactional (readOnly = false)
	public void updateToken(String series, String tokenValue, Date lastUsed) {

		Token token=getTokenForSeries(series);
				Query query = this.getEntityManager().createNativeQuery("update token set series=:series, tokenValue=:tokenValue,date=:date where id=:tokenId").setParameter("series",series).setParameter("tokenValue",tokenValue).setParameter("date",lastUsed).setParameter("tokenId",token.getId());
				query.executeUpdate();
		
		
	}

	public Token getTokenForSeries(String seriesId) {
		Token token=null;
		try
		{	
			Query query = this.getEntityManager().createNamedQuery("getTokenSeriesList").setParameter("series", seriesId);
			
			token=(Token) query.getSingleResult();
			
		}
		catch(NoResultException ex)
		{
			
			logger.error("Error in getting token for series : "+seriesId+" : "+ex.getMessage());
		}
			return token;
	}

	@Transactional (readOnly = false)
	public void removeUserTokens(final String username) {
		try
		{
		
		Query query = this.getEntityManager().createNativeQuery("delete from token where username=:username").setParameter("username",username);
		 
		query.executeUpdate();
		}
		catch(Exception ex)
		{
			logger.error("Error in removing user tokens for username : "+username+" : "+ex.getMessage());
		}
	}
}
