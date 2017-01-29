 package com.inn.headstartdemo.exceptions.application;


public class OrdersNotFoundException extends BusinessException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3892116817542890495L;

/**
 * 
 * @param e Exception
 */
	public OrdersNotFoundException(Exception e)
	{
		super(e);
	}
	
/**
 * 
 * @param string
 */
	public OrdersNotFoundException(String string)
	{
		super(string);
		
	}
/**
 * 
 * @param string
 * @param guimasaage
 */
	public OrdersNotFoundException(String string,String guimasaage)
    {
        super(guimasaage);
    
    }
}
