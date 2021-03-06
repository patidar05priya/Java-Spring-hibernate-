package com.inn.headstartdemo.rest.generic;

import java.lang.reflect.Field;
import java.util.List;

import org.apache.cxf.jaxrs.ext.search.ConditionType;
import org.apache.cxf.jaxrs.ext.search.PrimitiveStatement;
import org.apache.cxf.jaxrs.ext.search.SearchCondition;
import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.inn.headstartdemo.service.generic.IGenericService;
import com.inn.headstartdemo.utils.AdvanceSearchResult;
import com.inn.headstartdemo.utils.QueryObject;
import com.inn.headstartdemo.utils.QueryObject.SearchMode;
import com.inn.headstartdemo.utils.SearchFilterWrapper;
/**
 * Abstract CXF based REST service class. This class in addition to other services supports
 * FIQL based advance search queries.
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 * @param <Pk> represents the primary key type.
 * @param <Entity> represents the entity type.
 */
public abstract class AbstractCXFRestService<Pk, Entity> implements IGenericRest<Pk, Entity>{
	/**
	 * represents entity type.
	 */
	private Class<Entity> type;
	/**
	 * @param type 
	 */
	public AbstractCXFRestService(Class<Entity> type){
		setType(type);
	}
	/**
	 * extending class must return the respective service instance.
	 * @param service
	 */
	public abstract IGenericService<Pk, Entity> getService();
	/**
	 * Extending class must implement this method which autowires the search context.
	 * @param searchContext
	 */
	public abstract SearchContext getSearchContext();
	/**
	 * Transforms the search context to {@link QueryObject}.
	 * @param context
	 * @return
	 */
	protected QueryObject transform(SearchContext context) {
		logger.debug("Transforming the search context {} to QueryObject", context);
		QueryObject result = new QueryObject();
		SearchCondition<Entity> condition = context.getCondition(getType());
		if(condition != null){
			updateQuery(result, condition);
			List<SearchCondition<Entity>> conditions = condition.getSearchConditions();
			if(conditions != null){
				for(SearchCondition<Entity> searchCondition : conditions){
					updateQuery(result, searchCondition);
				}
			}
		}
		logger.debug("Transformed context into queryObject {}", result);
		return result;
	}
	/**
	 * helper method to update query object based on the condition.
	 * @param result represents the query object which shall be updated.
	 * @param condition 
	 */
	private void updateQuery(QueryObject result, SearchCondition<Entity> condition) {
		PrimitiveStatement statement = condition.getStatement();
		if(statement != null){
			String property = statement.getProperty();
			Object value = statement.getValue();
			
			ConditionType conditionType = statement.getCondition();
			SearchMode mode = SearchMode.getSearchMode(conditionType);
			if(conditionType.equals(ConditionType.EQUALS)){
				if((value instanceof String) && (value != null) && (value.toString().contains("*"))){
					mode = SearchMode.LIKE;
					value = value.toString().replace("*", "%");
				}
			}
			if((property != null) && (value != null) && (mode != null)){
				
				String actualFieldName = getActualFieldName(property, getType());
				SearchFilterWrapper wrapper = new SearchFilterWrapper(actualFieldName,mode,value);
				result.addValueForFilterWrapper(wrapper);
				result.setValueForFieldName(actualFieldName, value);
				result.setModeForFieldName(actualFieldName, mode);	
			}
		}
	}
	/**
	 * helper method to return the actual name of field.
	 * GUI sends filed name in lowercase & Entity containes name in camel case.
	 * So we have to map it with actual name.
	 * @param result represents the actual name of field.
	 * @param field Name and Entity Name
	 */
	private String getActualFieldName(String fieldName, Class entityClass){
		String result = null;
		Field[] fields = entityClass.getDeclaredFields();
		for(Field field : fields){
			if(field.getName().equalsIgnoreCase(fieldName)){
				return field.getName();
			}
		}
		return result;
	}
	@Override
	public AdvanceSearchResult<Entity> advanceSearch(QueryObject queryObject) {
		return getService().advanceSearch(queryObject);
	}
	/**
	 * @return represents the entity type.
	 */
	public Class<Entity> getType() {
		return type;
	}
	/**
	 * sets the entity type.
	 * @param type
	 */
	public void setType(Class<Entity> type) {
		this.type = type;
	}
	/**
	 * represents the logger instance. 
	 */
	private Logger logger = LoggerFactory.getLogger(AbstractCXFRestService.class);
}
