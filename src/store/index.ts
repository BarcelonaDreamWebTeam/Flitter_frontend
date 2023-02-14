
import { createStore } from "vuex";
import { reactive } from "vue";

const store = createStore({
  state: reactive({
      access_token: localStorage.getItem('access_token') || null
    }),
  mutations:{
    setAccessToken (state, access_token) {
      state.access_token = access_token;
    }
  },
  getters: {
    getAccessToken: state => {
      return state.access_token;
    }
  },
  actions:{

  },
  modules: {
  },
});


// const store = createStore({
//   state:{
//       access_token: localStorage.getItem('access_token') || null
//     },
//   mutations:{
//     setAccessToken (state, access_token) {
//       state.access_token = access_token;
//     }
//   },
//   getters: {
//     getAccessToken: state => {
//       return reactive({ access_token: state.access_token });
//     }
//   },
//   actions:{

//   },
//   modules: {
//   },
// });

export default store;
