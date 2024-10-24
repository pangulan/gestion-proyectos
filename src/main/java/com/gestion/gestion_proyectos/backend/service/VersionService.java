package com.gestion.gestion_proyectos.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Version;
import com.gestion.gestion_proyectos.backend.repository.VersionRepository;

@Service
public class VersionService {
    
    @Autowired
    private VersionRepository versionRepository;
    
    public Version createVersion(Version version) {
        version.setFecha(LocalDateTime.now());
        return versionRepository.save(version);
    }
    
    public Optional<Version> findById(Long id) {
        return versionRepository.findById(id);
    }
    
    public List<Version> findByDocumento(Long documentoId) {
        return versionRepository.findByDocumentoId(documentoId);
    }
    
    public Optional<Version> findLatestVersion(Long documentoId) {
        return versionRepository.findLatestVersion(documentoId);
    }
    
    public void deleteVersion(Long id) {
        versionRepository.findById(id)
            .ifPresent(version -> versionRepository.delete(version));
    }
}