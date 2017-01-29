 package com.inn.headstartdemo.exceptions.application;


public class ProductAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public ProductAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public ProductAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public ProductAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
