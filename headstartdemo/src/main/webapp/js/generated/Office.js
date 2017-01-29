var officeTableRowData='';
var officeTable;
var officeresultid;
var officeoldnTr=null;
var officeoldimg=null;
var office_inline_edit=false;
var office_creator_inline="";
var officeid;

function closeInlineOfficeGridRow(){
		if(hasValue(officeoldnTr)){
				officeTable.fnClose( officeoldnTr );
		}
}
function addcommentFileCountoffice(data, type, full) 
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
									
								if(read_Office_permission)
									{
										
 										str += '<div class="table_view float_left" style="display:block; margin-left:  35px ;" id="office_details_act" data-toggle="tooltip" title="View"  data-animation="true"></div>' 
										action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="office_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
										
																				
									}
									
									if(update_Office_permission){
									str+=	'<div class="table_edit float_left" id="office_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="office_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Office_permission){str+=	'<div class="table_close float_left"  id="office_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="office_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   								    
								    if(parseInt(commentCount)>0) {
										str+='<div class="float_left" style="display:block;" id="customer_comments_act" data-toggle="tooltip" title="View"  data-animation="true">'

										str+='<a href="#office_comment_modal"style="display:block" class="float_left table_comment_num" id="office_comment_act" role="button" title="Comment"  data-toggle="modal"><span class="subNumberShow">'+commentCount+'</span></a>';
										action480+='<li><div><a href="#office_comment_modal"style="display:block" class="float_left table_comment_num" id="office_comment_act" role="button" title="Comment"  data-toggle="modal">'+commentCount+'</a></div></li>';

										str += "</div>";
								    }
								    else {
										str+='<div class="float_left" style="display:block;" id="customer_comments_act" data-toggle="tooltip" title="View"  data-animation="true">'

										str+='<a href="#office_comment_modal"style="display:block" class="float_left table_comment_num" id="office_comment_act" role="button" title="Comment"  data-toggle="modal"></a>';

										str += "</div>";

										action480+='<li><div><a href="#office_comment_modal"style="display:block" class="float_left table_comment_num" id="office_comment_act" role="button" title="Comment"  data-toggle="modal"></a></div></li>';
								    }
								    									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


																																						
						
												

																																																				var creator_foriegn_office;
												var lastModifier_foriegn_office;
															
	
																				
		
				var office_no_address=0;





	function refreshAllFkOfficeList(){
	
																																																																						sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"office_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"office_getFK_lastModifier","");
																																				
	}

function refreshAllOfficeList(){
	showRegularLoading();
var pagellimit=	$('#office_pagination #office_page_llimit').val();
var pageulimit=$('#office_pagination #office_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#office_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#office_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#office_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('office');
			officeresultid=list_view_callId;
						sendGETRequest(context+"/rest/Office/search?_s=officeCode=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOfficeDatabyscreen","");
			
							
				sendGETRequest(context+"/rest/Comment/search?_s=office.officeCode=="+list_view_callId+"&date="+new Date(),"get_office_comment_data_callback","","");
								sendGETRequest(context+"/rest/Office/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_office_history_data_callback","","");
						}
		else{
		openListScreen('office');
		var orderbycall= $('#fiql_office_form #sort_office').val();
		var ordertypecall= $('#fiql_office_form #sort_type_office').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Office/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getOfficeData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Office/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOfficeData","");	
				}
		}	
		  
}

function getOfficeDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_office_div span').each(function() {		
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
				$("#details_view_office").html(data[0].cityName);
				},1200);
		RemoveUniqueLoading();
}
function refreshOfficeListFromPaginator(){
showRegularLoading();
	$('#officepagenovalue').html(1); 
	$("#office_pagination_next").css("display", "");
	$("#office_pagination_pre").css("display", "");
	var uperLimit=eval($('#office_pagination_value').val());
	$("#office_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('office');
		var orderbycall= $('#fiql_office_form #sort_office').val();
		var ordertypecall= $('#fiql_office_form #sort_type_office').val();
			sendGETRequest(context+"/rest/Office/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getOfficeData","");
	
	
	window.setTimeout(function(){
			setSort('office',$("#fiql_office_form #sort_office").val());},1000);	
		
}


									
									
									
									
									
									
									
									
									
						function office_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'office'))
					{		
	if(XMLHttpRequest.status==200)
			{
var office_uniqueArr_creator = [];
$('#fiql_office_form #creator.username').empty();
$('#fiql_office_form #creator\\.username').empty();
$('#office_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (office_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        office_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_office_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_office_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#office_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openOfficeTextSelectBox(\''+Office_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_office_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function office_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'office'))
					{		
	if(XMLHttpRequest.status==200)
			{
var office_uniqueArr_lastModifier = [];
$('#fiql_office_form #lastModifier.username').empty();
$('#fiql_office_form #lastModifier\\.username').empty();
$('#office_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (office_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        office_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_office_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_office_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#office_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openOfficeTextSelectBox(\''+Office_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_office_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getOfficeData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'office'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#office_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#office_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				officeTableRowData=data;
				Officeflag=officeTableRowData.length;	
       
				officeViewTable();
				// $("#office_pagination_totalRecord").text("Total Records : "+officeTable.fnSettings().fnRecordsDisplay());
				$("#office_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getOfficeDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'office'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#office_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#office_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				officeTableRowData=data;
				Officeflag=officeTableRowData.length;	
				officeTable.fnClearTable();
				officeViewTable();
                //officeTable.fnAddData(data);		
				// $("#office_pagination_totalRecord").text("Total Records : "+officeTable.fnSettings().fnRecordsDisplay());
				$("#office_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  officeViewTable(){
	
		$('#office_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="office_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#office_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#office_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		officeTable=jQuery('#office_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": officeTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
															{"sTitle":Office_thead_territory,"mData":"territory","bVisible":true,"contextid":"territory","mRender":ellipsis,"contextType":"territory"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_addressLine1,"mData":"addressLine1","bVisible":true,"contextid":"addressLine1","mRender":ellipsis,"contextType":"addressLine1"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_postalCode,"sClass":"hidden-480","mData":"postalCode","bVisible":true,"contextid":"postalCode","mRender":ellipsis,"contextType":"postalCode"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_phone,"sClass":"hidden-480","mData":"phone","bVisible":true,"contextid":"phone","mRender":ellipsis,"contextType":"phone"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_country,"sClass":"hidden-480","mData":"country","bVisible":true,"contextid":"country","mRender":ellipsis,"contextType":"country"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			     											
															{"sTitle":Office_thead_cityName,"sClass":"hidden-480","mData":"cityName","bVisible":true,"contextid":"cityName","mRender":ellipsis,"contextType":"cityName"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_state,"sClass":"hidden-480","mData":"state","bVisible":true,"contextid":"state","mRender":ellipsis,"contextType":"state"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Office_thead_addressLine2,"sClass":"hidden-480","mData":"addressLine2","bVisible":true,"contextid":"addressLine2","mRender":ellipsis,"contextType":"addressLine2"},
																					
						
					
			      			      			       					
						
								
								    									
				                     				    																	  {"sTitle":Office_thead_creator,"mData":"creator.username","sClass":"hidden-480","bVisible":false,"contextid":"creator","mRender":ellipsis,"contextType":"creator.username"},
																	
                   
                   				
								    									
				                     				    											  {"sTitle":Office_thead_lastModifier,"mData":"lastModifier.username","sClass":"hidden-480","bVisible":false,"contextid":"lastModifier","mRender":ellipsis,"contextType":"lastModifier.username"}, 																	
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Office_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"modifiedTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Office_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountoffice
							}
							
							
						]									

			} );	
			jQuery('#office_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			officeContextMenu();
			$('#office_grid_view tbody tr td #office_details_act').die();
				$('#office_grid_view tbody tr td #office_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = officeTable.fnGetPosition( row );
			var aData = officeTable.fnGetData( aPos );
			officeresultid=aData.officeCode;
										
				sendGETRequest(context+"/rest/Comment/search?_s=office.officeCode=="+officeresultid+"&date="+new Date(),"get_office_comment_data_callback","","");
								sendGETRequest(context+"/rest/Office/auditSearch?id="+officeresultid+"&date="+new Date(),"get_office_history_data_callback","","");
							openDetailScreen('office');
				$("#details_view_office").html(ellipsis(aData.cityName));
					 window.setTimeout(function () {
				$('#details_office_div span').each(function() {
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
		$('#office_grid_view tbody tr td #office_delete_act').die();
		$('#office_grid_view tbody tr td #office_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = officeTable.fnGetPosition( row );
			var aData = officeTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('office');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteOfficeEntity()"); 	
			$('#office_delete_dialog').modal('show');
			// $("#office_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#office_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#office_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			officeid=aData.officeCode;
		});

				$('#office_grid_view tbody tr td #office_edit_act').die();
		$('#office_grid_view tbody tr td #office_edit_act').live('click', function (){ 
			
 																																						
						
															
																																																																																																																												var row = $(this).closest('tr').get(0);
			var aPos = officeTable.fnGetPosition( row );
			var aData = officeTable.fnGetData( aPos );
			
																																																																																																																								
				
																																																	
								
																			
			
			js2form(document.getElementById('edit_office_form'),aData,".","",true);
			
			
		officeid=aData.officeCode;				
		openEditScreen('office');	
		
		
		window.setTimeout(function(){
		 																																																																			},500);	
		
			
								
					
			
		});
		$('#office_grid_view tbody td').die();
			$('#office_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Office_permission){
	var array=new Array();
	var visibleLength=0;
		$('#office_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<officeTable.fnSettings().aoColumns.length;i++){
			if(officeTable.fnSettings().aoColumns[i].bVisible){
				array.push(officeTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=officeTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(officeoldnTr!=nTr && officeoldnTr!=null)
		{office_inline_edit=false;
			officeTable.fnClose( officeoldnTr );
		}
		if(officeTable.fnIsOpen(nTr)){
				officeTable.fnClose( officeoldnTr );
			office_inline_edit=false;						officeTable.fnDraw();					
		}
		else{
			
			officeoldnTr=nTr;
			officeTable.fnOpen( nTr,inline_officeTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkOfficeList();
			var aData = officeTable.fnGetData( nTr );
			office_inline_edit=true;	
			
																							
		
							window.setTimeout(function(){
																																																																																																																				js2form(document.getElementById('edit_office_form_inline'),aData,".","",true);
						},6000);
			officeTable.fnDraw();					
			$('#edit_office_form_inline').validationEngine();
			$('#edit_office_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_office_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_officeTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_office_form_inline" align="center"><input type="hidden" name="officeCode" id="officeCode"> <div class="span4">   <div class="control-group"> <label class="control-label" for="territory"> '+ Office_lable_territory+' </label> <div class="controls">  <input type="text" name="territory" id="territory"  class="alphanumericallowspecial validate[required,maxSize[10] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="addressLine1"> '+ Office_lable_addressLine1+' </label> <div class="controls">  <input type="text" name="addressLine1" id="addressLine1"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="postalCode"> '+ Office_lable_postalCode+' </label> <div class="controls">  <input type="text" name="postalCode" id="postalCode"  class="alphanumericallowspecial validate[required,maxSize[15] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="phone"> '+ Office_lable_phone+' </label> <div class="controls">  <input type="text" name="phone" id="phone"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="country"> '+ Office_lable_country+' </label> <div class="controls">  <input type="text" name="country" id="country"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>     <div class="control-group"> <label class="control-label" for="cityName"> '+ Office_lable_cityName+' </label> <div class="controls">  <input type="text" name="cityName" id="cityName"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>      <input type="hidden" class="hide" name="state" id="state"/>    <input type="hidden" class="hide" name="addressLine2" id="addressLine2"/>  <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_office(\'edit_office_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Office_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineOfficeGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Office_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#office_grid_view tbody tr td').die();
$('#office_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = officeTable.fnGetPosition( row );
			var index=officeTable.fnGetPosition(this);
			index=index[2];
			var aData = officeTable.fnGetData( aPos );
			var jsonKey=officeTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=officeTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=officeTable.fnSettings().aoColumns[index].mData;
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

						$('#office_grid_view tbody tr td #office_comment_act').die();
		$('#office_grid_view tbody tr td #office_comment_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = officeTable.fnGetPosition( row );
			var aData = officeTable.fnGetData( aPos );
			officeresultid=aData.officeCode;	sendGETRequest(context+"/rest/Comment/search?_s=office.officeCode=="+aData.officeCode+"&date="+new Date(),"get_office_comment_data_callback","","");									
			// office_show_modal_window(aData.officeCode,"false",'officecommentmodel');
			showOfficeAddAndViewCommentModal(aData.officeCode);
		});
				RemoveUniqueLoading();
		}
		function officeContextMenu(){
		
		var oTable = $('#office_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_office';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_office';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function office_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#officequickFilterDiv').css('display','none');
				$('#officequickFilter').val('');
				var oTable = $('#office_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_office_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'office'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('office');
					$('#MsgBoxBack').css("display","none");
					getofficeTotalCount();
					refreshAllOfficeList();
					officeTable.fnDraw();					
					showCenteredLoading(office_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_office(id){
	removeAllInstanceOfEditor();
						var territory=$('#'+id+' #territory').val();
						var addressLine1=$('#'+id+' #addressLine1').val();
						var postalCode=$('#'+id+' #postalCode').val();
						var phone=$('#'+id+' #phone').val();
						var country=$('#'+id+' #country').val();
						var cityName=$('#'+id+' #cityName').val();
						var state=$('#'+id+' #state').val();
						var addressLine2=$('#'+id+' #addressLine2').val();
					var createOfficeJsonString = "{";
					if(hasValue(territory))
			createOfficeJsonString += "\"territory\":\""+territory+"\",";
			 			if(hasValue(addressLine1))
			createOfficeJsonString += "\"addressLine1\":\""+addressLine1+"\",";
			 			if(hasValue(postalCode))
			createOfficeJsonString += "\"postalCode\":\""+postalCode+"\",";
			 			if(hasValue(phone))
			createOfficeJsonString += "\"phone\":\""+phone+"\",";
			 			if(hasValue(country))
			createOfficeJsonString += "\"country\":\""+country+"\",";
			  			if(hasValue(cityName))
			createOfficeJsonString += "\"cityName\":\""+cityName+"\",";
			 			if(hasValue(state))
			createOfficeJsonString += "\"state\":\""+state+"\",";
			 			if(hasValue(addressLine2))
			createOfficeJsonString += "\"addressLine2\":\""+addressLine2+"\",";
			     		createOfficeJsonString=createOfficeJsonString.substring(0, (createOfficeJsonString.length-1));
		createOfficeJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createOfficeJsonString;
			
					
		
		var jsons="";
	if(!(office_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((office_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Office/create/",formData,"create_office_callback","");
	}
	}else
	{
																															
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Office/create/",formData,"create_office_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Office/create/",formData,"create_office_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_office_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'office'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('office');
					getofficeTotalCount();
					refreshAllFkOfficeList();
					refreshAllOfficeList();
					officeTable.fnDraw();					
					showCenteredLoading(office_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_office(form){
	removeAllInstanceOfEditor();
	var officeCode=$('#'+form+' #officeCode').val();
  		var territory=$('#'+form+' #territory').val();
  		var addressLine1=$('#'+form+' #addressLine1').val();
  		var postalCode=$('#'+form+' #postalCode').val();
  		var phone=$('#'+form+' #phone').val();
  		var country=$('#'+form+' #country').val();
  		var cityName=$('#'+form+' #cityName').val();
  		var state=$('#'+form+' #state').val();
  		var addressLine2=$('#'+form+' #addressLine2').val();

		var editOfficeJsonString = "{";
		if(hasValue(officeCode))
		editOfficeJsonString += "\"officeCode\":\""+officeCode+"\",";
		if(hasValue(territory))
		editOfficeJsonString += "\"territory\":\""+territory+"\",";
 		if(hasValue(addressLine1))
		editOfficeJsonString += "\"addressLine1\":\""+addressLine1+"\",";
 		if(hasValue(postalCode))
		editOfficeJsonString += "\"postalCode\":\""+postalCode+"\",";
 		if(hasValue(phone))
		editOfficeJsonString += "\"phone\":\""+phone+"\",";
 		if(hasValue(country))
		editOfficeJsonString += "\"country\":\""+country+"\",";
 		if(hasValue(officeCode))
		editOfficeJsonString += "\"officeCode\":\""+officeCode+"\",";
 		if(hasValue(cityName))
		editOfficeJsonString += "\"cityName\":\""+cityName+"\",";
 		if(hasValue(state))
		editOfficeJsonString += "\"state\":\""+state+"\",";
 		if(hasValue(addressLine2))
		editOfficeJsonString += "\"addressLine2\":\""+addressLine2+"\",";
     		
		editOfficeJsonString=editOfficeJsonString.substring(0, (editOfficeJsonString.length-1));
		editOfficeJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editOfficeJsonString;
					
			
		if(!(office_no_address==0))
	{
		
		if(office_inline_edit)
	{
	if(!( office_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  office_creator_inline);
	}																															
				
										sendPUTRequest(context+"/rest/Office/update/",formData,"edit_office_callback","");
		
		office_inline_edit=false;
office_creator_inline=="";
																													
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
																																																																			
												
																										
		
			sendPUTRequest(context+"/rest/Office/update/",formData,"edit_office_callback","");
		
			
			}else{
				if(jsonsfieldname.length==office_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Office/update/",formData,"edit_office_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
																																																																						
												
																													sendPUTRequest(context+"/rest/Office/update/",formData,"edit_office_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
																																																			
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( office_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  office_creator_inline);
	}	
		office_inline_edit=false;
office_creator_inline=="";

			sendPUTRequest(context+"/rest/Office/update/",formData,"edit_office_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_office_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'office'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('office');
					refreshAllOfficeList();
					officeTable.fnDraw();					
					showCenteredLoading(office_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchOfficeData(formId)
	{
	$('#officepagenovalue').html(1); 
	uperLimit=eval($('#office_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#office_pagination #office_page_llimit').val(pagellimit);
	$('#office_pagination #office_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				officeSortByHighLightSelectedHeader('office');
				var fiql=searchDataByFIQL(formId);
				
				fiqlOfficeParam=fiql;
				sendGETRequest(context+"/rest/Office/search"+fiql+"&date="+new Date(),"getfiql_office_data","","");
	window.setTimeout(function(){
			setSort('office',$("#fiql_office_form #sort_office").val());
			setDefaultTypeSorting('office',"sort_type_office");
			},1000);	
   $("#fiql_office_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_office_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#officefilterTab").slideUp();
				officeTableRowData=data;
				Officeflag=officeTableRowData.length;	
				var office_pagination_value=$("#office_pagination_value").val();
				$("#office_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( office_pagination_value) + " " + pagination_entries + " ");				
				officeViewTable();
				officeTable.fnDraw();	
				// $("#office_pagination_totalRecord").text("Total Records : "+officeTable.fnSettings().fnRecordsDisplay());
				$("#office_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	

function officeCommentList(data)
{
	$("#office_comment_tabdiv").empty();
	$("#officecommentmodeldata").empty();
	$("#officeCommentViewCountBadge").html("Comments (" + parseInt(data.length) + ")");
	$("#officeCommentEditCountBadge").html("Comments (" + parseInt(data.length) + ")");
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
		
			$("#office_comment_tabdiv").append("<div class='itemdiv commentdiv'><div class='user'><img alt='"+name+"&#39;s Avatar' onerror=\"this.src='../images/avatar2.png'\" src="+context+"/rest/Users/getUserImageById/"+userId+"></div><div class='body'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width: 72%;'>"+message+"</div></div>"+"<div class='tools'><a href='javascript:void(0);' onclick='office_delete_comment("+data[i].id+")'class='btn btn-minier-prev btn-danger'><i class='icon-only icon-trash'></i></a></div>"+"</div>");

			$("#officecommentmodeldata").append("<div class='itemdiv commentdiv'><div class='user'><img alt='"+name+"&#39;s Avatar' onerror=\"this.src='../images/avatar2.png'\" src="+context+"/rest/Users/getUserImageById/"+userId+"></div><div class='body'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time'><i class='icon-time'></i><span class='red'> "+time+"</span></div><div class='text' style='word-wrap: break-word;max-width: 72%;'>"+message+"</div></div>"+"<div class='tools'><a href='javascript:void(0);' onclick='office_delete_comment("+data[i].id+")'class='btn btn-minier-prev btn-danger'><i class='icon-only icon-trash'></i></a></div>"+"</div>");
			// <i style='color: #a7a7a7;' class='icon-quote-right'></i>
		}
	}
	else
	{
		 $("#office_comment_tabdiv").append("<ul id='office_comments' class='item-list ui-sortable'><li>"+OfficeNoCommentstoshow+"</li></ul>");
	}
 
}

function get_office_comment_data_callback(XMLHttpRequest, data, rpcRequest){
	if(!checkException(XMLHttpRequest.responseText))
	{	
		if(statuscheck(XMLHttpRequest.status,'office'))
		{
			if(XMLHttpRequest.status==200)
			{
				officeCommentList(data);
			}
		}
	}	
}


function office_delete_comment(id)
{
	officeCommentId=id;
	// commonDialogBox("Do you want to delete comment ?","deleteOfficeComment()");
	$('#office_comment_delete_dialog').modal('show');
	$("#office_comment_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
	$("#office_comment_delete_dialog .modal-body span").html(DELETE_COMMENT_CONFIRM_MSG_VAR);

	var d = document.getElementById('office_comment_tabdiv');	
	var olddiv = document.getElementById('office_comments');	
	// d.removeChild(olddiv);
}

function deleteofficeCommentCallback(XMLHttpRequest, data,rpcRequest)
{
	RemoveUniqueLoading();
	$('#office_comment_delete_dialog').fadeOut();
	refreshAllOfficeList();
	if(statuscheck(XMLHttpRequest.status,'office')) {
		if(XMLHttpRequest.status == 204) {		  sendGETRequest(context+"/rest/Comment/search?_s=office.officeCode=="+officeresultid,"get_office_comment_data_callback","","");	 
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



var officeAttachId;
var officeCommentId;
function deleteOfficeComment(){
	if(hasValue(officeCommentId)){
		sendDELETERequest(context+"/rest/Comment/" + officeCommentId,"","deleteofficeCommentCallback","");	
	 
	}
}
var officeAttachId;	
function deleteOfficeAttach(){
	if(hasValue(officeAttachId)){
	sendDELETERequest(context+"/rest/OfficeAttach/"+officeAttachId,"","delete_office_file_attach_callback","");
	 var d = document.getElementById('office_task_tab');
			var olddiv = document.getElementById('office_tasks');
			d.removeChild(olddiv);
	}
}	


function office_show_modal_window(id,html_page,div_id)
{
hasSession();
uploadid=id;
uploadName="Office";
primaryKey="officeCode";
foreignKey="office";
upload_div_id="office_uploader_div";
upid="office";
	if(html_page!="false"){
	var url=context+"/pages"+htmlFolder+"/"+html_page;
	jQuery.get(url,function(data){
		$('#'+div_id+'').html(data);
	
		});
		}
}

function officeHistoryTable(data){
	
	$("#office_history_tabdiv").empty();

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

			$("#office_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#office_history_tabdiv").append("<ul id='office_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_office_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'office')) {
			if(XMLHttpRequest.status == 200) {
				officeTableRowData=data;
				officeHistoryTable(data);				
			}
		}
	}	
}

																				
		
				function office_set_table_value_id(id)
{
table="office";
hiddenid=id;
}
function deleteOfficeEntity(){
	if(hasValue(officeid)){
				sendDELETERequest(context+"/rest/Office/delete/"+officeid,"","delete_office_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForOffice()
	{
				}

function openOfficeListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('office');
			var orderbycall= $('#fiql_office_form #sort_office').val();
			var ordertypecall= $('#fiql_office_form #sort_type_office').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Office/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getOfficeData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllOfficeList();
			}
			if(!$("#list_office_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getOfficeDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewOffice(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewOffice(data){
 
 
 																																						
						
																																																																																																																																					
																																																																																																																								
				
																																																	
								
																 	
				
		js2form(document.getElementById('edit_office_form'),data[0],".","",true);
		
		// officeid=aData.officeCode;		
		openEditScreen('office');
		
		window.setTimeout(function(){
		 																																																																			},500);	
 
 }

function ViewEditoffice() {
	officeid = officeresultid;	sendGETRequest(context+"/rest/Office/search?_s=officeCode=="+officeresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getOfficeDataEditCallBack","");
}

/*function to open quick filter for text field*/
var officeSearchIndex="";
function openOfficeTextField(colName){
		officeSearchIndex =  get_column_number_For_Quick_Filter(colName,'office');
	showQuickFilterDiv(officeSearchIndex,'office',colName);
	$("#officequickFilterDiv").css("display","");
	$("#officequickFilter").focus();
	$("#officequickFilter").keyup( function () {
		
			   officeTable.fnFilter( this.value,officeSearchIndex );
			   // $("#office_pagination_totalRecord").text("Total Records : "+officeTable.fnSettings().fnRecordsDisplay());
			   $("#office_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openOfficeTextSelectBox(colName,val){
	$("#officequickFilterDiv").css("display","none");
	officeSearchIndex =  get_column_number_For_Quick_Filter(colName,'office');
	
    officeTable.fnFilter( val, officeSearchIndex );
	// $("#office_pagination_totalRecord").text("Total Records : "+officeTable.fnSettings().fnRecordsDisplay());
	$("#office_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Office*/
function getofficeTotalCount()
{
	sendGETRequest(context+"/rest/Office/totalCount?date="+new Date(),"getofficeTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Office*/
function getofficeTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#office_totalCount').html(" / "+data);
				$('#office_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


// to get Office comments
function getOfficeComments()
{
	sendGETRequest(context+"/rest/Comment/search?_s=office.officeCode=="+officeresultid+"&date="+new Date(),"get_office_comment_data_callback","","");
}

// to show add and view comment in Office modal window
function showOfficeAddAndViewCommentModal(officeId)
{
	if(!hasValue(officeId)) officeId = officeid;
	if(hasValue(officeId)) {
		office_show_modal_window(officeId,"false",'customercommentmodel');
	}
}
