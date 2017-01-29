package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.Address;
import java.lang.Integer;

/**
 * 
 * @author Team
 * @version y
 *
 */
public interface IAddressRest {
	public List<Address> findAll();	
	public Address findById(@QueryParam("") Integer id);	
	public List<Address> search(@QueryParam("") Address student);
	public List<Address> search(SearchContext qo);
}
