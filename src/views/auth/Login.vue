<template>
  <div class="page page-login">
    <h1 class="text-center">
      <img src="img/logo-login.svg" alt="SimpleHome" class="img-responsive" height="160">
    </h1>
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">E-mail</label>
          <input type="text" class="input" v-model="username" required>
        </div>
        <div class="field">
          <label class="label">Password
            <router-link to='/recover-password' tabindex="-1">
              <small>Forgot Password</small>
            </router-link>
          </label>
          <input type="password" class="input" v-model="password" required>
        </div>
        <button
          class="button is-primary d-block mb-4"
          type="submit"
          :class="{ 'is-loading': isLoading }"
        >
          Sign in
        </button>
        <p class="text-center mb-4">Or sign in with</p>
        <div class="buttons text-center">
          <button type="button" class="button is-icon"><i class="fa fa-github"></i></button>
          <button type="button" class="button is-icon"><i class="fa fa-google"></i></button>
        </div>
      </form>
    </div>
    <div class="login-footer">
      Don't have account yet? <router-link to="/register"><b>Sign Up</b></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      }).then(() => {
        this.isLoading = false;
        this.$router.push({ name: 'Home' });
      }).catch((err) => {
        this.isLoading = false;
        alert(err);
      });
    },
  },
};
</script>
