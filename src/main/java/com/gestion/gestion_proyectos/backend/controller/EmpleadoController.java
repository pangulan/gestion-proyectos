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

import com.gestion.gestion_proyectos.backend.entity.Empleado;
import com.gestion.gestion_proyectos.backend.service.EmpleadoService;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    
    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping
    public ResponseEntity<Empleado> createEmpleado(@RequestBody Empleado empleado) {
        return ResponseEntity.ok(empleadoService.createEmpleado(empleado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleado(@PathVariable Long id) {
        return empleadoService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Empleado>> getAllEmpleados() {
        return ResponseEntity.ok(empleadoService.findAll());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Empleado>> getEmpleadosDisponibles() {
        return ResponseEntity.ok(empleadoService.findAvailableEmpleados());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) {
        return ResponseEntity.ok(empleadoService.updateEmpleado(id, empleado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        empleadoService.deleteEmpleado(id);
        return ResponseEntity.ok().build();
    }
}