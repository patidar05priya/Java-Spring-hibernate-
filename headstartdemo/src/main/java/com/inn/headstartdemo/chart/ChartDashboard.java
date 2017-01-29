package com.inn.headstartdemo.chart;
import java.io.File;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Properties;
import java.sql.DriverManager;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import com.inn.headstartdemo.security.spring.context.ContextProvider;
import com.mysql.jdbc.PreparedStatement;
import com.inn.headstartdemo.utils.ConfigUtil;

public class ChartDashboard{
	
	/** The logger */
	private final Logger logger = LoggerFactory.getLogger(ChartDashboard.class);
	
	public static final String quote="\"";
    public static final String comma=",";
	private static String CATALINABASE="catalina.base";
	private static String CHARTMETAXMLPATH="/webapps/headstartdemo/Chart_Meta_Xml.xml";
	
	/** The result Set Meta Data */
	private ResultSetMetaData rsmd; 
	
	/** The result set */
	private ResultSet resultSet;
	
	/** The y label list array */
	private String yLabelListArray[];
	
	private String sql,reportsql,xLabelList,xList,yList,yLabelList,type,title,problemMessage;
	
	/** The xaxis */
	StringBuilder XAxis=new StringBuilder();
	
	/** The prepared statement*/
	PreparedStatement ptmt = null;
	
	/** The connection*/
    Connection conn=null;
    
    /**
	 * Initialize or get chart dashboard instance
	 * 
	 * @return ChartDashboard
	 */
    public static ChartDashboard getInstance(){
		
	ChartDashboard report=new ChartDashboard();
		
		return report;
		
	}
	
	public String getProblemMessage() {
		return problemMessage;
	}
	public void setProblemMessage(String problemMessage) {
		this.problemMessage = problemMessage;
	}
	public String getSql() {
		return sql;
	}
	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getxLabelList() {
		return xLabelList;
	}
	public void setxLabelList(String xLabelList) {
		this.xLabelList = xLabelList;
	}
	public String getxList() {
		return xList;
	}
	public void setxList(String xList) {
		this.xList = xList;
	}
	public String getyList() {
		return yList;
	}
	public void setyList(String yList) {
		this.yList = yList;
	}
	public String getyLabelList() {
		return yLabelList;
	}
	public void setyLabelList(String yLabelList) {
		this.yLabelList = yLabelList;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	/** check chart xml data
	 * @param Chart_Id
	 * @return boolean
	 */
	public boolean getXMLData(int Chart_Id) {
		try {

			Properties prop = System.getProperties();
			String apache_root = prop.getProperty(CATALINABASE);
			File fXmlFile = new File(apache_root + CHARTMETAXMLPATH);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(fXmlFile);
			doc.getDocumentElement().normalize();
			NodeList nList = doc.getElementsByTagName("chart");

			if (Chart_Id > nList.getLength()) {
				problemMessage = "The Char_Number you asking is out of range";
				return false;
			}
			Node nNode = nList.item(Chart_Id);

			if (nNode.getNodeType() == Node.ELEMENT_NODE) {

				Element eElement = (Element) nNode;
				if (!eElement.getAttribute("sql").equals("")) {

					sql = eElement.getAttribute("sql");
				} else {
					problemMessage = "SQL element for chart id =" + Chart_Id
							+ "is blank  And its title is  "
							+ eElement.getAttribute("title");
					return false;
				}
				if (!eElement.getAttribute("type").equals("")) {
					type = eElement.getAttribute("type");
				} else {
					problemMessage = "type element for chart id =" + Chart_Id
							+ "is blank And its title is  "
							+ eElement.getAttribute("title");

					return false;
				}
				xLabelList = eElement.getAttribute("XLabelList");
				if (!eElement.getAttribute("xList").equals("[]")) {
					xList = eElement.getAttribute("xList");
					xList = xList.replaceAll("\\[", "");
					xList = xList.replaceAll("\\]", "");

				} else {
					problemMessage = "xList element for chart id =" + Chart_Id
							+ "is blank And its title is  "
							+ eElement.getAttribute("title");
					return false;
				}

				if (!eElement.getAttribute("yLabelList").equalsIgnoreCase("[]")) {
					yLabelList = eElement.getAttribute("yLabelList");
					yLabelList = yLabelList.replaceAll("\\[", "");
					yLabelList = yLabelList.replaceAll("\\]", "");
					yLabelListArray = yLabelList.split(",");
				} else {
					problemMessage = "yLabelList element for chart id ="
							+ Chart_Id + "is blank And its title is  "
							+ eElement.getAttribute("title");
					return false;
				}
				if (!eElement.getAttribute("yList").equals("[]")) {
					yList = eElement.getAttribute("yList");
				} else {
					problemMessage = "yList element for chart id =" + Chart_Id
							+ "is blank  And its title is  "
							+ eElement.getAttribute("title");
					return false;
				}

				title = eElement.getAttribute("title");
				reportsql = eElement.getAttribute("reportsql");

			}
		} catch (Exception e) {
			logger.error(" Exception while  in chartDashboard-getXMLData : ",e);
		}
		return true;

	}
	

	/** Get result set from database using sql query
	 * @param sql
	 * @return ResultSet
	 * @throws SQLException
	 * @throws ConfigurationException 
	 */
	public ResultSet getDataBase(String sql) throws SQLException {
		logger.info("Info ChartDashboard-getDataBase for sql : "+sql);
		String driverClassName = ConfigUtil.getDbProp(ConfigUtil.DRIVER_CLASSNAME);
		String connectionUrl = ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_URL);
		String dbUser = ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_USERNAME);
		String dbPwd = ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_PASSWORD);
		if (driverClassName != null && connectionUrl != null && dbUser != null && dbPwd != null) {
			try {
				Class.forName(driverClassName);
			} catch (ClassNotFoundException e) {
				logger.error(" ClassNotFoundException in establish connection for dashboard chart : ",e);
			}
			conn = DriverManager.getConnection(connectionUrl, dbUser, dbPwd);
			ptmt = (PreparedStatement) conn.prepareStatement(sql);
			resultSet = ptmt.executeQuery();
			return resultSet;
		} 
		
		return null;
	}

	/**
	 *  Method for get x-axis data form database
	 * @return String
	 * @throws SQLException
	 */
	public String getXAxisDataFromDataBase() throws SQLException {
		while (resultSet.next()) {
			if (isNull(resultSet)) {
				XAxis.append(quote);
				XAxis.append(resultSet.getString(xList));
				XAxis.append(quote);
				XAxis.append(comma);
			}
		}
		return XAxis.toString();
	}

	public String[] getYList() {
		return yLabelListArray;
	}

	
	/** Method for get y-axis data from database
	 * @param column
	 * @param rset
	 * @return
	 * @throws SQLException
	 */
	public String getYAxisDataFromDataBase(String column, ResultSet rset)
			throws SQLException {
		StringBuilder YData = new StringBuilder();
		while (resultSet.previous()) {
			logger.error(".......");
		}
		while (resultSet.next()) {
			if (isNull(resultSet)) {
				YData.append(resultSet.getString(column));
				YData.append(comma);
			}
		}

		return YData.toString();

	}

	/** check result set  have null value 
	 * @param resultSet
	 * @return
	 * @throws SQLException
	 */
	public boolean isNull(ResultSet resultSet) throws SQLException {
		rsmd = resultSet.getMetaData();
		int columnsNumber = rsmd.getColumnCount();
		for (int i = 1; i <= columnsNumber; i++) {
			if (resultSet.getString(i) == null) {
				return false;
			}
		}
		return true;
	}
	
}
	
