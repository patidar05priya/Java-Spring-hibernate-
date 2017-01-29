var employeeTableRowData='';
var employeeTable;
var employeeresultid;
var employeeoldnTr=null;
var employeeoldimg=null;
var employee_inline_edit=false;
var employee_creator_inline="";
var employeeid;

function closeInlineEmployeeGridRow(){
		if(hasValue(employeeoldnTr)){
				employeeTable.fnClose( employeeoldnTr );
		}
}
function addcommentFileCountemployee(data, type, full) 
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
									
								if(read_Employee_permission)
									{
																					str += '<div class="table_view float_left" style="display:block; margin-left:45px;" id="employee_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div>' 
											action480+='<li><div class="table_view float_left" style="display:block; margin-left:15px;" id="employee_details_act"   data-toggle="tooltip" title="View"  data-animation="true"></div></li>';
																				
									}
									
									if(update_Employee_permission){
									str+=	'<div class="table_edit float_left" id="employee_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> '
									action480+='<li><div class="table_edit float_left" id="employee_edit_act" style="display:block"  data-toggle="tooltip" title="Edit" data-animation="true"></div> </li>';
									}
									
	                                if(delete_Employee_permission){str+=	'<div class="table_close float_left"  id="employee_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div>';action480+='<li><div class="table_close float_left"  id="employee_delete_act" style="display:block"  data-toggle="tooltip" title="Delete"  data-animation="true" ></div></li>';}
									
								    								    
								   									action480+="</ul></div></div>";
							    	str+='</div>';
								   return str+action480;
}	


										
																										
						
												

																	var office_foriegn_employee;
																																					var creator_foriegn_employee;
												var lastModifier_foriegn_employee;
															
	
						
												
		
				var employee_no_address=0;





	function refreshAllFkEmployeeList(){
	
																																			sendGETRequest(context+"/rest/Office/search?&orderBy=cityName&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"employee_getFK_office","");
																																																																										sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"employee_getFK_creator","");
																																																	sendGETRequest(context+"/rest/Users/search?&orderBy=username&orderType=asc&ulimit=100&llimit=0&date="+new Date(),"employee_getFK_lastModifier","");
																																				
	}

function refreshAllEmployeeList(){
	showRegularLoading();
var pagellimit=	$('#employee_pagination #employee_page_llimit').val();
var pageulimit=$('#employee_pagination #employee_page_ulimit').val();

var newpagellimit =parseInt(pagellimit);
 var newpageulimit =parseInt(pageulimit);
if(!isNaN(newpagellimit)){
	
	$("#employee_pagination #content").text(pagination_showing+" "+(newpagellimit+1)+" "+pagination_to+" "+(newpageulimit+1)+" "+pagination_entries+" " );

	}
else{
if(hasValue(pageulimit)&&hasValue(pagellimit))
$("#employee_pagination #content").text(pagination_showing+" "+(pagellimit+1)+" "+pagination_to+" "+(pageulimit+1)+" "+pagination_entries+" " );
else			
$("#employee_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(DEFAULT_PAGE_UPPERLIMIT+1)+" "+pagination_entries+" " );
}
	if(hasValue(check_list_view_screen)){
			
			openDetailScreen('employee');
			employeeresultid=list_view_callId;
						sendGETRequest(context+"/rest/Employee/search?_s=employeeNumber=="+list_view_callId+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getEmployeeDatabyscreen","");
			
							
								sendGETRequest(context+"/rest/Employee/auditSearch?id="+list_view_callId+"&date="+new Date(),"get_employee_history_data_callback","","");
						}
		else{
		openListScreen('employee');
		var orderbycall= $('#fiql_employee_form #sort_employee').val();
		var ordertypecall= $('#fiql_employee_form #sort_type_employee').val();
		if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			if(hasValue(pageulimit)&&hasValue(pagellimit))
			{
							sendGETRequest(context+"/rest/Employee/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+pageulimit+"&llimit="+pagellimit+"&date="+new Date(),"getEmployeeData","");
	
					}
		else
		{
				sendGETRequest(context+"/rest/Employee/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getEmployeeData","");	
				}
		}	
		  
}

function getEmployeeDatabyscreen(XMLHttpRequest, data, rpcRequest)

{  

	window.setTimeout(function(){
	$('#details_employee_div span').each(function() {		
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
				$("#details_view_employee").html(data[0].lastName);
				},1200);
		RemoveUniqueLoading();
}
function refreshEmployeeListFromPaginator(){
showRegularLoading();
	$('#employeepagenovalue').html(1); 
	$("#employee_pagination_next").css("display", "");
	$("#employee_pagination_pre").css("display", "");
	var uperLimit=eval($('#employee_pagination_value').val());
	$("#employee_pagination #content").text(pagination_showing+" "+(DEFAULT_PAGE_LOWERLIMIT+1)+" "+pagination_to+" "+(uperLimit)+" "+pagination_entries+" " );
	openListScreen('employee');
		var orderbycall= $('#fiql_employee_form #sort_employee').val();
		var ordertypecall= $('#fiql_employee_form #sort_type_employee').val();
			sendGETRequest(context+"/rest/Employee/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+(uperLimit-1)+"&llimit="+DEFAULT_PAGE_LOWERLIMIT,"getEmployeeData","");
	
	
	window.setTimeout(function(){
			setSort('employee',$("#fiql_employee_form #sort_employee").val());},1000);	
		
}


									
									
									function employee_getFK_office(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'employee'))
					{		
	if(XMLHttpRequest.status==200)
			{
		
             $('#add_employee_form #office\\.cityName').empty();
		     $('#edit_employee_form #office\\.cityName').empty();			
		     $('#fiql_employee_form #office\\.cityName').empty();
		     $('#edit_employee_form_inline #office\\.cityName').empty();
$('#employee_Quick_UL #office_filter ul').empty();
			jQuery('#fiql_employee_form #office\\.cityName').append(jQuery('<option>',{
					value:"",
					text:"All"
			}));
			jQuery('#add_employee_form #office\\.cityName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_employee_form #office\\.cityName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
			jQuery('#edit_employee_form_inline #office\\.cityName').append(jQuery('<option>',{
					value:"",
					text:"None"
			}));
var employee_uniqueArr_office=[];
			
				jQuery.each(data, function(i,key){  
				key.cityName=htmlDecode(key.cityName);
jQuery('#add_employee_form #office').append(jQuery('<option>',{
					
						value:key.officeCode,
			text:key.cityName
					}));
jQuery('#edit_employee_form #office').append(jQuery('<option>',{
					
						value:key.officeCode,
			text:key.cityName
					}));
					
				jQuery('#add_employee_form #office\\.cityName').append(jQuery('<option>',{
			
			value:key.officeCode,
			text:key.cityName
			}));
				jQuery('#edit_employee_form #office\\.cityName').append(jQuery('<option>',{
			
			value:key.officeCode,
			text:key.cityName
			}));
			jQuery('#fiql_employee_form #office\\.cityName').append(jQuery('<option>',{
			value:key.officeCode,
			text:key.cityName
			}));
			jQuery('#edit_employee_form_inline #office\\.cityName').append(jQuery('<option>',{
			
			value:key.officeCode,
			text:key.cityName
			}));
			
if (employee_uniqueArr_office.indexOf((key.cityName).trim()) === -1) {
                        employee_uniqueArr_office.push((key.cityName).trim());
			$('#employee_Quick_UL #office_filter ul').append('<li><a tabindex="-1" href="javascript:openEmployeeTextSelectBox(\'office\',\''+key.cityName+'\')">'+key.cityName+'</a></li>');
		}
});
							
		$("#fiql_employee_form  #office\\.cityName").multipleSelect({
										selectAll: false
										});
											
			}
	else{
			alert("Error in retriving entities");
		}		
	
	}
	}
	}

						
									
									
									
									
									
						function employee_getFK_creator(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'employee'))
					{		
	if(XMLHttpRequest.status==200)
			{
var employee_uniqueArr_creator = [];
$('#fiql_employee_form #creator.username').empty();
$('#fiql_employee_form #creator\\.username').empty();
$('#employee_Quick_UL #creator_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (employee_uniqueArr_creator.indexOf((key.username).trim()) === -1) {
                        employee_uniqueArr_creator.push((key.username).trim());
				jQuery('#fiql_employee_form #creator.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_employee_form #creator\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#employee_Quick_UL #creator_filter ul').append('<li><a tabindex="-1" href="javascript:openEmployeeTextSelectBox(\''+Employee_thead_creator+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_employee_form  #creator\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
						function employee_getFK_lastModifier(XMLHttpRequest, data, rpcRequest)
{

		if(!checkException(XMLHttpRequest.responseText))
			{
				if(statuscheck(XMLHttpRequest.status,'employee'))
					{		
	if(XMLHttpRequest.status==200)
			{
var employee_uniqueArr_lastModifier = [];
$('#fiql_employee_form #lastModifier.username').empty();
$('#fiql_employee_form #lastModifier\\.username').empty();
$('#employee_Quick_UL #lastModifier_filter ul').empty();
			 	jQuery.each(data, function(i,key){  

                    if (employee_uniqueArr_lastModifier.indexOf((key.username).trim()) === -1) {
                        employee_uniqueArr_lastModifier.push((key.username).trim());
				jQuery('#fiql_employee_form #lastModifier.username').append(jQuery('<option>',{
					
						value:key.userid,
						text:key.username
					}));
					
				jQuery('#fiql_employee_form #lastModifier\\.username').append(jQuery('<option>',{
			
			value:key.userid,
			text:key.username
			}));

		$('#employee_Quick_UL #lastModifier_filter ul').append('<li><a tabindex="-1" href="javascript:openEmployeeTextSelectBox(\''+Employee_thead_lastModifier+'\',\''+key.username+'\')">'+key.username+'</a></li>');
		}
});
						
			$("#fiql_employee_form  #lastModifier\\.username").multipleSelect({
										selectAll: false
										});	
			}
	else{
			alert("Error in retriving entities");
		}		
	 }
	}
	}

									
									
									
function getEmployeeData(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'employee'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#employee_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#employee_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);				
				employeeTableRowData=data;
				Employeeflag=employeeTableRowData.length;	
       
				employeeViewTable();
				// $("#employee_pagination_totalRecord").text("Total Records : "+employeeTable.fnSettings().fnRecordsDisplay());
				$("#employee_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
				//window.setTimeout(function(){},1000);					
				
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}

function getEmployeeDataPagination(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'employee'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
				// $('#employee_pagination_totalRecord').text(pagination_totalRecords+data.length);
				$('#employee_pagination_totalRecord').text(TOTAL_COUNT_TEXT_VAR);
				employeeTableRowData=data;
				Employeeflag=employeeTableRowData.length;	
				employeeTable.fnClearTable();
				employeeViewTable();
                //employeeTable.fnAddData(data);		
				// $("#employee_pagination_totalRecord").text("Total Records : "+employeeTable.fnSettings().fnRecordsDisplay());
				$("#employee_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
	
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
function  employeeViewTable(){
	
		$('#employee_grid').html( '<table  cellpadding="0" cellspacing="0" border="0" class="display mytb table table-striped table-bordered" id="employee_grid_view" style="cursor: pointer;"></table>' );
	
				jQuery('#employee_grid_view thead tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TH, this.childNodes[0] );
				});

				jQuery('#employee_grid_view tbody tr').each( function () 
				{
						this.insertBefore(VIEW_DETAIL_SPAN_TD.cloneNode( true ), this.childNodes[0] );
				});
				
				
		    
	
		
		employeeTable=jQuery('#employee_grid_view').dataTable(
		{	
			"bFilter":true,
			"bScrollCollapse": true,
			"bAutoWidth":true,
			"bPaginate": false,
			"sDom":'Rlftrip',
			"bJQueryUI": true,		
			"aaData": employeeTableRowData,
			"bSort":false,
			"aoColumns": [
			
			
				
													
				                     									    			     											
															{"sTitle":Employee_thead_email,"mData":"email","bVisible":true,"contextid":"email","mRender":ellipsis,"contextType":"email"},
																					
						
					
			      			      			       					
						
								
								    									
				  				
                   									
				                     									    			      		{"sTitle":Employee_thead_office,"mData":"office.cityName","contextid":"office","mRender":ellipsis,"contextType":"office.cityName"},
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Employee_thead_firstName,"sClass":"hidden-480","mData":"firstName","bVisible":true,"contextid":"firstName","mRender":ellipsis,"contextType":"firstName"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Employee_thead_jobTitle,"sClass":"hidden-480","mData":"jobTitle","bVisible":true,"contextid":"jobTitle","mRender":ellipsis,"contextType":"jobTitle"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Employee_thead_lastName,"sClass":"hidden-480","mData":"lastName","bVisible":true,"contextid":"lastName","mRender":ellipsis,"contextType":"lastName"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Employee_thead_extension,"sClass":"hidden-480","mData":"extension","bVisible":true,"contextid":"extension","mRender":ellipsis,"contextType":"extension"},
																					
						
					
			      			      			       					
						
								
								    									
				                     									    			     											
															{"sTitle":Employee_thead_reportsTo,"sClass":"hidden-480","mData":"reportsTo","bVisible":true,"contextid":"reportsTo","mRender":ellipsis,"contextType":"reportsTo"},
																					
						
					
			      			      			       					
						
								
								    									
				                     																						  {"sTitle":Employee_thead_creator,"sClass":"hidden-480","mData":"creator.username","contextid":"creator","contextType":"creator.username"},
																	
						
								
								    									
				                     				    											  {"sTitle":Employee_thead_lastModifier,"mData":"lastModifier.username","sClass":"hidden-480","bVisible":false,"contextid":"lastModifier","mRender":ellipsis,"contextType":"lastModifier.username"}, 																	
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Employee_thead_modifiedTime,"sClass":"hidden-480","mData":"modifiedTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"modifiedTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    									
				                     				    				      			     			     
												  					{"sTitle":Employee_thead_createdTime,"sClass":"hidden-480","mData":"createdTime","mRender": function (data, type, full) 
								{				
									return localizeDateTimeString(new Date(data),dateFormat);
								},"bVisible":false,"contextid":"createdTime", "contextType":"datetime"},
																				
						
					
			      			      			       					
                   
                   				
								    											
							{ "sTitle":"Action","sClass":"Action","sWidth":"14%","bSortable": false, "aTargets": [ 0 ] ,"mRender": addcommentFileCountemployee
							}
							
							
						]									

			} );	
			jQuery('#employee_grid .dataTables_scrollBody').addClass( "inline_edit_table" );
			employeeContextMenu();
			$('#employee_grid_view tbody tr td #employee_details_act').die();
				$('#employee_grid_view tbody tr td #employee_details_act').live('click', function (){
			var row = $(this).closest('tr').get(0);
			var aPos = employeeTable.fnGetPosition( row );
			var aData = employeeTable.fnGetData( aPos );
			employeeresultid=aData.employeeNumber;
										
								sendGETRequest(context+"/rest/Employee/auditSearch?id="+employeeresultid+"&date="+new Date(),"get_employee_history_data_callback","","");
							openDetailScreen('employee');
				$("#details_view_employee").html(ellipsis(aData.lastName));
					 window.setTimeout(function () {
				$('#details_employee_div span').each(function() {
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
		$('#employee_grid_view tbody tr td #employee_delete_act').die();
		$('#employee_grid_view tbody tr td #employee_delete_act').live( 'click' , function () {
			var row = $(this).closest('tr').get(0);
			var aPos = employeeTable.fnGetPosition( row );
			var aData = employeeTable.fnGetData( aPos );
			var tableNameData=replaceUnderscore('employee');
			// commonDialogBox("Do you want to delete the "+tableNameData+" record ?","deleteEmployeeEntity()"); 	
			$('#employee_delete_dialog').modal('show');
			// $("#employee_delete_dialog .modal-body" ).html("Do you want to delete the "+tableNameData+" record ?");
			$("#employee_delete_dialog .modal-body img").attr("src", getImagePath('warning-icon.png'));
			$("#employee_delete_dialog .modal-body span").html(getConfirmDeleteText(tableNameData.toLowerCase()));
			employeeid=aData.employeeNumber;
		});

				$('#employee_grid_view tbody tr td #employee_edit_act').die();
		$('#employee_grid_view tbody tr td #employee_edit_act').live('click', function (){ 
			
 										
																										
						
															
																																																																																																																														var row = $(this).closest('tr').get(0);
			var aPos = employeeTable.fnGetPosition( row );
			var aData = employeeTable.fnGetData( aPos );
			
																																																																																																																										
				
														
																																	
								
																			
			
			js2form(document.getElementById('edit_employee_form'),aData,".","",true);
			
			
		employeeid=aData.employeeNumber;				
		openEditScreen('employee');	
		
		
		window.setTimeout(function(){
		 																																																														},500);	
		
			
								
					
			
		});
		$('#employee_grid_view tbody td').die();
			$('#employee_grid_view tbody td').live('dblclick', function () { // previous click
if(update_Employee_permission){
	var array=new Array();
	var visibleLength=0;
		$('#employee_grid_view tbody tr').each(function() {
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
         
	for(i=0;i<employeeTable.fnSettings().aoColumns.length;i++){
			if(employeeTable.fnSettings().aoColumns[i].bVisible){
				array.push(employeeTable.fnSettings().aoColumns[i].sTitle)
			}
	}
	var nTr = $(this).parents('tr')[0];
	var oSettings=employeeTable.fnSettings()

	if(!$(this).hasClass("details")&&array[$(this).index()]!="Action"){
		if(employeeoldnTr!=nTr && employeeoldnTr!=null)
		{employee_inline_edit=false;
			employeeTable.fnClose( employeeoldnTr );
		}
		if(employeeTable.fnIsOpen(nTr)){
				employeeTable.fnClose( employeeoldnTr );
			employee_inline_edit=false;						employeeTable.fnDraw();					
		}
		else{
			
			employeeoldnTr=nTr;
			employeeTable.fnOpen( nTr,inline_employeeTable(), 'details' );
			$('.table-condensed tbody').click(function(){
		$('.datepicker-dropdown').css('display','none');
		});
			refreshAllFkEmployeeList();
			var aData = employeeTable.fnGetData( nTr );
			employee_inline_edit=true;	
			
									
												
		
							window.setTimeout(function(){
																																																																																																																						js2form(document.getElementById('edit_employee_form_inline'),aData,".","",true);
						},6000);
			employeeTable.fnDraw();					
			$('#edit_employee_form_inline').validationEngine();
			$('#edit_employee_form_inline .editdatetype').daterangepicker({singleDatePicker: true, format:dateFormat });
			$('#edit_employee_form_inline .editdatetimetypeclass').datetimepicker({language: 'pt-BR', format:dateTimeFormat
		});
	}
	return false;}} });
function inline_employeeTable()
{    
	var sOut = '<div style="width:100%"><form class="form-horizontal" id="edit_employee_form_inline" align="center"><input type="hidden" name="employeeNumber" id="employeeNumber"> <div class="span4">   <div class="control-group"> <label class="control-label" for="email"> '+ Employee_lable_email+' </label> <div class="controls">  <input type="text" name="email" id="email"  class="alphanumericallowspecial validate[required,maxSize[100] ]" />  </div></div>     <div class="control-group"> <label class="control-label" for="officeCode"> '+ Employee_lable_office+' </label> <div class="controls">  <select name="office.officeCode" id="office.cityName" value="office.officeCode" class="validate[required]"></select> </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="firstName"> '+ Employee_lable_firstName+' </label> <div class="controls">  <input type="text" name="firstName" id="firstName"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="jobTitle"> '+ Employee_lable_jobTitle+' </label> <div class="controls">  <input type="text" name="jobTitle" id="jobTitle"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>  </div>   <div class="span4">   <div class="control-group"> <label class="control-label" for="lastName"> '+ Employee_lable_lastName+' </label> <div class="controls">  <input type="text" name="lastName" id="lastName"  class="alphanumericallowspecial validate[required,maxSize[50] ]" />  </div></div>    <div class="control-group"> <label class="control-label" for="extension"> '+ Employee_lable_extension+' </label> <div class="controls">  <input type="text" name="extension" id="extension"  class="alphanumericallowspecial validate[required,maxSize[10] ]" />  </div></div>  </div>      <input type="hidden" class="hide" name="reportsTo" id="reportsTo"/>  <input type="hidden" class="hide" name="creator.userid" id="creator.username" value=""/>   <input type="hidden" class="hide" name="lastModifier.userid" id="lastModifier.username" value=""/>    <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="modifiedTime" value="" readonly/></div>   <input type="hidden" class="hide" name="modifiedTime" id="modifiedTime"/>   <div class="input-append date editdatetimetypeclass" data-date-format="yyyy-mm-dd" ><input class="span2 timetype  hide" size="16" type="hidden" id="createdTime" value="" readonly/></div>   <input type="hidden" class="hide" name="createdTime" id="createdTime"/><div class="span11" align="right"><button type="button" class="btn btn-mini btn-info" onclick="edit_employee(\'edit_employee_form_inline\')"><!--<i class="icon-save bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Employee_formUpdate+'</span></button><button class="btn btn-mini btn-info" onclick="closeInlineEmployeeGridRow()" style="margin-left: 10px;" type="button"><!--<i class="icon-level-up bigger-110"></i>--><span class="bigger-110 no-text-shadow">'+Employee_formCancel+'</span></button></div></form></div>';

	return sOut;
}

$('#employee_grid_view tbody tr td').die();
$('#employee_grid_view tbody tr td').live( 'hover' , function (e) {
	
	var isDetail = $(this).hasClass('Action');
	var isAction = $(this).hasClass('details');
	try{
		if(!isDetail || !isAction)
		{
			var row = $(this).closest('tr').get(0);
			var aPos = employeeTable.fnGetPosition( row );
			var index=employeeTable.fnGetPosition(this);
			index=index[2];
			var aData = employeeTable.fnGetData( aPos );
			var jsonKey=employeeTable.fnSettings().aoColumns[index].contextType
			
			
			var tooltiptext=eval("aData."+jsonKey);
			if(jsonKey=="datetime"){					
				jsonKey=employeeTable.fnSettings().aoColumns[index].mData;
				tooltiptext=eval("aData."+jsonKey);
			
				tooltiptext=localizeDateTimeString(new Date(tooltiptext),dateFormat);
			}
			else if(jsonKey=="date"){
				jsonKey=employeeTable.fnSettings().aoColumns[index].mData;
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
		function employeeContextMenu(){
		
		var oTable = $('#employee_grid_view').dataTable();
			var settings=oTable.fnSettings();
		var bVis=false;
			var temp;
		      for( var i = 0; i<settings.aoColumns.length; i++)
			{
				
				
				bVis = settings.aoColumns[i].bVisible;
				
				if(bVis==true)
				{
					temp=settings.aoColumns[i].contextid+'chk_employee';					
					$('#'+temp).attr('checked', true);
				}
				else{
				temp=settings.aoColumns[i].contextid+'chk_employee';					
					$('#'+temp).attr('checked', false);
				
				}
			}	
		}
	function employee_fnShowHide(colname,contextid)
			{
			 
			 colname = eval(colname);
				$('#employeequickFilterDiv').css('display','none');
				$('#employeequickFilter').val('');
				var oTable = $('#employee_grid_view').dataTable();
				var index=getIndexOfTableByName(oTable.fnSettings(),colname);
				var bVis = oTable.fnSettings().aoColumns[index].bVisible;
				oTable.fnSetColumnVis( index, bVis ? false : true );
			}
		
	function delete_employee_callback(XMLHttpRequest, data, rpcRequest){
	RemoveUniqueLoading();
			if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'employee'))
					{	
		if(XMLHttpRequest.status==204)
			{		//openListScreen('employee');
					$('#MsgBoxBack').css("display","none");
					getemployeeTotalCount();
					refreshAllEmployeeList();
					employeeTable.fnDraw();					
					showCenteredLoading(employee_success_delete);
				
			}
		else{
			alert("Error in retriving entities");
			}		
		}
		}
		}	
	
	
	function create_employee(id){
	removeAllInstanceOfEditor();
						var email=$('#'+id+' #email').val();
				var office=$('#'+id+' #office\\.cityName').val();
						var firstName=$('#'+id+' #firstName').val();
						var jobTitle=$('#'+id+' #jobTitle').val();
						var lastName=$('#'+id+' #lastName').val();
						var extension=$('#'+id+' #extension').val();
						var reportsTo=$('#'+id+' #reportsTo').val();
					var createEmployeeJsonString = "{";
					if(hasValue(email))
			createEmployeeJsonString += "\"email\":\""+email+"\",";
			  			if(hasValue(office))
			createEmployeeJsonString+="\"office\":{\"officeCode\":\""+office+"\"},";
			 			if(hasValue(firstName))
			createEmployeeJsonString += "\"firstName\":\""+firstName+"\",";
			 			if(hasValue(jobTitle))
			createEmployeeJsonString += "\"jobTitle\":\""+jobTitle+"\",";
			 			if(hasValue(lastName))
			createEmployeeJsonString += "\"lastName\":\""+lastName+"\",";
			 			if(hasValue(extension))
			createEmployeeJsonString += "\"extension\":\""+extension+"\",";
			 			if(hasValue(reportsTo))
			createEmployeeJsonString += "\"reportsTo\":\""+reportsTo+"\",";
			     		createEmployeeJsonString=createEmployeeJsonString.substring(0, (createEmployeeJsonString.length-1));
		createEmployeeJsonString+="}";

window.setTimeout( function(){},500 );
	if(jQuery('#'+id).validationEngine('validate'))
		{
		
			var formData =createEmployeeJsonString;
			
					
		
		var jsons="";
	if(!(employee_no_address==0))
	{
		
		if(!(jsonvariable==""))
	{jsons=jsonvariable.split('|');
	
	
	
	for(var i=0;i<jsons.length;i++)
	{
	formData =  mergeTwoJSON(formData, jsons[i]);
	}
		
	if((employee_no_address==jsons.length))
		{//alert("string ..................."+JSON.stringify(formData));
		sendPOSTRequest(context+"/rest/Employee/create/",formData,"create_employee_callback","");
	}
	}else
	{
										
																			
				
									var addressRequired=0;
	if(addressRequired==0)
	{sendPOSTRequest(context+"/rest/Employee/create/",formData,"create_employee_callback","");
	}else
	{showErrorLoading("Address is required");		
	}
	
	
	}}else
	{
	sendPOSTRequest(context+"/rest/Employee/create/",formData,"create_employee_callback","");
	}	
		jsonvariable="";
		
		
	
		}
		
		}
		
		function create_employee_callback(XMLHttpRequest, data, rpcRequest){
		RemoveUniqueLoading();
					if(!checkException(XMLHttpRequest.responseText))
			{	
			if(statuscheck(XMLHttpRequest.status,'employee'))
					{
		if(XMLHttpRequest.status==200)
			{		//openListScreen('employee');
					getemployeeTotalCount();
					refreshAllFkEmployeeList();
					refreshAllEmployeeList();
					employeeTable.fnDraw();					
					showCenteredLoading(employee_success_create);
				
			}
		else{
			alert("Error in retriving entities");
			}	
			}	
		}
		}	

	function edit_employee(form){
	removeAllInstanceOfEditor();
	var employeeNumber=$('#'+form+' #employeeNumber').val();
  		var email=$('#'+form+' #email').val();
		var office=$('#'+form+' #office\\.cityName').val();
  		var firstName=$('#'+form+' #firstName').val();
  		var jobTitle=$('#'+form+' #jobTitle').val();
  		var lastName=$('#'+form+' #lastName').val();
  		var extension=$('#'+form+' #extension').val();
  		var reportsTo=$('#'+form+' #reportsTo').val();

		var editEmployeeJsonString = "{";
		if(hasValue(employeeNumber))
		editEmployeeJsonString += "\"employeeNumber\":\""+employeeNumber+"\",";
		if(hasValue(email))
		editEmployeeJsonString += "\"email\":\""+email+"\",";
 		if(hasValue(employeeNumber))
		editEmployeeJsonString += "\"employeeNumber\":\""+employeeNumber+"\",";
 		if(hasValue(office))
		editEmployeeJsonString+="\"office\":{\"officeCode\":\""+office+"\"},";
		 		if(hasValue(firstName))
		editEmployeeJsonString += "\"firstName\":\""+firstName+"\",";
 		if(hasValue(jobTitle))
		editEmployeeJsonString += "\"jobTitle\":\""+jobTitle+"\",";
 		if(hasValue(lastName))
		editEmployeeJsonString += "\"lastName\":\""+lastName+"\",";
 		if(hasValue(extension))
		editEmployeeJsonString += "\"extension\":\""+extension+"\",";
 		if(hasValue(reportsTo))
		editEmployeeJsonString += "\"reportsTo\":\""+reportsTo+"\",";
     		
		editEmployeeJsonString=editEmployeeJsonString.substring(0, (editEmployeeJsonString.length-1));
		editEmployeeJsonString+="}";
if(jQuery('#'+form).validationEngine('validate'))
		{
		var formData =editEmployeeJsonString;
					
			
		if(!(employee_no_address==0))
	{
		
		if(employee_inline_edit)
	{
	if(!( employee_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  employee_creator_inline);
	}										
																			
				
										sendPUTRequest(context+"/rest/Employee/update/",formData,"edit_employee_callback","");
		
		employee_inline_edit=false;
employee_creator_inline=="";
								
																			
				
										}else{
		
		
		var jsonsfieldname=editjsonvariable.split('|');
		
		if(jsonsfieldname == "")
		{	
																		
																																															
												
																										
		
			sendPUTRequest(context+"/rest/Employee/update/",formData,"edit_employee_callback","");
		
			
			}else{
				if(jsonsfieldname.length==employee_no_address)
				{
					var jsons=jsonvariable.split('|');
					for(var i=0;i<jsons.length;i++)
					{
					formData =  mergeTwoJSON(formData, jsons[i]);
					}
					sendPUTRequest(context+"/rest/Employee/update/",formData,"edit_employee_callback","");
		
				editjsonvariable="";
				jsonvariable="";
				}
				else{
					var jsons=jsonvariable.split('|');
																					
																																															
												
																													sendPUTRequest(context+"/rest/Employee/update/",formData,"edit_employee_callback","");
		
						editjsonvariable="";
				jsonvariable="";
				
																
																																	
								
																				}
				
				
				
				
				}
		
		
		
		
		
		
			
			
		}}else{
			if(!( employee_creator_inline==""))
	{	formData =  mergeTwoJSON(formData,  employee_creator_inline);
	}	
		employee_inline_edit=false;
employee_creator_inline=="";

			sendPUTRequest(context+"/rest/Employee/update/",formData,"edit_employee_callback","");
		
			}
		
		
		
		
		}
		}
	function edit_employee_callback(XMLHttpRequest, data, rpcRequest)
		{
		RemoveUniqueLoading();
						
	if(!checkException(XMLHttpRequest.responseText))
			{
			if(statuscheck(XMLHttpRequest.status,'employee'))
					{	
			if(XMLHttpRequest.status == 200)
				{	
					//openListScreen('employee');
					refreshAllEmployeeList();
					employeeTable.fnDraw();					
					showCenteredLoading(employee_success_update);
				}
				else{
						alert("error");
					}
					}
				}
		}
	function searchEmployeeData(formId)
	{
	$('#employeepagenovalue').html(1); 
	uperLimit=eval($('#employee_pagination_value').val());
	pageulimit=uperLimit-1;
	pagellimit=DEFAULT_PAGE_LOWERLIMIT;
	$('#employee_pagination #employee_page_llimit').val(pagellimit);
	$('#employee_pagination #employee_page_ulimit').val(pageulimit);	
		
	
			showRegularLoading();
				employeeSortByHighLightSelectedHeader('employee');
				var fiql=searchDataByFIQL(formId);
				
				fiqlEmployeeParam=fiql;
				sendGETRequest(context+"/rest/Employee/search"+fiql+"&date="+new Date(),"getfiql_employee_data","","");
	window.setTimeout(function(){
			setSort('employee',$("#fiql_employee_form #sort_employee").val());
			setDefaultTypeSorting('employee',"sort_type_employee");
			},1000);	
   $("#fiql_employee_form .ms-choice>span").each(function() {$( this ).text('All');});
	}
	
	function getfiql_employee_data(XMLHttpRequest, data, rpcRequest){
		if(!checkException(XMLHttpRequest.responseText))
			{	
	if(XMLHttpRequest.status==200)
			{
			    $("#employeefilterTab").slideUp();
				employeeTableRowData=data;
				Employeeflag=employeeTableRowData.length;	
				var employee_pagination_value=$("#employee_pagination_value").val();
				$("#employee_pagination  #content").text(pagination_showing + " " + 1 + " " + pagination_to + " " + ( employee_pagination_value) + " " + pagination_entries + " ");				
				employeeViewTable();
				employeeTable.fnDraw();	
				// $("#employee_pagination_totalRecord").text("Total Records : "+employeeTable.fnSettings().fnRecordsDisplay());
				$("#employee_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);		
			}
			}
	
	}
	


function employeeHistoryTable(data){
	
	$("#employee_history_tabdiv").empty();

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

			$("#employee_history_tabdiv").append("<div class='itemdiv commentdiv'><div class='body' style='margin-left: 10px;'><div class='name'><a href='javascript:void(0);'>"+name+"</a></div><div class='time' style='float: right;'><i class='icon-time'></i><div class='red' style='display: inline;'> "+time+"</div></div><div class='text' style='word-wrap: break-word;max-width:100%;color: #6b6b6b;'>"+message+"</div></div>"+"</div>");
		}
	}
	else {
		 $("#employee_history_tabdiv").append("<ul id='employee_history' class='item-list ui-sortable'><li>No History to show</li></ul>");
	}
}

function get_employee_history_data_callback(XMLHttpRequest, data, rpcRequest) {
	if(!checkException(XMLHttpRequest.responseText)) {
		if(statuscheck(XMLHttpRequest.status,'employee')) {
			if(XMLHttpRequest.status == 200) {
				employeeTableRowData=data;
				employeeHistoryTable(data);				
			}
		}
	}	
}

						
												
		
				function employee_set_table_value_id(id)
{
table="employee";
hiddenid=id;
}
function deleteEmployeeEntity(){
	if(hasValue(employeeid)){
				sendDELETERequest(context+"/rest/Employee/delete/"+employeeid,"","delete_employee_callback","");
			}
}	


var jsonvariableonetomany="";

function resetAllModalWindowPagesForEmployee()
	{
				}

function openEmployeeListScreen(div_id)
{
removeAllInstanceOfEditor();
if(hasValue(check_list_view_screen)){
check_list_view_screen=false;
			openListScreen('employee');
			var orderbycall= $('#fiql_employee_form #sort_employee').val();
			var ordertypecall= $('#fiql_employee_form #sort_type_employee').val();
			if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";	
			sendGETRequest(context+"/rest/Employee/search?date="+new Date()+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit="+DEFAULT_PAGE_UPPERLIMIT+"&llimit="+DEFAULT_PAGE_LOWERLIMIT+"&date="+new Date(),"getEmployeeData","");
		}		
		else
		{
			if(check_elastic_view_screen)
			{
				check_elastic_view_screen=false;
				refreshAllEmployeeList();
			}
			if(!$("#list_employee_div").is(':visible')){
			openListScreen(div_id)
		}
		}	
}


								
function getEmployeeDataEditCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
					{	
			if(!checkException(XMLHttpRequest.responseText))
			{	
		if(XMLHttpRequest.status==200)
			{
		
		setDataInEditFromViewEmployee(data);
		
			}
		else
		{
		alert("error in data");
		}
		}		
	}
}
 
 function setDataInEditFromViewEmployee(data){
 
 
 										
																										
						
																																																																																																																																							
																																																																																																																										
				
														
																																	
								
																 	
				
		js2form(document.getElementById('edit_employee_form'),data[0],".","",true);
		
		// employeeid=aData.employeeNumber;		
		openEditScreen('employee');
		
		window.setTimeout(function(){
		 																																																														},500);	
 
 }

function ViewEditemployee() {
	employeeid = employeeresultid;	sendGETRequest(context+"/rest/Employee/search?_s=employeeNumber=="+employeeresultid+"&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0&date="+new Date(),"getEmployeeDataEditCallBack","");
}

/*function to open quick filter for text field*/
var employeeSearchIndex="";
function openEmployeeTextField(colName){
		employeeSearchIndex =  get_column_number_For_Quick_Filter(colName,'employee');
	showQuickFilterDiv(employeeSearchIndex,'employee',colName);
	$("#employeequickFilterDiv").css("display","");
	$("#employeequickFilter").focus();
	$("#employeequickFilter").keyup( function () {
		
			   employeeTable.fnFilter( this.value,employeeSearchIndex );
			   // $("#employee_pagination_totalRecord").text("Total Records : "+employeeTable.fnSettings().fnRecordsDisplay());
			   $("#employee_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
			} );
	}
function openEmployeeTextSelectBox(colName,val){
	$("#employeequickFilterDiv").css("display","none");
	employeeSearchIndex =  get_column_number_For_Quick_Filter(colName,'employee');
	
    employeeTable.fnFilter( val, employeeSearchIndex );
	// $("#employee_pagination_totalRecord").text("Total Records : "+employeeTable.fnSettings().fnRecordsDisplay());
	$("#employee_pagination_totalRecord").text(TOTAL_COUNT_TEXT_VAR);
			
	}
	


/*function  to get total count of entity Employee*/
function getemployeeTotalCount()
{
	sendGETRequest(context+"/rest/Employee/totalCount?date="+new Date(),"getemployeeTotalCountCallBack","");
}
	
/*Call back  of get total count of entity Employee*/
function getemployeeTotalCountCallBack(XMLHttpRequest, data, rpcRequest)
{
	if(statuscheck(XMLHttpRequest.status,'request'))
	{	
		if(!checkException(XMLHttpRequest.responseText))
			{	
			if(XMLHttpRequest.status==200)
			{
				// $('#employee_totalCount').html(" / "+data);
				$('#employee_totalCount').html(data);
			}
			else
			{
				alert("Error in data");
			}
		}		
	}
}


