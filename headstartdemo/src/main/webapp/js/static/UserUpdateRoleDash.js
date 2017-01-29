/**************************************UserUpdateRoleDash Js Starts Here*********************************************/

var oTable1;
var rolesDataDb='';
var oTable2Db;
var userRoleDb='';
var useridDb;

/*Function is used to Get Users Role Data By Id for db*/
function getUsersRoleDataByIdDb(XMLHttpRequest, data, rpcRequest)
{     
	if(XMLHttpRequest.status==200)
	{
		userRoleDb=data;	
	}	
}	

/*Function is used to Get Users Role Data db Call Back */
function getRolesDataUserDb(XMLHttpRequest, data, rpcRequest)
{     
	if(XMLHttpRequest.status==200)
	{
		rolesDataDb=data;	
		rolesDataTableUserDb();				
	}	
}	

/*Function is used to show roles db data on table */
function rolesDataTableUserDb()
{
	$('#AllRolesTableUserDb').html('<table cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="RolestableUserDb"></table>');
	$('#RolestableUserDb thead tr').each( function () {
		this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
	});
	$('#RolestableUserDb tbody tr').each( function () {
		this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
	});
	oTable1=$('#RolestableUserDb').dataTable({
		"bFilter":false,
		"bScrollCollapse": true,
		// "aoColumns": [{"sWidth":"100%"},{"sWidth":"100%"},{"sWidth":"10%"}],
		// "aoColumns": [{"sWidth":"100%"},{"sWidth":"40%"},{"sWidth":"10%"}],
		"bAutoWidth": true,
		"bPaginate": false,
		"bJQueryUI": true,
		"sDom":'rlftrip',
		"aaData": rolesDataDb,
		"aaSorting": [[1, 'asc']],
		"aoColumns": [
				{"sTitle":user_role_thead_rolename,"mData":"rolename", "mRender": function (data, type, full) 
					{
						return makeFirstLetterUpperCase(data);
					}
				},
				{"sTitle":user_role_thead_description,"mData":"description", "mRender": function (data, type, full) 
					{
						return makeFirstLetterUpperCase(data);
					}
				},
				{ "bSortable": false, "aTargets": [0] , "mRender": function (data, type, full) 
					{
						return '<label><input name="switch-field-1" class="ace ace-switch ace-switch-6" type="checkbox"><span class="lbl"></span></label>';
					}
			    }
		 ]
	});	
	window.setTimeout(function(){oTable1.fnDraw();},300);
	userRoleTablesDb();
	RemoveUniqueLoading();
}	
		

/*Function is used to show user roles db on table*/
function userRoleTablesDb()
{
	for(var i=0; i<userRoleDb.length; i++)
	{
		$('#AllRolesTableUserDb tbody tr').each(function() {
			var row = $(this).closest('tr').get(0);
			var aPos = oTable1.fnGetPosition( row );
			if(hasValue(aPos)) {
				var aData= oTable1.fnGetData( aPos );
				if(aData.roleid==userRoleDb[i].roleid) {
					$(row).find('input:checkbox:first').attr('checked','true');
				}
			}
		});
	}
}

/*Function is used to update roles Db*/
function update_rolesDb()
{
	var myarray = [];
    var myarray = [];
	$('#AllRolesTableUserDb tbody tr ').each(function(){
		var row = $(this).closest('tr').get(0);
		var aPos = oTable1.fnGetPosition( row );
		if(hasValue(aPos))
		{
		    var aData= oTable1.fnGetData( aPos );
			var flag=$(row).find('input:checkbox:first').is(':checked');
			if(flag == true || flag == "true") {
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
		// sendPUTRequest(context+"/rest/Users/updateRoles/"+userid,myarray,"update_roles_callbackDb","");
		sendPUTRequest(context+"/rest/Users/updateRoles/"+useridDb,myarray,"update_roles_callbackDb","");
	}
}
	
/*Function is used to update roll db call back*/
function update_roles_callbackDb(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(XMLHttpRequest.status == 200)
		{	
			$('.modal-backdrop').css('z-index',-3);
			$('#Update_Role_Db_Modal').fadeOut();
			showCenteredLoading("Roles updated successfully");
			if(useridDb == LOGIN_USER_ID) { // logout in case of same user as permission is chaged on relogin
				logout();
			}
		}
		else
		{
			showErrorLoading("error");
		}
	}
}

/**************************************UserUpdateRoleDash Js End Here*********************************************/
