import http from "../common/http.comon";

class MemberService {
  findAll() {
    return http.common.get("/members");
  }

  findAdmins() {
    return http.common.get("/members/admins");
  }

  findBirthday() {
    return http.common.get("/members/birthday");
  }
}

export default new MemberService();
