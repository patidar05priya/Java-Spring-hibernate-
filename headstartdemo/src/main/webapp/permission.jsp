<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<SCRIPT>

    var usermgmt=false;
	var worklist=false;
	var reporting = false;
    var dashboard = false;
    
<sec:authorize ifAllGranted="usermgmt">
		usermgmt = true; 
	</sec:authorize>

	<sec:authorize ifAllGranted="worklist">
		worklist = true; 
	</sec:authorize>

	<sec:authorize ifAllGranted="reporting">
		reporting = true; 
	</sec:authorize>
	
	<sec:authorize ifAllGranted="Userread">
		dashboard = true; 
	</sec:authorize>

	var create_Customer_permission = false;
	var update_Customer_permission = false;
	var read_Customer_permission = false;
	var delete_Customer_permission = false;

	
	
	
	var create_Office_permission = false;
	var update_Office_permission = false;
	var read_Office_permission = false;
	var delete_Office_permission = false;

	
	
	
	var create_Orderdetail_permission = false;
	var update_Orderdetail_permission = false;
	var read_Orderdetail_permission = false;
	var delete_Orderdetail_permission = false;

	
	
	
	var create_Employee_permission = false;
	var update_Employee_permission = false;
	var read_Employee_permission = false;
	var delete_Employee_permission = false;

	
	
	
	var create_Orders_permission = false;
	var update_Orders_permission = false;
	var read_Orders_permission = false;
	var delete_Orders_permission = false;

	
	
	
	var create_Product_permission = false;
	var update_Product_permission = false;
	var read_Product_permission = false;
	var delete_Product_permission = false;

	
	
	
	var create_Payment_permission = false;
	var update_Payment_permission = false;
	var read_Payment_permission = false;
	var delete_Payment_permission = false;

	
	
	

	var view_customer_prioritystatus_permission = false;
	var view_employee_officeid_permission = false;
	var view_orders_order_status_permission = false;
	var view_orders_totalCost_permission = false;
	var view_payment_amount_permission = false;
	var view_product_productline_permission = false;
	var view_map_permission=false;
	var view_recent_activity_permission=false;

var comment_Customer_permission = false;
var comment_Office_permission = false;

var fileattach_Customer_permission = false;



	<sec:authorize ifAllGranted="Customercreate">
		create_Customer_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Customerupdate">
		update_Customer_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Customerread">
		read_Customer_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Customerdelete">
		  delete_Customer_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Officecreate">
		create_Office_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Officeupdate">
		update_Office_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Officeread">
		read_Office_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Officedelete">
		  delete_Office_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Orderdetailcreate">
		create_Orderdetail_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Orderdetailupdate">
		update_Orderdetail_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Orderdetailread">
		read_Orderdetail_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Orderdetaildelete">
		  delete_Orderdetail_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Employeecreate">
		create_Employee_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Employeeupdate">
		update_Employee_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Employeeread">
		read_Employee_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Employeedelete">
		  delete_Employee_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Orderscreate">
		create_Orders_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Ordersupdate">
		update_Orders_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Ordersread">
		read_Orders_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Ordersdelete">
		  delete_Orders_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Productcreate">
		create_Product_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Productupdate">
		update_Product_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Productread">
		read_Product_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Productdelete">
		  delete_Product_permission= true; 
	 </sec:authorize>

	
	
	 
	<sec:authorize ifAllGranted="Paymentcreate">
		create_Payment_permission = true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Paymentupdate">
		update_Payment_permission= true; 
	</sec:authorize>
	<sec:authorize ifAllGranted="Paymentread">
		read_Payment_permission = true; 
	 </sec:authorize>
	<sec:authorize ifAllGranted="Paymentdelete">
		  delete_Payment_permission= true; 
	 </sec:authorize>

	
	
	 
	
	<sec:authorize ifAllGranted="canViewcustomerprioritystatus">
		  view_customer_prioritystatus_permission= true; 
	 </sec:authorize>
	
	<sec:authorize ifAllGranted="canViewemployeeofficeid">
		  view_employee_officeid_permission= true; 
	 </sec:authorize>
	
	<sec:authorize ifAllGranted="canViewordersorder_status">
		  view_orders_order_status_permission= true; 
	 </sec:authorize>
	
	<sec:authorize ifAllGranted="canVieworderstotalCost">
		  view_orders_totalCost_permission= true; 
	 </sec:authorize>
	
	<sec:authorize ifAllGranted="canViewpaymentamount">
		  view_payment_amount_permission= true; 
	 </sec:authorize>
	
	<sec:authorize ifAllGranted="canViewproductproductline">
		  view_product_productline_permission= true; 
	 </sec:authorize>

<sec:authorize ifAllGranted="canViewUserMap">
view_map_permission=true;
 </sec:authorize>
<sec:authorize ifAllGranted="canViewRecentActivity">
	view_recent_activity_permission=true;
 </sec:authorize>

<sec:authorize ifAllGranted="Customercomment">
		  comment_Customer_permission= true; 
	 </sec:authorize>
<sec:authorize ifAllGranted="Officecomment">
		  comment_Office_permission= true; 
	 </sec:authorize>

<sec:authorize ifAllGranted="Customerfile">
		  fileattach_Customer_permission= true; 
	 </sec:authorize>

</SCRIPT>
