 package com.inn.headstartdemo.exceptions.application;


public class OfficeNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OfficeNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OfficeNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OfficeNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
