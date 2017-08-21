package com.lxisoft.byta.web.rest;

import com.lxisoft.byta.BytaApp;

import com.lxisoft.byta.domain.TreatmentProcedure;
import com.lxisoft.byta.repository.TreatmentProcedureRepository;
import com.lxisoft.byta.service.TreatmentProcedureService;
import com.lxisoft.byta.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TreatmentProcedureResource REST controller.
 *
 * @see TreatmentProcedureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BytaApp.class)
public class TreatmentProcedureResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TreatmentProcedureRepository treatmentProcedureRepository;

    @Autowired
    private TreatmentProcedureService treatmentProcedureService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTreatmentProcedureMockMvc;

    private TreatmentProcedure treatmentProcedure;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TreatmentProcedureResource treatmentProcedureResource = new TreatmentProcedureResource(treatmentProcedureService);
        this.restTreatmentProcedureMockMvc = MockMvcBuilders.standaloneSetup(treatmentProcedureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TreatmentProcedure createEntity(EntityManager em) {
        TreatmentProcedure treatmentProcedure = new TreatmentProcedure()
            .name(DEFAULT_NAME);
        return treatmentProcedure;
    }

    @Before
    public void initTest() {
        treatmentProcedure = createEntity(em);
    }

    @Test
    @Transactional
    public void createTreatmentProcedure() throws Exception {
        int databaseSizeBeforeCreate = treatmentProcedureRepository.findAll().size();

        // Create the TreatmentProcedure
        restTreatmentProcedureMockMvc.perform(post("/api/treatment-procedures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentProcedure)))
            .andExpect(status().isCreated());

        // Validate the TreatmentProcedure in the database
        List<TreatmentProcedure> treatmentProcedureList = treatmentProcedureRepository.findAll();
        assertThat(treatmentProcedureList).hasSize(databaseSizeBeforeCreate + 1);
        TreatmentProcedure testTreatmentProcedure = treatmentProcedureList.get(treatmentProcedureList.size() - 1);
        assertThat(testTreatmentProcedure.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTreatmentProcedureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = treatmentProcedureRepository.findAll().size();

        // Create the TreatmentProcedure with an existing ID
        treatmentProcedure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTreatmentProcedureMockMvc.perform(post("/api/treatment-procedures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentProcedure)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TreatmentProcedure> treatmentProcedureList = treatmentProcedureRepository.findAll();
        assertThat(treatmentProcedureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTreatmentProcedures() throws Exception {
        // Initialize the database
        treatmentProcedureRepository.saveAndFlush(treatmentProcedure);

        // Get all the treatmentProcedureList
        restTreatmentProcedureMockMvc.perform(get("/api/treatment-procedures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(treatmentProcedure.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTreatmentProcedure() throws Exception {
        // Initialize the database
        treatmentProcedureRepository.saveAndFlush(treatmentProcedure);

        // Get the treatmentProcedure
        restTreatmentProcedureMockMvc.perform(get("/api/treatment-procedures/{id}", treatmentProcedure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(treatmentProcedure.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTreatmentProcedure() throws Exception {
        // Get the treatmentProcedure
        restTreatmentProcedureMockMvc.perform(get("/api/treatment-procedures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTreatmentProcedure() throws Exception {
        // Initialize the database
        treatmentProcedureService.save(treatmentProcedure);

        int databaseSizeBeforeUpdate = treatmentProcedureRepository.findAll().size();

        // Update the treatmentProcedure
        TreatmentProcedure updatedTreatmentProcedure = treatmentProcedureRepository.findOne(treatmentProcedure.getId());
        updatedTreatmentProcedure
            .name(UPDATED_NAME);

        restTreatmentProcedureMockMvc.perform(put("/api/treatment-procedures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTreatmentProcedure)))
            .andExpect(status().isOk());

        // Validate the TreatmentProcedure in the database
        List<TreatmentProcedure> treatmentProcedureList = treatmentProcedureRepository.findAll();
        assertThat(treatmentProcedureList).hasSize(databaseSizeBeforeUpdate);
        TreatmentProcedure testTreatmentProcedure = treatmentProcedureList.get(treatmentProcedureList.size() - 1);
        assertThat(testTreatmentProcedure.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTreatmentProcedure() throws Exception {
        int databaseSizeBeforeUpdate = treatmentProcedureRepository.findAll().size();

        // Create the TreatmentProcedure

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTreatmentProcedureMockMvc.perform(put("/api/treatment-procedures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(treatmentProcedure)))
            .andExpect(status().isCreated());

        // Validate the TreatmentProcedure in the database
        List<TreatmentProcedure> treatmentProcedureList = treatmentProcedureRepository.findAll();
        assertThat(treatmentProcedureList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTreatmentProcedure() throws Exception {
        // Initialize the database
        treatmentProcedureService.save(treatmentProcedure);

        int databaseSizeBeforeDelete = treatmentProcedureRepository.findAll().size();

        // Get the treatmentProcedure
        restTreatmentProcedureMockMvc.perform(delete("/api/treatment-procedures/{id}", treatmentProcedure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TreatmentProcedure> treatmentProcedureList = treatmentProcedureRepository.findAll();
        assertThat(treatmentProcedureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TreatmentProcedure.class);
        TreatmentProcedure treatmentProcedure1 = new TreatmentProcedure();
        treatmentProcedure1.setId(1L);
        TreatmentProcedure treatmentProcedure2 = new TreatmentProcedure();
        treatmentProcedure2.setId(treatmentProcedure1.getId());
        assertThat(treatmentProcedure1).isEqualTo(treatmentProcedure2);
        treatmentProcedure2.setId(2L);
        assertThat(treatmentProcedure1).isNotEqualTo(treatmentProcedure2);
        treatmentProcedure1.setId(null);
        assertThat(treatmentProcedure1).isNotEqualTo(treatmentProcedure2);
    }
}
