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
    return http.common.post("/payment/find", JSON.stringify(data));
  }

  insert(payment) {
    var data = {
      year: payment.year,
      quarter: payment.quarter,
      amount: payment.amount,
      description: payment.description,
    };
    return http.common.post("/payment/insert", JSON.stringify(data));
  }

  update(payment) {
    var data = {
      payment_id: payment.payment_id,
      year: payment.year,
      quarter: payment.quarter,
      amount: payment.amount,
      description: payment.description,
    };
    return http.common.post("/payment/update", JSON.stringify(data));
  }

  delete(payment) {
    var data = {
      payment_id: payment.payment_id,
    };
    return http.common.post("/payment/delete", JSON.stringify(data));
  }
}

export default new PaymentService();
