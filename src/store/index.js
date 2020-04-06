import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    retrieveToken(context, credentials) {
      fetch('/api/apiFront.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // todo
        } else {
          throw new Error(res.error);
        }
      }).catch((err) => {
        alert(err);
      });
    },
  },
  modules: {
  },
});
