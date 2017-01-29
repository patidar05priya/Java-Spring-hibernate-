 package com.inn.headstartdemo.exceptions.application;


public class EmployeeNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public EmployeeNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public EmployeeNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public EmployeeNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
