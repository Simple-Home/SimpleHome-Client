<template>
  <div class="page">
    <header class="header">
      <h1 class="header-name">Home</h1>
      <button class="button is-primary button-add">
        <i class="fa fa-plus"></i>
      </button>
    </header>

    <div class="tabs-scroll">
      <div class="nav-tabs">
        <div class="nav-item"
          v-for="room in rooms"
          :key="room.room_id"
          :class="{'is-active': room.room_id === activeRoom}"
        >
          <a @click="switchRoom(room.room_id)">{{room.name}}</a>
        </div>
      </div>
    </div>

    <div class="rooms">
      <room v-for="room in rooms" :room="room"
      :key="room.room_id" :active="room.room_id === activeRoom"/>
    </div>
  </div>
</template>

<script>
import Room from '@/components/Room.vue';

export default {
  name: 'Home',
  components: {
    Room,
  },
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
    activeRoom() {
      return this.$store.state.activeRoom;
    },
  },
  methods: {
    switchRoom(roomId) {
      this.$store.commit('setActiveRoom', roomId);
    },
  },
  created() {
    if (this.$store.state.rooms.length === 0) {
      this.$store.dispatch('retrieveRooms');
    }
  },
};
</script>
