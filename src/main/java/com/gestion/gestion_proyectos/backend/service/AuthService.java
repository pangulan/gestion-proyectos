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
            
            usuario.getId(),
            usuario.getUsuario(),
            usuario.getRol()
        );
        
    }
}