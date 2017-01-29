 package com.inn.headstartdemo.exceptions.application;


public class OrdersAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OrdersAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OrdersAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OrdersAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
