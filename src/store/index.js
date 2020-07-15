import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    rooms: [],
    activeRoom: parseInt(localStorage.getItem('activeRoom')) || null,
    users: [],
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
      localStorage.setItem('activeRoom', roomId);
    },
    runWidget(state, data){
      state.rooms
        .find(room => room.room_id === data.room_id).widgets
        .find(widget => widget.subdevice_id === data.subdevice_id).value = data.value;
    },
    retrieveUsers(state, users){
      state.users = users
    },
  },
  actions: {
    runWidget(context, widget){
      return new Promise((resolve, reject) => {
        fetch(`/vasek/home-update/api/widgets/${widget.subdevice_id}/run`, {
          method: 'POST',
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
          context.commit('runWidget', {
            'value': data.value,
            'subdevice_id': widget.subdevice_id,
            'room_id': widget.room_id,
          });
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
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
            context.commit('retrieveRooms', data);
            if(context.state.activeRoom === null){
              context.commit('setActiveRoom', data[0].room_id);
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    retrieveUsers(context) {
      return new Promise((resolve, reject) => {
        fetch('/vasek/home-update/api/users', {
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
            context.commit('retrieveUsers', data);
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
