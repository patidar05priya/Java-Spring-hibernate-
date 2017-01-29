package com.inn.headstartdemo.security.web.authentication;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.owasp.esapi.ESAPI;
import org.owasp.esapi.ValidationErrorList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.TextEscapeUtils;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.authentication.DomainAuthenticationToken;
import com.inn.headstartdemo.service.IUsersService;
import com.inn.headstartdemo.security.spring.context.ContextProvider;


public class UsernameAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	public UsernameAuthenticationFilter() {
		super();
	}
	
		
	
	private PasswordEncoder passwordEncoder;
	@Autowired
	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
	        this.passwordEncoder = passwordEncoder;
	}
	public static final String SPRING_SECURITY_FORM_DOMAIN_KEY = "j_domain";

	private String domainParameter = SPRING_SECURITY_FORM_DOMAIN_KEY;
	
	private String alwaysUseDefaultTargetUrl;

	private String authenticationFailureUrl;
	
	private String defaultTargetUrl;
	
	private String loginPage;

	public String getAlwaysUseDefaultTargetUrl() {
		return alwaysUseDefaultTargetUrl;
	}

	public void setAlwaysUseDefaultTargetUrl(String alwaysUseDefaultTargetUrl) {
		this.alwaysUseDefaultTargetUrl = alwaysUseDefaultTargetUrl;
	}

	public String getAuthenticationFailureUrl() {
		return authenticationFailureUrl;
	}

	public void setAuthenticationFailureUrl(String authenticationFailureUrl) {
		this.authenticationFailureUrl = authenticationFailureUrl;
	}

	public String getDefaultTargetUrl() {
		return defaultTargetUrl;
	}

	public void setDefaultTargetUrl(String defaultTargetUrl) {
		this.defaultTargetUrl = defaultTargetUrl;
	}

	public String getLoginPage() {
		return loginPage;
	}

	public void setLoginPage(String loginPage) {
		this.loginPage = loginPage;
	}
	
	  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
	        if (!request.getMethod().equals("POST")) {
	            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
	        }
	        String username = obtainUsername(request);
	        String password =  obtainPassword(request);
			ValidationErrorList errorList = new ValidationErrorList();
		    if (username == null) {
	            username = "";
	        }

	        if (password == null) {
	            password = "";
	        }
	        password=passwordEncoder.encodePassword(password,null);
	        
	        	if(username.equals(""))
	        	{
	        	 username=ESAPI.validator().getValidInput("UserName",username, "FirstNameRegex", 255, false, errorList);
				
				}
	        username = username.trim();
			
						DomainAuthenticationToken authRequest = new DomainAuthenticationToken(username,password);
	      		        // Place the last username attempted into HttpSession for views
	        HttpSession session = request.getSession(false);

	        if (session != null || getAllowSessionCreation()) {
	            request.getSession().setAttribute(SPRING_SECURITY_LAST_USERNAME_KEY, TextEscapeUtils.escapeEntities(username));
	        }

	        // Allow subclasses to set the "details" property
	        setDetails(request, authRequest);

	        Authentication authentication = this.getAuthenticationManager().authenticate(authRequest);
	     
	        if(!(authentication instanceof  DomainAuthenticationToken ))
	        {	throw new RuntimeException("Undesirable toke type");
	        }
	         else
	        {
	        	 DomainAuthenticationToken tokenAuth = (DomainAuthenticationToken)authentication;
	        	 IUsersService userDao =(IUsersService)ContextProvider.getContext().getBean(IUsersService.class);
	    			Users user=userDao.findByUserName(username);
	    			tokenAuth.setUserid(user.getUserid());
	        }
	        return authentication;
	    }



}
