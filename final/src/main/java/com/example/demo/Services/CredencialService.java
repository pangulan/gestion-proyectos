package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Credencial;
import com.example.demo.Repository.CredencialRepository;

@Service
public class CredencialService {
    @Autowired
    private CredencialRepository credencialRepository;

    public Credencial guardarCredencial(Credencial credencial) {
        return credencialRepository.save(credencial);
    }
    // Métodos adicionales según sea necesario
}