package com.lxisoft.byta.web.rest;

import com.lxisoft.byta.BytaApp;

import com.lxisoft.byta.domain.DiagnosticTest;
import com.lxisoft.byta.repository.DiagnosticTestRepository;
import com.lxisoft.byta.service.DiagnosticTestService;
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
 * Test class for the DiagnosticTestResource REST controller.
 *
 * @see DiagnosticTestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BytaApp.class)
public class DiagnosticTestResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DiagnosticTestRepository diagnosticTestRepository;

    @Autowired
    private DiagnosticTestService diagnosticTestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiagnosticTestMockMvc;

    private DiagnosticTest diagnosticTest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DiagnosticTestResource diagnosticTestResource = new DiagnosticTestResource(diagnosticTestService);
        this.restDiagnosticTestMockMvc = MockMvcBuilders.standaloneSetup(diagnosticTestResource)
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
    public static DiagnosticTest createEntity(EntityManager em) {
        DiagnosticTest diagnosticTest = new DiagnosticTest()
            .name(DEFAULT_NAME);
        return diagnosticTest;
    }

    @Before
    public void initTest() {
        diagnosticTest = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiagnosticTest() throws Exception {
        int databaseSizeBeforeCreate = diagnosticTestRepository.findAll().size();

        // Create the DiagnosticTest
        restDiagnosticTestMockMvc.perform(post("/api/diagnostic-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosticTest)))
            .andExpect(status().isCreated());

        // Validate the DiagnosticTest in the database
        List<DiagnosticTest> diagnosticTestList = diagnosticTestRepository.findAll();
        assertThat(diagnosticTestList).hasSize(databaseSizeBeforeCreate + 1);
        DiagnosticTest testDiagnosticTest = diagnosticTestList.get(diagnosticTestList.size() - 1);
        assertThat(testDiagnosticTest.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDiagnosticTestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diagnosticTestRepository.findAll().size();

        // Create the DiagnosticTest with an existing ID
        diagnosticTest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiagnosticTestMockMvc.perform(post("/api/diagnostic-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosticTest)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<DiagnosticTest> diagnosticTestList = diagnosticTestRepository.findAll();
        assertThat(diagnosticTestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDiagnosticTests() throws Exception {
        // Initialize the database
        diagnosticTestRepository.saveAndFlush(diagnosticTest);

        // Get all the diagnosticTestList
        restDiagnosticTestMockMvc.perform(get("/api/diagnostic-tests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diagnosticTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getDiagnosticTest() throws Exception {
        // Initialize the database
        diagnosticTestRepository.saveAndFlush(diagnosticTest);

        // Get the diagnosticTest
        restDiagnosticTestMockMvc.perform(get("/api/diagnostic-tests/{id}", diagnosticTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diagnosticTest.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDiagnosticTest() throws Exception {
        // Get the diagnosticTest
        restDiagnosticTestMockMvc.perform(get("/api/diagnostic-tests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiagnosticTest() throws Exception {
        // Initialize the database
        diagnosticTestService.save(diagnosticTest);

        int databaseSizeBeforeUpdate = diagnosticTestRepository.findAll().size();

        // Update the diagnosticTest
        DiagnosticTest updatedDiagnosticTest = diagnosticTestRepository.findOne(diagnosticTest.getId());
        updatedDiagnosticTest
            .name(UPDATED_NAME);

        restDiagnosticTestMockMvc.perform(put("/api/diagnostic-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiagnosticTest)))
            .andExpect(status().isOk());

        // Validate the DiagnosticTest in the database
        List<DiagnosticTest> diagnosticTestList = diagnosticTestRepository.findAll();
        assertThat(diagnosticTestList).hasSize(databaseSizeBeforeUpdate);
        DiagnosticTest testDiagnosticTest = diagnosticTestList.get(diagnosticTestList.size() - 1);
        assertThat(testDiagnosticTest.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDiagnosticTest() throws Exception {
        int databaseSizeBeforeUpdate = diagnosticTestRepository.findAll().size();

        // Create the DiagnosticTest

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDiagnosticTestMockMvc.perform(put("/api/diagnostic-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosticTest)))
            .andExpect(status().isCreated());

        // Validate the DiagnosticTest in the database
        List<DiagnosticTest> diagnosticTestList = diagnosticTestRepository.findAll();
        assertThat(diagnosticTestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDiagnosticTest() throws Exception {
        // Initialize the database
        diagnosticTestService.save(diagnosticTest);

        int databaseSizeBeforeDelete = diagnosticTestRepository.findAll().size();

        // Get the diagnosticTest
        restDiagnosticTestMockMvc.perform(delete("/api/diagnostic-tests/{id}", diagnosticTest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DiagnosticTest> diagnosticTestList = diagnosticTestRepository.findAll();
        assertThat(diagnosticTestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiagnosticTest.class);
        DiagnosticTest diagnosticTest1 = new DiagnosticTest();
        diagnosticTest1.setId(1L);
        DiagnosticTest diagnosticTest2 = new DiagnosticTest();
        diagnosticTest2.setId(diagnosticTest1.getId());
        assertThat(diagnosticTest1).isEqualTo(diagnosticTest2);
        diagnosticTest2.setId(2L);
        assertThat(diagnosticTest1).isNotEqualTo(diagnosticTest2);
        diagnosticTest1.setId(null);
        assertThat(diagnosticTest1).isNotEqualTo(diagnosticTest2);
    }
}
