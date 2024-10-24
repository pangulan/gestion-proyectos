package com.gestion.gestion_proyectos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Empleado;
import com.gestion.gestion_proyectos.backend.repository.EmpleadoRepository;

@Service
public class EmpleadoService {
    
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    public Empleado createEmpleado(Empleado empleado) {
        if (empleadoRepository.existsByDocumento(empleado.getDocumento())) {
            throw new RuntimeException("Ya existe un empleado con ese documento");
        }
        if (empleadoRepository.existsByCorreo(empleado.getCorreo())) {
            throw new RuntimeException("Ya existe un empleado con ese correo");
        }
        return empleadoRepository.save(empleado);
    }
    
    public Optional<Empleado> findById(Long id) {
        return empleadoRepository.findById(id);
    }
    
    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }
    
    public List<Empleado> findAvailableEmpleados() {
        return empleadoRepository.findAvailableEmpleados();
    }
    
    public Empleado updateEmpleado(Long id, Empleado empleadoDetails) {
        return empleadoRepository.findById(id)
            .map(empleado -> {
                empleado.setNombre(empleadoDetails.getNombre());
                empleado.setApellidos(empleadoDetails.getApellidos());
                empleado.setDireccion(empleadoDetails.getDireccion());
                empleado.setTelefono(empleadoDetails.getTelefono());
                empleado.setCorreo(empleadoDetails.getCorreo());
                return empleadoRepository.save(empleado);
            })
            .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }
    
    public void deleteEmpleado(Long id) {
        empleadoRepository.findById(id)
            .ifPresent(empleado -> empleadoRepository.delete(empleado));
    }
}