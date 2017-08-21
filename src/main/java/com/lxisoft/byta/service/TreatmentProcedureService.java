package com.lxisoft.byta.service;

import com.lxisoft.byta.domain.TreatmentProcedure;
import java.util.List;

/**
 * Service Interface for managing TreatmentProcedure.
 */
public interface TreatmentProcedureService {

    /**
     * Save a treatmentProcedure.
     *
     * @param treatmentProcedure the entity to save
     * @return the persisted entity
     */
    TreatmentProcedure save(TreatmentProcedure treatmentProcedure);

    /**
     *  Get all the treatmentProcedures.
     *
     *  @return the list of entities
     */
    List<TreatmentProcedure> findAll();

    /**
     *  Get the "id" treatmentProcedure.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    TreatmentProcedure findOne(Long id);

    /**
     *  Delete the "id" treatmentProcedure.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

	List<TreatmentProcedure> findByDisease(String disease);
}
