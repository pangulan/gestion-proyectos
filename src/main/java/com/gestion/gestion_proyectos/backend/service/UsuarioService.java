package com.gestion.gestion_proyectos.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.gestion_proyectos.backend.entity.Usuario;
import com.gestion.gestion_proyectos.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Usuario createUsuario(Usuario usuario) {
        if (usuarioRepository.existsByUsuario(usuario.getUsuario())) {
            throw new RuntimeException("El usuario ya existe");
        }
        return usuarioRepository.save(usuario);
    }
    
    public Optional<Usuario> findByUsuario(String usuario) {
        return usuarioRepository.findByUsuario(usuario);
    }
    
    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        return usuarioRepository.findById(id)
            .map(usuario -> {
                usuario.setUsuario(usuarioDetails.getUsuario());
                usuario.setPassword(usuarioDetails.getPassword());
                usuario.setRol(usuarioDetails.getRol());
                return usuarioRepository.save(usuario);
            })
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    
    public void deleteUsuario(Long id) {
        usuarioRepository.findById(id)
            .ifPresent(usuario -> usuarioRepository.delete(usuario));
    }
}