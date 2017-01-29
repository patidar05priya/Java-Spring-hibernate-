package com.inn.headstartdemo.service.mail;


import java.util.List;
import org.springframework.scheduling.annotation.Async;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;


import com.inn.headstartdemo.model.Users;

public interface IMailSender {
	@Async
	public void sendMail(String subject, String message, String string,String eod) throws AddressException, MessagingException;
	@Async
	public void sendMailWithCC(String subject, String message, String string,String cc) throws AddressException, MessagingException;
	@Async
	public void sendMailWithCCAndBCC(String subject, String message, String string,String cc, String bcc) throws AddressException, MessagingException;
	
}