package com.example.demo.dto;

import com.example.demo.Entity.Documento;

public class DocumentoDTO {
    private Long id;
    private String codigo;
    private String descripcion;
    private String tipo;
    private String rutaArchivo;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getRutaArchivo() {
        return this.rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public DocumentoDTO(Documento documento) {
        this.id = documento.getId();
        this.codigo = documento.getCodigo();
        this.descripcion = documento.getDescripcion();
        this.tipo = documento.getTipo();
        this.rutaArchivo = documento.getRutaArchivo();
    }

    // Getters y setters
}
