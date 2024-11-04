package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Version;
import com.example.demo.Services.VersionService;

@RestController
@RequestMapping("/api/versiones")
public class VersionController {
    @Autowired
    private VersionService versionService;

    @PostMapping
    public ResponseEntity<Version> crearVersion(@RequestBody Version version) {
        return ResponseEntity.ok(versionService.guardarVersion(version));
    }
}
