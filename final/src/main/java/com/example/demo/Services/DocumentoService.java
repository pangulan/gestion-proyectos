// src/main/java/com/example/demo/Services/DocumentoService.java
package com.example.demo.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.Documento;
import com.example.demo.Entity.Tarea;
import com.example.demo.Repository.DocumentoRepository;
import com.example.demo.Repository.TareaRepository;
import com.example.demo.dto.DocumentoDownloadDTO;

@Service
public class DocumentoService {
    @Value("${app.upload.dir:${user.home}/uploads}")
    private String uploadDir;

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private TareaRepository tareaRepository;

    private final Path rootPath = Paths.get("uploads");

    public Documento subirDocumento(MultipartFile file, Long tareaId, String descripcion,
            String tipo, String codigo) throws IOException {
        // Crear directorio si no existe
        Path directorioUpload = Paths.get(uploadDir);
        if (!Files.exists(directorioUpload)) {
            Files.createDirectories(directorioUpload);
        }

        // Generar nombre único para el archivo
        String nombreArchivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path rutaArchivo = directorioUpload.resolve(nombreArchivo);

        // Guardar archivo físicamente
        Files.copy(file.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

        // Crear entidad Documento
        Documento documento = new Documento();
        documento.setCodigo(codigo);
        documento.setDescripcion(descripcion);
        documento.setTipo(tipo);
        documento.setRutaArchivo(rutaArchivo.toString());

        // Obtener y asignar la tarea
        Tarea tarea = tareaRepository.findById(tareaId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
        documento.setTarea(tarea);

        return documentoRepository.save(documento);
    }

    public DocumentoDownloadDTO descargarDocumento(Long id) throws IOException {
        Documento documento = documentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        Path path = Paths.get(documento.getRutaArchivo());
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() || resource.isReadable()) {
            return new DocumentoDownloadDTO(
                    resource,
                    documento.getTipo(),
                    path.getFileName().toString());
        } else {
            throw new RuntimeException("No se puede leer el archivo");
        }
    }

    public Documento obtenerDocumentoPorId(Long id) {
        return documentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado con ID: " + id));
    }

    public List<Documento> obtenerTodosLosDocumentos() {
        return documentoRepository.findAll();
    }

    public Documento obtenerDocumentoPorCodigo(String codigo) {
        return documentoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado con código: " + codigo));
    }

    @Value("${app.upload.dir}")
    public Resource obtenerRecursoDesdeRuta(Path filePath) throws IOException {
        // Verificar y crear directorio si no existe
        if (!Files.exists(filePath.getParent())) {
            try {
                Files.createDirectories(filePath.getParent());
            } catch (IOException e) {
                throw new IOException("No se pudo crear el directorio: " + filePath.getParent(), e);
            }
        }

        // Verificar si el archivo existe y es legible
        if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
            throw new IOException("No se puede leer el archivo en la ruta especificada: " + filePath);
        }

        return new UrlResource(filePath.toUri());
    }

}