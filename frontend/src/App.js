import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Clientes from "./components/clientes.component";
import Articulos from "./components/articulos.component";
import Ordenes from "./components/ordenes.component";

class App extends Component {
  render() {
    return (

      <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">

          <div className="navbar-brand" style={{'paddingRight': '20px'}}>
            App Prueba Spring
          </div>

          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/clientes"} className="nav-link">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/articulos"} className="nav-link">
                Articulos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/ordenes"} className="nav-link">
                Ordenes
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/clientes"]} component={Clientes} />
            <Route exact path="/clientes" component={Clientes} />
            <Route exact path="/articulos" component={Articulos} />
            <Route exact path="/ordenes" component={Ordenes} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
