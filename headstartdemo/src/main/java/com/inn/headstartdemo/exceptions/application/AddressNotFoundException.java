 package com.inn.headstartdemo.exceptions.application;


public class AddressNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public AddressNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public AddressNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public AddressNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
