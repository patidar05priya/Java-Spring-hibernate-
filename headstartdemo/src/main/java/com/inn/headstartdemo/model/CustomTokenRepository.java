package com.inn.headstartdemo.model;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.web.authentication.rememberme.CookieTheftException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Component;

import com.inn.headstartdemo.dao.ITokenDao;
import com.inn.headstartdemo.dao.impl.TokenDao;
/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
@Component("customTokenRepository")
public class CustomTokenRepository implements PersistentTokenRepository {

	/** The logger. */
	private final Logger logger=LoggerFactory.getLogger(CustomTokenRepository.class);

	/* The token dao */
   @Autowired
   private ITokenDao tokenDao;

   @Override
   public void createNewToken(PersistentRememberMeToken token) {
   	
   	try
   	{
   		tokenDao.createNewToken(new Token(token));
   	}
   	catch(Exception ex)
   	{
   		  throw new CookieTheftException("Autologin failed due to data access problem");
   	}
   }

   @Override
   public void updateToken(String series, String tokenValue, Date lastUsed) {	
   	tokenDao.updateToken(series, tokenValue, lastUsed);
   }

   @Override
   public PersistentRememberMeToken getTokenForSeries(String seriesId) {
   	try
   	{
   
   	Token token = tokenDao.getTokenForSeries(seriesId);
      
       if (token == null) {
       	  throw new CookieTheftException("Autologin failed due to data access problem");
     	}
       return new PersistentRememberMeToken(token.getUsername(),token.getSeries(), token.getTokenValue(),  token.getDate() );
   	}
   	catch(Exception ex)
   	{
   		  throw new CookieTheftException("Autologin failed due to data access problem");
   	}
   }

   @Override
   public void removeUserTokens(String username) {
   	try
   	{
      tokenDao.removeUserTokens(username);
   	}
   	catch(Exception ex)
   	{
   		  throw new CookieTheftException("Autologin failed due to data access problem");
   	}
   }
  }
