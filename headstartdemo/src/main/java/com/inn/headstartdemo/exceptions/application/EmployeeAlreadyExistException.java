 package com.inn.headstartdemo.exceptions.application;


public class EmployeeAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public EmployeeAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public EmployeeAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public EmployeeAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
