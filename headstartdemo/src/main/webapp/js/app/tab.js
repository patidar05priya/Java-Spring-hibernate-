function createTabScreen(tabId,callId)
{   removeAllInstanceOfEditor();
	check_list_view_screen=true;
    list_view_callId=callId;
	hasSession();
	if(checkTab(tabId))
	{	closeTab(tabId);
		addTab(tabId);
		onselectHighlight();
	}
	else
	{
		closeTab(tabId);
		addTab(tabId);
		onselectHighlight();
	}
	showSelectTabHighLight(tabId)	
}


/*this function is to add application tab*/
function addTab(tabId)
{ 
 var tabName="";
	if(tabId=="emailnotifications"){
	tabName = "Email Notifications"
	}
	else
	{
		tabName = eval(tabId+"_tab_li_a");
	}
  /*to add tab button in the ul tag*/
  if(tabId!="dashboard"){
 $('<li><a href="#tab'+tabId+'" id="'+tabId+'" data-toggle="tab" onclick="removeAllInstanceOfEditor()">'+tabName+'<span  onclick="closeTab(\''+tabId+'\')" ><i class="icon-remove" style="margin-left: 5px;"></i></span></a></li>').appendTo('#tabs');}
  else{
   $('<li><a href="#tab'+tabId+'" id="'+tabId+'" data-toggle="tab"  onclick="removeAllInstanceOfEditor()">'+tabName+'</a></li>').appendTo('#tabs');}
 
  /*to make tab content*/
  if(UserLang=="en"){
	  
  $('<div class="tab-pane" id="tab'+tabId+'"></div>').appendTo('#indextab-content');
  $('#tab'+tabId+'').load(context + "/pages/"+tabId+'.html');
	$('#tabs #'+tabId+'').tab('show');
  }
  
  if(UserLang=="french"){
	 
  $('<div class="tab-pane" id="tab'+tabId+'"></div>').appendTo('#indextab-content');
  $('#tab'+tabId+'').load(context + "/pages_french/"+tabId+'.html');
	$('#tabs #'+tabId+'').tab('show');
  }
  if(UserLang=="spanish"){
  $('<div class="tab-pane" id="tab'+tabId+'"></div>').appendTo('#indextab-content');
  $('#tab'+tabId+'').load(context + "/pages_spanish/"+tabId+'.html');
	$('#tabs #'+tabId+'').tab('show');
  }
}

/*this function is to check whether tab is created or not*/
function checkTab(tabId)
{
	if($('#tabs #'+tabId+'').length==1)
	{	
		return false;
	}
	else
		return true;
}

/*this function is to select the tab*/
function selectTab(tabId)
{   
	$('#tabs #'+tabId+'').tab('show');
}

/*this function is to create the tab*/
function createTab(tabId)
{
	updateRememberMetoken();
	removeAllInstanceOfEditor();
	check_list_view_screen=false;
		hasSession();
	if(checkTab(tabId))
		{addTab(tabId)
		onselectHighlight();
		}
	else
		selectTab(tabId);
	
	showSelectTabHighLight(tabId)	
}

/*this function is to show the highlight the select tab*/
function showSelectedTab(tabId)
{
	
}

function createDashboardTab()
{
	createTab("dashboard");
}
function createAllNotificationTab()
{
	createTab("notifications");
}
function createEmailNotificationTab()
{
	createTab("emailnotifications");
}

function createWorklistTab()
{
	createTab("worklist");	
}

function createAuditTab()
{
	createTab("audit");	
}

function createReportTab()
{
	createTab("report");	
}

function createProfileTab()
{
	createTab("profile");	
}

function createSettingTab()
{
	createTab("settings");	
}

function createAnalyticsTab()
{
	createTab("analytics");	
}

function createUserTab()
{
	createTab("user");	
}
function createRoleTab()
{
	createTab("role");	
}
function createPermissionTab()
{
	createTab("permission");	
}

function closeTab(tabId)
{   
	//selectTab('dashboard');
	//$('#tabsMain #'+tabId+'').remove();
	$('#tabs #'+tabId).remove();
	$('#tab'+tabId).remove();
	$('#breadcrumbs #breadcrumbs_'+tabId).remove();
	$('#tab-content #tab-content_'+tabId).remove();
	closeTabRemoveHighLight(tabId);
}

function closeTabRemoveHighLight(tabId)
{
	$("#"+tabId+"_tab_btn").removeClass("active");
	
	var idArr = "";
	$('#tabs li').each(function() {
		if(hasValue($(this).find('a:eq(0)').attr('id')))
			idArr = $(this).find('a:eq(0)').attr('id')
	});

	selectTab(idArr);
	showSelectTabHighLight(idArr)
}

function showSelectTabHighLight(tabId)
{
	
	$('#appMenu li').each(function() {
		var id = $(this).attr('id');
		if(hasValue(id))
		{
			if($("#"+id).hasClass('active')){
				$("#"+id).removeClass("active");
			}
		}
	});

		$('#appMenu .nav li').each(function() {
		if($(this).hasClass('active')){
			$(this).removeClass("active");
			$(this).removeClass("open");
		}		
		});
	
	if(tabId=="user" || tabId=="role" || tabId=="permission")
		$("#usermanagement_tab_btn").addClass('active');
	else
	{	
		$("#"+tabId +"_tab_btn").addClass('active');
		$("#usermanagement_tab_btn").removeClass('active');
		$("#usermanagement_tab_btn").removeClass('open');
	}
}


function onselectHighlight()
{
$("#tabs li").click(function(){
if(hasValue($(this).find('a:eq(0)').attr('id'))){
var idArr = $(this).find('a:eq(0)').attr('id')
showSelectTabHighLight(idArr)
}
});
}
