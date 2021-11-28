import http from "../common/http";
import store from "../store";

class SkinService {
  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  getAll() { return http.get("/skin"); }
  get(id) { return http.get(`/skin/skin/${id}`); }
  create(data) { return http.post("/skin", data); }
  update(id, data) { return http.put(`/skin/${id}`, data); }
  delete(id) { return http.delete(`/skin/${id}`); }
  deleteAll() { return http.delete("/skin"); }
  findByName(name) { return http.get(`/skin?name=${name}`); }
}

export default new SkinService();