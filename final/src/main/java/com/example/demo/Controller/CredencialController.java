package com.example.demo.Controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
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
    public ResponseEntity<Map<String, String>> login(@RequestBody Credencial credencial) {
        Map<String, String> response = new HashMap<>();
        try {
            if (credencial.getUsername() == null || credencial.getPassword() == null) {
                response.put("message", "El nombre de usuario o la contraseña no pueden ser nulos.");
                return ResponseEntity.badRequest().body(response); // Devuelve un JSON con el mensaje de error
            }

            Credencial usuario = credencialService.verificarCredenciales(credencial.getUsername(),
                    credencial.getPassword());

            if (usuario != null) {
                response.put("message", "Inicio de sesión exitoso.");
                return ResponseEntity.ok(response); // Devuelve un JSON con el mensaje de éxito
            } else {
                response.put("message", "Nombre de usuario o contraseña incorrectos.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Devuelve un JSON con el mensaje
                                                                                      // de error
            }
        } catch (Exception e) {
            // Loguea la excepción con más detalles
            System.err.println("Error al iniciar sesión: " + e.getMessage());
            e.printStackTrace();
            response.put("message", "Error interno del servidor.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // Devuelve un JSON con el
                                                                                           // mensaje de error
        }
    }
}
