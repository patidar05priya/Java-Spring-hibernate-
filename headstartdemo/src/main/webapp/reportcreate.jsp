<%@page import="java.net.URL" %>
<%@ page import="java.util.Properties" %>
<%@page import="java.io.BufferedOutputStream" %>
<%@page import="java.io.*" %>
<%@page import="com.inn.headstartdemo.report.ReportCreator" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Highcharts Example</title>
<% 

		String title=request.getParameter("reportName");
		String outputType=request.getParameter("outputType");
		Properties pro=System.getProperties();
		String path=pro.getProperty("catalina.base");
		String repopath=path+"/webapps/headstartdemo/reports";
		
		File fold=new File(repopath);
		if(!fold.isDirectory())
		{
			fold.mkdir();
		}	
		path=path+"/webapps/headstartdemo/WEB-INF/classes/report/AllZips";
		ReportCreator rg=new ReportCreator();
		try{
						if(outputType.equals("HTML")){
							rg.getReport(path+"/"+title+".zip",repopath+"/"+title+".html",ReportCreator.outputType.HTML);
						}
						if(outputType.equals("PDF")){
							rg.getReport(path+"/"+title+".zip",repopath+"/"+title+".pdf",ReportCreator.outputType.PDF);
						}
						if(outputType.equals("EXCEL")){
							rg.getReport(path+"/"+title+"XL"+".zip",repopath+"/"+title+".xls",ReportCreator.outputType.EXCEL);
						}
						if(outputType.equals("CSV")){
								rg.getReport(path+"/"+title+".zip",repopath+"/"+title+".csv",ReportCreator.outputType.CSV);
						}
		}catch(Exception e){
			 e.printStackTrace();
		}

			
%>
	</head>
	<body>
<%
		if(outputType.equals("HTML")){
			out.println("<meta http-equiv='refresh' content='2;url=reports/"+title+".html'>");
		}
%>
</body>
</html>
