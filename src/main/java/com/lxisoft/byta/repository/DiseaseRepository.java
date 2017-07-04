package com.lxisoft.byta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lxisoft.byta.model.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
	List<Disease> findBySymptom_Symptom(String symptom);

}
