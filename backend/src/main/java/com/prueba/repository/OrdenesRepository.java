package com.prueba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prueba.model.Orden;

public interface OrdenesRepository extends JpaRepository<Orden, Long> {
	List<Orden> findAll();
}
