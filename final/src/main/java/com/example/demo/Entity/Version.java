package com.example.demo.Entity;

import java.util.Date;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "versiones")
@CrossOrigin(origins = "*")
@Entity
public class Version {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private Date fecha;
    private String archivo;

    @ManyToOne
    @JoinColumn(name = "documento_id")
    private Documento documento;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFecha() {
        return this.fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getArchivo() {
        return this.archivo;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public Documento getDocumento() {
        return this.documento;
    }

    public void setDocumento(Documento documento) {
        this.documento = documento;
    }
}
