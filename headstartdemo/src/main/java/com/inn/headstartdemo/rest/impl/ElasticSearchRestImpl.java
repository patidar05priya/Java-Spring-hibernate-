package com.inn.headstartdemo.rest.impl;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.service.IElasticSearchService;

import com.inn.headstartdemo.rest.IElasticSearchRest;


@Path("/ElasticSearch")
@Produces("application/json")
@Consumes("application/json")
@Service("ElasticSearchRestImpl")
public class ElasticSearchRestImpl implements IElasticSearchRest{
	/** The logger. */
	private static Logger logger= LoggerFactory.getLogger(ElasticSearchRestImpl.class);
	
	/** The elastic search service. */
	@Autowired
	private IElasticSearchService service;
	
	/**
	 * Returns the search index.
	 *
	 * @param term the term
	 * @param term the type
	 * @return the String
	*/	
	@ExceptionHandler 
	@GET
	@Override
	@Path("searchIndex")
	@Produces("application/json")
	public  String searchIndex(@QueryParam("term") String term,@QueryParam("type") String type){
		return service.searchIndex(term,type, 0, 50);
	}
	
	/**
	 * Returns the search all index.
	 *
	 * @param term the term
	 * @param term the type
	 * @return the String
	*/	
	@ExceptionHandler 
	@GET
	@Override
	@Path("searchAllIndex")
	@Produces("application/json")
	public  String searchAllIndex(@QueryParam("term") String term,@QueryParam("type") String type){
		return service.searchIndex(term,null, 0, 50);
	}
}
