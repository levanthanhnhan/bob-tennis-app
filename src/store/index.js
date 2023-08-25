import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

function getPageTitle() {
  var path = window.location.pathname.split("/");

  if (path.length < 3) {
    return "Tổng quan";
  }

  switch (path[1]) {
    case "dashboard":
      return "Tổng quan";
    case "member":
      return "Thành viên";
    case "fund":
      return "Quỹ hội";
    case "tournament":
      return "Giải B.O.B";
    case "profile":
      return "Hồ sơ";
    default:
      return "Tổng quan";
  }
}

export default createStore({
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
  state: {
    // Page tile set breadcrumb
    pageTitle: getPageTitle(),

    // User Firebase
    user: {
      uid: null,
      accessToken: null,
    },

    // User local in db
    userLocal: {
      member_id: null,
      img_path: null,
      is_admin: null,
    }
  },
  mutations: {
    changePageTitle(state, value) {
      state.pageTitle = value;
    },
    setUser(state, user) {
      state.user.uid = user.uid;
      state.user.accessToken = user.accessToken;
    },
    setUserLocal(state, user) {
      state.userLocal.member_id = user.member_id;
      state.userLocal.img_path = user.img_path;
      state.userLocal.is_admin = user.is_admin;
    },
  },
});
