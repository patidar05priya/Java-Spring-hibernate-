var ordersTableRowData='';
var ordersTable;
var ordersresultid;
var ordersoldnTr=null;
var ordersoldimg=null;
var orders_inline_edit=false;
var orders_creator_inline="";
var ordersid;

function closeInlineOrdersGridRow(){
		if(hasValue(ordersoldnTr)){
				ordersTable.fnClose( ordersoldnTr );
		}
}
function addcommentFileCountorders(data, type, full) 
{				
	
	var commentCount;
	var fileCount;
	if(hasValue(full.commentCount)&& full.commentCount!=0){
			commentCount=full.commentCount;
		}
	else{
			commentCount="";
		}
	if(hasValue(full.fileAttacheCount)&& full.fileAttacheCount!=0){
			fileCount=full.fileAttacheCount;
		}
	else{
			fileCount="";
		}	
	
								var str="<div class='hidden-phone visible-desktop btn-group' >";
								var action480='<div class="visible-phone hidden-desktop"><div class="inline position-relative"><button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown"><i class="icon-cog icon-only bigger-110"></i></button><ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close">';
									
								if(read_Orders_permission)
									{
																					str += '<div class="table_view float_left" style="display:block; margin-left:45px;" id="orders_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div>' 
											action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="orders_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
																				
									}
									
									if(update_Orders_permission){
									str+=	'<div class="table_edit float_left" id="orders_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="orders_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Orders_permission){str+=	'<div class="table_close float_left"  id="orders_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="orders_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


		
																																		
						
												

							var customer_foriegn_orders;
																																															var creator_foriegn_orders;
												var lastModifier_foriegn_orders;
															
	
		
																
		
				var orders_no_address=0;





	function refreshAllFkOrdersList(){
	
																									sendGETRequest(context+"/rest/Customer/search?&orderBy=firstName&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orders_getFK_customer","");
																																																																																				sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orders_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orders_getFK_lastModifier","");
																																				
	}

function refreshAllOrdersList(){
	showRegularLoading();
var pagellimit=	$('#orders_pagination #orders_page_llimit').val();
var pageulimit=$('#orders_pagination #orders_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#orders_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#orders_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#orders_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('orders');
			ordersresultid=list_view_callId;
						sendGETRequest(context+"/rest/Orders/search?_s=orderNumber=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOrdersDatabyscreen","");
			
							
								sendGETRequest(context+"/rest/Orders/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_orders_history_data_callback","","");
						}
		else{
		openListScreen('orders');
		var orderbycall= $('#fiql_orders_form #sort_orders').val();
		var ordertypecall= $('#fiql_orders_form #sort_type_orders').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Orders/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getOrdersData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Orders/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOrdersData","");	
				}
		}	
		  
}

function getOrdersDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_orders_div span').each(function() {		
					var getId=$(this).attr("id");
					var getType=$(this).attr("type");
					try{					
					var value_Set = eval("data[0]."+getId) || "--";					
						
						if(getId=="enabled"){
							enableStatus=value_Set;					
						}
					if(getType=="date")
					{
					value_Set=localizeDateString(new Date(value_Set),dateFormat);	
						}	
						
					if(getId.toUpperCase()=="AMOUNT" || getId.toUpperCase()=="TOTAL")
					{
						value_Set=formatValueinKandM(value_Set);	
					}
						
						                          					$(this).html(value_Set);
					}catch(err){}			
				});
				$("#details_view_orders").html(data[0].orderStatus);
				},1200);
		RemoveUniqueLoading();
}
function refreshOrdersListFromPaginator(){
showRegularLoading();
	$('#orderspagenovalue').html(1); 
	$("#orders_pagination_next").css("display", "");
	$("#orders_pagination_pre").css("display", "");
	var uperLimit=eval($('#orders_pagination_value').val());
	$("#orders_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('orders');
		var orderbycall= $('#fiql_orders_form #sort_orders').val();
		var ordertypecall= $('#fiql_orders_form #sort_type_orders').val();
			sendGETRequest(context+"/rest/Orders/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getOrdersData","");
	
	
	window.setTimeout(function(){
			setSort('orders',$("#fiql_orders_form #sort_orders").val());},1000);	
		
}


									function orders_getFK_customer(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orders'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_orders_form #customer\\.firstName').empty();
		     $('#edit_orders_form #customer\\.firstName').empty();			
		     $('#fiql_orders_form #customer\\.firstName').empty();
		     $('#edit_orders_form_inline #customer\\.firstName').empty();
$('#orders_Quick_UL #customer_filter ul').empty();
			jQuery('#fiql_orders_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_orders_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orders_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orders_form_inline #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var orders_uniqueArr_customer=[];
			
				jQuery.each(data, function(i,key){  
				key.firstName=htmlDecode(key.firstName);
jQuery('#add_orders_form #customer').append(jQuery('<option>',{
					
						value:key.customerNumber,
			text:key.firstName
					}));
jQuery('#edit_orders_form #customer').append(jQuery('<option>',{
					
						value:key.customerNumber,
			text:key.firstName
					}));
					
				jQuery('#add_orders_form #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
				jQuery('#edit_orders_form #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
			jQuery('#fiql_orders_form #customer\\.firstName').append(jQuery('<option>',{
			value:key.customerNumber,
			text:key.firstName
			}));
			jQuery('#edit_orders_form_inline #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
			
if (orders_uniqueArr_customer.indexOf((key.firstName).trim()) === -1) {
                        orders_uniqueArr_customer.push((key.firstName).trim());
			$('#orders_Quick_UL #customer_filter ul').append('<li><a tabindex="-1" href="javascript:openOrdersTextSelectBox(\'customer\',\''+key.firstName+'\')">'+key.firstName+'</a></li>');
		}
});
							
		$("#fiql_orders_form  #customer\\.firstName").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									
									
									
									
									
									
									
						function orders_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'orders'))
					{		
	if(XMLHttpRequest.status==200)
			{
var orders_uniqueArr_creator = [];
$('#fiql_orders_form #creator.username').empty();
$('#fiql_orders_form #creator\\.username').empty();
$('#orders_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (orders_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        orders_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_orders_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_orders_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#orders_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openOrdersTextSelectBox(\''+Orders_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_orders_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function orders_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'orders'))
					{		
	if(XMLHttpRequest.status==200)
			{
var orders_uniqueArr_lastModifier = [];
$('#fiql_orders_form #lastModifier.username').empty();
$('#fiql_orders_form #lastModifier\\.username').empty();
$('#orders_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (orders_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        orders_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_orders_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_orders_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#orders_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openOrdersTextSelectBox(\''+Orders_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_orders_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getOrdersData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'orders'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#orders_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#orders_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				ordersTableRowData=data;
				Ordersflag=ordersTableRowData.length;	
       
				ordersViewTable();
				// $("#orders_pagination_totalRecord").text("Total Records : "+ordersTable.fnSettings().fnRecordsDisplay());
				$("#orders_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getOrdersDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'orders'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#orders_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#orders_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				ordersTableRowData=data;
				Ordersflag=ordersTableRowData.length;	
				ordersTable.fnClearTable();
				ordersViewTable();
                //ordersTable.fnAddData(data);		
				// $("#orders_pagination_totalRecord").text("Total Records : "+ordersTable.fnSettings().fnRecordsDisplay());
				$("#orders_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  ordersViewTable(){
	
		$('#orders_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="orders_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#orders_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#orders_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		ordersTable=jQuery('#orders_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": ordersTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			      		{"sTitle":Orders_thead_customer,"mData":"customer.firstName","contextid":"customer","mRender":ellipsis,"contextType":"customer.firstName"},
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			     											
										{"sTitle":Orders_thead_requiredDate,"mData":"requiredDate","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"requiredDate","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Orders_thead_orderStatus,"sClass":"hidden-480","mData":"orderStatus","bVisible":true,"contextid":"orderStatus","mRender":ellipsis,"contextType":"orderStatus"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
										{"sTitle":Orders_thead_orderDate,"sClass":"hidden-480","mData":"orderDate","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"orderDate","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
										{"sTitle":Orders_thead_shippedDate,"sClass":"hidden-480","mData":"shippedDate","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"shippedDate","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Orders_thead_totalCost,"sClass":"hidden-480","mData":"totalCost","bVisible":true,"contextid":"totalCost","mRender":ellipsis,"contextType":"totalCost"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     																						  {"sTitle":Orders_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     																  {"sTitle":Orders_thead_lastModifier,"sClass":"hidden-480","mData":"lastModifier.username","contextid":"lastModifier","contextType":"lastModifier.username"}, 																	
						
								
								    									
				                     				    				      			     			     
												  					{"sTitle":Orders_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"modifiedTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Orders_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountorders
							}
							
							
						]									

			} );	
			jQuery('#orders_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			ordersContextMenu();
			$('#orders_grid_view tbody tr td #orders_details_act').die();
				$('#orders_grid_view tbody tr td #orders_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = ordersTable.fnGetPosition( row );
			var aData = ordersTable.fnGetData( aPos );
			ordersresultid=aData.orderNumber;
										
								sendGETRequest(context+"/rest/Orders/auditSearch?id="+ordersresultid+"&date="+new Date(),"get_orders_history_data_callback","","");
							openDetailScreen('orders');
				$("#details_view_orders").html(ellipsis(aData.orderStatus));
					 window.setTimeout(function () {
				$('#details_orders_div span').each(function() {
					var getId=$(this).attr("id");
					var getType=$(this).attr("type");
				if(hasValue(eval("aData."+getId))){
					var value_Set = eval("aData."+getId) || "--";
							
																																		
						
																		if(getId=="enabled"){
							enableStatus=value_Set;
						}
						else if(getType=="date")
						{
						value_Set=localizeDateString(new Date(value_Set),dateFormat);	
					    }
					     else if(getType=="datetime")
						{
						value_Set=localizeDateTimeString(new Date(value_Set),dateFormat);	
					    }
						else if(getId.toUpperCase()=="AMOUNT" || getId.toUpperCase()=="TOTAL")
						{
							value_Set=formatValueinKandM(value_Set);	
						}
						else
						{
							value_Set=htmlDecode(value_Set);
						}
					}		
					                                              
					$(this).html(value_Set);
				
				});
				
			     },1000);
				
			
			
		});
		$('#orders_grid_view tbody tr td #orders_delete_act').die();
		$('#orders_grid_view tbody tr td #orders_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = ordersTable.fnGetPosition( row );
			var aData = ordersTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('orders');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteOrdersEntity()"); 	
			$('#orders_delete_dialog').modal('show');
			// $("#orders_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#orders_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#orders_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			ordersid=aData.orderNumber;
		});

				$('#orders_grid_view tbody tr td #orders_edit_act').die();
		$('#orders_grid_view tbody tr td #orders_edit_act').live('click', function (){ 
			
 		
																																		
						
															
																																																																																																																														var row = $(this).closest('tr').get(0);
			var aPos = ordersTable.fnGetPosition( row );
			var aData = ordersTable.fnGetData( aPos );
			
																																																																																																																										
				
				
																																											
								
																			
			
			js2form(document.getElementById('edit_orders_form'),aData,".","",true);
			
			
		ordersid=aData.orderNumber;				
		openEditScreen('orders');	
		
		
		window.setTimeout(function(){
		 																																									$("#edit_orders_div #comments").html(htmlDecode(aData.comments));
		    																								},500);	
		
			
								
					
			
		});
		$('#orders_grid_view tbody td').die();
			$('#orders_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Orders_permission){
	var array=new Array();
	var visibleLength=0;
		$('#orders_grid_view tbody tr').each(function() {
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}
	});
            if($(this).hasClass("details")){
				 $('tr').removeClass("active");
				 $(this).parents('tr').prev().addClass("active");
			}else{
				 $(this).parents('tr').addClass("active");
				}
         
	for(i=0;i<ordersTable.fnSettings().aoColumns.length;i++){
			if(ordersTable.fnSettings().aoColumns[i].bVisible){
				array.push(ordersTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=ordersTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(ordersoldnTr!=nTr && ordersoldnTr!=null)
		{orders_inline_edit=false;
			ordersTable.fnClose( ordersoldnTr );
		}
		if(ordersTable.fnIsOpen(nTr)){
				ordersTable.fnClose( ordersoldnTr );
			orders_inline_edit=false;						ordersTable.fnDraw();					
		}
		else{
			
			ordersoldnTr=nTr;
			ordersTable.fnOpen( nTr,inline_ordersTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkOrdersList();
			var aData = ordersTable.fnGetData( nTr );
			orders_inline_edit=true;	
			
					
																
		
							window.setTimeout(function(){
																																																																																																																						js2form(document.getElementById('edit_orders_form_inline'),aData,".","",true);
						},6000);
			ordersTable.fnDraw();					
			$('#edit_orders_form_inline').validationEngine();
			$('#edit_orders_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_orders_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_ordersTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_orders_form_inline" align="center"><input type="hidden" name="orderNumber" id="orderNumber"> <div class="span4">   <div class="control-group"> <label class="control-label" for="customerNumber"> '+ Orders_lable_customer+' </label> <div class="controls">  <select name="customer.customerNumber" id="customer.firstName" value="customer.customerNumber" class="validate[required]"></select> </div></div>     <div class="control-group"> <label class="control-label" for="requiredDate"> '+ Orders_lable_requiredDate+' </label> <div class="controls">  <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype validate[required] " size="16" type="text" id="requiredDate" value="" readonly/><span class="add-on" style="margin-left: 0px;"><i class="icon-th"></i></span></div>   </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="orderStatus"> '+ Orders_lable_orderStatus+' </label> <div class="controls">  <input type="text" name="orderStatus" id="orderStatus"  class="alphanumericallowspecial validate[required,maxSize[15] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="orderDate"> '+ Orders_lable_orderDate+' </label> <div class="controls">  <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype validate[required] " size="16" type="text" id="orderDate" value="" readonly/><span class="add-on" style="margin-left: 0px;"><i class="icon-th"></i></span></div>   </div></div>  </div>     <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="shippedDate" value="" readonly/></div>   <input type="hidden" class="hide" name="shippedDate" id="shippedDate"/>    <input type="hidden" class="hide" name="totalCost" id="totalCost"/>    <input type="hidden" class="hide" name="comments" id="comments"/>  <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_orders(\'edit_orders_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Orders_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineOrdersGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Orders_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#orders_grid_view tbody tr td').die();
$('#orders_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = ordersTable.fnGetPosition( row );
			var index=ordersTable.fnGetPosition(this);
			index=index[2];
			var aData = ordersTable.fnGetData( aPos );
			var jsonKey=ordersTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=ordersTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=ordersTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateString(new Date(tooltiptext),dateFormat);
			}
			
			if(jsonKey.toUpperCase()=="AMOUNT"||jsonKey.toUpperCase()=="TOTAL")
			{
				tooltiptext=formatValueinKandM(tooltiptext);
			}	
			$('td').removeAttr( 'id',"tooltip");
			// this.setAttribute( 'id',"tooltip" );
		
		
		if(hasValue($(this).text())){
			if($(this).text().length!=0){
				$("#tooltip").tooltipster(
				{
				'theme':'.tooltipster-punk',
				'fixedWidth':2,
				"content":tooltiptext
				});
			}
		}
		}
	}catch(e){}
});

						RemoveUniqueLoading();
		}
		function ordersContextMenu(){
		
		var oTable = $('#orders_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_orders';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_orders';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function orders_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#ordersquickFilterDiv').css('display','none');
				$('#ordersquickFilter').val('');
				var oTable = $('#orders_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_orders_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orders'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('orders');
					$('#MsgBoxBack').css("display","none");
					getordersTotalCount();
					refreshAllOrdersList();
					ordersTable.fnDraw();					
					showCenteredLoading(orders_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_orders(id){
	removeAllInstanceOfEditor();
				var customer=$('#'+id+' #customer\\.firstName').val();
								var requiredDate=formatAsJSONdateTimeFormat($('#'+id+' #requiredDate').val(),dateTimeFormat);
								var orderStatus=$('#'+id+' #orderStatus').val();
								var orderDate=formatAsJSONdateTimeFormat($('#'+id+' #orderDate').val(),dateTimeFormat);
										var shippedDate=formatAsJSONdateTimeFormat($('#'+id+' #shippedDate').val(),dateTimeFormat);
								var totalCost=$('#'+id+' #totalCost').val();
				var comments=$('#'+id+' #comments').html();
					var createOrdersJsonString = "{";
					if(hasValue(customer))
			createOrdersJsonString+="\"customer\":{\"customerNumber\":\""+customer+"\"},";
			  			if(hasValue(requiredDate))
			createOrdersJsonString += "\"requiredDate\":\""+requiredDate+"\",";
			 			if(hasValue(orderStatus))
			createOrdersJsonString += "\"orderStatus\":\""+orderStatus+"\",";
			 			if(hasValue(orderDate))
			createOrdersJsonString += "\"orderDate\":\""+orderDate+"\",";
			 			if(hasValue(shippedDate))
			createOrdersJsonString += "\"shippedDate\":\""+shippedDate+"\",";
			 			if(hasValue(totalCost))
			createOrdersJsonString += "\"totalCost\":\""+totalCost+"\",";
			 		if(hasValue(comments))
			createOrdersJsonString+="\"comments\":"+JSON.stringify(comments)+",";
			     		createOrdersJsonString=createOrdersJsonString.substring(0, (createOrdersJsonString.length-1));
		createOrdersJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createOrdersJsonString;
			
					
		
		var jsons="";
	if(!(orders_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((orders_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Orders/create/",formData,"create_orders_callback","");
	}
	}else
	{
				
																									
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Orders/create/",formData,"create_orders_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Orders/create/",formData,"create_orders_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_orders_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'orders'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('orders');
					getordersTotalCount();
					refreshAllFkOrdersList();
					refreshAllOrdersList();
					ordersTable.fnDraw();					
					showCenteredLoading(orders_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_orders(form){
	removeAllInstanceOfEditor();
	var orderNumber=$('#'+form+' #orderNumber').val();
		var customer=$('#'+form+' #customer\\.firstName').val();
  		var requiredDate=formatAsJSONdateTimeFormat($('#'+form+' #requiredDate').val(),dateTimeFormat);
		  		var orderStatus=$('#'+form+' #orderStatus').val();
  		var orderDate=formatAsJSONdateTimeFormat($('#'+form+' #orderDate').val(),dateTimeFormat);
		  		var shippedDate=formatAsJSONdateTimeFormat($('#'+form+' #shippedDate').val(),dateTimeFormat);
		  		var totalCost=$('#'+form+' #totalCost').val();
		var comments="";
		if(orders_inline_edit)
		{
		comments=$('#'+form+' #comments').val();
		}else{
		comments=$('#'+form+' #comments').html();
		}

		var editOrdersJsonString = "{";
		if(hasValue(orderNumber))
		editOrdersJsonString += "\"orderNumber\":\""+orderNumber+"\",";
		if(hasValue(customer))
		editOrdersJsonString+="\"customer\":{\"customerNumber\":\""+customer+"\"},";
		 		if(hasValue(orderNumber))
		editOrdersJsonString += "\"orderNumber\":\""+orderNumber+"\",";
 		if(hasValue(requiredDate))
		editOrdersJsonString += "\"requiredDate\":\""+requiredDate+"\",";
 		if(hasValue(orderStatus))
		editOrdersJsonString += "\"orderStatus\":\""+orderStatus+"\",";
 		if(hasValue(orderDate))
		editOrdersJsonString += "\"orderDate\":\""+orderDate+"\",";
 		if(hasValue(shippedDate))
		editOrdersJsonString += "\"shippedDate\":\""+shippedDate+"\",";
 		if(hasValue(totalCost))
		editOrdersJsonString += "\"totalCost\":\""+totalCost+"\",";
 		if(hasValue(comments))
			editOrdersJsonString+="\"comments\":"+JSON.stringify(comments)+",";
			     		
		editOrdersJsonString=editOrdersJsonString.substring(0, (editOrdersJsonString.length-1));
		editOrdersJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editOrdersJsonString;
					
			
		if(!(orders_no_address==0))
	{
		
		if(orders_inline_edit)
	{
	if(!( orders_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  orders_creator_inline);
	}				
																									
				
										sendPUTRequest(context+"/rest/Orders/update/",formData,"edit_orders_callback","");
		
		orders_inline_edit=false;
orders_creator_inline=="";
		
																									
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
				
																																																													
												
																										
		
			sendPUTRequest(context+"/rest/Orders/update/",formData,"edit_orders_callback","");
		
			
			}else{
				if(jsonsfieldname.length==orders_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Orders/update/",formData,"edit_orders_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
							
																																																													
												
																													sendPUTRequest(context+"/rest/Orders/update/",formData,"edit_orders_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
						
																																											
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( orders_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  orders_creator_inline);
	}	
		orders_inline_edit=false;
orders_creator_inline=="";

			sendPUTRequest(context+"/rest/Orders/update/",formData,"edit_orders_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_orders_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orders'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('orders');
					refreshAllOrdersList();
					ordersTable.fnDraw();					
					showCenteredLoading(orders_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchOrdersData(formId)
	{
	$('#orderspagenovalue').html(1); 
	uperLimit=eval($('#orders_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#orders_pagination #orders_page_llimit').val(pagellimit);
	$('#orders_pagination #orders_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				ordersSortByHighLightSelectedHeader('orders');
				var fiql=searchDataByFIQL(formId);
				
				fiqlOrdersParam=fiql;
				sendGETRequest(context+"/rest/Orders/search"+fiql+"&date="+new Date(),"getfiql_orders_data","","");
	window.setTimeout(function(){
			setSort('orders',$("#fiql_orders_form #sort_orders").val());
			setDefaultTypeSorting('orders',"sort_type_orders");
			},1000);	
   $("#fiql_orders_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_orders_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#ordersfilterTab").slideUp();
				ordersTableRowData=data;
				Ordersflag=ordersTableRowData.length;	
				var orders_pagination_value=$("#orders_pagination_value").val();
				$("#orders_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( orders_pagination_value) + " " + pagination_entries + " ");				
				ordersViewTable();
				ordersTable.fnDraw();	
				// $("#orders_pagination_totalRecord").text("Total Records : "+ordersTable.fnSettings().fnRecordsDisplay());
				$("#orders_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	


function ordersHistoryTable(data){
	
	$("#orders_history_tabdiv").empty();

	if(data.length>0)
	{
		for(i=0;i<data.length;i++)
		{
			var row = data[i];
     		var name = row.changed_by;
			//var time = localizeDateString(new Date(row.changed_on),dateFormat);
			//var time = row.creationtime;
			var time = row.changed_on;
			var time1=time.split(' ');
			if(time1.length>2)
				time=time1[2]+" "+time1[1]+" "+time1[5];
			
			var message = row.changes;
			
			/* Changes done for NEW UI table like view */
			if(message.indexOf('Created with') !== -1) {
				var createdItemArray = message.split("<br/>");
				var createdItemArrayLen = createdItemArray.length;
				var message = "<div style='margin-left: -5%;'>";

				message += '<span style="margin-left: 5%;">'+createdItemArray[0]+'</span>';

				for(var i=1; i<createdItemArrayLen; i++)
				{
					var elem = createdItemArray[i].split(":");
					message += '<div class="profile-info-row">';
					message += '<div class="profile-info-name">'+elem[0]+'</div>';
					message += '<div class="profile-info-value"><span>'+elem[1]+'</span></div>';
					message += '</div>';
				}
				message += '</div>';
			}
			else {
				message = '<span style="color: #6b6b6b;">'+message+'</span>';
			}

			$("#orders_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#orders_history_tabdiv").append("<ul id='orders_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_orders_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'orders')) {
			if(XMLHttpRequest.status == 200) {
				ordersTableRowData=data;
				ordersHistoryTable(data);				
			}
		}
	}	
}

		
																
		
				function orders_set_table_value_id(id)
{
table="orders";
hiddenid=id;
}
function deleteOrdersEntity(){
	if(hasValue(ordersid)){
				sendDELETERequest(context+"/rest/Orders/delete/"+ordersid,"","delete_orders_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForOrders()
	{
				}

function openOrdersListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('orders');
			var orderbycall= $('#fiql_orders_form #sort_orders').val();
			var ordertypecall= $('#fiql_orders_form #sort_type_orders').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Orders/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOrdersData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllOrdersList();
			}
			if(!$("#list_orders_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getOrdersDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewOrders(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewOrders(data){
 
 
 		
																																		
						
																																																																																																																																							
																																																																																																																										
				
				
																																											
								
																 	
				
		js2form(document.getElementById('edit_orders_form'),data[0],".","",true);
		
		// ordersid=aData.orderNumber;		
		openEditScreen('orders');
		
		window.setTimeout(function(){
		 																																									$("#edit_orders_div #comments").html(htmlDecode(data[0].comments));
		    																								},500);	
 
 }

function ViewEditorders() {
	ordersid = ordersresultid;	sendGETRequest(context+"/rest/Orders/search?_s=orderNumber=="+ordersresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOrdersDataEditCallBack","");
}

/*function to open quick filter for text field*/
var ordersSearchIndex="";
function openOrdersTextField(colName){
		ordersSearchIndex =  get_column_number_For_Quick_Filter(colName,'orders');
	showQuickFilterDiv(ordersSearchIndex,'orders',colName);
	$("#ordersquickFilterDiv").css("display","");
	$("#ordersquickFilter").focus();
	$("#ordersquickFilter").keyup( function () {
		
			   ordersTable.fnFilter( this.value,ordersSearchIndex );
			   // $("#orders_pagination_totalRecord").text("Total Records : "+ordersTable.fnSettings().fnRecordsDisplay());
			   $("#orders_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openOrdersTextSelectBox(colName,val){
	$("#ordersquickFilterDiv").css("display","none");
	ordersSearchIndex =  get_column_number_For_Quick_Filter(colName,'orders');
	
    ordersTable.fnFilter( val, ordersSearchIndex );
	// $("#orders_pagination_totalRecord").text("Total Records : "+ordersTable.fnSettings().fnRecordsDisplay());
	$("#orders_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Orders*/
function getordersTotalCount()
{
	sendGETRequest(context+"/rest/Orders/totalCount?date="+new Date(),"getordersTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Orders*/
function getordersTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#orders_totalCount').html(" / "+data);
				$('#orders_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


