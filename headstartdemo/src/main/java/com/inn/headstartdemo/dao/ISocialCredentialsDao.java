package com.inn.headstartdemo.dao;

import java.util.List;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.dao.generic.IGenericDao;
import com.inn.headstartdemo.model.SocialCredentials;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ISocialCredentialsDao extends IGenericDao<Integer, SocialCredentials> {

	public List<SocialCredentials> findByFacebookID(String id);
	public List<SocialCredentials> findByGoogleID(String id);
	public SocialCredentials findByUserId(Integer id)  throws ValueNotFoundException;
}
