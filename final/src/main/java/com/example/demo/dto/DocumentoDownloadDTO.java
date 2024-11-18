package com.example.demo.dto;

import org.springframework.core.io.Resource;

public class DocumentoDownloadDTO {
    private final Resource resource;
    private final String contentType;
    private final String fileName;

    public DocumentoDownloadDTO(Resource resource, String contentType, String fileName) {
        this.resource = resource;
        this.contentType = contentType;
        this.fileName = fileName;
    }

    public Resource getResource() {
        return resource;
    }

    public String getContentType() {
        return contentType;
    }

    public String getFileName() {
        return fileName;
    }
}
