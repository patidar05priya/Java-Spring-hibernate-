/**************************************Audit Js Starts Here*********************************************/

var auditTableRowData='';

/*Function is used to get audit list*/
function refreshAuditList(){
	showRegularLoading();
	$("#audit_pagination_next").css("display", "");
	$("#audit_pagination_pre").css("display", "");
	var uperLimit=eval($('#audit_pagination_value').val())-1;
	$("#audit_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit+1)+" "+pagination_entries+" " );
	sendGETRequest(context+"/rest/Audit/search?_s=success==true&date="+new Date()+"&ulimit="+(uperLimit)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getAuditData","");
}			

/*Function is used to return string in PascalPattern */
function toPascalCase(str) 
{
    var arr = str.split(/\s|_/);
    for(var i=0,l=arr.length; i<l; i++) 
    {
       if(i==0)
       { 
		   arr[i] = arr[i].substr(0,1).toUpperCase() + (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : "");
       }
       else
       {
		 arr[i] = arr[i].substr(0,1).toLowerCase() + (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : "");
	   }
    }
    return arr.join(" ");
}


/*function  to get total count of entity audit*/
function getauditTotalCount()
{
		sendGETRequest(context+"/rest/Audit/totalCount?date="+new Date(),"getauditTotalCountCallBack","");
		
}
	
/*Call back  of get total count of entity audit*/
function getauditTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#audit_totalCount').html(" / "+data);
				$('#audit_totalCount').html(data);				
			}
			else
			{
				alert("error in data");
			}
		}		
	}
}


/*Call Back Function is used for audit list */
function getAuditData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		// $('#audit_pagination_totalRecord').text(pagination_totalRecords+data.length);
		getauditTotalCount();
		
		auditTableRowData=data;	
		Auditflag=auditTableRowData.length;
		auditViewTable();
		$("#audit_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	}	
}

/* Function is used to get data that is to be searched by user on audit */	
function searchAuditData(id)
{
	$("#auditfilterTab").slideToggle();
	var fiql=searchDataByFIQL(id);
	fiqlAuditParam=fiql;
	sendGETRequest(context+"/rest/Audit/search"+fiql+"&date="+new Date(),"searchAuditDataCallBack","");	
}
	
/*Call Back Function is used to get searched audit data*/	
function searchAuditDataCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{		
		// $('#audit_pagination_totalRecord').text(pagination_totalRecords+data.length);
		getauditTotalCount();
		
		auditTableRowData=data;	
		Auditflag=auditTableRowData.length;
		auditViewTable();
		$("#audit_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	}	
}

/*Function is used to show audit the data on the table */		
function auditViewTable()
{  
	var tableY=350;
	$('#auditViewGrid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="viewAuditGrid"></table>' );
	var auditTable=$('#viewAuditGrid').dataTable(
	{	 
			"bFilter":false,
			"bAutoWidth": false,
			"aoColumns": [{"sWidth":"100%"},{"sWidth":"10%"},{"sWidth":"10%"}],
			"aaData": auditTableRowData,
			"bScrollCollapse": true,
			"bPaginate":false,
			"bJQueryUI": true,	
			"sDom": 'Rlftrip',
			"aaSorting": [[1, 'asc']],
			"aoColumns": [
							{"sTitle":audit_thead_user,"sClass":"headerAlign","mData":"userFullName"},
							{"sTitle":audit_thead_action,"sClass":"headerAlign","mData":"auditActionName","mRender": function (data, type, full)
								{
									return toPascalCase(data);
								}
							},
							{"sTitle":audit_thead_parameter,"mData":"parameters","sClass":"headerAlign hidden-480", "sWidth":"40%","sClass": "paramWordWrap","mRender":htmlParametersInBootstrapTable},
							{"sTitle":audit_thead_date,"mData":"date","sWidth":"18%","sClass":"headerAlign","mRender": function (data, type, full)
								{
									return localizeDateTimeString(new Date(data),dateFormat);
								}
							},
							{"sTitle":audit_thead_result,"sClass":"headerAlign Action","mData":"success","mRender": function (data, type, full)
								{
									if ( data ==true ) 
									{
										// return '<span class="label label-success">Success</span>';
										return '<span class="green">Success</span>';
									}
									else 
									{
										// return '<span class="label label-danger">Failure</span>';
										return '<span class="red">Failure</span>';
									}
									return data;
								}
							},
						]				

			} );	
			if(BrowserDetect.browser == "Explorer" || BrowserDetect.browser == "Mozilla" /* For IE 11 */)
			{
				var ieversion=navigator.appVersion.split(';')[1];
				if(ieversion.indexOf("MSIE 8.0")>-1)
				{
					auditTable.fnSetColumnVis( 5, false );
					auditTable.fnDraw();
				}
			}
			$('#viewAuditGrid tbody tr td').live( 'hover' , function (e) {
				var isDetail = $(this).hasClass('Action');
				var isAction = $(this).hasClass('details');
				try
				{
					if(!isDetail || !isAction)
					{
						var row = $(this).closest('tr').get(0);
						var aPos = auditTable.fnGetPosition( row );
						var index=auditTable.fnGetPosition(this);
						index=index[2];
						var aData = auditTable.fnGetData( aPos );
						var jsonKey=auditTable.fnSettings().aoColumns[index].mData;
						var tooltiptext=eval("aData."+jsonKey);
						if(jsonKey.indexOf("auditActionName")>-1)
						{
							tooltiptext=toPascalCase(tooltiptext);
						}
						if(jsonKey.indexOf("Date")>-1 || jsonKey.indexOf("date")>-1 || jsonKey.indexOf("Time")>-1 || jsonKey.indexOf("time")>-1)
						{
							//tooltiptext=convertTimeStamp2DateTime(tooltiptext);
							tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
						}	
						$('td').removeAttr( 'id',"tooltip");
						// this.setAttribute( 'id',"tooltip" );
						tooltiptext=htmlDecode(tooltiptext);
						if(hasValue($(this).text()))
						{
							if($(this).text().length!=0)
							{
								$("#tooltip").tooltipster(
								{
								'theme':'.tooltipster-punk',
								'fixedWidth':2,
								"content":tooltiptext
								});
							 }
						}
					}
				}
				catch(e)
				{
				}
		    });	
			RemoveUniqueLoading();
}

/**************************************Audit Js End Here*********************************************/
