// src/main/java/com/gestion/gestion_proyectos/backend/service/AuthService.java
package com.gestion.gestion_proyectos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.dto.AuthResponse;
import com.gestion.gestion_proyectos.backend.dto.UserDetailsDTO;
import com.gestion.gestion_proyectos.backend.entity.Usuario;
import com.gestion.gestion_proyectos.backend.repository.UsuarioRepository;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public AuthResponse login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsuario(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!password.equals(usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = generateToken(usuario); // Simulamos un token por ahora
        UserDetailsDTO userDetails = getUserDetails(username);
        
        return new AuthResponse(token, userDetails);
    }

    public UserDetailsDTO getUserDetails(String username) {
        Usuario usuario = usuarioRepository.findByUsuario(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
        return new UserDetailsDTO(
            usuario.getId(),
            usuario.getUsuario(),
            usuario.getRol()
        );
    }

    private String generateToken(Usuario usuario) {
        // En un caso real, aquí generarías un JWT
        return "token_" + usuario.getId() + "_" + System.currentTimeMillis();
    }
}