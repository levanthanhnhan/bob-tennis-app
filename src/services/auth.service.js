import http from "../common/http.comon";

class AuthService {
  findByPhoneNumber(phoneNumber) {
    var data = {
      phoneNumber: phoneNumber,
    };
    return http.auth.post("/phoneNumber", JSON.stringify(data));
  }
}

export default new AuthService();
