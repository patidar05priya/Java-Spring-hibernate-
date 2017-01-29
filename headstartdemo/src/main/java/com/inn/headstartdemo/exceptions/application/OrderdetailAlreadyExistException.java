 package com.inn.headstartdemo.exceptions.application;


public class OrderdetailAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OrderdetailAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OrderdetailAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OrderdetailAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
