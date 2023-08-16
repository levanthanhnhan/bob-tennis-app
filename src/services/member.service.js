import http from '../common/http.comon'

class MemberService {
    findAll() {
        return http.get("/members");
    }

    findAdmins() {
        return http.get("/members/admins");
    }

    findBirthday() {
        return http.get("/members/birthday");
    }
}

export default new MemberService();