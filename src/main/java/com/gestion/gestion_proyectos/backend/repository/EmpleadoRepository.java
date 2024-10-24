package com.gestion.gestion_proyectos.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestion.gestion_proyectos.backend.entity.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByDocumento(String documento);
    Optional<Empleado> findByCorreo(String correo);
    Boolean existsByDocumento(String documento);
    Boolean existsByCorreo(String correo);

    @Query("SELECT e FROM Empleado e WHERE e.fechaContratacion <= CURRENT_DATE AND e.id NOT IN (SELECT p.coordinador.id FROM Proyecto p)")
    List<Empleado> findAvailableEmpleados();
}