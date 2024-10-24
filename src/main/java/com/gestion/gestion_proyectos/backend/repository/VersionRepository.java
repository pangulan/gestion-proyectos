package com.gestion.gestion_proyectos.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestion.gestion_proyectos.backend.entity.Version;

public interface VersionRepository extends JpaRepository<Version, Long> {
    List<Version> findByDocumentoId(Long documentoId);
    
    @Query("SELECT v FROM Version v WHERE v.documento.id = :documentoId ORDER BY v.fecha DESC LIMIT 1")
    Optional<Version> findLatestVersion(Long documentoId);
}