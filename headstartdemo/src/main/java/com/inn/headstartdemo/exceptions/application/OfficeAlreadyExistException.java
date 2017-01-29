 package com.inn.headstartdemo.exceptions.application;


public class OfficeAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OfficeAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OfficeAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OfficeAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
