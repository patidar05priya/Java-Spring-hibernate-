package com.inn.headstartdemo.service;

import java.util.List;

import com.inn.headstartdemo.model.SocialCredentials;
import com.inn.headstartdemo.service.generic.IGenericService;


/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ISocialCredentialsService extends IGenericService<Integer, SocialCredentials> {

 public List<SocialCredentials> findByFacebookId(String fbId);
 public List<SocialCredentials> findByGoogleId(String googleId);
}
