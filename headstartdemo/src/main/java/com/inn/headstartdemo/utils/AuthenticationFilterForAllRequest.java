package com.inn.headstartdemo.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebFilter(filterName = "AuthenticationFilterForAllRequest",
urlPatterns = {"/*"})
public class AuthenticationFilterForAllRequest implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {

			HttpServletRequest httpRequest=	(HttpServletRequest) arg0;
			httpRequest.setAttribute("Set-Cookie","Secure;");
			HttpServletResponse httpResponse=	(HttpServletResponse) arg1;
		if (checkMobileAuthTocken(httpRequest, httpResponse)) {

		} else {
			checkCsrfToken(httpRequest, httpResponse);
			checkReferer(httpRequest, httpResponse);
			
		}
			arg2.doFilter(arg0, arg1);	
		
		
	}


	private boolean checkMobileAuthTocken(HttpServletRequest httpRequest,
			HttpServletResponse httpResponse) throws ServletException {
		if (!httpRequest.getRequestURI().contains("/rest/unauthorize")) {
			String mobileAuthTocken = httpRequest.getHeader("AUTH-TOKEN");
			if (StringUtils.hasValue(mobileAuthTocken)) {
				TokenInfo tf = MobileAuthHelper.verifyToken(mobileAuthTocken);
				if (StringUtils.hasValue(tf.getUserId())) {
					System.out.println("=============="+tf.getUserId());
					return true;
				} else {
					return false;
				}
			}
			return false;
		}
		return true;
	}
	
	private void checkCsrfToken(HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws ServletException
	{

	
	if(httpRequest.getRequestURI().contains("/rest/") && !httpRequest.getRequestURI().contains("/rest/unauthorize")&& !httpRequest.getRequestURI().contains("registeredgoogleuser")&& !httpRequest.getRequestURI().contains("registerFacebookUser") && !httpRequest.getRequestURI().contains("rest/Users/getUserImage") && !httpRequest.getRequestURI().contains("rest/Users/getUserImageById")&& !httpRequest.getRequestURI().contains("rest/Users/isUserAvailable") && !httpRequest.getRequestURI().contains("rest/Users/setUserImage")  && !httpRequest.getRequestURI().contains("rest/ElasticSearch/searchAllIndex"))
	{
		
				
					
				String csrfHeaderValue=	httpRequest.getHeader(ConfigUtil.getConfigProp(ConfigUtil.SECURITY_COOKIE_CSRF_NAME));
				Cookie[] cookies=httpRequest.getCookies();
				
				for (Cookie cookie : cookies) {
					
				
					if(cookie.getName().equals(ConfigUtil.SECURITY_COOKIE_CSRF_TOKEN))
						{	
						
							if(httpRequest.getParameter(ConfigUtil.getConfigProp(ConfigUtil.SECURITY_COOKIE_CSRF_NAME))!=null)
							{
								if(!httpRequest.getParameter(ConfigUtil.getConfigProp(ConfigUtil.SECURITY_COOKIE_CSRF_NAME)).equals(cookie.getValue()))
								{
									throw new ServletException("unauthorized access");
								}
							}
							else
							{
								if(!cookie.getValue().equals(csrfHeaderValue))
								{
									throw new ServletException("unauthorized access");
								}
								
							}
							
						}
				}
		}
	}
	private void checkReferer(HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws ServletException
	{
		
		if(httpRequest.getRequestURI().contains("/rest/") && !httpRequest.getRequestURI().contains("/rest/unauthorize")&& !httpRequest.getRequestURI().contains("registeredgoogleuser")&& !httpRequest.getRequestURI().contains("registerFacebookUser") && !httpRequest.getRequestURI().contains("rest/Users/getUserImage") && !httpRequest.getRequestURI().contains("rest/Users/getUserImageById") && !httpRequest.getRequestURI().contains("rest/Users/isUserAvailable")&& !httpRequest.getRequestURI().contains("rest/Users/setUserImage"))
		{
		if(!httpRequest.getHeader("Referer").contains(ConfigUtil.getConfigProp(ConfigUtil.APP_DEPLOY_URL)))
		{
			throw new ServletException("unauthorized access");
		}
		}
		
	}


	@Override
	public void init(FilterConfig arg0) throws ServletException {
	
		
	}
	
}
