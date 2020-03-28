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
        <div class="nav-item" v-for="room in rooms" :key="room.id" :class="{'is-active': room.id === activeRoom}">
          <a @click="switchRoom(room.id)">{{room.name}}</a>
        </div>
      </div>
    </div>

    <div class="rooms">
      <room v-for="room in rooms" :room="room" :key="room.id" :active="room.id === activeRoom"/>
    </div>
  </div>
</template>

<script>
import Room from '@/components/Room.vue'

export default {
  name: 'Home',
  components: {
    Room
  },
  data: function () {
    return {
      activeRoom: 1,
      rooms: [
        { id: 1, name: 'Living room' },
        { id: 2, name: 'Kitchen' },
        { id: 3, name: 'Bedroom' },
        { id: 4, name: 'Bathroom' }
      ]
    }
  },
  methods: {
    switchRoom: function (roomId) {
      this.activeRoom = roomId
    }
  }
}
</script>
