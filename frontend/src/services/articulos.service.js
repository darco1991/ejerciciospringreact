import http from "../http-common";

class ApiArticulos {
  getAll() {
    return http.get("/articulos");
  }

  create(data) {
    return http.post("/articulos", data);
  }
}

export default new ApiArticulos();