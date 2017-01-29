package com.inn.headstartdemo.service.impl;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
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

import com.inn.headstartdemo.service.IRolesService;
import com.inn.headstartdemo.model.Roles;
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
public class TestRolesServiceImpl extends
		AbstractTransactionalTestNGSpringContextTests {

	@BeforeClass
	public void setUpRoles() {
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

			entity = (Roles) JPAUtils.getEntityObj(Roles.class);
			Map<String, Map<String, Object>> dbUnitTableMap = JPAUtils
					.getDbUnitDefaultDataSet(Roles.class, entity);

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
	public void tearDownRoles() {
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
	 *method to create the new testcase of testRoles
	 *	
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesCreate() {
		Roles actualObject = null;
		Roles expectedObject = entity;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, defaultDataSet);

			for (Method method : methods) {
				if (method.getName().equals("create")) {
					//method.invoke(serviceObj, entity);
						serviceObj.create(entity);
				}
			}
			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles) 	serviceObj.findById(pk);
				}
			}

			Assert
					.assertTrue(JPAUtils.comparePrimitives(entity,
							actualObject, expectedObject), "Entity "
							+ entity.getClass().getSimpleName()
							+ ", Create test fail.");
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			try {
				DatabaseOperation.DELETE.execute(connection, defaultDataSet);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
	}

    /**
	 * 
	 *method to update testcase of testRoles
	 *	
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesUpdate() {
		Roles actualObject = null;
		Roles expectedObject = entity;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			for (Method method : methods) {
				if (method.getName().equals("update")) {
					//method.invoke(serviceObj, entity);
					serviceObj.update(entity);
				}
			}
			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles) serviceObj.findById(pk);
				}
			}

			Assert
					.assertTrue(JPAUtils.comparePrimitives(entity,
							actualObject, expectedObject), "Entity "
							+ entity.getClass().getSimpleName()
							+ ", Update test fail.");
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

    /**
	 * 
	 *method to  delete the entity testcase of testRoles
	 *	
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesDelete() {
		Roles actualObject = null;
		Roles expectedObject = null;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			for (Method method : methods) {
				if (method.getName().equals("delete")) {
					//method.invoke(serviceObj, entity);
					serviceObj.remove(entity);
				}
			}
			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles) serviceObj.findById(pk);
				}
			}

			Assert
					.assertTrue(JPAUtils.comparePrimitives(entity,
							actualObject, expectedObject), "Entity "
							+ entity.getClass().getSimpleName()
							+ ", Delete test fail.");
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

    /**
	 * 
	 *method to  delete the entity testcase of testRoles  by primary key
	 *@throws Exception
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesDeleteByPk() throws Exception {
		Roles actualObject = null;
		Roles expectedObject = null;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			for (Method method : methods) {
				if (method.getName().equals("deleteByPk")) {
					//method.invoke(serviceObj, pk);
					serviceObj.removeById(pk);
				}
			}
			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles)  serviceObj.findById(pk);
				}
			}

			Assert.assertTrue(JPAUtils.comparePrimitives(entity, actualObject,
					expectedObject), "Entity "
					+ entity.getClass().getSimpleName()
					+ ", DeleteByPk test fail.");
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

    /**
	 * 
	 *method to  Find all the testcase of testRoles  
	 *
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesFindAll() {
		Roles actualObject = null;
		Roles expectedObject = entity;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			for (Method method : methods) {
				if (method.getName().equals("findAll")) {
					//method.invoke(serviceObj);
					 serviceObj.findAll();
				}
			}
			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles)  serviceObj.findById(pk);
				}
			}

			Assert.assertTrue(JPAUtils.comparePrimitives(entity, actualObject,
					expectedObject), "Entity "
					+ entity.getClass().getSimpleName()
					+ ", FindAll test fail.");
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

    /**
	 * 
	 *method to  Find the testcase of testRoles by primarykey
	 *
	 */
	@Test(groups = "service", alwaysRun = true)
	public void testRolesFindByPk() {
		Roles actualObject = null;
		Roles expectedObject = entity;
		Long pk = entity.getRoleid();

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			for (Method method : methods) {
				if (method.getName().equals("findByPk")) {
					actualObject = (Roles) serviceObj.findById(pk);
				}
			}

			Assert.assertTrue(JPAUtils.comparePrimitives(entity, actualObject,
					expectedObject), "Entity "
					+ entity.getClass().getSimpleName()
					+ ", FindByPk test fail.");
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
	private IRolesService serviceObj;
	private Method[] methods = null;
	private Roles entity = new Roles();
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
			.getLogger(TestRolesServiceImpl.class);
}
