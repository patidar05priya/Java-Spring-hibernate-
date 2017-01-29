package com.inn.headstartdemo.rest.impl;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.headstartdemo.dao.IUsersDao;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.rest.generic.AbstractCXFRestService;
import com.inn.headstartdemo.service.generic.IGenericService;

import com.inn.headstartdemo.utils.BarChart;
import com.inn.headstartdemo.utils.PieChart;
import com.inn.headstartdemo.utils.TrendChart;



/**
 * 
 * @author Team
 * @version 2.0
 *
 */
/**
 * 
 * Dashboard Rest 
 *
 */
@Path("/Dashboard")
@Produces("application/json")
@Consumes("application/json")
@Service("dashboardRestImpl")
public class DashboardRestImpl  extends AbstractCXFRestService<Integer, Users> {
   
    /** The logger. */
	private Logger logger=LoggerFactory.getLogger(UsersRestImpl.class);
	
	/**
	 * Instantiates a new dashboard rest impl.
	 */
	public DashboardRestImpl() {
		super(Users.class);
	}
	
	/** The dashboard service */
	@Autowired
	IUsersDao idashboardService;
	
	 	/**
	 * 
	 *Returns the list of pie Chart of orders 
	 *get path and return piechart
	 *@returns list of piecharts
	 * 
	 */
	@GET
	@Path("getordersorder_statusStatusPieChart")
	public List<PieChart> getordersorder_statusStatusPieChart(){
		return idashboardService.getordersorder_statusStatusPieChart();
	}
  	

    	/**
	 * 
	 *Returns the list of EnumPieChart of customer 
	 *get path and return EnumPieChart
	 *@returns list of EnumPieChart
	 * 
	 */
	@GET
	@Path("getcustomerprioritystatusEnumPieChart")
   	public List<PieChart> getcustomerprioritystatusEnumPieChart(){
		return idashboardService.getcustomerprioritystatusEnumPieChart();
	}
		/**
	 * 
	 *Returns the list of EnumPieChart of product 
	 *get path and return EnumPieChart
	 *@returns list of EnumPieChart
	 * 
	 */
	@GET
	@Path("getproductproductlineEnumPieChart")
   	public List<PieChart> getproductproductlineEnumPieChart(){
		return idashboardService.getproductproductlineEnumPieChart();
	}
	  

	
      /**
	 * 
	 *Returns the  BarChart of employee 
	 *get path and return BarChart
	 *@returns BarChart
	 * 
	 */
 	@GET
	@Path("getTrendBarChartForemployee")
	public BarChart getTrendBarChartForemployee(){
		return idashboardService.getTrendBarChartForemployee();
	}
   	
		/**
	 * 
	 *Returns the  TrendLineChart of payment 
	 *get path and return TrendLineChart
	 *@parameter trendType of type String
	 *@returns TrendLineChart
	 * 
	 */	
	@GET
	@Path("getTrendLineChartForpayment")
	public TrendChart getTrendLineChartForpayment(@QueryParam("trend")String trendType){
		return idashboardService.getTrendLineChartForpayment(trendType);
	}
		

	

	@Override
	public List<Users> search(Users entity) throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Users findById(Integer primaryKey) throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> findAll() throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Users create(Users users) throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Users update(Users users) throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean remove(Users users) throws BusinessException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void removeById(Integer primaryKey) throws BusinessException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public IGenericService<Integer, Users> getService() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public SearchContext getSearchContext() {
		// TODO Auto-generated method stub
		return null;
	}

}
