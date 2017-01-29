 package com.inn.headstartdemo.exceptions;


public class ValueNotFoundException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public ValueNotFoundException(Exception e)
	{
		super(e.getMessage(),e);
	}
	
/**
 * 
 * @param string
 */
	public ValueNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public ValueNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
