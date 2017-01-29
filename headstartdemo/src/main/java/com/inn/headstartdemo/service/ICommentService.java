 package com.inn.headstartdemo.service;


import  com.inn.headstartdemo.exceptions.ValueNotFoundException;
import  com.inn.headstartdemo.model.Comment;
import  com.inn.headstartdemo.service.generic.IGenericService;

import java.lang.Integer;
import java.util.List;


/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ICommentService extends IGenericService<Long, Comment> {
	
		
}