<template>
  <div class="avatars">
    <div v-for="user in users"
    :key="user.userName"
    class="avatar"
    :class="{'is-offline': !user.homeStatus}"
    :title="user.userName">
      <img :src="user.avatarUrl" :alt="user.userName">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Avatars',
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  created() {
    if (this.$store.state.users.length === 0) {
      this.$store.dispatch('retrieveUsers');
    }
  },
}
</script>
