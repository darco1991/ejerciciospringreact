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

import com.prueba.model.Orden;
import com.prueba.repository.OrdenesRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class OrdenesController {

	@Autowired
	OrdenesRepository ordenesrepository;

	@GetMapping("/ordenes")
	public ResponseEntity<List<Orden>> all() {
		try {

			List<Orden> ordenes = new ArrayList<Orden>();

			ordenesrepository.findAll().forEach(ordenes::add);

			if (ordenes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(ordenes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/ordenes")
	public ResponseEntity<Orden> create(@RequestBody Orden orden) {
		try {
			Orden _orden = ordenesrepository.save(
				new Orden(
					orden.getfecha(), 
					orden.getcliente(),
					orden.getarticulos()
				)
			);
			return new ResponseEntity<>(_orden, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

}
