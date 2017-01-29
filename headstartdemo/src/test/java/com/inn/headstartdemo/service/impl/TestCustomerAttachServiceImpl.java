package com.inn.headstartdemo.service.impl;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.List;
import java.io.File;
import java.io.InputStream;
import java.util.Map.Entry;
import com.inn.headstartdemo.utils.ConfigUtil;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import java.net.URLDecoder;

import com.inn.headstartdemo.service.ICustomerService;
import com.inn.headstartdemo.service.ICustomerAttachService;
import com.inn.headstartdemo.model.Customer;
import com.inn.headstartdemo.model.CustomerAttach;

import com.inn.toolUtils.JPAUtils;

/**
 * 
 * @author $author
 * @version $version
 *
 */
 
/**
 * 
 * Test Service 
 *
 */
@ContextConfiguration(locations = { "/applicationContext/*.xml" })
@TransactionConfiguration(defaultRollback = true)
public class TestCustomerAttachServiceImpl extends
		AbstractTransactionalTestNGSpringContextTests {

	@BeforeClass
	public void setUpCustomerAttach() {
		try {
			// Getting IDatabaseConnection Connection
			Class.forName(dbDriver);
			Connection jdbcConnection = DriverManager.getConnection(dbUrl,
					dbUser, dbPassword);
			connection = new DatabaseConnection(jdbcConnection);
            DatabaseConfig config = connection.getConfig();
			config.setFeature("http://www.dbunit.org/features/caseSensitiveTableNames",true);
			methods = serviceObj.getClass().getMethods();
			String entityName = entity.getClass().getSimpleName().toLowerCase();

			entity = (CustomerAttach) JPAUtils.getEntityObj(CustomerAttach.class);
			Map<String, Map<String, Object>> dbUnitTableMap = JPAUtils
					.getDbUnitDefaultDataSet(CustomerAttach.class, entity);

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

	@AfterClass(groups = "service", alwaysRun = true)
	public void tearDownCustomerAttach() {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
		}
	}


    /**
	 * 
	 *method to create the fileAttach testcase of testCustomerAttach
	 *	
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testCustomerAttachCreate() {
							
			try {
			
				DatabaseOperation.INSERT.execute(connection, totalDataSet);
				String path = this.getClass().getClassLoader().getResource("").getPath();
				String fullPath = URLDecoder.decode(path, "UTF-8");
				String pathArr[] = fullPath.split("/target");
				if (StringUtils.isBlank(System.getProperty("catalina.base"))) {
					System.setProperty("catalina.base", pathArr[0]+"/src/main/webapp");           // Replace catalina base value to server specific when catalina base null
				}
				
				List<Customer>  Customers = serviceObj.findAll();
				if(!Customers.isEmpty() && Customers.size() > 0) {
					int count = 0;
					for (Customer CustomerObject :Customers) {
						    
						    count++;
						    if (count > 5) {
						    	break;
						    }
						    
							InputStream in = this.getClass().getResourceAsStream("/config.properties");
							CustomerAttach CustomerAttachObject = CustomerAttachServiceObj.add(CustomerObject.getCustomerNumber(),"testcasefile", in);
							
							//CustomerAttach CustomerAttachObject = CustomerAttachServiceObj.add(CustomerObject.getCustomerNumber(),"testcasefile", in);
							// File attachment deletion code for revert test changes
							/* 
							File uploadFile = new File(System.getProperty("catalina.base")+"/webapps/headstartdemo"+CustomerAttachObject.getFileUploads().getFile());
							File uploadFileParents = uploadFile.getParentFile();
							FileUtils.deleteDirectory(uploadFileParents);
							
							CustomerAttachServiceObj.remove(CustomerAttachObject);
							*/
					 }
				}
			} catch (Exception e) {
				logger.error(e.getMessage());
			} finally {
				try {
					DatabaseOperation.DELETE.execute(connection, totalDataSet);
				} catch (Exception e) {
					logger.error(e.getMessage());
				}
			}
	}

   

	@Autowired
	private ICustomerService serviceObj;
	@Autowired
	private ICustomerAttachService CustomerAttachServiceObj;
	private Method[] methods = null;
	private CustomerAttach entity = new CustomerAttach();
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


	public static Logger logger = LoggerFactory
			.getLogger(TestCustomerAttachServiceImpl.class);
}
