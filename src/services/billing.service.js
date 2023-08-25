import http from "../common/http.comon";

class BillingService {
  billingByMember(data) {
    return http.common.post("/billing/billingByMember", JSON.stringify(data));
  }
}

export default new BillingService();
