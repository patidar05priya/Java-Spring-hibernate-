package com.inn.headstartdemo.utils;

import com.inn.headstartdemo.utils.QueryObject.SearchMode;

public class SearchFilterWrapper {

	public SearchFilterWrapper(String fieldName, SearchMode mode, Object value) {
		super();
		this.fieldName = fieldName;
		this.mode = mode;
		this.value = value;
	}

	private String fieldName;
	
	private SearchMode mode;
	
	private Object value;

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public SearchMode getMode() {
		return mode;
	}

	public void setMode(SearchMode mode) {
		this.mode = mode;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}
}
