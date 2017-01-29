package com.inn.headstartdemo.service;
import org.springframework.scheduling.annotation.Async;

public interface IElasticSearchService {

	
	public String searchIndex(String term,String type, int i, int j);
	
	@Async
	public void createIndex(String id, String name, String type);
	
	@Async
	public void updateDocument(String type, String id, String field,String newValue);
	
	@Async
	public void deleteDocument(String type, String id);

}