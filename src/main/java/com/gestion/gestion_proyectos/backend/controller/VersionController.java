package com.gestion.gestion_proyectos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.gestion_proyectos.backend.entity.Version;
import com.gestion.gestion_proyectos.backend.service.VersionService;

@RestController
@RequestMapping("/versiones")
public class VersionController {
    
    @Autowired
    private VersionService versionService;

    @PostMapping
    public ResponseEntity<Version> createVersion(@RequestBody Version version) {
        return ResponseEntity.ok(versionService.createVersion(version));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Version> getVersion(@PathVariable Long id) {
        return versionService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/documento/{documentoId}")
    public ResponseEntity<List<Version>> getVersionesByDocumento(@PathVariable Long documentoId) {
        return ResponseEntity.ok(versionService.findByDocumento(documentoId));
    }

    @GetMapping("/documento/{documentoId}/ultima")
    public ResponseEntity<Version> getUltimaVersion(@PathVariable Long documentoId) {
        return versionService.findLatestVersion(documentoId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVersion(@PathVariable Long id) {
        versionService.deleteVersion(id);
        return ResponseEntity.ok().build();
    }
}