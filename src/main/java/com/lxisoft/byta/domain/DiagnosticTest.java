package com.lxisoft.byta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DiagnosticTest.
 */
@Entity
@Table(name = "diagnostic_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DiagnosticTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private TreatmentProcedure treatmentProcedure;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DiagnosticTest name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TreatmentProcedure getTreatmentProcedure() {
        return treatmentProcedure;
    }

    public DiagnosticTest treatmentProcedure(TreatmentProcedure treatmentProcedure) {
        this.treatmentProcedure = treatmentProcedure;
        return this;
    }

    public void setTreatmentProcedure(TreatmentProcedure treatmentProcedure) {
        this.treatmentProcedure = treatmentProcedure;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DiagnosticTest diagnosticTest = (DiagnosticTest) o;
        if (diagnosticTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diagnosticTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiagnosticTest{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
