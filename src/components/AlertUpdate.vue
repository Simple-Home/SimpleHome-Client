<template>
  <!--Notification Bar-->
  <div v-if="once">
    <div class="alert alert-danger d-flex justify-content-between" role="alert">
      <div class="align-self-center">Update availible!</div>
      <div>
        <button type="button" class="btn btn-primary" v-on:click="refreshApp">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      once: false,
      refreshing: false,
      registration: null,
      updateExists: false
    };
  },
  created() {
    document.addEventListener("swUpdated", () => {
      console.log(event);
      console.log(event);
      console.log(event);

      this.updateAvailable(event);
      this.once = true;
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) return;
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  }
};
</script>