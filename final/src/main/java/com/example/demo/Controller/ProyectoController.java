package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Proyecto;
import com.example.demo.Services.ProyectoService;

@RestController
@RequestMapping("/api/proyectos")

public class ProyectoController {
    @Autowired
    private ProyectoService proyectoService;

    @PostMapping
    public ResponseEntity<Proyecto> crearProyecto(@RequestBody Proyecto proyecto) {
        return ResponseEntity.ok(proyectoService.guardarProyecto(proyecto));
    }
}
