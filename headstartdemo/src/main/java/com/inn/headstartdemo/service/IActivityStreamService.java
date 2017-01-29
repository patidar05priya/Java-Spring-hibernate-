package  com.inn.headstartdemo.service;

import org.springframework.scheduling.annotation.Async;
import  com.inn.headstartdemo.exceptions.ValueNotFoundException;
import  com.inn.headstartdemo.model.ActivityStream;
import  com.inn.headstartdemo.service.generic.IGenericService;

public interface IActivityStreamService extends IGenericService<Long,ActivityStream> {
	
	@Async
	public void createActivity(String message,String id,String Type);
	public ActivityStream getLatestStream(Long id) throws ValueNotFoundException;
	public Long getTotalCount();
}
