package com.gestion.gestion_proyectos.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetailsDTO {
    private Long id;
    private String username;
    private String role;
}