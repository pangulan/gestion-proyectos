package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Credencial;
import com.example.demo.Services.CredencialService;

@RestController
@RequestMapping("/api/credenciales")
public class CredencialController {
    @Autowired
    private CredencialService credencialService;

    @PostMapping
    public ResponseEntity<Credencial> crearCredencial(@RequestBody Credencial credencial) {
        return ResponseEntity.ok(credencialService.guardarCredencial(credencial));
    }
}
