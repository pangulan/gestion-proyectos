package com.gestion.gestion_proyectos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestion.gestion_proyectos.backend.entity.Proyecto;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    Boolean existsByCodigoNombre(String codigoNombre);
    List<Proyecto> findByEstado(String estado);
    List<Proyecto> findByCoordinadorId(Long coordinadorId);
    
    @Query("SELECT p FROM Proyecto p WHERE p.estado = 'ACTIVO'")
    List<Proyecto> findActiveProyectos();
}