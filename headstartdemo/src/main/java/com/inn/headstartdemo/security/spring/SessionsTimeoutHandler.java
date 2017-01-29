package com.inn.headstartdemo.security.spring;

import java.util.Date;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;




import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


import com.inn.headstartdemo.exceptions.ValueNotFoundException;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.model.Audit;
import com.inn.headstartdemo.service.IAuditService;
import com.inn.headstartdemo.audit.AuditActionName;
import com.inn.headstartdemo.audit.AuditActionType;
import com.inn.headstartdemo.exceptions.application.BusinessException;
import com.inn.headstartdemo.security.spring.context.ContextProvider;
import com.inn.headstartdemo.service.IUsersService;
public class SessionsTimeoutHandler extends HttpSessionEventPublisher {
	private Logger logger=LoggerFactory.getLogger(SessionsTimeoutHandler.class);




@Override
public void sessionDestroyed(HttpSessionEvent event) {
	logger.debug("SESSION EXPIRED EVENT RECEIVED");
	

	String userName =CustomerInfo.getCustomerUsername();
	if(userName!=null){
	logger.debug(" User "+userName+" has logged out @ "+new Date());
		try {
			Users user = getUserService().findByUsername(userName);
							auditLogout(user);
						} catch (ValueNotFoundException ex) {
			logger.error("Exception class{} and message{}",ex.getClass(),ex.getMessage());
		}
	
	
    logger.debug(" -----[SESSION EXPIRED HANDELED]-----");
	}
    super.sessionDestroyed(event);
}
private void auditLogout(Users user) {
	Audit audit = buildLogoutAudit(user);
	try {
		getAuditService().create(audit);
	} catch (BusinessException e) {
	logger.error("An exception has been caught"+e.toString());
	}
}
private Audit buildLogoutAudit(Users user){
	Audit audit =  new Audit();
	audit.setUser(user);
	audit.setUserFullName(user != null ? user.getUsername() : null);
	audit.setDate(new Date());
	audit.setSuccess(Boolean.TRUE);
	audit.setAction("logout");
	audit.setAuditActionType(AuditActionType.LOGOUT);
	audit.setParameters("Logged Out");
	
	audit.setPage(null);
		audit.setAuditActionName(AuditActionName.LOGOUT)	;
	if(getRequest()!=null){
		audit.setUserAgent(getRequest().getHeader("user-agent"));
		audit.setRemoteHost(getRequest().getRemoteHost());
		audit.setSessionid(getRequest().getRequestedSessionId());
		audit.setHost(getRequest().getLocalAddr()+":"+getRequest().getLocalPort());
		getRequest().getHeader("user-agent");
	}
	return audit;
}
private HttpServletRequest getRequest(){
	ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
	if(attr!=null){
	HttpServletRequest serv = attr.getRequest();
	return serv ;
	}
	return null;
}

private IUsersService getUserService(){
	return ContextProvider.getContext().getBean(IUsersService.class);
}
private IAuditService getAuditService(){
	return ContextProvider.getContext().getBean(IAuditService.class);
}
}