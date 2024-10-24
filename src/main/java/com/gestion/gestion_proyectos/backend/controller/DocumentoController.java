package com.gestion.gestion_proyectos.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.gestion_proyectos.backend.entity.Documento;
import com.gestion.gestion_proyectos.backend.service.DocumentoService;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {
    
    @Autowired
    private DocumentoService documentoService;

    @PostMapping
    public ResponseEntity<Documento> createDocumento(@RequestBody Documento documento) {
        return ResponseEntity.ok(documentoService.createDocumento(documento));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documento> getDocumento(@PathVariable Long id) {
        return documentoService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tarea/{tareaId}")
    public ResponseEntity<List<Documento>> getDocumentosByTarea(@PathVariable Long tareaId) {
        return ResponseEntity.ok(documentoService.findByTarea(tareaId));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Documento>> getDocumentosByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(documentoService.findByTipo(tipo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Documento> updateDocumento(@PathVariable Long id, @RequestBody Documento documento) {
        return ResponseEntity.ok(documentoService.updateDocumento(id, documento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumento(@PathVariable Long id) {
        documentoService.deleteDocumento(id);
        return ResponseEntity.ok().build();
    }
}