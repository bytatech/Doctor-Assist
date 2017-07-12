package com.lxisoft.byta.model;



import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;

import lombok.Data;

/**
 * A model class to collect Symptoms
 * 
 * @author ARUN JOHNSON
 *
 */
@Data
@NodeEntity(label = "SYMPTOM")
public class Symptom  {

	private @GraphId Long id;
	private String name;


}
