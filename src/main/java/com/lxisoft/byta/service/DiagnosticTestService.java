package com.lxisoft.byta.service;

import com.lxisoft.byta.domain.DiagnosticTest;
import java.util.List;

/**
 * Service Interface for managing DiagnosticTest.
 */
public interface DiagnosticTestService {

    /**
     * Save a diagnosticTest.
     *
     * @param diagnosticTest the entity to save
     * @return the persisted entity
     */
    DiagnosticTest save(DiagnosticTest diagnosticTest);

    /**
     *  Get all the diagnosticTests.
     *
     *  @return the list of entities
     */
    List<DiagnosticTest> findAll();

    /**
     *  Get the "id" diagnosticTest.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DiagnosticTest findOne(Long id);

    /**
     *  Delete the "id" diagnosticTest.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
