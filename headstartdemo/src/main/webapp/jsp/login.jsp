<!DOCTYPE HTML>
<script></script>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt' %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String locale=request.getParameter("locale");
	if(locale==null){
		session.setAttribute("locale","en");
	}
	else{
		session.setAttribute("locale",locale);
	}
	String ctx = request.getContextPath();
%>
<c:if test="<%=locale!=null%>">
  <fmt:setLocale value="<%=locale%>" scope="session" />
</c:if>

<HTML>
<HEAD>
	<meta http-equiv="X-UA-Compatible" content="IE=9">
	<link rel="shortcut icon" href="../images/favicon.ico">
	<script src="https://apis.google.com/js/client:plusone.js"></script>
	<SCRIPT>var projectDir='<%=ctx%>'+'/';</SCRIPT>
	<SCRIPT>var context = '<%=ctx%>';</SCRIPT>
	<SCRIPT>var count ;</SCRIPT>

	<meta charset="utf-8">
	<title>Login Page</title>

	<meta name="description" content="User login page">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!--basic styles-->

	<link href="../styles/bootstrap.min.css" rel="stylesheet">
	<link href="../styles/bootstrap-responsive.min.css" rel="stylesheet">
	<link rel="stylesheet" href="../styles/fontcss/font-awesome.min.css">
		<link href="../styles/validation.css" rel="stylesheet">
		<link href="../styles/app.css" rel="stylesheet">

	<!--[if IE 7]>
	  <link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
	<![endif]-->

	<!--page specific plugin styles-->

	<!--fonts-->

	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300"/>

	<!--ace styles-->

	<link rel="stylesheet" href="../styles/ace.min.css"/>
	<link rel="stylesheet" href="../styles/ace-responsive.min.css"/>
	<link rel="stylesheet" href="../styles/ace-skins.min.css"/>
	<link href="../styles/validationEngine.jquery.css" rel="stylesheet">
	<script src="../js/app/global-var.js"></script>
	<SCRIPT type='text/javascript'>
		var retUser = "<c:out value="${param.userid}"/>";
		var attemptsLeft = "<c:out value="${param.attempts_left}"/>";
		var isErrorExists = "<c:out value="${ not empty param.login_error}"/>";
		var errorType = "<c:out value="${param.login_error}"/>";
		var title='<%=ctx%>';
	</SCRIPT>
	<script type="text/javascript" src="../js/app/browser.js"></script>
	<script src="../js/form2js.js"></script>
	<script src="../js/js2form.js"></script>
	<script src="../js/app/common.js"></script>
	<script src="../js/jquery.js"></script>
	<script src="../js/jquery.validationEngine.js"></script>
	<script src="../js/jquery.validationEngine-en.js"></script>
	<script type="text/javascript" src="../js/jquery.alphanumeric.js"></script>
	<script type="text/javascript" src="../js/jquery.formrestrict.js"></script>
	<script src="../js/jquery-ui.js"></script>
	<SCRIPT type='text/javascript'>
		document.title= "Login to "+title.substring(1,title.length);
		function setLocale(locale)
		{
			window.location.assign('<%=ctx%>/login.jsp?locale='+locale);
		}

		function getErrorMessage(error_type){
			if(error_type == 1){
				if(attemptsLeft){
				return "<font color=\"red\">Authentication failed. You have "+attemptsLeft+" more attempts left. </font>";
				}else{
				return "<font color=\"red\">Authentication failed. Try again</font>";
				}
			}
			else if(error_type == 2){
				return "<font color=\"red\">Your account is locked, please contact adminstrator for unlocking.</font>";
			}
			else if(error_type == 3){
				return "<font color=\"red\">"+retUser+" Authentication failed. Try again</font>";
			}

			return "";
		}
		function auth() {
		var config = {

		'client_id': '987949698787-5af0tadj4rh47asfsmslq4dtgasgcfvu.apps.googleusercontent.com',
			 'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo#email https://www.googleapis.com/auth/urlshortener'
			};
		gapi.auth.authorize(config, function() {
			console.log('login complete');
			signinCallback(gapi.auth.getToken())

		});
		}

		function signinCallback(authResult) {
		    if (authResult['access_token']) {
		        //  alert(authResult['access_token']);
		        createGmailUserOnPlatForm(authResult['access_token'])
		    } else if (authResult['error']) {
		        if (authResult['error'] == "immediate_failed") {
		            alert("Error! Please try again.")
		        }
		    }
		}

		function get_url_parameter( param )
		{
			param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var r1 = "[\\?&]"+param+"=([^&#]*)";
			var r2 = new RegExp( r1 );
			var r3 = r2.exec( window.location.href );
			if( r3 == null )
				return "";
			else
				return r3[1];
		}

		/*check the value*/
		function hasValue (val)
		{
			return (val != null && val != undefined && val != "null" &&  val != "undefined" &&  val != "");
		}

		function setCookie(c_name,value,expiredays)
		{
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
		}

		function getCookie(c_name)
		{
		   if (document.cookie.length>0)
		   {
			 c_start=document.cookie.indexOf(c_name + "=");
			  if (c_start!=-1)
			  {
			   c_start=c_start + c_name.length+1;
			   c_end=document.cookie.indexOf(";",c_start);
			   if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			 }
		   }
		   return "";
		}

		function submitLoginForm(form,item)
		{
			if(loginForm.validate()){

								document.forms['htmlForm'].elements['j_domain'].value = 'DEFAULT';
								document.forms['htmlForm'].elements['j_username'].value = loginForm.getField('username').getValue();
				document.forms['htmlForm'].elements['j_password'].value = loginForm.getField('password').getValue();
				setCookie("ag_username",loginForm.getField('username').getValue() + '::' + loginForm.getField('domain').getValue(),1);
				document.forms['htmlForm'].submit();
			}
		}

		function validateLoginForm()
		{
			if(loginForm.validate()){
				try{
										document.forms['htmlForm'].elements['j_domain'].value = 'DEFAULT';
										document.forms['htmlForm'].elements['j_username'].value = loginForm.getField('username').getValue();
					document.forms['htmlForm'].elements['j_password'].value = loginForm.getField('password').getValue();
					setCookie("ag_username",loginForm.getField('username').getValue() + '::' + 'DEFAULT',1);
					document.forms['htmlForm'].submit();
				}
				catch(e){}
			}
		}


	window.fbAsyncInit = function() {
    FB.init({
        appId   : 574401075924396,
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML

    });

  };


function handleAuthResult(resp) {
    alert("made it!");
}

function fb_login() {
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {


              createFbUserOnPlatForm(response,access_token,user_id);
                //get user email
          // you can store this data into your database

            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
}

function createGmailUserOnPlatForm(access_token) {
	 jQuery.ajax({
						url: "../rest/Users/registeredgoogleuser?gmailaccessToken="+access_token,
						type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "application/json",
			success: function(response, textStatus, jqXHR) {
				window.location.href = "index.jsp";
				//validateAppUserLoginForm(response.name);
			},
			error: function(response,XMLHttpRequest, textStatus, errorThrown) {
					window.location.href = "index.jsp";
			},
			complete: function(){
			}
	})
}

function createFbUserOnPlatForm(response,access_token,user_id) {
	 jQuery.ajax({
						url: "../rest/Users/registerFacebookUser?UserID="+user_id+"&faceaccessToken="+access_token,
						type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "application/json",
			success: function(response, textStatus, jqXHR){
				alert("OK");
				window.location.href = "index.jsp";
				//validateAppUserLoginForm(response.name);

			},
			error: function(response,XMLHttpRequest, textStatus, errorThrown) {
				window.location.href = "index.jsp";
			},
			complete: function(){
			}
		})
}
</SCRIPT>

</HEAD>
<body class="login-layout">

		<p class="top-heading" id="LoginAppName">Sampledummyapp</p>

		<br>

		<div> <!-- main-container div start -->
	
		
			 <!-- Sign in div start -->
			 <div>
			<div id="mainLoginDiv" align="center" class="login_container">
				<div> <P class="heading1">LOGIN</P></div>


				<form id='htmlForm' autocomplete="off" action='<%=ctx%>/j_spring_security_check' method='post' class="form-horizontal">

					<div style="height:10px;"> </div>
					<p id='login_error' class="bigger-110 login-white"></p>

										<div>
						<span class="input-icon input-icon-right login-margin">
							<input type="text" name="j_username" id="j_username" placeholder="Username" style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
							<i class="icon-user"></i>
						</span>
					</div>
					<div>
						<span class="input-icon input-icon-right login-margin">
							<input type="password" class="form-control" name="j_password" id="j_password" placeholder="Password"  style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
							<i class="icon-pencil"></i>
						</span>
					
					<div class="space-6"></div>
                    
                    <div id="" class="checkbox bigger-120" style="width:300px; background:tansparent;">
					<label class="pull-left" style="margin:0;">
						<input id="_spring_security_remember_me" style="width: 12px;height: 12px;opacity:1;" name="_spring_security_remember_me" type="checkbox" value="true"/>
						<span class="text_style">Remember me</span>
					</label>

					<span class="pull-right cursor-pointer" onclick="hideShowLoginDiv('forgot-box')" style="font-size:14px; color:#4389CF;">Forgot password?</span>
				</div>
				
				<button type="submit" class="loginbtn btn-lg btn-login-blue no-border" style="margin-top:5px;border-radius:6px !important;">Sign in</button>
				</form>				
				
				<br>
				
				<div align="center" class="" style="margin-bottom:30px;">
					
					<div id="or-div">
						<p class="text_style login-margint" style="margin-bottom:20px;">Or Connect With</p>

						<div class="social_media" id="ordiv">
							<span class="fb">
								<a href="#" id="fblog" onclick="fb_login()"><img src="../images/fb.png"/></a>
							</span>
							<!--<span class="twitter">
								<a href=""><img src="../images/twitter.png"/></a>
							</span>-->
							<span class="gplus">
								<a href="#" id="gmail" onclick="auth()"><img src="../images/googleplus.png"/></a>
							</span>
						</div>
					</div>

					  <p class="text_style login-margint">Yet to register!
						<span class="signup cursor-pointer" onclick="hideShowLoginDiv('newUserRegistrationBox')">Sign up now!</span>
					</p>
				</div>
			</div>
			</div>
			<!-- Sign in div end -->
			
			<!-- Forgot password div start -->
			<div id="forgot-box" align="center" class="hide login_container">
				<p class="heading1">FORGOT PASSWORD</p>

				<p style="margin-top:40px;" class="text_style">
											Enter your username to receive password
									</p>

				<form id="forgot_form" class="form-horizontal">
										<div>
						<span class="input-icon input-icon-right">
							<input type="text" id="username" name="username" class="validate[required,email] alphanumericallow" maxlength="30" placeholder="Username" autocomplete="off" style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
							<i class="icon-user"></i>
						</span>
					</div>

					<div class="space-4"></div>

					<div style="width: 330px; margin-top:20px">
						<button type="submit" onclick="hideShowLoginDiv('mainLoginDiv');" class=" btn btn-medium btn-info">Back to login</button>

						<button type="submit" onclick="forgotpass();" class=" btn btn-medium btn-info">Send me</button>
					</div>
				</form>
			</div>
			<!-- Forgot password div end -->

			<!-- New User Registration div start -->
			<div id="newUserRegistrationBox" align="center" class="hide login_container">
				<p class="heading1">NEW USER REGISTRATION</p>

					<form id="new_user_registration_form" class="form-horizontal">
						<div>
							<span class="input-icon input-icon-right login-margint">
								<input type="text" id="email" name="email" class="validate[required,custom[email],funcCall[checkEmailExist]]" autocomplete="off" placeholder="Email"
								style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-envelope-alt"></i>
							</span>
						</div>
						<div>
							<span class="input-icon input-icon-right login-margint">
								<input type="text" class="validate[required,custom[noSpacechar],funcCall[checkUserNameExist]]" name="username" autocomplete="off" id="username" maxlength="15" placeholder="Username"
								style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-user"></i>
							</span>
						</div>
						<div>
							<span class="input-icon input-icon-right login-margint">
								<input type="text" class="validate[required]" name="firstname" maxlength="15" placeholder="Firstname" autocomplete="off"
								style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-user"></i>
							</span>
						</div>
						<div>
							<span class="input-icon input-icon-right login-margint">
								<input type="text" class="form-control validate[required]"name="lastname" maxlength="15" placeholder="Lastname" autocomplete="off"
								style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-user"></i>
							</span>
						</div>
						<div>
							<span class="input-icon input-icon-right login-margint">
								<input id="registrationpassword" type="password" class="form-control validate[required,custom[mediumpassword]]" name="password" placeholder="Password" style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-pencil"></i>
							</span>
						</div>

											</form>

					<form id="new_user_reg_confirm_passw_form" class="form-horizontal">
						<div>
							<span class="input-icon input-icon-right">
								<input id="registrationconfirmpassword" type="password" class="form-control mystyle validate[required,equals[registrationpassword]]" name="confirmpassword" placeholder="Confirm password"
								style="width:300px; background:tansparent;border-radius:6px !important; -webkit-border-radius:6px !important; -moz-border-radius:6px !important;">
								<i class="icon-pencil" ></i>							
							</span>
						</div>

						<div class="space-4"></div>

						<div class="login-margint">
							<button type="submit" onclick="hideShowLoginDiv('mainLoginDiv');" class=" btn btn-medium btn-info">Back to login</button>

							<button type="submit" onclick="newUserRegistration();" class=" btn btn-medium btn-info">Register</button>
							<button type="button" onclick="resetRegistrationform();" class=" btn btn-medium btn-info" >Reset</button>
						</div>
						
				</form>
				</div>
			</div>
			<!-- New User Registration div end -->

		</div> <!-- main-container div end -->


<div id="pswd_info_username" style="display:none; margin-bottom: 25px; height: 17px !important;">
	<ul>
		<li id="usernameexist" class="invalid" id="uservalid" style="margin-left: -30px;" ><strong>Username already exists...</strong></li>
	</ul>
</div>
<div id="pswd_info_email" style="display:none; margin-bottom: 70px; height: 17px !important;">
	<ul>
		<li class="invalid" id="uservalid" style="margin-left: -30px;" ><strong>EmailId already exists...</strong></li>
	</ul>
</div>
 <div class="loadingmodal"><p style='color: #FFFFFF;font-size: 18px;position: absolute;top: 44%;left: 46.5%;top1: 31%;left1: 40.5%'>Please wait..</p><!-- Place at bottom of page --></div>
	  	 	 <div id="pswd_info" style="display:none; top: 467px;">
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
		<script src="../js/bootstrap.min.js"></script>
		<script src="../js/ace-elements.min.js"></script>
		<script src="../js/ace.min.js"></script>

       <SCRIPT>var context = '<%=ctx%>';</SCRIPT>

		<script type="text/javascript">

		function show_box(id) {
			$('#pswd_info_username').hide();
			$('#pswd_info_email').hide();
			$('#pswd_info').hide();
			$('.widget-box.visible').removeClass('visible');
			$('#'+id).addClass('visible');
		}

		function forgotpass()
		{
			if($('#forgot_form').validationEngine('validate')) {
				var username =forgot_form.elements["username"].value;
								jQuery.ajax({
												url: context + "/rest/unauthorize/forgetPassword?username="+username,
												type: "PUT",
						contentType: "application/json; charset=utf-8",
						dataType: "application/json",
						success: function(response, textStatus, jqXHR){
							// alert(response.responseText);
							window.location.href = "login.jsp";
						},
						error: function(response,XMLHttpRequest, textStatus, errorThrown){
							// alert(response.responseText);
							alert("Your password is sent to email address");
							window.location.href = "login.jsp";
						},
						complete: function(){
						}
				})
			}
		}

	function validatePasswordChecker() {
		if(count== 4)			return true;
		else
			return false;
	}

	function emailChecker() {
		if(countemail== 0 )
			return true;
		else
			return false;
	}

	function usernameChecker() {
		if(countusername== 0 )
			return true;
		else
			return false;
	}

	function resetRegistrationform() {
		$("#new_user_registration_form").trigger('reset').validationEngine('hide');
		$("#new_user_reg_confirm_passw_form").trigger('reset').validationEngine('hide');
	}

$("#new_user_registration_form").validationEngine();
	function newUserRegistration()
		{
		if($('#new_user_registration_form').validationEngine('validate') && $('#new_user_reg_confirm_passw_form').validationEngine('validate'))
		{
		var modjson=JSON.stringify(convertFormDataToJSON('new_user_registration_form'));
		modjson=modjson.substring(0,modjson.length-1);
				modjson=modjson+',"enabled":"false","roles":[{"rolename":"guest","roleid":"2","description":"guest role"}]}';
		
	    jQuery.ajax({
			type: "POST",
			url: context+"/rest/unauthorize/create/",

			data: modjson,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			beforeSend:function(){$body = $("body");$body.addClass("newloading");return true;},
			complete:function(){$body = $("body");$body.removeClass("newloading");},
			success: function(data){
				alert("You have been registered successfully. Please check your email inbox for activation mail.");
				window.location.href = "login.jsp";

				},
			failure: function(errMsg) {
			alert("error");
			}
		});

		}
	}

	function getUserData(XMLHttpRequest, data, rpcRequest) {
	    if (XMLHttpRequest.status == 200) {
	        if (data == true) {
	            $('#pswd_info_username').show();
	            countusername++;
	        } else
	            $('#pswd_info_username').hide();
	    }
	}

	function getUseremailData(XMLHttpRequest, data, rpcRequest) {
	    if (XMLHttpRequest.status == 200) {
	        if (data == true) {
	            $('#pswd_info_email').show();
	            countemail++;
	        } else
	            $('#pswd_info_email').hide();
	    }
	}
	</script>

		<script>
   			var newusername;
			var newemail;
			var countemail=0;
			var countusername=0;

			$('#new_user_registration_form #username').keyup(function() {
				countusername=0;

			 $('#pswd_info_username').hide();
			}).blur(function() {
				$("#new_user_registration_form #username").validationEngine("validate");
				//newusername = $(this).val();
				//var url=context + "/rest/unauthorize/usernameSearch?username="+newusername;
				//sendGETRequest(url,"getUserData","");
			});
			$('#new_user_registration_form #email').keyup(function() {
				countemail=0;
			 $('#pswd_info_email').hide();
			}).blur(function() {
				$("#new_user_registration_form #email").validationEngine("validate");
				//newemail = $(this).val();
				//var url=context + "/rest/unauthorize/emailSearch?email="+newemail;
				//sendGETRequest(url,"getUseremailData","");
			});

		var error = getErrorMessage(errorType);

		if(hasValue(error)) {
			document.getElementById("login_error").innerHTML = error;
		}

				</script>
<script>
	var appName = '<%=ctx%>';
	$('#LoginAppName').text(appName.substring(1,appName.length));
	$('#LoginAppnewname').text(appName.substring(1,appName.length));
</script>

<script src="//connect.facebook.net/en_US/all.js"></script>

<script type="text/javascript">
	var version=navigator.appVersion.split(';')[1];
	if(hasValue(version)){
		if(!(version.indexOf("MSIE 8.0")>-1)){
			$(function() {
				var input = document.createElement("input");
				if(('placeholder' in input)==false) {
					$('[placeholder]').focus(function() {
						var i = $(this);
						if(i.val() == i.attr('placeholder')) {
							i.val('').removeClass('placeholder');
							if(i.hasClass('password')) {
								i.removeClass('password');
								this.type='password';
							}
						}
					}).blur(function() {
						var i = $(this);
						if(i.val() == '' || i.val() == i.attr('placeholder')) {
							if(this.type=='password') {
								i.addClass('password');
								this.type='text';
							}
							i.addClass('placeholder').val(i.attr('placeholder'));
						}
					}).blur().parents('form').submit(function() {
						$(this).find('[placeholder]').each(function() {
							var i = $(this);
							if(i.val() == i.attr('placeholder'))
								i.val('');
						})
					});
				}
			});
		}
	}

	$(document).ready(function() {
		$("#new_user_reg_confirm_passw_form").validationEngine();
		$("#forgot_form").validationEngine();
			$("#new_user_reg_confirm_passw_form").bind("keypress", function(e) {
			if (e.keyCode == 13){
				newUserRegistration();
				return false;
			}
		});

		if(BrowserDetect.browser == "Explorer") {
			var ieversion=navigator.appVersion.split(';')[1];

			if(ieversion.indexOf("MSIE 8.0")>-1) {
					$("#Password").css('display',"");
					$("#Domain").css('display',"");
					$("#Username").css('display',"");
					$("#login_error").css('height',"12px");
					$("#j_password").attr('placeholder',"");
					$("#j_domain").attr('placeholder',"");
					$("#j_username").attr('placeholder',"");
					$("#EmailLabel").css('display',"");
					$("#UsernameLabel").css('display',"");
					$("#FirstnameLabel").css('display',"");
					$("#LastnameLabel").css('display',"");
					$("#PasswordLabel").css('display',"");
					$("#ConfirmPasswordLabel").css('display',"");
					$("#lockStyleIcon").css('margin-top',"35px");
			}
			$('#confirm_span').css("margin-top","-11%");
		}
		if(BrowserDetect.browser == "Chrome")
		{
			$('#confirm_span').css("margin-top","-4%");
		}
		if(BrowserDetect.browser == "Firefox")
		{
			$('#confirm_span').css("margin-top","-11%");
		}
		$('.alphanumericallow').alphanumeric({allow:"/^[+]?\d*\.?\d*$/%!&@#~(){}_,<>|:;"});
	});

		$("#accordion").accordion({
			collapsible: true ,
			heightStyle: "content",
			animate: 250,
			header: ".accordion-header"
		}).sortable({
			axis: "y",
			handle: ".accordion-header",
			stop: function( event, ui ) {
				// IE doesn't register the blur when sorting
				// so trigger focusout handlers to remove .ui-state-focus
				ui.item.children( ".accordion-header" ).triggerHandler( "focusout" );
			}
		});

	function checkUserNameExist(field, rules, i, options) {
		var url=context + "/rest/unauthorize/usernameSearch?username="+field.val();
		var msg = undefined;
		jQuery.ajax({
			type: "GET",
			url: url,
			cache: false,
			dataType: "json",
			async: false,
			success: function(json) {
					if(JSON.stringify(json)=='true') {
					msg = "User already exists.";
				}
			}
		});
		if(msg != undefined) {
			return msg;
		}
	}

	function checkEmailExist(field, rules, i, options) {
		var url=context + "/rest/unauthorize/emailSearch?email="+field.val();
		var msg = undefined;
		jQuery.ajax({
			type: "GET",
			url: url,
			cache: false,
			dataType: "json",
			async: false,
			success: function(json) {
				if(JSON.stringify(json)=='true') {
					msg = "Email already exists.";
				}
			}
		});
		if(msg != undefined) {
			return msg;
		}
	}

	// to show hide other divs in login page
	function hideShowLoginDiv(divID) {
		$("#mainLoginDiv").addClass("hide");
		$("#forgot-box").addClass("hide");
		$("#newUserRegistrationBox").addClass("hide");
		if(divID == "newUserRegistrationBox") {
			$("#userSignUp").addClass("hide");
		} else {
			$("#userSignUp").removeClass("hide");
		}

		$("#" + divID).removeClass("hide");
		resetRegistrationform();
	}
</script>

</body>

</HTML>
