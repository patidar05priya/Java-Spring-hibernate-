package com.inn.headstartdemo.rest;

public interface IElasticSearchRest {

	public String searchIndex(String term, String type);

	public String searchAllIndex(String term, String type);

}