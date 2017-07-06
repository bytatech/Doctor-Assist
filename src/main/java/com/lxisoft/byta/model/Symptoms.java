package com.lxisoft.byta.model;


import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;


/**
 * A model class to collect Symptoms
 * 
 * @author ARUN JOHNSON
 *
 */
@Entity
@Data
public class Symptoms {

	
	@Id
	private long id ;
	private String symptom ;

}
