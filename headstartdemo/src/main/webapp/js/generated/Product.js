var productTableRowData='';
var productTable;
var productresultid;
var productoldnTr=null;
var productoldimg=null;
var product_inline_edit=false;
var product_creator_inline="";
var productid;

function closeInlineProductGridRow(){
		if(hasValue(productoldnTr)){
				productTable.fnClose( productoldnTr );
		}
}
function addcommentFileCountproduct(data, type, full) 
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
									
								if(read_Product_permission)
									{
																					str += '<div class="table_view float_left" style="display:block; margin-left:45px;" id="product_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div>' 
											action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="product_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
																				
									}
									
									if(update_Product_permission){
									str+=	'<div class="table_edit float_left" id="product_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="product_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Product_permission){str+=	'<div class="table_close float_left"  id="product_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="product_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


																																		
						
												

																																															var creator_foriegn_product;
												var lastModifier_foriegn_product;
															
	
																		
		
				var product_no_address=0;





	function refreshAllFkProductList(){
	
																																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"product_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"product_getFK_lastModifier","");
																																				
	}

function refreshAllProductList(){
	showRegularLoading();
var pagellimit=	$('#product_pagination #product_page_llimit').val();
var pageulimit=$('#product_pagination #product_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#product_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#product_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#product_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('product');
			productresultid=list_view_callId;
						sendGETRequest(context+"/rest/Product/search?_s=productCode=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getProductDatabyscreen","");
			
							
								sendGETRequest(context+"/rest/Product/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_product_history_data_callback","","");
						}
		else{
		openListScreen('product');
		var orderbycall= $('#fiql_product_form #sort_product').val();
		var ordertypecall= $('#fiql_product_form #sort_type_product').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Product/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getProductData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Product/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getProductData","");	
				}
		}	
		  
}

function getProductDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_product_div span').each(function() {		
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
				$("#details_view_product").html(data[0].productName);
				},1200);
		RemoveUniqueLoading();
}
function refreshProductListFromPaginator(){
showRegularLoading();
	$('#productpagenovalue').html(1); 
	$("#product_pagination_next").css("display", "");
	$("#product_pagination_pre").css("display", "");
	var uperLimit=eval($('#product_pagination_value').val());
	$("#product_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('product');
		var orderbycall= $('#fiql_product_form #sort_product').val();
		var ordertypecall= $('#fiql_product_form #sort_type_product').val();
			sendGETRequest(context+"/rest/Product/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getProductData","");
	
	
	window.setTimeout(function(){
			setSort('product',$("#fiql_product_form #sort_product").val());},1000);	
		
}


									
									
									
									
									
									
									
									
						function product_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'product'))
					{		
	if(XMLHttpRequest.status==200)
			{
var product_uniqueArr_creator = [];
$('#fiql_product_form #creator.username').empty();
$('#fiql_product_form #creator\\.username').empty();
$('#product_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (product_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        product_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_product_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_product_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#product_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openProductTextSelectBox(\''+Product_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_product_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function product_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'product'))
					{		
	if(XMLHttpRequest.status==200)
			{
var product_uniqueArr_lastModifier = [];
$('#fiql_product_form #lastModifier.username').empty();
$('#fiql_product_form #lastModifier\\.username').empty();
$('#product_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (product_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        product_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_product_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_product_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#product_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openProductTextSelectBox(\''+Product_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_product_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getProductData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'product'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#product_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#product_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				productTableRowData=data;
				Productflag=productTableRowData.length;	
       
				productViewTable();
				// $("#product_pagination_totalRecord").text("Total Records : "+productTable.fnSettings().fnRecordsDisplay());
				$("#product_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getProductDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'product'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#product_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#product_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				productTableRowData=data;
				Productflag=productTableRowData.length;	
				productTable.fnClearTable();
				productViewTable();
                //productTable.fnAddData(data);		
				// $("#product_pagination_totalRecord").text("Total Records : "+productTable.fnSettings().fnRecordsDisplay());
				$("#product_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  productViewTable(){
	
		$('#product_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="product_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#product_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#product_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		productTable=jQuery('#product_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": productTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
															{"sTitle":Product_thead_buyPrice,"mData":"buyPrice","bVisible":true,"contextid":"buyPrice","mRender":ellipsis,"contextType":"buyPrice"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Product_thead_sellPrice,"mData":"sellPrice","bVisible":true,"contextid":"sellPrice","mRender":ellipsis,"contextType":"sellPrice"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Product_thead_productVendor,"sClass":"hidden-480","mData":"productVendor","bVisible":true,"contextid":"productVendor","mRender":ellipsis,"contextType":"productVendor"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Product_thead_quantityInStock,"sClass":"hidden-480","mData":"quantityInStock","bVisible":true,"contextid":"quantityInStock","mRender":ellipsis,"contextType":"quantityInStock"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Product_thead_productName,"sClass":"hidden-480","mData":"productName","bVisible":true,"contextid":"productName","mRender":ellipsis,"contextType":"productName"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				  				
                   									
				                     									    			     											
															{"sTitle":Product_thead_productline,"sClass":"hidden-480","mData":"productline","bVisible":true,"contextid":"productline","mRender":ellipsis,"contextType":"productline"},
																					
						
					
			      			      			       					
						
								
								    									
				                     																						  {"sTitle":Product_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     																  {"sTitle":Product_thead_lastModifier,"sClass":"hidden-480","mData":"lastModifier.username","contextid":"lastModifier","contextType":"lastModifier.username"}, 																	
						
								
								    									
				                     				    				      			     			     
												  					{"sTitle":Product_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"modifiedTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Product_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountproduct
							}
							
							
						]									

			} );	
			jQuery('#product_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			productContextMenu();
			$('#product_grid_view tbody tr td #product_details_act').die();
				$('#product_grid_view tbody tr td #product_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = productTable.fnGetPosition( row );
			var aData = productTable.fnGetData( aPos );
			productresultid=aData.productCode;
										
								sendGETRequest(context+"/rest/Product/auditSearch?id="+productresultid+"&date="+new Date(),"get_product_history_data_callback","","");
							openDetailScreen('product');
				$("#details_view_product").html(ellipsis(aData.productName));
					 window.setTimeout(function () {
				$('#details_product_div span').each(function() {
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
		$('#product_grid_view tbody tr td #product_delete_act').die();
		$('#product_grid_view tbody tr td #product_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = productTable.fnGetPosition( row );
			var aData = productTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('product');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteProductEntity()"); 	
			$('#product_delete_dialog').modal('show');
			// $("#product_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#product_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#product_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			productid=aData.productCode;
		});

				$('#product_grid_view tbody tr td #product_edit_act').die();
		$('#product_grid_view tbody tr td #product_edit_act').live('click', function (){ 
			
 																																		
						
															
																																																																																																																					var row = $(this).closest('tr').get(0);
			var aPos = productTable.fnGetPosition( row );
			var aData = productTable.fnGetData( aPos );
			
																																																																																																																	
				
																																												
								
																			
			
			js2form(document.getElementById('edit_product_form'),aData,".","",true);
			
			
		productid=aData.productCode;				
		openEditScreen('product');	
		
		
		window.setTimeout(function(){
		 																																				$("#edit_product_div #productDescription").html(htmlDecode(aData.productDescription));
		    																													},500);	
		
			
								
					
			
		});
		$('#product_grid_view tbody td').die();
			$('#product_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Product_permission){
	var array=new Array();
	var visibleLength=0;
		$('#product_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<productTable.fnSettings().aoColumns.length;i++){
			if(productTable.fnSettings().aoColumns[i].bVisible){
				array.push(productTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=productTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(productoldnTr!=nTr && productoldnTr!=null)
		{product_inline_edit=false;
			productTable.fnClose( productoldnTr );
		}
		if(productTable.fnIsOpen(nTr)){
				productTable.fnClose( productoldnTr );
			product_inline_edit=false;						productTable.fnDraw();					
		}
		else{
			
			productoldnTr=nTr;
			productTable.fnOpen( nTr,inline_productTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkProductList();
			var aData = productTable.fnGetData( nTr );
			product_inline_edit=true;	
			
																					
		
							window.setTimeout(function(){
																																																																																																													js2form(document.getElementById('edit_product_form_inline'),aData,".","",true);
						},6000);
			productTable.fnDraw();					
			$('#edit_product_form_inline').validationEngine();
			$('#edit_product_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_product_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_productTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_product_form_inline" align="center"><input type="hidden" name="productCode" id="productCode"> <div class="span4">   <div class="control-group"> <label class="control-label" for="buyPrice"> '+ Product_lable_buyPrice+' </label> <div class="controls"> <input type="text" name="buyPrice" id="buyPrice"   class="integersallow validate[required ,custom[number] ,maxSize[22] ]"  />  </div></div>    <div class="control-group"> <label class="control-label" for="sellPrice"> '+ Product_lable_sellPrice+' </label> <div class="controls"> <input type="text" name="sellPrice" id="sellPrice"   class="integersallow validate[required ,custom[number] ,maxSize[22] ]"  />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="productVendor"> '+ Product_lable_productVendor+' </label> <div class="controls">  <input type="text" name="productVendor" id="productVendor"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="quantityInStock"> '+ Product_lable_quantityInStock+' </label> <div class="controls"> <input type="text" name="quantityInStock" id="quantityInStock"  class="integers validate[required ,custom[integer] ,maxSize[5] ]"   />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="productName"> '+ Product_lable_productName+' </label> <div class="controls">  <input type="text" name="productName" id="productName"  class="alphanumericallowspecial validate[required,maxSize[70] ]" />  </div></div>    <input type="hidden" class="hide" name="productDescription" id="productDescription"/> <div class="control-group">  <div class="controls">   </div></div>  </div>      <input type="hidden" class="hide" name="productline" id="productline"/>  <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_product(\'edit_product_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Product_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineProductGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Product_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#product_grid_view tbody tr td').die();
$('#product_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = productTable.fnGetPosition( row );
			var index=productTable.fnGetPosition(this);
			index=index[2];
			var aData = productTable.fnGetData( aPos );
			var jsonKey=productTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=productTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=productTable.fnSettings().aoColumns[index].mData;
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
		function productContextMenu(){
		
		var oTable = $('#product_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_product';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_product';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function product_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#productquickFilterDiv').css('display','none');
				$('#productquickFilter').val('');
				var oTable = $('#product_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_product_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'product'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('product');
					$('#MsgBoxBack').css("display","none");
					getproductTotalCount();
					refreshAllProductList();
					productTable.fnDraw();					
					showCenteredLoading(product_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_product(id){
	removeAllInstanceOfEditor();
						var buyPrice=$('#'+id+' #buyPrice').val();
						var sellPrice=$('#'+id+' #sellPrice').val();
						var productVendor=$('#'+id+' #productVendor').val();
						var quantityInStock=$('#'+id+' #quantityInStock').val();
						var productName=$('#'+id+' #productName').val();
				var productDescription=$('#'+id+' #productDescription').html();
						var productline=$('#'+id+' #productline').val();
					var createProductJsonString = "{";
					if(hasValue(buyPrice))
			createProductJsonString += "\"buyPrice\":\""+buyPrice+"\",";
			 			if(hasValue(sellPrice))
			createProductJsonString += "\"sellPrice\":\""+sellPrice+"\",";
			 			if(hasValue(productVendor))
			createProductJsonString += "\"productVendor\":\""+productVendor+"\",";
			 			if(hasValue(quantityInStock))
			createProductJsonString += "\"quantityInStock\":\""+quantityInStock+"\",";
			 			if(hasValue(productName))
			createProductJsonString += "\"productName\":\""+productName+"\",";
			  		if(hasValue(productDescription))
			createProductJsonString+="\"productDescription\":"+JSON.stringify(productDescription)+",";
			 			if(hasValue(productline))
			createProductJsonString += "\"productline\":\""+productline+"\",";
			     		createProductJsonString=createProductJsonString.substring(0, (createProductJsonString.length-1));
		createProductJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createProductJsonString;
			
					
		
		var jsons="";
	if(!(product_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((product_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Product/create/",formData,"create_product_callback","");
	}
	}else
	{
																												
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Product/create/",formData,"create_product_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Product/create/",formData,"create_product_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_product_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'product'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('product');
					getproductTotalCount();
					refreshAllFkProductList();
					refreshAllProductList();
					productTable.fnDraw();					
					showCenteredLoading(product_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_product(form){
	removeAllInstanceOfEditor();
	var productCode=$('#'+form+' #productCode').val();
  		var buyPrice=$('#'+form+' #buyPrice').val();
  		var sellPrice=$('#'+form+' #sellPrice').val();
  		var productVendor=$('#'+form+' #productVendor').val();
  		var quantityInStock=$('#'+form+' #quantityInStock').val();
  		var productName=$('#'+form+' #productName').val();
		var productDescription="";
		if(product_inline_edit)
		{
		productDescription=$('#'+form+' #productDescription').val();
		}else{
		productDescription=$('#'+form+' #productDescription').html();
		}
  		var productline=$('#'+form+' #productline').val();

		var editProductJsonString = "{";
		if(hasValue(productCode))
		editProductJsonString += "\"productCode\":\""+productCode+"\",";
		if(hasValue(buyPrice))
		editProductJsonString += "\"buyPrice\":\""+buyPrice+"\",";
 		if(hasValue(sellPrice))
		editProductJsonString += "\"sellPrice\":\""+sellPrice+"\",";
 		if(hasValue(productVendor))
		editProductJsonString += "\"productVendor\":\""+productVendor+"\",";
 		if(hasValue(quantityInStock))
		editProductJsonString += "\"quantityInStock\":\""+quantityInStock+"\",";
 		if(hasValue(productName))
		editProductJsonString += "\"productName\":\""+productName+"\",";
 		if(hasValue(productCode))
		editProductJsonString += "\"productCode\":\""+productCode+"\",";
 		if(hasValue(productDescription))
			editProductJsonString+="\"productDescription\":"+JSON.stringify(productDescription)+",";
			 		if(hasValue(productline))
		editProductJsonString += "\"productline\":\""+productline+"\",";
     		
		editProductJsonString=editProductJsonString.substring(0, (editProductJsonString.length-1));
		editProductJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editProductJsonString;
					
			
		if(!(product_no_address==0))
	{
		
		if(product_inline_edit)
	{
	if(!( product_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  product_creator_inline);
	}																												
				
										sendPUTRequest(context+"/rest/Product/update/",formData,"edit_product_callback","");
		
		product_inline_edit=false;
product_creator_inline=="";
																										
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
																																																												
												
																										
		
			sendPUTRequest(context+"/rest/Product/update/",formData,"edit_product_callback","");
		
			
			}else{
				if(jsonsfieldname.length==product_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Product/update/",formData,"edit_product_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
																																																															
												
																													sendPUTRequest(context+"/rest/Product/update/",formData,"edit_product_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
																																														
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( product_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  product_creator_inline);
	}	
		product_inline_edit=false;
product_creator_inline=="";

			sendPUTRequest(context+"/rest/Product/update/",formData,"edit_product_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_product_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'product'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('product');
					refreshAllProductList();
					productTable.fnDraw();					
					showCenteredLoading(product_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchProductData(formId)
	{
	$('#productpagenovalue').html(1); 
	uperLimit=eval($('#product_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#product_pagination #product_page_llimit').val(pagellimit);
	$('#product_pagination #product_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				productSortByHighLightSelectedHeader('product');
				var fiql=searchDataByFIQL(formId);
				
				fiqlProductParam=fiql;
				sendGETRequest(context+"/rest/Product/search"+fiql+"&date="+new Date(),"getfiql_product_data","","");
	window.setTimeout(function(){
			setSort('product',$("#fiql_product_form #sort_product").val());
			setDefaultTypeSorting('product',"sort_type_product");
			},1000);	
   $("#fiql_product_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_product_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#productfilterTab").slideUp();
				productTableRowData=data;
				Productflag=productTableRowData.length;	
				var product_pagination_value=$("#product_pagination_value").val();
				$("#product_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( product_pagination_value) + " " + pagination_entries + " ");				
				productViewTable();
				productTable.fnDraw();	
				// $("#product_pagination_totalRecord").text("Total Records : "+productTable.fnSettings().fnRecordsDisplay());
				$("#product_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	


function productHistoryTable(data){
	
	$("#product_history_tabdiv").empty();

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

			$("#product_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#product_history_tabdiv").append("<ul id='product_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_product_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'product')) {
			if(XMLHttpRequest.status == 200) {
				productTableRowData=data;
				productHistoryTable(data);				
			}
		}
	}	
}

																		
		
				function product_set_table_value_id(id)
{
table="product";
hiddenid=id;
}
function deleteProductEntity(){
	if(hasValue(productid)){
				sendDELETERequest(context+"/rest/Product/delete/"+productid,"","delete_product_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForProduct()
	{
				}

function openProductListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('product');
			var orderbycall= $('#fiql_product_form #sort_product').val();
			var ordertypecall= $('#fiql_product_form #sort_type_product').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Product/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getProductData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllProductList();
			}
			if(!$("#list_product_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getProductDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewProduct(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewProduct(data){
 
 
 																																		
						
																																																																																																																														
																																																																																																																	
				
																																												
								
																 	
				
		js2form(document.getElementById('edit_product_form'),data[0],".","",true);
		
		// productid=aData.productCode;		
		openEditScreen('product');
		
		window.setTimeout(function(){
		 																																				$("#edit_product_div #productDescription").html(htmlDecode(data[0].productDescription));
		    																													},500);	
 
 }

function ViewEditproduct() {
	productid = productresultid;	sendGETRequest(context+"/rest/Product/search?_s=productCode=="+productresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getProductDataEditCallBack","");
}

/*function to open quick filter for text field*/
var productSearchIndex="";
function openProductTextField(colName){
		productSearchIndex =  get_column_number_For_Quick_Filter(colName,'product');
	showQuickFilterDiv(productSearchIndex,'product',colName);
	$("#productquickFilterDiv").css("display","");
	$("#productquickFilter").focus();
	$("#productquickFilter").keyup( function () {
		
			   productTable.fnFilter( this.value,productSearchIndex );
			   // $("#product_pagination_totalRecord").text("Total Records : "+productTable.fnSettings().fnRecordsDisplay());
			   $("#product_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openProductTextSelectBox(colName,val){
	$("#productquickFilterDiv").css("display","none");
	productSearchIndex =  get_column_number_For_Quick_Filter(colName,'product');
	
    productTable.fnFilter( val, productSearchIndex );
	// $("#product_pagination_totalRecord").text("Total Records : "+productTable.fnSettings().fnRecordsDisplay());
	$("#product_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Product*/
function getproductTotalCount()
{
	sendGETRequest(context+"/rest/Product/totalCount?date="+new Date(),"getproductTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Product*/
function getproductTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#product_totalCount').html(" / "+data);
				$('#product_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


