package com.example.demo.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Documento;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {
}
