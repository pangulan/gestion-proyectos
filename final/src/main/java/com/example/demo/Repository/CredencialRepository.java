package com.example.demo.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Credencial;

@Repository

public interface CredencialRepository extends JpaRepository<Credencial, Long> {
}
