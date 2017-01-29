package com.inn.headstartdemo.rest;

import java.util.List;

import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;

import com.inn.headstartdemo.model.FileUploads;
import java.lang.Integer;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface IFileUploadsRest {
	public List<FileUploads> findAll();	
	public FileUploads findById(@QueryParam("") Integer id);	
	public List<FileUploads> search(@QueryParam("") FileUploads student);
	public List<FileUploads> search(SearchContext qo);
}
