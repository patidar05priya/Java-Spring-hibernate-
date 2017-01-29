package com.inn.headstartdemo.dao.criteria.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.inn.headstartdemo.dao.annotation.CriteriaBuilder;
import com.inn.headstartdemo.dao.criteria.IQueryCriteriaBuilder;
import com.inn.headstartdemo.exceptions.SystemConfigurationException;
import com.inn.headstartdemo.utils.QueryObject;
import com.inn.headstartdemo.utils.QueryObject.MinMax;
import com.inn.headstartdemo.utils.QueryObject.SearchMode;
import com.inn.headstartdemo.utils.QueryObject.SortOrder;
import com.inn.headstartdemo.utils.SearchFilterWrapper;

/**
 * Builds the Hibernate criteria for the the provided {@link QueryObject}.
 * 
 * @author Team
 * @version 2.0
 *
 */
@CriteriaBuilder
public class HibernateCriteriaBuilder<Entity> implements IQueryCriteriaBuilder<Entity> {
	/**
	 * represents the logger instance. 
	 */
	private Logger logger = LoggerFactory.getLogger(HibernateCriteriaBuilder.class);
	/**
	 * represents the JPA entity manager.
	 */
	@PersistenceContext(name = "DEFAULT" )
	private EntityManager entityManager;
	/**
	 * converts the query object into Hibernate criteria. 
	 * @param queryObject represents the search parameters.
	 * @param entityClass represents the underlying base entity.
	 */
	public Criteria buildCriteria(QueryObject queryObject, Class<Entity> entityClass) {
		logger.debug("creating criteria for queryObject {} and entity class {}", queryObject, entityClass);
		Session session = (Session) getEntityManager().getDelegate();
		if(session == null){
			logger.error("Unable to get the session from entity manager.");
			throw new SystemConfigurationException("Unable to create session from entity manager.");
		}
		Criteria criteria = session.createCriteria(entityClass);
		applyFilters(criteria, queryObject);
		applyOrdering(criteria, queryObject);
		applyPagination(criteria, queryObject);
		return criteria;
	}
	/**
	 * applies all the filtering restrictions on the criteria object passed.
	 * @param criteria represents the Hibernate query criteria
	 * @param queryObject represents the encapsulated version of advance search.
	 */
	private void applyFilters(Criteria criteria, QueryObject queryObject) {
		Map<String, SearchMode> searchModes = queryObject.getFieldNameModeMapping();
		Map<String, Object> fieldValues = queryObject.getFieldNameValueMapping();
		List<SearchFilterWrapper> wrapperObj = queryObject.getSearchFilterWrapperList();
		logger.debug("Applying filters using search modes {} & fieldValues {}", searchModes, fieldValues);
		
		if(fieldValues.size() <= 0)
		{	return;}

		Iterator<SearchFilterWrapper> iterator = wrapperObj.iterator();
		while(iterator.hasNext()){
			SearchFilterWrapper filterObj = iterator.next();
			String fieldKey = filterObj.getFieldName();
			SearchMode mode = filterObj.getMode();
			Object value = filterObj.getValue();
		
			
			switch (mode) {
			case EQUAL:
				criteria.add(Restrictions.eq(fieldKey, value));
				break;
			case NOT_EQUAL:
				criteria.add(Restrictions.ne(fieldKey, value));
				break;
			case LIKE:
				criteria.add(Restrictions.like(fieldKey, value));
				break;
			case IS_NULL:
				criteria.add(Restrictions.isNull(fieldKey));
				break;
			case IN:
				criteria.add(Restrictions.in(fieldKey, (List)value));
				break;
			case BETWEEN:
				criteria.add(Restrictions.between(fieldKey, ((MinMax)value).getMin(),((MinMax)value).getMax()));
				break;
			case GREATER_THAN:
				criteria.add(Restrictions.gt(fieldKey, value));
				break;
			case LESS_THAN:
				criteria.add(Restrictions.lt(fieldKey, value));
				break;
			case GREATER_OR_EQUAL:
				criteria.add(Restrictions.ge(fieldKey, value));
				break;
			case LESS_OR_EQUAL:
				criteria.add(Restrictions.le(fieldKey, value));
				break;
			default:
				logger.warn("Unable to restriction in filter for mode[{}], since this is not a supported.", mode);
				break;
			}
		}

	}
	/**
	 * apply order by clause to the provided criteria.
	 * @param criteria represents the Hibernate query criteria
	 * @param queryObject represents the encapsulated version of advance search.
	 */
	private void applyOrdering(Criteria criteria, QueryObject queryObject) {
		Map<String, SortOrder> orderByMode = queryObject.getOrderByMode();
		
		logger.debug("applying ordering criteria using orderByMode {}", orderByMode);
		
		if(orderByMode == null || orderByMode.size() <= 0){
			return;
		}
		else{
			for(Entry<String, SortOrder> entry : orderByMode.entrySet()){
				String key = entry.getKey();
				SortOrder order = entry.getValue();
				if(SortOrder.ASC.equals(order)){
					criteria.addOrder(Order.asc(key));
				}
				else{
					criteria.addOrder(Order.desc(key));
				}
			}
		}
	}
	/**
	 * apply paging conditions to the provided criteria object.
	 * @param criteria represents the Hibernate query criteria
	 * @param queryObject represents the encapsulated version of advance search.
	 */
	private void applyPagination(Criteria criteria, QueryObject queryObject) {
		int maxLimit = queryObject.getPaginationUpperLimit();
		int minLimit = queryObject.getPaginationLowerLimit();

		logger.debug("applying pagination criteria upperlimit {} & lowerlimit {}", maxLimit, minLimit);
		
		if(maxLimit >= 0){
		   criteria.setMaxResults(maxLimit-minLimit+1);
		}

		if(minLimit >= 0){
			criteria.setFirstResult(minLimit);
		}
	}
	/**
	 * @return returns the entity manager.
	 */
	public EntityManager getEntityManager() {
		return entityManager;
	}
	/**
	 * sets the entity manager.
	 * @param entityManager
	 */
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

}
