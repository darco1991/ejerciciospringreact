package com.prueba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prueba.model.Articulo;

public interface ArticulosRepository extends JpaRepository<Articulo, Long> {
	List<Articulo> findAll();
}
