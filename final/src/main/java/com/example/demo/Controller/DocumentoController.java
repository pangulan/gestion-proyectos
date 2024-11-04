package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Documento;
import com.example.demo.Services.DocumentoService;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {
    @Autowired
    private DocumentoService documentoService;

    @PostMapping
    public ResponseEntity<Documento> crearDocumento(@RequestBody Documento documento) {
        return ResponseEntity.ok(documentoService.guardarDocumento(documento));
    }
}
