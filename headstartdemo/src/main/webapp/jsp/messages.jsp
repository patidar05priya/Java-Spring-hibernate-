
<fmt:bundle basename="message">
	<script>
	// represents array of messages for tab titles
    var tabKeys = {
        "tab.usermgmt":"<fmt:message key='tab.usermgmt'/>",
		"tab.reports":"<fmt:message key='tab.reports'/>",
		"tab.subtab.userlist":"<fmt:message key='tab.subtab.userlist'/>",
		"tab.subtab.create":"<fmt:message key='tab.subtab.create'/>",
		"tab.subtab.search":"<fmt:message key='tab.subtab.search'/>",
		"createtab.tabset.view":"<fmt:message key='createtab.tabset.view'/>",
		"createtab.tabset.edit":"<fmt:message key='createtab.tabset.edit'/>",
		"searchtab.tabset.view":"<fmt:message key='searchtab.tabset.view'/>",
		"searchtab.tabset.edit":"<fmt:message key='searchtab.tabset.edit'/>"
    };
    // represents list of labels for different screens 
    var labels = {
        "label.search":"<fmt:message key='label.search'/>",
       	"label.username":"<fmt:message key='label.username'/>",
        "label.password":"<fmt:message key='label.password'/>",
		"label.welcome":"<fmt:message key='label.welcome'/>",	
		"label.themes":"<fmt:message key='label.themes'/>",
		"label.lcoale":"<fmt:message key='label.lcoale'/>",
		"section.login.label":"<fmt:message key='section.login.label'/>"
	};
    
    // represents section labels.
    var sections ={
		"createtab.section.label.addInfo":"<fmt:message key='createtab.section.label.addInfo'/>",
		"searchtab.section.label.searchInfo":"<fmt:message key='searchtab.section.label.searchInfo'/>"		
	};

    // represents button labels.
    var buttons = {
        "button.logout":"<fmt:message key='button.logout'/>",
		"createtab.button.add":"<fmt:message key='createtab.button.add'/>",
		"createtab.button.cancel_Close":"<fmt:message key='createtab.button.cancel_Close'/>",	
		"createtab.section.button.create":"<fmt:message key='createtab.section.button.create'/>",
		"createtab.section.button.reset":"<fmt:message key='createtab.section.button.reset'/>",
		"createtab.tabset.edit.button.update":"<fmt:message key='createtab.tabset.edit.button.update'/>",
		"searchtab.section.button.search":"<fmt:message key='searchtab.section.button.search'/>",
		"searchtab.section.button.reset":"<fmt:message key='searchtab.section.button.reset'/>",
		"searchtab.tabset.edit.button.update":"<fmt:message key='searchtab.tabset.edit.button.update'/>"
	}; 	
	
var index_product="<fmt:message key='index_product'/>";
var index_office="<fmt:message key='index_office'/>";
var index_payment="<fmt:message key='index_payment'/>";
var index_orders="<fmt:message key='index_orders'/>";
var index_orderdetail="<fmt:message key='index_orderdetail'/>";
var index_employee="<fmt:message key='index_employee'/>";
var index_customer="<fmt:message key='index_customer'/>";
var product_breadcrumb="<fmt:message key='product_breadcrumb'/>";
var office_breadcrumb="<fmt:message key='office_breadcrumb'/>";
var payment_breadcrumb="<fmt:message key='payment_breadcrumb'/>";
var orders_breadcrumb="<fmt:message key='orders_breadcrumb'/>";
var orderdetail_breadcrumb="<fmt:message key='orderdetail_breadcrumb'/>";
var employee_breadcrumb="<fmt:message key='employee_breadcrumb'/>";
var customer_breadcrumb="<fmt:message key='customer_breadcrumb'/>";
 	var product_success_create="<fmt:message key='product_success_create'/>";
	var product_success_update="<fmt:message key='product_success_update'/>";
	var product_success_delete="<fmt:message key='product_success_delete'/>";
 	var office_success_create="<fmt:message key='office_success_create'/>";
	var office_success_update="<fmt:message key='office_success_update'/>";
	var office_success_delete="<fmt:message key='office_success_delete'/>";
 	var payment_success_create="<fmt:message key='payment_success_create'/>";
	var payment_success_update="<fmt:message key='payment_success_update'/>";
	var payment_success_delete="<fmt:message key='payment_success_delete'/>";
 	var orders_success_create="<fmt:message key='orders_success_create'/>";
	var orders_success_update="<fmt:message key='orders_success_update'/>";
	var orders_success_delete="<fmt:message key='orders_success_delete'/>";
 	var orderdetail_success_create="<fmt:message key='orderdetail_success_create'/>";
	var orderdetail_success_update="<fmt:message key='orderdetail_success_update'/>";
	var orderdetail_success_delete="<fmt:message key='orderdetail_success_delete'/>";
 	var employee_success_create="<fmt:message key='employee_success_create'/>";
	var employee_success_update="<fmt:message key='employee_success_update'/>";
	var employee_success_delete="<fmt:message key='employee_success_delete'/>";
 	var customer_success_create="<fmt:message key='customer_success_create'/>";
	var customer_success_update="<fmt:message key='customer_success_update'/>";
	var customer_success_delete="<fmt:message key='customer_success_delete'/>";
 	var comment_add_success_message="<fmt:message key='comment_add_success_message'/>";
	var comment_add_failure_message="<fmt:message key='comment_add_failure_message'/>";
	var comment_add_blank_message="<fmt:message key='comment_add_blank_message'/>";
	
	var comment_delete_success_message="<fmt:message key='comment_delete_success_message'/>";
	var comment_delete_failure_message="<fmt:message key='comment_delete_failure_message'/>";
	
	var fileattachment_add_success_message="<fmt:message key='fileattachment_add_success_message'/>";
	var fileattachment_delete_success_message="<fmt:message key='fileattachment_delete_success_message'/>";
	
	var logout_failure_message="<fmt:message key='logout_failure_message'/>";
	var access_failure_message="<fmt:message key='access_failure_message'/>";

	var imageupload_success_message="<fmt:message key='imageupload_success_message'/>";
	var imageupload_failure_message="<fmt:message key='imageupload_failure_message'/>";	
	
	var audit_placeholder_username="<fmt:message key='audit_placeholder_username'/>";
	var audit_label_username="<fmt:message key='audit_label_username'/>";
	var audit_label_action="<fmt:message key='audit_label_action'/>";
	var audit_label_result="<fmt:message key='audit_label_result'/>";
	var audit_label_time="<fmt:message key='audit_label_time'/>";
	var audit_thead_user="<fmt:message key='audit_thead_user'/>";
	var audit_thead_action="<fmt:message key='audit_thead_action'/>";
	var audit_thead_parameter="<fmt:message key='audit_thead_parameter'/>";
	var audit_thead_date="<fmt:message key='audit_thead_date'/>";
	var audit_thead_result="<fmt:message key='audit_thead_result'/>";
	var audit_button_search="<fmt:message key='audit_button_search'/>";

	
	var settings_label_smtpport="<fmt:message key='settings_label_smtpport'/>";
	var settings_label_hostname="<fmt:message key='settings_label_hostname'/>";
	var settings_label_username="<fmt:message key='settings_label_username'/>";
	var settings_label_password="<fmt:message key='settings_label_password'/>";
	var settings_label_paggingdefault="<fmt:message key='settings_label_paggingdefault'/>";
	

	var profile_h1_userProfilePage="<fmt:message key='profile_h1_userProfilePage'/>";
	var profile_a_changeProfilePic="<fmt:message key='profile_a_changeProfilePic'/>";
	var profile_a_changePassword="<fmt:message key='profile_a_changePassword'/>";
	var profile_div_username="<fmt:message key='profile_div_username'/>";
	var profile_div_email="<fmt:message key='profile_div_email'/>";
	var profile_div_firstname="<fmt:message key='profile_div_firstname'/>";
	var profile_div_lastname="<fmt:message key='profile_div_lastname'/>";
	var profile_div_Country="<fmt:message key='profile_div_Country'/>";
	var profile_div_city="<fmt:message key='profile_div_city'/>";
	var profile_div_state="<fmt:message key='profile_div_state'/>";
	var profile_button_save="<fmt:message key='profile_button_save'/>";
	var profile_update_successMsg="<fmt:message key='profile_update_successMsg'/>";
	var profile_div_telephone="<fmt:message key='profile_div_telephone'/>";
	var profile_ChangeAddress="<fmt:message key='profile_ChangeAddress'/>";
	

	var user_placeholder_username="<fmt:message key='user_placeholder_username'/>";
	var user_placeholder_firstname="<fmt:message key='user_placeholder_firstname'/>";
	var user_placeholder_email="<fmt:message key='user_placeholder_email'/>";
	var user_placeholder_password="<fmt:message key='user_placeholder_password'/>";
	var user_placeholder_lastname="<fmt:message key='user_placeholder_lastname'/>";
	var user_placeholder_mobile="<fmt:message key='user_placeholder_mobile'/>";
	var user_placeholder_city="<fmt:message key='user_placeholder_city'/>";
	var user_placeholder_country="<fmt:message key='user_placeholder_country'/>";
	var user_placeholder_state="<fmt:message key='user_placeholder_state'/>";
	var user_placeholder_pincode="<fmt:message key='user_placeholder_pincode'/>";
	var user_button_search="<fmt:message key='user_button_search'/>";
	var user_thead_username="<fmt:message key='user_thead_username'/>";
	var user_thead_firstname="<fmt:message key='user_thead_firstname'/>";
	var user_thead_city="<fmt:message key='user_thead_city'/>";
	var user_thead_telephone="<fmt:message key='user_thead_telephone'/>";
	var user_thead_email="<fmt:message key='user_thead_email'/>";
	var user_thead_locked="<fmt:message key='user_thead_locked'/>";
	var user_thead_enabled="<fmt:message key='user_thead_enabled'/>";
	var user_thead_action="<fmt:message key='user_thead_action'/>";
	var user_label_username="<fmt:message key='user_label_username'/>";
	var user_label_firstname="<fmt:message key='user_label_firstname'/>";
	var user_label_email="<fmt:message key='user_label_email'/>";
	var user_label_password="<fmt:message key='user_label_password'/>";
	var user_label_lastname="<fmt:message key='user_label_lastname'/>";
	var user_label_mobile="<fmt:message key='user_label_mobile'/>";
	var user_label_city="<fmt:message key='user_label_city'/>";
	var user_label_country="<fmt:message key='user_label_country'/>";
	var user_label_state="<fmt:message key='user_label_state'/>";
	var user_label_pincode="<fmt:message key='user_label_pincode'/>";
	var user_button_create="<fmt:message key='user_button_create'/>";
	var user_label_address="<fmt:message key='user_label_address'/>";
	
	var user_button_reset="<fmt:message key='user_button_reset'/>";
	var user_span_select="<fmt:message key='user_span_select'/>";
	var user_button_update="<fmt:message key='user_button_update'/>";
	var user_role_thead_rolename="<fmt:message key='user_role_thead_rolename'/>";
	var user_role_thead_description="<fmt:message key='user_role_thead_description'/>";
	var user_success_createMsg="<fmt:message key='user_success_createMsg'/>";
	var user_success_updateMsg="<fmt:message key='user_success_updateMsg'/>";
	var user_success_enableMsg="<fmt:message key='user_success_enableMsg'/>";
	var user_success_disableMsg="<fmt:message key='user_success_disableMsg'/>";
	var user_success_lockedMsg="<fmt:message key='user_success_lockedMsg'/>";
	var user_success_roleupdateMsg="<fmt:message key='user_success_roleupdateMsg'/>";
	var user_error_roleupdateMsg="<fmt:message key='user_error_roleupdateMsg'/>";
	var user_update_alertMsg="<fmt:message key='user_update_alertMsg'/>";
	var user_username_checkMsg="<fmt:message key='user_username_checkMsg'/>";
	var user_email_alertMsg="<fmt:message key='user_email_alertMsg'/>";
	
	var roles_placeholder_role="<fmt:message key='roles_placeholder_role'/>";
	var roles_button_search="<fmt:message key='roles_button_search'/>";
	var roles_tbody_thead_permission="<fmt:message key='roles_tbody_thead_permission'/>";
	var roles_tbody_thead_description="<fmt:message key='roles_tbody_thead_description'/>";
	var roles_thead_rolename="<fmt:message key='roles_thead_rolename'/>";
	var roles_thead_description="<fmt:message key='roles_thead_description'/>";
	var roles_label_rolename="<fmt:message key='roles_label_rolename'/>";
	var roles_label_description="<fmt:message key='roles_label_description'/>";
	var roles_permission_thead_permissionname="<fmt:message key='roles_permission_thead_permissionname'/>";
	var roles_permission_thead_description="<fmt:message key='roles_permission_thead_description'/>";
	var roles_button_create="<fmt:message key='roles_button_create'/>";
	var roles_button_reset="<fmt:message key='roles_button_reset'/>";
	var roles_span_select="<fmt:message key='roles_span_select'/>";
	var roles_button_update="<fmt:message key='roles_button_update'/>";
	var roles_success_createMsg="<fmt:message key='roles_button_update'/>";
	var roles_success_updatePermissionMsg="<fmt:message key='roles_button_update'/>";

	var permissions_placeholder_permission="<fmt:message key='permissions_placeholder_permission'/>";
	var permissions_placeholder_description="<fmt:message key='permissions_placeholder_description'/>";
	var permissions_button_search="<fmt:message key='permissions_button_search'/>";
	var permissions_thead_permission="<fmt:message key='permissions_thead_permission'/>";
	var permissions_thead_description="<fmt:message key='permissions_thead_description'/>";
	var permissions_label_rolename="<fmt:message key='permissions_label_rolename'/>";
	var permissions_label_description="<fmt:message key='permissions_label_description'/>";
	var permissions_button_create="<fmt:message key='permissions_button_create'/>";
	var permissions_button_reset="<fmt:message key='permissions_button_reset'/>";
	var permissions_button_update="<fmt:message key='permissions_button_update'/>";
	var permissions_success_createMsg="<fmt:message key='permissions_success_createMsg'/>";
	var permissions_success_updateMsg="<fmt:message key='permissions_success_updateMsg'/>";

	var reports_span_heading="<fmt:message key='reports_span_heading'/>";
	var reports_h4_view="<fmt:message key='reports_h4_view'/>";

	var notifications_thead_message="<fmt:message key='notifications_thead_message'/>";
	var notifications_thead_type="<fmt:message key='notifications_thead_type'/>";
	var notifications_thead_username="<fmt:message key='notifications_thead_username'/>";
	
var emailnotifications_thead_subject="<fmt:message key='emailnotifications_thead_subject'/>";
	var emailnotifications_thead_sentby="<fmt:message key='emailnotifications_thead_sentby'/>";
	var emailnotifications_thead_createdtime="<fmt:message key='emailnotifications_thead_createdtime'/>";

var index_Seeallnotifications="<fmt:message key='index_Seeallnotifications'/>";
var index_logout="<fmt:message key='index_logout'/>";
var index_profile="<fmt:message key='index_profile'/>";
var index_settings="<fmt:message key='index_settings'/>";
var index_language_selectlanguage="<fmt:message key='index_language_selectlanguage'/>";
var index_tab_usermanagement="<fmt:message key='index_tab_usermanagement'/>";
var index_tab_users="<fmt:message key='index_tab_users'/>";
var index_tab_roles="<fmt:message key='index_tab_roles'/>";
var index_tab_permissions="<fmt:message key='index_tab_permissions'/>";
var index_language_english="<fmt:message key='index_language_english'/>";
var index_language_french="<fmt:message key='index_language_french'/>";
var index_language_spanish="<fmt:message key='index_language_spanish'/>";

var index_home="<fmt:message key='index_home'/>";


var permission_breadcrumb="<fmt:message key='permission_breadcrumb'/>";
var audit_breadcrumb="<fmt:message key='audit_breadcrumb'/>";
var chart_SpanHeading="<fmt:message key='chart_SpanHeading'/>";
var role_breadcrumb="<fmt:message key='role_breadcrumb'/>";
var user_breadcrumb="<fmt:message key='user_breadcrumb'/>";
var profile_breadcrumb="<fmt:message key='profile_breadcrumb'/>";
var report_breadcrumb="<fmt:message key='report_breadcrumb'/>";
var setting_breadcrumb="<fmt:message key='setting_breadcrumb'/>";

var index_appname="<fmt:message key='index_appname'/>";
var index_chooseskin="<fmt:message key='index_chooseskin'/>";
var index_notifications="<fmt:message key='index_notifications'/>";
var index_emails="<fmt:message key='index_emails'/>";
var  index_Seeallnotifications="<fmt:message key='index_Seeallnotifications'/>";
var index_Seeallemails="<fmt:message key='index_Seeallemails'/>";
var pagination_prev="<fmt:message key='pagination_prev'/>";
var pagination_next="<fmt:message key='pagination_next'/>";
var pagination_totalRecords="<fmt:message key='pagination_totalRecords'/>";
var pagination_showing="<fmt:message key='pagination_showing'/>";
var pagination_to="<fmt:message key='pagination_to'/>";
var pagination_entries="<fmt:message key='pagination_entries'/>";
var emailnotification_breadcrumb="<fmt:message key='emailnotification_breadcrumb'/>";
var notification_breadcrumb="<fmt:message key='notification_breadcrumb'/>";
var user_UpdateUsersRole="<fmt:message key='user_UpdateUsersRole'/>";
var user_ResetPassword="<fmt:message key='user_ResetPassword'/>";
var user_modaldisable="<fmt:message key='user_modaldisable'/>";
var user_modalenable="<fmt:message key='user_modalenable'/>";
var settings_domain_creator_label="<fmt:message key='settings_domain_creator_label'/>";


var Customer_thead_modifiedTime="<fmt:message key='Customer_thead_modifiedTime'/>";
var Customer_thead_createdTime="<fmt:message key='Customer_thead_createdTime'/>";
var Customer_thead_creator="<fmt:message key='Customer_thead_creator'/>";
var Customer_thead_lastModifier="<fmt:message key='Customer_thead_lastModifier'/>";
var Customer_thead_sortby="<fmt:message key='Customer_thead_sortby'/>";
var Customer_viewdetail="<fmt:message key='Customer_viewdetail'/>";
var Customer_addCustomer="<fmt:message key='Customer_addCustomer'/>";
var Customer_formCreate="<fmt:message key='Customer_formCreate'/>";
var Customer_formReset="<fmt:message key='Customer_formReset'/>";
var Customer_formUpdate="<fmt:message key='Customer_formUpdate'/>";
var Customer_formCancel="<fmt:message key='Customer_formCancel'/>";
var Customer_formEdit="<fmt:message key='Customer_formEdit'/>";
var Customer_head_history="<fmt:message key='Customer_head_history'/>";
var Customer_head_Activities="<fmt:message key='Customer_head_Activities'/>";
var Customer_task_tab="<fmt:message key='Customer_task_tab'/>";
var Customer_comment_tab="<fmt:message key='Customer_comment_tab'/>";
var CustomerNoCommentstoshow="<fmt:message key='CustomerNoCommentstoshow'/>";
var CustomerNoAttachmentstoshow="<fmt:message key='CustomerNoAttachmentstoshow'/>";
var Customercreateformheader="<fmt:message key='Customercreateformheader'/>";
var Customereditformheader="<fmt:message key='Customereditformheader'/>";
var CustomertheadAction="<fmt:message key='CustomertheadAction'/>";

var Office_thead_modifiedTime="<fmt:message key='Office_thead_modifiedTime'/>";
var Office_thead_createdTime="<fmt:message key='Office_thead_createdTime'/>";
var Office_thead_creator="<fmt:message key='Office_thead_creator'/>";
var Office_thead_lastModifier="<fmt:message key='Office_thead_lastModifier'/>";
var Office_thead_sortby="<fmt:message key='Office_thead_sortby'/>";
var Office_viewdetail="<fmt:message key='Office_viewdetail'/>";
var Office_addOffice="<fmt:message key='Office_addOffice'/>";
var Office_formCreate="<fmt:message key='Office_formCreate'/>";
var Office_formReset="<fmt:message key='Office_formReset'/>";
var Office_formUpdate="<fmt:message key='Office_formUpdate'/>";
var Office_formCancel="<fmt:message key='Office_formCancel'/>";
var Office_formEdit="<fmt:message key='Office_formEdit'/>";
var Office_head_history="<fmt:message key='Office_head_history'/>";
var Office_head_Activities="<fmt:message key='Office_head_Activities'/>";
var Office_task_tab="<fmt:message key='Office_task_tab'/>";
var Office_comment_tab="<fmt:message key='Office_comment_tab'/>";
var OfficeNoCommentstoshow="<fmt:message key='OfficeNoCommentstoshow'/>";
var OfficeNoAttachmentstoshow="<fmt:message key='OfficeNoAttachmentstoshow'/>";
var Officecreateformheader="<fmt:message key='Officecreateformheader'/>";
var Officeeditformheader="<fmt:message key='Officeeditformheader'/>";
var OfficetheadAction="<fmt:message key='OfficetheadAction'/>";

var Orderdetail_thead_modifiedTime="<fmt:message key='Orderdetail_thead_modifiedTime'/>";
var Orderdetail_thead_createdTime="<fmt:message key='Orderdetail_thead_createdTime'/>";
var Orderdetail_thead_creator="<fmt:message key='Orderdetail_thead_creator'/>";
var Orderdetail_thead_lastModifier="<fmt:message key='Orderdetail_thead_lastModifier'/>";
var Orderdetail_thead_sortby="<fmt:message key='Orderdetail_thead_sortby'/>";
var Orderdetail_viewdetail="<fmt:message key='Orderdetail_viewdetail'/>";
var Orderdetail_addOrderdetail="<fmt:message key='Orderdetail_addOrderdetail'/>";
var Orderdetail_formCreate="<fmt:message key='Orderdetail_formCreate'/>";
var Orderdetail_formReset="<fmt:message key='Orderdetail_formReset'/>";
var Orderdetail_formUpdate="<fmt:message key='Orderdetail_formUpdate'/>";
var Orderdetail_formCancel="<fmt:message key='Orderdetail_formCancel'/>";
var Orderdetail_formEdit="<fmt:message key='Orderdetail_formEdit'/>";
var Orderdetail_head_history="<fmt:message key='Orderdetail_head_history'/>";
var Orderdetail_head_Activities="<fmt:message key='Orderdetail_head_Activities'/>";
var Orderdetail_task_tab="<fmt:message key='Orderdetail_task_tab'/>";
var Orderdetail_comment_tab="<fmt:message key='Orderdetail_comment_tab'/>";
var OrderdetailNoCommentstoshow="<fmt:message key='OrderdetailNoCommentstoshow'/>";
var OrderdetailNoAttachmentstoshow="<fmt:message key='OrderdetailNoAttachmentstoshow'/>";
var Orderdetailcreateformheader="<fmt:message key='Orderdetailcreateformheader'/>";
var Orderdetaileditformheader="<fmt:message key='Orderdetaileditformheader'/>";
var OrderdetailtheadAction="<fmt:message key='OrderdetailtheadAction'/>";

var Employee_thead_modifiedTime="<fmt:message key='Employee_thead_modifiedTime'/>";
var Employee_thead_createdTime="<fmt:message key='Employee_thead_createdTime'/>";
var Employee_thead_creator="<fmt:message key='Employee_thead_creator'/>";
var Employee_thead_lastModifier="<fmt:message key='Employee_thead_lastModifier'/>";
var Employee_thead_sortby="<fmt:message key='Employee_thead_sortby'/>";
var Employee_viewdetail="<fmt:message key='Employee_viewdetail'/>";
var Employee_addEmployee="<fmt:message key='Employee_addEmployee'/>";
var Employee_formCreate="<fmt:message key='Employee_formCreate'/>";
var Employee_formReset="<fmt:message key='Employee_formReset'/>";
var Employee_formUpdate="<fmt:message key='Employee_formUpdate'/>";
var Employee_formCancel="<fmt:message key='Employee_formCancel'/>";
var Employee_formEdit="<fmt:message key='Employee_formEdit'/>";
var Employee_head_history="<fmt:message key='Employee_head_history'/>";
var Employee_head_Activities="<fmt:message key='Employee_head_Activities'/>";
var Employee_task_tab="<fmt:message key='Employee_task_tab'/>";
var Employee_comment_tab="<fmt:message key='Employee_comment_tab'/>";
var EmployeeNoCommentstoshow="<fmt:message key='EmployeeNoCommentstoshow'/>";
var EmployeeNoAttachmentstoshow="<fmt:message key='EmployeeNoAttachmentstoshow'/>";
var Employeecreateformheader="<fmt:message key='Employeecreateformheader'/>";
var Employeeeditformheader="<fmt:message key='Employeeeditformheader'/>";
var EmployeetheadAction="<fmt:message key='EmployeetheadAction'/>";

var Orders_thead_modifiedTime="<fmt:message key='Orders_thead_modifiedTime'/>";
var Orders_thead_createdTime="<fmt:message key='Orders_thead_createdTime'/>";
var Orders_thead_creator="<fmt:message key='Orders_thead_creator'/>";
var Orders_thead_lastModifier="<fmt:message key='Orders_thead_lastModifier'/>";
var Orders_thead_sortby="<fmt:message key='Orders_thead_sortby'/>";
var Orders_viewdetail="<fmt:message key='Orders_viewdetail'/>";
var Orders_addOrders="<fmt:message key='Orders_addOrders'/>";
var Orders_formCreate="<fmt:message key='Orders_formCreate'/>";
var Orders_formReset="<fmt:message key='Orders_formReset'/>";
var Orders_formUpdate="<fmt:message key='Orders_formUpdate'/>";
var Orders_formCancel="<fmt:message key='Orders_formCancel'/>";
var Orders_formEdit="<fmt:message key='Orders_formEdit'/>";
var Orders_head_history="<fmt:message key='Orders_head_history'/>";
var Orders_head_Activities="<fmt:message key='Orders_head_Activities'/>";
var Orders_task_tab="<fmt:message key='Orders_task_tab'/>";
var Orders_comment_tab="<fmt:message key='Orders_comment_tab'/>";
var OrdersNoCommentstoshow="<fmt:message key='OrdersNoCommentstoshow'/>";
var OrdersNoAttachmentstoshow="<fmt:message key='OrdersNoAttachmentstoshow'/>";
var Orderscreateformheader="<fmt:message key='Orderscreateformheader'/>";
var Orderseditformheader="<fmt:message key='Orderseditformheader'/>";
var OrderstheadAction="<fmt:message key='OrderstheadAction'/>";

var Product_thead_modifiedTime="<fmt:message key='Product_thead_modifiedTime'/>";
var Product_thead_createdTime="<fmt:message key='Product_thead_createdTime'/>";
var Product_thead_creator="<fmt:message key='Product_thead_creator'/>";
var Product_thead_lastModifier="<fmt:message key='Product_thead_lastModifier'/>";
var Product_thead_sortby="<fmt:message key='Product_thead_sortby'/>";
var Product_viewdetail="<fmt:message key='Product_viewdetail'/>";
var Product_addProduct="<fmt:message key='Product_addProduct'/>";
var Product_formCreate="<fmt:message key='Product_formCreate'/>";
var Product_formReset="<fmt:message key='Product_formReset'/>";
var Product_formUpdate="<fmt:message key='Product_formUpdate'/>";
var Product_formCancel="<fmt:message key='Product_formCancel'/>";
var Product_formEdit="<fmt:message key='Product_formEdit'/>";
var Product_head_history="<fmt:message key='Product_head_history'/>";
var Product_head_Activities="<fmt:message key='Product_head_Activities'/>";
var Product_task_tab="<fmt:message key='Product_task_tab'/>";
var Product_comment_tab="<fmt:message key='Product_comment_tab'/>";
var ProductNoCommentstoshow="<fmt:message key='ProductNoCommentstoshow'/>";
var ProductNoAttachmentstoshow="<fmt:message key='ProductNoAttachmentstoshow'/>";
var Productcreateformheader="<fmt:message key='Productcreateformheader'/>";
var Producteditformheader="<fmt:message key='Producteditformheader'/>";
var ProducttheadAction="<fmt:message key='ProducttheadAction'/>";

var Payment_thead_modifiedTime="<fmt:message key='Payment_thead_modifiedTime'/>";
var Payment_thead_createdTime="<fmt:message key='Payment_thead_createdTime'/>";
var Payment_thead_creator="<fmt:message key='Payment_thead_creator'/>";
var Payment_thead_lastModifier="<fmt:message key='Payment_thead_lastModifier'/>";
var Payment_thead_sortby="<fmt:message key='Payment_thead_sortby'/>";
var Payment_viewdetail="<fmt:message key='Payment_viewdetail'/>";
var Payment_addPayment="<fmt:message key='Payment_addPayment'/>";
var Payment_formCreate="<fmt:message key='Payment_formCreate'/>";
var Payment_formReset="<fmt:message key='Payment_formReset'/>";
var Payment_formUpdate="<fmt:message key='Payment_formUpdate'/>";
var Payment_formCancel="<fmt:message key='Payment_formCancel'/>";
var Payment_formEdit="<fmt:message key='Payment_formEdit'/>";
var Payment_head_history="<fmt:message key='Payment_head_history'/>";
var Payment_head_Activities="<fmt:message key='Payment_head_Activities'/>";
var Payment_task_tab="<fmt:message key='Payment_task_tab'/>";
var Payment_comment_tab="<fmt:message key='Payment_comment_tab'/>";
var PaymentNoCommentstoshow="<fmt:message key='PaymentNoCommentstoshow'/>";
var PaymentNoAttachmentstoshow="<fmt:message key='PaymentNoAttachmentstoshow'/>";
var Paymentcreateformheader="<fmt:message key='Paymentcreateformheader'/>";
var Paymenteditformheader="<fmt:message key='Paymenteditformheader'/>";
var PaymenttheadAction="<fmt:message key='PaymenttheadAction'/>";



var  Customer_lable_lastName="<fmt:message key='Customer_lable_lastName'/>";
var  Customer_lable_prioritystatus="<fmt:message key='Customer_lable_prioritystatus'/>";
var  Customer_lable_address="<fmt:message key='Customer_lable_address'/>";
var  Customer_lable_name="<fmt:message key='Customer_lable_name'/>";
var  Customer_lable_customerNumber="<fmt:message key='Customer_lable_customerNumber'/>";
var  Customer_lable_phone="<fmt:message key='Customer_lable_phone'/>";
var  Customer_lable_firstName="<fmt:message key='Customer_lable_firstName'/>";
var  Customer_lable_employee="<fmt:message key='Customer_lable_employee'/>";
var  Customer_lable_creditLimit="<fmt:message key='Customer_lable_creditLimit'/>";
var  Office_lable_state="<fmt:message key='Office_lable_state'/>";
var  Office_lable_addressLine2="<fmt:message key='Office_lable_addressLine2'/>";
var  Office_lable_officeCode="<fmt:message key='Office_lable_officeCode'/>";
var  Office_lable_addressLine1="<fmt:message key='Office_lable_addressLine1'/>";
var  Office_lable_country="<fmt:message key='Office_lable_country'/>";
var  Office_lable_cityName="<fmt:message key='Office_lable_cityName'/>";
var  Office_lable_postalCode="<fmt:message key='Office_lable_postalCode'/>";
var  Office_lable_territory="<fmt:message key='Office_lable_territory'/>";
var  Office_lable_phone="<fmt:message key='Office_lable_phone'/>";
var  Orderdetail_lable_id="<fmt:message key='Orderdetail_lable_id'/>";
var  Orderdetail_lable_priceEach="<fmt:message key='Orderdetail_lable_priceEach'/>";
var  Orderdetail_lable_quantityOrdered="<fmt:message key='Orderdetail_lable_quantityOrdered'/>";
var  Orderdetail_lable_orderLineNumber="<fmt:message key='Orderdetail_lable_orderLineNumber'/>";
var  Orderdetail_lable_product="<fmt:message key='Orderdetail_lable_product'/>";
var  Orderdetail_lable_orders="<fmt:message key='Orderdetail_lable_orders'/>";
var  Employee_lable_office="<fmt:message key='Employee_lable_office'/>";
var  Employee_lable_firstName="<fmt:message key='Employee_lable_firstName'/>";
var  Employee_lable_employeeNumber="<fmt:message key='Employee_lable_employeeNumber'/>";
var  Employee_lable_lastName="<fmt:message key='Employee_lable_lastName'/>";
var  Employee_lable_email="<fmt:message key='Employee_lable_email'/>";
var  Employee_lable_extension="<fmt:message key='Employee_lable_extension'/>";
var  Employee_lable_reportsTo="<fmt:message key='Employee_lable_reportsTo'/>";
var  Employee_lable_jobTitle="<fmt:message key='Employee_lable_jobTitle'/>";
var  Orders_lable_requiredDate="<fmt:message key='Orders_lable_requiredDate'/>";
var  Orders_lable_orderNumber="<fmt:message key='Orders_lable_orderNumber'/>";
var  Orders_lable_orderDate="<fmt:message key='Orders_lable_orderDate'/>";
var  Orders_lable_comments="<fmt:message key='Orders_lable_comments'/>";
var  Orders_lable_customer="<fmt:message key='Orders_lable_customer'/>";
var  Orders_lable_totalCost="<fmt:message key='Orders_lable_totalCost'/>";
var  Orders_lable_shippedDate="<fmt:message key='Orders_lable_shippedDate'/>";
var  Orders_lable_orderStatus="<fmt:message key='Orders_lable_orderStatus'/>";
var  Product_lable_productName="<fmt:message key='Product_lable_productName'/>";
var  Product_lable_quantityInStock="<fmt:message key='Product_lable_quantityInStock'/>";
var  Product_lable_productCode="<fmt:message key='Product_lable_productCode'/>";
var  Product_lable_productline="<fmt:message key='Product_lable_productline'/>";
var  Product_lable_productVendor="<fmt:message key='Product_lable_productVendor'/>";
var  Product_lable_productDescription="<fmt:message key='Product_lable_productDescription'/>";
var  Product_lable_buyPrice="<fmt:message key='Product_lable_buyPrice'/>";
var  Product_lable_sellPrice="<fmt:message key='Product_lable_sellPrice'/>";
var  Payment_lable_customer="<fmt:message key='Payment_lable_customer'/>";
var  Payment_lable_paymentDate="<fmt:message key='Payment_lable_paymentDate'/>";
var  Payment_lable_amount="<fmt:message key='Payment_lable_amount'/>";
var  Payment_lable_id="<fmt:message key='Payment_lable_id'/>";
var  Payment_lable_checkNumber="<fmt:message key='Payment_lable_checkNumber'/>";
 var Customer_thead_lastName="<fmt:message key='Customer_thead_lastName'/>";
	 var Customer_thead_prioritystatus="<fmt:message key='Customer_thead_prioritystatus'/>";
	 var Customer_thead_address="<fmt:message key='Customer_thead_address'/>";
	 var Customer_thead_name="<fmt:message key='Customer_thead_name'/>";
	 var Customer_thead_customerNumber="<fmt:message key='Customer_thead_customerNumber'/>";
	 var Customer_thead_phone="<fmt:message key='Customer_thead_phone'/>";
	 var Customer_thead_firstName="<fmt:message key='Customer_thead_firstName'/>";
	 var Customer_thead_employee="<fmt:message key='Customer_thead_employee'/>";
	 var Customer_thead_creditLimit="<fmt:message key='Customer_thead_creditLimit'/>";
	 var Office_thead_state="<fmt:message key='Office_thead_state'/>";
	 var Office_thead_addressLine2="<fmt:message key='Office_thead_addressLine2'/>";
	 var Office_thead_officeCode="<fmt:message key='Office_thead_officeCode'/>";
	 var Office_thead_addressLine1="<fmt:message key='Office_thead_addressLine1'/>";
	 var Office_thead_country="<fmt:message key='Office_thead_country'/>";
	 var Office_thead_cityName="<fmt:message key='Office_thead_cityName'/>";
	 var Office_thead_postalCode="<fmt:message key='Office_thead_postalCode'/>";
	 var Office_thead_territory="<fmt:message key='Office_thead_territory'/>";
	 var Office_thead_phone="<fmt:message key='Office_thead_phone'/>";
	 var Orderdetail_thead_id="<fmt:message key='Orderdetail_thead_id'/>";
	 var Orderdetail_thead_priceEach="<fmt:message key='Orderdetail_thead_priceEach'/>";
	 var Orderdetail_thead_quantityOrdered="<fmt:message key='Orderdetail_thead_quantityOrdered'/>";
	 var Orderdetail_thead_orderLineNumber="<fmt:message key='Orderdetail_thead_orderLineNumber'/>";
	 var Orderdetail_thead_product="<fmt:message key='Orderdetail_thead_product'/>";
	 var Orderdetail_thead_orders="<fmt:message key='Orderdetail_thead_orders'/>";
	 var Employee_thead_office="<fmt:message key='Employee_thead_office'/>";
	 var Employee_thead_firstName="<fmt:message key='Employee_thead_firstName'/>";
	 var Employee_thead_employeeNumber="<fmt:message key='Employee_thead_employeeNumber'/>";
	 var Employee_thead_lastName="<fmt:message key='Employee_thead_lastName'/>";
	 var Employee_thead_email="<fmt:message key='Employee_thead_email'/>";
	 var Employee_thead_extension="<fmt:message key='Employee_thead_extension'/>";
	 var Employee_thead_reportsTo="<fmt:message key='Employee_thead_reportsTo'/>";
	 var Employee_thead_jobTitle="<fmt:message key='Employee_thead_jobTitle'/>";
	 var Orders_thead_requiredDate="<fmt:message key='Orders_thead_requiredDate'/>";
	 var Orders_thead_orderNumber="<fmt:message key='Orders_thead_orderNumber'/>";
	 var Orders_thead_orderDate="<fmt:message key='Orders_thead_orderDate'/>";
	 var Orders_thead_comments="<fmt:message key='Orders_thead_comments'/>";
	 var Orders_thead_customer="<fmt:message key='Orders_thead_customer'/>";
	 var Orders_thead_totalCost="<fmt:message key='Orders_thead_totalCost'/>";
	 var Orders_thead_shippedDate="<fmt:message key='Orders_thead_shippedDate'/>";
	 var Orders_thead_orderStatus="<fmt:message key='Orders_thead_orderStatus'/>";
	 var Product_thead_productName="<fmt:message key='Product_thead_productName'/>";
	 var Product_thead_quantityInStock="<fmt:message key='Product_thead_quantityInStock'/>";
	 var Product_thead_productCode="<fmt:message key='Product_thead_productCode'/>";
	 var Product_thead_productline="<fmt:message key='Product_thead_productline'/>";
	 var Product_thead_productVendor="<fmt:message key='Product_thead_productVendor'/>";
	 var Product_thead_productDescription="<fmt:message key='Product_thead_productDescription'/>";
	 var Product_thead_buyPrice="<fmt:message key='Product_thead_buyPrice'/>";
	 var Product_thead_sellPrice="<fmt:message key='Product_thead_sellPrice'/>";
	 var Payment_thead_customer="<fmt:message key='Payment_thead_customer'/>";
	 var Payment_thead_paymentDate="<fmt:message key='Payment_thead_paymentDate'/>";
	 var Payment_thead_amount="<fmt:message key='Payment_thead_amount'/>";
	 var Payment_thead_id="<fmt:message key='Payment_thead_id'/>";
	 var Payment_thead_checkNumber="<fmt:message key='Payment_thead_checkNumber'/>";
		 function getMessage(type, key, defaultVal)
	    {
	        if(type == 'tabtitles')
	        {
	            if(tabKeys[key] != null)
	                return tabKeys[key];
	        }
	        else if(type == 'button')
	        {
	            if(buttons[key] != null)
	                return buttons[key];
	        }
	        else if(type == 'section')
	        {
	            if(sections[key] != null)
	                return sections[key];
	        }
	        else if(type == 'control')
	        {
	            if(controls[key] != null)
	                return controls[key];
	        }
	        else if(type == 'label')
	        {
	            if(labels[key] != null)
	                return labels[key];
	        }
	        else if(type == 'message')
	        {
	            if(messages[key] != null)
	                return messages[key];
	        }

	        // if the type is not configured then return the default value.
	        // otherwise return the key itself.
	        if(defaultVal != null && defaultVal != 'undefined')
	            return defaultVal;
	        else
	            return key;

	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	   
var user_label_personal_information="<fmt:message key='user_label_personal_information'/>";
var assign_roles_label="<fmt:message key='assign_roles_label'/>";
var edit_button_label="<fmt:message key='edit_button_label'/>";
var reset_button_label="<fmt:message key='reset_button_label'/>";
var create_button_label="<fmt:message key='create_button_label'/>";
var cancel_button_label="<fmt:message key='cancel_button_label'/>";
var save_button_label="<fmt:message key='save_button_label'/>";
var add_user_button_label="<fmt:message key='add_user_button_label'/>";
var enable_button_label="<fmt:message key='enable_button_label'/>";
var disable_button_label="<fmt:message key='disable_button_label'/>";
var user_label_street="<fmt:message key='user_label_street'/>";
var user_label_latitude="<fmt:message key='user_label_latitude'/>";
var user_label_address1="<fmt:message key='user_label_address1'/>";
var user_label_address2="<fmt:message key='user_label_address2'/>";
var user_label_landmark="<fmt:message key='user_label_landmark'/>";
var user_label_longitude="<fmt:message key='user_label_longitude'/>";

var user_placeholder_street="<fmt:message key='user_placeholder_street'/>";
var user_placeholder_latitude="<fmt:message key='user_placeholder_latitude'/>";
var user_placeholder_longitude="<fmt:message key='user_placeholder_longitude'/>";
var user_placeholder_landmark="<fmt:message key='user_placeholder_landmark'/>";
var user_placeholder_addressline1="<fmt:message key='user_placeholder_addressline1'/>";
var user_placeholder_addressline2="<fmt:message key='user_placeholder_addressline2'/>";
	    
var settings_smtp_label="<fmt:message key='settings_smtp_label'/>";
var settings_miscellaneous_label="<fmt:message key='settings_miscellaneous_label'/>";
var settings_sox_label="<fmt:message key='settings_sox_label'/>";
var settings_domain_label="<fmt:message key='settings_domain_label'/>";
var sox_config_expiry_label="<fmt:message key='sox_config_expiry_label'/>";
var sox_config_expiryinteval_label="<fmt:message key='sox_config_expiryinteval_label'/>";
var sox_config_maxattemps_label="<fmt:message key='sox_config_maxattemps_label'/>";
var settings_domain_label="<fmt:message key='settings_domain_label'/>";
var domain_create_domainName_label="<fmt:message key='domain_create_domainName_label'/>";
var domain_create_adminUserName_label="<fmt:message key='domain_create_adminUserName_label'/>";
var domain_create_adminPassword_label="<fmt:message key='domain_create_adminPassword_label'/>";
var domain_create_primaryEmail_label="<fmt:message key='domain_create_primaryEmail_label'/>";
var domain_create_domainDescription_label="<fmt:message key='domain_create_domainDescription_label'/>";	    
var audit_chart_label="<fmt:message key='audit_chart_label'/>";    

var add_permissions_label="<fmt:message key='add_permissions_label'/>";
var add_permission_btn="<fmt:message key='add_permission_btn'/>";
var search_permission_name_txt="<fmt:message key='search_permission_name_txt'/>";
var search_permission_description_txt="<fmt:message key='search_permission_description_txt'/>";
var searchPermissionBtn="<fmt:message key='searchPermissionBtn'/>";
var view_permission_header="<fmt:message key='view_permission_header'/>";
var view_permission_id="<fmt:message key='view_permission_id'/>";
var view_permission_name="<fmt:message key='view_permission_name'/>";
var view_permission_description="<fmt:message key='view_permission_description'/>";
var edit_permission_header="<fmt:message key='edit_permission_header'/>";
var role_name_lbl="<fmt:message key='role_name_lbl'/>";
	var role_view_lbl="<fmt:message key='role_view_lbl'/>";
	var role_add_lbl="<fmt:message key='role_add_lbl'/>";
	var role_edit_lbl="<fmt:message key='role_edit_lbl'/>";
	var role_delete_lbl="<fmt:message key='role_delete_lbl'/>";
	
	var Dashboard_name_lbl="<fmt:message key='Dashboard_name_lbl'/>";
	var Dashboard_allow_lbl="<fmt:message key='Dashboard_allow_lbl'/>";
	var viewrole_header="<fmt:message key='viewrole_header'/>";
	var dashboard_widgetname="<fmt:message key='dashboard_widgetname'/>";
	var Index_searchInput="<fmt:message key='Index_searchInput'/>";
	
	var viewrole_id_lbl="<fmt:message key='viewrole_id_lbl'/>";
	var viewrole_name_lbl="<fmt:message key='viewrole_name_lbl'/>";
	var viewrole_description_lbl="<fmt:message key='viewrole_description_lbl'/>";
	
	var edit_role_header="<fmt:message key='edit_role_header'/>";
	var viewrole_description_lbl="<fmt:message key='viewrole_description_lbl'/>";
	var edit_addfeature_lbl="<fmt:message key='edit_addfeature_lbl'/>";
	var editAddress_profile="<fmt:message key='editAddress_profile'/>";
	    

	
	var roles_thead_action="<fmt:message key='roles_thead_action'/>";
	var add_role_header="<fmt:message key='add_role_header'/>";
	var add_feature_lbl="<fmt:message key='add_feature_lbl'/>";
	var dashboard_widgets_lbl="<fmt:message key='dashboard_widgets_lbl'/>";
	var add_role_btn="<fmt:message key='add_role_btn'/>";
	var permissions_thead_action="<fmt:message key='permissions_thead_action'/>";
	var domain_list_label="<fmt:message key='domain_list_label'/>";
	var domainView_domainName_label="<fmt:message key='domainView_domainName_label'/>";
	var domainView_remarks_label="<fmt:message key='domainView_remarks_label'/>";
	var domainView_action_label="<fmt:message key='domainView_action_label'/>";
	
	
	var profile_Changelanguage="<fmt:message key='profile_Changelanguage'/>";
	var profile_edit_label="<fmt:message key='profile_edit_label'/>";
	var profile_Modallanguage="<fmt:message key='profile_Modallanguage'/>";
	var select_language_label="<fmt:message key='select_language_label'/>";
	var change_language_save_button_label="<fmt:message key='change_language_save_button_label'/>";
	var change_old_password_label="<fmt:message key='change_old_password_label'/>";
	var change_new_password_label="<fmt:message key='change_new_password_label'/>";
	var change_confirm_password_label="<fmt:message key='change_confirm_password_label'/>";
	var change_password_button_label="<fmt:message key='change_password_button_label'/>";
	var profile_pic_note_label="<fmt:message key='profile_pic_note_label'/>";
	var search_role_txt="<fmt:message key='search_role_txt'/>";
	var add_user_header="<fmt:message key='add_user_header'/>";
	var pagination_page_txt="<fmt:message key='pagination_page_txt'/>";
	var add_permission_reset="<fmt:message key='add_permission_reset'/>";
	var edit_permission_cancel="<fmt:message key='edit_permission_cancel'/>";
	var add_role_reset="<fmt:message key='add_role_reset'/>";
	var edit_role_cancel="<fmt:message key='edit_role_cancel'/>";
	var reports_h4_Header="<fmt:message key='reports_h4_Header'/>";
	     
	var product_tab_li_a="<fmt:message key='product_tab_li_a'/>";
 	var office_tab_li_a="<fmt:message key='office_tab_li_a'/>";
 	var payment_tab_li_a="<fmt:message key='payment_tab_li_a'/>";
 	var orders_tab_li_a="<fmt:message key='orders_tab_li_a'/>";
 	var orderdetail_tab_li_a="<fmt:message key='orderdetail_tab_li_a'/>";
 	var employee_tab_li_a="<fmt:message key='employee_tab_li_a'/>";
 	var customer_tab_li_a="<fmt:message key='customer_tab_li_a'/>";
 	         	var dashboard_tab_li_a="<fmt:message key='dashboard_tab_li_a'/>";
	var notifications_tab_li_a="<fmt:message key='notifications_tab_li_a'/>";
	var emailnotifications_tab_li_a="<fmt:message key='emailnotifications_tab_li_a'/>";
	var worklist_tab_li_a="<fmt:message key='worklist_tab_li_a'/>";
	var audit_tab_li_a="<fmt:message key='audit_tab_li_a'/>";
	var report_tab_li_a="<fmt:message key='report_tab_li_a'/>";
	var profile_tab_li_a="<fmt:message key='profile_tab_li_a'/>";
	var settings_tab_li_a="<fmt:message key='settings_tab_li_a'/>";
	var analytics_tab_li_a="<fmt:message key='analytics_tab_li_a'/>";
	var user_tab_li_a="<fmt:message key='user_tab_li_a'/>";
	var permission_tab_li_a="<fmt:message key='permission_tab_li_a'/>";
	var role_tab_li_a="<fmt:message key='role_tab_li_a'/>";
	var search_role_description_txt="<fmt:message key='search_role_description_txt'/>";
	var index_Analytics="<fmt:message key='index_Analytics'/>";
var index_analytics_charts="<fmt:message key='index_analytics_charts'/>";
var index_analytics_reports="<fmt:message key='index_analytics_reports'/>";
var index_administration="<fmt:message key='index_administration'/>";
var index_administration_audit="<fmt:message key='index_administration_audit'/>";
var home_label="<fmt:message key='home_label'/>";
	
var searchRoleBtn="<fmt:message key='searchRoleBtn'/>";
	
	
	</script>
</fmt:bundle>
