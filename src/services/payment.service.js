import http from "../common/http.comon";

class PaymentService {
  findAll() {
    return http.common.get("/payment");
  }

  find(year, quarter) {
    var data = {
      year: year,
      quarter: quarter,
    };
    return http.common.post("/payment", JSON.stringify(data));
  }
}

export default new PaymentService();
