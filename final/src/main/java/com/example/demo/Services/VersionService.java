package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Version;
import com.example.demo.Repository.VersionRepository;

@Service
public class VersionService {
    @Autowired
    private VersionRepository versionRepository;

    public Version guardarVersion(Version version) {
        return versionRepository.save(version);
    }
    // Métodos adicionales según sea necesario
}
