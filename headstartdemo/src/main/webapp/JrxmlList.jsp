<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@page import="java.util.*" %>
<%@ page import="java.io.InputStream" %>

<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<SCRIPT>var isomorphicDir="../isomorphic/";</SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Core.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Foundation.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Containers.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Grids.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Forms.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_DataBinding.js></SCRIPT>
<SCRIPT SRC=../isomorphic/skins/GoGreen/load_skin.js></SCRIPT>
</head>
<body>
<SCRIPT>
var reports = new Array();

if (window.isc != null) 
    {
        if (isc.version.startsWith("SC_SNAPSHOT-2011-01-05/")) 
        {
            if (isc.HTMLFlow != null) 
            {
                isc.HTMLFlow.addProperties({modifyContent:function () {}});
            }
        }
    }
<%
String path = null;
try
{
	Properties props = new Properties();
	
	try {

     InputStream stream =  getServletContext().getResourceAsStream("WEB-INF/classes/report/jrxml.properties");
 	if(stream!=null) {
	     props.load(stream);
		 
		}
	}
	catch(Exception ex) {
		throw ex;
	}
	

    Enumeration<Object> em = props.keys();
    String key = request.getParameter("key");

%>
</SCRIPT>

			<%
				while (em.hasMoreElements())
				{
					String keyStr = (String) em.nextElement();

			%>
			<SCRIPT>
				reports.push("<%=keyStr%>");
		</SCRIPT>
		
<%
				}  
}
catch (Exception e)
{
	e.printStackTrace();
	System.out.println("Could not load property file "+path);
}

%>

<SCRIPT>


isc.VLayout.create
({
	ID:"reportsTable",
	members:
	[
		isc.HLayout.create
		({
			border:"1px solid black",
			members:
			[
				isc.Label.create
				({
					
					border:"1px solid black",
					contents:"Report Name",
					height:25,
					width:350,
				})
			]
		})		
	]
});


for (var i = 0; i< reports.length; i++)
{
	reportsTable.addMember
	(
		isc.HLayout.create
		({
			border:"1px solid black",
			members:
			[
				isc.Label.create
				({
					
					border:"1px solid black",
					contents:reports[i],
					height:25,
					width:350,
				}),
				isc.ImgButton.create
				({ 
					height:25,
					width:25,
					src:"nav_arrow.gif", 
					icon:"nav_arrow.gif", 
					click:"createNewWindow('report_run.jsp?key=" +reports[i]+"')"
				})
			]
		})
	);
}
 function createNewWindow (url)
 {
	isc.Window.create
	 ({
		name:"Report Details", 
		title:"Report Details", 
		isModal:true,
		height:"80%",
		width:"80%",
		autoCenter:true,
		items:
		[
			isc.HTMLPane.create
			({
				ID:"myPane",
				width:"100%",
				height:"90%",
				border:"1px solid black",
				contentsURL:url,
				contentsType:"page"
			})
		]
	});
 }
</SCRIPT> 
</body>
</html>