package com.inn.headstartdemo.rest.impl;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.DatabaseDataSet;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.DefaultDataSet;
import org.dbunit.dataset.DefaultTable;
import org.dbunit.dataset.ITable;
import org.dbunit.operation.DatabaseOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import com.eviware.soapui.impl.wsdl.WsdlProject;
import com.eviware.soapui.model.support.PropertiesMap;
import com.eviware.soapui.model.testsuite.TestCase;
import com.eviware.soapui.model.testsuite.TestRunner;
import com.eviware.soapui.model.testsuite.TestCaseRunner;
import com.eviware.soapui.model.testsuite.TestSuite;
import com.eviware.soapui.model.testsuite.TestRunner.Status;
import com.eviware.soapui.model.testsuite.TestStep;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.inn.headstartdemo.model.Orderdetail;
import com.inn.headstartdemo.utils.ConfigUtil;
import com.inn.headstartdemo.utils.MyOwnExclusionStrategy;
import com.inn.toolUtils.JPAUtils;
/**
 * 
 * @author $author
 * @version $version
 *
 */
 
/**
 * 
 * Test Rest 
 *
 */
@ContextConfiguration(locations = { "/applicationContext/*.xml" })
@TransactionConfiguration(defaultRollback = true)
public class TestOrderdetailRestImpl extends AbstractTransactionalTestNGSpringContextTests {
	@BeforeClass
	public void setUpOrderdetail() {
		try {
			// Getting IDatabaseConnection Connection
			Class.forName(dbDriver);
			Connection jdbcConnection = DriverManager.getConnection(dbUrl,
					dbUser, dbPassword);
			connection = new DatabaseConnection(jdbcConnection);
            DatabaseConfig config = connection.getConfig();
			config.setFeature("http://www.dbunit.org/features/caseSensitiveTableNames",true);
			String entityName = entity.getClass().getSimpleName().toLowerCase();

			entity = (Orderdetail) JPAUtils.getEntityObj(Orderdetail.class);
			Map<String, Map<String, Object>> dbUnitTableMap = JPAUtils
					.getDbUnitDefaultDataSet(Orderdetail.class, entity);

			entityDataSet = new DefaultDataSet();
			defaultDataSet = new DefaultDataSet();
			totalDataSet = new DefaultDataSet();
			dbDataSet = new DatabaseDataSet(connection, true);

			Iterator<String> dbUnitIterator = dbUnitTableMap.keySet()
					.iterator();
			while (dbUnitIterator.hasNext()) {
				String key = dbUnitIterator.next().toString();
				logger.debug("Information of Key :" + key);
				Map<String, Object> tableMap = dbUnitTableMap.get(key);
				Set<Entry<String, Object>> tableColSet = tableMap.entrySet();

				ITable iTable = dbDataSet.getTable(key);
				defaultTable = new DefaultTable(key, iTable.getTableMetaData()
						.getColumns());
				defaultTable.addRow();

				for (Entry<String, Object> entry : tableColSet) {
					logger.debug(entry.getKey() + " : " + entry.getValue());
					defaultTable.setValue(0, entry.getKey(), entry.getValue());
				}
				if (key.equals(entityName)) {
					entityDataSet.addTable(defaultTable);
				} else {
					defaultDataSet.addTable(defaultTable);
				}
				totalDataSet.addTable(defaultTable);
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
		}
	}

	@AfterClass(groups = "rest", alwaysRun = true)
	public void tearDownOrderdetail() {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
		}
	}

	@Test(groups = "rest", alwaysRun = true)
	public void restOrderdetailTestCaseRunner() {
		try {
			DatabaseOperation.INSERT.execute(connection, defaultDataSet);
			WsdlProject project = new WsdlProject(testSourceDirectory.concat(
					SEPARATOR).concat(packageName.replace(".", SEPARATOR)).concat(SEPARATOR).concat(
					webSubPackage).concat(SEPARATOR).concat(RESOURCE_DIR)
					.concat(SEPARATOR).concat(xmlFileName));
			for(TestSuite testSuite:project.getTestSuiteList())
			{
				for(TestCase testCase:testSuite.getTestCaseList())
				{	
					String entityId = String.valueOf(entity.getId());
					testCase.setPropertyValue("entityId", entityId);
					Gson gson = new GsonBuilder().setExclusionStrategies(new MyOwnExclusionStrategy()).setDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz").create();
					testCase.setPropertyValue("entityObject", gson.toJson(entity));
					testCase.setPropertyValue("entityId", entity.getId().toString());
					TestCaseRunner runner = testCase.run(new PropertiesMap(), false);
				    Assert.assertEquals(runner.getStatus(), Status.FINISHED);
				}
			}	
		} 
		catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			try {
				DatabaseOperation.DELETE.execute(connection, defaultDataSet);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
	}

	private String testSourceDirectory = "src/test/java";
	private String packageName = "com.inn.headstartdemo";
	private String webSubPackage = "rest";
	private String xmlFileName = "TestOrderdetailRestXML.xml";
	private String RESOURCE_DIR = "resources";

	private Orderdetail entity = new Orderdetail();
	private IDatabaseConnection connection;
	private DefaultTable defaultTable = null;
	private DatabaseDataSet dbDataSet = null;
	private DefaultDataSet entityDataSet = null;
	private DefaultDataSet defaultDataSet = null;
	private DefaultDataSet totalDataSet = null;

	private final static String dbUser = ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_USERNAME);
	private final static String dbPassword =ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_PASSWORD);
	private final static String dbUrl =  ConfigUtil.getDbProp(ConfigUtil.DB_CONNECTION_URL);
	private final static String dbDriver = ConfigUtil.getDbProp(ConfigUtil.DRIVER_CLASSNAME);

	private static final String SEPARATOR = System.getProperty("file.separator");
	public static Logger logger = LoggerFactory.getLogger(TestOrderdetailRestImpl.class);
}
