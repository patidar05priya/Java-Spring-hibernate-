package com.inn.headstartdemo.db;

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
import org.dbunit.dataset.ITableIterator;
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

import com.inn.headstartdemo.model.UserConfig;
import com.inn.toolUtils.JPAUtils;
import com.inn.toolUtils.JPAUtilsPojo.ClassInfo;

@ContextConfiguration(locations = { "/applicationContext/*.xml" })
@TransactionConfiguration(defaultRollback = true)
public class TestUserConfigDb extends
		AbstractTransactionalTestNGSpringContextTests {

	@BeforeClass
	public void setUpUserConfig() {
		try {
			// Getting IDatabaseConnection Connection
			Class.forName(dbDriver);
			Connection jdbcConnection = DriverManager.getConnection(dbUrl,
					dbUser, dbPassword);
			connection = new DatabaseConnection(jdbcConnection);
            DatabaseConfig config = connection.getConfig();
			config.setFeature("http://www.dbunit.org/features/caseSensitiveTableNames",true);
			String entityName = entity.getClass().getSimpleName().toLowerCase();

			entity = (UserConfig) JPAUtils.getEntityObj(UserConfig.class);
			Map<String, Map<String, Object>> dbUnitTableMap = JPAUtils
					.getDbUnitDefaultDataSet(UserConfig.class, entity);

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

	@AfterClass(groups = "db", alwaysRun = true)
	public void tearDownUserConfig() {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
		}
	}

	@Test(groups = "db", alwaysRun = true)
	public void testUserConfigDBCreate() {
		Object actualObject = null;
		Object expectedObject = null;
		ITable actualTable = null;
		ITable expectedTable = null;
	try {
		Integer pk = entity.getId();
		Map<Class<?>, ClassInfo> mapInfo = JPAUtils.getEntityInfo(entity
				.getClass());
		ClassInfo tableInfo = mapInfo.get(entity.getClass());
		String tableName = tableInfo.getTableName();
		String idColumnName = tableInfo.getIdColumnName();

	
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			actualTable = totalDataSet.getTable(tableName);
			actualObject = actualTable.getValue(0, idColumnName);

			expectedTable = connection.createQueryTable(tableName,
					"select * from " + tableName + " where " + idColumnName
							+ "='" + pk + "'");
			expectedObject = expectedTable.getValue(0, idColumnName);

			Assert
					.assertEquals(actualObject, expectedObject, "Entity "
							+ entity.getClass().getSimpleName()
							+ ", Create test fail.");
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

	@Test(groups = "db", alwaysRun = true)
	public void testUserConfigDBFindByPk() {
		Object actualObject = null;
		Object expectedObject = null;
		ITable actualTable = null;
		ITable expectedTable = null;
	try {
		Integer pk = entity.getId();
		Map<Class<?>, ClassInfo> mapInfo = JPAUtils.getEntityInfo(entity
				.getClass());
		ClassInfo tableInfo = mapInfo.get(entity.getClass());
		String tableName = tableInfo.getTableName();
		String idColumnName = tableInfo.getIdColumnName();

	
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			actualTable = totalDataSet.getTable(tableName);
			actualObject = actualTable.getValue(0, idColumnName);

			expectedTable = connection.createQueryTable(tableName,
					"select * from " + tableName + " where " + idColumnName
							+ "='" + pk + "'");
			expectedObject = expectedTable.getValue(0, idColumnName);

			Assert.assertEquals(actualObject, expectedObject, "Entity "
					+ entity.getClass().getSimpleName() + ", Find test fail.");
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

	@Test(groups = "db", alwaysRun = true)
	public void testUserConfigDBUpdate() {
		ITable beforeUpdate = null;
		ITable afterUpdate = null;
		ITable entityTable = null;
		DefaultDataSet updatedDataSet = new DefaultDataSet();
		DefaultTable defaultEntityTable = null;
	try {
		Integer pk = entity.getId();
		Map<Class<?>, ClassInfo> mapInfo = JPAUtils.getEntityInfo(entity
				.getClass());
		ClassInfo tableInfo = mapInfo.get(entity.getClass());
		String tableName = tableInfo.getTableName();
		String idColumnName = tableInfo.getIdColumnName();

	
			DatabaseOperation.INSERT.execute(connection, totalDataSet);
			beforeUpdate = connection.createQueryTable(tableName,
					"select * from " + tableName + " where " + idColumnName
							+ "='" + pk + "'");

			entityTable = dbDataSet.getTable(tableName);
			defaultEntityTable = new DefaultTable(tableName, entityTable
					.getTableMetaData().getColumns());
			defaultEntityTable.addRow();
			defaultEntityTable.setValue(0, idColumnName, pk);
			updatedDataSet.addTable(defaultEntityTable);

			DatabaseOperation.UPDATE.execute(connection, updatedDataSet);

			afterUpdate = connection.createQueryTable(tableName,
					"select * from " + tableName + " where " + idColumnName
							+ "='" + pk + "'");

			Assert
					.assertNotSame(afterUpdate, beforeUpdate, "Entity "
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

	@Test(groups = "db", alwaysRun = true)
	public void testUserConfigDBDelete() {
		int actualRows = 0;
		int expectedRows = 0;
		ITable AfterDelete = null;
	try {
		Integer pk = entity.getId();
		Map<Class<?>, ClassInfo> mapInfo = JPAUtils.getEntityInfo(entity
				.getClass());
		ClassInfo tableInfo = mapInfo.get(entity.getClass());
		String tableName = tableInfo.getTableName();
		String idColumnName = tableInfo.getIdColumnName();

	
			DatabaseOperation.INSERT.execute(connection, totalDataSet);
			DatabaseOperation.DELETE.execute(connection, entityDataSet);

			AfterDelete = connection.createQueryTable(tableName,
					"select * from " + tableName + " where " + idColumnName
							+ "='" + pk + "'");
			actualRows = AfterDelete.getRowCount();

			Assert
					.assertEquals(actualRows, expectedRows, "Entity "
							+ entity.getClass().getSimpleName()
							+ ", Delete test fail.");
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

	@Test(groups = "db", alwaysRun = true)
	public void testUserConfigDBReferetial() {
		ITable actualTable = null;
		ITable dependTable = null;
		Integer dependPk = null;
		Integer actualPk = null;
		String dependTableName = null;
		String dependTableId = null;

		try {
			DatabaseOperation.INSERT.execute(connection, totalDataSet);

			if (defaultDataSet.getTables().length != 0) {

				ITableIterator iTableIterator = defaultDataSet
						.reverseIterator();
				if (iTableIterator.next()) {
					dependTable = iTableIterator.getTable();
					dependTableName = dependTable.getTableMetaData()
							.getTableName();

					dependTableId = dependTableName + "_id";
					dependPk = (Integer) dependTable.getValue(0, dependTableId);
				}

				actualTable = connection.createQueryTable(dependTableName,
						"select * from " + dependTableName + " where "
								+ dependTableId + " = " + dependPk);
				actualPk = (Integer) actualTable.getValue(0, dependTableId);

				Assert.assertEquals(actualPk, dependPk, "Entity "
						+ entity.getClass().getSimpleName()
						+ ", Referential Integrity test fail.");
			} else {
				Assert.assertTrue(true);
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

	private UserConfig entity = new UserConfig();
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


	public static Logger logger = LoggerFactory.getLogger(TestUserConfigDb.class);
}
