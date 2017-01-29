package com.inn.headstartdemo.utils;

import java.io.Serializable;

public class PieChart implements Serializable{
	
	private String	status;
	
	private String	label;
	
	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	private Long	count;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}
	

}
