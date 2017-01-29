package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.Users;

import java.lang.Long;

/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 */
public interface IUsersRest {
	public List<Users> findAll();	
	public Users findById(@QueryParam("") Long id);	
	public Users findByEmail(String emailid);
	public List<Users> search(@QueryParam("") Users student);
	public List<Users> search(SearchContext qo);
}