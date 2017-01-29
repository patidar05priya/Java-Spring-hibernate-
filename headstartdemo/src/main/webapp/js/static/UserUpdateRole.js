/**************************************UserUpdateRole Js Starts Here*********************************************/

var rolesData='';
var oTable2;
var userRole='';
var userid;
var oTable1;

/*Function is used to Get Users Role Data By Id*/
function getUsersRoleDataById(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		userRole=data;	
	}	
}	

/*Function is used to Get Users Role Data Call Back*/
function getRolesDataUser(XMLHttpRequest, data, rpcRequest)
{     
	if(XMLHttpRequest.status==200)
	{
		rolesData=data;	
		rolesDataTableUser();				
	}
}	

/*Function is used to show roles data table*/
function rolesDataTableUser()
{
	$('#AllRolesTableUser').html('<table cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="RolestableUser"></table>');
	$('#RolestableUser thead tr').each(function () {
		this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
	});
	$('#RolestableUser tbody tr').each(function () {
		this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
	});

	oTable1=$('#RolestableUser').dataTable({
		"bFilter":false,
		"bScrollCollapse": false,
		"aoColumns": [{"sWidth":"100%"},{"sWidth":"30%"},{"sWidth":"10%"}],
		"bPaginate": false,
		"bJQueryUI": true,
		"sDom":'rlftrip',
		"aaData": rolesData,
		"aaSorting": [[1, 'asc']],
		"aoColumns": [
						{"sTitle":user_role_thead_rolename,"mData":"rolename","mRender": function (data, type, full) 
							{				
								return makeFirstLetterUpperCase(data);
							}
						},
						{"sTitle":user_role_thead_description,"mData":"description","mRender": function (data, type, full) 
							{				
								return makeFirstLetterUpperCase(data);
							}
						},
						{ "bSortable": false, "aTargets": [ 0 ] ,"mRender": function (data, type, full) 
							{				
								return '<label><input name="switch-field-1" class="ace ace-switch ace-switch-6" type="checkbox"><span class="lbl"></span></label>';
							}
						 }
					 ]
	});	
    window.setTimeout(function(){oTable1.fnDraw();},300);
	userRoleTables();
	RemoveUniqueLoading();	
}

/*Function is used to show user roles table*/
function userRoleTables()
{
	for(var i=0;i<userRole.length;i++)
	{
		$('#RolestableUser tbody tr ').each(function(){
			var row = $(this).closest('tr').get(0);
			var aPos = oTable1.fnGetPosition( row );
			if(hasValue(aPos))
			{
				var aData= oTable1.fnGetData( aPos );
				if(aData.roleid==userRole[i].roleid)
				{
					$(row).find('input:checkbox:first').attr('checked','true');
				}
			}
		});
	}
}
	
/*Function is used to update roles */
function update_roles()
{
	var myarray = [];
	$('#RolestableUser tbody tr ').each(function(){
		var row = $(this).closest('tr').get(0);
		var aPos = oTable1.fnGetPosition( row );
		if(hasValue(aPos))
		{
			 var aData= oTable1.fnGetData( aPos );
			 var flag=$(row).find('input:checkbox:first').is(':checked');
			 if(flag)
			 {
				myarray.push(aData.roleid);
			 }
  		}
  	 });
     myarray=JSON.stringify(myarray);
     if(myarray== "[]")
     {
		showErrorLoading("Please assign atleast one role");
	 }
	 else
	 {
		 sendPUTRequest(context+"/rest/Users/updateRoles/"+userid,myarray,"update_roles_callback","");
	 }
}

/*Function is used to update roll call back*/
function update_roles_callback(XMLHttpRequest, data, rpcRequest)
{
    if(!checkException(XMLHttpRequest.responseText))
	{	
	    if(XMLHttpRequest.status == 200)
		{	
			$('.modal-backdrop').css('z-index',-3);
			$('#Update_Role_Modal').fadeOut();
			showCenteredLoading(user_success_roleupdateMsg);
			openListScreen('users');
			if(useridDb == LOGIN_USER_ID) {
				logout();
			}
		}
		else {
			showErrorLoading(user_error_roleupdateMsg);
		}
	}
}

/**************************************UserUpdateRole Js End Here*********************************************/
