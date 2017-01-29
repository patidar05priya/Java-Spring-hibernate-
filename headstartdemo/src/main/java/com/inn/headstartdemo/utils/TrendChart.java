package com.inn.headstartdemo.utils;

import java.util.Date;
import java.util.List;



public class TrendChart {
	
	public static class DataWrapper{
			public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
		public String getSum() {
			return sum;
		}
		public void setSum(String sum) {
			this.sum = sum;
		}
		public String getCount() {
			return count;
		}
		public void setCount(String count) {
			this.count = count;
		}
		public String getAvg() {
			return avg;
		}
		public void setAvg(String avg) {
			this.avg = avg;
		}
			private Date date ;
			private String sum;
			private String count;
			private String avg;
		
	}
	
	private String xtitle;
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

	public List<DataWrapper> getData() {
		return data;
	}

	public void setData(List<DataWrapper> data) {
		this.data = data;
	}

	private String chartTitle;
	
	private List<DataWrapper> data;

}
