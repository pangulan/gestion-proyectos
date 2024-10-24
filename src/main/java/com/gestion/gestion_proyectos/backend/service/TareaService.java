package com.gestion.gestion_proyectos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Tarea;
import com.gestion.gestion_proyectos.backend.repository.TareaRepository;

@Service
public class TareaService {
    
    @Autowired
    private TareaRepository tareaRepository;
    
    public Tarea createTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }
    
    public Optional<Tarea> findById(Long id) {
        return tareaRepository.findById(id);
    }
    
    public List<Tarea> findByProyecto(Long proyectoId) {
        return tareaRepository.findByProyectoId(proyectoId);
    }
    
    public List<Tarea> findTareasPendientes() {
        return tareaRepository.findTareasPendientes();
    }
    
    public List<Tarea> findTareasEnProgresoByProyecto(Long proyectoId) {
        return tareaRepository.findTareasEnProgresoByProyecto(proyectoId);
    }
    
    public Tarea updateTarea(Long id, Tarea tareaDetails) {
        return tareaRepository.findById(id)
            .map(tarea -> {
                tarea.setDescripcion(tareaDetails.getDescripcion());
                tarea.setTipo(tareaDetails.getTipo());
                tarea.setFechaInicioEstimada(tareaDetails.getFechaInicioEstimada());
                tarea.setFechaInicioReal(tareaDetails.getFechaInicioReal());
                tarea.setDuracionEstimada(tareaDetails.getDuracionEstimada());
                tarea.setDuracionReal(tareaDetails.getDuracionReal());
                tarea.setEmpleadosAsignados(tareaDetails.getEmpleadosAsignados());
                return tareaRepository.save(tarea);
            })
            .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
    }
    
    public void deleteTarea(Long id) {
        tareaRepository.findById(id)
            .ifPresent(tarea -> tareaRepository.delete(tarea));
    }
}