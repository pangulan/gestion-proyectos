package com.gestion.gestion_proyectos.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "proyectos")
@Data
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_nombre", unique = true, nullable = false)
    private String codigoNombre;

    @Column(name = "nombre_comercial", nullable = false)
    private String nombreComercial;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_coordinador", nullable = false)
    private Empleado coordinador;

    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    private List<Tarea> tareas;
}