package com.lxisoft.byta.controller;

import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lxisoft.byta.model.Disease;
import com.lxisoft.byta.serviceImpl.DrAssistServiceImpl;


/**
 * This is a rest controller class which is used to address request and response
 * 
 * @author ARUN JOHNSON
 * @version 1.0.0
 */

@RestController
@RequestMapping("/doctorservice")
public class DocController {
	
	@Autowired
	DrAssistServiceImpl repository ;
	Logger 	log = Logger.getLogger(DocController.class); 

	
	/**
	 * this method will return a disease based on user input which is a symptom
	 * @param symptom
	 * @return
	 */
	@RequestMapping("/showdisease")
	public List<Disease> getSymptoms(String name)
	{
		log.info("inside getSymptoms" );
		System.out.println(repository.findAll());
	
		return repository.findByName(name);
	}
	
	
	

}
