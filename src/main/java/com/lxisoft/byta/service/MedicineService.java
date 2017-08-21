package com.lxisoft.byta.service;

import com.lxisoft.byta.domain.Medicine;
import java.util.List;

/**
 * Service Interface for managing Medicine.
 */
public interface MedicineService {

    /**
     * Save a medicine.
     *
     * @param medicine the entity to save
     * @return the persisted entity
     */
    Medicine save(Medicine medicine);

    /**
     *  Get all the medicines.
     *
     *  @return the list of entities
     */
    List<Medicine> findAll();

    /**
     *  Get the "id" medicine.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Medicine findOne(Long id);

    /**
     *  Delete the "id" medicine.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
