package com.prueba.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "ordenes")
public class Orden {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "fecha")
	private Date fecha;

    @ManyToOne(targetEntity = Cliente.class)
  	@OnDelete(action = OnDeleteAction.CASCADE)
    private Cliente cliente;

    @ManyToMany(targetEntity = Articulo.class)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Articulo> articulos;

	public Orden() {

	}

	public Orden(Date fecha, Cliente cliente, List<Articulo> articulos) {
		this.fecha = fecha;
		this.articulos = articulos;
		this.cliente = cliente;
	}

	public long getId() {
		return id;
	}

	public Date getfecha() {
		return fecha;
	}

	public Cliente getcliente() {
		return cliente;
	}

	public List<Articulo> getarticulos() {
		return articulos;
	}

}
