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

	function validatePasswordChecker() {
		 if(count== 4)
					return true;
		else
			return false;
	}

	function sendPassword() {
		var newpassword = $("#changePasswordLinkForm #newPasswordForm").val();
		var confirmpassword = $("#changePasswordLinkForm #confirmPasswordForm").val();

		if($('#changePasswordLinkForm').validationEngine('validate'))
		{
			document.forms['htmlFormNew'].elements['newPassword'].value = newpassword;
			document.forms['htmlFormNew'].elements['confirmpassword'].value = confirmpassword;
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

	<p class="white bigger-150 text-center">Please change your password since you are logging in for the first time</p>

	<div class="space"></div>

	<div id="mainLoginDiv" align="center">

		<p id='reset_error' class="bigger-110 login-white red"></p>

		<form id='htmlFormNew' action='j_security_pwd_update_check' method='post'>
			<input type='hidden' id="newPassword" name='newPassword' />
			<input type='hidden' id="confirmpassword" name='confirmpassword' />
		</form>

		<form id='changePasswordLinkForm' autocomplete="off" style="width: 350px;/*margin-left: 57px;*/" class="form-horizontal">

			<div>
				<span class="input-icon input-icon-right">
					<input type="password" class="form-control validate[required,custom[mediumpassword]]" placeholder="New password" id='newPasswordForm'>
					<i class="icon-pencil" style="margin-top: 4% !important;"></i>
				</span>
			</div>

			<div>
				<span class="input-icon input-icon-right">
					<input type="password" class="form-control validate[required,equals[newPasswordForm]]" id='confirmpasswordForm' placeholder="Confirm password">
					<i class="icon-pencil" style="margin-top: 4% !important;"></i>
				</span>
			</div>

			<div class="space-2"></div>

			<button onclick="sendPassword();" type="button" class="loginbtn btn-lg btn-login-blue no-border">
				Change Password
			</button>

		</form>
	</div>

			 		<div id="pswd_info" style="display:none; margin-bottom:-5px;">
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
		$(document).ready(function(){
			$("#changePasswordLinkForm").validationEngine();
			if(BrowserDetect.browser == "Explorer") {
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
