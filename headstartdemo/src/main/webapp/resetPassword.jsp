<!DOCTYPE HTML>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt'%>
<html>
<HEAD>
	<link href="./styles/bootstrap.min.css" rel="stylesheet">
	<link href="./styles/validation.css" rel="stylesheet">
	<link href="./styles/bootstrap-responsive.min.css" rel="stylesheet">
	<link rel="stylesheet" href="./styles/fontcss/font-awesome.min.css">

	<!--[if IE 7]>
	<link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
	<![endif]-->

	<!--page specific plugin styles-->

	<!--fonts-->

	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300"/>

	<!--ace styles-->
	<link href="./styles/validationEngine.jquery.css" rel="stylesheet">
	<link rel="stylesheet" href="./styles/ace.min.css"/>
	<link rel="stylesheet" href="./styles/ace-responsive.min.css"/>
	<link rel="stylesheet" href="./styles/ace-skins.min.css"/>
	<script src="./js/jquery.js"></script>
	<script src="./js/jquery-1.8.1.min.js"></script>
	<script src="./js/jquery.validationEngine.js"></script>
	<script src="./js/jquery.validationEngine-en.js"></script>
	<script type="text/javascript" src="./js/app/browser.js"></script>
</HEAD>

<script> var count;</script>

<script>

	var context = "<%=request.getContextPath()%>";
	var logoutUrl = context + "/<c:url value='j_spring_security_logout' />";

	function getParam(name) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}

	function validatePasswordChecker() {
		 if(count== 4)
					return true;
		else
			return false;
	}

	function sendPassword() {
		var newpassword = $("#resetLinkForm #newPassword").val();
		var confirmpassword = $("#resetLinkForm #confirmPassword").val();
		if($('#resetLinkForm').validationEngine('validate'))
		{
			document.forms['htmlFormNew'].elements['password'].value = newpassword;
			document.forms['htmlFormNew'].elements['activation'].value = activation
			document.forms['htmlFormNew'].elements['userid'].value = userId
			document.forms['htmlFormNew'].submit();
		}
	}

	var userId = getParam("id");
	var activation = getParam("activationCode");
	var action = "<c:out value="${param.scenario}" />";
	var errorParam = "<c:out value="${param.error_messages}" />" ;
	var errorMsgs = errorParam;
</script>

<body class="login-layout">

		<p class="top-heading" id="appName">headstartdemo</p>

		<div class="space"></div>

		<p class="white bigger-150 text-center">Please enter new password</p>

		<div class="space"></div>

		<div id="mainLoginDiv" align="center">

			<p id='reset_error' class="bigger-110 login-white red"></p>

			<form id='htmlFormNew' action='./rest/unauthorize/resetPasswordForm' method='post'>
				<input type='hidden' id="password" name='password' />
				<input type='hidden' id="activation" name='activation' />
				<input type='hidden' id="userid"  name='userid' />
			</form>

			<form id='resetLinkForm' autocomplete="off" style="width: 350px;/*margin-left: 57px;*/" class="form-horizontal">

				<div>
					<span class="input-icon input-icon-right">
						<input type="password" class="form-control validate[required,custom[mediumpassword]]" placeholder="New password" id='newPassword'>
						<i class="icon-pencil" style="margin-top: 4% !important;"></i>
					</span>
				</div>

				<div>
					<span class="input-icon input-icon-right">
						<input type="password" class="form-control validate[required,equals[newPassword]]" id='confirmpassword' placeholder="Confirm password">
						<i class="icon-pencil" style="margin-top: 4% !important;"></i>
					</span>
				</div>

				<div class="space-2"></div>

				<button onclick="sendPassword();" type="button" class="loginbtn btn-lg btn-login-blue no-border">
					Reset password
				</button>

			</form>
		</div>

						 			<div id="pswd_info" style="display:none; top: 251px;">
				<h4>Password must meet the following requirements:</h4>
				<ul style="margin:0;padding:0;list-style-type:none;">
					<li id="length" class="invalid">Be at least <strong>8 characters</strong></li>
					<li id="letter" class="invalid">At least <strong>one letter</strong></li>
					<li id="capital" class="invalid">At least <strong>one capital letter</strong></li>
					<li id="number" class="invalid">At least <strong>one number</strong></li>
				</ul>
			</div>	
				 
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>

		<script src="./js/bootstrap.min.js"></script>
<script>


$('#resetLinkForm #newPassword').keypress(function (e) {
	if (e.keyCode == 13) {
	  sendPassword();
		return false;
	} else {

	}
});

$('#resetLinkForm #confirmpassword').keypress(function (e) {
	if (e.keyCode == 13) {
	  sendPassword();
		return false;
	} else {

	}
});

$(document).ready(function() {
	jQuery("#resetLinkForm").validationEngine();
	if(BrowserDetect.browser == "Explorer"){
		alert(navigator.appVersion)
		if(navigator.appVersion.indexOf("MSIE 8")>-1 || navigator.appVersion.indexOf("MSIE 9")>-1 ){
			$("#confirmpasswordlbl").css('display',"");
			$("#newPasswordlbl").css('display',"");
			$("#confirmpasswordForm").attr('placeholder',"");
			$("#newPasswordForm").attr('placeholder',"");
		}
	}
});
</script>
</body>

</html>
