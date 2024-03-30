
<template>
    <div class="wrapper registro-wrapper">
        <div class="logo">
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="">
        </div>
        <div class="text-center mt-4 name">
            CRUD
        </div>
        <form class="p-3 mt-3" @submit.prevent="submitForm">
            <div class="input-label">
                <label for="tipoIdentificacion" class="input-label">Tipo de Identificación</label>
            </div>
            <div class="form-field d-flex align-items-center registro" style="width: 190px;">
                <span class="far fa-id-card icon-search"></span>
                <select v-model="tipoIdentificacion" name="tipoIdentificacion" id="tipoIdentificacion" class="form-select" :disabled="tipoIdentificacionDeshabilitado" @change="tipoIdentificacionChange">
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="ruc">RUC</option>
                </select>
            </div>
            
            <div class="input-label">
                <label for="numeroIdentificacion" class="input-label">Número de Identificacion</label>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-id-card"></span>
                <input 
    type="text" 
    v-model="numeroIdentificacion" 
    id="numeroIdentificacion" 
    placeholder="Ingrese su Número de Identificación" 
    @keypress="limitarNumeroIdentificacion"
    :maxlength="tipoIdentificacion === 'cedula' ? 10 : (tipoIdentificacion === 'ruc' ? 13 : 35)" 
    required
>


                <!-- Agregar el botón de eliminar con el icono de lupa -->
                <button class="btn btn-success btn-search" style="font-size: 12px; padding: 5px;" name="btnBuscar" @click.prevent="buscarUsuario">
                    <i class="fas fa-search fa-lg" style="color: white;"></i>


                </button>
            </div>


            <div class="input-label">
                <label for="nombre" class="input-label">Nombres</label>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" v-model="nombre" id="nombre" placeholder="Ingrese Nombres" oninput="this.value = this.value.replace(/[^A-ZÜÑÁÉÍÓÚ\s]/g, '')">
            </div>

            <div class="input-label">
                <label for="apellido" class="input-label">Apellidos</label>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" v-model="apellido" id="apellido" placeholder="Ingrese Apellidos" oninput="this.value = this.value.replace(/[^A-ZÜÑÁÉÍÓÚ\s]/g, '')">
            </div>

            
            <div class="input-label">
                <label for="password" class="input-label">Contraseña</label>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" v-model="password" id="password" placeholder="Ingrese una Contraseña">
            </div>
            
            <div class="input-label">
                <label for="confpassword" class="input-label">Confirmar Contraseña</label>
            </div>
            <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input type="password" v-model="confpassword" id="confpassword" placeholder="Ingrese de nuevo la Contraseña">
          </div>
          <div>
            <button class="btn btn-info mt-3" :disabled="botonesHabilitados" @click="registrarUsuario">Registrar</button>
            <button class="btn btn-primary mt-3" :disabled="!datosUsuarioObtenidos" @click="editarUsuario">Editar</button>

            <button class="btn btn-danger mt-3" :disabled="!datosUsuarioObtenidos" @click="eliminarUsuario">Eliminar</button>
            <button class="btn btn-secondary mt-3" @click="redirectToLogin">Regresar</button>
          </div>
            
        </form>
      </div>
      
</template>

<script>
import axios from 'axios';
export default {
  name: "RegistroComponent",
  data() {
        return {
            tipoIdentificacion: "cedula",
            numeroIdentificacion: "",
            nombre: "",
            apellido: "",
            password: "",
            confpassword: "",
            datosUsuarioObtenidos: false, // Variable para rastrear si se han obtenido los datos del usuario
            botonesHabilitados: false, // Agrega una propiedad para controlar el estado de los botones
            tipoIdentificacionDeshabilitado: false,
        };
    },
    watch: {
        numeroIdentificacion(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.nombre = "";
                this.apellido = "";
                this.password = "";
                this.confpassword = "";
                this.datosUsuarioObtenidos = false;
                this.botonesHabilitados = false; // Reinicia el estado de los botones cuando cambia el número de identificación

                // Deshabilitar el campo tipoIdentificacion cuando el número de identificación no esté vacío
                this.tipoIdentificacionDeshabilitado = this.numeroIdentificacion.trim() !== '';
            }
        }
},

  methods: {
    // Método para buscar el usuario
    async buscarUsuario() {
    try {
        const response = await axios.get(`http://localhost:8080/api/employees/${this.numeroIdentificacion}`);
        const userData = response.data;

        if (userData) {
            // Asignar los datos del usuario a los campos correspondientes
            this.nombre = userData.nombre;
            this.apellido = userData.apellido;
            this.password = userData.password;
            this.confpassword = userData.password;
            this.datosUsuarioObtenidos = true;
            this.botonesHabilitados = true;

            // Deshabilitar el campo de tipo de identificación si el número de identificación no está vacío
            this.tipoIdentificacionDeshabilitado = this.numeroIdentificacion.trim() !== '';

            // Seleccionar automáticamente la opción de tipo de identificación
            switch (userData.tipoidentificacion) {
                case 'cedula':
                    this.tipoIdentificacion = 'cedula';
                    break;
                case 'ruc':
                    this.tipoIdentificacion = 'ruc';
                    break;
                case 'pasaporte':
                    this.tipoIdentificacion = 'pasaporte';
                    break;
                default:
                    this.tipoIdentificacion = 'cedula'; // Valor por defecto si no se reconoce el tipo
            }
        } else {
            // Mostrar una alerta si el usuario no se encuentra registrado
            alert("Este usuario no se encuentra registrado");
        }
    } catch (error) {
        // Verificar si la respuesta es un error 404
        if (error.response && error.response.status === 404) {
            // Mostrar una alerta si el usuario no se encuentra registrado
            alert("Este usuario no se encuentra registrado");
        } else {
            // Manejar otros errores de la solicitud
            console.error('Error:', error);
            alert('Ocurrió un error al buscar el usuario');
        }
    }
},




    
    submitForm() {
      if (
        this.numeroIdentificacion === "" ||
        this.nombre === "" ||
        this.apellido === "" ||
        this.password === "" ||
        this.confpassword === ""
      ) {
        alert("Por favor completa todos los campos");
        return;
      }

      if (this.password !== this.confpassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

    
    },
    limitarNumeroIdentificacion(event) {
    if (!event) return;

    const allowedCharacters = {
        cedula: /[0-9]/,
        ruc: /[0-9]/,
        pasaporte: /[a-zA-Z0-9]/
    };

    // Obtener el tipo de identificación actual
    const tipoIdentificacion = this.tipoIdentificacion;

    // Obtener el carácter ingresado
    const char = String.fromCharCode(event.keyCode);

    // Verificar si el carácter ingresado es permitido
    if (!allowedCharacters[tipoIdentificacion].test(char)) {
        event.preventDefault();
    }
},








    tipoIdentificacionChange() {
        this.limitarNumeroIdentificacion(); // Llama a la función de limitar después de cambiar el tipo de identificación
    },

    redirectToLogin() {
            this.$router.push('/login');
    },

    async registrarUsuario() {
      try {
        // Objeto con los datos del usuario
        const usuario = {
          nombre: this.nombre,
          apellido: this.apellido,
          tipoidentificacion: this.tipoIdentificacion,
          usuario: this.numeroIdentificacion,
          password: this.password
        };

        // Realizar la solicitud POST al servidor
        const response = await axios.post('http://localhost:8080/api/employees', usuario);

        // Si la solicitud es exitosa, mostrar un mensaje de éxito
        alert('Usuario registrado con éxito:', response.data);
      } catch (error) {
        // Si hay algún error, mostrarlo en la consola
        alert('Error al registrar el usuario:', error);
      }
    },

    async editarUsuario() {
      // Verificar que todos los campos estén llenos
      if (this.nombre && this.apellido && this.password) {
        try {
          // Enviar la solicitud POST al servidor con los datos actualizados
          const response = await axios.put(`http://localhost:8080/api/employees/${this.numeroIdentificacion}`, {
            nombre: this.nombre,
            apellido: this.apellido,
            password: this.password
          });
          
          // Manejar la respuesta del servidor (si es necesario)
          alert('Usuario editado correctamente:', response.data);
        } catch (error) {
          // Manejar los errores de la solicitud
          alert('Error al editar el usuario:', error);
        }
      } else {
        // Mostrar un mensaje de error si algún campo está vacío
        alert('Por favor completa todos los campos');
      }
    },

    eliminarUsuario() {
        const numeroIdentificacion = this.numeroIdentificacion;

        if (numeroIdentificacion.trim() === '') {
            alert("Por favor ingresa un número de identificación");
            return;
        }

        if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) {
            return;
        }

        // Realizar la solicitud HTTP para eliminar el usuario
        // eslint-disable-next-line
        axios.delete(`http://localhost:8080/api/employees/${numeroIdentificacion}`)
        .then((response) => {
            // Realizar acciones necesarias después de eliminar el usuario
            alert("Usuario eliminado exitosamente:", response.data);
        })
        .catch((error) => {
            // Manejar errores en caso de fallo al eliminar el usuario
            alert("Error al eliminar el usuario:", error);
        });
    }
  }
}

</script>



<style scoped>
.registro-wrapper {
  max-width: 550px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
  font-size: 1.2rem;
}



.wrapper .form-field select {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
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
    font-size: 1rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}

.input-label {
  font-size: 1rem;
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
    height: 40px;;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper .btn-search {
    box-shadow: none;
    width: 15%;
    height: 40px;;
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



