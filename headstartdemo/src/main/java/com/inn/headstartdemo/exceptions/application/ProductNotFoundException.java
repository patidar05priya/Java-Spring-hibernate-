 package com.inn.headstartdemo.exceptions.application;


public class ProductNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public ProductNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public ProductNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public ProductNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
