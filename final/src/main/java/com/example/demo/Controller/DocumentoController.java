package com.example.demo.Controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import com.example.demo.dto.DocumentoDTO;

@RestController
@RequestMapping("/api/documentos")
@CrossOrigin(origins = "*")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    private final Path rootPath = Paths.get("C:/Users/USUARIO/OneDrive/ARES/gestion-proyectos/final/uploads");

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> subirDocumento(
            @RequestParam("file") MultipartFile file,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipo") String tipo,
            @RequestParam("codigo") String codigo) {
        try {
            Long tareaId = 1L;

            Documento documento = documentoService.subirDocumento(file, tareaId, descripcion, tipo, codigo);

            Map<String, Object> response = new HashMap<>();
            response.put("id", documento.getId());
            response.put("codigo", documento.getCodigo());
            response.put("descripcion", documento.getDescripcion());
            response.put("tipo", documento.getTipo());
            response.put("rutaArchivo", documento.getRutaArchivo());
            response.put("tareaId", documento.getTarea().getId());

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al procesar el archivo");
            errorResponse.put("details", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error interno");
            errorResponse.put("details", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/descargar/{codigo}")
    public ResponseEntity<?> descargarDocumentoPorCodigo(@PathVariable("codigo") String codigo) {
        try {
            Documento documento = documentoService.obtenerDocumentoPorCodigo(codigo);

            Path filePath = Paths.get(documento.getRutaArchivo()).normalize();
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
                throw new RuntimeException("El archivo no existe o no se puede leer: " + filePath);
            }

            Resource resource = new UrlResource(filePath.toUri());
            String contentDisposition = "attachment; filename=\"" + documento.getDescripcion() + "\"";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .contentType(MediaType.parseMediaType(documento.getTipo()))
                    .body(resource);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al descargar el archivo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error inesperado al procesar la solicitud");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<List<DocumentoDTO>> obtenerTodosLosDocumentos() {
        try {
            List<DocumentoDTO> documentos = documentoService.obtenerTodosLosDocumentos()
                    .stream()
                    .map(DocumentoDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(documentos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/ver/{codigo}")
    public ResponseEntity<?> visualizarDocumentoPorCodigo(@PathVariable("codigo") String codigo) {
        try {
            // Buscar documento por código
            Documento documento = documentoService.obtenerDocumentoPorCodigo(codigo);

            // Obtener la ruta del archivo
            Path filePath = Paths.get(documento.getRutaArchivo()).normalize();
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
                throw new RuntimeException("El archivo no existe o no se puede leer: " + filePath);
            }

            // Crear el recurso a partir de la ruta del archivo
            Resource resource = new UrlResource(filePath.toUri());

            // Configurar encabezado para visualizar inline
            String contentDisposition = "inline; filename=\"" + documento.getDescripcion() + "\"";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .contentType(MediaType.parseMediaType(documento.getTipo()))
                    .body(resource);

        } catch (RuntimeException e) {
            // Manejo de errores específicos
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al visualizar el archivo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (Exception e) {
            // Manejo de errores generales
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error inesperado al procesar la solicitud");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
