package com.example.demo.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Proyecto;

@Repository

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}
