package com.lxisoft.byta.model;

import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Disease {

	@Id
	private long id;
	private String disease;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "disease_symptoms", joinColumns = @JoinColumn(name = "disease_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "symptoms_id", referencedColumnName = "id"))
	List<Symptoms> symptom;
	
	/*@ManyToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "symptamaticDisease_id")
	private Disease symptamaticDisease;

	@OneToMany(mappedBy = "symptamaticDisease")
	private List<Disease> subordinatesiseases;
*/

}
