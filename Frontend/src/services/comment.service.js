import http from "../common/http";
import store from "../store";

class CommentService {
  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  getAll() { return http.get("/comment"); }
  get(id) { return http.get(`/comment/comment/${id}`); }
  create(data) { return http.post("/comment", data); }
  update(id, data) { return http.put(`/comment/${id}`, data); }
  delete(id) { return http.delete(`/comment/${id}`); }
  deleteAll() { return http.delete("/comment"); }
  findByName(name) { return http.get(`/comment?userComment=${name}`); }
}

export default new CommentService();