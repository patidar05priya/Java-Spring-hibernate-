<%@ page import="java.io.File"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.util.Properties" %>
<%@ page import="java.io.FileNotFoundException" %>


<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Highcharts Example</title>
<% 
		Properties pro=System.getProperties();
		String path=pro.getProperty("catalina.base");
		
		path=path+"/webapps/headstartdemo/AllZips";
		
		 File folder = new File(path);
		 File[] listOfFiles = folder.listFiles();

		     for (int i = 0; i < listOfFiles.length; i++) {
				
				out.println("<a href='reportcreate.jsp?reportName="+listOfFiles[i].getName().replace(".zip","")+"'>"+listOfFiles[i].getName().replace(".zip","")+"</a><br /><br />");
				
				}

%>
	</head>
	<body>

</body>
</html>

