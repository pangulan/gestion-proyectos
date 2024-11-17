// src/main/java/com/example/demo/Controller/DocumentoController.java
package com.example.demo.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.Documento;
import com.example.demo.Services.DocumentoService;
import com.example.demo.dto.DocumentoDownloadDTO;

@RestController
@RequestMapping("/api/documentos")
@CrossOrigin(origins = "*")
public class DocumentoController {
    @Autowired
    private DocumentoService documentoService;

    @PostMapping("/upload")
    public ResponseEntity<Documento> subirDocumento(
            @RequestParam("file") MultipartFile file,
            @RequestParam("tareaId") Long tareaId,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipo") String tipo,
            @RequestParam("codigo") String codigo) {
        try {
            Documento documento = documentoService.subirDocumento(file, tareaId, descripcion, tipo, codigo);
            return ResponseEntity.ok(documento);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> descargarDocumento(@PathVariable Long id) {
        try {
            DocumentoDownloadDTO downloadDTO = documentoService.descargarDocumento(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(downloadDTO.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + downloadDTO.getFileName() + "\"")
                    .body(downloadDTO.getResource());
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tarea/{tareaId}")
    public ResponseEntity<List<Documento>> obtenerDocumentosPorTarea(@PathVariable Long tareaId) {
        return ResponseEntity.ok(documentoService.obtenerDocumentosPorTarea(tareaId));
    }
}