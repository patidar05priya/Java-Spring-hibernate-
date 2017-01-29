package com.inn.headstartdemo.utils;


import java.util.Date;


import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Transient;
import org.hibernate.envers.Audited;
import com.inn.headstartdemo.model.Users;
import com.inn.headstartdemo.security.spring.CustomerInfo;

/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
 
/**
 * 
 * BaseEntity 
 *
 */
@MappedSuperclass
@Audited
public abstract class BaseEntity {
	

	
	
    @Basic
    @Column(name = "modifiedTime", insertable = true, updatable = true)
    protected Date modifiedTime;
	
    	@Basic
	@Column(name = "createdTime", insertable = true, updatable = false)
    	protected Date createdTime;
    	
    	@ManyToOne(fetch=FetchType.LAZY)
	    @JoinColumn(name="creator", columnDefinition="INT UNSIGNED", updatable = false)
        	protected Users creator;

	public Users getCreator() {
	    return creator;
	}

	public void setCreator(Users creator) {
	    this.creator = creator;
	}

	public Users getLastModifier() {
	    return lastModifier;
	}

	public void setLastModifier(Users lastModifier) {
	    this.lastModifier = lastModifier;
	}

	@ManyToOne(fetch=FetchType.LAZY)
		@JoinColumn(name="last_modifier", columnDefinition="INT UNSIGNED")
		protected Users lastModifier;

	
	
	/**
	 * @return the modifiedTime
	 */
	
    	public  Date getModifiedTime() {
		return modifiedTime;
		}

	/**
	 * @param modifiedTime
	 *            the modifiedTime to set
	 */
    	public  void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
		}

	/**
	 * @return the dateCreaTech
	 */
	
    	public  Date getCreatedTime() {
		return createdTime;
		}

	/**
	 * @param createdTime
	 *            the createdTime to set
	 */
    	public  void setCreatedTime(Date createdTime) {
			this.createdTime = createdTime;
		}

	@PrePersist
	void onCreate() {

	   Users userInContext = new Users(CustomerInfo.getCustomerUserId());
	   this.setCreator(userInContext);
	   this.setLastModifier(userInContext);
	   Date date=new Date();
	   this.setCreatedTime(date);
	   this.setModifiedTime(date);
	}

	@PreUpdate
	void onPersist() {
	
		Users userInContext = new Users(CustomerInfo.getCustomerUserId());	
	 	this.setCreator(this.getCreator());
	    this.setLastModifier(userInContext);
	    this.setCreatedTime(this.getCreatedTime());
		this.setModifiedTime((new Date()));
	}
}
