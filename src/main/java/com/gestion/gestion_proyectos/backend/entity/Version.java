package com.gestion.gestion_proyectos.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "versiones")
@Data
public class Version {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false)
    private String contenidoDigitalizado;

    @ManyToOne
    @JoinColumn(name = "id_documento", nullable = false)
    private Documento documento;
}