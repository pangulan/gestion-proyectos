package com.example.demo.Entity;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tareas")
@CrossOrigin(origins = "*")
public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private String tipo;
    private Date fechaInicioEstimada;
    private Date fechaInicioReal;
    private Integer duracionEstimada;
    private Integer duracionReal;

    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private Proyecto proyecto;

    @OneToMany(mappedBy = "tarea")
    private List<Documento> documentos;

    @ManyToMany
    @JoinTable(name = "tarea_usuario", joinColumns = @JoinColumn(name = "tarea_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> empleados;

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

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getFechaInicioEstimada() {
        return this.fechaInicioEstimada;
    }

    public void setFechaInicioEstimada(Date fechaInicioEstimada) {
        this.fechaInicioEstimada = fechaInicioEstimada;
    }

    public Date getFechaInicioReal() {
        return this.fechaInicioReal;
    }

    public void setFechaInicioReal(Date fechaInicioReal) {
        this.fechaInicioReal = fechaInicioReal;
    }

    public Integer getDuracionEstimada() {
        return this.duracionEstimada;
    }

    public void setDuracionEstimada(Integer duracionEstimada) {
        this.duracionEstimada = duracionEstimada;
    }

    public Integer getDuracionReal() {
        return this.duracionReal;
    }

    public void setDuracionReal(Integer duracionReal) {
        this.duracionReal = duracionReal;
    }

    public Proyecto getProyecto() {
        return this.proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public List<Documento> getDocumentos() {
        return this.documentos;
    }

    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }

    public List<Usuario> getEmpleados() {
        return this.empleados;
    }

    public void setEmpleados(List<Usuario> empleados) {
        this.empleados = empleados;
    }
}
