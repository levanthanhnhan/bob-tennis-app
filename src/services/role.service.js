import http from "../common/http.comon";

class RoleService {
  findAll() {
    return http.common.get("/role");
  }
}

export default new RoleService();
