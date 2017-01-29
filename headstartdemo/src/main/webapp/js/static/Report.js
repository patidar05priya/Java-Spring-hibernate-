/**************************************Report Js Starts Here*********************************************/

var reportTitle;
var reportUrl;

/*Ready Function*/
$(document).ready(function() 
{
	var reportNewData = [];
	try
	{
		reportNewData = ReportMetaData;
	}
	catch(e)
	{
	}	
	rolesDataTable(reportNewData);
});

var reportNewData = [];
try
{
	reportNewData = ReportMetaData;
}
catch(e)
{
}	
	
/*Function is used to show report */  
function rolesDataTable(reportNewData)
{
	$('#AllReportsTable').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="Reportstable"></table>' );
	var reportTable1=$('#Reportstable').dataTable(
	{		
			"sScrollY": "200px",
			"bFilter":false,
			"bAutoWidth": false,
			"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
			"aaData": eval(reportNewData),
			"bLengthChange":false,
			"bPaginate":false,
			"sPaginationType":"full_numbers",
			"sDom":'',
			"aaSorting": [[1, 'desc']],
				"aoColumns": [
								{"sTitle":"REPORTS"	,"mData":"title"},
							 ]
	 } );	
	 if(BrowserDetect.browser == "Explorer" || BrowserDetect.browser == "Mozilla" /* For IE 11 */)
	 {
		var ieversion=navigator.appVersion.split(';')[1];
		if(ieversion.indexOf("MSIE 8.0")>-1)
		{
		  reportTable1.fnSetColumnVis( 1, false );
		  reportTable1.fnDraw();
		}
	 }
	 $('#Reportstable tbody tr:first-child').addClass('active');
	 $("#Reportstable tbody").on( 'click', 'tr', function () {
		$('#Reportstable tbody tr').removeClass('active');
		$(this).addClass('active');
		var rolesData = reportTable1.fnGetData( this );						
		$("#report_title").html(rolesData.title);
		reportTitle=rolesData.title;
		reportUrl=rolesData.url;
		sendPOSTRequest(rolesData.url+"&outputType=HTML", "", "viewReportCallback","")
	});
}		
		
		
/*Call Back Function is used to show report */  
function viewReportCallback(XMLHttpRequest, data, rpcRequest)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{
		var newTitle=reportTitle.replace(/ /g,"%20");
		$("#report_view").load(context+"/reports/"+newTitle.replace(/\//g,"")+".html");
	}
}

/*Function is used to download pdf or excel report*/
function downloadasPdfOrExcel(type)
{
	showRegularLoading();
	sendPOSTRequest(reportUrl+"&outputType="+type, "", "pdfexcelReportCallback",type)
}

/*Call Back Function is used to download pdf or excel report*/
function pdfexcelReportCallback(XMLHttpRequest, data, rpcRequest,type)
{
	RemoveUniqueLoading();
	if(XMLHttpRequest.status == 200)
	{					 
		var newTitle=reportTitle.split('/');
		var url="";
		if(type=="PDF")
			url=context+"/reports/"+newTitle[0]+newTitle[1]+".pdf";
		else if(type=="CSV")
			url=context+"/reports/"+newTitle[0]+newTitle[1]+".csv";			
		else
			url=context+"/reports/"+newTitle[0]+newTitle[1]+".xls";				
		window.open(url);
	}
}

/**************************************Report Js End Here*********************************************/
