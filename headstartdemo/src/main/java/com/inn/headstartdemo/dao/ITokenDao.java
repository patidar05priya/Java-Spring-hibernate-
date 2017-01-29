package com.inn.headstartdemo.dao;


import java.util.Date;

import com.inn.headstartdemo.dao.generic.IGenericDao;
import com.inn.headstartdemo.model.Token;

public interface ITokenDao extends IGenericDao<Integer,Token>  {

	void createNewToken(Token token);

	void updateToken(String series, String tokenValue, Date lastUsed);

	Token getTokenForSeries(String seriesId);

	void removeUserTokens(String username);
}
