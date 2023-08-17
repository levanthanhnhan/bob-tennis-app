import { createStore } from "vuex";

export default createStore({
    state: {
        pageTitle: 'Thành viên'
    },
    mutations: {
      changePageTitle(state, value) {
        state.pageTitle = value
      },
    }
  });