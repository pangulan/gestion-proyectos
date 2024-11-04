package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Tarea;
import com.example.demo.Repository.TareaRepository;

@Service
public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;

    public Tarea guardarTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }
    // Métodos adicionales según sea necesario
}
