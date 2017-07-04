package com.lxisoft.byta.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lxisoft.byta.model.*;
import com.lxisoft.byta.repository.DiseaseRepository;
import com.lxisoft.byta.service.DrAssistService;

@Service
public class DrAssistServiceImpl implements DrAssistService {
	@Autowired
	DiseaseRepository repository;

	@Override
	public Disease findOne(long id) {

		return repository.findOne(id);
	}

	@Override
	public List<Disease> findAll() {
		return repository.findAll();
	}

	public List<Disease> findBySymptoms(String symptom) {


		return repository.findBySymptom_Symptom(symptom);

	}

	

}
