package com.inn.headstartdemo.rest.generic;

import java.util.List;

import com.inn.headstartdemo.utils.AdvanceSearchResult;
import com.inn.headstartdemo.utils.QueryObject;
import  com.inn.headstartdemo.exceptions.application.BusinessException;

/**
 * Generic rest interface.
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 * @param <Pk> represents the primary key of the entity.
 * @param <Entity> represents the entity type.
 */
public interface IGenericRest<Pk, Entity> {
	/**
	 * @return returns the filtered entities after performing advance search.
	 * 
	 * @param queryObject represents the query.
	 */
	AdvanceSearchResult<Entity> advanceSearch(QueryObject queryObject);
	/**
	 * API which performs a search based on the values in the entity. All the
	 *@path  values provided in the entity are compared using equal operator. 
	 * @path This doesn't support regular expression based search.
	 * 
	 * @param entity represents the entity instance.
	 * 
	 * @return returns the list of entities filtered after performing search.
	 */
	List<Entity> search(Entity entity)throws BusinessException;
	/**
	 * searches the entity based on the primary key.
	 * 
	 * @param primaryKey represents the primary key of the entity.
	 * 
	 * @return returns the entity found in the persistence store.
	 */
	Entity findById(Pk primaryKey)throws BusinessException;
	/**
	 * @return returns all the entities stored in the persistence store.
	 */
	List<Entity> findAll()throws BusinessException;
	/**
	 * creates the provided entity.
	 * 
	 * @param anEntity entity to create.
	 */
	Entity create(Entity anEntity)throws BusinessException;
	/**
	 * updates the provided entity.
	 * 
	 * @param anEntity entity to update.
	 */
	Entity update(Entity anEntity)throws BusinessException;
	/**
	 * removes the entity, note: primary key must be set within the
	 * entity.
	 * 
	 * @param anEntity
	 */
	boolean remove(Entity anEntity)throws BusinessException;
	/**
	 * removes the entity identified by the provided primary key.
	 * @param primaryKey
	 */
	void removeById(Pk primaryKey)throws BusinessException;
}
