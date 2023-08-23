import http from "../common/http.comon";

class MemberService {
  findAll() {
    return http.common.get("/members");
  }

  findOne(id) {
    return http.common.get("/members/" + id);
  }

  findAdmins() {
    return http.common.get("/members/admins");
  }

  findBirthday() {
    return http.common.get("/members/birthday");
  }

  findByPhoneNumber(phoneNumber) {
    var data = {
      phoneNumber: phoneNumber,
    };
    return http.common.post("/members/phoneNumber", JSON.stringify(data));
  }

  update(member) {
    return http.common.post("/members/update", JSON.stringify(member));
  }
}

export default new MemberService();
