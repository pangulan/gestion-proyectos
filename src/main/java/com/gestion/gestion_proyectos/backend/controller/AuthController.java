// src/main/java/com/gestion/gestion_proyectos/backend/controller/AuthController.java
package com.gestion.gestion_proyectos.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gestion.gestion_proyectos.backend.service.AuthService;
import com.gestion.gestion_proyectos.backend.dto.LoginRequest;
import com.gestion.gestion_proyectos.backend.dto.AuthResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController{

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.login(
                loginRequest.getUsername(), 
                loginRequest.getPassword()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}