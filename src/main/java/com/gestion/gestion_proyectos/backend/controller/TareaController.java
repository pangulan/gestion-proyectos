package com.gestion.gestion_proyectos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.gestion_proyectos.backend.entity.Tarea;
import com.gestion.gestion_proyectos.backend.service.TareaService;

@RestController
@RequestMapping("/tareas")
public class TareaController {
    
    @Autowired
    private TareaService tareaService;

    @PostMapping
    public ResponseEntity<Tarea> createTarea(@RequestBody Tarea tarea) {
        return ResponseEntity.ok(tareaService.createTarea(tarea));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarea> getTarea(@PathVariable Long id) {
        return tareaService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<Tarea>> getTareasByProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(tareaService.findByProyecto(proyectoId));
    }

    @GetMapping("/pendientes")
    public ResponseEntity<List<Tarea>> getTareasPendientes() {
        return ResponseEntity.ok(tareaService.findTareasPendientes());
    }

    @GetMapping("/en-progreso/proyecto/{proyectoId}")
    public ResponseEntity<List<Tarea>> getTareasEnProgresoByProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(tareaService.findTareasEnProgresoByProyecto(proyectoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> updateTarea(@PathVariable Long id, @RequestBody Tarea tarea) {
        return ResponseEntity.ok(tareaService.updateTarea(id, tarea));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        tareaService.deleteTarea(id);
        return ResponseEntity.ok().build();
    }
}