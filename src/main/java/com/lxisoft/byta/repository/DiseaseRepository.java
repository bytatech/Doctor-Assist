package com.lxisoft.byta.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import com.lxisoft.byta.model.Disease;

/**
 * 
 * Disease Repository which extends Jpa Repository to communicate with Database
 * 
 * @author ARUN JOHNSON
 *
 */
@PreAuthorize("hasRole('ROLE_DOCTOR')")
public interface DiseaseRepository extends GraphRepository<Disease> {

	@PreAuthorize("hasRole('ROLE_DOCTOR')")
	public List<Disease> findAll();

}
