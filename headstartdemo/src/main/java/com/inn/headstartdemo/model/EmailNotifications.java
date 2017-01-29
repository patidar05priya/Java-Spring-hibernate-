
package com.inn.headstartdemo.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
@XmlRootElement(name="email_notifications") 
@Entity
@Table(name = "email_notifications")
 @JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"})
public class EmailNotifications  implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Id
        @GeneratedValue(strategy = GenerationType.AUTO)
	 	private Long id;
    
    @Basic
    private String email;
    
   
    @Basic
    private Date createdDate;
    
    @Basic
    private String subject;
    
    public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	@Basic
    private Date createdTime;

    @Basic
    private String sentBy;
    
    public String getSentBy() {
		return sentBy;
	}

	public void setSentBy(String sentBy) {
		this.sentBy = sentBy;
	}

	public Users getSentTo() {
		return sentTo;
	}

	public void setSentTo(Users sentTo) {
		this.sentTo = sentTo;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="send_to" , columnDefinition="INT UNSIGNED" )
    private Users sentTo;
    
        
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
   	
	}