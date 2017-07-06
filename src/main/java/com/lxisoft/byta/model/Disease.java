package com.lxisoft.byta.model;

import java.util.List;
import javax.persistence.*;
import lombok.Data;

/**
 * This is a model class which is used to collect Disease details
 * 
 * 
 * @author ARUN JOHNSON
 *
 */
@Entity
@Data
public class Disease {

	@Id
	private long id;
	private String disease;
	/**
	 * A relationship established between Symptoms. It is a many to many
	 * relationship .
	 */
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "disease_symptoms", joinColumns = @JoinColumn(name = "disease_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "symptoms_id", referencedColumnName = "id"))
	List<Symptoms> symptoms;

	/**
	 * SELF JOINING relation
	 */
	@ManyToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "symptomaticDiseaseId")
	private Disease symptamaticDiseases;

	

}
