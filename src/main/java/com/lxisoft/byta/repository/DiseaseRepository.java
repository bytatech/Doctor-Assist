package com.lxisoft.byta.repository;

import com.lxisoft.byta.domain.Disease;


import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Disease entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiseaseRepository extends JpaRepository<Disease,Long> {
    
    @Query("select distinct disease from Disease disease left join fetch disease.symptoms")
    List<Disease> findAllWithEagerRelationships();

    @Query("select disease from Disease disease left join fetch disease.symptoms where disease.id =:id")
    Disease findOneWithEagerRelationships(@Param("id") Long id);
  
    
   
    @Query(value = "select distinct disease.* from disease, disease_symptom, symptom where disease.id = disease_symptom.diseases_id and disease_symptom.symptoms_id = symptom.id and symptom.name  in :patients and disease.name in (select distinct disease.name from disease, disease_symptom, symptom where disease.id = disease_symptom.diseases_id and disease_symptom.symptoms_id = symptom.id and symptom.name  in :patients ) ",nativeQuery=true)
    List<Disease> findBySymptoms_name(@Param("patients") List<String> symptom);
    
}
