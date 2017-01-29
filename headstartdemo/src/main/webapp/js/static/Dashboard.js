/**************************************Dashboard Js Starts Here*********************************************/

var userGridTableRowData;
var tableNameVar="Users";
var countryNameVar="Users";
var randomDbBoxCounter = 0;
var slider="";
var mapboxid="";

/*This function formats the value of given string in Camel Format(It splits the value with space)*/
function formatInCamelString(value)
{
    var rankName = new Array();
    rankName = value.split(" ");
    var str = "";
    var size = rankName.length;
    for(i=0;i<rankName.length;i++)
    {
        var fc = rankName[i].charAt(0).toUpperCase();
        str += fc + rankName[i].substr(1, rankName[i].length-1).toLowerCase() + " ";
    }
    return str.substr(0,str.length-1);
}

/*Function is used to get array from object*/
function getArrayFromObject(data, fieldItem) 
{
	if (data != null) 
	{
		var arrStr = "["
		for (var i = 0; i < data.length; i++) 
		{
			var value = (parseInt(eval("arguments[0][" + i + "]." + fieldItem)));
			if (value < 0)
				value = value * -1;
			arrStr += "" + value + ",";
		}
		if (arrStr.length > 1)
			arrStr = arrStr.substring(0, arrStr.length - 1);
		arrStr += "]";
		return arrStr;
	}
}

/*this function is to get the formatted array of date fieldItem from the json object*/
function getArrayDateFromObject(data, fieldItem) 
{
	if (data != null) 
	{
		var arrStr = "["
		for (var i = 0; i < data.length; i++) 
		{
			var value = +eval("arguments[0][" + i + "]." + fieldItem);
			value = "\"" + getFormattedDate(new Date(value)) + "\""
			arrStr += value + ",";
		}
		if (arrStr.length > 1)
			arrStr = arrStr.substring(0, arrStr.length - 1);
		arrStr += "]";
		return arrStr;
	}
}

/*Format date object in readle date format  dd-monthName-yyyy*/
function getDbFormattedDate(dt, showday, showYear) 
{
	var separator = "-";
	var day = dt.getDate()
	if (day < 10)
		day = "0" + day;
	var date = getMonthName(dt.getMonth());
	if (showday)
		date = day + separator + getMonthName(dt.getMonth());
	if (showYear) 
	{
		var curYear = dt.getFullYear();
		date += separator + curYear.toString().slice(2);
	}
	return date;
}

/*this function is to get the formatted array of week date fieldItem from the json object*/
function getArrayWeekDateFromObject(data, fieldItem) 
{
	if (data != null) 
	{
		var arrStr = "["
		for (var i = 0; i < data.length; i++) 
		{
			var value = +eval("arguments[0][" + i + "]." + fieldItem);
			value = "\"" + getDbFormattedDate(new Date(value), true) + "\""
			arrStr += value + ",";
		}
		if (arrStr.length > 1)
			arrStr = arrStr.substring(0, arrStr.length - 1);
		arrStr += "]";
		return arrStr;
	}
}

/*this function is to get the formatted array of month date fieldItem from the json object*/
function getArrayMonthDateFromObject(data, fieldItem) 
{
	if (data != null) 
	{
		var arrStr = "["
		for (var i = 0; i < data.length; i++) 
		{
			var value = +eval("arguments[0][" + i + "]." + fieldItem);
			value = "\"" + getDbFormattedDate(new Date(value), false, true) + "\""
			arrStr += value + ",";
		}
		if (arrStr.length > 1)
			arrStr = arrStr.substring(0, arrStr.length - 1);
		arrStr += "]";
		return arrStr;
	}
}

/*this function is to get the formatted array of year date fieldItem from the json object*/
function getArrayYearDateFromObject(data, fieldItem) 
{
	if (data != null) 
	{
		var arrStr = "["
		for (var i = 0; i < data.length; i++) 
		{
			var value = +eval("arguments[0][" + i + "]." + fieldItem);
			var dd = new Date(value)
			value = "\"" + getDbFormattedDate(dd, false, true) + "\""
			arrStr += value + ",";
		}
		if (arrStr.length > 1)
			arrStr = arrStr.substring(0, arrStr.length - 1);
		arrStr += "]";
		return arrStr;
	}
}

/*this function is to get the recent activity data*/
function getRecentActivityData() 
{
	$("#recentActivityDiv").empty();
	var datetime=new Date();
	datetime=datetime.getTime();
	sendGETRequest(context + "/rest/ActivityStream/FIQLsearch?&ulimit=2&llimit=0&orderBy=date&orderType=desc&date="+datetime, "getRecentActivityDataCallBack", '', true);
}

/*this function is to get the recent activity data*/
function getRecentactivitydatafordashboard() 
{
	updateRememberMetoken();
	window.setTimeout(function(){getRecentActivityData();},300);
}

/*callback for the recent activity data*/
function getRecentActivityDataCallBack(XMLHttpRequest, data, rpcRequest) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			setRecentActivityData(data);
			window.setTimeout("getRecentactivitydatafordashboard()", 50000);
		}
	}
}

/*this function is to the recent activity data*/
function setRecentActivityData(data) 
{
	for (var i = 0; i < data.length; i++) 
	{
		generateRecentActivityRowData(data[i]);
	}
}

/*this function is to generate the row for the recent activity*/
function generateRecentActivityRowData(row) 
{
	if(hasValue(row)) {
		var name = formatInCamelString(row.user.firstname);
		var time = formatStreamDate(row.date, true);
		var message = row.message;
		var userId = row.user.userid;
		$("#recentActivityDiv").append("<div class='itemdiv commentdiv'><div class='user'><img style='max-height: 34px; width: 40px; height: 40px; border-radius: 50%; overflow: hidden;' alt='" + name + "&#39;s Avatar' src=" + context + "/rest/Users/getUserImageById/" + userId + " onError=\"this.src='../images/avatar2.png';\" ></div><div class='body'><div class='name'><a href='javascript:void(0)' style='cursor: text;'>" + name + "</a></div><div class='time'><span class='red'> " + time + "</span></div><div class='text' style='word-wrap: break-word;max-width: 72%;'>" + message + "</div></div></div>");
	}
}

/*this funciton is to format the date for the recent activity*/
function formatStreamDate(date, addLineChnage) 
{
	var validateDate = formatDateForStream(date);
	var todayDate = formatDateForStream(new Date());
	var yesterdayDate = formatDateForStream(getBeforeDate(1));
	var timezone = " " + getTimeZone(date);
	var br = "&nbsp;"
	if (addLineChnage)
		br = "<br>";
	if (validateDate == todayDate)
		return "<span class='bigger-150 bolder'>Today</span>" + br + getStreamTime(date) + timezone;
	if (validateDate == yesterdayDate)
		return "<span class='bigger-150 bolder'>Yesterday</span>" + br + getStreamTime(date) + timezone;
	return "<span class='bigger-150 bolder'>" + getFormattedDate(new Date(date)) + "</span>" + br + getStreamTime(date) + timezone;
}

/*this function is to show the date in format  dd - monthname - year   : returns '-' if empty value*/
function formatDateForStream(value) 
{
	if (hasValue(value)) 
	{
		var date = new Date(value);
		return getFormattedDate(date, '-', true)
	}
	return '-';
}

/*this funciton is to return the time zone*/
function getTimeZone(date) 
{
	var d = new Date(date);
	var usertime = d.toLocaleString();
	var tzsregex = /\b(ACDT|ACST|ACT|ADT|AEDT|AEST|AFT|AKDT|AKST|AMST|AMT|ART|AST|AWDT|AWST|AZOST|AZT|BDT|BIOT|BIT|BOT|BRT|BST|BTT|CAT|CCT|CDT|CEDT|CEST|CET|CHADT|CHAST|CIST|CKT|CLST|CLT|COST|COT|CST|CT|CVT|CXT|CHST|DFT|EAST|EAT|ECT|EDT|EEDT|EEST|EET|EST|FJT|FKST|FKT|GALT|GET|GFT|GILT|GIT|GMT|GST|GYT|HADT|HAEC|HAST|HKT|HMT|HST|ICT|IDT|IRKT|IRST|IST|JST|KRAT|KST|LHST|LINT|MART|MAGT|MDT|MET|MEST|MIT|MSD|MSK|MST|MUT|MYT|NDT|NFT|NPT|NST|NT|NZDT|NZST|OMST|PDT|PETT|PHOT|PKT|PST|RET|SAMT|SAST|SBT|SCT|SGT|SLT|SST|TAHT|THA|UYST|UYT|VET|VLAT|WAT|WEDT|WEST|WET|WST|YAKT|YEKT)\b/gi;
	var timezonenames = {
					"UTC+0": "GMT",
					"UTC+1": "CET",
					"UTC+2": "EET",
					"UTC+3": "EEDT",
					"UTC+3.5": "IRST",
					"UTC+4": "MSD",
					"UTC+4.5": "AFT",
					"UTC+5": "PKT",
					"UTC+5.5": "IST",
					"UTC+6": "BST",
					"UTC+6.5": "MST",
					"UTC+7": "THA",
					"UTC+8": "AWST",
					"UTC+9": "AWDT",
					"UTC+9.5": "ACST",
					"UTC+10": "AEST",
					"UTC+10.5": "ACDT",
					"UTC+11": "AEDT",
					"UTC+11.5": "NFT",
					"UTC+12": "NZST",
					"UTC-1": "AZOST",
					"UTC-2": "GST",
					"UTC-3": "BRT",
					"UTC-3.5": "NST",
					"UTC-4": "CLT",
					"UTC-4.5": "VET",
					"UTC-5": "EST",
					"UTC-6": "CST",
					"UTC-7": "MST",
					"UTC-8": "PST",
					"UTC-9": "AKST",
					"UTC-9.5": "MIT",
					"UTC-10": "HST",
					"UTC-11": "SST",
					"UTC-12": "BIT"
		};
	    var timezone = usertime.match(tzsregex);
		if (timezone) 
		{
			timezone = timezone[timezone.length - 1];
		}
		else 
		{
			var offset = -1 * d.getTimezoneOffset() / 60;
			offset = "UTC" + (offset >= 0 ? "+" + offset : offset);
			timezone = timezonenames[offset];
		}
	    return timezone;
} 

/*this function is to return the current time*/
function getStreamTime(value) 
{
	var date = new Date(value);
	var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	var hourPrefix = hours;
	var hourSuffix = "";
	var time = hourPrefix + ":" + min;
	return time;
}

/*format date object in readle date format  dd-monthName-yyyy*/
function getFormattedDate(dt, separator, showYear) {
	if (!hasValue(separator)) separator = "-";
	var day = dt.getDate()
	if (day < 10)
		day = "0" + day;
	var date = day + separator + getMonthName(dt.getMonth());
	if (showYear) {
		var curYear = dt.getFullYear();
		date += separator + curYear.toString().slice(2);
	}
	return date;
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
}

/*this function is to generate the PIE chart*/
function generateDbPieChart(data, boxId) 
{
	if(hasValue(data)) {
		var isLabel=true;
		if($( document ).width()<480)
		{
			isLabel=false;
		}
		var newDataArray = "[";
		var chartlabel = "-";
		for (var i = 0; i < data.length; i++) 
		{
			chartlabel = data[0].label;
			newDataArray += "[\"" + data[i].status + "\"," + data[i].count + "],"
		}
		newDataArray = newDataArray.substring(0, newDataArray.length - 1);
		newDataArray = newDataArray + "]";
		if (newDataArray != "]")
			newDataArray = eval(newDataArray)
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: boxId + "_chart",
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			exporting: {
				enabled: false
			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '<b>{point.percentage:.1f}%</b>',
				percentageDecimals: 0
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					center: [150, 80],
					colors:['#4E9EA5','#FFDE94','#485792','#9C4EA5','#61AD00','#318031','#89A54E','#AA4643','#4572A7','#80699B'],
					dataLabels: {
						enabled: false,
						color: "white",
						distance: -15,
						formatter: function () {
							return parseInt(this.percentage) + '%';
						}
					},
					showInLegend: isLabel
				},
				
			},
			legend: {
				layout: 'vertical',
				backgroundColor: '#FFFFFF',
				align: 'right',
				borderColor: '#ffffff',
				verticalAlign: 'top',
				floating: true,
				x: -90,
				y: 40,
				itemStyle: {
					paddingBottom: '5px'
				},
				enabled:isLabel
			},
			series: [{
				type: 'pie',
				name: chartlabel,
				data: newDataArray
			}]
		});
		data[0].label=htmlDecode(data[0].label);
		$("#" + boxId + "_label").html(data[0].label);
	}
}

/*this function is to generate he DONUT chart*/
function generateDbDonutChart(data, boxId) 
{
	if(hasValue(data)) {
		var isLabel=true;
		if($( document ).width()<480)
		{
			isLabel=false;
		}
		var newDataArray = "[";
		var chartlabel;
		for (var i = 0; i < data.length; i++) 
		{
			chartlabel = data[0].label;
			newDataArray += "[\"" + data[i].status + "\"," + data[i].count + "],"
		}
		newDataArray = newDataArray.substring(0, newDataArray.length - 1);
		newDataArray = newDataArray + "]";
		if (newDataArray != "]")
			newDataArray = eval(newDataArray)
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: boxId + "_chart",
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			exporting: {
				enabled: false
			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '<b>{point.percentage:.1f}%</b>',
				percentageDecimals: 0
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					center: [150, 80],
					colors:['#80699B', '#4572A7', '#AA4643', '#89A54E', '#FF8F00', '#61AD00', '#9C4EA5', '#485792', '#FFDE94', '#4E9EA5'],
					dataLabels: {
						enabled: false,
						color: "white",
						distance: -15,
						formatter: function () {
							return parseInt(this.percentage) + '%';
						}
					},
					showInLegend: true
				}
			},
			legend: {
				layout: 'vertical',
				backgroundColor: '#FFFFFF',
				align: 'right',
				borderColor: '#ffffff',
				verticalAlign: 'top',
				floating: true,
				x: -90,
				y: 40,
				itemStyle: {
					paddingBottom: '5px'
				},
				enabled:isLabel
				
			},
			series: [{
				type: 'pie',
				innerSize: '60%',
				name: chartlabel,
				data: newDataArray
			}]
		});
		chartlabel=htmlDecode(chartlabel);
		$("#" + boxId + "_label").text(chartlabel);
	}
}

/*this function is called from the tools of the Line chart to show chart accoring to timeperiod*/
function getDbTrendChart(url, param, type) 
{
	var newParam = param.split("#");
	var boxId = newParam[0];
	param = boxId + "#" + type;
	sendGETRequest(context + "/rest" + url + "trend=" + type, "getDbTrendChartCallBack", param);
}

/*callback for the line chart*/
function getDbTrendChartCallBack(XMLHttpRequest, data, rpcRequest, param) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			var newParam = param.split("#");
			var boxId = newParam[0];
			var chartType = newParam[1];
			generateDbTrendChart(data, chartType, boxId);
		}
	}
}

/*this function is to generate the trend line chart*/
function generateDbTrendChart(chartData, type, boxId) 
{
	if(hasValue(chartData)) {
		var data = chartData.data;
		var xAxisLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.xtitle);
		var yAxisLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.ytitle);
		var chartLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.chartTitle);
		var avgData = new Array();
		var countData = new Array();
		var sumData = new Array();
		var dateData = new Array();
		var avgData = eval(getArrayFromObject(data, 'avg'));
		var countData = eval(getArrayFromObject(data, 'count'));
		var sumData = eval(getArrayFromObject(data, 'sum'));
		if (type == "week") 
		{
			dateData = eval(getArrayWeekDateFromObject(data, 'date'));
		}
		if (type == "month") 
		{
			dateData = eval(getArrayMonthDateFromObject(data, 'date'));
		}
		if (type == "year") 
		{
			dateData = eval(getArrayYearDateFromObject(data, 'date'));
		}
		var step=2;
		if(dateData.length>50)
			step=5;
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: boxId + "_chart"
			},
			exporting: {
				enabled: false
			},
			title: {
				text: '',
				x: -2
			},
			xAxis: {
				categories: dateData,
				labels: {
					step:step,
					rotation: 270,
					y: 25
				}
			},
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: yAxisLabel,
					allowDecimals: false
				}
			},
			series: [{
				name: 'Average',
				data: avgData
			}, {
				name: 'Sum',
				data: sumData
			}, {
				name: 'Count',
				data: countData
			}]
		});
		chartLabel=htmlDecode(chartLabel);
		$("#" + boxId + "_label").text(chartLabel + " Trends");
	}
}

/*this function is to return the name array for the Customer name of google chart*/
function getNameArray(data) 
{
	var arr = new Array();
	for (var i = 0; i < data.length; i++) 
	{
		arr.push(data[i].name)
	}
	return arr;
}

/*this function is to generate the BAR chart*/
function generateDbBarChart(chartData, boxId) 
{
	if(hasValue(chartData)) {
		var isLabel=true;
		if($( document ).width()<480)
		{
			isLabel=false;
		}
		var data = chartData.data;
		var xAxisLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.xtitle);
		var yAxisLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.ytitle);
		var chartLabel = makeFirstLetterUpperCaseAndRemoveUnderscore(chartData.chartTitle);
		var nameData = new Array();
		var countData = new Array();
		nameData = getNameArray(data);
		countData = eval(getArrayFromObject(data, 'count'));
		var ci = 0;
		var countObj = new Array();
		for (var k = 0; k < countData.length; k++) 
		{
			var color = ['#80699B', '#4572A7', '#AA4643', '#89A54E', '#FF8F00', '#61AD00', '#9C4EA5', '#485792', '#FFDE94', '#4E9EA5'];
			if (k % 10 == 0 && k != 0)
				ci = 0;
			countObj.push({
				y: countData[k],
				color: color[ci]
			})
			ci = ci + 1;
		}
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: boxId + "_chart",
				type: 'bar',
				marginRight: 130
			},
			exporting: {
				enabled: false
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: nameData,
				allowDecimals: false
			},
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: xAxisLabel
				}
			},
			legend: {
				backgroundColor: '#FFFFFF',
				reversed: true,
				enabled:isLabel
			},
			tooltip: {
				formatter: function () {
					return '' + this.series.name + ': ' + this.y + '';
				}
			},
			plotOptions: {
				series: {
					stacking: 'normal'
				}
			},
			series: [{
				name: yAxisLabel,
				data: countObj
			}]
		});
		chartLabel=htmlDecode(chartLabel);
		$("#" + boxId + "_label").text(chartLabel)
	}
}

/*this function is to draw the User grid at the dashboard*/
function userGridViewTable(boxId) 
{
	$('#' + boxId + "_chart").html('<table  cellpadding="0"  cellspacing="0" border="0" class="display mytb table" id="DbviewUserGrid"></table>');
	$("#" + boxId + "_label").text("Users");
	var tableY = 380;
	var oTable = $('#DbviewUserGrid').dataTable({
		"bFilter": false,
		"bAutoWidth": true,
		"aaData": userGridTableRowData,
		"bPaginate": false,
		"bJQueryUI": true,
		"sDom": 'Rlftrip',
		"aaSorting": [ [1, 'asc'] ],
		"aoColumns": [
					   {
						"sTitle": "Firstname",
						"mData": "firstname",
						"mRender":function(data,type,full){return formatInCamelString(data)}
					   }, 
					   { "sTitle": "Email", "mData": "email", }, 
					   {
							"sTitle": "Locked",
							"mData": "lockStatus",
							"sClass": "text-center",/*details_action hidden-480*/
							"bSortable": false,
							"mRender": function (data, type, full) 
							{
								if (data == false || data == "false" || data == EMPTY_DATA_VAR /* Check applied for blank datatable field default "-" shown" */) {
									// return '<div ><i class="icon-unlock green bigger-140"></i></div>';
									return '<div>'+getCustomImage("unlockNw.png", "Unlocked", "", "20", "")+'</div>';
								} else {
									// return '<div ><i class="icon-lock red bigger-140"></i></div>';
									return '<div>'+getCustomImage("lockedNw.png", "Locked", "", "20", "")+'</div>';
								}
								return data;
							}
						}, 
						{
							"sTitle": "Status",
							"sClass": "text-center",
							"mData": "enabled",
							"mRender": function (data, type, full) {
								if (data == true) 
								{
									statuschecked = "Disable";
									// return '<span class="label label-success" style="width: 78%;text-align: center;line-height: 17px;height: 15px;">Enable</span>';
									return '<div>'+getCustomImage("user_Enabled.png", "Enabled", "", "20", "")+'</div>';
								}
								else 
								{
									statuschecked = "Enable";
									// return '<span class="label label-danger" style="width: 78%;text-align: center;line-height: 17px;height: 15px;">Disable</span>';									
									return '<div>'+getCustomImage("user_Disabled.png", "Disabled", "", "20", "")+'</div>';
								}
								return data;
							}
						}, 
						{
							"sTitle": "Action",
							"sClass": "text-center",
							"mData": "enabled",
							"mRender": function (data, type, full) {
								return '<div class="pull-rightaction-buttons"><span class="vbar"></span><a href="#Reset_password_Db_modal" data-toggle="modal" class="<!--red--> tooltipdash" title="Reset Password" id="reset_password_act_dash"><!--<i class="icon-key bigger-130"></i>-->'+ getCustomImage("resetpassnew.png", "Reset Password", "", "20", "") +'</a>&nbsp;<a href="#Update_Role_Db_Modal" id="update_role_dashboard"  data-toggle="modal" class="green tooltipdash" title="Update Roles"><!--<i class="icon-user-lineart bigger-130"></i>--> '+ getCustomImage("update-role.png", "Update Role", "", "20", "") +'</a></div>'
							}
						}
	                 ]
	});
	$('#DbviewUserGrid tbody tr td #update_role_dashboard').live('click', function () {
		var row = $(this).closest('tr').get(0);
		var aPos = oTable.fnGetPosition(row);
		var aData = oTable.fnGetData(aPos);
		show_modal_window_Db(aData.userid, "userupdateroledash.html");
	});
	$('#DbviewUserGrid tbody tr td #reset_password_act_dash').live('click', function () {
		var row = $(this).closest('tr').get(0);
		var aPos = oTable.fnGetPosition(row);
		var aData = oTable.fnGetData(aPos);
		show_modal_window_reset_Db(aData.userid, "resetpassworddash.html");
	});
	$('#DbviewUserGrid tbody tr td #edit_user_act_dash').live('click', function () {
		var row = $(this).closest('tr').get(0);
		var aPos = oTable.fnGetPosition(row);
		var aData = oTable.fnGetData(aPos);
		show_modal_window_edit_Db(aData, "edituserdash.html");
	});
}

var useridDb;

/*this function is to show the modal window for the dashboard of the User grid*/
function show_modal_window_Db(id, html_page) 
{
	useridDb = id;
	var url = context + "/pages/" + html_page;
	$.get(url, function (data) {
		$('#User_Role_Db_modal').html(data);
	});
}

var resetUserIdDb;
var jsdata;

/*this function is to show the Reset password window for the User of the Dashbaord*/
function show_modal_window_reset_Db(id, html_page) 
{
	resetUserIdDb = id;
	var url = context + "/pages/" + html_page;
	$.get(url, function (data) {
		$('#Reset_password_db').html(data);
	});
}

/*this function is to open the User edit window from the dashbaord*/
function show_modal_window_edit_Db(jsondata, html_page) 
{
	jsdata = jsondata;
	var url = context + "/pages/" + html_page;
	$.get(url, function (data) {
		$('#edit_user_db').html(data);
	});
}

/*this function is to return the row according to the key*/
function getKeyById(arr, key) 
{
	for (var i = 0; i < arr.length; i++) 
	{
		if (arr[i].id == key)
			return arr[i]
	}
	return '';
}

/*this function will the array of the chart json to draw in the order*/
function getDashboardPortalDataArr() 
{
	var cooValue = getCookie();
	if (hasValue(cooValue)) 
	{
		var IdArr = cooValue.split(',');
		var arr = new Array();
		checkStaticChartInAddWidget(IdArr);
		for (var i = 0; i < IdArr.length; i++) 
		{
			arr.push(getKeyById(dashboardChartData, IdArr[i]));
		}
		return arr;
	}
	return dashboardChartData;
}

/*this function will the array of the chart json to draw in the order*/
function getDashboardTopwidgetPortalDataArr() 
{
	var cooValue = getCookie();
	if (hasValue(cooValue)) 
	{
		var IdArr = cooValue.split(',');
		var arr = new Array();
	    var TopwidgetId =	checkChartInTopWidget(IdArr);
		for (var i = 0; i < TopwidgetId.length; i++) 
		{
			arr.push(getKeyById(dashboardChartData, TopwidgetId[i]));
		}
		return arr;
	}
}

var DashboardCloseBoxId = new Array();

/*Function is used to check static chart in add widget*/
function checkStaticChartInAddWidget(IdArr) 
{
	var dashIds = new Array();
	dashIds = eval(getArrayFromObject(dashboardChartData, 'id'));
	var diffIds = getDiffFromArrayForDbBox(dashIds, IdArr);
	DashboardCloseBoxId = diffIds;
}

/*Function is used to check chart in top widget*/
function checkChartInTopWidget(IdArr) 
{
	var dashIds = new Array();
	dashIds = eval(getArrayFromObject(dashboardChartData, 'id'));
	var diffIds = getDiffFromArrayForDbBox(dashIds, IdArr);
	return diffIds;
}

/*Function is used to put different array value in array*/
function getDiffFromArrayForDbBox(arr1, arr2) 
{
	var diffArr = new Array();
	for (var i = 0; i < arr1.length; i++) 
	{
		if (!checkValueInArr(arr2, arr1[i]))
			diffArr.push(arr1[i])
	}
	return diffArr;
}

/*Function is used to check value in array*/
function checkValueInArr(arr, value) 
{
	for (var i = 0; i < arr.length; i++) 
	{
		if (arr[i] == value)
			return true
	}
	return false;
}

/*this function is to load the dashboard boxes*/
function loadDashboardPortlet() 
{
	var arr = getDashboardPortalDataArr();
	var toparr = getDashboardTopwidgetPortalDataArr(); 
	if(hasValue(toparr))
	{
		for (var i = 0; i < arr.length; i++) 
		{
			var element = arr[i];
			var permission =element.permission;
			if(hasValue(permission))
			{
				if(eval(permission))
				{
					if (element.type == "line") 
					{
						var url = element.url + "?trend=week";
						getDashBoardWidget(url, element.type, element.id);
					}
					else 
					{
						getDashBoardWidget(element.url, element.type, element.id);
					}
				}
			}
			else
			{
				if(usermgmt)
				{
					getDashBoardWidget(element.url,"users", "3");
				}
			}
		}
		loadDashboardTopWidgetPortal();
	}
	else
	{
		var chartRefId = "";
		for (var i = 0; i < (arr.length-2); i++)
	    {
			chartRefId += arr[i].id + ',';
		}
		if (chartRefId.length > 1)
			chartRefId = chartRefId.substring(0, chartRefId.length - 1);
	  setCookie('portal-state', chartRefId, 7)
	  loadDashboardPortlet();
	}
}

/*this function is to load the dashboard boxes*/
function loadDashboardTopWidgetPortal() 
{
	var arr = getDashboardTopwidgetPortalDataArr(); 
	for (var i = 0; i < arr.length; i++) 
	{
		var element = arr[i];
		var permission =element.permission;
		if(hasValue(permission))
		{
			if(eval(permission))
			{
				if (element.type == "line") 
				{
					var url = element.url + "?trend=week";
					getDashBoardTopWidget(url, element.type, element.id);
				}
				else 
				{
					getDashBoardTopWidget(element.url, element.type, element.id);
				}
			}
		}
	    else
	    {
			if(usermgmt)
			{
				getDashBoardTopWidget(element.url,"users", "3");
			}
	    }
	}
	window.setTimeout(function(){
										slider =  $('.slider3').bxSlider({
										mode1:"fade",
										slideWidth: 580,
										minSlides: 1,
										slideMargin: 10,
										infiniteLoop: false,
										hideControlOnEnd: true
										});
								},500);	
	changeHeaderColor();
}

/*this function is to load the dashboard boxes*/
function loadDashboardTopWidgetPortalWithoutSlide() 
{
	var arr = getDashboardTopwidgetPortalDataArr(); 
	for (var i = 0; i < arr.length; i++) 
	{
		var element = arr[i];
		var permission =element.permission;
		if(hasValue(permission))
		{
			if(eval(permission))
			{
				if (element.type == "line") 
				{
					var url = element.url + "?trend=week";
					getDashBoardTopWidget(url, element.type, element.id);
				}
				else 
				{
					getDashBoardTopWidget(element.url, element.type, element.id);
				}
			}
	    }
	    else
	    {
			if(usermgmt)
			{
				getDashBoardTopWidget(element.url,"users", "3");
			}
		}
	}
	window.setTimeout(function(){slider.reloadSlider();},500);
}

/*line chart box html*/
function getLineChartHTML(boxId, url, param, chartRefId) 
{
	return "<div id='" + boxId + "' class='dbportlet ca-item ca-item-1 slide'><div class='widget-box transparent'><div class='widget-header'><h4 refId='" + chartRefId + "' class='lighter' id='" + boxId + "_label'></h4><div class='widget-toolbar no-border'><button onclick='getDbTrendChart(&quot;" + url + "&quot;,&quot;" + param + "&quot;,&quot;week&quot;); selectButtonDashboard("+boxId+",this);' class='btn btn-minier btn-grey' id='week'>Weekly</button><button id='month' onclick='getDbTrendChart(&quot;" + url + "&quot;,&quot;" + param + "&quot;,&quot;month&quot;); selectButtonDashboard("+boxId+",this);' class='btn btn-minier btn-primary'>Monthly</button><button onclick='getDbTrendChart(&quot;" + url + "&quot;,&quot;" + param + "&quot;,&quot;year&quot;);selectButtonDashboard("+boxId+",this);' class='btn btn-minier btn-primary'  id='year'>Yearly</button></div><div class='widget-toolbar no-border'></div></div><div class='widget-body dashBoardLineChart' id='" + boxId + "_chart' style='height: 245px;'><div style='height:200px;' class='widget-main padding-6'></div></div></div></div>";
}

/*recent activity box html*/
function getRecentActivityHTML(boxId, chartRefId) 
{
	return "<div id='" + boxId + "' class='dbportlet ca-item ca-item-1 slide'><div class='widget-box transparent'><div class='widget-header'><h4 refId='" + chartRefId + "' class='lighter' id='" + boxId + "_label'></h4><div class='widget-toolbar no-border'></a></div></div><div class='widget-body' id='" + boxId + "_chart' style='height:245px;'><div style='height:200px;' class='widget-main padding-6'><div class='comments' id='recentActivityDiv' style='overflow: hidden; width: auto; height: 230px;'></div></div></div></div>"
}

/*google map box html*/
function getGoogleMapHTML(boxId, chartRefId) 
{
	mapboxid=boxId+"_label";
	return "<div id='" + boxId + "'  class='dbportlet ca-item ca-item-1 slide'><div id='dbRow1_1'><div class='widget-box transparent'><div class='widget-header'><h4 refId='" + chartRefId + "' class='lighter' id='" + boxId + "_label'>Users Map</h4><div class='widget-toolbar no-border'><div class='btn-group'><button data-toggle='dropdown' class='btn  btn-grey btn-mini dropdown-toggle'>Type<i class='icon-angle-down icon-on-right'></i></button><ul id='dbCountryValue' class='dropdown-menu dropdown-inverse pull-right'></ul></div><div class='btn-group'><button data-toggle='dropdown' class='btn btn-primary btn-mini dropdown-toggle'>Country<i class='icon-angle-down icon-on-right'></i></button><ul id='dbCountryList' class='dropdown-menu dropdown-inverse pull-right'></ul></div></div><div class='widget-toolbar no-border'></div></div><div class='widget-body'style='height: 245px;'><div class='widget-main padding-6'><div style='overflow: hidden; width: auto; height: 230px;' id='map_addresses' class='map'><p>This will be replaced with the Google Map.</p></div></div></div></div></div></div>";
}

/*other chart box html*/
function getOtherBoxHTML(boxId, chartRefId) 
{
	return "<div id='" + boxId + "' class='dbportlet ca-item ca-item-1 slide'><div class='widget-box transparent'><div class='widget-header'><h4 class='lighter' refId='" + chartRefId + "' id='" + boxId + "_label'></h4><div class='widget-toolbar no-border'></div></div><div class='widget-body dashBoardChart' id='" + boxId + "_chart' ><div style='height:200px;' class='widget-main padding-6'></div></div></div></div>";
}

/*this function is to decide the chart needs to be added in the row*/
function getDashBoardWidget(url, chartType, chartRefId) {
	addStaticDbChart("DashboardDragParentDiv", url, chartType, chartRefId);
}

/*this function is to decide the chart needs to be added in the row*/
function getDashBoardTopWidget(url, chartType, chartRefId) 
{
	addStaticDbChart("topwidgetsDiv", url, chartType, chartRefId);
}

/*this function is to add the static chart in the existing row*/
function addStaticDbChart(rowId, url, chartType, chartRefId) 
{
	randomDbBoxCounter = randomDbBoxCounter + 1
	var boxId = rowId + randomDbBoxCounter;
	var param = boxId + "#" + chartType;
	var urltemp = url;
	if (chartType == "line") 
	{
		var url1 = urltemp.split('?');
		urlButton = url1[0] + "?";
		$("#" + rowId).append(getLineChartHTML(boxId, urlButton, param, chartRefId));
	}
	if (chartType == 'recent') 
	{
		$("#" + rowId).append(getRecentActivityHTML(boxId, chartRefId));
		$("#" + boxId + "_label").text("Recent Activity");
	}
	if (chartType != 'recent' && chartType != 'line' && chartType != 'google')
		$("#" + rowId).append(getOtherBoxHTML(boxId, chartRefId));
	if (chartType == 'google')
		$("#" + rowId).append(getGoogleMapHTML(boxId, chartRefId));
	sendGETRequest(context + "/rest" + url, "addStaticDbChartCallback", param);
}

/*callback for the static boxes of the dashbaord*/
function addStaticDbChartCallback(XMLHttpRequest, data, rpcRequest, param) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			var newParam = param.split("#");
			var boxId = newParam[0]
			var chartType = newParam[1]
			if (chartType == "google")
				generateDropdowntable(data);
			if (chartType == "pie")
				generateDbPieChart(data, boxId);
			if (chartType == "donut")
				generateDbDonutChart(data, boxId);
			if (chartType == "line")
				generateDbTrendChart(data, "week", boxId);
			if (chartType == "bar")
				generateDbBarChart(data, boxId);
			if (chartType == "recent")
				generateDbRecentActivtyData(data);
			if (chartType == "users") 
			{
				userGridTableRowData = data;
				userGridViewTable(boxId);
			}
			enableDashbaordDragAndDrop();
		}
	}
}

/*this function is called to load the recent activity*/
function generateDbRecentActivtyData(data) 
{
	setRecentActivityData(data);
	window.setTimeout("getRecentactivitydatafordashboard()", 50000);
}

/*this function is to add widget on the dashboard box*/
function addWidgetInDashboard(chartId, chartTitle) 
{
	addChartInRow("DashboardDragParentDiv", chartId, chartTitle)
	$('#db_static_li_'+chartId).css('display','none');
}

/*add analytic chart in new row*/
function showStaticChartInLiAgain(chartId)
{
	$('#db_static_li_'+chartId).css('display','');
}


/*add analytic chart in existing row*/
function addChartInRow(rowId, chartId, chartTitle) 
{
	var boxId = rowId + "_2";
	$("#" + rowId).append("<div id='" + boxId + "' class='dbportlet ca-item ca-item-1 slide'><div class='widget-box transparent'><div class='widget-header'><h4 class='lighter'>" + chartTitle + "</h4><div class='widget-toolbar no-border'><a href='javascript:void(0)' onclick='showStaticChartInLiAgain("+chartId+")' data-action='close'><i class='icon-remove'></i></a></div></div><div id='"+boxId+"_dyna_chart' class='widget-body'><div style='220px' class='widget-main padding-6'></div></div></div></div>");
	getDbChartData(chartId, boxId)
}

/*this function is to send the request for the add widget charts*/
function getDbChartDataGenerated(chartId, boxId) 
{
	var url = getChartURLById(chartId);
	sendGETRequest(context + "/rest/Dashboard/" + url, "getDbChartDataCallback", boxId)
}

/*add widget data in the dropdown*/
function addValuesInWidgetDropDown() 
{
	$("#addWidgetValue").empty();
	var data = new Array();
	if (DashboardCloseBoxId.length > 0) 
	{
		for (var k = 0; k < DashboardCloseBoxId.length; k++) 
		{
			var element = getKeyById(dashboardChartData, DashboardCloseBoxId[k]);
			if(hasValue(element.permission))
			{		
				if(eval(element.permission))
				{
					$("#addWidgetValue").append("<li><a title='" + element.title + "' href='javascript:openStaticDbChartFromDb(" + DashboardCloseBoxId[k] + ")'>" +replaceUnderscore( formatName(element.title, 30)) + "</a></li>")
				}
			}
			else
			{
				 if(usermgmt)
				 {
					$("#addWidgetValue").append("<li><a title='" + element.title + "' href='javascript:openStaticDbChartFromDb(" + DashboardCloseBoxId[k] + ")'>" +replaceUnderscore(formatName(element.title, 30)) + "</a></li>")
				 }
			}
		}
	}
	if (data.length > 0) 
	{
		for (var i = 0; i < data.length; i++) 
		{
			var row = data[i];
			var chartId = row.id;
			var chartTitle = row.title;
			var liId= 'db_static_li_'+chartId;
			$("#addWidgetValue").append("<li id='"+liId+"'><a title='" + chartTitle + "' href='javascript:addWidgetInDashboard(" + chartId + ",\"" + chartTitle + "\")'>" + replaceUnderscore(formatName(chartTitle, 30))+ "</a></li>")
		}
	}
	else 
	{
		$("#dashboard_nav_search").css('display', 'block');
	}
	if (DashboardCloseBoxId.length <= 0&&data.length <= 0) 
	{
		$("#addWidgetValue").append("<li><a >No widgets available</a></li>")
	}
}

/*called to open the static chart from the add widget dropdown*/
function openStaticDbChartFromDb(id) 
{
	var element = getKeyById(dashboardChartData, id);
	if (element.type == "line") 
	{
		var url = element.url + "?trend=week";
		getDashBoardWidget(url, element.type, element.id);
	}
	else 
	{
		getDashBoardWidget(element.url, element.type, element.id);
	}
	getDashboardUIBoxOrder();
	$('#DashboardDragParentDiv').empty();
				loadDashboardPortlet();
				addValuesInWidgetDropDown();
}

/*get the chart object by the id from the chart data*/
function getChartURLById(chartId) 
{
	var data = chartMeta;
	for (var i = 0; i < data.length; i++) 
	{
		var row = data[i];
		if (chartId == row.id)
			return row.url;
	}
	return "";
}

/*get the chart for the add widget*/
function getDbChartData(chartId, boxId) 
{
	var url = getChartURLById(chartId);
	sendGETRequest(url, "getDbChartDataCallback", boxId)
}

/*callback for the add widget chart*/
function getDbChartDataCallback(XMLHttpRequest, data, rpcRequest, boxId) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			$("#" + boxId + "_dyna_chart").append(data);
			enableDashbaordDragAndDrop();
		}
	}
}

/*this function is to format the name field upto 60 characters*/
function formatName(value, count) 
{
	if (!hasValue(count))
		count = 60;
	var str = "";
	if (hasValue(value)) 
	{
		if (value.length > count)
			str = value.substring(0, count - 3) + "...";
		else
			str = value;
		return str;
	}
	return value;
}

var tableNameforDbDropDown = new Array();
var countryNameforDbDropDown = new Array();

/*callback for the country name request*/
function getUserCountryForChartCallBack(XMLHttpRequest, data, rpcRequest) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			generateDropdowntable(data)
		}
	}
}

 /*to generate the country dropdown for the google map*/
function generateDropdowncountry(data) 
{
	var allData = new Array();
	for (var i = 0; i < data.length; i++) 
	{
		if(!(tableNameVar=="Users"))
		{
			if(hasValue(data[i].address))
			{
					var country=data[i].address.country;
					country=country.toUpperCase();
					allData.push(country);
			}
		}
		else
		{
			if(hasValue(data[i].userAddress))
			{
				var country=data[i].userAddress.country;
				country=country.toUpperCase();
				allData.push(country);
			}
		}
	}
	countryNameforDbDropDown = _.uniq(allData.sort());
	setcountryDropdownValue();
}


/*Function is used to generate the table*/
function generateDropdowntable(data) 
{
	var allData = new Array();
	for (var i = 0; i < addressFields.length; i++) 
	{
		allData.push(addressFields[i]);
	}
	tableNameforDbDropDown = _.uniq(allData);
	settableDropdownValue();
	generateDropdowncountry(data);
	getUserByTable(tableNameforDbDropDown[0]);
	tableNameforDbDropDown[0]=htmlDecode(tableNameforDbDropDown[0]);
	$('#'+mapboxid).text(formatInCamelString(tableNameforDbDropDown[0])+" Map");
}

/*set the country dropdown value in the google box*/
function settableDropdownValue() 
{
	var data = tableNameforDbDropDown;
	$("#dbCountryValue").empty();
	for (var i = 0; i < data.length; i++) 
	{
		$("#dbCountryValue").append("<li><a href='javascript:getUserByTable(\"" + data[i] + "\")'onclick='setTableNameInVar(\"" + data[i] + "\")'>" + data[i] + "</a></li>")
	}
}

/*Function is used to set set value of country in dropdown*/
function setcountryDropdownValue() 
{
	var data = countryNameforDbDropDown;
	$("#dbCountryList").empty();
	for (var i = 0; i < data.length; i++) 
	{
		$("#dbCountryList").append("<li><a href='javascript:getUserByCountry(\"" + data[i] + "\")'onclick='setcountryNameInVar(\"" + data[i] + "\")'>" + data[i] + "</a></li>")
	}
	$('#dbCountryList').css('max-height', '250px');
	$('#dbCountryList').css('overflow-y', 'auto');
}

/*Function is used to set country name in variable*/
function setcountryNameInVar(name)
{
	countryNameVar=name;
}

/*Function is used to set table name in variable*/
function setTableNameInVar(name)
{
	tableNameVar=name;
}

/*to get the user data by country*/
function getUserByTable(tableName) 
{
	$('#'+mapboxid).text(formatInCamelString(tableName)+" Map");
	sendGETRequest(context + "/rest/"+tableName+"/search?&ulimit=1000&llimit=0", "getUserByTableCallBack", "");
}

/*Function is used to get  User Accroding to country*/
function getUserByCountry(countryName) 
{
	$('#'+mapboxid).text(formatInCamelString(tableNameVar)+" Map");
	$('#countryListbrdcumb').text(formatInCamelString(countryName));
	if(hasValue(currentDomainId))
	{
		if(!(tableNameVar=="Users"))
		{
			sendGETRequest(context + "/rest/"+tableNameVar+"/search?_s=address.country=="+countryName+";domain.domainid=="+currentDomainId+"&orderBy=modifiedTime&orderType=desc&ulimit=1000&llimit=0", "getUserByCountryCallBack", "");
		}
		else
		{
			sendGETRequest(context + "/rest/"+tableNameVar+"/search?_s=userAddress.country=="+countryName+";domain.domainid=="+currentDomainId+"&orderBy=modifiedTime&orderType=desc&ulimit=1000&llimit=0", "getUserByCountryCallBack", "");
		}
	}
	else
	{
		if(!(tableNameVar=="Users"))
		{
			sendGETRequest(context + "/rest/"+tableNameVar+"/search?_s=address.country=="+countryName+"&orderBy=modifiedTime&orderType=desc&ulimit=1000&llimit=0", "getUserByCountryCallBack", "");
		}
		else
		{
			sendGETRequest(context + "/rest/"+tableNameVar+"/search?_s=userAddress.country=="+countryName+"&orderBy=modifiedTime&orderType=desc&ulimit=1000&llimit=0", "getUserByCountryCallBack", "");
		}
	}
}

/*callback for the customer data by country*/
function getUserByTableCallBack(XMLHttpRequest, data, rpcRequest) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			var chartData = formatGoogleChartData(data);
			setDbGoogleMap(chartData)
			generateDropdowncountry(data);
		}
	}
}


/*callback for the user data by country*/
function getUserByCountryCallBack(XMLHttpRequest, data, rpcRequest) 
{
	if (!checkException(XMLHttpRequest.responseText)) 
	{
		if (XMLHttpRequest.status == 200) 
		{
			var chartData = formatGoogleChartData(data);
			setDbGoogleMap(chartData)
		}
	}
}

/*formatting the data for the google chart*/
function formatGoogleChartData(data) 
{
	var gMapData = new Array();
	for (var i = 0; i < data.length; i++) 
	{
		var row = data[i];
		var addr = "";
		if(!(tableNameVar=="Users"))
		{
			if (hasValue(row.address))
			{
				if (hasValue(row.address.city))
					addr = addr + " " + row.address.city
				if (hasValue(row.address.zip))
					addr = addr + " " + row.address.zip
				if (hasValue(row.address.country))
					addr = addr + " " +row.address.country
			}
		}
		else
		{
			if (hasValue(row.userAddress))
			{	if (hasValue(row.userAddress.city))
					addr = addr + " " + row.userAddress.city
				if (hasValue(row.userAddress.zip))
					addr = addr + " " + row.userAddress.zip
				if (hasValue(row.userAddress.country))
					addr = addr + " " +row.userAddress.country
			}
		}			
		gMapData.push({
			address: addr,
			html: row.customerName
		})
	}
	return gMapData;
}

/*set the data in the google map*/
function setDbGoogleMap(data) 
{
	$('#map_addresses').empty();
	$('#map_addresses').gMap({
		zoom: 5,
		markers: data
	});
}

/*to enable the Drag and Drop functionality for the dashboard boxes*/
function enableDashbaordDragAndDrop() 
{
   $( ".dashboardColumn" ).sortable({
      connectWith: ".dashboardColumn",
      update: function( event, ui ) {
		changeHeaderColor();
		getDashboardUIBoxOrder()
		}
    });
    $( ".dashboardColumn" ).disableSelection(); 
}

/*this function is to get the Box order of the dashbarod and set in the Cookie*/
function getDashboardUIBoxOrder() 
{
	$('#displayMessage').empty("");
	var rowIds = new Array();
	var chartRefId = '';
	$("#DashboardDragParentDiv .lighter").each(function(){
		var title = $(this).attr('refId');
		if (hasValue(title))
			chartRefId += title + ','
	})
	if (chartRefId.length > 1)
		chartRefId = chartRefId.substring(0, chartRefId.length - 1);
	if (hasValue(chartRefId))
		setCookie('portal-state', chartRefId, 7);
	if($('.bx-wrapper').is(':visible')) 
	{
		slider.reloadSlider();
	}
	var toparr = getDashboardTopwidgetPortalDataArr(); 
	if(!(hasValue(toparr)))
	{
		appenddefaultChartTopWidgets()
	}
	if(!view_recent_activity_permission && toparr.length==3){
		appenddefaultChartTopWidgets();
	    }
}

/*This function is to use append default chart when top widget is blank*/
function appenddefaultChartTopWidgets()
{
	$('.bx-wrapper').css("width","50%");
	$('#displayMessage').empty("");
	$('#displayMessage').append("No widgets available");
	$('.bx-next').css("display","none");
	$('#displayMessage').css("width",'280px');
}

/*decide to set the value in cookie or not for the dashboard*/
function checkCookie() 
{
	if (hasValue(getCookie())) 
	{
	}
	else 
	{
		setCookie('portal-state', getDbDefaultCookieValue(), 7)
	}
}

/*to get the default order of the dashboard boxes */
function getDbDefaultCookieValue() 
{
	if (dashboardChartData.length > 0) 
	{
		cookValue = ""
		for (var i = 0; i < dashboardChartData.length; i++) 
		{
			cookValue += dashboardChartData[i].id + ",";
		}
		if (cookValue.length > 1)
			cookValue = cookValue.substring(0, cookValue.length - 1);
		return cookValue;
	}
	return "";
}


/*get value of portal state from the cookie*/
function getCookie() 
{
	var a = document.cookie;
	if (hasValue(a)) 
	{
		return getCookieValue('portal-state')
	}
	return '';
}

/*set the cookie value for the dashboard*/
function setCookie(c_name, value, exdays) 
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

/*called when box is close*/
function closePortal(id,boxId) 
{
	var closeId = getCookie();
	if (hasValue(closeId)) 
	{
		var divid =boxId.id;
		var parentdiv = divid.split("Div");
		if(parentdiv[0] == "DashboardDragParent")
		{
			removeIdFromCookieOfCloseBox(id);
			$('#DashboardDragParentDiv').empty();
			$('#topwidgetsDiv').empty();
			loadDashboardPortlet();
			loadDashboardTopWidgetPortalWithoutSlide();
		}
		else
		{
			removeIdFromCookieOfCloseBoxAddBottom(id);
			$('#DashboardDragParentDiv').empty();
			$('#topwidgetsDiv').empty();
			loadDashboardPortlet();
			loadDashboardTopWidgetPortalWithoutSlide();
		}
	}
}

/*remove id of close box Top and add to bootom boxfrom the cookie*/
function removeIdFromCookieOfCloseBoxAddBottom(id) 
{	
	var chartRefId = '';
	$("#DashboardDragParentDiv .lighter").each(function () 
	{
		var title = $(this).attr('refId');
		if (hasValue(title) && title != id)
			chartRefId += title + ','
	});
	chartRefId += id
	if (hasValue(chartRefId))
		setCookie('portal-state', chartRefId, 7)
}

/*remove id of close box from the cookie*/
function removeIdFromCookieOfCloseBox(id) 
{	
	var chartRefId = '';
	$("#DashboardDragParentDiv .lighter").each(function () {
		var title = $(this).attr('refId');
		if (hasValue(title) && title != id)
			chartRefId += title + ','
	});
	if (chartRefId.length > 1)
		chartRefId = chartRefId.substring(0, chartRefId.length - 1);
	if (hasValue(chartRefId))
		setCookie('portal-state', chartRefId, 7)
}

/*Function is used to toggle add widget*/
function toogleDbAddWidget()
{
	$("#displayMessage").slideToggle(1000);
	$(".bx-wrapper").slideToggle(1000);
}

/*Function is used to change header color*/
function changeHeaderColor()
{
	$("#DashboardDragParentDiv .widget-header").each(function(){
		$(this).css("color","#4D4D4D").css("background-color","#E0E0E0");
		// .css("background","url(../images/table-head.jpg)")
	});
	$("#DashboardDragParentDiv .widget-box").each(function(){
		$(this).css("border","1px solid #ddd");
	});
}

/*function used to select tab header button color in trend charts*/
function selectButtonDashboard(divid,buttonid)
{
	$("#"+divid.id).find(".btn").each(function ()
	{
			if(buttonid.id == this.id)
			{
				if($("#"+buttonid.id).hasClass('btn-primary'))
				{
					$("#"+buttonid.id).removeClass("btn-primary");
					$("#"+buttonid.id).addClass("btn-grey");
				}	
			}
			else
			{
				$(this).removeClass("btn-grey");
				$(this).addClass("btn-primary");
			}
	});
}

/**************************************Dashboard Js End Here*********************************************/
