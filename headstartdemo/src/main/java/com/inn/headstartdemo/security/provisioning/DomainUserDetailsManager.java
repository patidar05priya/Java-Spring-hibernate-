package com.inn.headstartdemo.security.provisioning;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import com.inn.headstartdemo.security.authentication.DomainAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import com.inn.headstartdemo.security.core.userdetails.DomainUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.util.Assert;
import org.springframework.security.core.userdetails.User;
/**
 * 
 * @author Auto Generated By HeadStart
 * @version 1.0
 *
 * The purpose of this class is to extend the functionality
 * provided by the JdbcDaoImpl class. The extra features the class
 * provides is availability of the domain name selection for a 
 * particular user.
 */
public class DomainUserDetailsManager extends JdbcUserDetailsManager {
	/**
	 * Set the default value for
	 */
	 	public static final String USER_BY_USERNAME_DOMAIN = "select users.username,users.password,users.enabled from users where users.username = ? ";
	
	public static final String AUTHORITIES_BY_USERNAME_DOMAIN = "select u.username as username,p.permissionname as authorityname from users u,roles r,permissions p,userrole ur, rolepermission rp,domain d where u.username = ?  and ur.roleid = r.roleid and ur.userid = u.userid and r.roleid = rp.roleid and rp.permissionid = p.permissionid";
		
	private String authoritiesByUserNameDomainQuery = AUTHORITIES_BY_USERNAME_DOMAIN;
	
	public String getAuthoritiesByUserNameDomainQuery() {
		return authoritiesByUserNameDomainQuery;
	}

	public void setAuthoritiesByUserNameDomainQuery(
			String authoritiesByUserNameDomainQuery) {
		this.authoritiesByUserNameDomainQuery = authoritiesByUserNameDomainQuery;
	}

	private String userByUserNameDomainQuery = USER_BY_USERNAME_DOMAIN;
	
	public String getUserByUserNameDomainQuery() {
		return userByUserNameDomainQuery;
	}

	public void setUserByUserNameDomainQuery(String userByUserNameDomainQuery) {
		this.userByUserNameDomainQuery = userByUserNameDomainQuery;
	}
	
    public DomainUser loadDomainUserByUserNameDomain(String username,String domainname) throws UsernameNotFoundException, DataAccessException {
        List<DomainUser> users = loadDomainUsersByUserNameDomain(username,  null );

        if (users.size() == 0) {
            throw new UsernameNotFoundException(
                    messages.getMessage("JdbcDaoImpl.notFound", new Object[]{username}, "Username {0} not found"), username);
        }

        DomainUser domainUser = users.get(0); // contains no GrantedAuthority[]

        Set<GrantedAuthority> dbAuthsSet = new HashSet<GrantedAuthority>();

        if (this.getEnableAuthorities()) {
            dbAuthsSet.addAll(loadDomainUserAuthorities(username,   null ));
        }

        if (this.getEnableGroups()) {
            dbAuthsSet.addAll(loadGroupAuthorities(domainUser.getUsername()));
        }

        List<GrantedAuthority> dbAuths = new ArrayList<GrantedAuthority>(dbAuthsSet);

        addCustomAuthorities(domainUser.getUsername(), dbAuths);

        if (dbAuths.size() == 0) {
            throw new UsernameNotFoundException(
                    messages.getMessage("JdbcDaoImpl.noAuthority",
                            new Object[] {username}, "User {0} has no GrantedAuthority"), username);
        }

        return createDomainUserDetails(username, domainUser, dbAuths);
    }

	
    protected List<DomainUser> loadDomainUsersByUserNameDomain(String username,String domain) {
        return getJdbcTemplate().query(userByUserNameDomainQuery, new String[] {username}, new RowMapper<DomainUser>() {
            public DomainUser mapRow(ResultSet rs, int rowNum) throws SQLException {
                String username = rs.getString(1);
                String password = rs.getString(2);
                boolean enabled = rs.getBoolean(3);
                                return new DomainUser(username,   null , password, enabled, true, true, true, AuthorityUtils.NO_AUTHORITIES);
            }

        });
    }
    
    protected List<GrantedAuthority> loadDomainUserAuthorities(String username,String domain) {
        return getJdbcTemplate().query(authoritiesByUserNameDomainQuery, new String[] {username}, new RowMapper<GrantedAuthority>() {
            public GrantedAuthority mapRow(ResultSet rs, int rowNum) throws SQLException {
                String roleName = getRolePrefix() + rs.getString(2);
                GrantedAuthorityImpl authority = new GrantedAuthorityImpl(roleName);

                return authority;
            }
        });
    }
    
    protected DomainUser createDomainUserDetails(String username, DomainUser userFromUserQuery,
            List<GrantedAuthority> combinedAuthorities) {
        String returnUsername = userFromUserQuery.getUsername();

        if (!this.isUsernameBasedPrimaryKey()) {
            returnUsername = username;
        }

        return new DomainUser(returnUsername,   null ,userFromUserQuery.getPassword(), userFromUserQuery.isEnabled(),
                true, true, true, combinedAuthorities);
    }
}
