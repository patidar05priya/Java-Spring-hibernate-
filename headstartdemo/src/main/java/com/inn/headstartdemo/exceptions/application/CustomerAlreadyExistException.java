 package com.inn.headstartdemo.exceptions.application;


public class CustomerAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public CustomerAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public CustomerAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public CustomerAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
