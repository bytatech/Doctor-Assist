package com.lxisoft.byta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lxisoft.byta.domain.TreatmentProcedure;
import com.lxisoft.byta.service.TreatmentProcedureService;
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
 * REST controller for managing TreatmentProcedure.
 */
@RestController
@RequestMapping("/api")
public class TreatmentProcedureResource {

    private final Logger log = LoggerFactory.getLogger(TreatmentProcedureResource.class);

    private static final String ENTITY_NAME = "treatmentProcedure";

    private final TreatmentProcedureService treatmentProcedureService;

    public TreatmentProcedureResource(TreatmentProcedureService treatmentProcedureService) {
        this.treatmentProcedureService = treatmentProcedureService;
    }

    /**
     * POST  /treatment-procedures : Create a new treatmentProcedure.
     *
     * @param treatmentProcedure the treatmentProcedure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new treatmentProcedure, or with status 400 (Bad Request) if the treatmentProcedure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/treatment-procedures")
    @Timed
    public ResponseEntity<TreatmentProcedure> createTreatmentProcedure(@RequestBody TreatmentProcedure treatmentProcedure) throws URISyntaxException {
        log.debug("REST request to save TreatmentProcedure : {}", treatmentProcedure);
        if (treatmentProcedure.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new treatmentProcedure cannot already have an ID")).body(null);
        }
        TreatmentProcedure result = treatmentProcedureService.save(treatmentProcedure);
        return ResponseEntity.created(new URI("/api/treatment-procedures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /treatment-procedures : Updates an existing treatmentProcedure.
     *
     * @param treatmentProcedure the treatmentProcedure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated treatmentProcedure,
     * or with status 400 (Bad Request) if the treatmentProcedure is not valid,
     * or with status 500 (Internal Server Error) if the treatmentProcedure couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/treatment-procedures")
    @Timed
    public ResponseEntity<TreatmentProcedure> updateTreatmentProcedure(@RequestBody TreatmentProcedure treatmentProcedure) throws URISyntaxException {
        log.debug("REST request to update TreatmentProcedure : {}", treatmentProcedure);
        if (treatmentProcedure.getId() == null) {
            return createTreatmentProcedure(treatmentProcedure);
        }
        TreatmentProcedure result = treatmentProcedureService.save(treatmentProcedure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, treatmentProcedure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /treatment-procedures : get all the treatmentProcedures.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of treatmentProcedures in body
     */
    @GetMapping("/treatment-procedures")
    @Timed
    public List<TreatmentProcedure> getAllTreatmentProcedures() {
        log.debug("REST request to get all TreatmentProcedures");
        return treatmentProcedureService.findAll();
    }

    /**
     * GET  /treatment-procedures/:id : get the "id" treatmentProcedure.
     *
     * @param id the id of the treatmentProcedure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the treatmentProcedure, or with status 404 (Not Found)
     */
    @GetMapping("/treatment-procedures/{id}")
    @Timed
    public ResponseEntity<TreatmentProcedure> getTreatmentProcedure(@PathVariable Long id) {
        log.debug("REST request to get TreatmentProcedure : {}", id);
        TreatmentProcedure treatmentProcedure = treatmentProcedureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(treatmentProcedure));
    }

    /**
     * DELETE  /treatment-procedures/:id : delete the "id" treatmentProcedure.
     *
     * @param id the id of the treatmentProcedure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/treatment-procedures/{id}")
    @Timed
    public ResponseEntity<Void> deleteTreatmentProcedure(@PathVariable Long id) {
        log.debug("REST request to delete TreatmentProcedure : {}", id);
        treatmentProcedureService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/treatmentproceduresbydisease")
    @Timed
    public ResponseEntity<List<TreatmentProcedure>> getTreatmentProcedureByDisease(String disease) {
        log.debug("REST request to get TreatmentProcedure : {}", disease);
        List<TreatmentProcedure> treatmentProcedure = treatmentProcedureService.findByDisease(disease);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(treatmentProcedure));
    }
    
    
}
