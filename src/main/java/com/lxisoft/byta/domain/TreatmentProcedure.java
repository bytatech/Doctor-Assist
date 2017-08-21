package com.lxisoft.byta.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TreatmentProcedure.
 */
@Entity
@Table(name = "treatment_procedure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TreatmentProcedure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "treatmentProcedure")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Medicine> medicines = new HashSet<>();

    @OneToMany(mappedBy = "treatmentProcedure")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DiagnosticTest> diagnosticTests = new HashSet<>();

    @ManyToOne
    private Disease disease;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TreatmentProcedure name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Medicine> getMedicines() {
        return medicines;
    }

    public TreatmentProcedure medicines(Set<Medicine> medicines) {
        this.medicines = medicines;
        return this;
    }

    public TreatmentProcedure addMedicine(Medicine medicine) {
        this.medicines.add(medicine);
        medicine.setTreatmentProcedure(this);
        return this;
    }

    public TreatmentProcedure removeMedicine(Medicine medicine) {
        this.medicines.remove(medicine);
        medicine.setTreatmentProcedure(null);
        return this;
    }

    public void setMedicines(Set<Medicine> medicines) {
        this.medicines = medicines;
    }

    public Set<DiagnosticTest> getDiagnosticTests() {
        return diagnosticTests;
    }

    public TreatmentProcedure diagnosticTests(Set<DiagnosticTest> diagnosticTests) {
        this.diagnosticTests = diagnosticTests;
        return this;
    }

    public TreatmentProcedure addDiagnosticTest(DiagnosticTest diagnosticTest) {
        this.diagnosticTests.add(diagnosticTest);
        diagnosticTest.setTreatmentProcedure(this);
        return this;
    }

    public TreatmentProcedure removeDiagnosticTest(DiagnosticTest diagnosticTest) {
        this.diagnosticTests.remove(diagnosticTest);
        diagnosticTest.setTreatmentProcedure(null);
        return this;
    }

    public void setDiagnosticTests(Set<DiagnosticTest> diagnosticTests) {
        this.diagnosticTests = diagnosticTests;
    }

    public Disease getDisease() {
        return disease;
    }

    public TreatmentProcedure disease(Disease disease) {
        this.disease = disease;
        return this;
    }

    public void setDisease(Disease disease) {
        this.disease = disease;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TreatmentProcedure treatmentProcedure = (TreatmentProcedure) o;
        if (treatmentProcedure.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), treatmentProcedure.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TreatmentProcedure{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
