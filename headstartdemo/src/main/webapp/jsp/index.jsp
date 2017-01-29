<!DOCTYPE html>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt' %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page import="com.inn.headstartdemo.utils.ConfigUtil"%>
<%@page import="com.inn.headstartdemo.utils.SmtpConfig"%>
<%@page import="com.inn.headstartdemo.security.spring.CustomerInfo"%>
<%@page import="com.inn.headstartdemo.model.UserConfig"%>
<script src="../js/jquery.min.js"></script>		
<script>
var PasswordStrength="medium";
 jQuery.ajax(
   {
      type: "GET",
      url: "../rest/Users/isUserAvailable",
      
      error: function ()
      {
         
      },
      success: function ()
      {
         
      }
   });


</script>

<%
UserConfig userConfig;
String userLanguage;
String userDataFormat;
String userDateFormat;
String userTimeZone;
	
   String localeFromURL=request.getParameter("locale");
   String ExpiryDate=request.getParameter("expiry_days_left");
   userConfig=CustomerInfo.getLocaleInContext();
	userLanguage =  userConfig.getUserLanguage().toString();
	userDataFormat = userConfig.getCurrencyFormat().toString();
	userDateFormat = userConfig.getDateFormat().toString();
	userTimeZone=	userConfig.getTimeZone().toString();
	
	if(userLanguage==null){
		session.setAttribute("locale","en");
		}
		else{
			session.setAttribute("locale",userLanguage);	
		}		
	  if(userLanguage=="en")
  userLanguage = "en";
 if(userLanguage=="fr")
  userLanguage = "french";
 if(userLanguage=="sp")
  userLanguage = "spanish";
  
  if(userTimeZone=="IST")
  {userTimeZone="Asia/Kolkata";
	  }
	 else
	 {
		 userTimeZone="America/Phoenix";
		 } 
   String ctx = request.getContextPath();	
   
%>

<fmt:setLocale value="<%=userLanguage%>"/>
<fmt:bundle basename="message">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9">
<link rel="shortcut icon" href="../images/favicon.ico">
<SCRIPT> var context = '<%=ctx%>';
var UserLang = '<%=userLanguage%>';
var DataFormater = '<%=userDataFormat%>';
var dateFormat = '<%=userDateFormat%>';
var profiledateFormat = '<%=userDateFormat%>';
var timeZone = '<%=userTimeZone%>';
var localeFromURL = '<%=localeFromURL%>';
var expiry_date = '<%=ExpiryDate%>';
var htmlFolder="";

if(UserLang=="fr"||UserLang=="french")
{
htmlFolder="_french";
}
if(UserLang=="en")
{
htmlFolder="";
}
if(UserLang=="sp"||UserLang=="spanish")
{	
htmlFolder="_spanish";
}
document.title=context.substring(1,context.length);
DEFAULT_PAGE_UPPERLIMIT="<%=ConfigUtil.getConfigProp(ConfigUtil.PAGING_VALUE)%>";
DEFAULT_PAGE_UPPERLIMIT=eval(DEFAULT_PAGE_UPPERLIMIT);
</SCRIPT>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title></title>
<meta name="description" content="overview &amp; stats">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<!--basic styles-->

<link href="../styles/app.css" rel="stylesheet">
<link href="../styles/bootstrap.min.css" rel="stylesheet">
<link href="../styles/bootstrap-responsive.min.css" rel="stylesheet">
<link href="../styles/fontcss/font-awesome.min.css" rel="stylesheet">
<!--link href="../styles/viewtablegrid.css" rel="stylesheet"-->
<!--<link href="../styles/boottable.css" rel="stylesheet">
link href="../styles/multiple.css" rel="stylesheet"-->
<link href="../styles/jquery.readableXML.css" rel="stylesheet">
<link href="../styles/validationEngine.jquery.css" rel="stylesheet">
<link href="../styles/daterangepicker.css" type="text/css" rel="stylesheet" media="screen, projection">
<link href="../styles/bootstrap-datetimepicker.min.css" type="text/css" rel="stylesheet" media="screen, projection">
<!--<link  href="../styles/validation.css" rel="stylesheet">	-->
<link rel="stylesheet" href="../styles/jquery-ui.css" >
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:Condensed" />
<!--link rel="stylesheet" type="text/css" media="all" href="../styles/filter.css"-->
<!--ace styles-->

<link rel="stylesheet" href="../styles/ace.min.css">
<link rel="stylesheet" href="../styles/ace-responsive.min.css">
<link rel="stylesheet" href="../styles/ace-skins.min.css">
<link rel="stylesheet" href="../styles/tooltipster.css">
<link rel="stylesheet" href="../styles/ColReorder.css" >
<link rel="stylesheet" href="../styles/jquery.gritter.css" >
<link href="../styles/moono/dialog.css" rel="stylesheet" type="text/css">
	<!--<link href="../styles/custom.css" type="text/css" rel="stylesheet" media="screen, projection"  />-->
<!--link rel="stylesheet" href="../styles/jquery-ui-1.10.3.full.min.css">
<link rel="stylesheet" href="../styles/ui.jqgrid.css"-->



<!--[if lte IE 8]>
		  <link rel="stylesheet" href="../styles/ace-ie.min.css" />
<![endif]-->

<!--[if IE]>
		  <link rel="stylesheet" href="../styles/app-ie.css" />
<![endif]-->

	<script type="text/javascript" src="../js/app/browser.js"></script>

<script src="../js/jquery.js"></script>	
<script src="../js/underscore.js"></script>		

	
<script src="../js/jquery-1.8.1.min.js"></script>
<script src="../js/jquery-ui.js"></script>
<script src="../js/generated/elasticsearch.js"></script>
<script src="../js/form2js.js"></script>
<script src="../js/jquery.validationEngine.js"></script>
<script src="../js/jquery.validationEngine-en.js"></script>
<script src="../js/multiple.js"></script>
<script src="../js/bootstrap-datepicker.min.js"></script>
<script src="../js/bootstrap-contextmenu.js"></script>	
<script src="../js/js2form.js"></script>
<script src="../js/app/tab.js"></script>
<script src="../js/app/global-var.js"></script>
<script src="../js/app/url.js"></script>
<script src="../js/app/common.js"></script>
<script src="../js/app/app.js"></script>
<script src="../js/jquery.dataTables.js"></script>
<script src="../js/jquery.readableXML.js"></script>
<script src="../js/jquery.gritter.min.js"></script>
<script src="../js/ColReorderWithResize.js"></script>
<script src="../js/jquery.tooltipster.js"></script>
<script src="../js/static/Dashboard.js"></script>
<script src="../js/static/EmailNotifications.js"></script>
<script src="../js/static/Notifications.js"></script>
<script src="../js/static/Role.js"></script>
<script src="../js/static/UserUpdateRole.js"></script>

<script>
var dateFormatNew=dateFormat;
dateFormat=getDateFormatAccordingToEnum(dateFormat);
dateTimeFormat=getDateFormatForTimeAccordingToEnum(dateFormatNew);
</script>
<!--
<script src="../js/ace-elements.min.js"></script>
<script src="../js/ace.min.js"></script>
-->
<script src="../js/highcharts.js"></script>
<script src="../js/exporting.js"></script>



<script type="text/javascript">
if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>
<script src="../js/bootstrap.min.js"></script>

<script src="../js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="../js/jquery.ui.touch-punch.min.js"></script>
<script src="../js/jquery.slimscroll.min.js"></script>
<script src="../js/jquery.easy-pie-chart.min.js"></script>
<script src="../js/jquery.sparkline.min.js"></script>
<script src="../js/jquery.hotkeys.js"></script>
<script src="../js/prettify.js"></script>
<script src="../js/bootstrap-wysiwyg.js"></script>
<script src="../js/generated/chartSelected.js"></script>
<!--<script type="text/javascript" src="../js/google.map.js"></script>-->
<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="../js/jquery.gmap.js"></script>
<!--<script src="../js/application.js"></script>-->
<script type="text/javascript" src="../js/jquery.alphanumeric.js"></script>
<script type="text/javascript" src="../js/jquery.formrestrict.js"></script>
<!--<script type="text/javascript" src="../js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="../js/typeahead-bs2.min.js"></script>
<script type="text/javascript" src="../js/grid.locale-en.js"></script>-->
<link rel="stylesheet" type="text/css" media="screen" href="../styles/smart_pro.css">

	<script src="../js/moment.min.js"></script>
	<script src="../js/moment-timezone.js"></script>
	<script src="../js/daterangepicker.js"></script>
	<script src="../js/bootstrap-datepicker.min.js"></script>
	<script src="../js/bootstrap-datetimepicker.min.js"></script>
<script src="../js/smartnotification.js"></script>
<script src="../js/ckeditor.js"></script>
<link href="../styles/fileuploader.css" rel="stylesheet" type="text/css">
<script src="../js/fileuploader.js"></script>
<!--script src="../js/config.js"></script-->

<script>userLanguage = '<%=localeFromURL%>';</script>
		
		

<!--page specific plugin styles-->

<!--fonts-->

<!--inline styles related to this page-->
</head>

	<body style="">
	<input type="hidden" id="isdeletedFalse" value="false">
<form id='logoutform' style='display:none' name="" action="./../j_spring_security_logout" method="post">			
<button type="submit" class='display:none' title='Logout'>&nbsp;</button>
</form>
		<div class="navbar  navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container-fluid">
					<a href="#" class="brand">
						<small>
							<span id="app_name"></span>
						</small>
					</a><!--/.brand-->
					<div id='loading-bar' style="z-index:100000"></div>										
					<ul class="nav ace-nav pull-right">
							<li>
											
<div class="nav-search minimized searchbarvisible">
<form class="form-search">
<span class="input-icon">
	<input type="search" id="searchIndex"   name="Name"autocomplete="off" class="input-small nav-search-input alphanumericallowsearchform" placeholder="Search...">
	<i class="icon-search nav-search-icon"></i>
</span>
</form>
</div>

		
							</li>
							<li style="margin-top:-50px;display:none;">
							<div class="ace-settings-container " id="ace-settings-container">
							<div class="btn btn-app btn-mini ace-settings-btn" style='background-image:url("");background-color:#000' id="ace-settings-btn">
							<i class="icon-cog" style='width:20px;'></i>
							</div>

							<div class="ace-settings-box" id="ace-settings-box">
							<div>
							<div class="pull-left">
							<select id="skin-colorpicker" class="hide" style="display: none;">
							<option data-class="default" value="#438EB9">#438EB9</option>
							<option data-class="skin-1" value="#222A2D">#222A2D</option>
							<option data-class="skin-2" value="#C6487E">#C6487E</option>
							<option data-class="skin-3" value="#D0D0D0">#D0D0D0</option>
							</select>
							
							</div>

							<span id="index_chooseskin"></span>
									
							</div>
							</div>
							</li>
						
							
					<li style="width: 43px;padding: 0px;margin: 0px;">
							<a data-toggle="dropdown" style="padding: 0px !important;margin-left: 1px;" class="dropdown-toggle message" href="#" title="Email Notifications">
								<i class="icon-envelope icon-animated-vertical black"></i>
								<span class="badge badge-red" id="emailnotify"></span>
							</a>

							<ul class="pull-right dropdown-navbar width-55 /*navbar-pink*/ dropdown-menu dropdown-caret dropdown-closer list-striped" id="emailnotifyul">
							</ul>
						</li>

						<li  style="padding: 0px !important;">
							<a data-toggle="dropdown" class="dropdown-toggle notification" style="padding: 0px !important;" href="javascript:void(0)" title="Recent Notifications">
								<i class="icon-bell icon-animated-bell black"></i>
								<span class="badge badge-red" id="notify"></span>
							</a>

							<ul class="pull-right dropdown-navbar width-55/*navbar-pink*/ dropdown-menu dropdown-caret dropdown-closer list-striped" id="notifyul">
							</ul>
						</li>

						<li class="light-blue-profile">
							<a data-toggle="dropdown" href="javascript:void(0)" class="dropdown-toggle admin">
								<!--<img class="nav-user-photo" id="nav-user-photo" style="max-height: 34px;width: 35px;"  alt="User&#39;s Photo">-->
								<i class="icon-user white"></i>
								<!--<div class="icon-caret-down white"></div>-->
								<i class="icon-angle-down white"></i>
							</a>
							<ul class="pull-right dropdown-menu /*user-menu dropdown-light dropdown-caret dropdown-closer*/ light-grey" style="height: auto /*105px*/;  min-width: 140px; width: 175px !important;">
								<li class="no-border-bottom">			
									<div style="text-align: center;">
										<span class="label grey cursor-pointer" style="background: white !important;" onclick='createProfileTab()' id="index_profile"></span>
										<span class="sideBarBreadCrumbSpan lighter no-margin" style="vertical-align: super;">|</span>
										<span class="label grey cursor-pointer" style="background: white !important;" onclick='logout()' id="index_logout"></span>
									</div>
								</li>
								<li class="divider" style="height:2px; margin: 0px !important;">
								</li>
								<li class="no-border-bottom">
									<span class="user-info" id="user-nameco"></span>
								</li>
						    </ul>
						</li>

						<!-- Old -->
						<!--
							<li class="light-blue">
								<a data-toggle="dropdown" href="javascript:void(0)" class="dropdown-toggle admin">
									<img class="nav-user-photo" id="nav-user-photo" style="max-height: 34px;width: 35px;"  alt="User&#39;s Photo">
									<span class="user-info">
										<small>Welcome,</small>
										<small id="user-nameco"></small>
									</span>

									<div class="icon-caret-down"></div>
								</a>
							
								<ul class="user-menu pull-right dropdown-menu dropdown-light dropdown-caret dropdown-closer" style="height: 70px;">
								
									<li>
										<a href="javascript:void(0);" onclick='createProfileTab()'id="index_profile">
											<i class="icon-user"></i>
										index_profile
										</a>
									</li>

							
								
									<li>
										<a href="javascript:void(0);" onclick='logout()'id="index_logout">
											<i class="icon-off"></i>
											index_logout
										</a>
									</li>
							</li>-->
					</ul><!--/.ace-nav-->
				</div><!--/.container-fluid-->
			</div><!--/.navbar-inner-->
		</div>

		<div class="main-container container-fluid">
		<a class="menu-toggler" id="menu-toggler" href="#">
			<span class="menu-text"></span>
			</a>
			<div class="sidebar " id="sidebar">
				<div class="sidebar-shortcuts" id="sidebar-shortcuts" style="margin-top:23%;">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
<!--
						<button class="btn btn-small btn-graph no-border" title="DashBoard" onclick='createDashboardTab()'>
							<i class="icon-signal"></i>
						</button>

						<button class="btn btn-small btn-edit no-border" id="report" title="Report" onclick='createReportTab()'>
							<i class="icon-pencil"></i>
						</button>

						<button class="btn btn-small btn-user no-border" id="audit" title="Audit" onclick='createAuditTab()'>
							<i class="icon-group"></i>
						</button>

						<button class="btn btn-small btn-setting no-border" id="analytics" title="Analytics" onclick='createAnalyticsTab()'>
							<i class="icon-cogs"></i>
						</button>
-->
					</div>

					<div class="sidebar-shortcuts-mini" >
						<span class="btn btn-blue" title="DashBoard" onclick='createDashboardTab()'></span>
						<span class="btn btn-blue" title="Report" onclick='createReportTab()'></span>
						<span class="btn btn-blue" title="Audit" onclick='createAuditTab()'></span>
						<span class="btn btn-blue" title="Setting" onclick='createSettingTab()'></span>
					</div>
				</div><!--#sidebar-shortcuts-->
				<ul id='appMenu' class="nav nav-list">
					<li id="dashboard_tab_btn">
						<a href="javascript:void(0);" id="dashboard" name="dashboard"  onclick="createTab(this.id)">
							<i class="icon-dashboard"></i>
							<span class="menu-text"> Home </span>
						</a>
					</li>
					 					<li id="product_tab_btn">
						<a href="javascript:void(0);" id="product_tab" name="product"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="product_span"> index_product </span>
						</a>	
					</li>
										<li id="office_tab_btn">
						<a href="javascript:void(0);" id="office_tab" name="office"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="office_span"> index_office </span>
						</a>	
					</li>
										<li id="payment_tab_btn">
						<a href="javascript:void(0);" id="payment_tab" name="payment"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="payment_span"> index_payment </span>
						</a>	
					</li>
										<li id="orders_tab_btn">
						<a href="javascript:void(0);" id="orders_tab" name="orders"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="orders_span"> index_orders </span>
						</a>	
					</li>
										<li id="orderdetail_tab_btn">
						<a href="javascript:void(0);" id="orderdetail_tab" name="orderdetail"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="orderdetail_span"> index_orderdetail </span>
						</a>	
					</li>
										<li id="employee_tab_btn">
						<a href="javascript:void(0);" id="employee_tab" name="employee"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="employee_span"> index_employee </span>
						</a>	
					</li>
										<li id="customer_tab_btn">
						<a href="javascript:void(0);" id="customer_tab" name="customer"  onclick="createTab(this.name)">
							<i class="icon-dashboard"></i>
							<span class="menu-text" id="customer_span"> index_customer </span>
						</a>	
					</li>
											<li id="index_settings_li">
									<a href="#" onclick='createSettingTab()' id="index_settings">
										<i class="icon-cog"></i>
								index_settings
									</a>
								</li>
								
				
					</ul>
					 						
						<ul class="nav nav-list">
					<li id="Analytics_tab_btn">
						<a href="#" class="dropdown-toggle">
							<i class="icon-edit"></i>
							<span class="menu-text"id="index_Analytics" > Analytics </span>

							<b class="arrow icon-angle-down"></b>
						</a>

						<ul class="submenu">
							<li id="analytics">
								<a href="#" onclick='createAnalyticsTab()' id="index_analytics_charts">
									<i class="icon-double-angle-right"></i>
							Charts
								</a>
							</li>

							<li id="report">
								<a href="#" onclick='createReportTab()' id="index_analytics_reports">
									<i class="icon-double-angle-right"></i>
							Reports
								</a>
							</li>

							
						</ul>
					</li>
				</ul>
							
				<ul class="nav nav-list" id="index_administration_ul">
					<li id="usermanagement_tab_btn">
						<a href="#" class="dropdown-toggle">
							<i class="icon-user"></i>
							<span class="menu-text"id="index_administration"> Administration </span>

							<b class="arrow icon-angle-down"></b>
						</a>

						<ul class="submenu">
											
							<li id="audit">
								<a href="#" onclick="createAuditTab()" id="index_administration_audit">
									<i class="icon-double-angle-right"></i>
									Audit
								</a>
							</li>
							<ul class="nav nav-list">
					<li id="usermanagement_tab_btn">
						<a href="#" class="dropdown-toggle">
							&nbsp;&nbsp;&nbsp;
							<span class="menu-text"id="index_usermanagement" >  </span>

							<b class="arrow icon-angle-down"></b>
						</a>

						<ul class="submenu">
							<li>
								<a href="#" onclick="createUserTab()" id="index_tab_users">
									<i class="icon-double-angle-right"></i>
								index_tab_users
								</a>
							</li>

							<li>
								<a href="#" onclick="createRoleTab()" id="index_tab_roles">
									<i class="icon-double-angle-right"></i>
									index_tab_roles
								</a>
							</li>

							<li>
								<a href="#" onclick="createPermissionTab()" id="index_tab_permissions">
									<i class="icon-double-angle-right"></i>
									index_tab_permissions
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
	
		<!--Application tab set start-->
			<!-- Add tab on index -->
			<div class="main-content">
			<div class="main-content_inner">
			<ul class="nav_123" id="tabs" style="margin-top:41px; padding-top:3px; border-bottom:solid 3px #438eb9"></ul></div>
			<!-- End tab on index -->
			<div class="tab-content" id="indextab-content" style="min-height: 585px;"></div>
			</div>
			<!--Application tab set end-->
			
			

		
		<!--page specific plugin scripts-->

		<!--[if lte IE 8]>
		  <script src="assets/js/excanvas.min.js"></script>
		<![endif]-->
		

		<!--ace scripts-->
 <div class="loadingmodal"><p style='color: #FFFFFF;font-size: 18px;position: absolute;top: 44%;left: 46.5%;top1: 31%;left1: 40.5%'>Please wait..</p><!-- Place at bottom of page --></div>
		<%@ include file="../permission.jsp"%>
		<%@ include file="messages.jsp"%>

		<!--inline scripts related to this page-->

		<script type="text/javascript">
			$(function() {
			  createTab("dashboard");
			  var $tooltip = $("<div class='tooltip top in hide'><div class='tooltip-inner'></div></div>").appendTo('body');
			  var previousPoint = null;
			
				$('#recent-box [data-rel="tooltip"]').tooltip({placement: tooltip_placement});
				function tooltip_placement(context, source) {
					var $source = $(source);
					var $parent = $source.closest('.tab-content')
					var off1 = $parent.offset();
					var w1 = $parent.width();
			
					var off2 = $source.offset();
					var w2 = $source.width();
			
					if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
					return 'left';
				}
			
			
				$('.dialogs,.comments').slimScroll({
					height: '300px'
			    });
				
				
				//Android's default browser somehow is confused when tapping on label which will lead to dragging the task
				//so disable dragging when clicking on label
				var agent = navigator.userAgent.toLowerCase();
				if("ontouchstart" in document && /applewebkit/.test(agent) && /android/.test(agent))
				  $('#tasks').on('touchstart', function(e){
					var li = $(e.target).closest('#tasks li');
					if(li.length == 0)return;
					var label = li.find('label.inline').get(0);
					if(label == e.target ) e.stopImmediatePropagation() ;
				});
			
				$('#tasks').sortable({
					opacity:0.8,
					revert:true,
					forceHelperSize:true,
					placeholder: 'draggable-placeholder',
					forcePlaceholderSize:true,
					tolerance:'pointer',
					stop: function( event, ui ) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
						$(ui.item).css('z-index', 'auto');
					}
					}
				);
				$('#tasks').disableSelection();
				$('#tasks input:checkbox').removeAttr('checked').on('click', function(){
					if(this.checked) $(this).closest('li').addClass('selected');
					else $(this).closest('li').removeClass('selected');
				});
				
				showRegularLoading();
				$('#appMenu a').click(function (e) {
					e.preventDefault();
					$(this).tab('show');
				});
	
			});
		</script>
	

<div class="tooltip top in hide"><div class="tooltip-inner"></div></div>
<SCRIPT>
var userid;
var email;
var notifications;
var email_notifications;
var table;
var hiddenid
var jsonvariable="";
var editjsonvariable="";
 jQuery(document).ready(function (){
	if(!reporting){
		$("#Analytics_tab_btn").parent().remove();
	}
	TodayDate = localizeDateString(new Date(),dateFormat);
	$('.alphanumericallowsearchform').alphanumeric({allow:"/^[+]?\d*\.?\d*$/!&@#~(){},<>|:-_"});
	var datetime=new Date();
		datetime=datetime.getTime();
	sendGETRequest(context+"/rest/Users/userincontext?date="+datetime,"userdetails",'','');
	
	});
	function userdetails(XMLHttpRequest, data, rpcRequest)
		{

			if(XMLHttpRequest.status == 200)
				{	var username;	
				  	 				  	userid=data.userid;
					LOGIN_USER_ID=data.userid;
					LOGIN_USER_CONFIG_LANGUAGE_JSON=data.userConfig;
				  	email=data.email;
					if(data.firstname==null || data.firstname== "Empty" || data.firstname=="--" ){	 
						 username=data.username;
						
						}
						else{
							 	username=data.firstname; 
							}
							
							document.getElementById("user-nameco").innerHTML= "Welcome " + username;
							var datetime=new Date();
		datetime=datetime.getTime();
							sendGETRequest(context+"/rest/Users/getUserImage?date="+datetime,"get_User_Image_Callback","","");
				}
				var date=new Date();
					
if(hasValue(currentDomainId)){
		sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?_s=domain.domainid=="+currentDomainId+"&date="+new Date()+"&ulimit=4&llimit=0&orderBy=createdDate&orderType=desc","get_EmailNotifications_callback","","");
				
	date.setDate(date.getDate() - 1);
	sendGETRequest(context+"/rest/ActivityStream/FIQLsearch?_s=user.userid=="+userid+";domain.domainid="+currentDomainId+"&date="+new Date()+"&ulimit=4&llimit=0&orderBy=date&orderType=desc","get_notification_callback","","");
		
		
		}
		else{
	sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?&date="+new Date()+"&ulimit=4&llimit=0&orderBy=createdDate&orderType=desc","get_EmailNotifications_callback","","");
				
	date.setDate(date.getDate() - 1);
	sendGETRequest(context+"/rest/ActivityStream/FIQLsearch?&date="+new Date()+"&ulimit=4&llimit=0&orderBy=date&orderType=desc","get_notification_callback","","");
		  }
				}
		
var notificationRowData;
var emailNotificationRowData;

function get_notification_callback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        notifications = data.length;
        $("#notify").append(notifications);
        $("#notifyul").append("<li class='nav-header' id='notifyli'>" + "You have " + notifications + " " + index_notifications + " </li>"); /* <i class='icon-bell'></i> Before NEW UI*/

        notificationRowData = data;
        notificationList(data);
    }
}

function get_EmailNotifications_callback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        email_notifications = data.length;
        $("#emailnotify").append(email_notifications);

        $("#emailnotifyul").append("<li class='nav-header' id='emailnotifyli'>" + "You have " + email_notifications + " " + index_emails + "</li>"); /* <i class='icon-envelope'></i> Before NEW UI */
        emailNotificationRowData = data;
        emailNotificationList(data);
    }
}

function get_User_Image_Callback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        var datetime = new Date();
        datetime = datetime.getTime();
        jQuery("#nav-user-photo").attr("src", "../rest/Users/getUserImage?date=" + datetime);
    } else {
        jQuery("#nav-user-photo").attr("src", "../images/avatar2.png");
    }
}

function ImgError(source) {
    source.src = "../images/avatar2.png";
    source.onerror = "";
    return true;
}

function emailNotificationList(data) {
    var len;
    len = (email_notifications < 4) ? email_notifications : 4;

    for (i = 0; i < len; i++) {
        var userId = data[i].sentTo.userid;
        var datetime = new Date();
        datetime = datetime.getTime();

        $("#emailnotifyul").append("<li><a href='#' onclick='createEmailNotificationTab()'><img class='notification-image' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + "?&date=" + datetime + ">" + makeFirstLetterUpperCase(data[i].subject) + "</a></li>");
    }

    if (i == 0) {
        $("#emailnotifyul").append("<li>No Notifications to show</li>");
    }

    $("#emailnotifyul").append("<li style='background-color: white;'><a href='#' onclick='createEmailNotificationTab()'>" + index_Seeallemails + "</a></li>");
}

function notificationList(data)
{
	var len;
	len=(notifications<4) ? notifications : 4;
	for(i=0;i<len;i++)
	{
		if (data[i].message.length <= 30) {
			var datetime = new Date();
			datetime = datetime.getTime();
			var userId = data[i].user.userid;
			$("#notifyul").append("<li><a href='#' onclick='createAllNotificationTab()'><img class='notification-image' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + "?date=" + datetime + "/> " + makeFirstLetterUpperCase(data[i].message) + "</a></li>");
		} else {
			var datetime = new Date();
			datetime = datetime.getTime();
			var userId = data[i].user.userid;
			var message = data[i].message.substring(0, 27);
			message = message + "...";
			$("#notifyul").append("<li><a href='#' onclick='createAllNotificationTab()'><img class='btn-mini' style='max-height:18px; width:18px; border-radius: 50%; vertical-align: top;' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + "?date=" + datetime + "/>" + makeFirstLetterUpperCase(message) + "</a></li>");
		}
	}
	if(i==0) {
		$("#notifyul").append("<li>No Activity to show</li>");
	}
	$("#notifyul").append("<li style='background-color: white;'><a href='#' onclick='createAllNotificationTab()'>"+index_Seeallnotifications+"</a></li>");
}

		var actStream="true";
		function SelectNewLanguage() {
		$("#selectedlanguage").css("display","block");
	}
	function changeLanguage(newlang){
		window.location.href="index.jsp?locale="+newlang;
		$("#selectedlanguage").css("display","none");
	}
	var appName = index_appname;
	$('#app_name').text(appName);
 					
						
							
							
						if(hasValue(index_product))
	{
		$("#product_span").html(index_product);


	}
										
						
							
							
						if(hasValue(index_office))
	{
		$("#office_span").html(index_office);


	}
										
						
							
							
						if(hasValue(index_payment))
	{
		$("#payment_span").html(index_payment);


	}
										
						
							
							
						if(hasValue(index_orders))
	{
		$("#orders_span").html(index_orders);


	}
										
						
							
							
						if(hasValue(index_orderdetail))
	{
		$("#orderdetail_span").html(index_orderdetail);


	}
										
						
							
							
						if(hasValue(index_employee))
	{
		$("#employee_span").html(index_employee);


	}
										
						
							
							
						if(hasValue(index_customer))
	{
		$("#customer_span").html(index_customer);


	}
					
	if(hasValue(index_logout))
	{
		$("#index_logout").html('<i class="icon-off  bigger-130"></i><br>'+index_logout.toUpperCase());

}
if(hasValue(index_profile))
	{
		$("#index_profile").html('<i class="icon-user  bigger-130"></i><br>'+index_profile.toUpperCase());
}
if(hasValue(index_settings))
	{
		
		$("#index_settings").html('<i class="icon-cog"></i>'+index_settings);
}
if(hasValue(index_language_selectlanguage))
	{
									
		$("#index_language_selectlanguage").html('<i class="icon-edit"></i>'+index_language_selectlanguage);
}
										
	if(hasValue(index_language_english))
	{
		$("#index_language_english").html(index_language_english);
	}
	if(hasValue(index_language_french))
	{
		$("#index_language_french").html(index_language_french);
	}if(hasValue(index_language_spanish))
	{
		$("#index_language_spanish").html(index_language_spanish);
	}
	if(hasValue(index_tab_usermanagement))
	{
		$("#index_usermanagement").html(index_tab_usermanagement);
	}
	if(hasValue(index_tab_users))
	{
									
		$("#index_tab_users").html('<i class="icon-double-angle-right"></i>'+index_tab_users);
}
if(hasValue(index_tab_permissions))
	{
									
		$("#index_tab_permissions").html('<i class="icon-double-angle-right"></i>'+index_tab_permissions);
}if(hasValue(index_tab_roles))
	{
									
		$("#index_tab_roles").html('<i class="icon-double-angle-right"></i>'+index_tab_roles);
}
	
	if(hasValue(index_chooseskin))
	{
									
		$("#index_chooseskin").html('&nbsp; '+index_chooseskin);
}




 var iconNameArr = ["icon-home","icon-building","icon-inbox","icon-ticket","icon-reorder","icon-user","icon-user-md","icon-group","icon-desktop","icon-leaf","icon-pencil","icon-eye-open","icon-list","icon-list-alt","icon-calendar","icon-picture","icon-tag"];
	var iconCount = 0;
	$("#appMenu li").each(function () {
		if(iconCount>=iconNameArr.length)
			iconCount = 0;
		var li_ID = $(this).attr("id");
		if(li_ID != "index_settings_li")
			$(this).find("i").removeClass('icon-dashboard').addClass(iconNameArr[iconCount]);
		iconCount = iconCount + 1;
	});
	
	
	if(usermgmt){
		$("#usermanagement_tab_btn").css("display","");		
		$("#audit").css("display","");
		$("#index_administration_ul").css("display","");
	    $("#index_settings").css("display","");
	}
	else{
		$("#usermanagement_tab_btn").css("display","none");
		$("#audit").css("display","none");
		$("#index_administration_ul").css("display","none");
	$("#index_settings").css("display","none");
	}
	if(worklist){
		$("#workList").css("display","");
	}
	else{
		$("#workList").css("display","none");
	}
	if(reporting){
		$("#report").css("display","");
		$("#analytics").css("display","");
		$("#analyticsreport").css("display","");
	}
	else{
		$("#report").css("display","none");
		$("#analytics").css("display","none");
		$("#analyticsreport").css("display","none");
	}	
	if(dashboard){
		$("#dashboard").css("display","");
	}
	else{
		$("#dashboard").css("display","none");
	}	
	 					if(read_Product_permission){
		$("#product_tab_btn").css("display","");		
		
	}
	else{
		$("#product_tab_btn").css("display","none");
		
	}
						if(read_Office_permission){
		$("#office_tab_btn").css("display","");		
		
	}
	else{
		$("#office_tab_btn").css("display","none");
		
	}
						if(read_Payment_permission){
		$("#payment_tab_btn").css("display","");		
		
	}
	else{
		$("#payment_tab_btn").css("display","none");
		
	}
						if(read_Orders_permission){
		$("#orders_tab_btn").css("display","");		
		
	}
	else{
		$("#orders_tab_btn").css("display","none");
		
	}
						if(read_Orderdetail_permission){
		$("#orderdetail_tab_btn").css("display","");		
		
	}
	else{
		$("#orderdetail_tab_btn").css("display","none");
		
	}
						if(read_Employee_permission){
		$("#employee_tab_btn").css("display","");		
		
	}
	else{
		$("#employee_tab_btn").css("display","none");
		
	}
						if(read_Customer_permission){
		$("#customer_tab_btn").css("display","");		
		
	}
	else{
		$("#customer_tab_btn").css("display","none");
		
	}
		
	 		tabNameArr.push("Product");		
			tabNameArr.push("Office");		
			tabNameArr.push("Payment");		
			tabNameArr.push("Orders");		
			tabNameArr.push("Orderdetail");		
			tabNameArr.push("Employee");		
			tabNameArr.push("Customer");		
	 	tabNameArr.push("reporting");
	tabNameArr.push("usermgmt");	
	
				 			 				
			if(hasValue(Index_searchInput))	
			$('#searchIndex').attr("placeholder",Index_searchInput);	
if(hasValue(index_Analytics))
	{
		
		$("#index_Analytics").html(index_Analytics);
}
if(hasValue(index_analytics_charts))
	{
		
		$("#index_analytics_charts").html('<i class="icon-double-angle-right"></i>'+index_analytics_charts);
}
if(hasValue(index_analytics_reports))
	{
		
		$("#index_analytics_reports").html('<i class="icon-double-angle-right"></i>'+index_analytics_reports);
}
if(hasValue(index_administration))
	{
		
		$("#index_administration").html(index_administration);
}
if(hasValue(index_administration_audit))
	{
		
		$("#index_administration_audit").html(index_administration_audit);
}
		if(hasValue(expiry_date))
		{
			showCenteredLoading("Expiry days left is "+expiry_date+" days")
		}
		window.setTimeout(function(){remembermecounter++;}, 60000);
		/* to hide filter form on scrolling if it is open */
		$(window).scroll(function() { hideFilterDiv(); });
	</script>
</body>
</html>
</fmt:bundle>

