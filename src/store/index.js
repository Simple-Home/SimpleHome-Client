import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    rooms: [],
    automations: [],
    activeRoom: parseInt(localStorage.getItem('activeRoom')) || null,
    users: [],
    server: null,
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
    setActiveAutomation(state, automationId){
      state.activeAutomation = automationId;
      localStorage.setItem('activeAutomation', automationId);
    },
    runWidget(state, data){
      let roomIndex = state.rooms.findIndex(room => room.room_id == data.room_id);

      if(roomIndex >= 0){
        Object.keys(state.rooms[roomIndex].widgets).forEach(key => {
          if(state.rooms[roomIndex].widgets[key].subdevice_id == data.subdevice_id){
            state.rooms[roomIndex].widgets[key].value = data.value;
          }
        })
      }
    },
    retrieveUsers(state, users){
      state.users = users;
    },
    retrieveServer(state, server){
      state.server = server;
    },
    retrieveAutomations(state, automations)
    {
      state.automations = automations;
    }
  },
  actions: {
    runWidget(context, widget){
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + `widgets/${widget.subdevice_id}/run`, {
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
        fetch(process.env.VUE_APP_API_ROOT + 'login', {
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
            console.log(response);
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
        fetch(process.env.VUE_APP_API_ROOT + 'logout', {
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
        fetch(process.env.VUE_APP_API_ROOT + 'rooms', {
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
    retrieveAutomations(context) {
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + 'automations', {
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
            context.commit('retrieveAutomations', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    retrieveUsers(context) {
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + 'users', {
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
    retrieveServer(context) {
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + 'server', {
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
            context.commit('retrieveServer', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createAutomation(context, automation){
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + 'automations/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.state.token}`,
          },
          body: JSON.stringify(automation),
        })
          .then((response) => {
            if(response.status !== 200){
              throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
      })
    },
    updateWidget(context, widget){
      return new Promise((resolve, reject) => {
        fetch(process.env.VUE_APP_API_ROOT + `widget/${widget.id}/edit`, {
          method: 'UPDATE',
          headers: {
            'Content-Type': 'application/json',
              Authorization: `Bearer ${context.state.token}`,
          },
          body: JSON.stringify(widget.data),
        })
          .then((response) => {
            if(response.status !== 200){
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
          })
      })
    },
  },
  modules: {
  },
});
