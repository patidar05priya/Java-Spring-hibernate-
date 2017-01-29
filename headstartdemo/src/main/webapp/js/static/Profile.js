/**************************************Profile Js Starts Here*********************************************/

var enableStatus;
var sendUserJson;
var useraddressJson;
	
/*Call Back Function of Getting User Image*/	
function get_User_Image_Callback(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		jQuery("#avatar").attr("src","../rest/Users/getUserImage?&date="+new Date());
	}
	else
	{
		jQuery("#avatar").attr("src","../images/avatar2.png");
	}
}

// to get USer Profle details
function getUserProfileDetails()
{
	sendGETRequest(context+"/rest/Users/userincontext?date="+new Date(),"getUserProfileData", "","");
}

/*Call Back Function is used to get User Profile Data*/
function getUserProfileData(XMLHttpRequest, data, rpcRequest)
{	
	$("#userProfileDiv").css("display","");
	$("#userProfileDivEdit").css("display","none");
	useraddressJson=data.userAddress;
	setUserProfile(data);
}

/*Call Back Function is used to Update User Profile Data*/
function updateUserProfile(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{
		showCenteredLoading(profile_update_successMsg);	
		$('#edit_profile_Modal').fadeOut();
	}
	window.setTimeout(function(){sendGETRequest(context+"/rest/Users/userincontext?date="+new Date(),"getUserProfileData", "","");},1000);
}

var userProfileJson;

/*Function is used to set user profile*/
function setUserProfile(data)
{
	openViewScreenForProfile();
	userProfileJson=data;
	/*$("#userDetail #headerUserName").append(data.firstname+ " " + data.lastname );
	$("#userDetail #headerUserEmail").append(data.email);
	$("#userDetail #headerUserTelephone").append(data.telephone);*/
	$("#userDetail #headerUserName").empty().append('<i class="icon-user"></i>&nbsp;' + data.firstname + "&nbsp;" + data.lastname);
	$("#userDetail #headerUserEmail").empty().append('<i class="icon-envelope"></i>&nbsp;' + data.email);
	var telephone = htmlDecode(data.telephone);
	if(hasValue(telephone))
		$("#userDetail #headerUserTelephone").empty().append('<i class="icon-phone"></i>&nbsp;' + telephone);
	else
		$("#userDetail #headerUserTelephone").empty().append('<i class="icon-phone"></i>&nbsp;' + "--");

	$('#userProfileDiv span').each(function() {
	var getId=$(this).attr("id");
	var value_Set = eval("data."+getId) || "null";
	if(hasValue(value_Set))
	{
		if(getId=="enabled")
		{
			enableStatus=value_Set;
		}
		if(getId=="modifiedtime" ||  getId=="creationtime")
		{
			value_Set=formatAsDateandTime (value_Set,"-",true);
		}
		$(this).html(value_Set);
	}
	if(hasValue(eval("data.userAddress")))
	{
		value_Set= eval("data.userAddress."+getId);
		if(hasValue(value_Set))
		{
			if(getId=="state" ||  getId=="country"|| getId=="city")
			{
				if(hasValue(eval("data.userAddress")))
				{
					value_Set= eval("data.userAddress."+getId);
				}
			}
			$(this).html(value_Set);
		}
	}
	else
	{
		if(getId=="state" ||  getId=="country"|| getId=="city")
		{
			value_Set= "--";
			$(this).html(value_Set);
		}
	}
	});
	$('#userProfileDivEdit #username').val(htmlDecode(data.username));
	$('#userProfileDivEdit #userid').val(htmlDecode(data.userid));
	$('#userProfileDivEdit #email').val(htmlDecode(data.email));
	$('#userProfileDivEdit #firstname').val(htmlDecode(data.firstname));
	$('#userProfileDivEdit #lastname').val(htmlDecode(data.lastname));
	if(hasValue(data.userAddress))
	{
		$('#userProfileDivEdit #country').val(htmlDecode(data.userAddress.country));
		$('#userProfileDivEdit #city').val(htmlDecode(data.userAddress.city));
		$('#userProfileDivEdit #state').val(htmlDecode(data.userAddress.state));
	}
	$('#userProfileDivEdit #telephone').val(htmlDecode(data.telephone));
	$("#userprofilename").html(htmlDecode(data.username));
}

/* Function is used to update user information */
function updateUserInfo()
{		
	var newemail;
	if(jQuery('#profileEdit').validationEngine('validate'))
	{
		sendUserJson='{';
		$('#userProfileDivEdit input').each(function() {
			var getId=$(this).attr("id");	
			if(!(getId=="state" )&&  !(getId=="country")&& !(getId=="city"))
			{			
				sendUserJson+='"'+getId+'":';						
				var getvalue=$(this).val();
				if(getId=="enabled")
				{
					sendUserJson+='"'+enableStatus+'",';
				}
				else
				{
					if(getvalue == "--")
					{
						getvalue = ""
						sendUserJson+='"'+getvalue+'",';
					}
					else
					{
						sendUserJson+='"'+getvalue+'",';
					}
				}
				if(getId=="email")
					newemail=getvalue;
			}
		});
		sendUserJson=sendUserJson.substring(0,sendUserJson.length-1)+"}";
		var url=context + "/rest/Users/emailSearchForUpdate?email="+newemail+"&date="+new Date();
		sendGETRequest(url+"date="+new Date(),"getUserProfileemailData","");
	}
}

/*Function is used to update user info n IE*/
function updateUserInfoOnIE(id)
{
	var newemail;
	var updateuserJsonIE="{";
	var firstname=$('#'+id+' #firstname').val();
	var lastname=$('#'+id+' #lastname').val();
	var email=$('#'+id+' #email').val();
	var telephone=$('#'+id+' #telephone').val();
	var userid=$('#'+id+' #userid').val();
	sendUserJson='{';
	if(hasValue(firstname))
		sendUserJson += "\"firstname\":\""+firstname+"\",";
	if(hasValue(lastname))
		sendUserJson += "\"lastname\":\""+lastname+"\",";
	if(hasValue(email))
		sendUserJson += "\"email\":\""+email+"\",";
	if(hasValue(telephone))
		sendUserJson += "\"telephone\":\""+telephone+"\",";
	if(hasValue(userid))
		sendUserJson += "\"userid\":\""+userid+"\",";
	sendUserJson += "\"enabled\":\""+true+"\",";
	sendUserJson=sendUserJson.substring(0,sendUserJson.length-1)+"}";
	var url=context + "/rest/Users/emailSearchForUpdate?email="+newemail+"&date="+new Date();
	sendGETRequest(url+"date="+new Date(),"getUserProfileemailData","");
}

/*Click Function is used to show model window of change password*/		
$('#password_change #change_password_act').live( 'click' , function () {
	 show_modal_window("changepassword.html");
});

/*Click Function is used to show model window of change profile*/		
$('#profile_change #change_profile_act').live( 'click' , function () {
	show_modal_window1("changeprofile.html");
});

/*Function is used to show model window*/
function show_modal_window(html_page)
{
	var url=context+"/pages/"+html_page;
	$.get(url,function(data){
		$('#change_form').html(data);
	});
}		

/*Function is used to show model window*/
function show_modal_window1(html_page)
{
	var url=context+"/pages/"+html_page;
	$.get(url,function(data){
		$('#change_form1').html(data);
	});
}				

/*Function is used to change profile image*/
function changeprofileimage()
{
	var file=$('#file_upload').val();
	if(hasValue(file))
	{
		$("#changeprofileimageform").submit();
	}
	else
	{
		showErrorLoading("Please select a image");
	}
}

/*Call BAck function is used to get User Profile email Data*/
function getUserProfileemailData(XMLHttpRequest, data, rpcRequest)
{
	if(XMLHttpRequest.status==200)
	{ 
		if(data == true)
		{
			showErrorLoading("Email already exists");
		}			
		else
		{ 		
			sendPUTRequest(context+"/rest/Users/updateUserProfile",sendUserJson,"updateUserProfile","")
		}
	}			
}

/*Function is used to edit user Information*/
function editUserInfo(id)
{	
	var url=context+"/pages/editProfileForm.html";
	jQuery.get(url,function(data){
		$('#edit_profile_modal').html(data);
	});
	window.setTimeout(function(){js2form(document.getElementById('edit_profile_form'),userProfileJson,".","",true);},1000);
}

/*Function is used to close model window of profile edit*/
function closeModelOfProfileEdit()
{
	$('.modal-header .close').click();
}

/*Function is used to open edit screen for profile*/
function openEditScreenForProfile()
{
	$("#userProfileDiv").css("display","none");
	$("#edit_Profile_button").css("display","none");
	$("#userProfileDivEdit").css("display","");
}

/*Function is used to open view screen for profile*/
function openViewScreenForProfile()
{
	$("#userProfileDiv").css("display","");
	$("#userProfileDivEdit").css("display","none");
	$("#edit_Profile_button").css("display","");
}

/*Click function is used to open change address page*/
$('#address_change #change_address_act').click(function(){	
	var url=context+"/pages/profileEditaddress.html";
	$.get(url,function(data) {
		$('#profile_Address_div').html(data);
	});
});

/*Function is used to set User Data Prefrences*/
function setUserDataPrefrences()
{
	$('#change_formlanguage #userlanguage').val(UserLang);
	$('#change_formlanguage #userCurrency').val(DataFormater);
	$('#change_formlanguage #userDateFormat').val(profiledateFormat);
}

/*Function is used to reset default Prefrences*/
function resetPrefrencestoDefault()
{
	$('#change_formlanguage #userlanguage').val('en');
	$('#change_formlanguage #userCurrency').val('indian');
	$('#change_formlanguage #userDateFormat').val('yyyymmdd_dash');
	changeUserLanguage();
}

/**************************************Profile Js End Here*********************************************/
