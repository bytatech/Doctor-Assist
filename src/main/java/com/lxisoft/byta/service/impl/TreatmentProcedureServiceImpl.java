package com.lxisoft.byta.service.impl;

import com.lxisoft.byta.service.TreatmentProcedureService;
import com.lxisoft.byta.domain.TreatmentProcedure;
import com.lxisoft.byta.repository.TreatmentProcedureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TreatmentProcedure.
 */
@Service
@Transactional
public class TreatmentProcedureServiceImpl implements TreatmentProcedureService{

    private final Logger log = LoggerFactory.getLogger(TreatmentProcedureServiceImpl.class);

    private final TreatmentProcedureRepository treatmentProcedureRepository;

    public TreatmentProcedureServiceImpl(TreatmentProcedureRepository treatmentProcedureRepository) {
        this.treatmentProcedureRepository = treatmentProcedureRepository;
    }

    /**
     * Save a treatmentProcedure.
     *
     * @param treatmentProcedure the entity to save
     * @return the persisted entity
     */
    @Override
    public TreatmentProcedure save(TreatmentProcedure treatmentProcedure) {
        log.debug("Request to save TreatmentProcedure : {}", treatmentProcedure);
        return treatmentProcedureRepository.save(treatmentProcedure);
    }

    /**
     *  Get all the treatmentProcedures.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TreatmentProcedure> findAll() {
        log.debug("Request to get all TreatmentProcedures");
        return treatmentProcedureRepository.findAll();
    }

    /**
     *  Get one treatmentProcedure by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TreatmentProcedure findOne(Long id) {
        log.debug("Request to get TreatmentProcedure : {}", id);
        return treatmentProcedureRepository.findOne(id);
    }

    /**
     *  Delete the  treatmentProcedure by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TreatmentProcedure : {}", id);
        treatmentProcedureRepository.delete(id);
    }

	@Override
	public List<TreatmentProcedure> findByDisease(String disease) {
		return treatmentProcedureRepository.findByDisease_name(disease);
	}
}
