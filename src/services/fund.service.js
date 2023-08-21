import http from "../common/http.comon";

class FundService {
  payWithMoMo() {
    return http.common.get("/fund/payWithMoMo");
  }

  findFundMember() {
    return http.common.get("/fund");
  }
}

export default new FundService();
