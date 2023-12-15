<template>
  <div class="header">
    <router-link to="/" class="logo">
      Task App
    </router-link>
    <nav class="nav">
      <router-link to="/">Iniciar sesión</router-link>
      <router-link to="/register">Registrarse</router-link>
      <a v-if="isLoggedIn" @click="logout" class="logout-link">Salir</a>
    </nav>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  position: relative;
}

.logo {
  padding: 10px 30px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #fff;
}

.nav {
  display: flex;
  gap: 25px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav a {
  font-size: 1em;
  text-decoration: none;
  color: #fff;
  position: relative;
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 1px;
  background-color: #fff;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.nav a:hover::after {
  transform: scaleX(1);
}

.logout-link {
  float: right;
  cursor: pointer;
}
</style>

<script>
export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('jwtToken') !== null;
    }
  },
  methods: {
    async logout() {
      try {
        localStorage.removeItem('jwtToken');
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
