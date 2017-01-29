<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@page import="java.util.*" %>
<%@page import="java.sql.*" %>
<%@page import="java.io.*" %>
<%@page import="net.sf.jasperreports.engine.JasperCompileManager"%>
<%@page import =" net.sf.jasperreports.engine.JasperExportManager"%>
<%@page import="net.sf.jasperreports.engine.JasperFillManager"%>
<%@page import=" net.sf.jasperreports.engine.JasperPrint"%>
<%@page import=" net.sf.jasperreports.engine.design.JasperDesign"%>
<%@page import ="net.sf.jasperreports.engine.xml.JRXmlLoader"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body>
<%

String propertiesPath= null;

try
{
    String value="";
	propertiesPath = "WEB-INF/classes/report/jrxml.properties";
    String store= getServletContext().getRealPath("pdf");
    
	
	Properties props = new Properties();
    props.load(getServletContext().getResourceAsStream(propertiesPath));
    Enumeration<Object> em = props.keys();


	Class.forName("com.mysql.jdbc.Driver");			
	Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/headstartdemo","root","root");								   
    String type = null;

    String key = request.getParameter("key");
	value = props.get(key).toString();
	JasperDesign jasperDesign=JRXmlLoader.load(value); 	

    FileOutputStream outputStream = new FileOutputStream(new File(store+"/"+key+".jasper"));

    JasperCompileManager.compileReportToStream(jasperDesign,outputStream);
	JasperPrint jasperPrint = JasperFillManager.fillReport(store+"/"+key+".jasper",null,con);			
	JasperExportManager.exportReportToPdfFile(jasperPrint,store+"/"+key+".pdf");  	
	response.sendRedirect("pdf"+"/"+key+".pdf");
   	
}
catch (Exception e)
{
	e.printStackTrace();
	
}
System.out.println("I am here 3");
%>
</body>
</html>