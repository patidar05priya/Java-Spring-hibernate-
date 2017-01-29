var paymentTableRowData='';
var paymentTable;
var paymentresultid;
var paymentoldnTr=null;
var paymentoldimg=null;
var payment_inline_edit=false;
var payment_creator_inline="";
var paymentid;

function closeInlinePaymentGridRow(){
		if(hasValue(paymentoldnTr)){
				paymentTable.fnClose( paymentoldnTr );
		}
}
function addcommentFileCountpayment(data, type, full) 
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
									
								if(read_Payment_permission)
									{
																					str += '<div class="table_view float_left" style="display:block; margin-left:45px;" id="payment_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div>' 
											action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="payment_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
																				
									}
									
									if(update_Payment_permission){
									str+=	'<div class="table_edit float_left" id="payment_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="payment_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Payment_permission){str+=	'<div class="table_close float_left"  id="payment_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="payment_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


						
																		
						
												

												var customer_foriegn_payment;
																											var creator_foriegn_payment;
												var lastModifier_foriegn_payment;
															
	
				
								
		
				var payment_no_address=0;





	function refreshAllFkPaymentList(){
	
																														sendGETRequest(context+"/rest/Customer/search?&orderBy=firstName&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"payment_getFK_customer","");
																																																																sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"payment_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"payment_getFK_lastModifier","");
																																				
	}

function refreshAllPaymentList(){
	showRegularLoading();
var pagellimit=	$('#payment_pagination #payment_page_llimit').val();
var pageulimit=$('#payment_pagination #payment_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#payment_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#payment_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#payment_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('payment');
			paymentresultid=list_view_callId;
						sendGETRequest(context+"/rest/Payment/search?_s=id=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getPaymentDatabyscreen","");
			
							
								sendGETRequest(context+"/rest/Payment/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_payment_history_data_callback","","");
						}
		else{
		openListScreen('payment');
		var orderbycall= $('#fiql_payment_form #sort_payment').val();
		var ordertypecall= $('#fiql_payment_form #sort_type_payment').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Payment/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getPaymentData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Payment/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getPaymentData","");	
				}
		}	
		  
}

function getPaymentDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_payment_div span').each(function() {		
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
				$("#details_view_payment").html(data[0].checkNumber);
				},1200);
		RemoveUniqueLoading();
}
function refreshPaymentListFromPaginator(){
showRegularLoading();
	$('#paymentpagenovalue').html(1); 
	$("#payment_pagination_next").css("display", "");
	$("#payment_pagination_pre").css("display", "");
	var uperLimit=eval($('#payment_pagination_value').val());
	$("#payment_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('payment');
		var orderbycall= $('#fiql_payment_form #sort_payment').val();
		var ordertypecall= $('#fiql_payment_form #sort_type_payment').val();
			sendGETRequest(context+"/rest/Payment/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getPaymentData","");
	
	
	window.setTimeout(function(){
			setSort('payment',$("#fiql_payment_form #sort_payment").val());},1000);	
		
}


									
									function payment_getFK_customer(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'payment'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_payment_form #customer\\.firstName').empty();
		     $('#edit_payment_form #customer\\.firstName').empty();			
		     $('#fiql_payment_form #customer\\.firstName').empty();
		     $('#edit_payment_form_inline #customer\\.firstName').empty();
$('#payment_Quick_UL #customer_filter ul').empty();
			jQuery('#fiql_payment_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_payment_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_payment_form #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_payment_form_inline #customer\\.firstName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var payment_uniqueArr_customer=[];
			
				jQuery.each(data, function(i,key){  
				key.firstName=htmlDecode(key.firstName);
jQuery('#add_payment_form #customer').append(jQuery('<option>',{
					
						value:key.customerNumber,
			text:key.firstName
					}));
jQuery('#edit_payment_form #customer').append(jQuery('<option>',{
					
						value:key.customerNumber,
			text:key.firstName
					}));
					
				jQuery('#add_payment_form #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
				jQuery('#edit_payment_form #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
			jQuery('#fiql_payment_form #customer\\.firstName').append(jQuery('<option>',{
			value:key.customerNumber,
			text:key.firstName
			}));
			jQuery('#edit_payment_form_inline #customer\\.firstName').append(jQuery('<option>',{
			
			value:key.customerNumber,
			text:key.firstName
			}));
			
if (payment_uniqueArr_customer.indexOf((key.firstName).trim()) === -1) {
                        payment_uniqueArr_customer.push((key.firstName).trim());
			$('#payment_Quick_UL #customer_filter ul').append('<li><a tabindex="-1" href="javascript:openPaymentTextSelectBox(\'customer\',\''+key.firstName+'\')">'+key.firstName+'</a></li>');
		}
});
							
		$("#fiql_payment_form  #customer\\.firstName").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									
									
									
						function payment_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'payment'))
					{		
	if(XMLHttpRequest.status==200)
			{
var payment_uniqueArr_creator = [];
$('#fiql_payment_form #creator.username').empty();
$('#fiql_payment_form #creator\\.username').empty();
$('#payment_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (payment_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        payment_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_payment_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_payment_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#payment_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openPaymentTextSelectBox(\''+Payment_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_payment_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function payment_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'payment'))
					{		
	if(XMLHttpRequest.status==200)
			{
var payment_uniqueArr_lastModifier = [];
$('#fiql_payment_form #lastModifier.username').empty();
$('#fiql_payment_form #lastModifier\\.username').empty();
$('#payment_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (payment_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        payment_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_payment_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_payment_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#payment_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openPaymentTextSelectBox(\''+Payment_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_payment_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getPaymentData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'payment'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#payment_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#payment_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				paymentTableRowData=data;
				Paymentflag=paymentTableRowData.length;	
       
				paymentViewTable();
				// $("#payment_pagination_totalRecord").text("Total Records : "+paymentTable.fnSettings().fnRecordsDisplay());
				$("#payment_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getPaymentDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'payment'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#payment_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#payment_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				paymentTableRowData=data;
				Paymentflag=paymentTableRowData.length;	
				paymentTable.fnClearTable();
				paymentViewTable();
                //paymentTable.fnAddData(data);		
				// $("#payment_pagination_totalRecord").text("Total Records : "+paymentTable.fnSettings().fnRecordsDisplay());
				$("#payment_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  paymentViewTable(){
	
		$('#payment_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="payment_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#payment_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#payment_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		paymentTable=jQuery('#payment_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": paymentTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
										{"sTitle":Payment_thead_paymentDate,"mData":"paymentDate","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"paymentDate","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			      		{"sTitle":Payment_thead_customer,"mData":"customer.firstName","contextid":"customer","mRender":ellipsis,"contextType":"customer.firstName"},
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			     											
										{"sTitle":Payment_thead_amount,"sClass":"hidden-480","mData":"amount","bVisible":true,"contextid":"amount","mRender":formatValueinKandM,"contextType":"amount"},
																
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Payment_thead_checkNumber,"sClass":"hidden-480","mData":"checkNumber","bVisible":true,"contextid":"checkNumber","mRender":ellipsis,"contextType":"checkNumber"},
																					
						
					
			      			      			       					
						
								
								    									
				                     																						  {"sTitle":Payment_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     																  {"sTitle":Payment_thead_lastModifier,"sClass":"hidden-480","mData":"lastModifier.username","contextid":"lastModifier","contextType":"lastModifier.username"}, 																	
						
								
								    									
				                     									    			     											
										{"sTitle":Payment_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"modifiedTime","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
										{"sTitle":Payment_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender":function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"contextid":"createdTime","contextType":"datetime"},
																					
						
					
			      			      			       					
						
								
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountpayment
							}
							
							
						]									

			} );	
			jQuery('#payment_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			paymentContextMenu();
			$('#payment_grid_view tbody tr td #payment_details_act').die();
				$('#payment_grid_view tbody tr td #payment_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = paymentTable.fnGetPosition( row );
			var aData = paymentTable.fnGetData( aPos );
			paymentresultid=aData.id;
										
								sendGETRequest(context+"/rest/Payment/auditSearch?id="+paymentresultid+"&date="+new Date(),"get_payment_history_data_callback","","");
							openDetailScreen('payment');
				$("#details_view_payment").html(ellipsis(aData.checkNumber));
					 window.setTimeout(function () {
				$('#details_payment_div span').each(function() {
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
		$('#payment_grid_view tbody tr td #payment_delete_act').die();
		$('#payment_grid_view tbody tr td #payment_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = paymentTable.fnGetPosition( row );
			var aData = paymentTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('payment');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deletePaymentEntity()"); 	
			$('#payment_delete_dialog').modal('show');
			// $("#payment_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#payment_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#payment_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			paymentid=aData.id;
		});

				$('#payment_grid_view tbody tr td #payment_edit_act').die();
		$('#payment_grid_view tbody tr td #payment_edit_act').live('click', function (){ 
			
 						
																		
						
															
																																																																																																									var row = $(this).closest('tr').get(0);
			var aPos = paymentTable.fnGetPosition( row );
			var aData = paymentTable.fnGetData( aPos );
			
																																																																																																					
				
									
																							
								
																			
			
			js2form(document.getElementById('edit_payment_form'),aData,".","",true);
			
			
		paymentid=aData.id;				
		openEditScreen('payment');	
		
		
		window.setTimeout(function(){
		 																																															},500);	
		
			
								
					
			
		});
		$('#payment_grid_view tbody td').die();
			$('#payment_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Payment_permission){
	var array=new Array();
	var visibleLength=0;
		$('#payment_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<paymentTable.fnSettings().aoColumns.length;i++){
			if(paymentTable.fnSettings().aoColumns[i].bVisible){
				array.push(paymentTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=paymentTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(paymentoldnTr!=nTr && paymentoldnTr!=null)
		{payment_inline_edit=false;
			paymentTable.fnClose( paymentoldnTr );
		}
		if(paymentTable.fnIsOpen(nTr)){
				paymentTable.fnClose( paymentoldnTr );
			payment_inline_edit=false;						paymentTable.fnDraw();					
		}
		else{
			
			paymentoldnTr=nTr;
			paymentTable.fnOpen( nTr,inline_paymentTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkPaymentList();
			var aData = paymentTable.fnGetData( nTr );
			payment_inline_edit=true;	
			
							
								
		
							window.setTimeout(function(){
																																																																																																	js2form(document.getElementById('edit_payment_form_inline'),aData,".","",true);
						},6000);
			paymentTable.fnDraw();					
			$('#edit_payment_form_inline').validationEngine();
			$('#edit_payment_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_payment_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_paymentTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_payment_form_inline" align="center"><input type="hidden" name="id" id="id"> <div class="span4">   <div class="control-group"> <label class="control-label" for="paymentDate"> '+ Payment_lable_paymentDate+' </label> <div class="controls">  <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype validate[required] " size="16" type="text" id="paymentDate" value="" readonly/><span class="add-on" style="margin-left: 0px;"><i class="icon-th"></i></span></div>   </div></div>    <div class="control-group"> <label class="control-label" for="customerNumber"> '+ Payment_lable_customer+' </label> <div class="controls">  <select name="customer.customerNumber" id="customer.firstName" value="customer.customerNumber" class="validate[required]"></select> </div></div>  </div>    <div class="span4">   <div class="control-group"> <label class="control-label" for="amount"> '+ Payment_lable_amount+' </label> <div class="controls"> <input type="text" name="amount" id="amount"   class="integersallow validate[required ,custom[number] ,maxSize[22] ]"  />  </div></div>    <div class="control-group"> <label class="control-label" for="checkNumber"> '+ Payment_lable_checkNumber+' </label> <div class="controls">  <input type="text" name="checkNumber" id="checkNumber"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>    <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_payment(\'edit_payment_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Payment_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlinePaymentGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Payment_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#payment_grid_view tbody tr td').die();
$('#payment_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = paymentTable.fnGetPosition( row );
			var index=paymentTable.fnGetPosition(this);
			index=index[2];
			var aData = paymentTable.fnGetData( aPos );
			var jsonKey=paymentTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=paymentTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=paymentTable.fnSettings().aoColumns[index].mData;
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
		function paymentContextMenu(){
		
		var oTable = $('#payment_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_payment';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_payment';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function payment_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#paymentquickFilterDiv').css('display','none');
				$('#paymentquickFilter').val('');
				var oTable = $('#payment_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_payment_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'payment'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('payment');
					$('#MsgBoxBack').css("display","none");
					getpaymentTotalCount();
					refreshAllPaymentList();
					paymentTable.fnDraw();					
					showCenteredLoading(payment_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_payment(id){
	removeAllInstanceOfEditor();
								var paymentDate=formatAsJSONdateTimeFormat($('#'+id+' #paymentDate').val(),dateTimeFormat);
						var customer=$('#'+id+' #customer\\.firstName').val();
						var amount=$('#'+id+' #amount').val();
						var checkNumber=$('#'+id+' #checkNumber').val();
					var createPaymentJsonString = "{";
					if(hasValue(paymentDate))
			createPaymentJsonString += "\"paymentDate\":\""+paymentDate+"\",";
			 			if(hasValue(customer))
			createPaymentJsonString+="\"customer\":{\"customerNumber\":\""+customer+"\"},";
			  			if(hasValue(amount))
			createPaymentJsonString += "\"amount\":\""+amount+"\",";
			 			if(hasValue(checkNumber))
			createPaymentJsonString += "\"checkNumber\":\""+checkNumber+"\",";
			     		createPaymentJsonString=createPaymentJsonString.substring(0, (createPaymentJsonString.length-1));
		createPaymentJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createPaymentJsonString;
			
					
		
		var jsons="";
	if(!(payment_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((payment_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Payment/create/",formData,"create_payment_callback","");
	}
	}else
	{
							
													
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Payment/create/",formData,"create_payment_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Payment/create/",formData,"create_payment_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_payment_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'payment'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('payment');
					getpaymentTotalCount();
					refreshAllFkPaymentList();
					refreshAllPaymentList();
					paymentTable.fnDraw();					
					showCenteredLoading(payment_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_payment(form){
	removeAllInstanceOfEditor();
	var id=$('#'+form+' #id').val();
  		var paymentDate=formatAsJSONdateTimeFormat($('#'+form+' #paymentDate').val(),dateTimeFormat);
				var customer=$('#'+form+' #customer\\.firstName').val();
  		var amount=$('#'+form+' #amount').val();
  		var checkNumber=$('#'+form+' #checkNumber').val();

		var editPaymentJsonString = "{";
		if(hasValue(id))
		editPaymentJsonString += "\"id\":\""+id+"\",";
		if(hasValue(paymentDate))
		editPaymentJsonString += "\"paymentDate\":\""+paymentDate+"\",";
 		if(hasValue(customer))
		editPaymentJsonString+="\"customer\":{\"customerNumber\":\""+customer+"\"},";
		 		if(hasValue(id))
		editPaymentJsonString += "\"id\":\""+id+"\",";
 		if(hasValue(amount))
		editPaymentJsonString += "\"amount\":\""+amount+"\",";
 		if(hasValue(checkNumber))
		editPaymentJsonString += "\"checkNumber\":\""+checkNumber+"\",";
     		
		editPaymentJsonString=editPaymentJsonString.substring(0, (editPaymentJsonString.length-1));
		editPaymentJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editPaymentJsonString;
					
			
		if(!(payment_no_address==0))
	{
		
		if(payment_inline_edit)
	{
	if(!( payment_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  payment_creator_inline);
	}							
													
				
										sendPUTRequest(context+"/rest/Payment/update/",formData,"edit_payment_callback","");
		
		payment_inline_edit=false;
payment_creator_inline=="";
					
													
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
											
																																	
												
																										
		
			sendPUTRequest(context+"/rest/Payment/update/",formData,"edit_payment_callback","");
		
			
			}else{
				if(jsonsfieldname.length==payment_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Payment/update/",formData,"edit_payment_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
														
																																	
												
																													sendPUTRequest(context+"/rest/Payment/update/",formData,"edit_payment_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
											
																							
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( payment_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  payment_creator_inline);
	}	
		payment_inline_edit=false;
payment_creator_inline=="";

			sendPUTRequest(context+"/rest/Payment/update/",formData,"edit_payment_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_payment_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'payment'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('payment');
					refreshAllPaymentList();
					paymentTable.fnDraw();					
					showCenteredLoading(payment_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchPaymentData(formId)
	{
	$('#paymentpagenovalue').html(1); 
	uperLimit=eval($('#payment_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#payment_pagination #payment_page_llimit').val(pagellimit);
	$('#payment_pagination #payment_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				paymentSortByHighLightSelectedHeader('payment');
				var fiql=searchDataByFIQL(formId);
				
				fiqlPaymentParam=fiql;
				sendGETRequest(context+"/rest/Payment/search"+fiql+"&date="+new Date(),"getfiql_payment_data","","");
	window.setTimeout(function(){
			setSort('payment',$("#fiql_payment_form #sort_payment").val());
			setDefaultTypeSorting('payment',"sort_type_payment");
			},1000);	
   $("#fiql_payment_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_payment_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#paymentfilterTab").slideUp();
				paymentTableRowData=data;
				Paymentflag=paymentTableRowData.length;	
				var payment_pagination_value=$("#payment_pagination_value").val();
				$("#payment_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( payment_pagination_value) + " " + pagination_entries + " ");				
				paymentViewTable();
				paymentTable.fnDraw();	
				// $("#payment_pagination_totalRecord").text("Total Records : "+paymentTable.fnSettings().fnRecordsDisplay());
				$("#payment_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	


function paymentHistoryTable(data){
	
	$("#payment_history_tabdiv").empty();

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

			$("#payment_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#payment_history_tabdiv").append("<ul id='payment_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_payment_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'payment')) {
			if(XMLHttpRequest.status == 200) {
				paymentTableRowData=data;
				paymentHistoryTable(data);				
			}
		}
	}	
}

				
								
		
				function payment_set_table_value_id(id)
{
table="payment";
hiddenid=id;
}
function deletePaymentEntity(){
	if(hasValue(paymentid)){
				sendDELETERequest(context+"/rest/Payment/delete/"+paymentid,"","delete_payment_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForPayment()
	{
				}

function openPaymentListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('payment');
			var orderbycall= $('#fiql_payment_form #sort_payment').val();
			var ordertypecall= $('#fiql_payment_form #sort_type_payment').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Payment/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getPaymentData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllPaymentList();
			}
			if(!$("#list_payment_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getPaymentDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewPayment(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewPayment(data){
 
 
 						
																		
						
																																																																																																																		
																																																																																																					
				
									
																							
								
																 	
				
		js2form(document.getElementById('edit_payment_form'),data[0],".","",true);
		
		// paymentid=aData.id;		
		openEditScreen('payment');
		
		window.setTimeout(function(){
		 																																															},500);	
 
 }

function ViewEditpayment() {
	paymentid = paymentresultid;	sendGETRequest(context+"/rest/Payment/search?_s=id=="+paymentresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getPaymentDataEditCallBack","");
}

/*function to open quick filter for text field*/
var paymentSearchIndex="";
function openPaymentTextField(colName){
		paymentSearchIndex =  get_column_number_For_Quick_Filter(colName,'payment');
	showQuickFilterDiv(paymentSearchIndex,'payment',colName);
	$("#paymentquickFilterDiv").css("display","");
	$("#paymentquickFilter").focus();
	$("#paymentquickFilter").keyup( function () {
		
			   paymentTable.fnFilter( this.value,paymentSearchIndex );
			   // $("#payment_pagination_totalRecord").text("Total Records : "+paymentTable.fnSettings().fnRecordsDisplay());
			   $("#payment_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openPaymentTextSelectBox(colName,val){
	$("#paymentquickFilterDiv").css("display","none");
	paymentSearchIndex =  get_column_number_For_Quick_Filter(colName,'payment');
	
    paymentTable.fnFilter( val, paymentSearchIndex );
	// $("#payment_pagination_totalRecord").text("Total Records : "+paymentTable.fnSettings().fnRecordsDisplay());
	$("#payment_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Payment*/
function getpaymentTotalCount()
{
	sendGETRequest(context+"/rest/Payment/totalCount?date="+new Date(),"getpaymentTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Payment*/
function getpaymentTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#payment_totalCount').html(" / "+data);
				$('#payment_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


