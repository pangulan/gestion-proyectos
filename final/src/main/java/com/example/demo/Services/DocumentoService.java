package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Documento;
import com.example.demo.Repository.DocumentoRepository;

@Service
public class DocumentoService {
    @Autowired
    private DocumentoRepository documentoRepository;

    public Documento guardarDocumento(Documento documento) {
        return documentoRepository.save(documento);
    }
    // Métodos adicionales según sea necesario
}
