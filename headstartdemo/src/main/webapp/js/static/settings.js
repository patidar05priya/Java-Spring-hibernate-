/**************************************Setting Js Starts Here*********************************************/

var DomainRowData;
var userDomainid;
var setting_domainnamevalid=1;
var domainiddelete;
var setting_countusername=1;

/*Function is used to set smtp config*/
function setSmtpConfig(id)
{
	if(jQuery('#'+id).validationEngine('validate'))
	{
		var formData =convertFormDataToJSON(id);
		sendPOSTRequest(context+"/rest/SMTPConfig/config/",JSON.stringify(formData),"set_SmtpConfig_callback","");
	}
}

/*Function is used to set smtp config call back*/
function set_SmtpConfig_callback(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(statuscheck(XMLHttpRequest.status,'employees'))
		{
			if(XMLHttpRequest.status==200)
			{		
				showCenteredLoading('configurations saved successfully');
			}
			else
			{
				showErrorLoading("Error in retriving entities");
			}	
		}	
	}
}
	 
/*Function is used to set configuration*/
function setConfigurations(data)
{
	$('#smtpConfigDiv span').each(function() {
		var getId=$(this).attr("id");
		var value_Set = eval("data."+getId) || "null";
		if(value_Set == "null")
		{
			value_Set = "--" 
		}
		if(getId=="enabled")
		{
			enableStatus=value_Set;
		}
		if(getId=="modifiedtime" ||  getId=="creationtime")
		{
			value_Set=formatAsDateandTime (value_Set,"-",true);
		}
		$(this).html(value_Set);
	});
	$('#smtpConfigDiv input').each(function() {
		var getId=$(this).attr("id");
		var value_Set = eval("data."+getId) || "null";
		$(this).val(value_Set);
	});
	editableon();
	RemoveUniqueLoading();
}
	
	 
/*Function is used to get smtp config data call back*/
function getSmtpConfigData(XMLHttpRequest, data, rpcRequest)
{	
	 setConfigurations(data);
}

/*Function is used to get cox data call back*/
function getCoxConfigData(XMLHttpRequest, data, rpcRequest)
{	
	 if(XMLHttpRequest.status==200)
	 {		
		js2form(document.getElementById('sox_config_form'),data,".","",true);
	 }
}
	
/*Function is used to set editable on*/
function editableon() 
{
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x icon-spinner icon-spin'></i></div>";
	$.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="icon-ok icon-white"></i></button>'+
								'<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>';    
	$('#smtpConfigDiv #port').editable({
		   type: 'text',
		   name: 'port'
	});
	$('#smtpConfigDiv #hostName').editable({
		   type: 'text',
		   name: 'hostName'
	});
	$('#smtpConfigDiv #userName').editable({
		   type: 'text',
		   name: 'userName'
	});
	$('#smtpConfigDiv #password').editable({
		   type: 'password',
		   name: 'password', 
		   success: function(response, newValue) {
			$("#smtpConfigDiv #password").val(newValue);
		   }
	});
}
	
/*Function is used to update smtp config*/
function updateSmtpconfig()
{		
	sendUserJson='{';
	$('#smtpConfigDiv span').each(function() {
		var getId=$(this).attr("id");	
		sendUserJson+='"'+getId+'":';						
		var getvalue=$(this).text();
		if(getId=="enabled")
			sendUserJson+='"'+enableStatus+'",';
		else
			sendUserJson+='"'+getvalue+'",';
	});
	$('#smtpConfigDiv input').each(function() {
		var getId=$(this).attr("id");				
		sendUserJson+='"'+getId+'":';					
		var getvalue=$(this).val();
		sendUserJson+='"'+getvalue+'",';			
	});
	sendUserJson=sendUserJson.substring(0,sendUserJson.length-1)+"}";
	sendPOSTRequest(context+"/rest/smtpConfig/config/",sendUserJson,"set_SmtpConfig_callback","");
}
	
/*Function is used to update default paging */
function updatePagingDefault()
{	
	if(jQuery('#paging_default_form').validationEngine('validate'))
	{
		var pagging=$('#paggingValue').val();
		DEFAULT_PAGE_UPPERLIMIT=parseInt(pagging);
		sendPOSTRequest(context+"/rest/smtpConfig/paging/"+pagging,"","update_PagingDefault_callback","");
	}
}

/*Function is used to update sox config*/
function updateSoxConfig()
{	
	if(jQuery('#sox_config_form').validationEngine('validate'))
	{
		var formData =convertFormDataToJSON(sox_config_form);
		sendPOSTRequest(context+"/rest/smtpConfig/coxconfig/",JSON.stringify(formData),"update_sox_config_callback","");
	}
}
	
/*Function is used to update paging default call back*/
function update_PagingDefault_callback(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{		
		showCenteredLoading('configurations saved successfully');
	}
	else
	{
		showErrorLoading("Error in retriving entities");
	}	
}	
	
/*Function is used to update six config call back*/
function update_sox_config_callback(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{		
		showCenteredLoading('configurations saved successfully');
	}
	else
	{
		showErrorLoading("Error in retriving entities");
	}	
}	
		
var setting_countemail=1;

/*Function is used to create new domain*/
function saveNewDomain()
{
	if(jQuery('#add_domain_form').validationEngine('validate'))
	{
		if(setting_countemail==1)
		{
			var formData =convertFormDataToJSON("add_domain_form");
			sendPOSTRequest("../rest/unauthorize/createDomain/",JSON.stringify(formData),"create_domain_callback","");
		}		
	}
}

/*Function is used to create new domain call back*/
function create_domain_callback(XMLHttpRequest, data, rpcRequest)
{
	document.getElementById("add_domain_form").reset();
	if(XMLHttpRequest.status==200)
	{
		showCenteredLoading("domain created");
		sendGETRequest (context+"/rest/Domain/search?_s=success==true&ulimit=1000&llimit=0&date="+new Date(),"getDomainListData", "","");	
	}
	else
	{
		showErrorLoading("Error in retriving entities");
	}	
}

$('#add_domain_form #name').keyup(function() {
		setting_domainnamevalid=0;
		$(' #setting_pswd_info_domainname').hide();
    }).blur(function() {
		newemail = $(this).val();
		//var url= "../rest/unauthorize/domainnameSearch?domainname="+newemail+"&date="+new Date();
		//sendGETRequest(url,"getDomainValidData","");
});


function checkDomain(field, rules, i, options) {
	var fieldValue = field.val();
	if(hasValue(fieldValue)) {
		var url=context + "/rest/unauthorize/domainnameSearch?domainname="+fieldValue;
		var msg = undefined;
		$.ajax({
			type: "GET",
			url: url,
			headers:{"csrfParam":getCookieClosePortal()},
			cache: false,
			dataType: "json",
			async: false,
			success: function(json) {
				if(json == true || json == "true") {
					msg = "* Domain already exists.";
				}
			}            
		});  
		if(msg != undefined) {
			return msg;
		}
	}
}

/*Function is used to get domain data call back*/
function getDomainValidData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{  
		if(data == true)
		{	
			$('#setting_pswd_info_domainname').show(); 
				setting_domainnamevalid=0;
		}			
		else
			$('#setting_pswd_info_domainname').hide();
				setting_domainnamevalid=1;		 
	 }
}


/*Function is used to get domain list data*/
function getDomainListData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		DomainRowData=data;
		domainViewTable();				
	}	
}
	
/*Function is used to show domain*/
function domainViewTable()
{	
	$("#domainView #domainViewBody").html("");
	for(var i=0;i<DomainRowData.length;i++)
	{
		var remarks = checkAndReturnEmptyData(DomainRowData[i].remarks)
		
		//$("#domainView #domainViewBody").append('<tr><td class="">'+DomainRowData[i].domainname+'</td><td> '+remarks+'</td><td class="hidden-480"><a href="#add_user_in_domain" id="update_role_act" role="button" class="" data-toggle="modal"><i  onclick="createUserForDomain('+DomainRowData[i].domainid+')" data-toggle="tooltip" title="Add User"class="icon-plus bigger-110 blue tooltipdash"></i>&nbsp;&nbsp;</a><i  data-toggle="tooltip" title="Delete"onclick="deleteDomainmodal('+DomainRowData[i].domainid+')" class="icon-remove bigger-130 red tooltipdash"></i></td></tr>');

		$("#domainView #domainViewBody").append('<tr><td class="">'+DomainRowData[i].domainname+'</td><td> '+remarks+'</td><td class="hidden-480"><a href="#add_user_in_domain" id="update_role_act" role="button" data-toggle="modal">'+getCustomImage("add-green.png", "Add User", ""+createUserForDomain(''+DomainRowData[i].domainid+'')+"", "20", "")+'</a></td></tr>');

		// <i  onclick="createUserForDomain('+DomainRowData[i].domainid+')" data-toggle="tooltip" title="Add User" class="icon-plus bigger-110 blue tooltipdash"></i>&nbsp;&nbsp;
	}
}

/*Function is used to show delete model and used to delete domain*/
function deleteDomainmodal(id) 
{
	commonDialogBox("Do you want to delete domain ?" ,"deleteDomain()")				
	domainiddelete=id;
}  
	
/*Function is used to delete domain*/
function deleteDomain() 
{
	sendDELETERequest(context+"/rest/Domain/"+domainiddelete,"","delete_Domain_callback","");
}   
      
/*Function is used to delete domain call back */
function delete_Domain_callback(XMLHttpRequest, data, rpcRequest)
{
	$('#domain_delete_dialog').fadeOut();
	if(XMLHttpRequest.status==204)
	{		
		sendGETRequest (context+"/rest/Domain/search?_s=success==true&ulimit=1000&llimit=0&date="+new Date(),"getDomainListData", "","");	
	}
	else
	{
		showErrorLoading("Domain can not deleted,having some dependencies");
	}		
}

/*Function is used to create user for domain*/			
function createUserForDomain(id)
{ 
	userDomainid=id;
	show_modal_window_Domain(id,"domainAddUser.html");
	sendGETRequest(context+"/rest/Roles/search?_s=domain.domainid=="+id+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getRoleDataForDomain","");
}

/*Function is used to show model window for domain*/
function show_modal_window_Domain(id,html_page)
{
	var url=context+"/pages/"+html_page;
	$.get(url,function(data){
	$('#User_Domain_Add').html(data);
	});
}

/*Function is used to get role data for domain call back*/
function getRoleDataForDomain(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		$('#roleDomainList #roleid').append('<option value="">Roles</option>');
		for(var i=0;i<data.length;i++)
		{
			$('#roleDomainList #roleid').append('<option value="'+data[i].roleid+'">'+data[i].rolename+'</option>');
		}
	}
}

/**************************************Setting Js End Here*********************************************/
