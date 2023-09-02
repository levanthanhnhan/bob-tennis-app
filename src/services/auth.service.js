import http from "../common/http.comon";

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
      data.token = JSON.parse(window.localStorage.getItem("vuex")).user.accessToken;
    } catch (error) {
      data.token = "";
    }

    var res = await http.auth
      .post("/isAuthenticated", JSON.stringify(data))
      .then((res) => {
        this.setTokenHeader(data.token);
        return res.data;
      })
      .catch((error) => {
        return false;
      });

    return res;
  }

  setTokenHeader(token) {
    http.common.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        this.$router("/login");
        return Promise.reject(error);
      }
    );
  }
}

export default new AuthService();
