package com.lxisoft.byta.repository;

import com.lxisoft.byta.domain.TreatmentProcedure;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TreatmentProcedure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TreatmentProcedureRepository extends JpaRepository<TreatmentProcedure,Long> {
    
	List<TreatmentProcedure> findByDisease_name(String disease);
}
