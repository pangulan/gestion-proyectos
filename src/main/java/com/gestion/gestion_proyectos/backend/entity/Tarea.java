package com.gestion.gestion_proyectos.backend.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import lombok.Data;

@Entity
@Table(name = "tareas")
@Data
public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String tipo;

    @Column(name = "fecha_inicio_estimada")
    private LocalDate fechaInicioEstimada;

    @Column(name = "fecha_inicio_real")
    private LocalDate fechaInicioReal;

    @Column(name = "duracion_estimada")
    private Integer duracionEstimada;

    @Column(name = "duracion_real")
    private Integer duracionReal;

    @ManyToOne
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @ManyToMany
    @JoinTable(
        name = "tarea_empleado",
        joinColumns = @JoinColumn(name = "id_tarea"),
        inverseJoinColumns = @JoinColumn(name = "id_empleado")
    )
    private List<Empleado> empleadosAsignados;

    @OneToMany(mappedBy = "tarea", cascade = CascadeType.ALL)
    private List<Documento> documentos;
}