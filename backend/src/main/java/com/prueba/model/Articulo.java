package com.prueba.model;

import javax.persistence.*;

@Entity
@Table(name = "articulos")
public class Articulo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "codigo")
	private String codigo;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "precio")
	private Float precio;

	public Articulo() {

	}

	public Articulo(String codigo, String nombre, Float precio) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.precio = precio;
	}

	public long getId() {
		return id;
	}

	public String getcodigo() {
		return codigo;
	}

	public String getnombre() {
		return nombre;
	}

	public Float getprecio() {
		return precio;
	}

}
