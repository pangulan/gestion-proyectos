package com.gestion.gestion_proyectos.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.gestion_proyectos.backend.entity.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    List<Documento> findByTareaId(Long tareaId);
    Optional<Documento> findByCodigoAndTareaProyectoId(String codigo, Long proyectoId);
    List<Documento> findByTipo(String tipo);
}