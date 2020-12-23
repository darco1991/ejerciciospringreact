import http from "../http-common";

class ApiOrdenes {
  getAll() {
    return http.get("/ordenes");
  }

  create(data) {
    return http.post("/ordenes", data);
  }

}

export default new ApiOrdenes();