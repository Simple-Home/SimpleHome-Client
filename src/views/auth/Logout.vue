<script>
export default {
  created() {
    this.$store.dispatch('destroyToken')
      .then(() => {
        this.isLoading = false;
        this.$router.push({ name: 'Login' });
      });
  },
};
</script>
