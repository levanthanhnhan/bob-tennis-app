import http from "../common/http.comon";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

class AuthService {
  findByPhoneNumber(phoneNumber) {
    var data = {
      phoneNumber: phoneNumber,
    };
    return http.auth.post("/phoneNumber", JSON.stringify(data));
  }

  async isAuthenticated() {
    var data = {
      token: null,
    };

    try {
      data.token = JSON.parse(
        window.localStorage.getItem("vuex")
      ).user.accessToken;
    } catch (error) {
      data.token = "";
    }

    var res = await http.auth
      .post("/isAuthenticated", JSON.stringify(data))
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return false;
      });

    return res;
  }

  async logout() {
    await signOut(auth);
    localStorage.clear();
  }
}

export default new AuthService();
