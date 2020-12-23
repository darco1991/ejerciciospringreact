import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import ApiOrdenes from "../services/ordenes.service";
import ApiClientes from "../services/clientes.service";
import ApiArticulos from "../services/articulos.service";

export default class Ordenes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data_ordenes: [],
      data_clientes: [],
      data_articulos: [],
      show: false,
      cliente: "",
      articulo: "",
      orden_articulos: []
    };

    this.obtener = this.obtener.bind(this);
    this.nuevo = this.nuevo.bind(this);
    this.ocultar = this.ocultar.bind(this);
    this.guardar = this.guardar.bind(this);
    this.change = this.change.bind(this);
    this.agregar_articulo = this.agregar_articulo.bind(this);
    this.eliminar_articulo = this.eliminar_articulo.bind(this);
  }

  componentDidMount() {
    this.obtener();
  }

  obtener() {
    ApiOrdenes.getAll().then(response => {
      this.setState({
        data_ordenes: response.data
      });
    }).catch(e => {
      console.log(e);
    });

    ApiClientes.getAll().then(response => {
      this.setState({
        data_clientes: response.data
      });
    }).catch(e => {
      console.log(e);
    });

    ApiArticulos.getAll().then(response => {
      this.setState({
        data_articulos: response.data
      });
    }).catch(e => {
      console.log(e);
    });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  guardar() {
    this.setState({
      show: false
    });

    var cliente = this.state.data_clientes.find((element) => {
      return element.id == this.state.cliente;
    })

    var data = {
      fecha: new Date(),
      cliente: cliente,
      articulos: this.state.orden_articulos
    };

    ApiOrdenes.create(data).then(response => {
      this.obtener();
    }).catch(e => {
      console.log(e);
      alert(e);
    });
  }

  nuevo() {
    this.setState({
      nombre: "",
      codigo: "",
      precio: "",
      show: true
    });
  }

  ocultar() {
    this.setState({
      show: false
    });
  }

  agregar_articulo(){
    var articulo = this.state.data_articulos.find((element) => {
      return element.id == this.state.articulo;
    })
    this.state.orden_articulos.push(articulo);
    this.setState({
       orden_articulos: this.state.orden_articulos
    });
  }

  eliminar_articulo(index){
    this.state.orden_articulos.splice(index, 1);
    this.setState({
       orden_articulos: this.state.orden_articulos
    });
  }

  render() {

    const { guardar, data_ordenes, data_clientes, data_articulos, orden_articulos, eliminar_articulo, ocultar, change, nuevo } = this.state;

    return ( 
      <>
      <div className="row" style={{'flexDirection': 'column'}}>

      <div className="col" style={{'display': 'flex','marginBottom': '20px'}}>
      <h4 style={{'width': '100%','margin': 'auto'}}>Ordenes</h4>
      <Button variant="primary" onClick={this.nuevo}>
      Añadir
      </Button>
      </div>

      <div className="col">
      <table className="table table-striped">
      <thead className="table-dark">
      <tr>
      <th>ID</th>
      <th>Fecha</th>
      <th>Cliente</th>
      <th>Total</th>
      </tr>
      </thead>
      <tbody>

        {data_ordenes && data_ordenes.map((row, index) => (
          <>
        <tr key={index}>
        <td>{row.id}</td>
        <td>{(new Date(row.fecha)).toLocaleDateString()}</td>
        <td>{row.cliente.nombre} {row.cliente.apellido}</td>
        <td>{ (row.articulos.reduce((total, articulo) => total = total + articulo.precio,0)).toFixed(2) }</td>
        </tr>

        <tr>
        <td colSpan="4" style={{'background':'#f2f2f2'}}>
          <table className="table mb-0 table-secondary">
          <thead>
          <tr>
          <th>#</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>PVP</th>
          </tr>
          </thead>

          {row.articulos && row.articulos.map((articulo, index_art) => (
          <tr key={index_art}>
            <td>{(index_art+1)}</td>
            <td>{articulo.codigo}</td>
            <td>{articulo.nombre}</td>
            <td>{ (articulo.precio).toFixed(2) }</td>
          </tr>
          ))}
          </table>
        </td>
        </tr>
        </>
        ))}

        </tbody>
        </table>
        </div>
        </div>

        <Modal show = { this.state.show } onHide = { this.ocultar } centered size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Añadir orden</Modal.Title>
        </Modal.Header> 
        <Modal.Body>

        <div className="form-group">
        <label htmlFor="codigo">Cliente</label>
        <select className="form-control" value={this.state.cliente} onChange={this.change} name="cliente" required>            
        <option>Seleccione un cliente</option>
        {data_clientes && data_clientes.map((row, index) => (
          <option key={index} value={row.id}>{row.nombre} {row.apellido}</option>
          ))}
          </select>
          </div>

          <div className="form-group">
          <label htmlFor="nombre">Articulos</label>

          <InputGroup className="mb-3">
          <select className="form-control" value={this.state.articulo} onChange={this.change} name="articulo" required>
            <option>Seleccione uno o más articulo</option>
          {data_articulos && data_articulos.map((row, index) => (
            <option key={index} value={row.id}>{row.codigo} | {row.nombre} | {row.precio}</option>
            ))}
            </select>
            <InputGroup.Append>
            <Button variant="primary" onClick={this.agregar_articulo}>Agregar</Button>
            </InputGroup.Append>
            </InputGroup>

            <Table striped bordered hover size="sm">
            <thead>
            <tr>
            <th></th>
            <th>#</th>
            <th>Articulo</th>
            <th>PVP</th> 
            </tr>
            </thead>
            <tbody>
            {orden_articulos && orden_articulos.map((row, index) => (
              <tr key={index}>
              <td style={{'width': '72px', 'textAlign':'center'}}>
                <Button variant="danger" onClick={() => this.eliminar_articulo(index)} style={{'padding':'2px'}}>
                  Borrar
                </Button> 
              </td>
              <td>{index+1}</td>
              <td>{row.nombre}</td>
              <td>{row.precio}</td>
              </tr>
              ))}
              </tbody>
              </Table>

              </div>


              </Modal.Body> 
              <Modal.Footer>
              <Button variant="secondary" onClick={this.ocultar}>
              Cerrar
              </Button> 
              <Button variant = "primary"
              onClick = { this.guardar } >
              Guardar 
              </Button> 
              </Modal.Footer > 
              </Modal> 
              </>
              );
        }
      }



                // <input type="text" className="form-control" required 
          // value={this.state.nombre}
          // onChange={this.change}
          // placeholder='Botella agua 500ml'
          // name="nombre"/> 