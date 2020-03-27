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
        <div class="nav-item is-active">
          <a href="#">Living room</a>
        </div>
        <div class="nav-item">
          <a href="#">Kitchen</a>
        </div>
        <div class="nav-item">
          <a href="#">Bedroom</a>
        </div>
        <div class="nav-item">
          <a href="#">Bathroom</a>
        </div>
      </div>
    </div>

    <div class="devices">
      <div class="device device-3">
        <div class="device-content">device large</div>
      </div>
      <div class="device device-3">
        <div class="device-content">device large</div>
      </div>
      <div class="device">
        <div class="device-content">device small</div>
      </div>
      <div class="device">
        <div class="device-content">device small</div>
      </div>
      <div class="device">
        <div class="device-content">device small</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
