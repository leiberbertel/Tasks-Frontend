<template>
    <div class="background-blur">
      <form @submit.prevent="register" class="content-main">
        <h2 class="form-title">Regístrate con nosotros</h2>
        <div class="input-wrapper">
          <box-icon name='user' color='#ffffff'></box-icon>
          <input class="input-field" v-model="registerData.username" type="text" placeholder="Nombre de usuario" required>
        </div>

        <div class="input-wrapper">
          <box-icon name='lock-alt' color='#ffffff'></box-icon>
          <input class="input-field" v-model="registerData.password" type="password" placeholder="Contraseña" required>
        </div>

        <div class="input-wrapper">
          <box-icon name='envelope' color='#ffffff'></box-icon>
          <input class="input-field" v-model="registerData.email" type="email" placeholder="Correo electrónico" required>
        </div>

        <button type="submit" class="btn register-btn">Crear una cuenta</button>
      </form>
    </div>
</template>
  
<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      registerData: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/auth/register', this.registerData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style>

.content-main {
  margin-bottom: 3em;
  width: 45%;
}

* {
  clear: #fff;
  font-family: 'Segoe UI', Verdana, sans-serif;
}


.background-blur {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../public/bg-main.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
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

.register-btn:hover {
  background-color: #dfdede;
  color: #002;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1em;
}

.input-wrapper box-icon {
  position: absolute;
  left: 68px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.input-field {
  background: transparent;
  border: none;
  border-bottom: 1px solid #dfdede;
  width: 70%;
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