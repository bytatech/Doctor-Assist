package com.lxisoft.byta.service.impl;

import com.lxisoft.byta.service.DiagnosticTestService;
import com.lxisoft.byta.domain.DiagnosticTest;
import com.lxisoft.byta.repository.DiagnosticTestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing DiagnosticTest.
 */
@Service
@Transactional
public class DiagnosticTestServiceImpl implements DiagnosticTestService{

    private final Logger log = LoggerFactory.getLogger(DiagnosticTestServiceImpl.class);

    private final DiagnosticTestRepository diagnosticTestRepository;

    public DiagnosticTestServiceImpl(DiagnosticTestRepository diagnosticTestRepository) {
        this.diagnosticTestRepository = diagnosticTestRepository;
    }

    /**
     * Save a diagnosticTest.
     *
     * @param diagnosticTest the entity to save
     * @return the persisted entity
     */
    @Override
    public DiagnosticTest save(DiagnosticTest diagnosticTest) {
        log.debug("Request to save DiagnosticTest : {}", diagnosticTest);
        return diagnosticTestRepository.save(diagnosticTest);
    }

    /**
     *  Get all the diagnosticTests.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DiagnosticTest> findAll() {
        log.debug("Request to get all DiagnosticTests");
        return diagnosticTestRepository.findAll();
    }

    /**
     *  Get one diagnosticTest by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DiagnosticTest findOne(Long id) {
        log.debug("Request to get DiagnosticTest : {}", id);
        return diagnosticTestRepository.findOne(id);
    }

    /**
     *  Delete the  diagnosticTest by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DiagnosticTest : {}", id);
        diagnosticTestRepository.delete(id);
    }
}
