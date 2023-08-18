import http from '../common/http.comon'

class FundService {
    payWithMoMo() {
        return http.get("/fund/payWithMoMo");
    }

    findFundMember() {
        return http.get("/fund")
    }
}

export default new FundService();