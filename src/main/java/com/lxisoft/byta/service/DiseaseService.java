package com.lxisoft.byta.service;

import com.lxisoft.byta.domain.Disease;
import java.util.List;

import org.hibernate.annotations.Parameter;
import org.springframework.data.repository.query.Param;

/**
 * Service Interface for managing Disease.
 */
public interface DiseaseService {

    /**
     * Save a disease.
     *
     * @param disease the entity to save
     * @return the persisted entity
     */
    Disease save(Disease disease);

    /**
     *  Get all the diseases.
     *
     *  @return the list of entities
     */
    List<Disease> findAll();

    /**
     *  Get the "id" disease.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Disease findOne(Long id);

    /**
     *  Delete the "id" disease.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);


	List<Disease> findBySymptom(List<String> symptom);
}
