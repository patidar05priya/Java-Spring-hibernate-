package com.inn.headstartdemo.rest.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;
import java.lang.reflect.InvocationTargetException;
import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.audit.AuditActionType;
import com.inn.headstartdemo.audit.Auditable;
import com.inn.headstartdemo.exceptions.ExceptionHandler;
import com.inn.headstartdemo.exceptions.application.BusinessException;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.spring.CustomerInfo;
import com.inn.headstartdemo.service.IUsersService;
import com.inn.headstartdemo.service.mail.IMailSender;
import com.inn.headstartdemo.utils.ConfigUtil;
@Produces("application/json")
@Consumes("application/json")
@Service("BPMEmailRestImpl")
public class BPMEmailRestImpl {
	private static Logger logger=LoggerFactory.getLogger(BPMEmailRestImpl.class);
	
	@Autowired
    private VelocityEngine velocityEngine;
	
	@Autowired
    private IMailSender mailsender;
	@Autowired
	private IUsersService service;
	public void execute(Object retVal)
    throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, BusinessException
  {
  Map model = new HashMap();
  Users creator=null;
		Method[] method=retVal.getClass().getMethods();
		HashMap<String,Object> mapObject= new HashMap<String, Object>();
		int i=0;
		for (Method methods:method)
	    {	if(methods.getName().contains("get")&&methods.getName().contains("Creator"))
			{
				creator=(Users) methods.invoke(retVal);
				}
			if(methods.getName().contains("get")&&!methods.getName().contains("Create")&&!methods.getName().contains("modif"))
			{if(i<3)
			{
				mapObject.put(methods.getName().substring(3,methods.getName().length()), methods.invoke(retVal));
			i++;
			}	
				}
			
	    }if(creator!=null)
	    {
	    	 model.put("mapObject",mapObject);
	    	 
			  model.put("retValClass",retVal.getClass().getSimpleName());
			  model.put("retVal",retVal);
			  creator=service.findById(creator.getUserid());
			  model.put("creator",creator);
			  			  String path=ConfigUtil.BPMN_TEMPLATE;
			  String text;
			  try {
				    text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, path,"UTF-8", model);
						mailsender.sendMail("Action performed on "+retVal.getClass().getSimpleName(), text, creator.getEmail(), "");

				} catch (AddressException e) {
					
					
				} catch (MessagingException e) {
					
					
				} catch (VelocityException e) {
				    // TODO Auto-generated catch block
				 
				}  	

			    }
  }
	public void execute()
    
  {
	try {
			mailsender.sendMail("Send Email", "entity has been created", "nehabhutani18@gmail.com", "");
		} catch (AddressException e) {
			logger.error("AddressException "+e.getCause());
		  	
		
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			logger.error("MessagingException "+e.getCause());
		}
  }

}
