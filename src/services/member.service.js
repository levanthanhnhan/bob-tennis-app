import http from "../common/http.comon";

class MemberService {
  findAll() {
    return http.common.get("/members");
  }

  findOne() {
    return http.common.get("/members/2");
  }

  findAdmins() {
    return http.common.get("/members/admins");
  }

  findBirthday() {
    return http.common.get("/members/birthday");
  }

  update() {
    return http.common.post("/members/update");
  }
}

export default new MemberService();
