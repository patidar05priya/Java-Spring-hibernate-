/**************************************Role Js Starts Here*********************************************/

var newrolename;
var countrolename=0;
var roleTable1;
var RoleTableRowData='';
var permissionsData='';
var roleTable2;
var roleTable;
var isRoleSelected=false;
var rolepermission;
var rolesoldnTr= null;

/*Function is used to search Role by id*/
function searchRoleData(id)
{
	showRegularLoading();	
	$("#rolefilterTab").slideToggle();
	var fiql=searchDataByFIQL(id);
	fiqlRolesParam=fiql;
	sendGETRequest(context+"/rest/Roles/search"+fiql+"&date="+new Date(),"getRoleData","","");
}	

/*Function is used to open role screen*/
function checkeditrolecall()
{
		openEditScreen('role');
}

/*function  to get total count of entity role*/
function getroleTotalCount()
{
		sendGETRequest(context+"/rest/Roles/totalCount?date="+new Date(),"getroleTotalCountCallBack","");
		
}

/*Call back  of get total count of entity role*/
function getroleTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#role_totalCount').html(" / "+data);
				$('#role_totalCount').html(data);
			}
			else
			{
			alert("error in data");
			}
		}		
	}
}

/*Call Back Function is used to get Roll Data*/
function getRoleData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		// $('#role_pagination_totalRecord').text(pagination_totalRecords+data.length);
		getroleTotalCount();
		RoleTableRowData=data;
		Rolesflag=RoleTableRowData.length;	
		RoleViewTable();
		// $("#role_pagination_totalRecord").text("Total Records : "+ roleTable.fnSettings().fnRecordsDisplay());
		$("#role_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	}	
}

/*Call Back Function is used to get Permission Data*/	
function getPermissionsData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		permissionsData=data;	
	}	
}	

/*Function is used to show user permission*/			
function userPermissionsDataTables()
{
	
		$('#UserPermissionsTable').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="userPermissions"></table>' );
		roleTable2=$('#userPermissions').dataTable(
		{		  
			"bFilter":false,
			"bScrollCollapse": true,
			"bPaginate": false,
			"bJQueryUI": true,
			"sDom":'rlftrip',
			"aaSorting": [[1, 'asc']],
			"aoColumns": [
							{"sTitle":roles_permission_thead_permissionname,"mData":"permissionname"},
							{"sTitle":roles_permission_thead_description,"mData":"description"},
							{ "bSortable": false, "aTargets": [ 0 ] ,"mRender": function (data, type, full) 
								{				
									return '<button class="btn btn-mini btn-info" id="Permissions_delete_act" data-toggle="tooltip" title="Delete"  data-animation="true"><i class="icon-minus"></i></button>';
								}
							}
					     ]
		});	
		$('#viewAuditGrid tbody tr td').live( 'hover' , function (e) {
		var isAction = $(this).hasClass('details_action');
		if(!isAction)
		{
			$('td').removeAttr( 'id',"tooltip");
			if(!$(this).hasClass( "details"))
			{
				// this.setAttribute( 'id',"tooltip" );
			}
			if($(this).text().length!=0)
			{
				$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
			}
		}
		});	
		$('#userPermissions tbody tr td #Permissions_delete_act').on( 'click', function () {
			var row = $(this).closest('tr').get(0);
			var aPos = roleTable2.fnGetPosition( row );
			var aData = roleTable2.fnGetData( aPos );
			roleTable2.fnDeleteRow(aPos,null, true);
					roleTable2.fnDraw();
	    });
}

/*Function is used to Remove Permission */
function removePermissionTableData()
{
	$("#add_permission_list_tbody").find('input[type=checkbox]').each(function(){
		  $(this).attr("checked",false);
	});
	$("#add_permission_db_widget_list_tbody").find('input[type=checkbox]').each(function(){
		  $(this).attr("checked",false);
	});
	$('#add_permission_list_tbody').empty();
	$('#edit_permission_list_tbody').empty();
	$('#edit_permission_db_widget_list_tbody').empty();
	$('#add_permission_db_widget_list_tbody').empty();
	createPermissionRowForRole('add_permission_list_tbody')
	addDashboardWidgetPermission("add_permission_db_widget_list_tbody");
}

/*Function is used to get roles*/
function refreshAllRoleList()
{
	showRegularLoading();
	$("#role_pagination_next").css("display", "");
	$("#role_pagination_pre").css("display", "");
	var uperLimit=eval($('#role_pagination_value').val());
	$("#role_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('role');
	sendGETRequest(context+"/rest/Roles/search?&date="+new Date()+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getRoleData","");
}

/* Function is used to show permission table */
function permissionsDataTable()
{
	$('#AllPermissionsTable').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="Permissionstable"></table>' );
	roleTable1=$('#Permissionstable').dataTable(
	{	
			"bFilter":false,
			"bScrollCollapse": true,
			"bPaginate": false,
			"bJQueryUI": true,
			"sDom":'Rlftrip',
			"aaData": permissionsData,
			"aaSorting": [[1, 'asc']],
			"aoColumns": [
								{"sTitle":roles_permission_thead_permissionname,"mData":"permissionname"},
								{"sTitle":roles_permission_thead_description,"mData":"description"},
								{ "bSortable": false, "aTargets": [ 0 ] ,"mRender": function (data, type, full) 
									{				
										return '<button class="btn btn-mini btn-info" id="Permissions_add_act" data-toggle="tooltip" title="Add"  data-animation="true"><i class="icon-plus"></i></button>';
									}
								}
						  ]
	 });
	 $('#Permissionstable tbody tr td').live( 'hover' , function (e) {
			$('td').removeAttr( 'id',"tooltip");
			// this.setAttribute( 'id',"tooltip" );
			if($(this).hasClass('details')||($(this).hasClass('Action')))
			{
					$(this).removeAttr( 'id',"tooltip");
			}
			if($(this).text().length!=0)
			{
					$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
			}
	 });	
	 $('#Permissionstable tbody tr td #Permissions_add_act').on( 'click' , function () {
		    var row = $(this).closest('tr').get(0);
			var aPos = roleTable1.fnGetPosition( row );
			var rolesData = roleTable1.fnGetData( aPos );
			var nNodes = roleTable2.fnGetNodes();
			var rt=0;
				for(var a in nNodes)
				{
					if(JSON.stringify(rolesData)===JSON.stringify(roleTable2.fnGetData(a)))
					{
						rt=1;
					}
				}	
				if(rt==0)
				{
					roleTable2.fnAddData(rolesData);
				}
			return false;
	});
}		
	
/*Function is used to show role */	
function RoleViewTable()
{
	$('#roleViewGrid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="viewRoleGrid"></table>' );
	jQuery('#viewRoleGrid thead tr').each( function () 
	{
		this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
	});
	jQuery('#viewRoleGrid tbody tr').each( function () 
	{
		this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
	});
	roleTable=$('#viewRoleGrid').dataTable(
	{	 
			"bFilter":false,
			"bAutoWidth": false,
			"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
			"aaData": RoleTableRowData,
			"bLengthChange":false,
			"bPaginate":false,
			"bJQueryUI": true,	
			"sDom": 'Rlftrip',
			"bLengthChange":false,
			"aaSorting": [[1, 'asc']],
			"aoColumns": [
							{"sTitle":roles_thead_rolename,"mData":"rolename"},
							{"sTitle":roles_thead_description,"mData":"description"},
							{"sTitle":roles_thead_action, "sWidth":"20%", "sClass": "details_action headeralign","fnRender": function (oObj)
							  {
								var action480='<div class="visible-phone hidden-desktop"><div class="inline position-relative"><button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown"><i class="icon-cog icon-only bigger-110"></i></button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close"><li><div class="table_view float_left" style="display:block; margin-left:15px;" id="roles_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li><li><div class="table_edit float_left" id="roles_edit_act" style="display:block"  data-toggle="tooltip" title="Update Role" data-animation="true"></div> </li>';
								return '<div class="action_center_align hidden-phone" ><div class="" ><div class="table_view float_left" id="roles_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div><div id="roles_edit_act"   class="table_edit float_left" title="Update Role"></div></div></div>'+action480;
							  }
						    }
						]				
	  });	
      $('#viewRoleGrid tbody tr td #roles_edit_act').on( 'click' , function () {
		$("#edit_permission_list_tbody").find('input[type=checkbox]').each(function(){
			$(this).attr("checked",false);
		});
		$("#edit_permission_db_widget_list_tbody").find('input[type=checkbox]').each(function(){
			$(this).attr("checked",false);
		});
		$('#add_permission_list_tbody').empty();
		$('#edit_permission_list_tbody').empty();
		$('#edit_permission_db_widget_list_tbody').empty();
		$('#add_permission_db_widget_list_tbody').empty();
		createPermissionRowForRole('edit_permission_list_tbody');
		addDashboardWidgetPermission("edit_permission_db_widget_list_tbody");
		var row = $(this).closest('tr').get(0);
		var aPos = roleTable.fnGetPosition( row );
		var aData = roleTable.fnGetData( aPos );
		openEditScreen('role');
		rolepermission=aData.permissions;
		for(var i=0; i< rolepermission.length; i++)	
		{
			var selectId=rolepermission[i].permissionname.toLowerCase();
			$('#edit_permission_db_widget_list_tbody #'+selectId).attr('checked', true);	
		}
		for(var i=0; i<rolepermission.length; i++)	
		{
			var permissioncheck = rolepermission[i].permissionname;
			if(hasValue(permissioncheck))
			{
				$('#edit_permission_list_tbody #'+permissioncheck).attr('checked', true);	
			}
			if(permissioncheck=="usermgmt")
			{
				$('#edit_permission_list_tbody #'+permissioncheck+"read").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"create").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"update").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"delete").attr('checked', true);
			}
			if(permissioncheck=="reporting")
			{
				$('#edit_permission_list_tbody #'+permissioncheck+"read").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"create").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"update").attr('checked', true);
				$('#edit_permission_list_tbody #'+permissioncheck+"delete").attr('checked', true);
			}
		}
		js2form(document.getElementById('edit_role_form'),aData,".","",true);
	});
	$('#viewRoleGrid tbody tr td #roles_details_act').on( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = roleTable.fnGetPosition( row );
			var aData = roleTable.fnGetData( aPos );
			openDetailScreen('role');
			$('#details_role_div span').each(function() {
				var getId=$(this).attr("id");
				var getType=$(this).attr("type");
				var value_Set = eval("aData."+getId) || "--";
				if(getId=="enabled")
				{
					enableStatus=value_Set;
				}
				if(getType=="date")
				{
					value_Set=formatAsDateandTime (value_Set,"-",true);	
				}	
				$(this).html(value_Set);
			});
	});
	$('#viewRoleGrid tbody tr td').live( 'hover' , function (e) {
		var isAction = $(this).hasClass('details_action');
		if(!isAction)
		{
				$('td').removeAttr( 'id',"tooltip");
				if(!$(this).hasClass( "details"))
				{
					// this.setAttribute( 'id',"tooltip" );
				}
				if($(this).text().length!=0)
				{
					$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
				}
		}
    });
	$('#viewRoleGrid tbody td').click( function () {
		var array=new Array();
		$('tr').removeClass("active");
		$(this).parents('tr').addClass("active");
		var visibleLength=0;
		for(i=0;i<roleTable.fnSettings().aoColumns.length;i++)
		{
			if(roleTable.fnSettings().aoColumns[i].bVisible)
			{
				array.push(roleTable.fnSettings().aoColumns[i].sTitle)
			}
		}
		var nTr = $(this).parents('tr')[0];
		var oSettings=roleTable.fnSettings()
		if(!$(this).hasClass("details_action")&&array[$(this).index()]!="Action")
		{
			if(rolesoldnTr!=nTr && rolesoldnTr!=null)
			{
				roleTable.fnClose( rolesoldnTr );
				roleTable.fnDraw();	
			}
			if(roleTable.fnIsOpen(nTr))
			{
					roleTable.fnClose( rolesoldnTr );
			}
			else
			{
				rolesoldnTr=nTr;
				roleTable.fnOpen( nTr, fnFormatDetails(roleTable, nTr), 'details' );
			}
			return false;
		 }
     });
	function fnFormatDetails ( oTable, nTr )
	{   
		var aData = oTable.fnGetData( nTr );
		var sOut = '<div class="permission" id="hello" style="margin-left: 12%; margin-right:7%; border: solid 2px; border:solid 2px;border-color: rgba(122, 163, 163, 0.94);"><table  class="permission" id="ggh" cellpadding="5" cellspacing="0" border="0" >';
		sOut += '<tr class="permission"><th class="span6 permission">'+roles_tbody_thead_permission+'</th><th class="span6 permission">'+roles_tbody_thead_description+'</th></tr>';
		for(var i=0;i<aData.permissions.length;i++)
		{
			sOut += '<tr class="permission"><td class="span10 permission">'+aData.permissions[i].permissionname+'</td><td class="span10 permission">'+aData.permissions[i].description+'</td></tr>';
		}
		sOut += '</table></div>';
		return sOut;
	}
	$("#viewRoleGrid tbody").on( 'click', 'tr', function () {
		isRoleSelected=true;
		$('tr').removeClass("active");
		$(this).addClass("active");
		roleData = roleTable.fnGetData( this );	
		js2form(document.getElementById('edit_role_form'),roleData,".","",true);	
	});
 	RemoveUniqueLoading();
}

/*Function is used to create new role*/
function createNewRole(id)
{
	if(jQuery('#'+id).validationEngine('validate'))
	{
		if(countrolename==0)
		{
			var modjson=JSON.stringify(convertFormDataToJSON(id));
			modjson=modjson.substring(0,modjson.length-1);
			var nNodes = roleTable2.fnGetNodes( );
			var roles='';
			if(!nNodes.length==0)
			{
				for(var a in nNodes)
				{
					var newData=roleTable2.fnGetData(a);
					var description=newData.description;
					var permissionid=newData.permissionid;
					var permissionname=newData.permissionname;
					roles+='{"description":"'+description+'","permissionid":"'+permissionid+'","permissionname":"'+permissionname+'"},';
				}
				roles=roles.substring(0,roles.length-1);
			}	
			modjson+=',"permissions":['+roles+']}';
			sendPOSTRequest(context+"/rest/Roles/create/",modjson,"createNewRoleCallBack","");	
		}
		if(countrolename!=0)
		{
			$('#role_info_user').show(); 
		}
	}
}
	
/*Call Back Function is used to create new role*/
function createNewRoleCallBack(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{	
	    if(XMLHttpRequest.status == 200)
		{					 
			showCenteredLoading(roles_success_createMsg);
			openListScreen('role');	
			$("#role_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");
			sendGETRequest(context+"/rest/Roles/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getRoleData","");
		}
	}
}

/*Function is used to upadate the role*/	
function updateRole(formId)
{
	if(jQuery('#'+formId).validationEngine('validate'))
	{
		var editrolejson=convertFormDataToJSON(formId);
		editrolejson=JSON.stringify(editrolejson)
		editrolejson = editrolejson.substring(0, (editrolejson.length - 1)) +',"permissions":'+JSON.stringify(rolepermission)+"}";
		sendPUTRequest(context+"/rest/Roles/update/",editrolejson,"updateRoleCallBack","");
	}
}
	

/*Call Back Function is used to upadate the role*/	
function updateRoleCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(XMLHttpRequest.status == 200)
		{	
			 openListScreen('role');			 
			 showCenteredLoading("Role updated successfully");
			 $("#role_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");
			 $('#rolepagenovalue').html(1);
			 sendGETRequest(context+"/rest/Roles/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getRoleData","");
		}
	}
}
	
/*Call Back Function is used to get Role Search Data*/      
function getRoleSearchData(XMLHttpRequest, data, rpcRequest)
{ 
	if(XMLHttpRequest.status==200)
	{ 
		if(data.length == 1)
		{
			$('#role_info_user').show();
			$("#role_info_user").css("top", ($("#add_role_form #rolename").offset().top-92)+"px");
			countrolename++; 
		}
		else
		{ 
			$('#role_info_user').hide();
		}
	}
}

/* Function is used to view permission check box */
function selectViewPermissionCheckbox(object)
{
	var selectId=object.id;
	if(object.id.match(/create/)=='create')
	{
		var permission=selectId.replace('create','');
		$('#'+permission+'read').attr('checked',true);
	}
	else if(object.id.match(/update/)=='update')
	{
		var permission=selectId.replace('update','');
		$('#'+permission+'read').attr('checked',true);
	}
	else if(object.id.match(/delete/)=='delete')
	{
		var permission=selectId.replace('delete','');
		$('#'+permission+'read').attr('checked',true);
	}	
}

/*Function is used to create permission row for role */
function createPermissionRowForRole(id)
{
	$("#"+id).empty();
	var tabNames = new Array();
	tabNames = tabNameArr;
	var rowId ;		
	var viewId;
	var addId ;
	var editId;
	var deleteId;
	for(var i=0;i<tabNames.length;i++)
	{	
		var tabName=tabNames[i];
		rowId = tabNames[i] +"row_" + i;
		viewId = tabNames[i] +  "read";
		addId =  tabNames[i] +  "create";
		editId = tabNames[i] + "update";
		deleteId = tabNames[i] +  "delete"
		if(tabName =="usermgmt")
		{
				tabName="User Management";
		}
		if(tabName =="reporting")
		{
				tabName="Reporting";
		}
		$("#"+id).append("<tr id='"+rowId+"'><td>"+tabName+"</td><td class='center'><label class='roleSwitch' style='width:60px'><input id='"+viewId+"' type='checkbox' value='"+viewId+"' name='switch-field-1' class='ace ace-switch ace-switch-6'><span class='lbl /*check_read/'></span></label></td><td class='center'><label style='width:60px' class='roleSwitch'><input onchange='selectViewPermissionCheckbox(this);'  id='"+addId+"' value='"+addId+"' type='checkbox' name='switch-field-1' class='ace ace-switch ace-switch-6'><span class='lbl /*check_add*/'></span></label></td><td class='center'><label style='width:60px' class='roleSwitch'><input onchange='selectViewPermissionCheckbox(this);' type='checkbox' value='"+editId+"' id='"+editId+"'name='switch-field-1' class='ace ace-switch ace-switch-6'><span class='lbl /*check_update*/'></span></label></td><td class='center'><label style='width:60px' class='roleSwitch'><input type='checkbox' onchange='selectViewPermissionCheckbox(this);' value='"+deleteId+"' id='"+deleteId+"' name='switch-field-1' class='ace ace-switch ace-switch-6'><span class='lbl /*check_delete*/'></span></label></td></tr>");
	}
}

/*Function is used to add dashboard widget permission */
function addDashboardWidgetPermission(id)
{
	for(var i=0;i<dashboardChartData.length;i++)
	{
		var row = dashboardChartData[i];
		var perId = row.id;
		var title = row.title;
		var permissionName;
		var p_id;
		if(hasValue(row.permission_name))
		{
				permissionName =row.permission_name; 
				p_id = permissionName.toLowerCase();
		}
		else
		{
				permissionName =row.permission; 
				replaceAll("view_",row.permission,"canView");
				permissionName = replaceAll("_permission",permissionName,"");
				permissionName = replaceAll("_",permissionName,"");
				p_id = permissionName.toLowerCase();
				p_id="can"+p_id;
		}
		if(p_id.length>3)
		{
			$("#"+id).append("<tr><td>"+title+"</td><td class='center'><label style='width:87px'><input id='"+p_id+"' value='"+permissionName+"' type='checkbox' name='switch-field-1' class='ace ace-switch ace-switch-6'><span class='lbl'></span></label></td></tr>")
		}
	}
}

/*Function is used to add role permission mapping*/
function AddRolePermissionMapping()
{
	if($('#add_role_form').validationEngine('validate'))
	{
		var selectedPermissionName = new Array();
		$("#add_permission_list_tbody tr").each(function () {
			var rowId = $(this).attr('id');
			$("#"+rowId +" td").each(function () {
				if(hasValue($(this).find("input[type=checkbox]")))
				{
					var isCheck = $(this).find("input[type=checkbox]").attr('checked')
					if(hasValue(isCheck)){
						if(isCheck=="checked")
						{
							selectedPermissionName.push($(this).find("input").val())
						}
					}
				}		
			});	
		});
		$("#add_permission_db_widget_list_tbody tr td").each(function () {
			var isCheck = $(this).find("input").attr('checked')
			if(isCheck=="checked")
			{
				selectedPermissionName.push($(this).find("input").val())
		    }
		});
		getAllIdFromPermissionData(selectedPermissionName);
	}
}

/*Function is used to permisson mapping update role*/
function PermissionMappingupdateRole()
{ 
	if($('#edit_role_form').validationEngine('validate'))
	{
		var selectedPermissionName = new Array();
		$("#edit_permission_list_tbody tr").each(function () {
			var rowId = $(this).attr('id');
			$("#"+rowId +" td").each(function () {
				if(hasValue($(this).find("input")))
				{
					var isCheck = $(this).find("input").attr('checked')
					if(isCheck=="checked")
						selectedPermissionName.push($(this).find("input").val())
				}		
			});	
		});
		$("#edit_permission_db_widget_list_tbody tr td").each(function () {
			var isCheck = $(this).find("input").attr('checked')
			if(isCheck=="checked")
				selectedPermissionName.push($(this).find("input").val())
		});
		selectedPermissionName = getUniqueArray(selectedPermissionName);
		getAllIdFromPermissionupdateData(selectedPermissionName);
	}
}

/*Function is used to get all id from permission updated data*/
function getAllIdFromPermissionupdateData(nameArr)
{
	var permissionIdArr = new Array();
	if(permissionsData.length>0)
	{
		for(var i=0;i<nameArr.length;i++)
		{
			var permissionId;
			if(nameArr[i]=="reportingread" || nameArr[i]=="reportingcreate"||nameArr[i]=="reportingupdate"||nameArr[i]=="reportingdelete" || nameArr[i]=="usermgmtread" ||nameArr[i]=="usermgmtcreate"||nameArr[i]=="usermgmtupdate"|| nameArr[i]=="usermgmtdelete" )
			{
				if(nameArr[i]=="reportingread" || nameArr[i]=="reportingcreate"|| nameArr[i]=="reportingupdate" || nameArr[i]== "reportingdelete" )
					permissionId = 3;
				else
					permissionId = 2;
			}
			else
				permissionId = getPermissionIdFromPermission(nameArr[i])
			if(hasValue(permissionId))
				permissionIdArr.push(permissionId);
				permissionIdArr.push(300);
			permissionIdArr=getUniqueArray(permissionIdArr);
		}
	}
	var modjsoncreate=JSON.stringify(convertFormDataToJSON("edit_role_form"));
    modjsoncreate=modjsoncreate.substring(0,modjsoncreate.length-1);
	var roles='';
	for(var i=0 ;i< permissionIdArr.length ;i++)
	{
		roles+='{"permissionid":"'+permissionIdArr[i]+'","permissionname":"'+nameArr[i]+'"},';
	}
	roles=roles.substring(0,roles.length-1);
	modjsoncreate+=',"permissions":['+roles+']}';
	sendPUTRequest(context+"/rest/Roles/update/",modjsoncreate,"updateRoleCallBack","");
	roles="";
	return permissionIdArr;
}

/*Function is used to get all id from permission data*/
function getAllIdFromPermissionData(nameArr)
{
	var permissionIdArr = new Array();
	if(permissionsData.length>0)
	{
		for(var i=0;i<nameArr.length;i++)
		{
			var permissionId;
			if(nameArr[i]=="reportingread" || nameArr[i]=="reportingcreate"||nameArr[i]=="reportingupdate"||nameArr[i]=="reportingdelete" || nameArr[i]=="usermgmtread" ||nameArr[i]=="usermgmtcreate"||nameArr[i]=="usermgmtupdate"|| nameArr[i]=="usermgmtdelete" )
			{
				if(nameArr[i]=="reportingread" || nameArr[i]=="reportingcreate"|| nameArr[i]=="reportingupdate" || nameArr[i]== "reportingdelete" )
					permissionId = 2;
				else
					permissionId = 3;
			}
			else
				permissionId = getPermissionIdFromPermission(nameArr[i])
			if(hasValue(permissionId))
				permissionIdArr.push(permissionId);
			permissionIdArr=getUniqueArray(permissionIdArr);
		}
	}
	var modjsonupdate=JSON.stringify(convertFormDataToJSON("add_role_form"));
    modjsonupdate=modjsonupdate.substring(0,modjsonupdate.length-1);
	var roles='';
	for(var i=0 ;i< permissionIdArr.length ;i++)
	{
		roles+='{"permissionid":"'+permissionIdArr[i]+'","permissionname":"'+nameArr[i]+'"},';
	}
	roles=roles.substring(0,roles.length-1);
	modjsonupdate+=',"permissions":['+roles+']}';
	sendPOSTRequest(context+"/rest/Roles/create/",modjsonupdate,"createNewRoleCallBack","");	
	return permissionIdArr;
}

/*Function is used to get permission id from permission*/
function getPermissionIdFromPermission(name)
{
	if(permissionsData.length>0)
	{
		for(var i=0;i<permissionsData.length;i++)
		{
			var row = permissionsData[i];
			if(row.permissionname.toLowerCase()==name.toLowerCase()){
				return row.permissionid;
			}
		}
	}
	return "";	
}

/**************************************Role Js Starts Here*********************************************/
