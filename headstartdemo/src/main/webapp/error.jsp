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
<link rel="shortcut icon" href="./images/favicon.ico">
<script src="https://apis.google.com/js/client:plusone.js"></script>
<SCRIPT>var projectDir='<%=ctx%>'+'/';</SCRIPT>
<SCRIPT>var context = '<%=ctx%>';</SCRIPT>
<SCRIPT>var count ;</SCRIPT>

		<meta charset="utf-8">
		<title>Login Page</title>

		<meta name="description" content="User login page">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!--basic styles-->

		<link href="./styles/bootstrap.min.css" rel="stylesheet">
		<link href="./styles/bootstrap-responsive.min.css" rel="stylesheet">
		<link rel="stylesheet" href="./styles/fontcss/font-awesome.min.css">
			<link href="./styles/validation.css" rel="stylesheet">
			<link href="./styles/app.css" rel="stylesheet">

		<!--[if IE 7]>
		  <link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
		<![endif]-->

		<!--page specific plugin styles-->

		<!--fonts-->

		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300"/>

		<!--ace styles-->

		<link rel="stylesheet" href="./styles/ace.min.css"/>
		<link rel="stylesheet" href="./styles/ace-responsive.min.css"/>
		<link rel="stylesheet" href="./styles/ace-skins.min.css"/>
		<link href="./styles/validationEngine.jquery.css" rel="stylesheet">
		<script src="./js/app/global-var.js"></script>
		<SCRIPT type='text/javascript'>
			
				var retUser = "<c:out value="${param.userid}"/>";
				var attemptsLeft = "<c:out value="${param.attempts_left}"/>";
				var isErrorExists = "<c:out value="${ not empty param.login_error}"/>";
				var errorType = "<c:out value="${param.login_error}"/>";
				var title='<%=ctx%>';
			</SCRIPT>
			<script type="text/javascript" src="./js/app/browser.js"></script>
             <script src="./js/form2js.js"></script>
			<script src="./js/js2form.js"></script>
		
			<script src="./js/app/common.js"></script>
						<script src="./js/jquery.js"></script>
<script src="./js/jquery.validationEngine.js"></script>
<script src="./js/jquery.validationEngine-en.js"></script>
	<script type="text/javascript" src="./js/jquery.alphanumeric.js"></script>
<script type="text/javascript" src="./js/jquery.formrestrict.js"></script>
<script src="./js/jquery-ui.js"></script>
			
			
</HEAD>
<body class="login-layout" style="">
<div class="row-fluid" style="padding-top:35px">
								<div class="center">
									<h1>
									
										<span class="white" id='LoginAppName'></span>
									</h1>
								</div>
							</div>
		<div class="main-container container-fluid">
			<div class="main-content">
				<div class="row-fluid">
					
						<div class="login-container">
							

							

							<div class="row-fluid">
								<div class="position-relative">
									<div id="login-box" class="forgot-box widget-box no-border visible" style="margin-left: -75px;">
										<div class="widget-body">
											<div class="widget-main">
												
										
											<div>
												<h2 >Error-500 Status code</h2>
													<hr>
												<h3>Something went wrong</h3>
												<h3>We will be working on it</h3>
													
												</div>
											</div><!--/widget-main-->

										
										
											

												
                                       	<div class="toolbar center" style="background:#2283c5;border-top: 2px solid rgb(34, 131, 197);">
												<a href="#" onclick="BackButtonClick()" class="back-to-login-link">
													Back 
													<i class="icon-arrow-right"></i>
												</a>
											</div>       
                                               

											</div><!--/widget-main-->
									
									</div><!--/login-box-->

								
								</div><!--/position-relative-->
							
						</div>
					</div><!--/.span-->
				</div><!--/.row-fluid-->
			</div>
		</div><!--/.main-container-->


</body>
<script>	
var appName = '<%=ctx%>';
$('#LoginAppName').text(appName.substring(1,appName.length));
function BackButtonClick(){
	
	if(document.URL.indexOf(".pdf") != -1||document.URL.indexOf(".PDF") != -1||document.URL.indexOf(".apk") != -1||document.URL.indexOf(".APK") != -1||document.URL.indexOf(".txt") != -1||document.URL.indexOf(".TXT") != -1)
	{
		window.location.href = "./jsp/index.jsp";
		}
		else
	window.location.href = "./jsp/login.jsp";
	
}

function hasValue(val)
{
   return (val != null && val != undefined  && val != NaN && val != "NaN" && val != "null" && val != "undefined" && (val != "" || String(val) == "0") && val != "-Please select-" && val != "--");
}
</script>

</HTML>

