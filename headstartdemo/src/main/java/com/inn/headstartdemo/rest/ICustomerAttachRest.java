package  com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import  com.inn.headstartdemo.model.CustomerAttach;
import java.lang.Integer;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ICustomerAttachRest {
	public List<CustomerAttach> findAll();	
	public CustomerAttach findById(@QueryParam("") Integer id);	
	public List<CustomerAttach> search(@QueryParam("") CustomerAttach student);
	public List<CustomerAttach> search(SearchContext qo);
}
