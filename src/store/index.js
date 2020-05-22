import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    rooms: [],
    activeRoom: null,
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
    destroyToken(state) {
      state.token = null;
    },
    retrieveRooms(state, rooms) {
      state.rooms = rooms;
    },
    setActiveRoom(state, roomId) {
      state.activeRoom = roomId;
    },
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        fetch('/vasek/home-update/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
          .then((response) => {
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
            reject(err);
          });
      });
    },
    destroyToken(context) {
      return new Promise((resolve, reject) => {
        fetch('/vasek/home-update/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.state.token}`,
          },
        })
          .then((data) => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            resolve(data);
          })
          .catch((err) => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            reject(err);
          });
      });
    },
    retrieveRooms(context) {
      return new Promise((resolve, reject) => {
        fetch('/vasek/home-update/api/rooms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.state.token}`,
          },
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            context.commit('retrieveRooms', data);
            context.commit('setActiveRoom', data[0].room_id);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {
  },
});
