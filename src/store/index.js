import { createStore } from "vuex";

export default createStore({
    state: {
        pageTitle: 'Tổng quan',
        user: {
          uid: null,
          accessToken: null,
        }
    },
    mutations: {
      setUser(state, user) {
        state.user.uid = user.uid;
        state.user.accessToken = user.accessToken;
      },
      changePageTitle(state, value) {
        state.pageTitle = value;
      },
    },
  });