/**************************************Notification Js Starts Here*********************************************/

var notificationTableRowData='';
var notificationsTable;
var nEditing = null;
var nRow;
var primary;
var uperLimit=9;


/*Function is used to get all notification list*/
function refreshAllNotificationList()
{
	showRegularLoading();
	$("#notification_pagination_next").css("display", "");
	$("#notification_pagination_pre").css("display", "");
	uperLimit=eval($('#notification_pagination_value').val());
	$("#notification_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	if(hasValue(currentDomainId))
	{
		sendGETRequest(context+"/rest/ActivityStream/FIQLsearch?_s=domain.domainid="+currentDomainId+"&date="+new Date()+"&ulimit="+uperLimit+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=date&orderType=desc","getNotificationData","");
	}
	else
	{
		sendGETRequest(context+"/rest/ActivityStream/FIQLsearch?date="+new Date()+"&ulimit="+uperLimit+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=date&orderType=desc","getNotificationData","");
	}
}			
																																																
/*Call Back Function is used to get all notification list*/
function getNotificationData(XMLHttpRequest, data, rpcRequest)
{
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(XMLHttpRequest.status==200)
		{
			getNotificationTotalCount();
			notificationTableRowData=data;
			Notificationflag=notificationTableRowData.length;
			ActivityStreamflag=notificationTableRowData.length;
			notificationsViewTable();
		}
		else
		{
		alert("error in data");
		}		
	}
}


/*function  to get total count of entity notification*/
function getNotificationTotalCount()
{
		sendGETRequest(context+"/rest/ActivityStream/totalCount?date="+new Date(),"getnotificationTotalCountCallBack","");
		
}

/*Call back  of get total count of entity notification*/
function getnotificationTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#audit_totalCount').html(" / "+data);
				$('#notification_totalCount').html(data);	
				$("#notification_pagination_totalRecord").text("Total : ");
							
			}
			else
			{
				alert("error in data");
			}
		}		
	}
}





/*Function is used to show notification in table*/
function  notificationsViewTable()
{
	$('#notifications_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="notifications_grid_view"></table>' );
	var tableY=430;
	notificationsTable=jQuery('#notifications_grid_view').dataTable(
	{	
			
			"bFilter":false,
			"bAutoWidth": false,
			"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
			"aaData": notificationTableRowData,
			"bLengthChange":false,
			"bPaginate":false,
			"sScrollY": tableY,
			"bJQueryUI": true,	
			"sDom": 'Rlftrip',
			"bLengthChange":false,
			"aaSorting": [[1, 'asc']],
			"aoColumns": [
								{"sTitle":notifications_thead_message,"mData":"message"},	
								{"sTitle":notifications_thead_type,"mData":"type"},											
								{"sTitle":notifications_thead_username,"mData":"user.username"}						              
						 ]									

	});	
	$('#notifications_grid_view tbody tr td').live( 'hover' , function (e) {
			$('td').removeAttr( 'id',"tooltip");
			// this.setAttribute( 'id',"tooltip" );
			if($(this).text().length!=0)
			{
				$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
			}
	});	
	RemoveUniqueLoading();
}
	
	
/*Function is used to refresh notification for paginator*/
function refreshNotificationListFromPaginator()
{
	showRegularLoading();
	$('#notificationpagenovalue').html(1); 
	$("#notification_pagination_next").css("display", "");
	$("#notification_pagination_pre").css("display", "");
	var uperLimit=eval($('#notification_pagination_value').val());
	$("#notification_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	sendGETRequest(context+"/rest/ActivityStream/FIQLsearch?date="+new Date()+"&ulimit="+(uperLimit-1)+"&llimit=0&orderBy=date&orderType=desc","getNotificationData","");
}

/**************************************Notification Js Starts Here*********************************************/

