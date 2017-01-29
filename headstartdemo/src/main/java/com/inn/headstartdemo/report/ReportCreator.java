package com.inn.headstartdemo.report;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.hibernate.JDBCException;
import org.hibernate.exception.JDBCConnectionException;
import org.pentaho.reporting.engine.classic.core.ClassicEngineBoot;
import org.pentaho.reporting.engine.classic.core.DataFactory;
import org.pentaho.reporting.engine.classic.core.MasterReport;
import org.pentaho.reporting.engine.classic.core.ReportProcessingException;
import org.pentaho.reporting.engine.classic.core.layout.output.AbstractReportProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.pageable.base.PageableReportProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.pageable.pdf.PdfOutputProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.table.base.FlowReportProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.table.base.StreamReportProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.table.html.AllItemsHtmlPrinter;
import org.pentaho.reporting.engine.classic.core.modules.output.table.html.FileSystemURLRewriter;
import org.pentaho.reporting.engine.classic.core.modules.output.table.html.HtmlOutputProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.table.html.HtmlPrinter;
import org.pentaho.reporting.engine.classic.core.modules.output.table.html.StreamHtmlOutputProcessor;
import org.pentaho.reporting.engine.classic.core.modules.output.table.xls.FlowExcelOutputProcessor;
import org.pentaho.reporting.libraries.repository.ContentLocation;
import org.pentaho.reporting.libraries.repository.DefaultNameGenerator;
import org.pentaho.reporting.libraries.repository.stream.StreamRepository;
import org.pentaho.reporting.libraries.resourceloader.Resource;
import org.pentaho.reporting.libraries.resourceloader.ResourceException;
import org.pentaho.reporting.libraries.resourceloader.ResourceManager;
import org.pentaho.reporting.engine.classic.core.modules.output.table.csv.CSVReportUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ReportCreator {
	private static String CATALINABASE = "catalina.base";
	private static String CHARTMETAXMLPATH = "/webapps/testapp1234/Chart_Meta_Xml.xml";
	private static String ALLZIPPATH = "/webapps/testapp1234/WEB-INF/classes/report/AllZips/";
	private static int typeOfRepo;
	public static enum outputType{
	    EXCEL,PDF,HTML,CSV
	}
	
	private final static Logger logger = LoggerFactory.getLogger(ReportCreator.class);

	private static Connection connection;

	public static void getReport(String src, String dest, ReportCreator.outputType outputType )
			throws FileNotFoundException, ReportProcessingException {

		ReportCreator rg = new ReportCreator();
		rg.reportGenerator(src, dest, outputType);
	}

	public MasterReport getdata(String url) throws ResourceException {
		logger.info("In Master Report  getting data for URL " + url);
		final ResourceManager resourceManager = new ResourceManager();
		resourceManager.registerDefaults();
		final Resource directly = resourceManager.createDirectly(url,
				MasterReport.class);
		return (MasterReport) directly.getResource();

	}

	public static Connection getConnection() throws JDBCConnectionException,
			JDBCException, SQLException {
		String driverClassName = "com.mysql.jdbc.Driver";
		String connectionUrl = "jdbc:mysql://localhost:3306/testapp1234?autoReconnect=true";
		String dbUser = "root";
		String dbPwd = "root";
		try {
			Class.forName(driverClassName);
		} catch (ClassNotFoundException e) {
		  logger.error(e.getMessage());
		}

		connection = DriverManager.getConnection(connectionUrl, dbUser, dbPwd);
		return connection;
	}

	void reportGenerator(String sourceZip, String destinationFile,
		ReportCreator.outputType outputType) throws FileNotFoundException,
			ReportProcessingException {
		logger.info("Generating report for source zip " + sourceZip);
		logger.info("Destination file name is " + destinationFile);

		final MasterReport report = getReportDefinition(sourceZip);

		final DataFactory dataFactory = report.getDataFactory();
		// Set the data factory for the report
		if (dataFactory != null) {
		
			report.setDataFactory(dataFactory);

		}
		// Add any parameters to the report
		final Map parameters = new HashMap<String, Object>();

		parameters.put("Report Title",
				"Simple Embedded Report Example with Parameters");

		parameters.put("Col Headers BG Color", "yellow");
		final Map<String, Object> reportParameters = parameters;

		if (reportParameters != null)

		{
		
			for (String key : reportParameters.keySet())

			{
			
				report.getParameterValues().put(key, reportParameters.get(key));

			}

		}

		// Open the output stream

		BufferedOutputStream outputStream = new BufferedOutputStream(
				new FileOutputStream(destinationFile));

		// Generate the report to this output stream

		// Prepare to generate the report
		AbstractReportProcessor reportProcessor = null;
		try {

			
			// Greate the report processor for the specified output type
			switch (outputType) {
			case PDF: {
			    	final PdfOutputProcessor outputProcessor = new PdfOutputProcessor(report.getConfiguration(), outputStream,
						report.getResourceManager());
				reportProcessor = new PageableReportProcessor(report,
						outputProcessor);
				break;
			}
			case EXCEL: {
				try{
			    	final FlowExcelOutputProcessor target = new FlowExcelOutputProcessor(report.getConfiguration(), outputStream,
						report.getResourceManager());
				reportProcessor = new FlowReportProcessor(report, target);
				}catch(Exception e){logger.error(""+e.getMessage());}
				break;
			}
			case HTML:{
			    final StreamRepository targetRepository = new StreamRepository(
					outputStream);

			final ContentLocation targetRoot = targetRepository.getRoot();
        			final HtmlOutputProcessor outputProcessor = new StreamHtmlOutputProcessor(
        					report.getConfiguration());
        
        			final HtmlPrinter printer = new AllItemsHtmlPrinter(
        					report.getResourceManager());
    
        			printer.setContentWriter(targetRoot, new DefaultNameGenerator(
        					targetRoot, "index", "html"));
        
        			printer.setDataWriter(null, null);
        
        			printer.setUrlRewriter(new FileSystemURLRewriter());
        
        			outputProcessor.setPrinter(printer);
        
        			reportProcessor = new StreamReportProcessor(report, outputProcessor);
				
        			 
        		     reportProcessor.processReport();
			  break;
			}
			
			case CSV: {
				try{
					CSVReportUtil.createCSV(report, outputStream, null);
				    }
				catch(Exception e){
					logger.error(""+e.getMessage());
					}
	
			}
			}
			
			// Generate the report
			if(reportProcessor!=null){
				reportProcessor.processReport();
				}

		}
		catch (Exception e){
		    logger.error(""+e.getMessage());
		}
		finally

		{

			if (reportProcessor != null)

			{

				reportProcessor.close();

			}

		}

	}

	private MasterReport getReportDefinition(String path) {
		try

		{
			ClassicEngineBoot.getInstance().start();

			// Using the classloader, get the URL to the reportDefinition file
			this.getClass().getClassLoader();

			// Parse the report file

			final ResourceManager resourceManager = new ResourceManager();
			resourceManager.registerDefaults();

			final Resource directly = resourceManager.createDirectly(path,
					MasterReport.class);

			return (MasterReport) directly.getResource();

		}

		catch (ResourceException e)

		{
			  logger.error(e.getMessage());

		}

		return null;

	}

}
