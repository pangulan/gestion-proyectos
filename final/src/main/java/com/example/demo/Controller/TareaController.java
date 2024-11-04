package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Tarea;
import com.example.demo.Services.TareaService;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {
    @Autowired
    private TareaService tareaService;

    @PostMapping
    public ResponseEntity<Tarea> crearTarea(@RequestBody Tarea tarea) {
        return ResponseEntity.ok(tareaService.guardarTarea(tarea));
    }
}
