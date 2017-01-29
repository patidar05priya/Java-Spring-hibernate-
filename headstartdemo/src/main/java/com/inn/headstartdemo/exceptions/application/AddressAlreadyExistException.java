 package com.inn.headstartdemo.exceptions.application;


public class AddressAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public AddressAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public AddressAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public AddressAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
