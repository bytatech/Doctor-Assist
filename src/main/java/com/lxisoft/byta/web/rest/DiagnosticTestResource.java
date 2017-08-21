package com.lxisoft.byta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lxisoft.byta.domain.DiagnosticTest;
import com.lxisoft.byta.service.DiagnosticTestService;
import com.lxisoft.byta.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DiagnosticTest.
 */
@RestController
@RequestMapping("/api")
public class DiagnosticTestResource {

    private final Logger log = LoggerFactory.getLogger(DiagnosticTestResource.class);

    private static final String ENTITY_NAME = "diagnosticTest";

    private final DiagnosticTestService diagnosticTestService;

    public DiagnosticTestResource(DiagnosticTestService diagnosticTestService) {
        this.diagnosticTestService = diagnosticTestService;
    }

    /**
     * POST  /diagnostic-tests : Create a new diagnosticTest.
     *
     * @param diagnosticTest the diagnosticTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diagnosticTest, or with status 400 (Bad Request) if the diagnosticTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/diagnostic-tests")
    @Timed
    public ResponseEntity<DiagnosticTest> createDiagnosticTest(@RequestBody DiagnosticTest diagnosticTest) throws URISyntaxException {
        log.debug("REST request to save DiagnosticTest : {}", diagnosticTest);
        if (diagnosticTest.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new diagnosticTest cannot already have an ID")).body(null);
        }
        DiagnosticTest result = diagnosticTestService.save(diagnosticTest);
        return ResponseEntity.created(new URI("/api/diagnostic-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /diagnostic-tests : Updates an existing diagnosticTest.
     *
     * @param diagnosticTest the diagnosticTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diagnosticTest,
     * or with status 400 (Bad Request) if the diagnosticTest is not valid,
     * or with status 500 (Internal Server Error) if the diagnosticTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/diagnostic-tests")
    @Timed
    public ResponseEntity<DiagnosticTest> updateDiagnosticTest(@RequestBody DiagnosticTest diagnosticTest) throws URISyntaxException {
        log.debug("REST request to update DiagnosticTest : {}", diagnosticTest);
        if (diagnosticTest.getId() == null) {
            return createDiagnosticTest(diagnosticTest);
        }
        DiagnosticTest result = diagnosticTestService.save(diagnosticTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diagnosticTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /diagnostic-tests : get all the diagnosticTests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of diagnosticTests in body
     */
    @GetMapping("/diagnostic-tests")
    @Timed
    public List<DiagnosticTest> getAllDiagnosticTests() {
        log.debug("REST request to get all DiagnosticTests");
        return diagnosticTestService.findAll();
    }

    /**
     * GET  /diagnostic-tests/:id : get the "id" diagnosticTest.
     *
     * @param id the id of the diagnosticTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diagnosticTest, or with status 404 (Not Found)
     */
    @GetMapping("/diagnostic-tests/{id}")
    @Timed
    public ResponseEntity<DiagnosticTest> getDiagnosticTest(@PathVariable Long id) {
        log.debug("REST request to get DiagnosticTest : {}", id);
        DiagnosticTest diagnosticTest = diagnosticTestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(diagnosticTest));
    }

    /**
     * DELETE  /diagnostic-tests/:id : delete the "id" diagnosticTest.
     *
     * @param id the id of the diagnosticTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/diagnostic-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiagnosticTest(@PathVariable Long id) {
        log.debug("REST request to delete DiagnosticTest : {}", id);
        diagnosticTestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
