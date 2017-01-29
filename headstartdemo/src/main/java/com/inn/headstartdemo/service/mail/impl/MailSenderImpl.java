package com.inn.headstartdemo.service.mail.impl;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.inn.headstartdemo.service.mail.MailServiceProvider;
import com.inn.headstartdemo.service.mail.IMailSender;
import com.inn.headstartdemo.utils.ConfigUtil;

@Component("mailSender")
public class MailSenderImpl implements IMailSender{

	public MailSenderImpl() {
	}

	
	public void sendMail(String subject, String message, String sentTo,
			String eod) throws AddressException, MessagingException {
		String email=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_ID);
		String password=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_PASSWORD);
		MailServiceProvider.sendEmail(email,password, sentTo, "", "", subject,message);		
	}
	public void sendMailWithCC(String subject, String message, String sentTo,
			String cc) throws AddressException, MessagingException {
		String email=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_ID);
		String password=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_PASSWORD);
		MailServiceProvider.sendEmail(email,password, sentTo, cc, "", subject,message);		
	}
	
	public void sendMailWithCCAndBCC(String subject, String message, String sentTo,
			String cc,String bcc) throws AddressException, MessagingException {
		String email=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_ID);
		String password=ConfigUtil.getConfigProp(ConfigUtil.EMAIL_PASSWORD);
		MailServiceProvider.sendEmail(email,password, sentTo, cc, bcc, subject,message);		
	}
}
