package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Proyecto;
import com.example.demo.Repository.ProyectoRepository;

@Service
public class ProyectoService {
    @Autowired
    private ProyectoRepository proyectoRepository;

    public Proyecto guardarProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }
    // Métodos adicionales según sea necesario
}
