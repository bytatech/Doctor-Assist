
package com.lxisoft.byta.controller;
import java.util.List;

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
	
	@RequestMapping("/showdicease")
	public List<Disease> getSymptoms(String symptom)
	{
	
		return repository.findBySymptoms(symptom);
	}
	
	
	

}
