var orderdetailTableRowData='';
var orderdetailTable;
var orderdetailresultid;
var orderdetailoldnTr=null;
var orderdetailoldimg=null;
var orderdetail_inline_edit=false;
var orderdetail_creator_inline="";
var orderdetailid;

function closeInlineOrderdetailGridRow(){
		if(hasValue(orderdetailoldnTr)){
				orderdetailTable.fnClose( orderdetailoldnTr );
		}
}
function addcommentFileCountorderdetail(data, type, full) 
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
									
								if(read_Orderdetail_permission)
									{
																					str += '<div class="table_view float_left" style="display:block; margin-left:45px;" id="orderdetail_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div>' 
											action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="orderdetail_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
																				
									}
									
									if(update_Orderdetail_permission){
									str+=	'<div class="table_edit float_left" id="orderdetail_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="orderdetail_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Orderdetail_permission){str+=	'<div class="table_close float_left"  id="orderdetail_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="orderdetail_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


														
						
										
						
												

																						var orders_foriegn_orderdetail;
												var product_foriegn_orderdetail;
																	var creator_foriegn_orderdetail;
												var lastModifier_foriegn_orderdetail;
															
	
								
		
				
		
				var orderdetail_no_address=0;





	function refreshAllFkOrderdetailList(){
	
																																								sendGETRequest(context+"/rest/Orders/search?&orderBy=orderNumber&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orderdetail_getFK_orders","");
																																																	sendGETRequest(context+"/rest/Product/search?&orderBy=productName&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orderdetail_getFK_product","");
																																																						sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orderdetail_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"orderdetail_getFK_lastModifier","");
																																				
	}

function refreshAllOrderdetailList(){
	showRegularLoading();
var pagellimit=	$('#orderdetail_pagination #orderdetail_page_llimit').val();
var pageulimit=$('#orderdetail_pagination #orderdetail_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#orderdetail_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#orderdetail_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#orderdetail_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('orderdetail');
			orderdetailresultid=list_view_callId;
						sendGETRequest(context+"/rest/Orderdetail/search?_s=id=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOrderdetailDatabyscreen","");
			
							
								sendGETRequest(context+"/rest/Orderdetail/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_orderdetail_history_data_callback","","");
						}
		else{
		openListScreen('orderdetail');
		var orderbycall= $('#fiql_orderdetail_form #sort_orderdetail').val();
		var ordertypecall= $('#fiql_orderdetail_form #sort_type_orderdetail').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Orderdetail/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getOrderdetailData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Orderdetail/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOrderdetailData","");	
				}
		}	
		  
}

function getOrderdetailDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_orderdetail_div span').each(function() {		
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
				$("#details_view_orderdetail").html(data[0].modifiedTime);
				},1200);
		RemoveUniqueLoading();
}
function refreshOrderdetailListFromPaginator(){
showRegularLoading();
	$('#orderdetailpagenovalue').html(1); 
	$("#orderdetail_pagination_next").css("display", "");
	$("#orderdetail_pagination_pre").css("display", "");
	var uperLimit=eval($('#orderdetail_pagination_value').val());
	$("#orderdetail_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('orderdetail');
		var orderbycall= $('#fiql_orderdetail_form #sort_orderdetail').val();
		var ordertypecall= $('#fiql_orderdetail_form #sort_type_orderdetail').val();
			sendGETRequest(context+"/rest/Orderdetail/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getOrderdetailData","");
	
	
	window.setTimeout(function(){
			setSort('orderdetail',$("#fiql_orderdetail_form #sort_orderdetail").val());},1000);	
		
}


									
									
									
									function orderdetail_getFK_orders(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_orderdetail_form #orders\\.orderNumber').empty();
		     $('#edit_orderdetail_form #orders\\.orderNumber').empty();			
		     $('#fiql_orderdetail_form #orders\\.orderNumber').empty();
		     $('#edit_orderdetail_form_inline #orders\\.orderNumber').empty();
$('#orderdetail_Quick_UL #orders_filter ul').empty();
			jQuery('#fiql_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orderdetail_form_inline #orders\\.orderNumber').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var orderdetail_uniqueArr_orders=[];
			
				jQuery.each(data, function(i,key){  
				key.orderNumber=htmlDecode(key.orderNumber);
jQuery('#add_orderdetail_form #orders').append(jQuery('<option>',{
					
						value:key.orderNumber,
			text:key.orderNumber
					}));
jQuery('#edit_orderdetail_form #orders').append(jQuery('<option>',{
					
						value:key.orderNumber,
			text:key.orderNumber
					}));
					
				jQuery('#add_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
			
			value:key.orderNumber,
			text:key.orderNumber
			}));
				jQuery('#edit_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
			
			value:key.orderNumber,
			text:key.orderNumber
			}));
			jQuery('#fiql_orderdetail_form #orders\\.orderNumber').append(jQuery('<option>',{
			value:key.orderNumber,
			text:key.orderNumber
			}));
			jQuery('#edit_orderdetail_form_inline #orders\\.orderNumber').append(jQuery('<option>',{
			
			value:key.orderNumber,
			text:key.orderNumber
			}));
			
if (orderdetail_uniqueArr_orders.indexOf((key.orderNumber).trim()) === -1) {
                        orderdetail_uniqueArr_orders.push((key.orderNumber).trim());
			$('#orderdetail_Quick_UL #orders_filter ul').append('<li><a tabindex="-1" href="javascript:openOrderdetailTextSelectBox(\'orders\',\''+key.orderNumber+'\')">'+key.orderNumber+'</a></li>');
		}
});
							
		$("#fiql_orderdetail_form  #orders\\.orderNumber").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									function orderdetail_getFK_product(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_orderdetail_form #product\\.productName').empty();
		     $('#edit_orderdetail_form #product\\.productName').empty();			
		     $('#fiql_orderdetail_form #product\\.productName').empty();
		     $('#edit_orderdetail_form_inline #product\\.productName').empty();
$('#orderdetail_Quick_UL #product_filter ul').empty();
			jQuery('#fiql_orderdetail_form #product\\.productName').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_orderdetail_form #product\\.productName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orderdetail_form #product\\.productName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_orderdetail_form_inline #product\\.productName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var orderdetail_uniqueArr_product=[];
			
				jQuery.each(data, function(i,key){  
				key.productName=htmlDecode(key.productName);
jQuery('#add_orderdetail_form #product').append(jQuery('<option>',{
					
						value:key.productCode,
			text:key.productName
					}));
jQuery('#edit_orderdetail_form #product').append(jQuery('<option>',{
					
						value:key.productCode,
			text:key.productName
					}));
					
				jQuery('#add_orderdetail_form #product\\.productName').append(jQuery('<option>',{
			
			value:key.productCode,
			text:key.productName
			}));
				jQuery('#edit_orderdetail_form #product\\.productName').append(jQuery('<option>',{
			
			value:key.productCode,
			text:key.productName
			}));
			jQuery('#fiql_orderdetail_form #product\\.productName').append(jQuery('<option>',{
			value:key.productCode,
			text:key.productName
			}));
			jQuery('#edit_orderdetail_form_inline #product\\.productName').append(jQuery('<option>',{
			
			value:key.productCode,
			text:key.productName
			}));
			
if (orderdetail_uniqueArr_product.indexOf((key.productName).trim()) === -1) {
                        orderdetail_uniqueArr_product.push((key.productName).trim());
			$('#orderdetail_Quick_UL #product_filter ul').append('<li><a tabindex="-1" href="javascript:openOrderdetailTextSelectBox(\'product\',\''+key.productName+'\')">'+key.productName+'</a></li>');
		}
});
							
		$("#fiql_orderdetail_form  #product\\.productName").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									
						function orderdetail_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{		
	if(XMLHttpRequest.status==200)
			{
var orderdetail_uniqueArr_creator = [];
$('#fiql_orderdetail_form #creator.username').empty();
$('#fiql_orderdetail_form #creator\\.username').empty();
$('#orderdetail_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (orderdetail_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        orderdetail_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_orderdetail_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_orderdetail_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#orderdetail_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openOrderdetailTextSelectBox(\''+Orderdetail_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_orderdetail_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function orderdetail_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{		
	if(XMLHttpRequest.status==200)
			{
var orderdetail_uniqueArr_lastModifier = [];
$('#fiql_orderdetail_form #lastModifier.username').empty();
$('#fiql_orderdetail_form #lastModifier\\.username').empty();
$('#orderdetail_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (orderdetail_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        orderdetail_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_orderdetail_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_orderdetail_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#orderdetail_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openOrderdetailTextSelectBox(\''+Orderdetail_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_orderdetail_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getOrderdetailData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#orderdetail_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#orderdetail_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				orderdetailTableRowData=data;
				Orderdetailflag=orderdetailTableRowData.length;	
       
				orderdetailViewTable();
				// $("#orderdetail_pagination_totalRecord").text("Total Records : "+orderdetailTable.fnSettings().fnRecordsDisplay());
				$("#orderdetail_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getOrderdetailDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#orderdetail_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#orderdetail_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				orderdetailTableRowData=data;
				Orderdetailflag=orderdetailTableRowData.length;	
				orderdetailTable.fnClearTable();
				orderdetailViewTable();
                //orderdetailTable.fnAddData(data);		
				// $("#orderdetail_pagination_totalRecord").text("Total Records : "+orderdetailTable.fnSettings().fnRecordsDisplay());
				$("#orderdetail_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  orderdetailViewTable(){
	
		$('#orderdetail_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="orderdetail_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#orderdetail_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#orderdetail_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		orderdetailTable=jQuery('#orderdetail_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": orderdetailTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
															{"sTitle":Orderdetail_thead_priceEach,"mData":"priceEach","bVisible":true,"contextid":"priceEach","mRender":ellipsis,"contextType":"priceEach"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Orderdetail_thead_orderLineNumber,"mData":"orderLineNumber","bVisible":true,"contextid":"orderLineNumber","mRender":ellipsis,"contextType":"orderLineNumber"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			      		{"sTitle":Orderdetail_thead_orders,"sClass":"hidden-480","mData":"orders.orderNumber","contextid":"orders","mRender":ellipsis,"contextType":"orders.orderNumber"},
			      			      			       					
						
								
								    									
				                     									    			      		{"sTitle":Orderdetail_thead_product,"sClass":"hidden-480","mData":"product.productName","contextid":"product","mRender":ellipsis,"contextType":"product.productName"},
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Orderdetail_thead_quantityOrdered,"sClass":"hidden-480","mData":"quantityOrdered","bVisible":true,"contextid":"quantityOrdered","mRender":ellipsis,"contextType":"quantityOrdered"},
																					
						
					
			      			      			       					
						
								
								    									
				                     																						  {"sTitle":Orderdetail_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     																  {"sTitle":Orderdetail_thead_lastModifier,"sClass":"hidden-480","mData":"lastModifier.username","contextid":"lastModifier","contextType":"lastModifier.username"}, 																	
						
								
								    									
				                     									    			     											
										{"sTitle":Orderdetail_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"modifiedTime","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     				    				      			     			     
												  					{"sTitle":Orderdetail_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountorderdetail
							}
							
							
						]									

			} );	
			jQuery('#orderdetail_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			orderdetailContextMenu();
			$('#orderdetail_grid_view tbody tr td #orderdetail_details_act').die();
				$('#orderdetail_grid_view tbody tr td #orderdetail_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = orderdetailTable.fnGetPosition( row );
			var aData = orderdetailTable.fnGetData( aPos );
			orderdetailresultid=aData.id;
										
								sendGETRequest(context+"/rest/Orderdetail/auditSearch?id="+orderdetailresultid+"&date="+new Date(),"get_orderdetail_history_data_callback","","");
							openDetailScreen('orderdetail');
				$("#details_view_orderdetail").html(ellipsis(aData.modifiedTime));
					 window.setTimeout(function () {
				$('#details_orderdetail_div span').each(function() {
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
		$('#orderdetail_grid_view tbody tr td #orderdetail_delete_act').die();
		$('#orderdetail_grid_view tbody tr td #orderdetail_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = orderdetailTable.fnGetPosition( row );
			var aData = orderdetailTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('orderdetail');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteOrderdetailEntity()"); 	
			$('#orderdetail_delete_dialog').modal('show');
			// $("#orderdetail_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#orderdetail_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#orderdetail_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			orderdetailid=aData.id;
		});

				$('#orderdetail_grid_view tbody tr td #orderdetail_edit_act').die();
		$('#orderdetail_grid_view tbody tr td #orderdetail_edit_act').live('click', function (){ 
			
 														
						
										
						
															
																																																																																																																									var row = $(this).closest('tr').get(0);
			var aPos = orderdetailTable.fnGetPosition( row );
			var aData = orderdetailTable.fnGetData( aPos );
			
																																																																																																																					
				
																			
								
													
								
																			
			
			js2form(document.getElementById('edit_orderdetail_form'),aData,".","",true);
			
			
		orderdetailid=aData.id;				
		openEditScreen('orderdetail');	
		
		
		window.setTimeout(function(){
		 																																																				},500);	
		
			
								
					
			
		});
		$('#orderdetail_grid_view tbody td').die();
			$('#orderdetail_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Orderdetail_permission){
	var array=new Array();
	var visibleLength=0;
		$('#orderdetail_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<orderdetailTable.fnSettings().aoColumns.length;i++){
			if(orderdetailTable.fnSettings().aoColumns[i].bVisible){
				array.push(orderdetailTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=orderdetailTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(orderdetailoldnTr!=nTr && orderdetailoldnTr!=null)
		{orderdetail_inline_edit=false;
			orderdetailTable.fnClose( orderdetailoldnTr );
		}
		if(orderdetailTable.fnIsOpen(nTr)){
				orderdetailTable.fnClose( orderdetailoldnTr );
			orderdetail_inline_edit=false;						orderdetailTable.fnDraw();					
		}
		else{
			
			orderdetailoldnTr=nTr;
			orderdetailTable.fnOpen( nTr,inline_orderdetailTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkOrderdetailList();
			var aData = orderdetailTable.fnGetData( nTr );
			orderdetail_inline_edit=true;	
			
											
		
				
		
							window.setTimeout(function(){
																																																																																																																	js2form(document.getElementById('edit_orderdetail_form_inline'),aData,".","",true);
						},6000);
			orderdetailTable.fnDraw();					
			$('#edit_orderdetail_form_inline').validationEngine();
			$('#edit_orderdetail_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_orderdetail_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_orderdetailTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_orderdetail_form_inline" align="center"><input type="hidden" name="id" id="id"> <div class="span4">   <div class="control-group"> <label class="control-label" for="priceEach"> '+ Orderdetail_lable_priceEach+' </label> <div class="controls"> <input type="text" name="priceEach" id="priceEach"   class="integersallow validate[required ,custom[number] ,maxSize[22] ]"  />  </div></div>    <div class="control-group"> <label class="control-label" for="orderLineNumber"> '+ Orderdetail_lable_orderLineNumber+' </label> <div class="controls"> <input type="text" name="orderLineNumber" id="orderLineNumber"  class="integers validate[required ,custom[integer] ,maxSize[5] ]"   />  </div></div>  </div>    <div class="span4">   <div class="control-group"> <label class="control-label" for="orderNumber"> '+ Orderdetail_lable_orders+' </label> <div class="controls">  <select name="orders.orderNumber" id="orders.orderNumber" value="orders.orderNumber" class="validate[required]"></select> </div></div>    <div class="control-group"> <label class="control-label" for="productCode"> '+ Orderdetail_lable_product+' </label> <div class="controls">  <select name="product.productCode" id="product.productName" value="product.productCode" class="validate[required]"></select> </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="quantityOrdered"> '+ Orderdetail_lable_quantityOrdered+' </label> <div class="controls"> <input type="text" name="quantityOrdered" id="quantityOrdered"  class="integers validate[required ,custom[integer] ,maxSize[10] ]"   />  </div></div>    <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/></div><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_orderdetail(\'edit_orderdetail_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Orderdetail_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineOrderdetailGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Orderdetail_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#orderdetail_grid_view tbody tr td').die();
$('#orderdetail_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = orderdetailTable.fnGetPosition( row );
			var index=orderdetailTable.fnGetPosition(this);
			index=index[2];
			var aData = orderdetailTable.fnGetData( aPos );
			var jsonKey=orderdetailTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=orderdetailTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=orderdetailTable.fnSettings().aoColumns[index].mData;
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
		function orderdetailContextMenu(){
		
		var oTable = $('#orderdetail_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_orderdetail';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_orderdetail';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function orderdetail_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#orderdetailquickFilterDiv').css('display','none');
				$('#orderdetailquickFilter').val('');
				var oTable = $('#orderdetail_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_orderdetail_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('orderdetail');
					$('#MsgBoxBack').css("display","none");
					getorderdetailTotalCount();
					refreshAllOrderdetailList();
					orderdetailTable.fnDraw();					
					showCenteredLoading(orderdetail_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_orderdetail(id){
	removeAllInstanceOfEditor();
						var priceEach=$('#'+id+' #priceEach').val();
						var orderLineNumber=$('#'+id+' #orderLineNumber').val();
				var orders=$('#'+id+' #orders\\.orderNumber').val();
				var product=$('#'+id+' #product\\.productName').val();
						var quantityOrdered=$('#'+id+' #quantityOrdered').val();
					var createOrderdetailJsonString = "{";
					if(hasValue(priceEach))
			createOrderdetailJsonString += "\"priceEach\":\""+priceEach+"\",";
			 			if(hasValue(orderLineNumber))
			createOrderdetailJsonString += "\"orderLineNumber\":\""+orderLineNumber+"\",";
			  			if(hasValue(orders))
			createOrderdetailJsonString+="\"orders\":{\"orderNumber\":\""+orders+"\"},";
			 			if(hasValue(product))
			createOrderdetailJsonString+="\"product\":{\"productCode\":\""+product+"\"},";
			 			if(hasValue(quantityOrdered))
			createOrderdetailJsonString += "\"quantityOrdered\":\""+quantityOrdered+"\",";
			     		createOrderdetailJsonString=createOrderdetailJsonString.substring(0, (createOrderdetailJsonString.length-1));
		createOrderdetailJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createOrderdetailJsonString;
			
					
		
		var jsons="";
	if(!(orderdetail_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((orderdetail_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Orderdetail/create/",formData,"create_orderdetail_callback","");
	}
	}else
	{
													
				
							
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Orderdetail/create/",formData,"create_orderdetail_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Orderdetail/create/",formData,"create_orderdetail_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_orderdetail_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('orderdetail');
					getorderdetailTotalCount();
					refreshAllFkOrderdetailList();
					refreshAllOrderdetailList();
					orderdetailTable.fnDraw();					
					showCenteredLoading(orderdetail_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_orderdetail(form){
	removeAllInstanceOfEditor();
	var id=$('#'+form+' #id').val();
  		var priceEach=$('#'+form+' #priceEach').val();
  		var orderLineNumber=$('#'+form+' #orderLineNumber').val();
		var orders=$('#'+form+' #orders\\.orderNumber').val();
		var product=$('#'+form+' #product\\.productName').val();
  		var quantityOrdered=$('#'+form+' #quantityOrdered').val();

		var editOrderdetailJsonString = "{";
		if(hasValue(id))
		editOrderdetailJsonString += "\"id\":\""+id+"\",";
		if(hasValue(priceEach))
		editOrderdetailJsonString += "\"priceEach\":\""+priceEach+"\",";
 		if(hasValue(orderLineNumber))
		editOrderdetailJsonString += "\"orderLineNumber\":\""+orderLineNumber+"\",";
 		if(hasValue(id))
		editOrderdetailJsonString += "\"id\":\""+id+"\",";
 		if(hasValue(orders))
		editOrderdetailJsonString+="\"orders\":{\"orderNumber\":\""+orders+"\"},";
		 		if(hasValue(product))
		editOrderdetailJsonString+="\"product\":{\"productCode\":\""+product+"\"},";
		 		if(hasValue(quantityOrdered))
		editOrderdetailJsonString += "\"quantityOrdered\":\""+quantityOrdered+"\",";
     		
		editOrderdetailJsonString=editOrderdetailJsonString.substring(0, (editOrderdetailJsonString.length-1));
		editOrderdetailJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editOrderdetailJsonString;
					
			
		if(!(orderdetail_no_address==0))
	{
		
		if(orderdetail_inline_edit)
	{
	if(!( orderdetail_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  orderdetail_creator_inline);
	}													
				
							
				
										sendPUTRequest(context+"/rest/Orderdetail/update/",formData,"edit_orderdetail_callback","");
		
		orderdetail_inline_edit=false;
orderdetail_creator_inline=="";
											
				
							
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
																									
												
																			
												
																										
		
			sendPUTRequest(context+"/rest/Orderdetail/update/",formData,"edit_orderdetail_callback","");
		
			
			}else{
				if(jsonsfieldname.length==orderdetail_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Orderdetail/update/",formData,"edit_orderdetail_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
																												
												
																			
												
																													sendPUTRequest(context+"/rest/Orderdetail/update/",formData,"edit_orderdetail_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
																					
								
													
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( orderdetail_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  orderdetail_creator_inline);
	}	
		orderdetail_inline_edit=false;
orderdetail_creator_inline=="";

			sendPUTRequest(context+"/rest/Orderdetail/update/",formData,"edit_orderdetail_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_orderdetail_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'orderdetail'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('orderdetail');
					refreshAllOrderdetailList();
					orderdetailTable.fnDraw();					
					showCenteredLoading(orderdetail_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchOrderdetailData(formId)
	{
	$('#orderdetailpagenovalue').html(1); 
	uperLimit=eval($('#orderdetail_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#orderdetail_pagination #orderdetail_page_llimit').val(pagellimit);
	$('#orderdetail_pagination #orderdetail_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				orderdetailSortByHighLightSelectedHeader('orderdetail');
				var fiql=searchDataByFIQL(formId);
				
				fiqlOrderdetailParam=fiql;
				sendGETRequest(context+"/rest/Orderdetail/search"+fiql+"&date="+new Date(),"getfiql_orderdetail_data","","");
	window.setTimeout(function(){
			setSort('orderdetail',$("#fiql_orderdetail_form #sort_orderdetail").val());
			setDefaultTypeSorting('orderdetail',"sort_type_orderdetail");
			},1000);	
   $("#fiql_orderdetail_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_orderdetail_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#orderdetailfilterTab").slideUp();
				orderdetailTableRowData=data;
				Orderdetailflag=orderdetailTableRowData.length;	
				var orderdetail_pagination_value=$("#orderdetail_pagination_value").val();
				$("#orderdetail_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( orderdetail_pagination_value) + " " + pagination_entries + " ");				
				orderdetailViewTable();
				orderdetailTable.fnDraw();	
				// $("#orderdetail_pagination_totalRecord").text("Total Records : "+orderdetailTable.fnSettings().fnRecordsDisplay());
				$("#orderdetail_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	


function orderdetailHistoryTable(data){
	
	$("#orderdetail_history_tabdiv").empty();

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

			$("#orderdetail_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#orderdetail_history_tabdiv").append("<ul id='orderdetail_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_orderdetail_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'orderdetail')) {
			if(XMLHttpRequest.status == 200) {
				orderdetailTableRowData=data;
				orderdetailHistoryTable(data);				
			}
		}
	}	
}

								
		
				
		
				function orderdetail_set_table_value_id(id)
{
table="orderdetail";
hiddenid=id;
}
function deleteOrderdetailEntity(){
	if(hasValue(orderdetailid)){
				sendDELETERequest(context+"/rest/Orderdetail/delete/"+orderdetailid,"","delete_orderdetail_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForOrderdetail()
	{
				}

function openOrderdetailListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('orderdetail');
			var orderbycall= $('#fiql_orderdetail_form #sort_orderdetail').val();
			var ordertypecall= $('#fiql_orderdetail_form #sort_type_orderdetail').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Orderdetail/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOrderdetailData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllOrderdetailList();
			}
			if(!$("#list_orderdetail_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getOrderdetailDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewOrderdetail(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewOrderdetail(data){
 
 
 														
						
										
						
																																																																																																																																		
																																																																																																																					
				
																			
								
													
								
																 	
				
		js2form(document.getElementById('edit_orderdetail_form'),data[0],".","",true);
		
		// orderdetailid=aData.id;		
		openEditScreen('orderdetail');
		
		window.setTimeout(function(){
		 																																																				},500);	
 
 }

function ViewEditorderdetail() {
	orderdetailid = orderdetailresultid;	sendGETRequest(context+"/rest/Orderdetail/search?_s=id=="+orderdetailresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOrderdetailDataEditCallBack","");
}

/*function to open quick filter for text field*/
var orderdetailSearchIndex="";
function openOrderdetailTextField(colName){
		orderdetailSearchIndex =  get_column_number_For_Quick_Filter(colName,'orderdetail');
	showQuickFilterDiv(orderdetailSearchIndex,'orderdetail',colName);
	$("#orderdetailquickFilterDiv").css("display","");
	$("#orderdetailquickFilter").focus();
	$("#orderdetailquickFilter").keyup( function () {
		
			   orderdetailTable.fnFilter( this.value,orderdetailSearchIndex );
			   // $("#orderdetail_pagination_totalRecord").text("Total Records : "+orderdetailTable.fnSettings().fnRecordsDisplay());
			   $("#orderdetail_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openOrderdetailTextSelectBox(colName,val){
	$("#orderdetailquickFilterDiv").css("display","none");
	orderdetailSearchIndex =  get_column_number_For_Quick_Filter(colName,'orderdetail');
	
    orderdetailTable.fnFilter( val, orderdetailSearchIndex );
	// $("#orderdetail_pagination_totalRecord").text("Total Records : "+orderdetailTable.fnSettings().fnRecordsDisplay());
	$("#orderdetail_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Orderdetail*/
function getorderdetailTotalCount()
{
	sendGETRequest(context+"/rest/Orderdetail/totalCount?date="+new Date(),"getorderdetailTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Orderdetail*/
function getorderdetailTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#orderdetail_totalCount').html(" / "+data);
				$('#orderdetail_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


