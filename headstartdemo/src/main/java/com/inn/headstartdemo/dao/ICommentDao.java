 package com.inn.headstartdemo.dao;

import java.util.List;



import com.inn.headstartdemo.dao.generic.IGenericDao;
import com.inn.headstartdemo.model.Comment;
import com.inn.headstartdemo.model.Customer;
import com.inn.headstartdemo.model.Office;

/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ICommentDao extends IGenericDao<Long, Comment> {

public Long customerCommentCount(Customer customer);
public Long officeCommentCount(Office office);

}
