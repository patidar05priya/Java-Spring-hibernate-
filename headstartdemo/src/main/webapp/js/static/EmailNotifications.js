/**************************************EmailNotification Js Starts Here*********************************************/

var emailNotificationTableRowData='';
var emailNotificationsTable;
var nEditing = null;
var nRow;
var primary;
var uperLimit=9;

/*Function is used to get all email list*/
function refreshAllEmailList()
{
	showRegularLoading();
	$("#email_pagination_next").css("display", "");
	$("#email_pagination_pre").css("display", "");
	uperLimit=eval($('#email_pagination_value').val());
	$("#email_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	if(hasValue(currentDomainId))
	{
		sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?_s=domain.domainid=="+currentDomainId+"&ulimit="+uperLimit+"&date="+new Date()+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=createdDate&orderType=desc","getEmailNotificationData","");
	}
	else
	{
		sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?&ulimit="+uperLimit+"&date="+new Date()+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=createdDate&orderType=desc","getEmailNotificationData","");
	}
}																


/*function  to get total count of entity EmailNotifications*/
function getEmailNotificationTotalCount()
{
		sendGETRequest(context+"/rest/EmailNotifications/totalCount?date="+new Date(),"getEmailNotificationsTotalCountCallBack","");
		
}


/*Call back  of get total count of entity EmailNotifications*/
function getEmailNotificationsTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#emailnotification_totalCount').html(" / "+data);				
				$('#emailnotification_totalCount').html(data);				
			}
			else
			{
			alert("error in data");
			}
		}		
	}
}

															
/*Call Back Function is used to get all email list*/
function getEmailNotificationData(XMLHttpRequest, data, rpcRequest)
{
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(XMLHttpRequest.status==200)
		{
			// $('#emailNotification_pagination_totalRecord').text(pagination_totalRecords+data.length);
			getEmailNotificationTotalCount();
		
			emailNotificationTableRowData=data;
			emailNotificationflag=emailNotificationTableRowData.length;	
			EmailNotificationsflag=emailNotificationflag;
			fiqlEmailNotificationsParam="FIQLsearch?_s=email=="+encodeURIComponent(email);
			emailNotificationsViewTable();
			$('#emailNotification_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
		}
		else
		{
			showCenteredLoading("error in data");
		}		
	}
}

/*Function is used to show email notification in table*/
function  emailNotificationsViewTable()
{
	$('#email_notifications_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="email_notifications_grid_view"></table>' );
	var tableY=430;
	emailNotificationsTable=jQuery('#email_notifications_grid_view').dataTable(
	{	
		"bFilter":false,
		"bAutoWidth": false,
		"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
		"aaData": emailNotificationTableRowData,
		"bLengthChange":false,
		"bPaginate":false,
		"sScrollY": tableY,
		"bJQueryUI": true,	
		"sDom": 'Rlftrip',
		"bLengthChange":false,
		"aaSorting": [[1, 'asc']],
		"aoColumns": [
						{"sTitle":emailnotifications_thead_subject,"mData":"subject"},	
						{"sTitle":emailnotifications_thead_sentby,"mData":"sentBy"},											
						{"sTitle":emailnotifications_thead_createdtime,"mData":"createdDate", "mRender":convertTimeStamp2Date}
					 ]									

	});	
	$('#email_notifications_grid_view tbody tr td').live( 'hover' , function (e) {
		$('td').removeAttr( 'id',"tooltip");
		// this.setAttribute( 'id',"tooltip" );
		if($(this).text().length!=0)
		{
			$("#tooltip").tooltipster({'theme':'.tooltipster-punk','fixedWidth':2});
		}

	});	
	RemoveUniqueLoading();
}

/*Function is used to refresh email list from paginator*/
function refreshEmailListFromPaginator()
{
	showRegularLoading();
	$('#emailpagenovalue').html(1); 
	$("#email_pagination_next").css("display", "");
	$("#email_pagination_pre").css("display", "");
	var uperLimit=eval($('#email_pagination_value').val());
	$("#email_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	if(hasValue(currentDomainId))
	{
		sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?_s=domain.domainid=="+currentDomainId+"&ulimit="+(uperLimit-1)+"&date="+new Date()+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=createdDate&orderType=desc","getEmailNotificationData","");
	}
	else
	{
		sendGETRequest(context+"/rest/EmailNotifications/FIQLsearch?&ulimit="+(uperLimit-1)+"&date="+new Date()+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&orderBy=createdDate&orderType=desc","getEmailNotificationData","");
	}
}

/**************************************EmailNotification Js End Here*********************************************/
