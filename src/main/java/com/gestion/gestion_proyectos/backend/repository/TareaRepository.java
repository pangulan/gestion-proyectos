package com.gestion.gestion_proyectos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestion.gestion_proyectos.backend.entity.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByProyectoId(Long proyectoId);
    
    @Query("SELECT t FROM Tarea t WHERE t.fechaInicioReal IS NULL")
    List<Tarea> findTareasPendientes();
    
    @Query("SELECT t FROM Tarea t WHERE t.proyecto.id = :proyectoId AND t.fechaInicioReal IS NOT NULL")
    List<Tarea> findTareasEnProgresoByProyecto(Long proyectoId);
}