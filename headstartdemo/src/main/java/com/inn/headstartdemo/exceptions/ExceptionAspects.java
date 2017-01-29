 package com.inn.headstartdemo.exceptions;
 
 
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;

import com.inn.exha.HandlerUtil;

@Aspect
public class ExceptionAspects {

	@Around("@annotation(b)")
	public Object doAudit(ProceedingJoinPoint pjp, ExceptionHandler b)
			throws Throwable {
		return doAudit(pjp);
	}

	private Object doAudit(ProceedingJoinPoint pjp) throws Throwable
	{
		Object returnObject=null;	

		try
		{
			returnObject = pjp.proceed();
		}
		catch (Throwable localthrowable)
		{	
			String []key=pjp.getSignature().toLongString().split(" ");			
			
			

			
			MethodSignature md= (MethodSignature) pjp.getSignature();
			String[] parameterNames=md.getParameterNames();
			
			HandlerUtil.handle(localthrowable,key[2],parameterNames[0]);			
		}
		
		return returnObject;
				
	
	
	}

}
