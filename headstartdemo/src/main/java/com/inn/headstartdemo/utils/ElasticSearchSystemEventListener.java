package com.inn.headstartdemo.utils;

import com.inn.headstartdemo.utils.ClientProvider;
import javax.faces.application.Application;
import javax.faces.event.AbortProcessingException;
import javax.faces.event.PostConstructApplicationEvent;
import javax.faces.event.PreDestroyApplicationEvent;
import javax.faces.event.SystemEvent;
import javax.faces.event.SystemEventListener;
/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
public class ElasticSearchSystemEventListener implements SystemEventListener {

    @Override
    public void processEvent(SystemEvent event) throws AbortProcessingException {
        if(event instanceof PostConstructApplicationEvent){

            /* Preparing the ElasticSearch Client */
            ClientProvider.instance().prepareClient();
        }
        
        if(event instanceof PreDestroyApplicationEvent){

            /* ElasticSearch node is closing */
            ClientProvider.instance().closeNode();  
        }
        
    }

    @Override
    public boolean isListenerForSource(Object o) {
         return (o instanceof Application);
    }
    
}
