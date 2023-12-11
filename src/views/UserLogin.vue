<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-quote">
        <p class="text-intro">El tiempo es más valioso que el dinero, puedes conseguir más dinero pero no puedes conseguir más tiempo</p>
        <button @click="toggleForm" class="btn register-btn">Conoce más</button>
      </div>
      <div class="login-form-container">
        <form @submit.prevent="login" class="login-form">
          <h2 class="form-title">Iniciar sesión</h2>
          
          <div class="input-wrapper">
            <box-icon name='user' color='#ffffff'></box-icon>
            <input class="input-field" v-model="loginData.username" type="text" placeholder="Nombre de usuario" required>
          </div>

          <div class="input-wrapper">
            <box-icon name='lock-alt' color='#ffffff'></box-icon>
            <input class="input-field" v-model="loginData.password" type="password" placeholder="Contraseña" required>
          </div>
          <button type="submit" class="btn enter-btn">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    toggleForm() {
      this.$router.push('/register');
    },
    async login() {
      try {
        const response = await this.$axios.post('/auth/login', this.loginData);
        localStorage.setItem('jwtToken', response.data.data.token);
        this.$router.push('/tasks');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
  
<style scoped>
* {
  clear: #fff;
  font-family: 'Segoe UI', Verdana, sans-serif;
}
.text-intro {
  margin-top: 25px;
  font-weight: 500;
  color: #fff;
}

.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.login-content {
  position: relative;
  display: flex;
  z-index: 1;
}

.login-quote {
  border-right: 1px solid #d8d8d8;
  padding: 2em;
  width: 50%;
}

.login-form-container {
  padding: 2em;
  width: 50%;
}

.form-title {
  margin-bottom: 1em;
  color: #fff;
}

.btn {
  width: 30%;
  padding: 8px;
  border: none;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  font-size: 1em;
}

.register-btn {
  margin-top: 1em;
  border: 1px solid #fff;
  background-color: transparent;
}

.register-btn:hover{
  background-color: #dfdede;
  color: #002;
}

.enter-btn {
  margin-top: 1em;
  background-color: #e6e1e1;
  color: #002;
}

.enter-btn:hover {
  background-color: #040809;
  color: #fff;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1em; 
}

.input-wrapper box-icon {
  position: absolute;
  left: 30px; 
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.input-field {
  background: transparent;
  border: none;
  border-bottom: 1px solid #dfdede; 
  width: 80%;
  padding: 10px 10px 10px 30px; 
  outline: none; 
  font-size: 1em;
  color: #fff;
}

.input-field::placeholder {
  color: #fff;
  opacity: 1;
}

.input-field:focus {
  color: #fff;
}

</style>