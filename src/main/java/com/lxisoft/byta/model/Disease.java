package com.lxisoft.byta.model;

import java.util.HashSet;
import java.util.Set;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import lombok.Data;

/**
 * This is a model class which is used to collect Disease details
 * 
 * 
 * @author ARUN JOHNSON
 *
 */
@Data
@NodeEntity(label = "DISEASE")
public class Disease {

	private @GraphId Long id;

	private String name;
	private  @Relationship(type = "SYMPTOM_OF" , direction = Relationship.INCOMING) Set<Symptom> symptom = new HashSet<Symptom>();

	
	

	

}
