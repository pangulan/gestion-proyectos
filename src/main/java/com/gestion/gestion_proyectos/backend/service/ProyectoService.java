package com.gestion.gestion_proyectos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Proyecto;
import com.gestion.gestion_proyectos.backend.repository.ProyectoRepository;

@Service
public class ProyectoService {
    
    @Autowired
    private ProyectoRepository proyectoRepository;
    
    public Proyecto createProyecto(Proyecto proyecto) {
        if (proyectoRepository.existsByCodigoNombre(proyecto.getCodigoNombre())) {
            throw new RuntimeException("El código nombre del proyecto ya existe");
        }
        return proyectoRepository.save(proyecto);
    }
    
    public Optional<Proyecto> findById(Long id) {
        return proyectoRepository.findById(id);
    }
    
    public List<Proyecto> findAllProyectos() {
        return proyectoRepository.findAll();
    }
    
    public List<Proyecto> findActiveProyectos() {
        return proyectoRepository.findActiveProyectos();
    }
    
    public List<Proyecto> findProyectosByEstado(String estado) {
        return proyectoRepository.findByEstado(estado);
    }
    
    public List<Proyecto> findProyectosByCoordinador(Long coordinadorId) {
        return proyectoRepository.findByCoordinadorId(coordinadorId);
    }
    
    public Proyecto updateProyecto(Long id, Proyecto proyectoDetails) {
        return proyectoRepository.findById(id)
            .map(proyecto -> {
                proyecto.setNombreComercial(proyectoDetails.getNombreComercial());
                proyecto.setEstado(proyectoDetails.getEstado());
                proyecto.setFechaFin(proyectoDetails.getFechaFin());
                proyecto.setCoordinador(proyectoDetails.getCoordinador());
                return proyectoRepository.save(proyecto);
            })
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    }
    
    public void deleteProyecto(Long id) {
        proyectoRepository.findById(id)
            .ifPresent(proyecto -> proyectoRepository.delete(proyecto));
    }
}