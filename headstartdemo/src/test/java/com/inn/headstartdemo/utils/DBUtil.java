package com.inn.headstartdemo.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.dbunit.DatabaseUnitException;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.database.QueryDataSet;
import org.dbunit.dataset.Column;
import org.dbunit.dataset.DataSetException;
import org.dbunit.dataset.DefaultDataSet;
import org.dbunit.dataset.DefaultTable;
import org.dbunit.dataset.ITable;
import org.dbunit.dataset.ITableMetaData;
import org.dbunit.operation.DatabaseOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author 
 * 
 */
public class DBUtil {

		/** The logger. */
		private static Logger logger=LoggerFactory.getLogger(DBUtil.class);
	/**
	 * 
	 * @param connection
	 * @param entity
	 * @throws Exception
	 */
	public static void insertData(IDatabaseConnection connection, Object entity) throws Exception {

		try {

			//Getting table name for the entity
			String tableName = entity.getClass().getSimpleName().toLowerCase();
						
			QueryDataSet partialdataset = new QueryDataSet(connection);
			
			partialdataset.addTable(tableName);

			//System.out.println("Table added in dataset " + tableName);

			ITableMetaData metaData = partialdataset
					.getTableMetaData(tableName);

			Object entityId = null;

			Column[] columns = metaData.getColumns();

			List<Object> list = new ArrayList<Object>();

			Class<?> entityClass = Class.forName(entity.getClass().getName());

			Method[] methods = entityClass.getMethods();
			
			for (Column column : columns) {

				for (Method method : methods) {
					
					if (method.getName().startsWith("get")) {
						
						if (column.getColumnName().toLowerCase().startsWith(
								method.getName().replaceFirst("get", "")
										.toLowerCase())) {
							//System.out.println("Test Object " + entity);
							Object obj = method.invoke(entity, null);
							//System.out.println("Test Object " + entity);
							if (SampleUtil.requiredParsing(obj.getClass())) {

								if (!method.getGenericReturnType().getClass()
										.getName().endsWith("Set")
										&& !method.getGenericReturnType()
												.getClass().getName().endsWith(
														"List")) {
									insertData(connection, obj);

									Class innerEntityClass = Class.forName(obj
											.getClass().getName());
									Method[] innerMethods = innerEntityClass
											.getMethods();
									for (Method innerMethod : innerMethods) {

										if (innerMethod.getName().startsWith(
												"get")
												&& innerMethod.getName()
														.endsWith("Id")) {

											Object innerObj = innerMethod
													.invoke(obj, null);

											list.add(innerObj);
										}
									}
								}
							} else {
								list.add(obj);
							}

						}
						if (method.getName().endsWith("Id")) {
							// System.out.println(obj.getClass().toString() +
							// " Id Method " + method.getName());
							Object innerObj = method.invoke(entity, null);
							entityId = innerObj;
						}
					}
				}

			}
			//dependencylist.add(entity);
			execute(connection, tableName, columns, list, 0);

			for (Method method : methods) {
				if (method.getName().startsWith("get")) {
					String genericReturnType = method.getGenericReturnType().toString();
					//System.out.println("genericReturnType " + genericReturnType);
					
					if (genericReturnType.contains("java.util.Set") || genericReturnType.contains("java.util.List")) {
						//System.out.println("List Method " + method.getName());
						Object obj = method.invoke(entity, null);
						
						//System.out.println("List Object " + obj);
						
						if(null!=obj)
						{
							Class listClass = Class.forName(obj.getClass()
									.getName());
							//System.out.println("Method " + method.getName());
							Method[] innerMethods = listClass.getMethods();
	
							for (Method innerMethod : innerMethods) {
	
								if (innerMethod.getName().equals("iterator")) {
									Iterator iter = (Iterator) innerMethod.invoke(
											obj, null);
	
									while (iter.hasNext()) {
										Object customObject = iter.next();
										
										insertData(connection, customObject);
	
										Class innerEntityClass = Class
												.forName(customObject.getClass()
														.getName());
										Method[] innerEntityMethods = innerEntityClass
												.getMethods();
	
										for (Method innerEntityMethod : innerEntityMethods) {
											if (innerEntityMethod.getName()
													.startsWith("get")
													&& innerEntityMethod.getName()
															.endsWith("Id")) {
	
												Object innerObj = innerEntityMethod
														.invoke(customObject, null);
	
												String relationTableName = entity
														.getClass()
														.getSimpleName()
														.concat("_")
														.concat(
																customObject
																		.getClass()
																		.getSimpleName());
	
												QueryDataSet relationdataset = new QueryDataSet(
														connection);
	
												relationdataset
														.addTable(relationTableName);
	
												ITableMetaData relationMetaData = relationdataset
														.getTableMetaData(relationTableName);
	
												Column[] relationColumns = relationMetaData
														.getColumns();
	
												List relationList = new ArrayList();
												// {1, entityId, innerObj};
	
												for (Column relationColumn : relationColumns) {
													if (relationColumn
															.getColumnName()
															.toLowerCase()
															.contains(
																	entity
																			.getClass()
																			.getSimpleName()
																			.toLowerCase())) {
														relationList.add(entityId);
													} else if (relationColumn
															.getColumnName()
															.toLowerCase()
															.contains(
																	customObject
																			.getClass()
																			.getSimpleName()
																			.toLowerCase())) {
														relationList.add(innerObj);
													} else {
														relationList.add(1);
													}
												}
												//dependencylist.add(relationTableName);
												execute(connection, relationTableName, relationColumns, relationList, 0);
											}
										}
									}
								}
							}
	
						}
					}
				}
			}

		} catch (DataSetException e) {
		  logger.error(""+e.getMessage());
			
		} catch (DatabaseUnitException e) {
		  logger.error(""+e.getMessage());
			}

	}
	/**
	 * 
	 * @param connection
	 * @param entity
	 * @return
	 */
	public static Object getData(IDatabaseConnection connection, Object entity) {

		//TODO
		return entity;
	}
	/**
	 * 
	 * @param entity
	 * @throws Exception
	 */
	public static void updateData(IDatabaseConnection connection, Object entity) throws Exception {

		try {

			//Getting table name for the entity
			String tableName = entity.getClass().getSimpleName().toLowerCase();

			QueryDataSet partialdataset = new QueryDataSet(connection);
			
			partialdataset.addTable(tableName);

			//System.out.println("Table added in dataset " + tableName);

			ITableMetaData metaData = partialdataset
					.getTableMetaData(tableName);

			Object entityId = null;

			Column[] columns = metaData.getColumns();
			
			Vector<Column> columnlist = new Vector<Column>();
			
			for (Column column : columns) 
			{

				if(column.getColumnName().toLowerCase().contains(entity.getClass().getSimpleName().concat("id").toLowerCase()))
				{
					//System.out.println(column.getColumnName());
					columnlist.add(column);
				}
				else if(!column.getColumnName().toLowerCase().contains("id"))
				{
					//System.out.println(column.getColumnName());
					columnlist.add(column);
				}

			}
			Column[] newCol = new Column[columnlist.size()];
			columnlist.copyInto(newCol);
			//columns = newCol;

			List<Object> list = new ArrayList<Object>();

			Class<?> entityClass = Class.forName(entity.getClass().getName());

			Method[] methods = entityClass.getMethods();
			
			for (Column column : newCol) {
				for (Method method : methods) {
					
					if (method.getName().startsWith("get")) {
						
						if (column.getColumnName().toLowerCase().startsWith(
								method.getName().replaceFirst("get", "")
										.toLowerCase())) {

							Object obj = method.invoke(entity, null);

							if (SampleUtil.requiredParsing(obj.getClass())) {

							} else {
								
								list.add(obj);
							}

						}
					}
				}

			}
			execute(connection, tableName, newCol, list, 1);

		} catch (DataSetException e) {
			// TODO Auto-generated catch block
			  logger.error(""+e.getMessage());
		
		} catch (DatabaseUnitException e) {
			// TODO Auto-generated catch block
		  logger.error(""+e.getMessage());
		
		}
		
	}
	/**
	 * 
	 * @param entity
	 * @throws Exception
	 */
	public static void deleteData(IDatabaseConnection connection, Object entity) throws Exception {
		try {

			//Getting table name for the entity
			String tableName = entity.getClass().getSimpleName().toLowerCase();
						
			QueryDataSet partialdataset = new QueryDataSet(connection);
			
			partialdataset.addTable(tableName);

			//System.out.println("Table added in dataset " + tableName);

			ITableMetaData metaData = partialdataset
					.getTableMetaData(tableName);

			Object entityId = null;

			Column[] columns = metaData.getColumns();

			List<Object> list = new ArrayList<Object>();

			Class<?> entityClass = Class.forName(entity.getClass().getName());

			Method[] methods = entityClass.getMethods();
			
			for (Column column : columns) {

				for (Method method : methods) {
					
					if (method.getName().startsWith("get")) {
						
						if (column.getColumnName().toLowerCase().startsWith(
								method.getName().replaceFirst("get", "")
										.toLowerCase())) {

							Object obj = method.invoke(entity, null);

							if (!SampleUtil.requiredParsing(obj.getClass())) {
								list.add(obj);
							}

						}
						if (method.getName().endsWith("Id")) {
							// System.out.println(obj.getClass().toString() +
							// " Id Method " + method.getName());
							Object innerObj = method.invoke(entity, null);
							entityId = innerObj;
						}
					}
				}

			}
			
			for (Method method : methods) {
				if (method.getName().startsWith("get")) {
					String genericReturnType = method.getGenericReturnType().toString();

					if (genericReturnType.contains("java.util.Set") || genericReturnType.contains("java.util.List")) {

						Object obj = method.invoke(entity, null);

						Class listClass = Class.forName(obj.getClass()
								.getName());

						Method[] innerMethods = listClass.getMethods();

						for (Method innerMethod : innerMethods) {

							if (innerMethod.getName().equals("iterator")) {
								Iterator iter = (Iterator) innerMethod.invoke(
										obj, null);

								while (iter.hasNext()) {
									Object customObject = iter.next();
									
									//insertData(customObject);

									Class innerEntityClass = Class
											.forName(customObject.getClass()
													.getName());
									Method[] innerEntityMethods = innerEntityClass
											.getMethods();

									for (Method innerEntityMethod : innerEntityMethods) {
										if (innerEntityMethod.getName()
												.startsWith("get")
												&& innerEntityMethod.getName()
														.endsWith("Id")) {

											Object innerObj = innerEntityMethod
													.invoke(customObject, null);

											String relationTableName = entity
													.getClass()
													.getSimpleName()
													.concat("_")
													.concat(
															customObject
																	.getClass()
																	.getSimpleName());

											QueryDataSet relationdataset = new QueryDataSet(
													connection);

											relationdataset
													.addTable(relationTableName);

											ITableMetaData relationMetaData = relationdataset
													.getTableMetaData(relationTableName);

											Column[] relationColumns = relationMetaData
													.getColumns();

											List relationList = new ArrayList();
											// {1, entityId, innerObj};

											for (Column relationColumn : relationColumns) {
												if (relationColumn
														.getColumnName()
														.toLowerCase()
														.contains(
																entity
																		.getClass()
																		.getSimpleName()
																		.toLowerCase())) {
													relationList.add(entityId);
												} else if (relationColumn
														.getColumnName()
														.toLowerCase()
														.contains(
																customObject
																		.getClass()
																		.getSimpleName()
																		.toLowerCase())) {
													relationList.add(innerObj);
												} else {
													relationList.add(1);
												}
											}
											execute(connection, relationTableName, relationColumns, relationList, 2);
										}
									}
								}
							}
						}

					}
				}
			}

			execute(connection, tableName, columns, list, 2);

		} catch (DataSetException e) {
			// TODO Auto-generated catch block
				logger.error(""+e.getMessage());
		} catch (DatabaseUnitException e) {
			// TODO Auto-generated catch block
				logger.error(""+e.getMessage());
		}



	}
	/**
	 * 
	 * @param entity
	 * @throws Exception
	 */
	public static void deleteAllData(IDatabaseConnection connection, Object entity) throws Exception {
		try {

			ArrayList dependencylist= new ArrayList();
			
			//Getting table name for the entity
			String tableName = entity.getClass().getSimpleName().toLowerCase();
						
			QueryDataSet partialdataset = new QueryDataSet(connection);
			
			partialdataset.addTable(tableName);

			//System.out.println("Table added in dataset " + tableName);

			ITableMetaData metaData = partialdataset
					.getTableMetaData(tableName);

			Object entityId = null;

			Column[] columns = metaData.getColumns();

			List<Object> list = new ArrayList<Object>();
					

			Class<?> entityClass = Class.forName(entity.getClass().getName());

			Method[] methods = entityClass.getMethods();
			
			for (Column column : columns) {

				for (Method method : methods) {
					
					if (method.getName().startsWith("get")) {
						
						if (method.getName().endsWith("Id")) {
							// System.out.println(obj.getClass().toString() +
							// " Id Method " + method.getName());
							Object innerObj = method.invoke(entity, null);
							entityId = innerObj;
						}
						if (column.getColumnName().toLowerCase().startsWith(
								method.getName().replaceFirst("get", "")
										.toLowerCase())) {

							Object obj = method.invoke(entity, null);

							if (SampleUtil.requiredParsing(obj.getClass())) {

								if (!method.getGenericReturnType().getClass()
										.getName().endsWith("Set")
										&& !method.getGenericReturnType()
												.getClass().getName().endsWith(
														"List")) {
									//deleteAllData(obj);
									dependencylist.add(obj);
									
									Class innerEntityClass = Class.forName(obj
											.getClass().getName());
									Method[] innerMethods = innerEntityClass
											.getMethods();
									
									for (Method innerMethod : innerMethods) {

										if (innerMethod.getName().startsWith(
												"get")
												&& innerMethod.getName()
														.endsWith("Id")) {

											Object innerObj = innerMethod
													.invoke(obj, null);

											list.add(innerObj);
										}
									}
								}
							} else {
								list.add(obj);
							}

						}

					}
				}

			}
			
			for (Method method : methods) {
				if (method.getName().startsWith("get")) {
					String genericReturnType = method.getGenericReturnType().toString();

					if (genericReturnType.contains("java.util.Set") || genericReturnType.contains("java.util.List")) {

						Object obj = method.invoke(entity, null);
						
						if(null!=obj)
						{
						Class listClass = Class.forName(obj.getClass()
								.getName());

						
						Method[] innerMethods = listClass.getMethods();

						for (Method innerMethod : innerMethods) {

							if (innerMethod.getName().equals("iterator")) {
								Iterator iter = (Iterator) innerMethod.invoke(
										obj, null);

								while (iter.hasNext()) 
								{
									Object customObject = iter.next();
									
									Class innerEntityClass = Class
											.forName(customObject.getClass()
													.getName());
									Method[] innerEntityMethods = innerEntityClass
											.getMethods();

									for (Method innerEntityMethod : innerEntityMethods) {
										if (innerEntityMethod.getName()
												.startsWith("get")
												&& innerEntityMethod.getName()
														.endsWith("Id")) {

											Object innerObj = innerEntityMethod
													.invoke(customObject, null);

											String relationTableName = entity
													.getClass()
													.getSimpleName()
													.concat("_")
													.concat(
															customObject
																	.getClass()
																	.getSimpleName());

											QueryDataSet relationdataset = new QueryDataSet(
													connection);

											relationdataset
													.addTable(relationTableName);

											ITableMetaData relationMetaData = relationdataset
													.getTableMetaData(relationTableName);

											Column[] relationColumns = relationMetaData
													.getColumns();

											List relationList = new ArrayList();
											// {1, entityId, innerObj};

											for (Column relationColumn : relationColumns) {
												if (relationColumn
														.getColumnName()
														.toLowerCase()
														.contains(
																entity
																		.getClass()
																		.getSimpleName()
																		.toLowerCase())) {
													relationList.add(entityId);
												} else if (relationColumn
														.getColumnName()
														.toLowerCase()
														.contains(
																customObject
																		.getClass()
																		.getSimpleName()
																		.toLowerCase())) {
													relationList.add(innerObj);
												} else {
													relationList.add(1);
												}
											}
											//dependencylist.add(relationTableName);
											execute(connection, relationTableName, relationColumns, relationList, 2);
										}
									}
									dependencylist.add(customObject);
								}
							}
						}

					}
					}
				}
			}
			//dependencylist.add(entity);
			System.out.println("Executing Delete on " + tableName);
			execute(connection, tableName, columns, list, 2);
			
			Iterator dependIter = dependencylist.iterator();
			
			while (dependIter.hasNext())
			{
				Object dependobj = dependIter.next();
				
				deleteAllData(connection, dependobj);
			}
		} catch (DataSetException e) {
			// TODO Auto-generated catch block
			logger.error(""+e.getMessage());
		} catch (DatabaseUnitException e) {
			// TODO Auto-generated catch block
			logger.error(""+e.getMessage());
		}



	}
	/**
	 * 
	 * @param tableName
	 * @param columns
	 * @param list
	 * @param action
	 * @throws DatabaseUnitException
	 * @throws SQLException
	 */
	public static void execute(IDatabaseConnection connection, String tableName, Column[] columns, List list, int action) throws DatabaseUnitException, SQLException
	{
		DefaultTable itable = new DefaultTable(tableName, columns);
		itable.addRow(list.toArray());
		DefaultDataSet idataset = new DefaultDataSet(itable);
		System.out.println("Executing " + action + " on table " + tableName);
		
		if(action==0)
		{		
			DatabaseOperation.CLEAN_INSERT.execute(connection, idataset);
		}else if (action==1)
		{
			DatabaseOperation.UPDATE.execute(connection,idataset);
		}
		else if (action==2)
		{
			DatabaseOperation.TRUNCATE_TABLE.execute(connection,idataset);
		}
		
		
	}
	/**
	 * 
	 * @param driver
	 * @param url
	 * @param schema
	 * @param user
	 * @param password
	 * @return
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	public static Connection getConnection(String driver, String url, String schema, String user, String password) throws ClassNotFoundException, SQLException
	{
		Class.forName(driver);
		
		Connection dbConnection = DriverManager.getConnection(
				url, user, password);
		return dbConnection;
		
	}
	
	/**
	 * 
	 * @param connection
	 * @return
	 * @throws DatabaseUnitException
	 */
	public static IDatabaseConnection getIDatabaseConnection(Connection connection) throws DatabaseUnitException
	{
		return new DatabaseConnection(connection);
	}


}
