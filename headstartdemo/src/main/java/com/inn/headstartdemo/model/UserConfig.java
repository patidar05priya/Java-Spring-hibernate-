package com.inn.headstartdemo.model;

import java.io.Serializable;

import javax.persistence.*;

import com.inn.headstartdemo.model.Users;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonBackReference;
import org.hibernate.envers.Audited;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@XmlRootElement(name="UserConfig")
@Entity
@Table(name="user_config")
@Audited
  @JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"})
public class UserConfig implements Serializable {
   /**
     * 
    */
    private static final long serialVersionUID = 1L;
    	
    
    	@OneToOne(fetch=FetchType.LAZY)
    	@JoinColumn(name="user_id", columnDefinition="INT UNSIGNED", nullable=false)
	private Users userid;
	
	public Integer getId() {
	    return id;
	}
	public void setId(Integer id) {
	    this.id = id;
	}
	public UserLanguage getUserLanguage() {
	    return userLanguage;
	}

	public void setUserLanguage(UserLanguage userLanguage) {
	    this.userLanguage = userLanguage;
	}

	@Id
       @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition="INT")
	 	private Integer id;
	
	
	@Enumerated(EnumType.STRING)
	@Column(name="user_language")
	private UserLanguage userLanguage;
	
	@Enumerated(EnumType.STRING)
	@Column(name="date_format")
	private DateFormat dateFormat;
	
	@Enumerated(EnumType.STRING)
	@Column(name="currency_format")
	private CurrencyFormat currencyFormat;
	
	@Enumerated(EnumType.STRING)
	@Column(name="time_zone")
	private TimeZone timeZone;
	
	
	public static enum  UserLanguage{en,sp,fr}
	public static enum  DateFormat{mmddyy_slash,mmddyyyy_slash,yymmdd_slash,yyyymmdd_dash,ddMMyy_dash,ddMMyyyy_dash}
	public static enum CurrencyFormat{indian,europian}
	public static enum TimeZone{IST,EST}
	
	
	

	@JsonBackReference
	public Users getUserid() {
	    return userid;
	}

	
	public void setUserid(Users userid) {
	    this.userid = userid;
	}
	
	public DateFormat getDateFormat() {
		return dateFormat;
	}
	public void setDateFormat(DateFormat dateFormat) {
		this.dateFormat = dateFormat;
	}
	public CurrencyFormat getCurrencyFormat() {
		return currencyFormat;
	}
	public void setCurrencyFormat(CurrencyFormat currencyFormat) {
		this.currencyFormat = currencyFormat;
	}
		public TimeZone getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(TimeZone timeZone) {
		this.timeZone = timeZone;
	}
}
