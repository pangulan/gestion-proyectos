package com.example.demo.Entity;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
@CrossOrigin(origins = "*")

public class Usuario {
    @Id
    @Column(name = "identificacion")
    private int id;
    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;
    private String correoElectronico;
    private Date fechaContratacion;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Credencial credencial;

    @ManyToMany(mappedBy = "empleados")
    private List<Tarea> tareas;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreoElectronico() {
        return this.correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public Date getFechaContratacion() {
        return this.fechaContratacion;
    }

    public void setFechaContratacion(Date fechaContratacion) {
        this.fechaContratacion = fechaContratacion;
    }

    public Credencial getCredencial() {
        return this.credencial;
    }

    public void setCredencial(Credencial credencial) {
        this.credencial = credencial;
    }

    public List<Tarea> getTareas() {
        return this.tareas;
    }

    public void setTareas(List<Tarea> tareas) {
        this.tareas = tareas;
    }
}