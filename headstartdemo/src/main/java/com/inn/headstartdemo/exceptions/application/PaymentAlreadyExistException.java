 package com.inn.headstartdemo.exceptions.application;


public class PaymentAlreadyExistException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public PaymentAlreadyExistException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public PaymentAlreadyExistException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public PaymentAlreadyExistException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
