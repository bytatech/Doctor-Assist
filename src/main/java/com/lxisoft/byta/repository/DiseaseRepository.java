package com.lxisoft.byta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lxisoft.byta.model.Disease;
/**
 * 
 * Disease Repository which extends Jpa Repository to communicate with Database
 * @author ARUN JOHNSON
 *
 */

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
	List<Disease> findBySymptoms_Symptom(String symptom);
	

}
