/**************************************Analytics Js Starts Here*********************************************/

var chartTitle;
$(document).ready(function() 
{
	var chartNewData = [];
	try
	{
		chartNewData = chartMeta;
	}
	catch(e)
	{
	}	
	chartDataTable(chartNewData);
});
var chartNewData = [];
try
{
	chartNewData = chartMeta;
}
catch(e)
{
}	
	
/* Function is used to show chart */
function chartDataTable(chartNewData)
{
	$('#AllChartsTable').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="chartstable"></table>' );
	var chartTable1=$('#chartstable').dataTable(
	{		
			"sScrollY": "200px",
			"bFilter":false,
			"bAutoWidth": false,
			"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
			"aaData": eval(chartNewData),
			"bLengthChange":false,
			"bPaginate":false,
			"sPaginationType":"full_numbers",
			"sDom":'',
			"aaSorting": [[1, 'desc']],
			"aoColumns": [{"sTitle":audit_chart_label	,"mData":"title"},]
	});	
	if(BrowserDetect.browser == "Explorer" || BrowserDetect.browser == "Mozilla" /* For IE 11 */)
	{
		var ieversion=navigator.appVersion.split(';')[1];
		if(ieversion.indexOf("MSIE 8.0")>-1)
		{
			chartTable1.fnSetColumnVis( 1, false );
			chartTable1.fnDraw();
    	}
	}
    $('#chartstable tbody tr:first-child').addClass('active');
	$("#chartstable tbody").on( 'click', 'tr', function () {
		$('#chartstable tbody tr').removeClass('active');
		$(this).addClass('active');
		var rolesData = chartTable1.fnGetData( this );						
		// $("#chart_ViewH4").html(rolesData.title);
		chartTitle=rolesData.title;
		sendPOSTRequest(rolesData.url, "", "viewChartCallback",rolesData.url)
	});
}		

/*Call Back Function is used to view chart*/
function viewChartCallback(XMLHttpRequest, data, rpcRequest,text)
{
	if(XMLHttpRequest.status == 200)
	{					 
		sendGETRequest(text, "getChartDataCallback")
	}
}

/*Call Back Function is used to get chart data*/
function getChartDataCallback(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status == 200)
	{					 
		$("#chart_view").empty();
		$("#chart_view").append(data);
	}
}

/**************************************Analytics Js End Here*********************************************/
