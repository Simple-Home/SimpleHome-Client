import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
          .then((response) => {
            console.log(response);
            if (response.status === 401) {
              throw new Error('Wrong credentials');
            } else if (response.status !== 200) {
              throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem('token', data.token);
            context.commit('retrieveToken', data.token);
            resolve(data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
  modules: {
  },
});
