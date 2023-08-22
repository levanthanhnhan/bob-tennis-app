import http from "../common/http.comon";

class LevelService {
  findAll() {
    return http.common.get("/level");
  }
}

export default new LevelService();
