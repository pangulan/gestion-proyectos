package com.gestion.gestion_proyectos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.config.JwtConfig;
import com.gestion.gestion_proyectos.backend.dto.AuthResponse;
import com.gestion.gestion_proyectos.backend.dto.UserDetailsDTO;
import com.gestion.gestion_proyectos.backend.entity.Usuario;
import com.gestion.gestion_proyectos.backend.repository.UsuarioRepository;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtConfig jwtConfig;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public AuthResponse login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Usuario usuario = usuarioRepository.findByUsuario(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
        String token = jwtConfig.generateToken(userDetails);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(
            usuario.getId(),
            usuario.getUsuario(),
            usuario.getRol()
        );
        
        return new AuthResponse(token, userDetailsDTO);
    }
}