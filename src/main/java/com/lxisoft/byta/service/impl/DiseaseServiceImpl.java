package com.lxisoft.byta.service.impl;

import com.lxisoft.byta.service.DiseaseService;
import com.lxisoft.byta.domain.Disease;
import com.lxisoft.byta.repository.DiseaseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Disease.
 */
@Service
@Transactional
public class DiseaseServiceImpl implements DiseaseService{

    private final Logger log = LoggerFactory.getLogger(DiseaseServiceImpl.class);

    private final DiseaseRepository diseaseRepository;

    public DiseaseServiceImpl(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    /**
     * Save a disease.
     *
     * @param disease the entity to save
     * @return the persisted entity
     */
    @Override
    public Disease save(Disease disease) {
        log.debug("Request to save Disease : {}", disease);
        return diseaseRepository.save(disease);
    }

    /**
     *  Get all the diseases.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Disease> findAll() {
        log.debug("Request to get all Diseases");
        return diseaseRepository.findAllWithEagerRelationships();
    }

    /**
     *  Get one disease by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Disease findOne(Long id) {
        log.debug("Request to get Disease : {}", id);
        return diseaseRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  disease by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Disease : {}", id);
        diseaseRepository.delete(id);
    }

	@Override
	public List<Disease> findBySymptom( List<String> symptom) {
        log.debug("Request to findBySymptoms : {}", symptom.get(0));

		return diseaseRepository.findBySymptoms_name(symptom);
	}
}
