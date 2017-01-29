<%@ page import="java.io.*,java.util.*" %>
<html>
<head>
<title>Page Redirection</title>
</head>
<body>
<center>
<h1>Page Redirection</h1>
</center>
<%
// New location to be redirected
String sitefive = new String("/headstartdemo/error.jsp");
String sitefour = new String("/headstartdemo/error_404.jsp");
String code=request.getParameter("code");
if(code.equalsIgnoreCase("500"))
{
	response.setStatus(response.SC_MOVED_TEMPORARILY);
	response.setHeader("Location", sitefive); 
}
if(code.equalsIgnoreCase("404"))
{
	response.setStatus(response.SC_MOVED_TEMPORARILY);
	response.setHeader("Location", sitefour); 

}
%>
</body>
</html>
