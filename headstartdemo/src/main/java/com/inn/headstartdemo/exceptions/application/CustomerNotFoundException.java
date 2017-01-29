 package com.inn.headstartdemo.exceptions.application;


public class CustomerNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public CustomerNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public CustomerNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public CustomerNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
