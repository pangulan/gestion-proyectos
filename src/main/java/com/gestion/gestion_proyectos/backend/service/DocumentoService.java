package com.gestion.gestion_proyectos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Documento;
import com.gestion.gestion_proyectos.backend.repository.DocumentoRepository;

@Service
public class DocumentoService {
    
    @Autowired
    private DocumentoRepository documentoRepository;
    
    public Documento createDocumento(Documento documento) {
        if (documentoRepository.findByCodigoAndTareaProyectoId(
            documento.getCodigo(), documento.getTarea().getProyecto().getId()).isPresent()) {
            throw new RuntimeException("Ya existe un documento con ese código en el proyecto");
        }
        return documentoRepository.save(documento);
    }
    
    public Optional<Documento> findById(Long id) {
        return documentoRepository.findById(id);
    }
    
    public List<Documento> findByTarea(Long tareaId) {
        return documentoRepository.findByTareaId(tareaId);
    }
    
    public List<Documento> findByTipo(String tipo) {
        return documentoRepository.findByTipo(tipo);
    }
    
    public Documento updateDocumento(Long id, Documento documentoDetails) {
        return documentoRepository.findById(id)
            .map(documento -> {
                documento.setDescripcion(documentoDetails.getDescripcion());
                documento.setTipo(documentoDetails.getTipo());
                return documentoRepository.save(documento);
            })
            .orElseThrow(() -> new RuntimeException("Documento no encontrado"));
    }
    
    public void deleteDocumento(Long id) {
        documentoRepository.findById(id)
            .ifPresent(documento -> documentoRepository.delete(documento));
    }
}