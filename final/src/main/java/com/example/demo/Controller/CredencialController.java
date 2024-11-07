package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Credencial;
import com.example.demo.Services.CredencialService;

@RestController
@RequestMapping("/api/credenciales")
@CrossOrigin(origins = "*")

public class CredencialController {
    @Autowired
    private CredencialService credencialService;

    @PostMapping
    public ResponseEntity<Credencial> crearCredencial(@RequestBody Credencial credencial) {
        return ResponseEntity.ok(credencialService.guardarCredencial(credencial));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credencial credencial) {
        // Verificamos las credenciales proporcionadas
        Credencial credencialEncontrada = credencialService.verificarCredenciales(
                credencial.getUsername(), credencial.getPassword());

        if (credencialEncontrada != null) {
            // Si las credenciales son correctas, devolvemos un 200 OK y el usuario
            // autenticado
            return ResponseEntity.ok(credencialEncontrada);
        } else {
            // Si las credenciales son incorrectas, devolvemos un 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

}
