package com.inn.headstartdemo.service.mail;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.Security;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.inn.headstartdemo.utils.ConfigUtil;
import com.sun.mail.smtp.SMTPTransport;

/**
 *
 * @author Sandeep
 */
final public class MailServiceProvider {
   	private static Properties props = null;
	
	
    private MailServiceProvider() {
    }

 	private MailServiceProvider(MailServiceProvider mailServiceProvider) {
	    props = System.getProperties();
        props.setProperty("mail.smtps.host", mailServiceProvider.getHostName());
        props.setProperty("mail.smtp.socketFactory.class", mailServiceProvider.getSslFactory());
        props.setProperty("mail.smtp.socketFactory.fallback", mailServiceProvider.getSocketFactoryFallback());
        props.setProperty("mail.smtp.port", mailServiceProvider.getPort());
        props.setProperty("mail.smtp.socketFactory.port", mailServiceProvider.getSocketFactoryPort());
        props.setProperty("mail.smtps.auth", mailServiceProvider.getAuth());
        props.put("mail.smtps.quitwait", mailServiceProvider.getQuitWait());
    }
    /**
     * sends mail by ne google account emailaddress
     * @param googleAppsEmailId
     * @param password
     * @param recipientEmail
     * @param ccEmail
     * @param title
     * @param message
     * @throws AddressException
     * @throws MessagingException
     */
    public static void sendEmail(final String googleAppsEmailId, final String password, String recipientEmail, String ccEmail, String bccEmail, String title, String message) throws AddressException, MessagingException {
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
       
        /*
        If set to false, the QUIT command is sent and the connection is immediately closed. If set 
        to true (the default), causes the transport to wait for the response to the QUIT command.

        ref :   http://java.sun.com/products/javamail/javadocs/com/sun/mail/smtp/package-summary.html
                http://forum.java.sun.com/thread.jspa?threadID=5205249
                smtpsend.java - demo program from javamail
        */
        

        Session session = Session.getInstance(props, null);

        // -- Create a new message --
        Message msg = new MimeMessage(session);

        // -- Set the FROM and TO fields --
        msg.setFrom(new InternetAddress(googleAppsEmailId /*+ "@gmail.com"*/));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail, false));

        if (ccEmail.length() > 0) {
            msg.setRecipients(Message.RecipientType.CC, InternetAddress.parse(ccEmail, false));
        }
        if (bccEmail.length() > 0) {
            msg.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(bccEmail, false));
        }
        msg.setSubject(title);
       
        msg.setSentDate(new Date());
        msg.setDataHandler(new DataHandler(new HTMLDataSource(message)));
        SMTPTransport t = (SMTPTransport)session.getTransport("smtps");

        t.connect(ConfigUtil.getConfigProp(ConfigUtil.HOST_NAME), googleAppsEmailId, password);
        t.sendMessage(msg, msg.getAllRecipients());      
        t.close();
    }
   

	
	static class HTMLDataSource implements DataSource {
        private String html;

        public HTMLDataSource(String htmlString) {
            html = htmlString;
        }

        // Return html string in an InputStream.
        // A new stream must be returned each time.
        public InputStream getInputStream() throws IOException {
            if (html == null) 
            {
            throw new IOException("Null HTML");
            }
            return new ByteArrayInputStream(html.getBytes());
        }

        public OutputStream getOutputStream() throws IOException {
            throw new IOException("This DataHandler cannot write HTML");
        }

        public String getContentType() {
            return "text/html";
        }

        public String getName() {
            return "JAF text/html dataSource to send e-mail only";
        }
    }
    
    private String sslFactory;
	private String hostName;
	private String socketFactoryFallback;
	private String port;
	private String socketFactoryPort;
	private String auth;
	private String quitWait;
	
	public String getSslFactory() {
		return sslFactory;
	}

	public void setSslFactory(String sslFactory) {
		this.sslFactory = sslFactory;
	}

	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public String getSocketFactoryFallback() {
		return socketFactoryFallback;
	}

	public void setSocketFactoryFallback(String socketFactoryFallback) {
		this.socketFactoryFallback = socketFactoryFallback;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		
		this.port = port;
	}

	public String getSocketFactoryPort() {
		return socketFactoryPort;
	}

	public void setSocketFactoryPort(String socketFactoryPort) {
		this.socketFactoryPort = socketFactoryPort;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getQuitWait() {
		return quitWait;
	}

	public void setQuitWait(String quitWait) {
		this.quitWait = quitWait;
	}
    
}

