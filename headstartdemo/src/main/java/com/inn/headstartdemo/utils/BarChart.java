package com.inn.headstartdemo.utils;

import java.util.List;
/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
public class BarChart {
	public static class DataWrapperBar{
		
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	
	    /** The count */
		private String count;
		/** The name */
		private String name;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
	
}

/** The xtitle */
private String xtitle;
/** The ytitle */
private String ytitle;
public String getXtitle() {
	return xtitle;
}

public void setXtitle(String xtitle) {
	this.xtitle = xtitle;
}

public String getYtitle() {
	return ytitle;
}

public void setYtitle(String ytitle) {
	this.ytitle = ytitle;
}

public String getChartTitle() {
	return chartTitle;
}

public void setChartTitle(String chartTitle) {
	this.chartTitle = chartTitle;
}

public List<DataWrapperBar> getData() {
	return data;
}

public void setData(List<DataWrapperBar> data) {
	this.data = data;
}

/** The chart title*/
private String chartTitle;
/** The data */
private List<DataWrapperBar> data;
}
