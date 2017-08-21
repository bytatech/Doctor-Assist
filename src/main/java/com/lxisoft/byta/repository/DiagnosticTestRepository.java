package com.lxisoft.byta.repository;

import com.lxisoft.byta.domain.DiagnosticTest;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DiagnosticTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiagnosticTestRepository extends JpaRepository<DiagnosticTest,Long> {
    
}
