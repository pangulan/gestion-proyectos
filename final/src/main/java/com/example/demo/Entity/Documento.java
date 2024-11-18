package com.example.demo.Entity;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "documentos")
@CrossOrigin(origins = "*")

public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String descripcion;
    private String tipo;

    @Column(name = "ruta_archivo")
    private String rutaArchivo;

    @ManyToOne
    @JoinColumn(name = "tarea_id")
    @JsonManagedReference
    private Tarea tarea;

    @OneToMany(mappedBy = "documento")
    private List<Version> versiones;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Tarea getTarea() {
        return this.tarea;
    }

    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }

    public List<Version> getVersiones() {
        return this.versiones;
    }

    public void setVersiones(List<Version> versiones) {
        this.versiones = versiones;
    }

    public String getRutaArchivo() {
        return rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

}