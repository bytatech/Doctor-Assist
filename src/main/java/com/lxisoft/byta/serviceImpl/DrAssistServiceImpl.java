package com.lxisoft.byta.serviceImpl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lxisoft.byta.controller.DocController;
import com.lxisoft.byta.model.*;
import com.lxisoft.byta.repository.DiseaseRepository;
import com.lxisoft.byta.service.DrAssistService;
/**
 * A class which is used to implement Service layer
 * @author ARUN JOHNSON
 *
 */
@Service
public class DrAssistServiceImpl implements DrAssistService {
	@Autowired
	DiseaseRepository repository;
	Logger log  = Logger.getLogger(DocController.class); 

	
	

	/**
	 * method to find all diseases
	 * 
	 */
	@Override
	public List<Disease> findAll() {
		log.info("inside find all " );
		log.info("outside find all " + repository.findAll());
		
		return (List<Disease>) repository.findAll();
	}


	
}
