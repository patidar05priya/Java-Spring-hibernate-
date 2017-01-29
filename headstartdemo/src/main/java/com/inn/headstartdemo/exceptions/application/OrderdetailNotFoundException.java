 package com.inn.headstartdemo.exceptions.application;


public class OrderdetailNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OrderdetailNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OrderdetailNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OrderdetailNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
