package  com.inn.headstartdemo.service;

import com.inn.headstartdemo.model.CustomerAttach;
import java.lang.Integer;
import java.io.InputStream;
import  com.inn.headstartdemo.service.generic.IGenericService;


/**
 * 
 * @author Team
 * @version 2.0
 *
 */
public interface ICustomerAttachService extends IGenericService<Integer, CustomerAttach> {

	CustomerAttach add(int entityId, String fileName, InputStream in);
}
