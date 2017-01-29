 package com.inn.headstartdemo.exceptions.application;


public class ValidationFailedException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public ValidationFailedException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public ValidationFailedException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public ValidationFailedException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
