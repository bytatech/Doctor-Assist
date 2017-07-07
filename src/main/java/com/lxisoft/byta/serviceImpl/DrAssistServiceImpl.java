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
	 * it is used to find one disease based on id
	 * 
	 */
	@Override
	public Disease findOne(long id) {
		log.info("inside find one " + id);
		log.info("outside find one " + id +"   "+ repository.findOne(id));

		return repository.findOne(id);
	}

	/**
	 * method to find all diseases
	 * 
	 */
	@Override
	public List<Disease> findAll() {
		log.info("inside find all " );
		log.info("outside find all " + repository.findAll());
		
		return repository.findAll();
	}
	
	/**
	 * method to find disease based on Symptoms
	 * @param symptom
	 * @return
	 */
	public List<Disease> findBySymptoms(String symptom) {

		log.info("inside findBySymptoms " );
		log.info("outside findBySymptoms " +"   "+symptom + "   "   + repository.findBySymptoms_Symptom(symptom));

		return repository.findBySymptoms_Symptom(symptom);

	}

	
}
