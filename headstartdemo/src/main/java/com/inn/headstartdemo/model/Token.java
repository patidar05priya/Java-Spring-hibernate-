package com.inn.headstartdemo.model;

import java.util.Date;



import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;

@NamedQueries({@NamedQuery(name="getTokenSeriesList", query="select t from Token t where t.series=:series"),

})
  @JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"})
@Entity
@Table(name="token")
@XmlRootElement(name="Token")


public class Token {

	@Basic
	@Column(nullable=false, length=100)
	private String username;

	@Basic	
	@Id
	        @Column(nullable=false, length=100)
    @GeneratedValue(strategy = GenerationType.AUTO)
	 	private Integer Id;

	public Integer getId() {
		return Id;
	}


	public void setId(Integer id) {
		Id = id;
	}

	@Basic
	@Column(nullable=false, length=100)
	private String series;

	@Basic
	@Column(nullable=false, length=100)
	private String tokenValue;

	@Basic
	@Column(nullable=false, length=100)
		private Date date;
	
	public Token() {
	}


	@Override
	public String toString() {
		return "Token [username=" + username + ", series=" + series
				+ ", tokenValue=" + tokenValue + ", date=" + date + "]";
		}

	public Token(PersistentRememberMeToken persistentRememberMeToken) {
		this.username = persistentRememberMeToken.getUsername();
		this.series = persistentRememberMeToken.getSeries();
		 this.date  = persistentRememberMeToken.getDate();
		this.tokenValue = persistentRememberMeToken.getTokenValue();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getTokenValue() {
		return tokenValue;
	}

	public void setTokenValue(String tokenValue) {
		this.tokenValue = tokenValue;
	}
 	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	}
