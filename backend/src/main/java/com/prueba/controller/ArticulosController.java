package com.prueba.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.model.Articulo;
import com.prueba.repository.ArticulosRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ArticulosController {

	@Autowired
	ArticulosRepository articulosrepository;

	@GetMapping("/articulos")
	public ResponseEntity<List<Articulo>> all() {
		try {

			List<Articulo> articulos = new ArrayList<Articulo>();

			articulosrepository.findAll().forEach(articulos::add);

			if (articulos.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(articulos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/articulos")
	public ResponseEntity<Articulo> create(@RequestBody Articulo articulo) {
		try {
			Articulo _articulos = articulosrepository.save(
				new Articulo(
					articulo.getcodigo(), 
					articulo.getnombre(),
					articulo.getprecio()
				)
			);
			return new ResponseEntity<>(_articulos, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

}
