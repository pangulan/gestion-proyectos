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

import com.gestion.gestion_proyectos.backend.entity.Proyecto;
import com.gestion.gestion_proyectos.backend.service.ProyectoService;

@RestController
@RequestMapping("/proyectos")
public class ProyectoController {
    
    @Autowired
    private ProyectoService proyectoService;

    @PostMapping
    public ResponseEntity<Proyecto> createProyecto(@RequestBody Proyecto proyecto) {
        return ResponseEntity.ok(proyectoService.createProyecto(proyecto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> getProyecto(@PathVariable Long id) {
        return proyectoService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Proyecto>> getAllProyectos() {
        return ResponseEntity.ok(proyectoService.findAllProyectos());
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Proyecto>> getProyectosActivos() {
        return ResponseEntity.ok(proyectoService.findActiveProyectos());
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Proyecto>> getProyectosByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(proyectoService.findProyectosByEstado(estado));
    }

    @GetMapping("/coordinador/{coordinadorId}")
    public ResponseEntity<List<Proyecto>> getProyectosByCoordinador(@PathVariable Long coordinadorId) {
        return ResponseEntity.ok(proyectoService.findProyectosByCoordinador(coordinadorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proyecto> updateProyecto(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        return ResponseEntity.ok(proyectoService.updateProyecto(id, proyecto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProyecto(@PathVariable Long id) {
        proyectoService.deleteProyecto(id);
        return ResponseEntity.ok().build();
    }
}