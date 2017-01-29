package com.inn.headstartdemo.dao;

import java.text.ParseException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import com.inn.headstartdemo.dao.generic.IGenericDao;
import com.inn.headstartdemo.model.Audit;
import com.inn.headstartdemo.exceptions.ValueNotFoundException;

public interface IAuditDao extends IGenericDao<Long, Audit> {
	
	public List<Audit> search(JSONObject searchCriteria) throws ValueNotFoundException,JSONException,ParseException;
	public List<Audit> getLoggedInUsers() throws ValueNotFoundException;
	public Long getTotalCount();
}
