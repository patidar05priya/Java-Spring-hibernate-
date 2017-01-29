/**************************************User Js Starts Here*********************************************/

var oTable1;
var userTableRowData='';
var rolesData='';
var oTable2;
var isUserSelected=false;
var userData;
var resetUserId;
var statuschecked;
var oTable;
var userId;
var countemailupdate=0;
var addAddressJson="";
var editAddressJson="";
var editaddressobject;
var useridForEdit = "";
var unlockusername="";

/* Function is used to get users list*/
function checkeditusercall()
{
	openEditScreen('user');
	if(hasValue(currentDomainId))
		sendGETRequest(context+"/rest/Users/search?_s=userid=="+useridForEdit+";domain.domainid=="+currentDomainId+"&ulimit=9&llimit=0&date="+new Date(),"getEditUserData","");
	else
		sendGETRequest(context+"/rest/Users/search?_s=userid=="+useridForEdit+"&ulimit=9&llimit=0&date="+new Date(),"getEditUserData","");
}
		
/* Function is used to remove user table data */
function removeUserTableData()
{
	$('#pswd_info_user').hide();
	$(' #pswd_info_emailname').hide();
	oTable1.fnDraw();
	$("#add_user_form").trigger('reset');
	$("#Rolestable").find('input:checkbox').attr('checked', false);
}

/* Function is used to set data in edit form call back */
function getEditUserData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		if(hasValue(data))
		{
			setdatainEditForm(data);
		}
	}	
}

/* Function is used to set data in edit form*/
function setdatainEditForm(data)
{
    editaddressobject = data;
    $("#edit_user_div #headerUserName").empty();
	$("#edit_user_div #headerUserEmail").empty();
	$("#edit_user_div #headerUserTelephone").empty();
	$("#edit_user_div #headerUserImage").empty();
	var firstname ;
	var lastname ;
	var email ;
	var telephone ;
	var username ;
	var address ;
	var enabled=false;
	if(hasValue(data[0].firstname))
	 firstname = htmlDecode(data[0].firstname);
	if(hasValue(data[0].username))
	 username = htmlDecode(data[0].username);
	if(hasValue(data[0].userid))
	 userid = data[0].userid;
	if(hasValue(data[0].enabled))
	 enabled = data[0].enabled;
	if(hasValue(data[0].lastname))
	 lastname = htmlDecode(data[0].lastname);
	if(hasValue(data[0].email))
	 email = htmlDecode(data[0].email);
	if(hasValue(data[0].telephone))
		telephone = htmlDecode(data[0].telephone);
	if(hasValue(data[0].userAddress))
		address = htmlDecode(data[0].userAddress.addressLine1);
	$("#edit_user_div #headerUserImage").attr("src",'../rest/Users/getUserImageById/'+data[0].userid);
	$("#edit_user_div #headerUserName").append('<i class="icon-user"></i> ' + firstname+"  "+ lastname);
	$("#edit_user_div #headerUserEmail").append('<i class="icon-envelope"></i>&nbsp;' + email);
	if(hasValue(telephone))
		$("#edit_user_div #headerUserTelephone").append('<i class="icon-phone"></i>&nbsp;' + telephone);
	else
		$("#edit_user_div #headerUserTelephone").append('<i class="icon-phone"></i>&nbsp;' + "--");

	$("#edit_user_div #edit_user_form #username").val(username);
	$("#edit_user_div #edit_user_form #userid").val(userid);
	$("#edit_user_div #edit_user_form #enabled").val(enabled);
	$("#edit_user_div #edit_user_form #firstname").val(firstname);
	$("#edit_user_div #edit_user_form #lastname").val(lastname);
	$("#edit_user_div #edit_user_form #telephone").val(telephone);
	$("#edit_user_div #edit_user_form #email").val(email);
	$("#edit_user_div #edit_user_form #editUser_Address_act").text(address);
	$("#edit_user_div #edit_user_form #edit_form_email_div").val(email);
	activeclassforenable('edit_user_div');
}

/* Function is used to get user detail call back */
function getDetailUserData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		if(hasValue(data))
		{
			appendDatainDetailForm(data);
		}
	}	
}

/* Function is used to append user detail data in form*/
function appendDatainDetailForm(data)
{
	$("#details_user_div #headerUserName").empty();
	$("#details_user_div #personalInfoDivMain #personalInfoDiv").empty();
	$("#details_user_div #headerUserEmail").empty();
	$("#details_user_div #headerUserTelephone").empty();
	$("#details_user_div #headerUserImage").empty();
	statuschecked=data[0].enabled ;
	var firstname = "--";
	var lastname = "--";
	var email = "--";
	var telephone = "--";
	var username="--";
	var address="--";
	var createdTime="--";
	var modifiedTime="--";
	if(hasValue(data[0].firstname))
	 firstname = data[0].firstname;
	if(hasValue(data[0].username))
	 username = data[0].username;
	if(hasValue(data[0].createdTime))
	 createdTime = localizeDateString(new Date(data[0].createdTime),dateFormat);
	if(hasValue(data[0].modifiedTime))
	 modifiedTime = localizeDateString(new Date(data[0].modifiedTime),dateFormat);
	if(hasValue(data[0].lastname))
	 lastname = data[0].lastname;
	if(hasValue(data[0].email))
	 email = data[0].email;
	if(hasValue(data[0].telephone))
		telephone = data[0].telephone;
	if(hasValue(data[0].userAddress))
		address = data[0].userAddress.addressLine1;
	editaddressobject=data[0].userAddress;
	editAddressJson=JSON.stringify(editaddressobject);
	$("#details_user_div #headerUserName").append('<i class="icon-user"></i>&nbsp;' + firstname + "&nbsp;" + lastname);
	$("#details_user_div #headerUserEmail").append('<i class="icon-envelope"></i>&nbsp;' + email);
	$("#details_user_div #headerUserTelephone").append('<i class="icon-phone"></i>&nbsp;' + telephone);
	$("#details_user_div #headerUserImage").attr("src",'../rest/Users/getUserImageById/'+data[0].userid);

	$("#details_user_div #personalInfoDivMain #personalInfoDiv").append('<div class="form-row"><div class="col-1-labels">User Name</div><div class="col-2-fields"><span id="username">'+username+'</span></div></div><div class="form-row"><div class="col-1-labels">First Name</div><div class="col-2-fields"><span id="username">'+firstname+'</span></div></div><div class="form-row"><div class="col-1-labels">Last Name</div><div class="col-2-fields"><span id="username">'+lastname+'</span></div></div><div class="form-row"><div class="col-1-labels">Mobile</div><div class="col-2-fields"><span id="username">'+telephone+'</span></div></div><div class="form-row"><div class="col-1-labels">Email</div><div class="col-2-fields"><span id="username">'+email+'</span></div></div><div class="form-row"><div class="col-1-labels">Address</div><div class="col-2-fields"><span id="username">'+address+'</span></div></div><div class="form-row"><div class="col-1-labels">Created Time</div><div class="col-2-fields"><span >'+createdTime+'</span></div></div><div class="form-row"><div class="col-1-labels">Modified Time</div><div class="col-2-fields"><span >'+modifiedTime+'</span></div></div>');
    
    activeclassforenable('details_user_div');
}

/* Function is used to get User Data call back*/
function getUserData(XMLHttpRequest, data, rpcRequest)
{
		if(XMLHttpRequest.status==200)
		{
			userTableRowData=data;
			Usersflag=userTableRowData.length;
			if(hasValue(data))
			{
				$("#userViewGrid").empty();
				appendDataOfUsers(data);	
				userlowerlimit= userupperlimit + 1;
				userupperlimit= userlowerlimit + DEFAULT_PAGE_UPPERLIMIT;
		    }
		    else
		    {
				  $("#userViewGrid").empty();
				  $("#userViewGrid").append('<h3 style="text-align:center;background-color:#cccccc">No data to show<h3>'); 
		    }
		}	
}

/* Function is used to get user data on scroll*/
function getUserDataFromScroll(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{	
		userTableRowData=data;
		Usersflag=userTableRowData.length;
		if(hasValue(data))
		{
			userlowerlimit= userupperlimit + 1;
			userupperlimit= userlowerlimit + DEFAULT_PAGE_UPPERLIMIT;
			$("#userViewGrid").empty();
			appendDataOfUsers(data);	
		}
		else
		{
		}
	}	
}

/* Function is used to append User Data */
function appendDataOfUsers(data)
{
	for(var i=0;i<data.length;i++)
	{
		var firstname;
		var lastname ;
		if(hasValue(data[i].firstname))
			firstname=data[i].firstname;
		if(hasValue(data[i].lastname))
			lastname=data[i].lastname;
		var icon="";
		if(data[i].lockStatus)
		{
			// icon ='<i onclick="lockUser(\''+data[i].username+'\')" title="Unlock user" class="icon-lock red bigger-140"></i>';
			icon = getCustomImage("lockedNw.png", "Unlock user", "lockUser(\""+data[i].username+"\")", "18", "");
		}
		else
		{
			// icon = '<i class="icon-unlock green bigger-140" ></i>';
			icon = getCustomImage("unlockNw.png", "Unlocked", "", "18", "");
		}
	    var usernameData = ellipsistext(firstname+" "+lastname);
	    $("#userViewGrid").append('<div class="grid-box left" style="float: left;"><div style="width:195px;height:175px;margin-top: -43px;"><a href="javascript:void(0)" title="User Summary" onclick="openUserDetailPage('+data[i].userid+');"><img  style="width:160px;height:160px;" src="'+'../rest/Users/getUserImageById/'+data[i].userid+'"  onerror="this.src=\'../images/avatar2.png\'" alt="User Image"></a></div><h4 title="'+firstname+" "+lastname+'">'+usernameData+'</h4><div class="detail" style="margin-top: -12px;"><div class="pull-rightaction-buttons" style="margin-top: -5px;"><a href="javascript:void(0)" onclick="openUserDetailPage('+data[i].userid+')"  class="orange " title="View User"><!--<i class="icon-eye-open bigger-150 blue"></i>-->  '+getCustomImage("view1.png", "View User", "", "18", "")+'</a> <span class="sideBarBreadCrumbSpan">|</span> <a href="#Update_Role_Modal" id="update_role_act"  onclick="UpdateRoleAct('+data[i].userid+')" data-toggle="modal" class="green " title="Update Roles"><!--<i class="icon-user bigger-150"></i>--> '+getCustomImage("update-role.png", "Update Role", "", "18", "")+'</a>  <span class="sideBarBreadCrumbSpan">|</span>  <a href="#Reset_password_modal"  id="reset_password_act"  onclick="ResetPassword('+data[i].userid+')" role="button" data-toggle="modal" class="red " title="Reset Password"><!--<i class="icon-key bigger-150"></i>-->'+getCustomImage("resetpassnew.png", "Reset Password", "", "18", "")+' </a>  <span class="sideBarBreadCrumbSpan">|</span>  <a href="javascript:void(0)" onclick="javascript:void(0)"  class="orange" title="Lock User">'+icon+'</a></div> </div></div>');
    }
}

/* Function is used to open user detail page */
function openUserDetailPage(id)
{
	useridForEdit = id;
	openDetailScreen('user');
	if(hasValue(currentDomainId))
		sendGETRequest(context+"/rest/Users/search?_s=userid=="+id+";domain.domainid=="+currentDomainId+"&ulimit=9&llimit=0&date="+new Date(),"getDetailUserData","");
	else
		sendGETRequest(context+"/rest/Users/search?_s=userid=="+id+"&ulimit=9&llimit=0&date="+new Date(),"getDetailUserData","");
}

/* Function is used to get Role data call back */
function getRolesData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		rolesData=data;	
		rolesDataTable();				
	}	
}	

/* Function is used to get All User List */
function refreshAllUserList()
{
	showRegularLoading();
	$("#user_pagination_next").css("display", "");
	$("#user_pagination_pre").css("display", "");
	var uperLimit=eval($('#user_pagination_value').val());
	$("#user_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('user');
	sendGETRequest(context+"/rest/Users/search?&date="+new Date()+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getUserData","");
}

/* Function is used to find user Data by id*/
function searchUserData(id)
{
	showRegularLoading();
	var fiql=searchDataByFIQL(id);
	fiqlUsersParam=fiql;
	$("#userfilterTab").slideToggle();
	sendGETRequest("../rest/Users/search"+fiql+"&date="+new Date(),"getUserData","","");
}	

/* Function is used to show user table */
function userViewTable()
{
		$('#userViewGrid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="viewUserGrid"></table>' );
		$('#viewUserGrid thead tr').each( function () 
		{
				this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
		});
		$('#viewUserGrid tbody tr').each( function () 
		{
				this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
		});
		var tableY=310;
		oTable=$('#viewUserGrid').dataTable(
		{	
			"bFilter":false,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"aaData": userTableRowData,
			"bPaginate":false,
			"bJQueryUI": true,	
			"sDom": 'Rlftrip',
			"aoColumns": [
							{"sTitle":user_thead_username,"mData":"username"},
							{"sTitle":user_thead_firstname,"mData":"firstname"},
							{"sTitle":user_thead_city,"mData":"userAddress.city"},
							{"sTitle":user_thead_telephone,"mData":"telephone"},
							{"sTitle":user_thead_email,"mData":"email"},
							{"sTitle":user_thead_locked,"mData":"lockStatus","sClass": "details_action","bSortable": false,"mRender": function (data, type, full)
								{
									 if(data==false)
								     {
										return ' <div ><i  class="icon-unlock green bigger-140"></i></div>';
								     }
								     else
								     {
								       return ' <div ><i  id="lockeduser" class="icon-lock red bigger-140"></i></div>';
									 }
								     return data;
								}	
							},
							{"sTitle":user_thead_enabled,"sClass": "details_action","mData":"enabled","mRender": function (data, type, full)
							        {
										if (data==true) 
										{ 
											statuschecked= "Disable";
											return '<span class="label label-success" style="width:40%" id="EnableDisable"  onclick="CheckEnableDisable()">Enable</span>';
										}
										else 
										{
											statuschecked="Enable";
											return '<span class="label label-danger" id="EnableDisable"  onclick="CheckEnableDisable()">Disabled</span>';
										}
										return data;
							        }
							},
							{"sTitle":user_thead_action, "sWidth":"20%", "sClass": "details_action","fnRender": function (oObj)
							        {
										return '<div class="pull-rightaction-buttons"><a href="javascript:void(0)" onclick="checkeditusercall()"  role="button" data-toggle="modal" class="orange " title="Update User"><i class="icon-edit bigger-130"></i> </a><span class="vbar"></span><a href="#Update_Role_Modal" id="update_role_act" data-toggle="modal" class="green " title="Update Roles"><i class="icon-user bigger-130"></i> </a> <a href="#Reset_password_modal"  id="reset_password_act" role="button" data-toggle="modal" class="red " title="Reset Password"><!--<i class="icon-key bigger-130"></i>-->'+getCustomImage("resetpassnew.png", "Reset Password", "", "14", "")+'</a><span class="vbar"></span></div>';
    							    }
						    }
					   ]				
			});	
			$('#viewUserGrid tbody tr td').live( 'hover' , function (e) {
				$('td').removeAttr( 'id',"tooltip");
				this.setAttribute( 'id',"tooltip" );
				if($(this).hasClass('details_action'))
				{
					$(this).removeAttr( 'id',"tooltip");
				}
				if($(this).text().length!=0)
				{
					$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
				}
			});
			$('#viewUserGrid tbody tr td #lockeduser').on( 'click' , function (e) {
						var row = $(this).closest('tr').get(0);
						var aPos = oTable.fnGetPosition( row );
						var aData = oTable.fnGetData( aPos );
						lockUser(aData.username);
			});
			$("#viewUserGrid tbody").on( 'click', 'tr', function () {
						isUserSelected=true;
						$('tr').removeClass("active");
						$(this).addClass("active");
						userData = oTable.fnGetData(this);	
						editaddressobject=userData.userAddress;
						editAddressJson=JSON.stringify(editaddressobject);
						js2form(document.getElementById('edit_user_form'),userData,".","",true);	
						if(!(userData.userAddress==null))
						{
						$('#editUser_Address_act').text(userData.userAddress.addressLine1);
						}
		    });
            $('#viewUserGrid tbody tr td #update_role_act').on( 'click' , function () {
				var row = $(this).closest('tr').get(0);
				var aPos = oTable.fnGetPosition( row );
				var aData = oTable.fnGetData( aPos );
				show_modal_window(aData.userid,"userupdaterole.html");
		    });
			$('#viewUserGrid tbody tr td #reset_password_act').on( 'click' , function () {
				var row = $(this).closest('tr').get(0);
				var aPos = oTable.fnGetPosition( row );
				var aData = oTable.fnGetData( aPos );							
				show_modal_window_reset(aData.userid,"resetpassword.html");
			});
			RemoveUniqueLoading();
}
	
/* Function is used to update role */
function UpdateRoleAct(id)
{   
	show_modal_window(id,"userupdaterole.html");
}

/* Function is used to reset password */
function ResetPassword(id)
{
	show_modal_window_reset(id,"resetpassword.html");
}
	
/* Function is used to show model window*/
function show_modal_window(id,html_page)
{
	userid=id;
	var url=context+"/pages/"+html_page;
	$.get(url,function(data){
		$('#User_Role_modal').html(data);
	});
}
	
/* Function is used to reset model window*/
function show_modal_window_reset(id,html_page)
{
	resetUserId=id;
	var url=context+"/pages/"+html_page;
	$.get(url,function(data){
		$('#Reset_password').html(data);
	});
}

/* Function is used to show role data table*/
function rolesDataTable()
{
	$('#AllRolesTable').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="Rolestable"></table>' );
	$('#Rolestable thead tr').each( function () 
	{
			this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
	});
	$('#Rolestable tbody tr').each( function () 
	{
			this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
	});
    oTable1=$('#Rolestable').dataTable(
    {	  	
			"bFilter":false,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"bSort":false,
			"aaData": rolesData,
			"aoColumns": [
								{"sTitle":user_role_thead_rolename,"mData":"rolename"},
								{"sTitle":user_role_thead_description,"mData":"description"},
								{ "bSortable": false, "aTargets": [ 0 ] ,"mRender": function (data, type, full) 
									{				
										return '<label><input name="switch-field-1" class="ace ace-switch ace-switch-6" type="checkbox"><span class="lbl"></span></label>';
									}
							    }
						]
	});	
}		

/* Function is used to create new user */
function createNewUser(id)
{
	if(jQuery('#'+id).validationEngine('validate') )
	{
		if(!(addAddressJson==""))
			{
				var modjson=JSON.stringify(convertFormDataToJSON(id));
					modjson=modjson.substring(0,modjson.length-1);
					var roles='';
					$('#AllRolesTable tbody tr ').each(function(){
						var row = $(this).closest('tr').get(0);
						var aPos = oTable1.fnGetPosition( row );
						if(hasValue(aPos))
						{
							var aData= oTable1.fnGetData( aPos );
							var flag=$(row).find('input:checkbox:first').is(':checked');
							if(flag)
							{
								var roleid= aData.roleid;
								var rolename=aData.rolename;
								var description=aData.description;
								roles+='{"rolename":"'+rolename+'","roleid":"'+roleid+'","description":"'+description+'"},';
							}
						}
					});
					roles=roles.substring(0,roles.length-1);
					modjson+=',"roles":['+roles+'],"userAddress":'+addAddressJson+'}';
					if(roles=="")
					{
						showErrorLoading("Please assign atleast one role");
					}
					else
					{
						sendPOSTRequest(context+"/rest/Users/create/",modjson,"createUserCallBack","");	
					}							
				}
			else
			{
				showErrorLoading("Address is required");	
			}
	}
}	

/* Function is used to create new user call back */
function createUserCallBack(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{
		if(XMLHttpRequest.status == 200)
		{					 
			window.setTimeout(function(){
			openListScreen('user');
			$("#user_pagination #content").text("showing "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");
			sendGETRequest(context+"/rest/Users/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getUserData","");
			showCenteredLoading(user_success_createMsg);
			},1000);
		}
	}
}

/* Function is used to enable active class */
function activeclassforenable(mainDivID)
{
	 $("#"+mainDivID+" #deactiveli").removeClass("active");
	 $("#"+mainDivID+" #activeli").removeClass("active");
	 if(statuschecked)
	 {
		$("#"+mainDivID+" #activeli").addClass("active");
	 }
	 else
	 {
		$("#"+mainDivID+" #deactiveli").addClass("active");
	 }
}	
	
/* Function is used to active or deactivete user*/
function activatedeactivateUser(flag)
{
	if(flag=="active")
	{
		if(!statuschecked) {
			// commonDialogBox("Do you want to Enable the user ?","enableUser()");
			$('#user_enable_disable_dialog').modal('show');
			$("#user_enable_disable_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#user_enable_disable_dialog .header").html("Enable user");
			$("#user_enable_disable_dialog .modal-body span").html("Do you want to enable this user ?");
			$("#user_enable_disable_btn").attr('onclick', 'enableUser()');
		}
	}
	else
	{
		if(statuschecked) {
			// commonDialogBox("Do you want to Disable the user ?","disableUser()");
			$('#user_enable_disable_dialog').modal('show');
			$("#user_enable_disable_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#user_enable_disable_dialog .header").html("Disable user");
			$("#user_enable_disable_dialog .modal-body span").html("Do you want to disable this user ?");
			$("#user_enable_disable_btn").attr('onclick', 'disableUser()');
		}
	}
}
		
/* Function is used to enable user */
function enableUser()
{ 
	sendPUTRequest(context + "/rest/Users/enableuser/" + useridForEdit,"","updateEnableCallBack","");
}
	
/* Function is used to update enable user call back */
function updateEnableCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{
		showCenteredLoading(user_success_enableMsg);
	    openUserDetailPage(useridForEdit);			
	}
}
		
/* Function is used to lock user*/
function lockUser(userName)
{ 
	unlockusername = userName;
	// commonDialogBox("Do you want to unlock the user ?","unlockuser()");
	$('#unlock_user_dialog').modal('show');
	$("#unlock_user_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
	$("#unlock_user_dialog .header").html("Unlock user");
	$("#unlock_user_dialog .modal-body span").html("Do you want to unlock this user ?");
	$("#unlock_user_dialog_btn").attr('onclick', 'unlockuser()');
}

/* Function is used to unlock user */
function unlockuser()
{
	sendPUTRequest(context + "/rest/Users/unlock/"+unlockusername,"","updateLockCallBack","");
}

/* Function is used to update lock user call back */
function updateLockCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{
		showCenteredLoading("User unlocked successfully");
		$("#user_pagination #content").text("showing "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");	
		sendGETRequest(context+"/rest/Users/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getUserData","");
	}
}

/* Function is used to desable user */
function disableUser(userId)
{
	sendPUTRequest(context + "/rest/Users/disableuser/" + useridForEdit,"","updatedisableCallBack","");
}

/* Function is used to update disable user call back */
function updatedisableCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{
		showCenteredLoading(user_success_disableMsg);
		openUserDetailPage(useridForEdit);			
	}
}


/* Function is used to update user call back*/
function updateUser(formid)
{
	if(jQuery('#'+formid).validationEngine('validate'))
	{
		if(countemailupdate==0)
		{
			// var edituserjson=JSON.stringify(convertFormDataToJSON(formid));	
			var edituserjson = convertFormDataToJSON(formid);
			delete edituserjson["edit_form_email_div"];
			edituserjson = JSON.stringify(edituserjson);

			if(hasValue(editAddressJson))
			{	
				edituserjson=edituserjson.substring(0,edituserjson.length-1);
				edituserjson+=	',"userAddress":'+editAddressJson+'}';
			}	
			if(hasValue(currentDomainId))
			{	
				edituserjson=edituserjson.substring(0,edituserjson.length-1);
				edituserjson+=',"domain":{"domainid":"'+currentDomainId+'"}}';
			}
			var edituserjson2=eval('['+edituserjson+']');
			if(edituserjson2[0].userAddress.city==null)
			{ 
				showErrorLoading("Address is required");	}else{
				sendPUTRequest(context+"/rest/Users/updateUser/",edituserjson,"updateUserCallBack","");
			}
		}
	}
}

var newUserName="";

$('#add_user_form #username').keyup(function() {
			countusername=0;
			newUserName=$(this).val();
			$('#pswd_info_user').hide();
}).blur(function() {
		newusername = $(this).val();
		if(newusername.length > 2)
		$("#add_user_form #username").validationEngine("validate");
});
    
var newemail;

/* Function is used to update user call back */
function updateUserCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{	 
		 openListScreen('user');			 
		 showCenteredLoading(user_success_updateMsg);
		 sendGETRequest(context+"/rest/Users/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getUserData","");
	}
}

var newusername;
var countemail=0;
var countusername=0;
		
$('#add_user_form #email').keyup(function() {
	countemail=0;
	$(' #pswd_info_emailname').hide();
}).blur(function() {
				newemail = $(this).val();
				if(newemail.length > 2)
				$("#add_user_form #email").validationEngine("validate");
});
			
$('#edit_user_form #email').keyup(function() {
	countemail=0;
    $('#pswd_info_emailnameupdate').hide();
}).blur(function() {
	newemail = $(this).val();
	var id=$('#edit_user_form #userid').val();
	if(newemail.length > 2)
	$("#edit_user_form #email").validationEngine("validate");
   // var url=context + "/rest/Users/emailSearchForuserUpdate?email="+newemail+"&id="+id+"&date="+new Date();
	//sendGETRequest(url,"getUseremailDataforUpdate","");
});

function checkUserNameExist(field, rules, i, options){
	var url=context + "/rest/unauthorize/usernameSearch?username="+field.val();
if(hasValue(currentDomainId))
		{
			 var url=context + "/rest/unauthorize/usernameanddomainSearch?username="+field.val()+"&domainname="+currentDomainName;

		}
    var msg = undefined;
    $.ajax({
        type: "GET",
        url: url,
        headers:{"csrfParam":getCookieClosePortal()},
        cache: false,
        dataType: "json",
        async: false,
        success: function(json) {
	            if(json) {
                msg = "* User already exists.";
            }
        }            
    });  
    if(msg != undefined) {
        return msg;
    }
	}

function checkEmailExist(field, rules, i, options) {
	var fieldValue = field.val();
	var displayedFor = field.attr("displayFor");
	var originalEmail = "";
	if(hasValue(displayedFor) && displayedFor == "Edit") {
		originalEmail = $("#edit_user_div #edit_user_form #edit_form_email_div").val().toString();
	}
	if(originalEmail !== fieldValue)
	{
		var url=context + "/rest/unauthorize/emailSearch?email="+field.val();
		if(hasValue(currentDomainId)) {
			url=context + "/rest/unauthorize/emailSearch?email="+field.val();
		}
		var msg = undefined;
		$.ajax({
			type: "GET",
			url: url,
			headers:{"csrfParam":getCookieClosePortal()},
			cache: false,
			dataType: "json",
			async: false,
			success: function(json) {
					if(json) {
					msg = "* Email already exists.";
				}
			}            
		});  
		if(msg != undefined) {
			return msg;
		}
	}
}					
					
/* Function is used to get user search data */
function getUserSearchData(XMLHttpRequest, data, rpcRequest)
{ 
	if(XMLHttpRequest.status==200)
	{
		var usernameexists=false;
		for(var i=0;i<data.length;i++)
		{
			if(data[i].username==newUserName)
			{
				usernameexists=true;
				break;
			}
		}
		if(usernameexists)
		{ 
			$('#pswd_info_user').show();
			countusername++; 
			usernameexists=false;
		}
		else
			$('#pswd_info_user').hide();
    }
}
	
/* Function is used to get email data of user call back */
function getUseremailData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{  
		var useremailexists=false;
		for(var i=0;i<data.length;i++)
		{
			
			 if(htmlDecode(data[i].email)==newemail)
			 {
					useremailexists=true;
					break;
			 }
		}
		if(useremailexists)
		{	
			$('#pswd_info_emailname').show(); 
			countemail++;
			useremailexists=false;
		}			
		else
			$('#pswd_info_emailname').hide();
	}
}

/* Function is used to get User email Data Update call back*/
function getUseremailDataforUpdate(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		if(data == true)
		{
			$('#pswd_info_emailnameupdate').show(); 
			countemailupdate=1;
		}			
		else
			$('#pswd_info_emailnameupdate').hide();
	}
}
		
$('#AddUser_Address_act').click(function(){	
	var url=context+"/pages/addAddressform.html";
    $.get(url,function(data){
		$('#UserAdd_Address_modal').html(data);
	});
});

$('#editUser_Address_act').click(function(){	
	var url=context+"/pages/editAddressform.html";
	$.get(url,function(data){
		$('#Useredit_Address_modal').html(data);
	});
});

/* Function is used to edit Address of user*/
function editAddressUserHtml()
{
	window.setTimeout(function(){
		js2form(document.getElementById('edit_user_Address_form'),editaddressobject[0].userAddress,".","",true);
		window.setTimeout(function() {
			// to remove label show in input box where value is setted in html on blur function is called
			jQuery('.form-without-label input[type="text"]').blur();
		},200);
	},2000);
}

/* Function is used to add address for new User*/
function addAddressForNewUser(id)
{
	addAddressJson=convertFormDataToJSON(id);
	addAddressJson=JSON.stringify(addAddressJson);
}

/* Function is used to edit address for new user */
function editAddressForNewUser(id)
{
	editAddressJson=convertFormDataToJSON(id);
	editAddressJson=JSON.stringify(editAddressJson);
}

/* Function is used to check Password strength */
function passwordStrengthCheckerappendHtmlForAddUser()
{
	if(PasswordStrength=="basic")
	{
		$('#add_user_form #password').addClass('validate[required,custom[basicpassword]]');
		}
	if(PasswordStrength=="regular")
	{
		$('#add_user_form #password').addClass('validate[required,custom[basicpassword]]');
	}
	if(PasswordStrength=="medium")
	{
		$('#add_user_form #password').addClass('validate[required,custom[mediumpassword]]');
	}
	if(PasswordStrength=="advance")
	{
		$('#add_user_form #password').addClass('validate[required,custom[advancepassword]]');
	}

}

/* Function is used to set Password rule for user */


/**************************************User Js End Here*********************************************/
