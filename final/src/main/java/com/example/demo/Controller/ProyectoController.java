package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Proyecto;
import com.example.demo.Services.ProyectoService;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")

public class ProyectoController {
    @Autowired
    private ProyectoService proyectoService;

    @PostMapping("/crearProyecto")
    public ResponseEntity<Proyecto> crearProyecto(@RequestBody Proyecto proyecto) {
        Proyecto nuevoProyecto = proyectoService.crearProyecto(proyecto);
        return new ResponseEntity<>(nuevoProyecto, HttpStatus.CREATED);
    }

    @GetMapping("/listarProyectos")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        List<Proyecto> proyectos = proyectoService.obtenerTodosLosProyectos();
        proyectos.forEach(proyecto -> System.out.println(proyecto.getNombreClave()));
        return ResponseEntity.ok(proyectos);
    }

}
