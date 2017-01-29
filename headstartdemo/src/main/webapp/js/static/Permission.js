/**************************************Permission Js Starts Here*********************************************/

var permissionTableRowData='';
var permissionData='';
var permissionTable;
var flag;
var isPermissionSelected=false;
var newpermissionname;
var countpermissionname=0;
	
/* Function is used to open permission screen */
function checkeditpermissioncall()
{
		openEditScreen('permission');
}

/*function  to get total count of entity role*/
function getpermissionTotalCount()
{
		sendGETRequest(context+"/rest/Permissions/totalCount?date="+new Date(),"getpermissionTotalCountCallBack","");
		
}
	
/*Call back  of get total count of entity role*/
function getpermissionTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
		{
			if(XMLHttpRequest.status==200)
			{
				// $('#permission_totalCount').html(" / "+data);
				$('#permission_totalCount').html(data);
			}
			else
			{
				alert("error in data");
			}
		}
	}
}

/*Call Back Function is used to get permission data */
function getPermissionData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{  
		// $('#permission_pagination_totalRecord').text(pagination_totalRecords+data.length);
		getpermissionTotalCount();
		permissionTableRowData=data;	
		flag=permissionTableRowData.length;
		Permissionsflag=permissionTableRowData.length;
		permissionViewTable();
		// $("#permission_pagination_totalRecord").text("Total Records : "+ permissionTable.fnSettings().fnRecordsDisplay());
		$("#permission_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	}
}
	
/* Function is used to get all permission list */		
function refreshAllPermissionList()
{
	$("#permission_pagination_next").css("display", "");
	$("#permission_pagination_pre").css("display", "");
	var uperLimit=eval($('#permission_pagination_value').val())-1;
	$("#permission_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit+1)+" "+pagination_entries+" " );
	openListScreen('permission');
	sendGETRequest(context+"/rest/Permissions/search?&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getPermissionData","");
}	
		
/*Call Back Function is used to get all  searched permission data*/		
function getFiqlPermissionData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{  
		permissionTableRowData=data;	
		flag=permissionTableRowData.length;
		$("#permission_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");
		permissionViewTable();	
		// $("#permission_pagination_totalRecord").text("Total Records : "+ permissionTable.fnSettings().fnRecordsDisplay());
		$("#permission_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	}	
}
		
/*Function is used to searched permission data*/		
function searchPermissionData(id)
{
	$("#permissionfilterTab").slideToggle();
	var fiql=searchDataByFIQLPermission(id);
	sendGETRequest(context+"/rest/Permissions/search"+fiql,"getFiqlPermissionData","","");
}	

/* Function is used to show permission in table */
function permissionViewTable()
{
	$('#permission_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="viewPermissionGrid"></table>' );
	$('#viewPermissionGrid thead tr').each( function () 
	{
		this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
	});
	$('#viewPermissionGrid tbody tr').each( function () 
	{
		this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
	});
	permissionTable=$('#viewPermissionGrid').dataTable(
	{	
		"bFilter":false,
		"bAutoWidth": false,
		"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
		"aaData": permissionTableRowData,
		"bLengthChange":false,
		"bPaginate":false,
		"sDom": 'Rlftrip',
		"bJQueryUI": true,	
		"bLengthChange":false,
		"aaSorting": [[1, 'asc']],
		"aoColumns": [
						{"sTitle":permissions_thead_permission,"mData":"permissionname","mRender":replaceUnderscore},
						{"sTitle":permissions_thead_description,"mData":"description"},
						{"sTitle":permissions_thead_action,"mData":"action", "sWidth":"20%", "sClass": "details_action headeralign","fnRender": function (oObj)
						 {
							 var action480='<div class="visible-phone hidden-desktop"><div class="inline position-relative"><button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown"><i class="icon-cog icon-only bigger-110"></i></button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close">';
							 action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="permissions_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
							 action480+='<li><div class="table_edit float_left" id="permission_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true" onclick="checkeditpermissioncall()"></div> </li>';
							 action480+="</ul></div></div>";
							 return '<div class="action_center_align hidden-phone  "><div class="pull-rightaction-buttons"><div class="table_view float_left" id="permissions_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></div><a href="javascript:void(0)"  onclick="checkeditpermissioncall()"  role="button" data-toggle="modal" class="table_edit  float_left" title="Update Permission"></a></div>'+action480;
						 }
					    }
					 ]
	});	
	$('#viewPermissionGrid tbody tr td #permissions_details_act').on( 'click' , function () {
		var row = $(this).closest('tr').get(0);
		var aPos = permissionTable.fnGetPosition( row );
		var aData = permissionTable.fnGetData( aPos );
		openDetailScreen('permission');
		$('#details_permission_div span').each(function() {
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
	 $('#viewPermissionGrid tbody tr td').live( 'hover' , function (e) {
		var isAction = $(this).hasClass('details_action');
		if(!isAction)
		{
				$('td').removeAttr( 'id',"tooltip");
				// this.setAttribute( 'id',"tooltip" );
				if($(this).text().length!=0)
				{
					$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
				}
		}
	 });
	 $("#viewPermissionGrid tbody").on( 'click', 'tr', function () {
		isPermissionSelected=true;
		$('tr').removeClass("active");
		$(this).addClass("active");
		permissionData = permissionTable.fnGetData( this );	
		js2form(document.getElementById('edit_permission_form'),permissionData,".","",true);	
	});
	RemoveUniqueLoading();
}
				
/* Function is used to create new permission */
function createNewPermission(id)
{   
	if(jQuery('#'+id).validationEngine('validate'))
	{
		if(countpermissionname==0)
		{
			var modjson=JSON.stringify(convertFormDataToJSON(id));
			sendPOSTRequest(context+"/rest/Permissions/create/",modjson,"createPermissionCallBack","");		
		}
		if(countpermissionname!=0)
		{
			$('#permission_info_user').show(); 
		}
	}
}
		
		
/*Call Back Function is used to create new permission*/		
function createPermissionCallBack(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(XMLHttpRequest.status == 200)
		{					 
			showCenteredLoading(permissions_success_createMsg);
			openListScreen('permission');
			$("#permission_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");
			sendGETRequest(context+"/rest/Permissions/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getPermissionData","");
		}
	}
}

/* Function is used to Update permission */
function updatePermission(formId)
{
	if(jQuery('#'+formId).validationEngine('validate'))
	{
		var editpermissionjson=convertFormDataToJSON(formId);
		sendPUTRequest(context+"/rest/Permissions/update/",JSON.stringify(editpermissionjson),"updatePermissionCallBack","");
	}
}

/*CallBack Function is used to Update permission */
function updatePermissionCallBack(XMLHttpRequest,data,rpcRequest)
{
	RemoveUniqueLoading();
	if(!checkException(XMLHttpRequest.responseText))
	{
		if(XMLHttpRequest.status == 200)
		{		
			showCenteredLoading(permissions_success_updateMsg);
			openListScreen('permission');
			$("#permission_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" to "+(DEFAULT_PAGE_UPPERLIMIT+1)+" enteries");		
			sendGETRequest(context+"/rest/Permissions/search?&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getPermissionData","");
		}
	}
}

/*Call Back Function is used to search permission data*/
function getPermissionSearchData(XMLHttpRequest, data, rpcRequest)
{ 
	if(XMLHttpRequest.status==200)
	{
		if(data.length == 1)
		{ 
			$('#permission_info_user').show();
			countpermissionname++; 	
		}
		else
		{
			$('#permission_info_user').hide(); 
		}
	}
}

/**************************************Permission Js Ends Here*********************************************/
