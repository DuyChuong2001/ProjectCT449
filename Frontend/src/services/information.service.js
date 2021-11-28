import http from "../common/http";
import store from "../store";

class InformationService {
  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  getAll() { return http.get("/information"); }
  get(id) { return http.get(`/information/${id}`); }
  create(data) { return http.post("/information", data); }
  update(id, data) { return http.put(`/information/${id}`, data); }
  delete(id) { return http.delete(`/information/${id}`); }
  deleteAll() { return http.delete("/information"); }
  findByName(name) { return http.get(`/information?name=${name}`); }
}

export default new InformationService();