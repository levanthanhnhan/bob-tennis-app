import http from "../common/http.comon";

class ReceiptService {
  findAll() {
    return http.common.get("/receipt");
  }

  find(year, quarter) {
    var data = {
      year: year,
      quarter: quarter,
    };
    return http.common.post("/receipt", JSON.stringify(data));
  }
}

export default new ReceiptService();
