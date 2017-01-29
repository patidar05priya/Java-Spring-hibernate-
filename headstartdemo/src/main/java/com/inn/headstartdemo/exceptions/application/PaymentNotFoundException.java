 package com.inn.headstartdemo.exceptions.application;


public class PaymentNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public PaymentNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public PaymentNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public PaymentNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
