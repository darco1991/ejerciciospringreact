import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Api from "../services/articulos.service";

export default class Articulos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      nombre: "",
      codigo: "",
      precio: ""
    };

    this.obtener = this.obtener.bind(this);
    this.nuevo = this.nuevo.bind(this);
    this.ocultar = this.ocultar.bind(this);
    this.guardar = this.guardar.bind(this);
    this.change = this.change.bind(this);
  }


  componentDidMount() {
    this.obtener();
  }

  obtener() {
    Api.getAll()
      .then(response => {
        this.setState({
          data: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
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

    var data = {
      nombre: this.state.nombre,
      codigo: this.state.codigo,
      precio: this.state.precio
    };

    Api.create(data).then(response => {
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

  ocultar(){
    this.setState({
      show: false
    });
  }

  render() {

  const { guardar, data, ocultar, change, nuevo } = this.state;

    return (
      <>
      <div className="row" style={{'flexDirection': 'column'}}>

        <div className="col" style={{'display': 'flex','marginBottom': '20px'}}>
          <h4 style={{'width': '100%','margin': 'auto'}}>Articulos</h4>
          <Button variant="primary" onClick={this.nuevo}>
              Añadir
          </Button>
        </div>

        <div className="col">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Precio unitario</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.codigo}</td>
                  <td>{row.nombre}</td>
                  <td>{ (row.precio).toFixed(2) }</td>
                </tr>
              ))}
           </tbody>
          </table>
        </div>
      </div>

      <Modal show={this.state.show} onHide={this.ocultar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Añadir articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="form-group">

            <div className="form-group">
              <label htmlFor="codigo">Codigo</label>
              <input type="text" className="form-control" required 
              value={this.state.codigo}
              placeholder='28388487'
              onChange={this.change}
              name="codigo"/> 
            </div>


              <label htmlFor="nombre">Nombre</label>
              <input type="text" className="form-control" required 
              value={this.state.nombre}
              onChange={this.change}
              placeholder='Botella agua 500ml'
              name="nombre"/> 
              </div>

            <div className="form-group">
              <label htmlFor="precio">Precio unitario</label>
              <input type="text" className="form-control" required 
              value={this.state.precio}
              onChange={this.change}
              placeholder='9.99'
              name="precio"/> 
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.ocultar}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={this.guardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}
