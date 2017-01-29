package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.Users;

public interface IActivityStreamRest {
	public List<Users> findAll();	
	public Users findById(@QueryParam("") Long id);	
	public List<Users> search(@QueryParam("") Users student);
	public List<Users> search(SearchContext qo);

}
