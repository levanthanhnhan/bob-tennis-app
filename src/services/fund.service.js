import http from "../common/http.comon";

class FundService {
  maxOrderCode() {
    return http.common.get("/fund/maxOrderCode");
  }

  createOrder(data) {
    return http.common.post("/fund/createOrder", JSON.stringify(data));
  }

  findFundMember() {
    return http.common.get("/fund");
  }
}

export default new FundService();
