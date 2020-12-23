import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Api from "../services/clientes.service";

export default class Clientes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: false,
      show_editar: false,
      nombre: "",
      apellido: "",
      id_editar: ""
    };

    this.obtener = this.obtener.bind(this);
    this.nuevo = this.nuevo.bind(this);
    this.ocultar = this.ocultar.bind(this);
    this.ocultar_editar = this.ocultar_editar.bind(this);
    this.guardar = this.guardar.bind(this);
    this.guardar_editar = this.guardar_editar.bind(this);
    this.change = this.change.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }


  componentDidMount() {
    this.obtener();
  }

  obtener() {
    Api.getAll().then(response => {
      this.setState({
        data: response.data
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

    var cliente = {
      nombre: this.state.nombre,
      apellido: this.state.apellido
    };

    Api.create(cliente).then(response => {
        this.obtener();
      }).catch(e => {
        console.log(e);
      });
    }

    nuevo() {
      this.setState({
        nombre: "",
        apellido: "",
        show: true
      });
    }

    ocultar(){
      this.setState({
        show: false
      });
    }

    ocultar_editar(){
      this.setState({
        show_editar: false
      });
    }

    editar(id) {
      Api.get(id).then(response => {
        this.setState({
          id_editar: response.data.id,
          nombre_editar: response.data.nombre,
          apellido_editar: response.data.apellido,
          show_editar: true
        });
      }).catch(e => {
        console.log(e);
      });
    }

    guardar_editar() {
      this.setState({
        show_editar: false
      });

      var cliente = {
        nombre: this.state.nombre_editar,
        apellido: this.state.apellido_editar
      };

      Api.update(this.state.id_editar, cliente).then(response => {
        console.log(response);
        this.obtener();
      }).catch(e => {
        console.log(e);
      });
    }

    eliminar(id) {
      if(window.confirm("¿Esta seguro de eliminar este cliente?")){
        Api.delete(id).then(response => {
          console.log(response);
          this.obtener();
        }).catch(e => {
          console.log(e);
        });
      }
    }

    render() {

      const { guardar, data, ocultar, ocultar_editar, change, nuevo } = this.state;

      return (
        <>
        <div className="row" style={{'flexDirection': 'column'}}>

        <div className="col" style={{'display': 'flex','marginBottom': '20px'}}>
        <h4 style={{'width': '100%','margin': 'auto'}}>Clientes</h4>
        <Button variant="primary" onClick={this.nuevo}>
        Añadir
        </Button>
        </div>

        <div className="col">
        <table className="table table-striped">
        <thead className="table-dark">
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th></th>
        </tr>
        </thead>
        <tbody>
        {data && data.map((row, index) => (
          <tr key={index}>
          <td>{row.id}</td>
          <td>{row.nombre}</td>
          <td>{row.apellido}</td>
          <td style={{'width': '150px', 'textAlign':'center'}}>
          <div style={{'display':'flex'}}>
          <Button variant="warning" onClick={() => this.editar(row.id)} style={{'padding':'2px','margin':'auto'}}>
          Editar
          </Button>    
          <Button variant="danger" onClick={() => this.eliminar(row.id)} style={{'padding':'2px','margin':'auto'}}>
          Borrar
          </Button> 
          </div>
          </td>
          </tr>
          ))}
          </tbody>
          </table>
          </div>
          </div>

          <Modal show={this.state.show} onHide={this.ocultar} centered>
          <Modal.Header closeButton>
          <Modal.Title>Añadir cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-group">
          <label htmlFor="title">Nombre</label>
          <input type="text" className="form-control" required 
          value={this.state.nombre}
          onChange={this.change}
          placeholder='Andres'
          name="nombre"/> 
          </div>
          <div className="form-group">
          <label htmlFor="description">Apellido</label>
          <input type="text" className="form-control" required 
          value={this.state.apellido}
          onChange={this.change}
          placeholder='Garcia'
          name="apellido"/> 
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


          <Modal show={this.state.show_editar} onHide={this.ocultar_editar} centered>
          <Modal.Header closeButton>
          <Modal.Title>Editar cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-group">
          <label htmlFor="title">ID</label>
          <input type="text" className="form-control" disabled 
          value={this.state.id_editar}name="nombre_editar"/> 
          </div>
          <div className="form-group">
          <label htmlFor="title">Nombre</label>
          <input type="text" className="form-control" required 
          value={this.state.nombre_editar}
          onChange={this.change}
          name="nombre_editar"/> 
          </div>
          <div className="form-group">
          <label htmlFor="description">Apellido</label>
          <input type="text" className="form-control" required 
          value={this.state.apellido_editar}
          onChange={this.change}
          name="apellido_editar"/> 
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.ocultar_editar}>
          Cerrar
          </Button>
          <Button variant="primary" onClick={this.guardar_editar}>
          Guardar
          </Button>
          </Modal.Footer>
          </Modal>
          </>
          );
        }
      }
