package com.lxisoft.byta.service.impl;

import com.lxisoft.byta.service.SymptomService;
import com.lxisoft.byta.domain.Symptom;
import com.lxisoft.byta.repository.SymptomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Symptom.
 */
@Service
@Transactional
public class SymptomServiceImpl implements SymptomService{

    private final Logger log = LoggerFactory.getLogger(SymptomServiceImpl.class);

    private final SymptomRepository symptomRepository;

    public SymptomServiceImpl(SymptomRepository symptomRepository) {
        this.symptomRepository = symptomRepository;
    }

    /**
     * Save a symptom.
     *
     * @param symptom the entity to save
     * @return the persisted entity
     */
    @Override
    public Symptom save(Symptom symptom) {
        log.debug("Request to save Symptom : {}", symptom);
        return symptomRepository.save(symptom);
    }

    /**
     *  Get all the symptoms.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Symptom> findAll() {
        log.debug("Request to get all Symptoms");
        return symptomRepository.findAll();
    }

    /**
     *  Get one symptom by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Symptom findOne(Long id) {
        log.debug("Request to get Symptom : {}", id);
        return symptomRepository.findOne(id);
    }

    /**
     *  Delete the  symptom by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Symptom : {}", id);
        symptomRepository.delete(id);
    }
}
