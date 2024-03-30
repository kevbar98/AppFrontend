
<template>
    <div class="wrapper login-wrapper">
      <div class="logo">
          <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="">
      </div>
      <div class="text-center mt-4 name">
          Login
      </div>
      <form class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input type="text" v-model="usuario" name="usuario" id="usuario" placeholder="Usuario">
          </div>
          <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input type="password" v-model="password" name="password" id="password" placeholder="Password">
          </div>
          <button class="btn btn-info mt-3" @click="login">Ingresar</button>


      </form>

    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: "LoginComponent",
    data() {
        return {
            usuario: '',
            password: ''
        };
    },
    methods: {
        async login() {
  try {
    console.log('Valor de this.usuario:', this.usuario); // Agregar esta línea para imprimir el valor de this.usuario
    // Hacer la solicitud GET al servidor con el ID del usuario
    const response = await axios.get(`http://localhost:8080/api/employees/${this.usuario}`);
    const userData = response.data;

    // Verificar si se encontró un usuario con el ID especificado
    if (userData && userData.password === this.password) {
      alert('Inicio de sesión correcto');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al intentar iniciar sesión');
  }
},

    }
  
}

</script>



<style scoped>
.login-wrapper {
    max-width: 350px;
    min-height: 500px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}


.wrapper .form-field select {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
  /* border: 1px solid red; */
  appearance: none; /* Para ocultar la flecha de selección predeterminada */
  -webkit-appearance: none; /* Para navegadores basados en WebKit */
  -moz-appearance: none; /* Para navegadores basados en Gecko */
}

.logo {
    width: 80px;
    margin: auto;
}

.logo img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
        0px 0px 0px 5px #ecf0f3,
        8px 8px 15px #a7aaa7,
        -8px -8px 15px #fff;
}

.wrapper .name {
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
}

.wrapper .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}



.wrapper .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
    color: #555;
}

.wrapper .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper .btn:hover {
    background-color: #039BE5;
}

.wrapper a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #03A9F4;
}

.wrapper a:hover {
    color: #039BE5;
}

@media(max-width: 380px) {
    .wrapper {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>


