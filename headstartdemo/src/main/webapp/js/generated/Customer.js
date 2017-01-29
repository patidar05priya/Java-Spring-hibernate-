var customerTableRowData='';
var customerTable;
var customerresultid;
var customeroldnTr=null;
var customeroldimg=null;
var customer_inline_edit=false;
var customer_creator_inline="";
var customerid;

function closeInlineCustomerGridRow(){
		if(hasValue(customeroldnTr)){
				customerTable.fnClose( customeroldnTr );
		}
}
function addcommentFileCountcustomer(data, type, full) 
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
									
								if(read_Customer_permission)
									{
										
 										str += '<div class="table_view float_left" style="display:block; margin-left:  15px; ;" id="customer_details_act" data-toggle="tooltip" title="View"  data-animation="true"></div>' 
										action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="customer_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
										
																				
									}
									
									if(update_Customer_permission){
									str+=	'<div class="table_edit float_left" id="customer_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="customer_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Customer_permission){str+=	'<div class="table_close float_left"  id="customer_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="customer_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								      
										if(parseInt(fileCount)>0) {
											str+='<div class="float_left" style="display:block;" id="customer_file_act" data-toggle="tooltip" title="View"  data-animation="true">' 
	
											str+='<a href="#customer_file_upload_modal" style="display:block" title="Attachment" class="table_attach_num float_left" id="customer_file_upload_act"role="button"  data-toggle="modal"><span class="subNumberShowAttach">'+fileCount+'</span></a>'
											
											action480+='<li><div><a href="#customer_file_upload_modal" style="display:block" title="Attachment" class="table_attach_num float_left" id="customer_file_upload_act" role="button"  data-toggle="modal">'+fileCount+'</a></div></li>';
	
											str += "</div>";
										}
										else {
											str+='<div class="float_left" style="display:block;" id="customer_file_act" data-toggle="tooltip" title="View"  data-animation="true">' 
											
											str+='<a href="#customer_file_upload_modal" style="display:block" title="Attachment" class="table_attach_num float_left" id="customer_file_upload_act"role="button"  data-toggle="modal"></a>';
											
											str += "</div>";
											
											action480+='<li><div><a href="#customer_file_upload_modal" style="display:block" title="Attachment" class="table_attach_num float_left" id="customer_file_upload_act" role="button"  data-toggle="modal"></a></div></li>';
									   }
								    								    
								   								    
								    if(parseInt(commentCount)>0) {
										str+='<div class="float_left" style="display:block;" id="customer_comments_act" data-toggle="tooltip" title="View"  data-animation="true">'

										str+='<a href="#customer_comment_modal"style="display:block" class="float_left table_comment_num" id="customer_comment_act" role="button" title="Comment"  data-toggle="modal"><span class="subNumberShow">'+commentCount+'</span></a>';
										action480+='<li><div><a href="#customer_comment_modal"style="display:block" class="float_left table_comment_num" id="customer_comment_act" role="button" title="Comment"  data-toggle="modal">'+commentCount+'</a></div></li>';

										str += "</div>";
								    }
								    else {
										str+='<div class="float_left" style="display:block;" id="customer_comments_act" data-toggle="tooltip" title="View"  data-animation="true">'

										str+='<a href="#customer_comment_modal"style="display:block" class="float_left table_comment_num" id="customer_comment_act" role="button" title="Comment"  data-toggle="modal"></a>';

										str += "</div>";

										action480+='<li><div><a href="#customer_comment_modal"style="display:block" class="float_left table_comment_num" id="customer_comment_act" role="button" title="Comment"  data-toggle="modal"></a></div></li>';
								    }
								    									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


																														

var customer_address_inline="";
	var customer_addressobject="";
		    var customer_addressid="";
		    var customer_addressstring="";
		    	
								
						
						
												

																																										var address_foriegn_customer;
												var employee_foriegn_customer;
												var creator_foriegn_customer;
												var lastModifier_foriegn_customer;
															
	
																

		
		
		
				var customer_no_address=1;





	function refreshAllFkCustomerList(){
	
																																															sendGETRequest(context+"/rest/Address?&date="+new Date(),"customer_getFK_address","");
																																	sendGETRequest(context+"/rest/Employee/search?&orderBy=firstName&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"customer_getFK_employee","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"customer_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"customer_getFK_lastModifier","");
																																				
	}

function refreshAllCustomerList(){
	showRegularLoading();
var pagellimit=	$('#customer_pagination #customer_page_llimit').val();
var pageulimit=$('#customer_pagination #customer_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#customer_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#customer_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#customer_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('customer');
			customerresultid=list_view_callId;
						sendGETRequest(context+"/rest/Customer/search?_s=customerNumber=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getCustomerDatabyscreen","");
			
				sendGETRequest(context+"/rest/CustomerAttach/search?_s=customer.customerNumber=="+list_view_callId+"&date="+new Date()+"&ulimit=100&llimit=0","get_customer_file_Attach_data_callback","","");
							
				sendGETRequest(context+"/rest/Comment/search?_s=customer.customerNumber=="+list_view_callId+"&date="+new Date(),"get_customer_comment_data_callback","","");
								sendGETRequest(context+"/rest/Customer/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_customer_history_data_callback","","");
						}
		else{
		openListScreen('customer');
		var orderbycall= $('#fiql_customer_form #sort_customer').val();
		var ordertypecall= $('#fiql_customer_form #sort_type_customer').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Customer/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getCustomerData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Customer/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getCustomerData","");	
				}
		}	
		  
}

function getCustomerDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_customer_div span').each(function() {		
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
				$("#details_view_customer").html(data[0].name);
				},1200);
		RemoveUniqueLoading();
}
function refreshCustomerListFromPaginator(){
showRegularLoading();
	$('#customerpagenovalue').html(1); 
	$("#customer_pagination_next").css("display", "");
	$("#customer_pagination_pre").css("display", "");
	var uperLimit=eval($('#customer_pagination_value').val());
	$("#customer_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('customer');
		var orderbycall= $('#fiql_customer_form #sort_customer').val();
		var ordertypecall= $('#fiql_customer_form #sort_type_customer').val();
			sendGETRequest(context+"/rest/Customer/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getCustomerData","");
	
	
	window.setTimeout(function(){
			setSort('customer',$("#fiql_customer_form #sort_customer").val());},1000);	
		
}


									
									
									
									
									
									
									
									function customer_getFK_address(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_customer_form #address\\.address').empty();
		     $('#edit_customer_form #address\\.address').empty();			
		     $('#fiql_customer_form #address\\.address').empty();
		     $('#edit_customer_form_inline #address\\.address').empty();
$('#customer_Quick_UL #address_filter ul').empty();
			jQuery('#fiql_customer_form #address\\.address').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_customer_form #address\\.address').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_customer_form #address\\.address').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_customer_form_inline #address\\.address').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var customer_uniqueArr_address=[];
			
				jQuery.each(data, function(i,key){  
				key.address=htmlDecode(key.address);
jQuery('#add_customer_form #address').append(jQuery('<option>',{
					
						value:key.address,
			text:key.address
					}));
jQuery('#edit_customer_form #address').append(jQuery('<option>',{
					
						value:key.address,
			text:key.address
					}));
					
				jQuery('#add_customer_form #address\\.address').append(jQuery('<option>',{
			
			value:key.address,
			text:key.address
			}));
				jQuery('#edit_customer_form #address\\.address').append(jQuery('<option>',{
			
			value:key.address,
			text:key.address
			}));
			jQuery('#fiql_customer_form #address\\.address').append(jQuery('<option>',{
			value:key.address,
			text:key.address
			}));
			jQuery('#edit_customer_form_inline #address\\.address').append(jQuery('<option>',{
			
			value:key.address,
			text:key.address
			}));
			
if (customer_uniqueArr_address.indexOf((key.address).trim()) === -1) {
                        customer_uniqueArr_address.push((key.address).trim());
			$('#customer_Quick_UL #address_filter ul').append('<li><a tabindex="-1" href="javascript:openCustomerTextSelectBox(\'address\',\''+key.address+'\')">'+key.address+'</a></li>');
		}
});
							
		$("#fiql_customer_form  #address\\.address").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									function customer_getFK_employee(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_customer_form #employee\\.firstName').empty();
		     $('#edit_customer_form #employee\\.firstName').empty();			
		     $('#fiql_customer_form #employee\\.firstName').empty();
		     $('#edit_customer_form_inline #employee\\.firstName').empty();
$('#customer_Quick_UL #employee_filter ul').empty();
			jQuery('#fiql_customer_form #employee\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_customer_form #employee\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_customer_form #employee\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_customer_form_inline #employee\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var customer_uniqueArr_employee=[];
			
				jQuery.each(data, function(i,key){  
				key.firstName=htmlDecode(key.firstName);
jQuery('#add_customer_form #employee').append(jQuery('<option>',{
					
						value:key.employeeNumber,
			text:key.firstName
					}));
jQuery('#edit_customer_form #employee').append(jQuery('<option>',{
					
						value:key.employeeNumber,
			text:key.firstName
					}));
					
				jQuery('#add_customer_form #employee\\.firstName').append(jQuery('<option>',{
			
			value:key.employeeNumber,
			text:key.firstName
			}));
				jQuery('#edit_customer_form #employee\\.firstName').append(jQuery('<option>',{
			
			value:key.employeeNumber,
			text:key.firstName
			}));
			jQuery('#fiql_customer_form #employee\\.firstName').append(jQuery('<option>',{
			value:key.employeeNumber,
			text:key.firstName
			}));
			jQuery('#edit_customer_form_inline #employee\\.firstName').append(jQuery('<option>',{
			
			value:key.employeeNumber,
			text:key.firstName
			}));
			
if (customer_uniqueArr_employee.indexOf((key.firstName).trim()) === -1) {
                        customer_uniqueArr_employee.push((key.firstName).trim());
			$('#customer_Quick_UL #employee_filter ul').append('<li><a tabindex="-1" href="javascript:openCustomerTextSelectBox(\'employee\',\''+key.firstName+'\')">'+key.firstName+'</a></li>');
		}
});
							
		$("#fiql_customer_form  #employee\\.firstName").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
						function customer_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'customer'))
					{		
	if(XMLHttpRequest.status==200)
			{
var customer_uniqueArr_creator = [];
$('#fiql_customer_form #creator.username').empty();
$('#fiql_customer_form #creator\\.username').empty();
$('#customer_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (customer_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        customer_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_customer_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_customer_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#customer_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openCustomerTextSelectBox(\''+Customer_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_customer_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function customer_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'customer'))
					{		
	if(XMLHttpRequest.status==200)
			{
var customer_uniqueArr_lastModifier = [];
$('#fiql_customer_form #lastModifier.username').empty();
$('#fiql_customer_form #lastModifier\\.username').empty();
$('#customer_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (customer_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        customer_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_customer_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_customer_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#customer_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openCustomerTextSelectBox(\''+Customer_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_customer_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getCustomerData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'customer'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#customer_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#customer_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				customerTableRowData=data;
				Customerflag=customerTableRowData.length;	
       
				customerViewTable();
				// $("#customer_pagination_totalRecord").text("Total Records : "+customerTable.fnSettings().fnRecordsDisplay());
				$("#customer_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getCustomerDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'customer'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#customer_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#customer_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				customerTableRowData=data;
				Customerflag=customerTableRowData.length;	
				customerTable.fnClearTable();
				customerViewTable();
                //customerTable.fnAddData(data);		
				// $("#customer_pagination_totalRecord").text("Total Records : "+customerTable.fnSettings().fnRecordsDisplay());
				$("#customer_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  customerViewTable(){
	
		$('#customer_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="customer_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#customer_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#customer_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		customerTable=jQuery('#customer_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": customerTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
															{"sTitle":Customer_thead_prioritystatus,"mData":"prioritystatus","bVisible":true,"contextid":"prioritystatus","mRender":ellipsis,"contextType":"prioritystatus"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Customer_thead_lastName,"mData":"lastName","bVisible":true,"contextid":"lastName","mRender":ellipsis,"contextType":"lastName"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			     											
															{"sTitle":Customer_thead_firstName,"sClass":"hidden-480","mData":"firstName","bVisible":true,"contextid":"firstName","mRender":ellipsis,"contextType":"firstName"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Customer_thead_phone,"sClass":"hidden-480","mData":"phone","bVisible":true,"contextid":"phone","mRender":ellipsis,"contextType":"phone"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Customer_thead_name,"sClass":"hidden-480","mData":"name","bVisible":true,"contextid":"name","mRender":ellipsis,"contextType":"name"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Customer_thead_creditLimit,"sClass":"hidden-480","mData":"creditLimit","bVisible":true,"contextid":"creditLimit","mRender":ellipsis,"contextType":"creditLimit"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			      		{"sTitle":Customer_thead_employee,"sClass":"hidden-480","mData":"employee.firstName","contextid":"employee","mRender":ellipsis,"contextType":"employee.firstName"},
			      			      			       					
						
								
								    									
				                     																						  {"sTitle":Customer_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     				    											  {"sTitle":Customer_thead_lastModifier,"mData":"lastModifier.username","sClass":"hidden-480","bVisible":false,"contextid":"lastModifier","mRender":ellipsis,"contextType":"lastModifier.username"}, 																	
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Customer_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"modifiedTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Customer_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountcustomer
							}
							
							
						]									

			} );	
			jQuery('#customer_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			customerContextMenu();
			$('#customer_grid_view tbody tr td #customer_details_act').die();
				$('#customer_grid_view tbody tr td #customer_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var aData = customerTable.fnGetData( aPos );
			customerresultid=aData.customerNumber;
							sendGETRequest(context+"/rest/CustomerAttach/search?_s=customer.customerNumber=="+customerresultid+"&date="+new Date()+"&ulimit=100&llimit=0","get_customer_file_Attach_data_callback","","");
							
				sendGETRequest(context+"/rest/Comment/search?_s=customer.customerNumber=="+customerresultid+"&date="+new Date(),"get_customer_comment_data_callback","","");
								sendGETRequest(context+"/rest/Customer/auditSearch?id="+customerresultid+"&date="+new Date(),"get_customer_history_data_callback","","");
							openDetailScreen('customer');
				$("#details_view_customer").html(ellipsis(aData.name));
					 window.setTimeout(function () {
				$('#details_customer_div span').each(function() {
					var getId=$(this).attr("id");
					var getType=$(this).attr("type");
				if(hasValue(eval("aData."+getId))){
					var value_Set = eval("aData."+getId) || "--";
																																			

if(getId=="address")
					{
						// value_Set = value_Set.addressLine1 + "," + value_Set.addressLine2;
						var addr1 = value_Set.addressLine1;
						var addr2 = value_Set.addressLine2;
						value_Set = addr1;
						if(hasValue(addr2)) { value_Set += "," + addr2; }
					}
								
						
						
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
		$('#customer_grid_view tbody tr td #customer_delete_act').die();
		$('#customer_grid_view tbody tr td #customer_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var aData = customerTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('customer');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteCustomerEntity()"); 	
			$('#customer_delete_dialog').modal('show');
			// $("#customer_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#customer_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#customer_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			customerid=aData.customerNumber;
		});

				$('#customer_grid_view tbody tr td #customer_edit_act').die();
		$('#customer_grid_view tbody tr td #customer_edit_act').live('click', function (){ 
			
 																														

customer_address_inline="";
	customer_addressobject="";
		    customer_addressid="";
		    customer_addressstring="";
		    	
								
						
						
															
																																																																																																																																														var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var aData = customerTable.fnGetData( aPos );
			
																																																																																																																																										
				
																																							

		if(!(aData.address==null))
		{
		aData.address.addressLine1=htmlDecode(aData.address.addressLine1);
		$('#edit_address_customer_Address_act').text(aData.address.addressLine1);
		customer_addressid="";
			customer_addressid=aData.address.id;						
				
sendGETRequest(context+"/rest/Address/search?_s=id=="+customer_addressid+"&date="+new Date()+"&ulimit=1&llimit=0&orderBy=id&orderType=asc","customer_edit_address_callback","");
}else
{	$('#edit_address_customer_Address_act').text('Add Address');
	customer_addressstring="";
	customer_addressobject="";
}
											
								
								
																			
			
			js2form(document.getElementById('edit_customer_form'),aData,".","",true);
			
			
		customerid=aData.customerNumber;				
		openEditScreen('customer');	
		
		
		window.setTimeout(function(){
		 																																																																			},500);	
		
			
								
					
			
		});
		$('#customer_grid_view tbody td').die();
			$('#customer_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Customer_permission){
	var array=new Array();
	var visibleLength=0;
		$('#customer_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<customerTable.fnSettings().aoColumns.length;i++){
			if(customerTable.fnSettings().aoColumns[i].bVisible){
				array.push(customerTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=customerTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(customeroldnTr!=nTr && customeroldnTr!=null)
		{customer_inline_edit=false;
			customerTable.fnClose( customeroldnTr );
		}
		if(customerTable.fnIsOpen(nTr)){
				customerTable.fnClose( customeroldnTr );
			customer_inline_edit=false;						customerTable.fnDraw();					
		}
		else{
			
			customeroldnTr=nTr;
			customerTable.fnOpen( nTr,inline_customerTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkCustomerList();
			var aData = customerTable.fnGetData( nTr );
			customer_inline_edit=true;	
			
																			




	customer_address_inline='{"address":'+JSON.stringify(aData.address)+'}';
				
		
		
							window.setTimeout(function(){
																																																																																																																																						js2form(document.getElementById('edit_customer_form_inline'),aData,".","",true);
						},6000);
			customerTable.fnDraw();					
			$('#edit_customer_form_inline').validationEngine();
			$('#edit_customer_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_customer_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_customerTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_customer_form_inline" align="center"><input type="hidden" name="customerNumber" id="customerNumber"> <div class="span4">   <div class="control-group"> <label class="control-label" for="prioritystatus"> '+ Customer_lable_prioritystatus+' </label> <div class="controls">  <select name="prioritystatus" id="prioritystatus" value="prioritystatus.prioritystatus"class="validate[required]" > <option name="Basic" >Basic</option>  <option name="Gold" >Gold</option>  <option name="Silver" >Silver</option>  <option name="Diamond" >Diamond</option>  <option name="Platinum" >Platinum</option> </select> </div></div>    <div class="control-group"> <label class="control-label" for="lastName"> '+ Customer_lable_lastName+' </label> <div class="controls">  <input type="text" name="lastName" id="lastName"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>    <div class="span4">   <div class="control-group"> <label class="control-label" for="firstName"> '+ Customer_lable_firstName+' </label> <div class="controls">  <input type="text" name="firstName" id="firstName"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="phone"> '+ Customer_lable_phone+' </label> <div class="controls">  <input type="text" name="phone" id="phone"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="name"> '+ Customer_lable_name+' </label> <div class="controls">  <input type="text" name="name" id="name"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>      <input type="hidden" class="hide" name="creditLimit" id="creditLimit"/>  <input type="hidden" class="hide" name="employee.employeeNumber" id="employee.firstName" value=""/>   <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/></div><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_customer(\'edit_customer_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Customer_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineCustomerGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Customer_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#customer_grid_view tbody tr td').die();
$('#customer_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var index=customerTable.fnGetPosition(this);
			index=index[2];
			var aData = customerTable.fnGetData( aPos );
			var jsonKey=customerTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=customerTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=customerTable.fnSettings().aoColumns[index].mData;
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

				$('#customer_grid_view tbody tr td #customer_file_upload_act').die();
		$('#customer_grid_view tbody tr td #customer_file_upload_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var aData = customerTable.fnGetData( aPos );					
			// customer_show_modal_window(aData.customerNumber,"fileUpload.html",'customercontentmodel');
			showCustomerAddAttachModal(aData.customerNumber);
		});
						$('#customer_grid_view tbody tr td #customer_comment_act').die();
		$('#customer_grid_view tbody tr td #customer_comment_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = customerTable.fnGetPosition( row );
			var aData = customerTable.fnGetData( aPos );
			customerresultid=aData.customerNumber;	sendGETRequest(context+"/rest/Comment/search?_s=customer.customerNumber=="+aData.customerNumber+"&date="+new Date(),"get_customer_comment_data_callback","","");									
			// customer_show_modal_window(aData.customerNumber,"false",'customercommentmodel');
			showCustomerAddAndViewCommentModal(aData.customerNumber);
		});
				RemoveUniqueLoading();
		}
		function customerContextMenu(){
		
		var oTable = $('#customer_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_customer';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_customer';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function customer_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#customerquickFilterDiv').css('display','none');
				$('#customerquickFilter').val('');
				var oTable = $('#customer_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_customer_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('customer');
					$('#MsgBoxBack').css("display","none");
					getcustomerTotalCount();
					refreshAllCustomerList();
					customerTable.fnDraw();					
					showCenteredLoading(customer_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_customer(id){
	removeAllInstanceOfEditor();
						var prioritystatus=$('#'+id+' #prioritystatus').val();
						var lastName=$('#'+id+' #lastName').val();
						var firstName=$('#'+id+' #firstName').val();
						var phone=$('#'+id+' #phone').val();
						var name=$('#'+id+' #name').val();
						var creditLimit=$('#'+id+' #creditLimit').val();
				var employee=$('#'+id+' #employee\\.firstName').val();
					var createCustomerJsonString = "{";
					if(hasValue(prioritystatus))
			createCustomerJsonString += "\"prioritystatus\":\""+prioritystatus+"\",";
			 			if(hasValue(lastName))
			createCustomerJsonString += "\"lastName\":\""+lastName+"\",";
			  			if(hasValue(firstName))
			createCustomerJsonString += "\"firstName\":\""+firstName+"\",";
			 			if(hasValue(phone))
			createCustomerJsonString += "\"phone\":\""+phone+"\",";
			 			if(hasValue(name))
			createCustomerJsonString += "\"name\":\""+name+"\",";
			 			if(hasValue(creditLimit))
			createCustomerJsonString += "\"creditLimit\":\""+creditLimit+"\",";
			  			if(hasValue(employee))
			createCustomerJsonString+="\"employee\":{\"employeeNumber\":\""+employee+"\"},";
			     		createCustomerJsonString=createCustomerJsonString.substring(0, (createCustomerJsonString.length-1));
		createCustomerJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createCustomerJsonString;
			
					
		
		var jsons="";
	if(!(customer_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((customer_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Customer/create/",formData,"create_customer_callback","");
	}
	}else
	{
																									

						
				
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Customer/create/",formData,"create_customer_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Customer/create/",formData,"create_customer_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_customer_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('customer');
					getcustomerTotalCount();
					refreshAllFkCustomerList();
					refreshAllCustomerList();
					customerTable.fnDraw();					
					showCenteredLoading(customer_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_customer(form){
	removeAllInstanceOfEditor();
	var customerNumber=$('#'+form+' #customerNumber').val();
  		var prioritystatus=$('#'+form+' #prioritystatus').val();
  		var lastName=$('#'+form+' #lastName').val();
  		var firstName=$('#'+form+' #firstName').val();
  		var phone=$('#'+form+' #phone').val();
  		var name=$('#'+form+' #name').val();
  		var creditLimit=$('#'+form+' #creditLimit').val();
		var employee=$('#'+form+' #employee\\.firstName').val();

		var editCustomerJsonString = "{";
		if(hasValue(customerNumber))
		editCustomerJsonString += "\"customerNumber\":\""+customerNumber+"\",";
		if(hasValue(prioritystatus))
		editCustomerJsonString += "\"prioritystatus\":\""+prioritystatus+"\",";
 		if(hasValue(lastName))
		editCustomerJsonString += "\"lastName\":\""+lastName+"\",";
 		if(hasValue(customerNumber))
		editCustomerJsonString += "\"customerNumber\":\""+customerNumber+"\",";
 		if(hasValue(firstName))
		editCustomerJsonString += "\"firstName\":\""+firstName+"\",";
 		if(hasValue(phone))
		editCustomerJsonString += "\"phone\":\""+phone+"\",";
 		if(hasValue(name))
		editCustomerJsonString += "\"name\":\""+name+"\",";
 		if(hasValue(creditLimit))
		editCustomerJsonString += "\"creditLimit\":\""+creditLimit+"\",";
  		if(hasValue(employee))
		editCustomerJsonString+="\"employee\":{\"employeeNumber\":\""+employee+"\"},";
		     		
		editCustomerJsonString=editCustomerJsonString.substring(0, (editCustomerJsonString.length-1));
		editCustomerJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editCustomerJsonString;
					
			
		if(!(customer_no_address==0))
	{
		
		if(customer_inline_edit)
	{
	if(!( customer_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  customer_creator_inline);
	}																									
	
		formData =  mergeTwoJSON(formData, customer_address_inline);
					
				
				
										sendPUTRequest(context+"/rest/Customer/update/",formData,"edit_customer_callback","");
		
		customer_inline_edit=false;
customer_creator_inline=="";
																							
	
		 customer_address_inline="";
					
				
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
																																																					

					if(hasValue(customer_addressstring))
					{
						formData =  mergeTwoJSON(formData,'{"address":'+customer_addressstring+'}');
					
					}
																	
												
												
																										
		
			sendPUTRequest(context+"/rest/Customer/update/",formData,"edit_customer_callback","");
		
			
			}else{
				if(jsonsfieldname.length==customer_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Customer/update/",formData,"edit_customer_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
																																																								

					if(checkStringInArray(jsonsfieldname,'address'))
					{
						var j=getIndexStringInArray(jsonsfieldname,'address');
							formData =  mergeTwoJSON(formData, jsons[j]);
					}else
					{
						formData =  mergeTwoJSON(formData,'{"address":'+customer_addressstring+'}');
					
					}
																	
												
												
																													sendPUTRequest(context+"/rest/Customer/update/",formData,"edit_customer_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
																																									

				customer_addressstring="";
											
								
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( customer_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  customer_creator_inline);
	}	
		customer_inline_edit=false;
customer_creator_inline=="";

			sendPUTRequest(context+"/rest/Customer/update/",formData,"edit_customer_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_customer_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('customer');
					refreshAllCustomerList();
					customerTable.fnDraw();					
					showCenteredLoading(customer_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchCustomerData(formId)
	{
	$('#customerpagenovalue').html(1); 
	uperLimit=eval($('#customer_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#customer_pagination #customer_page_llimit').val(pagellimit);
	$('#customer_pagination #customer_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				customerSortByHighLightSelectedHeader('customer');
				var fiql=searchDataByFIQL(formId);
				
				fiqlCustomerParam=fiql;
				sendGETRequest(context+"/rest/Customer/search"+fiql+"&date="+new Date(),"getfiql_customer_data","","");
	window.setTimeout(function(){
			setSort('customer',$("#fiql_customer_form #sort_customer").val());
			setDefaultTypeSorting('customer',"sort_type_customer");
			},1000);	
   $("#fiql_customer_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_customer_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#customerfilterTab").slideUp();
				customerTableRowData=data;
				Customerflag=customerTableRowData.length;	
				var customer_pagination_value=$("#customer_pagination_value").val();
				$("#customer_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( customer_pagination_value) + " " + pagination_entries + " ");				
				customerViewTable();
				customerTable.fnDraw();	
				// $("#customer_pagination_totalRecord").text("Total Records : "+customerTable.fnSettings().fnRecordsDisplay());
				$("#customer_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
		function get_customer_file_Attach_data_callback(XMLHttpRequest, data, rpcRequest){
				if(!checkException(XMLHttpRequest.responseText))
				{	
					if(statuscheck(XMLHttpRequest.status,'customer'))
					{
					if(XMLHttpRequest.status==200)
					{
						 customerTableRowData=data;	
						var d = document.getElementById('customer_task_tab');
						var olddiv = document.getElementById('customer_tasks');
						if(olddiv!=null)
						{
							d.removeChild(olddiv);			
						}	
						 customerFileAttachList(data);
					}
					}
				}	
	}

function customerFileAttachList(data)
{
	$("#customerAttachmentViewCountBadge").html("").html("Attachments (" + parseInt(data.length) + ")");
	$("#customerAttachmentEditCountBadge").html("").html("Attachments (" + parseInt(data.length) + ")");

	$("#customer_task_tab").append("<ul id='customer_tasks' class='item-list ui-sortable'></ul>");
	for(i=0;i<data.length;i++)
	{
		$("#customer_tasks").append("<li>"+ data[i].filename + "<div class='pull-right action-buttons'>	<a href='javascript:void(0)' onclick='attachment_download("+data[i].id+",\""+data[i].filename+"\")' class='blue'><i class='icon-download bigger-130'></i></a><a href='javascript:void(0)' onclick='attachment_delete_customer("+data[i].id+")' class='red'><i class='icon-trash bigger-130'></i></a></div></li>") ;
	}
	if(i==0) {
	  $("#customer_tasks").append("<li>"+CustomerNoAttachmentstoshow+"</li>");
	}
}

function attachment_delete_customer(id)
{	
			customerAttachId=id;
			// commonDialogBox("Do you want to delete attachment ?","deleteCustomerAttach()");

			$('#customer_attach_delete_dialog').modal('show');
			$("#customer_attach_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#customer_attach_delete_dialog .modal-body span").html(DELETE_ATTACHMENT_CONFIRM_MSG_VAR);

	
}
function attachment_download(id,filename)
{	
showRegularLoading();
	var url =  context+"/attachment.jsp?attachment="+id+"&filename="+filename;
    window.open(url);	
    RemoveUniqueLoading();
}


function delete_customer_file_attach_callback(XMLHttpRequest, data, rpcRequest)
{
RemoveUniqueLoading();
	$('#customer_attach_delete_dialog').fadeOut();
	refreshAllCustomerList();
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'customer'))
					{	
		if(XMLHttpRequest.status==204)
			{		
				sendGETRequest(context+"/rest/CustomerAttach/search?_s=customer.customerNumber=="+customerresultid+"&ulimit=49&llimit=0","get_customer_file_Attach_data_callback","","");
									
					showCenteredLoading(fileattachment_delete_success_message);
				
			}
		else{
			alert("Error in deleting files");
			}	
			}	
		}
	
}


function customerCommentList(data)
{
	$("#customer_comment_tabdiv").empty();
	$("#customercommentmodeldata").empty();
	$("#customerCommentViewCountBadge").html("Comments (" + parseInt(data.length) + ")");
	$("#customerCommentEditCountBadge").html("Comments (" + parseInt(data.length) + ")");
	if(data.length>0)
	{
		for(i=0;i<data.length;i++)
		{
			var row = data[i];
     		var name = row.users.firstname
			var time = formatStreamDate(row.creationtime,true);
			//var time = row.creationtime;
			var message = row.comment;
			var userId = row.users.userid;
		
			$("#customer_comment_tabdiv").append("<div class='itemdiv commentdiv'><div class='user'><img alt='"+name+"&#39;s Avatar' onerror=\"this.src='../images/avatar2.png'\" src="+context+"/rest/Users/getUserImageById/"+userId+"></div><div class='body'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width: 72%;'>"+message+"</div></div>"+"<div class='tools'><a href='javascript:void(0);' onclick='customer_delete_comment("+data[i].id+")'class='btn btn-minier-prev btn-danger'><i class='icon-only icon-trash'></i></a></div>"+"</div>");

			$("#customercommentmodeldata").append("<div class='itemdiv commentdiv'><div class='user'><img alt='"+name+"&#39;s Avatar' onerror=\"this.src='../images/avatar2.png'\" src="+context+"/rest/Users/getUserImageById/"+userId+"></div><div class='body'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time'><i class='icon-time'></i><span class='red'> "+time+"</span></div><div class='text' style='word-wrap: break-word;max-width: 72%;'>"+message+"</div></div>"+"<div class='tools'><a href='javascript:void(0);' onclick='customer_delete_comment("+data[i].id+")'class='btn btn-minier-prev btn-danger'><i class='icon-only icon-trash'></i></a></div>"+"</div>");
			// <i style='color: #a7a7a7;' class='icon-quote-right'></i>
		}
	}
	else
	{
		 $("#customer_comment_tabdiv").append("<ul id='customer_comments' class='item-list ui-sortable'><li>"+CustomerNoCommentstoshow+"</li></ul>");
	}
 
}

function get_customer_comment_data_callback(XMLHttpRequest, data, rpcRequest){
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(statuscheck(XMLHttpRequest.status,'customer'))
		{
			if(XMLHttpRequest.status==200)
			{
				customerCommentList(data);
			}
		}
	}	
}


function customer_delete_comment(id)
{
	customerCommentId=id;
	// commonDialogBox("Do you want to delete comment ?","deleteCustomerComment()");
	$('#customer_comment_delete_dialog').modal('show');
	$("#customer_comment_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
	$("#customer_comment_delete_dialog .modal-body span").html(DELETE_COMMENT_CONFIRM_MSG_VAR);

	var d = document.getElementById('customer_comment_tabdiv');	
	var olddiv = document.getElementById('customer_comments');	
	// d.removeChild(olddiv);
}

function deletecustomerCommentCallback(XMLHttpRequest, data,rpcRequest)
{
	RemoveUniqueLoading();
	$('#customer_comment_delete_dialog').fadeOut();
	refreshAllCustomerList();
	if(statuscheck(XMLHttpRequest.status,'customer')) {
		if(XMLHttpRequest.status == 204) {		  sendGETRequest(context+"/rest/Comment/search?_s=customer.customerNumber=="+customerresultid,"get_customer_comment_data_callback","","");	 
			showCenteredLoading(comment_delete_success_message);
		}
		else{
		  if(hasValue(XMLHttpRequest.responseText))
			 {
				load_completer();
				showErrorLoading(getServerErrorMsg(XMLHttpRequest.responseText));						
			 }					
		}
	}	
}



var customerAttachId;
var customerCommentId;
function deleteCustomerComment(){
	if(hasValue(customerCommentId)){
		sendDELETERequest(context+"/rest/Comment/" + customerCommentId,"","deletecustomerCommentCallback","");	
	 
	}
}
var customerAttachId;	
function deleteCustomerAttach(){
	if(hasValue(customerAttachId)){
	sendDELETERequest(context+"/rest/CustomerAttach/"+customerAttachId,"","delete_customer_file_attach_callback","");
	 var d = document.getElementById('customer_task_tab');
			var olddiv = document.getElementById('customer_tasks');
			d.removeChild(olddiv);
	}
}	


function customer_show_modal_window(id,html_page,div_id)
{
hasSession();
uploadid=id;
uploadName="Customer";
primaryKey="customerNumber";
foreignKey="customer";
upload_div_id="customer_uploader_div";
upid="customer";
	if(html_page!="false"){
	var url=context+"/pages"+htmlFolder+"/"+html_page;
	jQuery.get(url,function(data){
		$('#'+div_id+'').html(data);
	
		});
		}
}

function customerHistoryTable(data){
	
	$("#customer_history_tabdiv").empty();

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

			$("#customer_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#customer_history_tabdiv").append("<ul id='customer_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_customer_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'customer')) {
			if(XMLHttpRequest.status == 200) {
				customerTableRowData=data;
				customerHistoryTable(data);				
			}
		}
	}	
}

																

	
	$('#add_address_customer_Address_act').click(function(){	
		var url=context+"/pages/addgeneratedAddressform.html";
	jQuery.get(url,function(data){
		$('#address_add_customer_Address_modal').html(data);
	
		});
		
	});

function customer_edit_address(id)
{
	table=customer;
	hiddenid=id;
	window.setTimeout( function(){},500 );

	var url=context+"/pages/editgeneratedAddressform.html";

	jQuery.get(url,function(data) {
		$('#address_customer_edit_Address_modal').html(data);
		if(hasValue(customer_addressid)) {
			$('#edit_user_generated_Address_form')[0].reset();
			js2form(document.getElementById('edit_user_generated_Address_form'),customer_addressobject,".","",true);
			window.setTimeout(function() {
				// to remove label show in input box where value is setted in html on blur function is called
				jQuery('.form-without-label input[type="text"]').blur();
			},200);
		}
	});
}

function customer_edit_address_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
	if(XMLHttpRequest.status==200) {
		customer_addressstring=JSON.stringify(data[0]);
		customer_addressobject=data[0];
	}
}

		
		
		
				function customer_set_table_value_id(id)
{
table="customer";
hiddenid=id;
}
function deleteCustomerEntity(){
	if(hasValue(customerid)){
				sendDELETERequest(context+"/rest/Customer/delete/"+customerid,"","delete_customer_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForCustomer()
	{
				}

function openCustomerListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('customer');
			var orderbycall= $('#fiql_customer_form #sort_customer').val();
			var ordertypecall= $('#fiql_customer_form #sort_type_customer').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Customer/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getCustomerData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllCustomerList();
			}
			if(!$("#list_customer_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getCustomerDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewCustomer(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewCustomer(data){
 
 
 																														

customer_address_inline="";
	customer_addressobject="";
		    customer_addressid="";
		    customer_addressstring="";
		    	
								
						
						
																																																																																																																																																							
																																																																																																																																										
				
																																							

		if(!(data[0].address==null))
		{
		$('#edit_address_customer_Address_act').text(data[0].address.addressLine1);
		customer_addressid="";
			customer_addressid=data[0].address.id;						
				
sendGETRequest(context+"/rest/Address/search?_s=id=="+customer_addressid+"&date="+new Date()+"&ulimit=1&llimit=0&orderBy=id&orderType=asc","customer_edit_address_callback","");
}
											
								
								
																 	
				
		js2form(document.getElementById('edit_customer_form'),data[0],".","",true);
		
		// customerid=aData.customerNumber;		
		openEditScreen('customer');
		
		window.setTimeout(function(){
		 																																																																			},500);	
 
 }

function ViewEditcustomer() {
	customerid = customerresultid;	sendGETRequest(context+"/rest/Customer/search?_s=customerNumber=="+customerresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getCustomerDataEditCallBack","");
}

/*function to open quick filter for text field*/
var customerSearchIndex="";
function openCustomerTextField(colName){
		customerSearchIndex =  get_column_number_For_Quick_Filter(colName,'customer');
	showQuickFilterDiv(customerSearchIndex,'customer',colName);
	$("#customerquickFilterDiv").css("display","");
	$("#customerquickFilter").focus();
	$("#customerquickFilter").keyup( function () {
		
			   customerTable.fnFilter( this.value,customerSearchIndex );
			   // $("#customer_pagination_totalRecord").text("Total Records : "+customerTable.fnSettings().fnRecordsDisplay());
			   $("#customer_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openCustomerTextSelectBox(colName,val){
	$("#customerquickFilterDiv").css("display","none");
	customerSearchIndex =  get_column_number_For_Quick_Filter(colName,'customer');
	
    customerTable.fnFilter( val, customerSearchIndex );
	// $("#customer_pagination_totalRecord").text("Total Records : "+customerTable.fnSettings().fnRecordsDisplay());
	$("#customer_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Customer*/
function getcustomerTotalCount()
{
	sendGETRequest(context+"/rest/Customer/totalCount?date="+new Date(),"getcustomerTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Customer*/
function getcustomerTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#customer_totalCount').html(" / "+data);
				$('#customer_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}

// to get Customer attachemnts
function getCustomerAttachments()
{
	sendGETRequest(context+"/rest/CustomerAttach/search?_s=customer.customerNumber=="+customerresultid+"&date="+new Date()+"&ulimit=100&llimit=0","get_customer_file_Attach_data_callback","","");
}

// to show add attachment in Customer modal window
function showCustomerAddAttachModal(customerId)
{
	if(!hasValue(customerId)) customerId = customerid;
	if(hasValue(customerId)) {
		customer_show_modal_window(customerId,"fileUpload.html",'customercontentmodel');
	}
}

// to get Customer comments
function getCustomerComments()
{
	sendGETRequest(context+"/rest/Comment/search?_s=customer.customerNumber=="+customerresultid+"&date="+new Date(),"get_customer_comment_data_callback","","");
}

// to show add and view comment in Customer modal window
function showCustomerAddAndViewCommentModal(customerId)
{
	if(!hasValue(customerId)) customerId = customerid;
	if(hasValue(customerId)) {
		customer_show_modal_window(customerId,"false",'customercommentmodel');
	}
}
