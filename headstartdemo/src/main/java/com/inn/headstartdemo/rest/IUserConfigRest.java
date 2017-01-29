package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.UserConfig;

public interface IUserConfigRest {
    	public List<UserConfig> findAll();	
	public UserConfig findById(@QueryParam("") Integer id);	
	public List<UserConfig> search(@QueryParam("") UserConfig userConfig);
	public List<UserConfig> search(SearchContext qo);
}
