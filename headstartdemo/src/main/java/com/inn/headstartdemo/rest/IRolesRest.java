package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.Roles;

import java.lang.Long;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface IRolesRest {
	public List<Roles> findAll();	
	public Roles findById(@QueryParam("") Long id);	
	public List<Roles> search(@QueryParam("") Roles student);
	public List<Roles> search(SearchContext qo);
}
