<template>
  <div class="alerts">
    <div class="alert is-danger d-none">
      <div class="alert-icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <div class="alert-content">
        <h5 class="alert-heading">Error</h5>
        error
      </div>
      <button class="button is-close"><i class="fa fa-times"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
};
</script>
