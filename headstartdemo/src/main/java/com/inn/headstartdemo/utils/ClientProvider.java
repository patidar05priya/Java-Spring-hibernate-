package com.inn.headstartdemo.utils;

import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.node.Node;
import static org.elasticsearch.node.NodeBuilder.nodeBuilder;

/**
 *
 * @author 
 */
public class ClientProvider {
    
    private static ClientProvider instance = null;
    private static Object lock      = new Object();
  private Client client;
    private Node node;

    public static ClientProvider instance(){
        
        if(instance == null) { 
            synchronized (lock) {
                if(null == instance){
                    instance = new ClientProvider();
                }
            }
        }
        return instance;
    }

    public void prepareClient(){
	
	Settings settings = ImmutableSettings.settingsBuilder().put("cluster.name", "headstartdemoindex").put("client.transport.sniff", true).build();
	node=nodeBuilder().clusterName("headstartdemoindex").node();
	TransportClient transportClient = new TransportClient(settings);
	transportClient = transportClient.addTransportAddress(new InetSocketTransportAddress("localhost", 9300));
	client= (Client) transportClient;
    }

    public void closeNode(){
        
        if(!node.isClosed())
          {  node.close();}

    }
    
    public Client getClient(){
        return client;
    }
    
    
    public void printThis() {
      
    }
    
}
