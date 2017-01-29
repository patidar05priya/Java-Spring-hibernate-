<%@ page import="com.inn.headstartdemo.dao.IFileUploadsDao,com.inn.headstartdemo.model.FileUploads,java.io.ByteArrayOutputStream,java.io.FileOutputStream,java.io.OutputStream,java.io.BufferedOutputStream,java.io.BufferedInputStream,org.springframework.web.context.support.WebApplicationContextUtils,java.io.*,org.springframework.web.context.WebApplicationContext" pageEncoding="UTF-8"%>

<HTML>
<BODY>
<%
	ByteArrayOutputStream bis = new ByteArrayOutputStream();
	try{ 
		String parameter = request.getParameter("attachment");
		String fileName = request.getParameter("filename");
		Integer attachmentId = Integer.valueOf(parameter);
		WebApplicationContext context=WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		IFileUploadsDao fileresourceDao= (IFileUploadsDao)context.getBean(IFileUploadsDao.class);
		FileUploads fileresource = fileresourceDao.findByPk(attachmentId);
		
				String filepath=System.getProperty("catalina.base")+"/webapps/headstartdemo/"+fileresource.getFile();
		File fileNew = new File(filepath);

		byte[]	bArray = new byte[(int) fileNew.length()];
		
				InputStream ios = new FileInputStream(fileNew);
        int read = 0;
        OutputStream out1 = (OutputStream)response.getOutputStream ();
		try	{
			response.setContentType("application/octet-stream"); 
			response.addHeader("Content-Disposition","inline; filename=\""+fileName+"\"");

			BufferedOutputStream bos = null;
			try {
				bos = new BufferedOutputStream(out1);
				  while ( (read = ios.read(bArray)) != -1 ) {
					bos.write(bArray,0,read);
		
					}
     					out1.flush();
						out.clear();
						out = pageContext.pushBody(); 
				
			} catch(final Exception e) {
				out.println ("IOException");	
				throw e;
			} finally {
				if (bis != null)
					bis.close();
				if (bos != null)
					bos.close();
			}
			}catch(Exception e)	{
				out.println("Exception occured "+e);
				throw e;
			}			
	}catch(Exception e)	{
		out.println("Exception occured "+e);
		throw e;
	}
%>
</BODY>
</HTML>
