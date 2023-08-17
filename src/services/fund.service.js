import http from '../common/http.comon'

class FundService {
    payWithMoMo() {
        return http.get("/fund/payWithMoMo");
    }
}

export default new FundService();