package com.inn.headstartdemo.security.authentication.dao;

import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import com.inn.headstartdemo.security.authentication.DomainAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import com.inn.headstartdemo.security.core.userdetails.DomainUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.inn.headstartdemo.security.provisioning.DomainUserDetailsManager;
import org.springframework.util.Assert;


public class DomainAuthenticationProvider extends DaoAuthenticationProvider {
	@Override
    public Authentication authenticate(Authentication originalAuthentication) throws AuthenticationException {
        Assert.isInstanceOf(DomainAuthenticationToken.class, originalAuthentication,
                messages.getMessage("AbstractUserDetailsAuthenticationProvider.onlySupports",
                    "Only DomainAuthenticationToken is supported"));
        
		DomainAuthenticationToken authentication = (DomainAuthenticationToken)originalAuthentication;

       
        String username = (authentication.getPrincipal() == null) ? "NONE_PROVIDED" : authentication.getName();

        boolean cacheWasUsed = true;
        
        DomainUser domainUser = null;


            cacheWasUsed = false;

            try {
                domainUser = retrieveDomainUser(username, authentication);
            } catch (UsernameNotFoundException notFound) {
                if (hideUserNotFoundExceptions) {
                    throw new BadCredentialsException(messages.getMessage(
                            "AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
                } else {
                    throw notFound;
                }
            }

            Assert.notNull(domainUser, "retrieveUser returned null - a violation of the interface contract");


        try {
        	this.getPreAuthenticationChecks().check(domainUser);
            additionalAuthenticationChecks(domainUser,  (UsernamePasswordAuthenticationToken) authentication);
        } catch (AuthenticationException exception) {
            if (cacheWasUsed) {
                 cacheWasUsed = false;
                domainUser = retrieveDomainUser(username, authentication);
                this.getPreAuthenticationChecks().check(domainUser);
                additionalAuthenticationChecks(domainUser,(UsernamePasswordAuthenticationToken) authentication);
            } else {
                throw exception;
            }
        }
        this.getPostAuthenticationChecks().check(domainUser);

        if (!cacheWasUsed) {
        	this.getUserCache().putUserInCache(domainUser);
        }

        Object principalToReturn = domainUser;

        if (this.isForcePrincipalAsString()) {
            principalToReturn = domainUser.getUsername();
        }

        return createSuccessAuthentication2(principalToReturn, authentication, domainUser);
    }

    protected Authentication createSuccessAuthentication2(Object principal, Authentication authentication,
            DomainUser user) {
            // Ensure we return the original credentials the user supplied,
            // so subsequent attempts are successful even with encoded passwords.
            // Also ensure we return the original getDetails(), so that future
            // authentication events after cache expiry contain the details
    		DomainAuthenticationToken result = 
    				new DomainAuthenticationToken(principal,
    	                    authentication.getCredentials(), user.getAuthorities());
            result.setDetails(authentication.getDetails());
          	             return result;
        }
	
    protected final DomainUser retrieveDomainUser(String username, DomainAuthenticationToken authentication)
            throws AuthenticationException {
    	Assert.isInstanceOf(DomainUserDetailsManager.class, this.getUserDetailsService());
    	
        DomainUser loadedDomainUser = null;

        try {
        	if(this.getUserDetailsService() instanceof DomainUserDetailsManager){
        		DomainUserDetailsManager domainUserDetailsManager = (DomainUserDetailsManager)this.getUserDetailsService();        		
        		loadedDomainUser = domainUserDetailsManager.loadDomainUserByUserNameDomain(username,authentication.getDomainName());
        	}
            
        }
        catch (DataAccessException repositoryProblem) {
            throw new AuthenticationServiceException(repositoryProblem.getMessage(), repositoryProblem);
        }

        if (loadedDomainUser == null) {
            throw new AuthenticationServiceException(
                    "UserDetailsService returned null, which is an interface contract violation");
        }
        return loadedDomainUser;
    }
}
