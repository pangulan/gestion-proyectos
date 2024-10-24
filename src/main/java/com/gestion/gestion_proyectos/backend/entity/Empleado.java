package com.gestion.gestion_proyectos.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "empleados")
@Data
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String documento;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellidos;

    private String direccion;
    private String telefono;

    @Column(name = "correo", unique = true, nullable = false)
    private String correo;

    @Column(name = "fecha_contratacion", nullable = false)
    private LocalDate fechaContratacion;

    @OneToMany(mappedBy = "coordinador")
    private List<Proyecto> proyectosCoordinados;

    @ManyToMany(mappedBy = "empleadosAsignados")
    private List<Tarea> tareasAsignadas;
}