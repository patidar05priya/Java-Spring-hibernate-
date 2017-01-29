var remembermecounter=0;
var csrfCookieTime="";

//this function is for show the select box of date in fitler form
function openSelectBox(openbox,closedbox)
{
	$('.'+openbox).css('display','block');
	$('.'+closedbox).css('display','none');
}
				
// this function is for DatePlugin
function checkDatePlugin(value, id, tablename) {
    var fieldId = id.split("-")[0];

    if (value == "between") {
        $('.' + fieldId + 'SelectBox').css('display', 'none');
        $('.' + fieldId + 'BetweenDate').css('display', '');
        $('#' + tablename + 'filterTab .' + fieldId + 'BW').daterangepicker({
            format: dateFormat
        });
    }

    if (value == "specific" || value == "before" || value == "after") {
        $('.' + fieldId + 'SelectBox').css('display', 'none');
        $('.' + fieldId + 'OneDate').css('display', '');

        $('#' + tablename + 'filterTab .' + fieldId + 'OneDate .dateinput').attr("value", TodayDate);
        $('#' + tablename + 'filterTab .' + fieldId + 'OneDate .dateinput').daterangepicker({
            singleDatePicker: true,
            format: dateFormat
        });
        //$('#'+tablename+'filterTab .'+fieldId+'OneDate').datepicker("show");
        $('.datepicker-days .table-condensed tbody').click(function() {
            $('.datepicker-dropdown').css('display', 'none');
        });
    }
}


Date.prototype.yyyymmdd = function () {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
   var dd = this.getDate().toString();

   return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};

/* Glitter loading code start*/
/*This function is to show regular loading*/
function showRegularLoading(){
	/*	uniqueid =  $.gritter.add({
		text: 'Please wait...',
		sticky: false,
		class_name:'gritter-inheader',
		image: '../images/loader.gif'
	});*/
	return false;
}

/*This function is to show Sticky loading*/
function showStickyLoading() {
    var unique_id = $.gritter.add({
        title: 'This is a sticky notice!',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="red">magnis dis parturient</a> montes, nascetur ridiculus mus.',
        //image: $path_assets+'/avatars/avatar.png',
        sticky: true,
        time: '',
        class_name: 'gritter-info'
    });
    return false;
}

/*This function is to show  loading without image*/
function showImageLoading() {
    $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: 'This is a notice without an image!',
        // (string | mandatory) the text inside the notification
        text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="orange">magnis dis parturient</a> montes, nascetur ridiculus mus.',
        class_name: 'gritter-success'
    });

    return false;
}

/*This function is use to cenetered loading*/
function showCenteredLoading(text) {
    if (text != "Null values not allowed") {
        $.gritter.add({
            title: text,
            //text: 'Just add a "gritter-center" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
            class_name: 'gritter-success gritter-top-left',
            time: 3000
        });
    }
    return false;
}

/*This function is to show  loading with max of 3 on screen*/
function showMaxLoading() {
	$.gritter.add({
		title: 'This is a notice with a max of 3 on screen at one time!',
		text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="green">magnis dis parturient</a> montes, nascetur ridiculus mus.',
		//image: $path_assets+'/avatars/avatar3.png',
		sticky: false,
		before_open: function(){
			if($('.gritter-item-wrapper').length >= 3)
			{
				return false;
			}
		},
		class_name: 'gritter-warning' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
	});
	return false;
}

/*This function is to show  loading with max of 3 on screen*/
function showErrorLoading(text) {
	if(text!="Null values not allowed") {
		$.gritter.add({
			title: text,
			text: '',
			//image: $path_assets+'/avatars/avatar3.png',
			sticky: false,
			
			class_name: 'gritter-warning gritter-top-left'
		});
	}
	return false;			
}

/*This function is use to warning loading notification*/
function showNotificationLoading(){
	
$.gritter.add({
						title: 'This is a warning notification',
						text: 'Just add a "gritter-light" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
						class_name: 'gritter-error' 
					});
			
					return false;
			
			
}
/*This function is use to remove all loaders*/
function RemoveAllLoading(){
$.gritter.removeAll();
return false;			
}
/*This function is remove specific loaders*/
function RemoveUniqueLoading(){
/*$.gritter.remove(uniqueid, { 
						fade: true, // optional
						speed: 'medium' // optional
					});*/
				}

/* Glitter loading code end*/

function ellipsis(text){
	if(!hasValue(text)){
			text="";
			}
	if(BrowserDetect.browser == "Explorer" || BrowserDetect.browser == "Mozilla" /* For IE 11 */){
		var val = text+"";
		if(val!=null && val.length>10){
			return val.substring(0,10)+"...";
		}
		else{
			return val+"";
		}
	}
	else
	{
		return text+"";
	}
}

function ellipsistext(text){
	if(!hasValue(text)){
			text="";
			}
	
		var val = text+"";
		if(val!=null && val.length>10){
			return val.substring(0,10)+"...";
		}
		else{
			return val+"";
		}
	
}



function logout()
{
   logoutform.submit();
}

/*generic function to check the ajax response*/

function isAuthorize(rpcResponse, data, rpcRequest, callbackFunc)
{
   try
   {
      if (hasValue(rpcResponse.responseText))
      {
         var sessionString = rpcResponse.responseText.substring(0, 30);

         if (sessionString.indexOf("<!DOCTYPE HTML>") == 0)
         {

            window.location.href = context + "/jsp/login.jsp";
            return false;
         }
      }

      if (rpcResponse.status == 0)
      {
         showErrorLoading(logout_failure_message);
         return false;
      }

      if (rpcResponse.status == 403)
      {
         showErrorLoading(access_failure_message);
         return false;
      }

      if (rpcResponse.status == 500)
      {
         showErrorLoading(gettingDetails_Error);
         return false;
      }
      else if (rpcResponse.status == 404)
      {
         showErrorLoading(gettingDetails_Error);
         return false;
      }
      else if (rpcResponse.status == 401)
      { /*Session expire message*/
         showErrorLoading(gettingDetails_Error);
         return false;
      }
   }
   catch (e)
   {}
   return true;
}

function setCsrfCookie()
{
	currentTime=new Date();
	
	if((currentTime-csrfCookieTime) >10000)
	{
	document.cookie="csrfParam="+Math.random().toString(36).substring(7)+";Path="+csrfCookiePath+";";
	csrfCookieTime=new Date();
	}
}

function getCookieClosePortal()
{
	var csrfCookie = document.cookie;

	
	if(hasValue(csrfCookie))
	{
		return getCookieValue('csrfParam')
	}
	return '';
}
/*send json request*/

function sendPOSTRequest(url, jsonParams, callbackFunc, addlParam)
{
	setCsrfCookie();
  showRegularLoading();
   $.ajax(
   {
      type: "POST",
      url: url,
       headers:{"csrfParam":getCookieClosePortal()},
      beforeSend:function(){updateRememberMetoken();ajaxCounter = ajaxCounter + 1;showMainLoading(); return true;},
      complete:function(){ajaxCounter = ajaxCounter - 1;showMainLoading();},
      contentType: "application/json; charset=utf-8",
      dataType: "application/json",
      data: jsonParams,
      error: function (XMLHttpRequest, textStatus, errorThrown)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      },
      success: function (data, status, request)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      }
   });
}

/*send json request*/

function sendPUTRequest(url, jsonParams, callbackFunc, addlParam)
{
	setCsrfCookie();
	showRegularLoading()
   $.ajax(
   {
      type: "PUT",
      url: url,
      headers:{"csrfParam":getCookieClosePortal()},
      beforeSend:function(){updateRememberMetoken();ajaxCounter = ajaxCounter + 1;showMainLoading(); return true;},
      complete:function(){ajaxCounter = ajaxCounter - 1;showMainLoading();},
      contentType: "application/json; charset=utf-8",
      dataType: "application/json",
      data: jsonParams,
      error: function (XMLHttpRequest, textStatus, errorThrown)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      },
      success: function (data, status, request)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      }
   });
}


/*this function is to show the loading bar at the top*/

function showLoading()
{
   $('#loading-bar').html("<div class='nav alert' style='margin-top:20px'><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></div>");
   $('#loading-bar').show();
 	hideLoading();
}

/*this function is to hide the loading*/

function hideLoading()
{
   $('#loading-bar').fadeOut(10000);
}

/*this function is to show the warning*/

function showWarning(msg)
{
   $('#loading-bar').html("<div class='nav alert alert-warning' style='margin-top:20px'><button type='button' class='close' data-dismiss='alert'><i class='icon-remove'></i></button><strong>Warning: </strong>" + msg + "<br></div>");
   $('#loading-bar').show();
   hideLoading();
 
}

/*this function is to show the success message*/

function showSuccessMessage(msg)
{
   $('#loading-bar').html("<div class='nav alert alert-success' style='margin-top:20px'><button type='button' class='close' data-dismiss='alert'><i class='icon-remove'></i></button><strong>Successful: </strong>" + msg + "<br></div>");
   $('#loading-bar').show();
   hideLoading();

}

/*this function is to show the failure message*/

function showFailureMessage(msg)
{
   $('#loading-bar').html("<div class='nav alert alert-error' style='margin-top:20px'><button type='button' class='close' data-dismiss='alert'><i class='icon-remove'></i></button><strong>Error: </strong>" + msg + "<br></div>");
   $('#loading-bar').show();
	hideLoading();
}

/*this function is to show the message*/

function showMessage(msg)
{
   $('#loading-bar').html("<div class='nav alert alert-info' style='margin-top:20px'><button type='button' class='close' data-dismiss='alert'><i class='icon-remove'></i></button><strong>Message: </strong>" + msg + "<br></div>");
   $('#loading-bar').show();
   hideLoading();

}
function updateRememberMetoken()
{
	if(remembermecounter>=30)
	{
		 $.ajax(
   {
      type: "GET",
      url: context + "/rest/Users/isUserAvailable",
      
      error: function ()
      {
         
      },
      success: function ()
      {
         
      }
   });
		
	}
	remembermecounter=0;
}

function showDefaultMessage(msg)
{
   $('#loading-bar').html("<div class='nav alert alert-info' style='margin-top:20px'><button type='button' class='close' data-dismiss='alert'></button><strong></strong>" + msg + "<br></div>");
   $('#loading-bar').show();
   hideLoading();

}

function showMainLoading()
{
	var timer=0;
		window.setTimeout(function(){timer=timer+1;},120000);
	$body = $("body");
	if(ajaxCounter>0){
		$body.addClass("newloading");
		window.setInterval(function(){if(timer>0){$body.removeClass("newloading"); }},600);
		
		}
	else
		$body.removeClass("newloading");  
}

var ajaxCounter = 0;
function sendGETRequest(url, callbackFunc, addlParam, notShowLoading)
{
		setCsrfCookie();
   $.ajax(
   {
      type: "GET",
      url: url,
      headers:{"csrfParam":getCookieClosePortal()},
      beforeSend:function(){ updateRememberMetoken();return true;},
      complete:function(){},
      error: function (XMLHttpRequest, textStatus, errorThrown)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[0], arguments[2].responseText, arguments[2], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      },
      success: function (data, status, request)
      {
         if (isAuthorize(request, status, data, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[2], arguments[0], arguments[1], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      }
   });
}

function sendDELETERequest(url, json, callbackFunc, addlParam)
{
	setCsrfCookie();
	showRegularLoading();
   $.ajax(
   {
      type: "DELETE",
      url: url,
      headers:{"csrfParam":getCookieClosePortal()},
      beforeSend:function(){updateRememberMetoken();ajaxCounter = ajaxCounter + 1;showMainLoading(); return true;},
      complete:function(){ajaxCounter = ajaxCounter - 1;showMainLoading();},
      contentType: "application/json; charset=utf-8",
      dataType: "application/json",
      data: json,
      error: function (XMLHttpRequest, textStatus, errorThrown)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      },
      success: function (data, status, request)
      {
         if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc))
         {
            eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
         }
         else
         {
            return false;
         }
      }
   });
}

function hasValue(val)
{
   return (val != null && val != undefined && val != "null" && val != "undefined" && val != "" && val != "-Please select-");
}

function hasValue(form, fieldId)
{
   if (form == null) return false;
   var val = form.getValue(fieldId);
   return hasValue(val);
}

function hasValue(val)
{
   return (val != null && val != undefined && val != "null" && val != "undefined" && (val != "" || String(val) == "0") && val != "-Please select-");
}


/* This function is for FIQL search operation*/

function searchDataByFIQL(id)
{
   var formData = convertFormDataToJSON(id);
   formData=JSON.stringify(formData);
   formData=formData.replace('\"selectItem\":1,','');
   formData = $.parseJSON(formData);
   return createFiqlQuery(id,formData);
}
function searchDataByFIQLPermission(id)
{

   var formData = convertFormDataToJSON(id);
   return createFiqlPermissionQuery(formData);

}

/* This function is for convertform data into json format */

function convertFormDataToJSON(form)
{
   var jsonObject = form2js(form, '-', true, function (node)
   {

     /* if (node.name && node.id.match(/callbackTest/))
      {
         return {
            name: node.id,
            value: node.innerHTML
         };
      }*/
   }, true);
   return jsonObject;
}

function setTypeSorting(table, value) {
    //eval(table+"SortByHighLightSelectedHeader('"+table+"')");
    var sort = $("#" + table + "filterTab #" + value + "").attr('class');
    
    if (sort == "icon-arrow-up ie-sortby cursor-pointer") { /* btn btn-small */
        $("#" + table + "filterTab #" + value + "").attr('class', 'icon-arrow-down ie-sortby cursor-pointer'); /* btn btn-small */
        $("#fiql_" + table + "_form   #sort_type_value_" + table).val('asc');
    }
    if (sort == "icon-arrow-down ie-sortby cursor-pointer") { /* btn btn-small */
        $("#" + table + "filterTab #" + value + "").attr('class', 'icon-arrow-up ie-sortby cursor-pointer'); /* btn btn-small */
        $("#fiql_" + table + "_form   #sort_type_value_" + table).val('desc');
    }
}

function setDefaultTypeSorting(table, value) {
    var sort = $("#" + table + "filterTab #" + value + "").attr('class');
    $("#" + table + "filterTab #" + value + "").attr('class', 'icon-arrow-up ie-sortby cursor-pointer'); /* btn btn-small */
    $("#fiql_" + table + "_form   #sort_type_value_" + table).val('desc');
}

function setSort(table,value) {
	var sortCheckId=value;
	var oTable=jQuery('#'+table+'_grid #'+table+'_grid_view').dataTable();
	
	$("#fiql_"+table+"_form #sort_"+table+"").val(value);	
	var selectSortby = "";
	selectSortby=$("option:selected",$('#'+table+'SortBy')).text();
	if(hasValue( oTable.fnSettings())){
	var columnLength = oTable.fnSettings().aoColumns.length;
	
	for(var i=0;i<columnLength;i++)
	{
		var colummnTitle = oTable.fnSettings().aoColumns[i].sTitle;
		$(oTable.fnSettings().aoColumns[i].nTh).css("font-weight","");
		$(oTable.fnSettings().aoColumns[i].nTh).css("color","#2298e4");
		if(colummnTitle==selectSortby){
			$(oTable.fnSettings().aoColumns[i].nTh).css("color","#B37607");
			$(oTable.fnSettings().aoColumns[i].nTh).css("font-weight","bold");
		}
	}}
}

// create FIQL query
function createFiqlQuery(formid,formData)
{
   var queryString = "?_s=";
   var queryStr = "?";
   var str=""; 
   var fiql = "";
   var flag = true;
   var browserDetect = BrowserDetect.browser;
   $.each(formData, function (key, value)
   {
	 if(hasValue(value)){
      if (key == "date" && value.indexOf('To'))
      {
         var fromTo = value.split(' To ');
         /*if(fromTo[0]==fromTo[1]){
			queryString += "date" + "=ge=" + formatAsJSONdateFormat(fromTo[0],dateFormat) + ";";
			queryString += "date" + "=le=" + getNextDate(fromTo[1]) + ";"
		  }
		  else {
			queryString += "date" + "=ge=" + formatAsJSONdateFormat(fromTo[0],dateFormat) + ";";
			queryString += "date" + "=le=" + formatAsJSONdateFormat(fromTo[1],dateFormat) + ";"
		  }*/

			/* Defect fixed */
			var ddds=formatAsJSONdateFormat(fromTo[0],dateFormat);	
			ddds = ddds + " 00:00:01";
			ddds = moment(ddds);
			var ddds1=formatAsJSONdateFormat(fromTo[1],dateFormat);	
			ddds1 = ddds1 + " 23:59:59";
			ddds1 = moment(ddds1);
			if(fromTo[0]==fromTo[1]) {
				queryString += key + "=ge=" + ddds + ";";
				queryString += key + "=lt=" + getNextDate(fromTo[0]) + ";";
			}
			else {
				queryString += key + "=ge=" + ddds+ ";";
				queryString += key + "=le=" + ddds1 + ";";
			}
      }
      
      else if(key.indexOf("Date") != -1)
      {
		   if(value.selectId!="none")
		   {
			    flag = false;
			    var valSelectID = value.selectId;
				if(_.isNumber(valSelectID))
				{
						var currData = getSearchDateValue(valSelectID);
						var newLastDate, newStartDate;
						if(valSelectID == 0) {
							if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
								currData = replaceAll("-",currData,"/");
							}
							newLastDate = currData + " 23:59:59";
							newLastDate = new Date(newLastDate);
							newStartDate = currData + " 00:00:01";
							newStartDate = new Date(newStartDate);
							queryString += key + "=ge=" + newStartDate.getTime() + ";"+key + "=le=" + newLastDate.getTime() + ";";
						}
					   else if(valSelectID ==1){
							if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
								currData = replaceAll("-",currData,"/");
							}
							newLastDate = currData + " 23:59:59";
							newLastDate = new Date(newLastDate);
							newStartDate = currData + " 00:00:01";
							newStartDate = new Date(newStartDate);
							// queryString += key + "=ge=" + newStartDate.getTime() + ";"+key + "=le=" + newLastDate.getTime() + ";";
							queryString += key + "=ge=" + newStartDate.getTime() + ";";
						}
						else {
							queryString += key + "=ge=" + currData + ";";
						}
				}
				else {
					if(value.selectId=="between")
					{
						if(hasValue(value.betweendate)) {
							var fromTo = value.betweendate.split(' To ');
							var ddds=formatAsJSONdateFormat(fromTo[0],dateFormat);	
							ddds = ddds + " 00:00:01";
							ddds = moment(ddds);

							var ddds1 = "";
							if(fromTo[0]==fromTo[1])
								ddds1=formatAsJSONdateFormat(fromTo[0],dateFormat);
							else
								ddds1=formatAsJSONdateFormat(fromTo[1],dateFormat);

							ddds1 = ddds1 + " 23:59:59";
							ddds1 = moment(ddds1);

							queryString += key + "=ge=" + ddds+ ";";
							queryString += key + "=le=" + ddds1 + ";";

							openSelectBox(key+"SelectBox",key+"BetweenDate");
						}
						else {
							openSelectBox(key+"SelectBox",key+"BetweenDate");
							flag = true;
						}
					}
					if(value.selectId=="before")
					{
						//var ddds=formatAsJSONdateFormat(value.date,dateFormat);	
						queryString += key + "=le=" + getNextDate(value.date) + ";";
						openSelectBox(key+"SelectBox",key+"OneDate");
					}
					if(value.selectId=="after")
					{
						var ddds=formatAsJSONdateFormat(value.date,dateFormat);	
						queryString += key + "=ge=" + ddds+ ";";
						openSelectBox(key+"SelectBox",key+"OneDate");
					}
					if(value.selectId=="specific")
					{
						var ddds=formatAsJSONdateFormat(value.date,dateFormat);
						ddds = ddds + " 00:00:01";
						ddds = moment(ddds);

						var ddds1=formatAsJSONdateFormat(value.date,dateFormat);	
						ddds1 = ddds1 + " 23:59:59";
						ddds1 = moment(ddds1);

						queryString += key + "=ge=" + ddds + ";";
						queryString += key + "=le=" + ddds1 + ";";

						openSelectBox(key+"SelectBox",key+"OneDate");
					}
			 }
		  }
	  }
/*      else if(key.indexOf("Date") != -1)
      {
		   if(value.selectId!="none")
		   {
			    flag = false;
				if(_.isNumber(value.selectId))
				{
					 queryString += key + "=ge=" + getSearchDateValue(value.selectId) + ";";
				}
				else{
					if(value.selectId=="between")
					{
						if(hasValue(value.betweendate))
						{
						
					var fromTo = value.betweendate.split(' To ');
					 var ddds=formatAsJSONdateFormat(fromTo[0],dateFormat);	
					 var ddds1=formatAsJSONdateFormat(fromTo[1],dateFormat);	
					if(fromTo[0]==fromTo[1]){
						
						queryString += key + "=ge=" + ddds + ";";
						queryString += key + "=lt=" + getNextDate(fromTo[0]) + ";";
					}
					else{
						
					 queryString += key + "=ge=" + ddds+ ";";
					 queryString += key + "=le=" + ddds1 + ";";
					}
					 openSelectBox(key+"SelectBox",key+"BetweenDate");
							}
							else
							{
								openSelectBox(key+"SelectBox",key+"BetweenDate");
								flag = true;
								}
					}
					if(value.selectId=="before")
					{
						//var ddds=formatAsJSONdateFormat(value.date,dateFormat);	
						queryString += key + "=le=" + getNextDate(value.date) + ";";
						openSelectBox(key+"SelectBox",key+"OneDate");
						
						}
					if(value.selectId=="after")
					{
						var ddds=formatAsJSONdateFormat(value.date,dateFormat);	
						queryString += key + "=ge=" + ddds+ ";";
						openSelectBox(key+"SelectBox",key+"OneDate");
						}
					if(value.selectId=="specific")
					{
						     var ddds=formatAsJSONdateFormat(value.date,dateFormat);
							  queryString += key + "=ge=" + ddds + ";";
								queryString += key + "=le=" + getNextDate(value.date)+ ";";
								openSelectBox(key+"SelectBox",key+"OneDate");
					
						}
						
	 
			}
		  }
	  }
*
*/
      else if (key == "createdTime" || key == "modifiedTime")
      {
		  
         if (hasValue(value))
         {
            flag = false;
            
             
            /*var newLastDate;
			var newStartDate;
            if(value==0 || value ==1){
			   newLastDate=new Date(getSearchDateValue(value)+" 23:59:59");
			   newStartDate=new Date(getSearchDateValue(value)+" 00:00:01");
			  queryString += key + "=ge=" + newStartDate.getTime() + ";"+key + "=le=" + newLastDate.getTime() + ";";            
           } 
            else{
				queryString += key + "=ge=" + getSearchDateValue(value) + ";";
			}*/
			var newLastDate;
			var newStartDate;
			var currData = getSearchDateValue(value);
            if(value==0) {
				if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
					currData = replaceAll("-",currData,"/");
				}
				newStartDate = currData + " 00:00:01";
				newStartDate = new Date(newStartDate);
				queryString += key + "=ge=" + newStartDate.getTime() + ";";            
           } 
		   else if(value ==1){
				if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
					currData = replaceAll("-",currData,"/");
				}
				newLastDate = currData + " 23:59:59";
				newLastDate = new Date(newLastDate);
				newStartDate = currData + " 00:00:01";
				newStartDate = new Date(newStartDate);
				queryString += key + "=ge=" + newStartDate.getTime() + ";"+key + "=le=" + newLastDate.getTime() + ";";			  
            } 
            else{
				queryString += key + "=ge=" + currData + ";";
			}
         }
      }
      else {
         if (_.isObject(value))
         {
            var objectkey = key;
            var stringarray="";
            var checkValue=value.length;
            for (var key in value)
            {
               if (hasValue(value[key]))
               {
                  flag = false;
                  
                  if($("#"+objectkey).hasClass('integersearch'))
                  {
					  queryString += objectkey + "." + key + value[key] + ";"
                  
                  }else
                  {
					   var data=value[key];
					   var checkVal=false; 
                if(hasValue(data.length))
                {
					var checkForId=JSON.stringify(value);
					if(checkForId.indexOf("{")!= -1) 
					{
						   varKey=checkForId.substring(1, (checkForId.length-1));
						   splitValue=varKey.split(":");
						   splitLeftValue=splitValue[0];
						   splitRightValue=splitValue[1];
						   finalKey=splitLeftValue.substring(1, (splitLeftValue.length-1));
						   splitRightValue=splitRightValue.substring(1, (splitRightValue.length-1));
						   
						   var superKey=JSON.stringify(formData);
						   var ary=[];
						   var str="";
						   var k;
						   for(i=0;i<=superKey.length;i+=k)
						   {
							   if(superKey[i]!='[')
							   {
								   str+=superKey[i];
								   k=1;
							   }
							   else
							   {
								 str=str.substring(0,str.length-2);
								 str=str.substring(0,str.lastIndexOf(":")-1);
								 str=str.substring(str.lastIndexOf("\"")+1,str.length);
								 ary.push(str);
								 srt=""; 
								 k=2;
							   }
						   }
						       var val="";
							   var j;
							   for(k=0;k<ary.length;k++)
							   {  
							     for(i=1;i<=splitRightValue.length;i+=j)
							     {
								   if(splitRightValue[i]!="\"")
								   {
									   val+=splitRightValue[i];
									   j=1;
								   }
								   else
								   {
									   stringarray += ary[k]+"."+finalKey + "=="+ val + ",";
									   j=3;
									   val="";
								   }
							     }
							   }
						   checkVal=true;
					}
					if(!checkVal)
						stringarray += objectkey + "==" + data + ","
					checkValue=checkValue-1;
					if(checkValue==0 || checkVal)
					{
						
						if(hasValue(stringarray)){
						var stringbracket="(";
						stringarray=stringarray.substring(0, (stringarray.length-1));
						stringbracket+=stringarray;
						stringbracket+=');';
						queryString+=stringbracket;
					}
					}
			 }
			 else
			 {
				queryString  += '('+objectkey + "." + key + "==" + data + ");"
				}
			  }
               }
            }

         }
         else
         {
            if (!_.isNaN(value))
            {if(key != "orderBy" && key !="orderType"){
               hasValue(value)
               {
                  flag = false;
                  if($("#"+formid.id+" #"+key).hasClass('integersearch'))
                  {
					  /*if(value=="=le=100;%keyName%=ge=0")
						value = replaceAll("%keyName%",value,key)*/
					queryString += key + value + ";";
                  }else
                  queryString += key + "==" + value + ";";

               }
               }
            }
         }
      }
}
   });
   //if no value is entered in search form then else will run otherwise if block is used to create fiql query			
   if (flag)
   {
		if(hasValue(currentDomainId)){
			str+="_s=domain.domainid=="+currentDomainId;
		}
		if(hasValue(formData.orderBy)) {
		   str+="&orderBy="+formData.orderBy;
		   if(hasValue(formData.orderType)) {
			 str+="&orderType="+formData.orderType;  
		   }
	    }
		str+= "&ulimit=" + pageulimit + "&llimit=" + DEFAULT_PAGE_LOWERLIMIT;
		fiql = queryStr + str;
   }
   else
   {
	  if(hasValue(currentDomainId)) {
		str+=";domain.domainid=="+currentDomainId;
	  }

		if(hasValue(formData.orderBy)) {
			str+="&orderBy="+formData.orderBy;
			if(hasValue(formData.orderType)){
				str+="&orderType="+formData.orderType;  
			}
		}
	
		str+= "&ulimit=" + pageulimit + "&llimit=" + DEFAULT_PAGE_LOWERLIMIT;
 
		if(queryString == "?_s=") { // Changes for blank criteria with ?_s= going
			queryString = "?" + str;
		} else {
			queryString = queryString.substring(0, (queryString.length - 1)) + str;
		}
		fiql = queryString;
   }

   return fiql;
}

function createFiqlPermissionQuery(formData)
{
	var queryString = "?_s=";
	var queryStr = "?";
	var str=""; 

   
   var fiql = "";
   var flag = true;
   $.each(formData, function (key, value)
   {
if(hasValue(value)){
      if (key == "date-range-picker")
      {
         var fromTo = value.split(' To ');

         queryString += "date" + "=ge=" + fromTo[0] + ";";
         queryString += "date" + "=le=" + fromTo[1] + ";"
      }
      else if (key == "createdTime" || key == "modifiedTime" || (key.indexOf("Date") != -1))
      {
         if (hasValue(value))
         {
            flag = false;
            
            queryString += key + "=ge=" + getSearchDateValue(value) + ";";
            
         }
      }

      else
      {


         if (_.isObject(value))
         {
            var objectkey = key;
            for (var key in value)
            {
               if (hasValue(value[key]))
               {
                  flag = false;
                  queryString += objectkey + "." + key + "==" + value[key] + ";"
               }
            }

         }
         else
         {

            if (!_.isNaN(value))
            {if(key != "orderBy" && key !="orderType"){
               hasValue(value)
               {
                  flag = false;
                 
                  queryString += key + "==" + value + ";";

               }
               }
            }
         }

      }
}
   });
   //if no value is entered in search form then else will run otherwise if block is used to create fiql query			
   if (flag)
   {
  if(hasValue(currentDomainId)){
	   str+="_s=domain.domainid=="+currentDomainId;
	  }
   if(hasValue(formData.orderBy)){
	   str+="&orderBy="+formData.orderBy;
	   if(hasValue(formData.orderType)){
		   
		 str+="&orderType="+formData.orderType;  
		   }
	   
	   }
    str+= "&ulimit=" + pageulimit + "&llimit=" + DEFAULT_PAGE_LOWERLIMIT;
 
      fiql = queryStr + str;
   }
   else
   {
	  
	  

   if(hasValue(formData.orderBy)){
	   str+="&orderBy="+formData.orderBy;
	   if(hasValue(formData.orderType)){
		   
		 str+="&orderType="+formData.orderType;  
		   }
	   
	   }
    str+= "&ulimit=" + pageulimit + "&llimit=" + DEFAULT_PAGE_LOWERLIMIT;
 
      queryString = queryString.substring(0, (queryString.length - 1)) + str;
      fiql = queryString;
   }

   return fiql;




}

function pagPrev(contentId, searchCallID, callback, llimitid, ulimitid,currentpageno,gridId,isdeleted)
{
showRegularLoading();
   var param = "fiql" + searchCallID + "Param";
   param = eval(param);
   var increment = eval($('#' + contentId + '_value').val());
   $("#" + contentId + "_next").css("display", "");
   pagellimit = parseInt($("#" + contentId + " #" + llimitid).val());
   pageulimit = parseInt($("#" + contentId + " #" + ulimitid).val());

   var flagTag = searchCallID + "flag";
   var flag = eval(flagTag);

   var newContent = $("#" + contentId + " #content").text();
   pagellimit -= increment;
   pageulimit -= increment;

   $("#" + contentId + " #" + llimitid).val(pagellimit);
   $("#" + contentId + " #" + ulimitid).val(pageulimit);

   if (pageulimit <increment-1)
   {  $('#' + currentpageno).html(1); 
      $("#" + contentId + " #content").text("Can not go previous");
      $("#" + contentId + "_pre").css("display", "none");

   }

   else
   {
	if($("#" + contentId + " #content").html()!="Can not go next")
	  {
		 
	var currentpage =eval( $('#' + currentpageno).html());
    currentpage = currentpage -1;
    $('#' + currentpageno).html(currentpage); }
      if (hasValue(param))
      {

         var index = param.indexOf("ulimit");
         var newparam = param.substr(0, index);
         $("#" + contentId + " #content").text(pagination_showing + " " + (pagellimit +1) + " " + pagination_to + " " + (pageulimit+1 ) + " " + pagination_entries + " ");
        //jQuery("#"+gridId).jqGrid('setGridParam',{url:""+context+"/rest/"+searchCallID+"/search"+ newparam + "ulimit=" + (pageulimit-1) + "&llimit=" + pagellimit+""}).trigger("reloadGrid");
            var emailValue=eval($('#sort_'+gridId+'_byemail').val());
         var orderbycall= $('#fiql_'+gridId+'_form #sort_'+gridId+'').val();
	     var ordertypecall= $('#fiql_'+gridId+'_form #sort_type_value_'+gridId+'').val();
      
         if(hasValue(emailValue))
         {
			 sendGETRequest(context + "/rest/" + searchCallID + "/" +param+ "&ulimit=" + (pageulimit) + "&llimit=" + pagellimit+"&orderBy="+orderbycall+"&orderType="+ordertypecall, callback, "", "");
			}
			else{
         sendGETRequest(context + "/rest/" + searchCallID + "/search" + newparam + "ulimit=" + (pageulimit-1 )+ "&llimit=" + pagellimit, callback, "", "");
				}
          window.setTimeout(function(){
			setSort(gridId,$("#list_"+gridId+"_div #sort_"+gridId).val());},1000);	
      }
      else
      {
		  
         $("#" + contentId + " #content").text(pagination_showing + " " + (pagellimit + 1) + " " + pagination_to + " " + (pageulimit+1 ) + " " + pagination_entries + " ");
      
     //sendGETRequest(context + "/rest/" + searchCallID + "/search?&ulimit=" +( pageulimit-1)+ "&llimit=" + pagellimit, callback, "");
       var orderbycall= $('#fiql_'+gridId+'_form #sort_'+gridId+'').val();
	     var ordertypecall= $('#fiql_'+gridId+'_form #sort_type_value_'+gridId+'').val();
        if(hasValue(orderbycall)&&hasValue(ordertypecall))
       {
		  if(isdeleted)
		  {
			  var isdeletedValue=$('#isdeletedFalse').val();
			  	  sendGETRequest(context + "/rest/" + searchCallID + "/search?_s=isdeleted=="+isdeletedValue+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" + (pageulimit) + "&llimit=" + pagellimit, callback, "");
			  }
			  else{
		  sendGETRequest(context + "/rest/" + searchCallID + "/search?&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" + (pageulimit) + "&llimit=" + pagellimit, callback, "");
			}
             window.setTimeout(function(){
			setSort(gridId,$("#list_"+gridId+"_div #sort_"+gridId).val());},1000);	
      }else
      {
		 if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc"; 
			  if(isdeleted)
		  {
			  var isdeletedValue=$('#isdeletedFalse').val();
			  	 		sendGETRequest(context + "/rest/" + searchCallID + "/search?_s=isdeleted=="+isdeletedValue+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" + (pageulimit) + "&llimit=" + pagellimit, callback, "");
			  }
			  else{
		sendGETRequest(context + "/rest/" + searchCallID + "/search?&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" + (pageulimit) + "&llimit=" + pagellimit, callback, "");
	}
		 window.setTimeout(function(){
			setSort(gridId,$("#list_"+gridId+"_div #sort_"+gridId).val());},1000);	
     }
      
      }
   }
}

function pagNext(contentId, searchCallID, callback, llimitid, ulimitid,currentpageno,gridId,isdeleted)
{
	showRegularLoading();
   var param = "fiql" + searchCallID + "Param";
   param = eval(param);

   var increment = eval($('#' + contentId + '_value').val());

   $("#" + contentId + "_pre").css("display", "");
   pagellimit = parseInt($("#" + contentId + " #" + llimitid).val());

   pageulimit = parseInt($("#" + contentId + " #" + ulimitid).val());
   var flagTag = searchCallID + "flag";
   var flag = eval(flagTag);

   var newContent = $("#" + contentId + " #content").text();
   
   pagellimit += increment;
   pageulimit += increment;

   $("#" + contentId + " #" + llimitid).val(pagellimit);
   $("#" + contentId + " #" + ulimitid).val(pageulimit);


	if (flag < increment-1)
   {
      $("#" + contentId + " #content").text("Can not go next");
      $("#" + contentId + "_next").css("display", "none");
   }
   
   else
   {
	  
	 if($("#" + contentId + " #content").html()!="Can not go previous")
	  {
  var currentpage =eval( $('#' + currentpageno).html());
   currentpage = currentpage +1;
   $('#' + currentpageno).html(currentpage);}   
  
      if (hasValue(param))
      {

         var index = param.indexOf("ulimit");
         var newparam = param.substr(0, index);
         $("#" + contentId + " #content").text(pagination_showing + " " + (pagellimit + 1) + " " + pagination_to + " " + (pageulimit+1) + " " + pagination_entries + " ");
         //jQuery("#"+gridId).jqGrid('setGridParam',{url:""+context+"/rest/"+searchCallID+"/search"+ newparam + "ulimit=" + (pageulimit-1) + "&llimit=" + pagellimit+""}).trigger("reloadGrid");
         var emailValue=eval($('#sort_'+gridId+'_byemail').val());
         var orderbycall= $('#fiql_'+gridId+'_form #sort_'+gridId+'').val();
	     var ordertypecall= $('#fiql_'+gridId+'_form #sort_type_value_'+gridId+'').val();
      
         if(hasValue(emailValue))
         {
			 sendGETRequest(context + "/rest/" + searchCallID + "/" +param+ "&ulimit=" + (pageulimit) + "&llimit=" + pagellimit+"&orderBy="+orderbycall+"&orderType="+ordertypecall, callback, "", "");
			}
			 else{
         sendGETRequest(context + "/rest/" + searchCallID + "/search" + newparam + "ulimit=" + (pageulimit) + "&llimit=" + pagellimit, callback, "", "");
			}
          window.setTimeout(function(){
			setSort(gridId,$("#list_"+gridId+"_div #sort_"+gridId).val());},1000);	
         
      }
      else
      {
         
         $("#" + contentId + " #content").text(pagination_showing + " " + (pagellimit + 1) + " " + pagination_to + " " + (pageulimit + 1) + " " + pagination_entries + " ");
         
       

          var orderbycall= $('#fiql_'+gridId+'_form #sort_'+gridId+'').val();
	      var ordertypecall= $('#fiql_'+gridId+'_form #sort_type_value_'+gridId+'').val();
          if(hasValue(orderbycall)&&hasValue(ordertypecall))
		{
			if(isdeleted)
			{
				var isdeletedValue=$('#isdeletedFalse').val();
				 sendGETRequest(context + "/rest/" + searchCallID + "/search?_s=isdeleted=="+isdeletedValue+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" +( pageulimit)+ "&llimit=" + pagellimit, callback, "");
				}else
			{
          sendGETRequest(context + "/rest/" + searchCallID + "/search?&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" +( pageulimit)+ "&llimit=" + pagellimit, callback, "");
			}
		}else
{ 
	if(!hasValue(orderbycall))
			orderbycall="modifiedTime";	
			if(!hasValue(ordertypecall))
			ordertypecall="desc";
			
		if(isdeleted)
		{	
			var isdeletedValue=$('#isdeletedFalse').val();
       sendGETRequest(context + "/rest/" + searchCallID + "/search?_s=isdeleted=="+isdeletedValue+"&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" +( pageulimit)+ "&llimit=" + pagellimit, callback, "");
		}
		else
		{
			 sendGETRequest(context + "/rest/" + searchCallID + "/search?&orderBy="+orderbycall+"&orderType="+ordertypecall+"&ulimit=" +( pageulimit)+ "&llimit=" + pagellimit, callback, "");
			}
	}

  //sendGETRequest(context + "/rest/" + searchCallID + "/search?&ulimit=" +( pageulimit-1)+ "&llimit=" + pagellimit, callback, "");
          window.setTimeout(function(){
			setSort(gridId,$("#list_"+gridId+"_div #sort_"+gridId).val());},1000);	
      }
   }
}

function formatAsDate(dt, separator, showYear)
{
   if (hasValue(dt))
   {
      if (!hasValue(separator)) separator = "-";
      var newDate = new Date(dt);

      var date = newDate.getFullYear() + separator;
      var month = newDate.getMonth() + 1 + "";
      var day = newDate.getDate() + "";
      month = (month.length == 1 ? ("0" + month) : month);
      day = (day.length == 1 ? ("0" + day) : day);
      date += month + separator + day;

      return date;
   }
   else return "";
}



function formatAsDateandTime(dt, separator, showYear)
{
	var timeStamp=dt;
   if (hasValue(dt))
   {
	   if(_.isNumber(dt)){
			  if (!hasValue(separator)) separator = "-";
			  var newDate = new Date(dt);
			  var date = newDate.getDate() + separator + getMonthName(newDate.getMonth());
			  if (showYear) date += separator + newDate.getFullYear();
			  date += "&nbsp;" + moment(timeStamp).tz(timeZone).format('hh:mm:ss a')
			  return date;
		}
		else
		{
			return "--";
		}
   }
   else return "--";
}

/*determine the monthname based on value*/

function getMonthName(monthNum)
{
   var monthName = "Unknown";
   switch (monthNum)
   {
   case 0:
      monthName = "Jan";
      break;
   case 1:
      monthName = "Feb";
      break;
   case 2:
      monthName = "Mar";
      break;
   case 3:
      monthName = "Apr";
      break;
   case 4:
      monthName = "May";
      break;
   case 5:
      monthName = "Jun";
      break;
   case 6:
      monthName = "Jul";
      break;
   case 7:
      monthName = "Aug";
      break;
   case 8:
      monthName = "Sep";
      break;
   case 9:
      monthName = "Oct";
      break;
   case 10:
      monthName = "Nov";
      break;
   case 11:
      monthName = "Dec";
      break;
   }
   return monthName;
} /*this function is to return the date based on the value selected*/

function getSearchDateValue(value)
{
   var val = "";
   if (value == "Any_time") val = "";
   if (value == "0") val = new Date();
   if (value == "1") val = getBeforeDate('1');
   if (value == "7") val = getCurrentWeek();
   if (value == "15") val = getBeforeDate('15');
   if (value == "30") val = getCurrentMonth();
   if (value == "90") val = getCurrentQuarter();
   if (value == "365") val = getCurrentYear();

   if (hasValue(val))
   {
      return convertToSendFormatFordate(val);
   }
   else return "";

}

/*this function is to get the before date from the passed days*/

function getBeforeDate(days)
{
   var today = new Date();
   var todayTime = today.getTime();
   var one_day = 1000 * 60 * 60 * 24;

   var beforeTime = todayTime - (parseInt(days) * one_day)
   var beforeDate = new Date(beforeTime);
   return beforeDate;
}

/*this function is to get the current week start date*/

function getCurrentWeek()
{
   var curr = new Date();
   var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
   var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

   return firstday;
}

/*this function is to get the current month start date*/

function getCurrentMonth()
{
   var date = new Date();
   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

   return firstDay;
}

/*this function is to get the current quarter start date*/

function getCurrentQuarter()
{
   var today = new Date();
   var month = today.getMonth();

   if (month == 0 || month == 1 || month == 2) return new Date(today.getFullYear(), 0, 1);
   if (month == 3 || month == 4 || month == 5) return new Date(today.getFullYear(), 3, 1);
   if (month == 6 || month == 7 || month == 8) return new Date(today.getFullYear(), 6, 1);
   if (month == 9 || month == 10 || month == 11) return new Date(today.getFullYear(), 9, 1);

}

/*this function is to get the current year start date*/

function getCurrentYear()
{
   var today = new Date();
   return new Date(today.getFullYear(), 0, 1);
}


//function to convert date inputs to sending Date format


function convertToSendFormatFordate(dateObj)
{
   var currentDate = dateObj.getDate();
   var currentMonth = dateObj.getMonth() + 1;
   var currentYear = dateObj.getFullYear();

   var currentHour = dateObj.getHours();
   var currentMinute = dateObj.getMinutes();
   var currentSecond = dateObj.getSeconds();

   var dateToSend = currentYear + "-" + currentMonth + "-" + currentDate;
   return dateToSend;
}


function isIntegar(value)
{
	var isNumber =  /^\d+$/.test(value);
	return isNumber;
}

function convertTimeStamp2Date(data, type, full)
{
	if (data != null)
	{
		var date;
		if(isIntegar(data))
			date = new Date(parseInt(data));
		else
			date = new Date(data);

		var str = date.toDateString() ;
		return str;
	}
	
	return "";
}

function convertTimeStamp2DateTimeForToolTip(data, type, full)
{
	var timeStamp=data;
	if (data != null)
	{
		var date;
		if(isIntegar(data))
			date = new Date(parseInt(data));
		else
			date = new Date(data);

		var str = localizeDateString(date,dateFormat) + " " + moment(timeStamp).tz(timeZone).format('hh:mm:ss a');
		return str;
	}
	
	return "";
}

function convertTimeStamp2DateTime(data, type, full)
{
	var timeStamp=data;
	if (data != null)
	{
		var date;
		if(isIntegar(data))
			date = new Date(parseInt(data));
		else
			date = new Date(data);
			
		var str = localizeDateString(date,dateFormat) + " " + moment(timeStamp).tz(timeZone).format('hh:mm:ss a');
		
		if(BrowserDetect.browser == "Explorer" || BrowserDetect.browser == "Mozilla" /* For IE 11 */){
		var val = str+"";
		if(val!=null && val.length>10){
			return val.substring(0,10)+"...";
			}
			else{
				return val+"";
			}
		}
		else
		{
			return str+"";
		}
			
	
	}
	
	//return "";
}
/*function to check Exception*/

function checkException(data)
{
	$('#MsgBoxBack').css("display","none");
	if (hasValue(data))
	{
		var responseMessage = data;
		if (responseMessage.indexOf("errors") != -1)
		{
			var jsonmessage = JSON.parse(responseMessage);
			showErrorLoading(JSON.stringify(jsonmessage.errors[0].name) + " " + JSON.stringify(jsonmessage.errors[0].value.message))
			return true;
		}
		if (responseMessage.indexOf("excpmesg") != -1)
		{
			var jsonmessage = JSON.parse(responseMessage);
			showErrorLoading(jsonmessage.excpmesg)
			return true;
		}
		else
		{
			return false;
		}
	}
}




/*Function for comment*/

function commentValidate(formId)
{
   var comment = $("#" + formId + " #comment").val().trim();

   if (hasValue(comment))
   {
      return true;
   }
   else
   {
      showErrorLoading(comment_add_blank_message);
      return false;
   }

}

function commentAdd(formId)
{
	if (commentValidate(formId)) {
	// if(("#"+formId).validationEngine('validate')) {
		var comment = $("#" + formId + " #comment").val();
		var entityId = uploadid;
		var commentjson = "{\"" + foreignKey + "\":{\"" + primaryKey + "\":" + entityId + "},\"comment\":" + JSON.stringify(comment) + "}";

		sendPOSTRequest(context + "/rest/Comment/createComment", commentjson, "addCommentcallback", formId)
	}
}

function makeFirstLetterUpperCase(value)
{
	if(hasValue(value))
	{
		var upper = value.charAt(0).toUpperCase() + value.slice(1)
		
		return upper;
	}
	
	return value;	
}
/*callback for the added comment*/
function addCommentcallback(XMLHttpRequest, data, rpcRequest, formId)
{
   if (XMLHttpRequest.status == 200)
   {

      if (hasValue(XMLHttpRequest.responseText))
      {
         var responseMessage = XMLHttpRequest.responseText;

         if (responseMessage.indexOf("errorMsg") != -1)
         {
            showErrorLoading(getServerErrorMsg(XMLHttpRequest.responseText));
         }
         else
         {
         $("#" + formId).trigger('reset');
                
                $('.modal-backdrop').css('z-index',-3);
                $('#'+formId.split("_")[0]+'_comment_modal').fadeOut();     
				showCenteredLoading(comment_add_success_message);
				var entityName = formId.split("_")[0];
				
				eval("refreshAll"+makeFirstLetterUpperCase(entityName)+"List()")
         }
      }
   }
   else
   {
      if (hasValue(XMLHttpRequest.responseText))
      {
         
         showErrorLoading(getServerErrorMsg(XMLHttpRequest.responseText));
      }
   }

} /*end comment function*/


function calculate_time_difference(data)
{
   var date = new Date(parseInt(data));
   var today = new Date();

   var diffMs = (today - date);
   var diffDays = Math.round(diffMs / 86400000);
   var diffHrs = Math.round((diffMs % 86400000) / 3600000);
   var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);


   if (diffDays != 0)
   {
      return date.toDateString();
   }
   else if (diffHrs != 0)
   {
      return diffHrs + "hr";
   }
   else
   {

      return diffMins + "min"
   }


}

function imageUploaded(status)
{
   if (status)
   {
      showCenteredLoading(imageupload_success_message);
   }
   else showErrorLoading(imageupload_failure_message);
}

/*Find Index by Column name*/

function getIndexOfTableByName(oSettings, colname)
{
   for (var i = 0; i < oSettings.aoColumns.length; i++)
   {
      if (oSettings.aoColumns[i].sTitle == $.trim(colname))
      {
         return i;
      }
   }
}



function statuscheck(statuscode, tablename)
{
   if (statuscode == 500)
   {
      openError_500_Screen(tablename);
      return false;
   }

   else if (statuscode == 404)
   {
      openError_404_Screen(tablename);
      return false;

   }

   return true;

}

function hasSession()
{
   isSessionAvailable();
}

function isSessionAvailable()
{
   sendGETRequest(context + "/rest/Users/isUserAvailable", "isSessionAvailableCallback", "", "");
}


function isSessionAvailableCallback(XMLHttpRequest, data, rpcRequest)
{
   if (XMLHttpRequest.status == 200)
   {

      }
   else
   {
      //window.location.href = "index.jsp";
   }

}
function commentAddpress(formId) {

    $('#' + formId).find('input:text').keypress(function (e) {

        if (e.keyCode == 13) {
          commentAdd(formId);
            return false;
        } else {

        }

    });
}
function getCurrentDate(){
	var  dateObj=new Date();
	
 return  dateObj.getFullYear()+"-"+(((dateObj.getMonth()+1) < 10)?"0":"") + (dateObj.getMonth()+1)+"-"+((dateObj.getDate() < 10)?"0":"") + dateObj.getDate();
	
	}

function Dateinlineformat(date){
	
	var  dateObj=new Date(date);
 return  dateObj.getFullYear()+"-"+(((dateObj.getMonth()+1) < 10)?"0":"") + (dateObj.getMonth()+1)+"-"+((dateObj.getDate() < 10)?"0":"") + dateObj.getDate();
	
	}

/*  method to custom inline editing*/


function customHideColoumn(check,gridId){
	
		
	 
		  //jQuery("#"+gridId).jqGrid('hideCol', 'actions_inline');
		  //jQuery("#"+gridId).jqGrid('showCol', 'actions');	
		  //jQuery("#"+gridId).saveRow(check,true,'clientArray');
		
		}
	function customInlineCall(check,gridId){
	
		
	  jQuery("#"+gridId).saveRow(check,true,'clientArray');
        var newdata = jQuery("#"+gridId).getRowData(check);
        var replacedata =JSON.stringify(newdata);
        var data = replacedata.replace(':{', '":{"');
		data = data.replace('!@#$%^&"', '"}');
		var callId = gridId.split("_grid");
		var call = callId[0].substr(0, 1).toUpperCase() + callId[0].substr(1);
		
		jQuery("#"+gridId).jqGrid('hideCol', 'actions_inline');	
		jQuery("#"+gridId).jqGrid('showCol', 'actions');	
		sendPUTRequest(context+"/rest/"+call+"/update/",data,"edit_"+callId[0]+"_callback","");
		
		}
//function to get selectbox valuemap 
function getHdrCtrlDataWithValue(data, valueItem,fieldItem,isAppendNull) 
{ 
    var isAppend = false; 
    if(hasValue(isAppendNull)){ 
        isAppend = true; 
    } 
 
    if(data!== null){ 
        var arrStr = ""; 
        if(isAppendNull){ 
            arrStr = "{\"\":\"  -  \","; 
        }else{ 
            arrStr = "{"; 
        } 
        for (var i=0; i < data.length; i++) { 
            arrStr += "\""+eval("arguments[0]["+i+"]."+fieldItem)+ "\":\"" + eval("arguments[0]["+i+"]."+valueItem) + "\","; 
        } 
        if (arrStr.length > 1){ 
            arrStr = arrStr.substring(0, arrStr.length-1); 
        } 
        arrStr += "}"; 
      
        return arrStr; 
    } 
}
function mergeTwoJSON(json1,json2)	
	{
		json1=json1.substring(0,json1.length-1);
		json2=json2.substring(1,json2.length);
		json1+=','+json2;
		return json1;
		}							
function checkStringInArray(arr,str)
{var j=0;
	for(var i=0;i<arr.length;i++)
	{
if(arr[i]==str)
{j=1;
	return true;
	
	}
	if(j==0)
	{
		return false;
		
		}	
}
	
	
	}
	function getIndexStringInArray(arr,str)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==str)
		{
			return i;

		}
	
	}
	
	
}
 function dateformatforHistory(date){
	var value = date;
	if(hasValue(date))
		value = value.substr (0, (value.length-2));
		else
		value="--";
		
	return value
	}

function replaceUnderscore(string){
	
	if(hasValue(string)){
	string=string.toString();
		if(string.indexOf('_')!=-1){
				var temp=string.split('_');
				var returnValue="";
				for(var i=0;i<temp.length;i++){
						returnValue += temp[i]+" ";
					}
					return returnValue;
		}
		else{
				return string;
		}
	}else{
			return "--";
	}
}

function makeFirstLetterUpperCaseAndRemoveUnderscore(value)
{
	if(hasValue(value))
	{
		var upper = value.charAt(0).toUpperCase() + value.slice(1)
		
		return replaceAll("_",upper," ");
	}
	
	return value;	
}

function replaceIncaseSensitiveString(Str,StrToReplace,isCss)
{
    var isApplyCss =  true;
    if(hasValue(isCss))
    isApplyCss =false;

    var re = new RegExp('(' + StrToReplace + ')', 'gi');
    if(isApplyCss)
        Str = Str.replace(re, '<span class="highlighted">$1</span>');
    else
        Str = Str.replace(re, '<span>$1</span>');
    return Str;
}

function replaceAll(oldStrPattern,str,newStrPattern)
{
  var temp="";
  if(str!=null && oldStrPattern!=null)
   {
     var idx = str.indexOf(oldStrPattern);
     while (idx > -1)
     {
         temp += str.substr (0, idx);
         temp += newStrPattern;
         str=str.substr (idx+oldStrPattern.length,str.length);
         idx = str.indexOf(oldStrPattern);
     }
     temp += str;
   }
   return temp;
}

function getUniqueArray(arr)
{
	if(arr.length>0)
		return _.uniq(arr);

	return arr;
}
function resetTestEditor(id)
{
	$('#'+id+' #editor').text("");
	 $("#"+id).trigger('reset');
	 $("#"+id+" .editorcheck").html("");  
	$(".date .span2").attr("value",getCurrentDate());
	//	$(".date .span2").datepicker('update', getCurrentDate());
	}
function formatRichTextValue(value)
{
	
value=	replaceAll("\\",value,"\\\\");
					value=	replaceAll("\"",value,"\\\"");
		return value;			
}
 function checkResponseIsXML(data)
{
	if(hasValue(data))
	{
		if(data.charAt(0)=="<")
			return true;
	}
	
	return false;
}
/*this function is to get the param from the URL*/
function getParam(name)
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( window.location.href );
 if( results == null )
  return "";
else
 return results[1];
}
function setUserLocale(){
	if(UserLang=="fr")
		UserLang="french";
	if(UserLang=="sp")
		UserLang="spanish";
	if(!hasValue(userLanguage))
		window.location.href = context + "/jsp/index.jsp?locale="+UserLang;
	
}
/*This function is use to generate common dialog box*/

function commonDialogBox(text,callfunc){
		$('#MsgBoxBack').css("display","");
		$.SmartMessageBox({
			title : "Are you sure",
			content : text,
			buttons : '[Cancel][Ok]'
		}, function(ButtonPressed) {
			if (ButtonPressed === "Ok") {
			
			eval(callfunc);

			}
			if (ButtonPressed === "Cancel") {
			$('#MsgBoxBack').css("display","none");
			}

		});
		//e.preventDefault();
	
	}
	
/*This function is used to create the instance of rich text editor*/
function callEditor(){
	$('.editorcheck').on("click",function() {
	
	var name;
	for(name in CKEDITOR.instances) {
		var instance = CKEDITOR.instances[name];
		if(this && this == instance.element.$) {
			//$(this).css("top","45px");
			return;
		}
	}
//$(this).css("top","45px");
	$(this).attr('contenteditable', true);
	CKEDITOR.inline(this);
	
});
	
}

/*This function is used tor resize div after closing editor*/
function removeEditorDiv(form,div){
			//	  $("#"+form+" #"+div).css("top","0px");
  }
/*This function is used remove instance of editor*/
function removeAllInstanceOfEditor(){
for(name in CKEDITOR.instances)
{
	
    CKEDITOR.instances[name].destroy()
}
}


function replaceUnderscore(string){
	
	if(hasValue(string)){
	string=string.toString();
		if(string.indexOf('_')!=-1){
				var temp=string.split('_');
				var returnValue="";
				for(var i=0;i<temp.length;i++){
						returnValue += temp[i]+" ";
					}
					return returnValue;
		}
		else{
				return string;
		}
	}else{
			return "--";
	}
}
function getColoumnList(data){
	var keyList=getKeyFromListOfObjects(data);
	var colList=new Array();
	for(var i=0;i<keyList.length;i++)
	{
		if(isUrl(keyList[i]))
			colList.push({sTitle:keyList[i],mData:keyList[i],mRender:showImageUrl});
		else
			colList.push({sTitle:keyList[i],mData:keyList[i]});
	}
	return colList;
}
function getKey(data){
	var keyList=new Array();
	$.each(data,function(key,value){
		keyList.push(key);
	});
	return keyList;
}
function getKeyFromListOfObjects(data)
{
	var keyList=new Array();
	$.each(data[0],function(key,value){
		keyList.push(key);
	});
	return keyList;
}

function isUrl(text){
	text=text.toLowerCase();
	if(text.indexOf("url")>0)
		return true;
	return false;
}

function showImageUrl(url){
	var ext = url.substring(url.lastIndexOf('.') + 1);
	if(ext ==="gif" || ext === "jpg" ||  ext === "png"|| ext === "BMP"){
		return "<img src='"+url+"'></img>";
	}  
	return url;
}

function getColoumnListWADL(data){
	var keyList=new Array();
	var colList=new Array();
	var newData=eval(data);
	$.each(newData[0],function(key,value){
		if(!(_.isObject(value)))
			keyList.push(key);
	});
	for(var i=0;i<keyList.length;i++)
	{
			colList.push({sTitle:keyList[i],mData:keyList[i]});
	}
	return colList;
}
function isList(data){
	if(data.indexOf("[")==-1)
	{
		var newData="[";
		newData=newData+data+"]";
		return JSON.parse(newData);
	}
	return JSON.parse(data);
}
function getColoumnListWADL(data){
	var keyList=new Array();
	var colList=new Array();
	var newData=data;
	
	$.each(newData[0],function(key,value){
		if(!(_.isObject(value)))
			keyList.push(key);
	});
	
	for(var i=0;i<keyList.length;i++)
	{
			colList.push({sTitle:keyList[i],mData:keyList[i]});
	}
	return colList;
}
	
	 function getNextDate(date)
{
	
	var dateString = formatAsJSONdateFormat(date,dateFormat);
	var actualDate = new Date(dateString);
	var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1);

	//var newDateString = ('0'+newDate.getDate()).substr(-2) + ' ' + newDate.toDateString().substr(4,3) + ' ' + newDate.getFullYear();	
return convertToSendFormatFordate(newDate);

}
var KMBKLCrFormat="";
function formatValueinKandM(value)
{
    if(DataFormater=="indian")
        KMBKLCrFormat = "Indian";

    var thousand = "K";
    var lakh = "Mn";
    var crore = "Bn";
    var toMultiply = 1;
    if(value<0){
        toMultiply = -1;
        value = value * (-1);
    }

    if(KMBKLCrFormat == "Indian"){
        thousand = "K";
        lakh = "L";
        crore = "Cr";


        if (value>1000 && value<100000)
            return (convertIn2Digit(value/1000) * (toMultiply)) + "&nbsp;"+ thousand;
        else if ( value>=100000 && value<10000000)
            return (convertIn2Digit(value/100000) * (toMultiply)) + "&nbsp;"+ lakh;
        else if ( value>=10000000)
            return (convertIn2Digit(value/10000000) * (toMultiply)) + "&nbsp;"+ crore ;
    }
    else{
        if (value>1000 && value<1000000)
            return (convertIn2Digit(value/1000) * (toMultiply)) + "&nbsp;"+ thousand;
        else if ( value>=1000000 && value<1000000000)
            return (convertIn2Digit(value/1000000) * (toMultiply)) + "&nbsp;"+ lakh;
        else if ( value>=1000000000)
            return (convertIn2Digit(value/1000000000) * (toMultiply)) + "&nbsp;"+ crore ;
    }

    if(value == 0.00)
        return INFINITY_INDICATOR;

    return convertIn2Digit (value);
}

 /* This function convert the value in 2 digit after decimal */
function convertIn2Digit(value, byPassInfinity)
{
    if (!hasValue(byPassInfinity)) byPassInfinity = false;
    if (!byPassInfinity && isInfinity(value))
        return INFINITY_INDICATOR;

    value = parseFloat(value);
    return value.toFixed(2);
}
function isInfinity (value) {
    return !hasValue (value)|| value.toString().toLowerCase()=="infinity"||isNaN(Number (value));
}
function localizeDateString(date,flag)
{	
	
	var y=date;
	var x='--';
	if (hasValue(date))
	{ 
	
	switch(flag)
	{
		case 'MM/DD/YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= month+'/'+day+'/'+y.getFullYear();
		break;
		case 'YYYY/MM/DD':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= y.getFullYear()+'/'+month+'/'+day;
		break;
		case 'DD/MM/YY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+'/'+month+'/'+y.getFullYear().toString().substr(2,2);
		break;
		
		case 'DD/MM/YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+'/'+month+'/'+y.getFullYear();
		break;
		
		case 'YYYY-MM-DD':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= y.getFullYear()+'-'+month+'-'+day;
		break;
		case 'DD-MM-YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+"-"+month+'-'+y.getFullYear();
		break;
		
		case 'DD-MMM-YYYY':
		  x=formatAsDateINMMM(y,'-',true,false);
		  break;
		
		
		
		}
		return x;
	}
return '--';
}

function localizeDateTimeString(date,flag)
{	
	var y=date;
	var x='--';
	// if (hasValue(date))
	if (hasValue(date) && date.toString() !== "Invalid Date") /* Defect fixed */
	{ 

	switch(flag)
	{
		case 'MM/DD/YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= month+'/'+day+'/'+y.getFullYear() +" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		case 'YYYY/MM/DD':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= y.getFullYear()+'/'+month+'/'+day+" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		case 'DD/MM/YY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+'/'+month+'/'+y.getFullYear().toString().substr(2,2) +" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		
		case 'DD/MM/YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+'/'+month+'/'+y.getFullYear()+" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		
		case 'YYYY-MM-DD':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= y.getFullYear()+'-'+month+'-'+day +" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		case 'DD-MM-YYYY':
				var month = y.getMonth() + 1 + "";
				var day = y.getDate() + "";
				day = (day.length == 1 ? ("0" + day) : day);
				month = (month.length == 1 ? ("0" + month) : month);
				x= day+"-"+month+'-'+y.getFullYear()+" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		break;
		
		case 'DD-MMM-YYYY':
		  x=formatAsDateINMMM(y,'-',true,false) +" "+moment(y.getTime()).tz(timeZone).format('hh:mm:ss');
		  break;
		
		
		
		}
		
		return x;
	}
return '--';
}


function formatAsDateINMMM(dt, separator, showYear,fullyear)
{
	if (hasValue(dt))
	{
		if (!hasValue(separator)) 
			separator = "-";
		var newDate = new Date(dt);
		var date = newDate.getDate() + separator + getMonthName(newDate.getMonth());
		if (showYear)
		{
			if(fullyear)
			date += separator + newDate.getFullYear();
			else
			date += separator + newDate.getFullYear();
		}	
		
		return date;
	}
	else
		return "--";
}
function formatAsJSONdateFormat(str,flag)
{
	var x='--';
	if (hasValue(str))
		{ 
	switch(flag)
	{
		

			case 'YYYY-MM-DD':
			var array=	str.split('-');
			x= array[0]+'-'+array[1]+'-'+array[2];
			break;
			
			case 'DD-MM-YYYY':
			var array=	str.split('-');
			x= array[2]+'-'+array[1]+'-'+array[0];
			break;
			
			case 'MM/DD/YYYY':
					var array=	str.split('/');
			x=array[2]+'-'+array[0]+'-'+array[1];
			break;
		
			case 'DD/MM/YY':
			var array=	str.split('/');
			x="20"+array[2]+'-'+array[1]+'-'+array[0];
			break;
		
			case 'YYYY/MM/DD':
			var array=	str.split('/');
			x=array[0]+'-'+array[1]+'-'+array[2];
			break;
		
			case 'DD-MMM-YYYY':
			var array=	str.split('-');
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			x=array[2]+'-'+(months.indexOf(array[1])+1)+'-'+array[0];   
			break;
		
		
		}
		return x;
	}
return '';	
	}


function formatAsJSONdateTimeFormat(str, flag) {
	var browserDetect = BrowserDetect.browser;
    var x = '--';
    if (hasValue(str)) {
        switch (flag) {
            case 'yyyy-MM-dd hh:mm:ss':
                var array = str.split('-');
                var timearr = array[2]
                var timeaa = timearr.split(" ")

                x = array[0] + '-' + array[1] + '-' + timeaa[0] + " " + timeaa[1];
                x = new Date(x);
                x = x.getTime();
                if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
                    var forMoz = array[1] + '/' + timeaa[0] + '/' + array[0] + " " + timeaa[1];
                    x = new Date(forMoz).getTime();
                }
                break;

            case 'dd-MM-yyyy hh:mm:ss':
                var array = str.split('-');
                var timearr = array[2];
                var timeaa = timearr.split(" ");
                x = timeaa[0] + '-' + array[1] + '-' + array[0] + " " + timeaa[1];
                x = new Date(x);
                x = x.getTime();
                break;

            case 'MM/dd/yyyy hh:mm:ss':
                var array = str.split('/');
                var timearr = array[2]
                var timeaa = timearr.split(" ")

                x = timeaa[0] + '-' + array[0] + '-' + array[1] + " " + timeaa[1];
                x = new Date(x);
                if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
                    x = new Date(str);
                }
                x = x.getTime();
                break;

            case 'dd/MM/yyyy hh:mm:ss':
                var array = str.split('/');
                var timearr = array[2]
                var timeaa = timearr.split(" ")
                x = timeaa[0] + '-' + array[1] + '-' + array[0] + " " + timeaa[1];
                x = new Date(x);
                x = x.getTime();
                break;

            case 'yyyy/MM/dd hh:mm:ss':
                var array = str.split('/');
                var timearr = array[2]
                var timeaa = timearr.split(" ")
                x = array[0] + '-' + array[1] + '-' + timeaa[0] + " " + timeaa[1];
                x = new Date(x);
                x = x.getTime();
                if (browserDetect == "Explorer" || browserDetect == "Firefox" || browserDetect == "Safari" || BrowserDetect.browser == "Mozilla" /* For IE 11 */) {
                    x = new Date(str).getTime();
                }
                break;

            case 'dd-mmm-yyyy hh:mm:ss':
                var array = str.split('-');
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                //x=array[2]+'-'+(months.indexOf(array[1])+1)+'-'+array[0]+" "+moment(str).tz(timeZone).format('hh:mm:ss'); 
                x = array[2] + '-' + array[1] + '-' + array[0] + " " + moment(str).tz(timeZone).format('hh:mm:ss');
                x = new Date(x);
                x = x.getTime();
                break;
        }
        return x;
    }
    return '';
}

/*determine the monthnum based on Name*/
function getMonthNumAccordingToName(monthNum)
{
   var monthName = "Unknown";
   switch (monthNum)
   {
   case "Jan":
      monthName = '01';
      break;
   case "Feb":
      monthName =	'02';
      break;
   case "Mar":
      monthName = '03';
      break;
   case "Apr":
      monthName = '04';
      break;
   case "May":
      monthName = '05';
      break;
   case "Jun":
      monthName = '06';
      break;
   case "Jul":
      monthName = '07';
      break;
   case "Aug":
      monthName ='08';
      break;
   case "Sep":
      monthName = '09';
      break;
   case "Oct":
      monthName = '10';
      break;
   case "Nov":
      monthName = '11';
      break;
   case "Dec":
      monthName = '12';
      break;
   }
   return monthName;
} 

function getDateFormatAccordingToEnum(val)
{

	var monthName="yyyy-mm-dd";
	switch(val)
	{
	  case "mmddyy_slash":
      monthName = 'DD/MM/YY';
      break;
	  case "mmddyyyy_slash":
      monthName = 'MM/DD/YYYY';
      break;
		case "yymmdd_slash":
      monthName = 'YYYY/MM/DD';
      break;
	  case "yyyymmdd_dash":
      monthName = 'YYYY-MM-DD';
      break;
	  case "ddMMyy_dash":
      monthName = 'DD-MM-YYYY';
      break;
		case "ddMMyyyy_dash":
      monthName = 'DD-MMM-YYYY';
      break;
		
}
	
	return monthName;
}
function getDateFormatForTimeAccordingToEnum(val)
{

	var monthName="yyyy-mm-dd hh:mm:ss";
	switch(val)
	{
	  case "mmddyy_slash":
      monthName = 'dd/MM/yyyy hh:mm:ss';
      break;
	  case "mmddyyyy_slash":
      monthName = 'MM/dd/yyyy hh:mm:ss';
      break;
		case "yymmdd_slash":
      monthName = 'yyyy/MM/dd hh:mm:ss';
      break;
	  case "yyyymmdd_dash":
      monthName = 'yyyy-MM-dd hh:mm:ss';
      break;
	  case "ddMMyy_dash":
      monthName = 'dd-MM-yyyy hh:mm:ss';
      break;
		case "ddMMyyyy_dash":
      monthName = 'dd-MM-yyyy hh:mm:ss';
      break;
		
}
	
	return monthName;
}

/* get_column_number_For_Quick_Filter */
/*function get_column_number_For_Quick_Filter(name,table) {
    var findtable  = eval(table+"Table");
  
    var aoColumns = findtable.fnSettings().aoColumns;
    var numcols = aoColumns.length;
     
    for (i=0; i<numcols; i++) {
		
        col = aoColumns[i].sTitle;
    
        if (col == name){ 
			return i;}
    }   
}*/

/* get_column_number_For_Quick_Filter */
function get_column_number_For_Quick_Filter(name,table) {
    var findtable  = eval(table+"Table");
    var aoColumns = findtable.fnSettings().aoColumns;
    var numcols = aoColumns.length;
    var colList=new Array();
    for (k=0; k<numcols; k++) {
		if(findtable.fnSettings().aoColumns[k].bVisible)  
			colList.push({index:k,name:findtable.fnSettings().aoColumns[k].sTitle});
	}  

	for (i=0; i<colList.length; i++) {
		console.dir(i);
		col = colList[i].name;
		if (col == name){ 
			return i;
		}
	}     
}

/*showQuickFilterDiv*/
function showQuickFilterDiv(SearchIndex,tableName,colName){

	$("#"+tableName+"_grid_view th").each(function(i,j){
		
		if(i==SearchIndex)
		{
			var x=$(this).position();
			var width=$(this).width()
			$("#"+tableName+"quickFilterDiv").css({
				'top': x.top-40,
				'left': x.left+7
			});
			$("#"+tableName+"quickFilter").css({
				'width':width
				
			});
			$("#"+tableName+"quickFilter").attr("placeholder",colName);
			
		}
	});

	
	
}

/* function for encode text content*/
function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
 
/* function for decode text content*/ 
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

/*.Function is used to show and hide the current visible header column in the filter icon toggle div. */
function showHideFilterContent(tablename)
{
	var filterArray=[];
	var filterArrayForVisible=[];
	var table=$('#'+tablename+'_grid_view').dataTable();
	for(i=0; i<=(table.fnSettings().aoColumns.length); i++)
	{
		if(hasValue(table.fnSettings().aoColumns[i]))
		{
			if(!(table.fnSettings().aoColumns[i].bVisible))
			{
				if(hasValue(table.fnSettings().aoColumns[i].contextid))
				{
					var arrvalue=(table.fnSettings().aoColumns[i].contextid);
					filterArray.push(arrvalue);
				}
			}
			if((table.fnSettings().aoColumns[i].bVisible))
			{
				if(hasValue(table.fnSettings().aoColumns[i].contextid))
				{
					var arrvalue=(table.fnSettings().aoColumns[i].contextid);
					filterArrayForVisible.push(arrvalue);
				}
			}
	    }
	}
	$('#'+tablename+'_breadcrumbs #'+tablename+'_Quick_UL li').each(function() {		
		 var getId=$(this).attr("id");
		 if(hasValue(getId))
		 {
			var finalstr=getId.split("_");
			var finalValue=finalstr[0];
			finalValue=finalValue.toUpperCase();
			for(i=0;i<filterArray.length;i++)
			{
				var finalArrValue=filterArray[i].toUpperCase();
				if(finalValue==finalArrValue)
				{
					$('#'+tablename+'_breadcrumbs #'+tablename+'_Quick_UL #'+getId).hide();
				}
			}  
			for(i=0;i<filterArrayForVisible.length;i++)
			{
				var finalArrValue=filterArrayForVisible[i].toUpperCase();
				if(finalValue==finalArrValue)
				{
					$('#'+tablename+'_breadcrumbs #'+tablename+'_Quick_UL #'+getId).show();
				}
			}  
		 }
	});
	// to hide filter search div if it is open
	try { $(".filterList").css("display","none"); } catch(e) {}
}


/*to get the cookie value by name*/
function getCookieValue(c_name) 
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) 
	{
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) 
	{
		c_value = null;
	}
	else 
	{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) 
		{
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}
	return c_value;
}

function htmlParametersInBootstrapTable(data, type, full) {
	if(hasValue(data)) {
		if(data.length > 60)
			return "<div style='height: 75px; overflow-y: auto;'>"+htmlDecode(data)+"</div>";
		else
			return htmlDecode(data);
	}
	return EMPTY_DATA_VAR;
}

function ellipsis(string){
	if(string!=null){
if(string.length > 15) {
    string = string.substring(0,15)+" ...";
}
}
return string;
}

// to get image with image folder path
function getImagePath(imgName) {
	return context + "/images/" + imgName;
}

// to make custom image tag 
function getCustomImage(imgName, altString, clickFunction, imgWd, imgHt) {
	/* format :
	 * getCustomImage("lock-false.gif", "Locked", "", 16, 16);
	 * */
    var style = "";
	if(hasValue(imgWd)) {
		style = "width: "+imgWd+"px;";
	}
	if(hasValue(imgHt)) {
		style += "height: "+ imgHt +"px;";
	}

	/*if(imgName == "resetpassnew.png" || imgName == "lockedNw.png" || imgName == "unlockNw.png") {
		style += "margin-top:-5px;"
	}*/

    var funcStr = "", cursor = "pointer";
    if (hasValue(clickFunction)) {
        funcStr = " onclick='" + clickFunction + "'";
    }

    return "<img class='img-responsive no-border-and-radius' title='" + altString + "' alt='" + altString + "' src='" + getImagePath(imgName) + "' " + funcStr + " style=' "+style+" cursor: "+cursor+"; cursor:hand;'/>";
}

// to hide Filter div
function hideFilterDiv() {
	try {
		$('.filterList').css('display', 'none');
	} catch(e) {}
}

//to change postion of validation error message of form which has not displayed properly in form
function changeValidationEngineMsgPos(formID, pos) {
	if(hasValue(formID)) {
		jQuery('#'+formID+'').validationEngine().validationEngine('hide');
		if(hasValue(pos)) {
			jQuery('#'+formID+' input').attr('data-prompt-position',pos);
			jQuery('#'+formID+' input').data('promptPosition',pos);
			jQuery('#'+formID+' textarea').attr('data-prompt-position',pos);
			jQuery('#'+formID+' textarea').data('promptPosition',pos);
			jQuery('#'+formID+' select').attr('data-prompt-position',pos);
			jQuery('#'+formID+' select').data('promptPosition',pos);
		}
	}
}

// to check and return empty data if not value found
function checkAndReturnEmptyData(value)
{
	if(hasValue(value))
		return value;
	else
		return EMPTY_DATA_VAR;
}

// to get text message for warning before deleting record
function getConfirmDeleteText(name)
{
	return "Are you sure you want to delete this " + name + " record ?";
}
