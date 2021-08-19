class nuevoCliente {
  constructor(nuevoUsuario) {
    this.nombre = nuevoUsuario.nombre;
    this.apellido = nuevoUsuario.apellido;
    this.mail = nuevoUsuario.email;
    this.password = nuevoUsuario.password;
    this.puntos = nuevoUsuario.puntos;
  }
}

/* -------------------------------- Verifica si existe la lista en el local storage al hacer "Click". -------------------------------- */

function clickRegistro(nombre, apellido, email, password, puntosBienvenida) {
  const nuevoClienteRegistrado = new nuevoCliente({
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    password: password.value,
    puntos: puntosBienvenida,
  });

  if (
    nombre.value !== "" &&
    apellido.value !== "" &&
    email.value !== "" &&
    password.value !== ""
  ) {
    if (!existeUsuariosStorage()) {
      crearUsuarioStorage();
    }

    cargarNuevoUsuario(nuevoClienteRegistrado);
  } else {
    //Refactorizar.
    if (nombre.value === "") {
      document.getElementById("nombre").classList.add("error-input");
      document.getElementById("nombre").classList.remove("input-correcto");
      document.getElementById("nombreIncorrecto").classList.remove("opacity-0");
      document.getElementById("nombreIncorrecto").classList.add("opacity-100");
    }
    if (apellido.value === "") {
      document.getElementById("apellido").classList.add("error-input");
      document.getElementById("apellido").classList.remove("input-correcto");
      document
        .getElementById("apellidoIncorrecto")
        .classList.remove("opacity-0");
      document
        .getElementById("apellidoIncorrecto")
        .classList.add("opacity-100");
    }
    if (email.value === "") {
      document.getElementById("email").classList.add("error-input");
      document.getElementById("email").classList.remove("input-correcto");
      document.getElementById("emailIncorrecto").classList.remove("opacity-0");
      document.getElementById("emailIncorrecto").classList.add("opacity-100");
    }
    if (password.value === "") {
      document.getElementById("password").classList.add("error-input");
      document.getElementById("password").classList.remove("input-correcto");
      document
        .getElementById("passwordIncorrecto")
        .classList.remove("opacity-0");
      document
        .getElementById("passwordIncorrecto")
        .classList.add("opacity-100");
    }
  }
}

/* -------------------------------- Verifica si existe la lista sino la Crea en el local storage en formato JSON. -------------------------------- */

function existeUsuariosStorage() {
  let existe = false;
  if (localStorage.getItem("Usuarios Registrados") !== null) {
    // si NO existe la key "usuarios registrados" , la crea.
    existe = true;
  }
  return existe;
}

function crearUsuarioStorage() {
  localStorage.setItem("Usuarios Registrados", JSON.stringify([]));
}

/* -------------------------------- Guarda el registro del usuario en el local storage en la key "usuarios registrados". -------------------------------- */

function obtenerUsuariosStorage() {
  return JSON.parse(localStorage.getItem("Usuarios Registrados")); // obtener la lista del local storage en formato JS.
}

function cargarNuevoUsuario(usuarioACargar) {
  let datosUsuarioArray = obtenerUsuariosStorage();
  datosUsuarioArray.push(usuarioACargar); //
  guardarUsuariosEnStorage(datosUsuarioArray);
}

// Guarda la lista en el local storage con la key "Usuarios Registrados".

function guardarUsuariosEnStorage(datosDeUsuarioRecibidos) {
  localStorage.setItem(
    "Usuarios Registrados",
    JSON.stringify(datosDeUsuarioRecibidos)
  );
}
/* -------------------------------- Evento al hacer "click" en "Registrarse".  -------------------------------- */

let nombreCliente = document.getElementById("nombre");
let apellidoCliente = document.getElementById("apellido");
let emailCliente = document.getElementById("email");
let passwordCliente = document.getElementById("password");
let puntosBienvenidaCliente = 30000;

let inputs = document.querySelectorAll("#formulario input");
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros, guion y guion_bajo
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,12}$/, // 4 a 12 digitos.
};

/* --------------- Validar Caracteres del formulario y evento al soltar una tecla o salir de una sección del mismo.  --------------- */

const validarFormulario = (e) => {
  let formularioInvalido = document.getElementById("formulario__invalido");
  if (formularioInvalido) {
    formularioInvalido.classList.remove("d-flex");
    formularioInvalido.classList.add("d-none");
  }
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
    default:
      alert("error no se esta validando el formulario correctamente");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`${campo}Incorrecto`).classList.add("opacity-0");
    document
      .getElementById(`${campo}Incorrecto`)
      .classList.remove("opacity-100");
    document.getElementById(`${campo}`).classList.remove("error-input");
    document.getElementById(`${campo}`).classList.add("input-correcto");
  } else {
    document.getElementById(`${campo}Incorrecto`).classList.remove("opacity-0");
    document.getElementById(`${campo}Incorrecto`).classList.add("opacity-100");
    document.getElementById(`${campo}`).classList.add("error-input");
    document.getElementById(`${campo}`).classList.remove("input-correcto");
  }
  return expresion.test(input.value);
};

/* --------------- Fin Validar Caracteres del formulario y evento al soltar una tecla o salir de una sección del mismo.  --------------- */

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      guardarRegistro.click();
    }
  });
});

/* -------------------------------- Escuchar al boton registro al hacer "click" en él.  -------------------------------- */

const guardarRegistro = document.getElementById("boton-registro");
guardarRegistro.onclick = () => {
  // Comprueba si los datos ingresados en todos los campos SOLO no estan vacios.
  let formularioInvalido = document.getElementById("formulario__invalido");
  if (
    expresiones.nombre.test(nombre.value) &&
    expresiones.apellido.test(apellido.value) &&
    expresiones.email.test(email.value) &&
    expresiones.password.test(password.value)
  ) {
    clickRegistro(
      nombreCliente,
      apellidoCliente,
      emailCliente,
      passwordCliente,
      puntosBienvenidaCliente
    );
    formularioInvalido.classList.remove("d-flex");
    formularioInvalido.classList.add("d-none");
    window.location.href = "../index.html";
  } else {
    formularioInvalido.classList.add("d-flex");
    formularioInvalido.classList.remove("d-none");
  }
};