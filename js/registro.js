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
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
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

let puntosBienvenidaCliente = 45000;

let inputs = $("#formulario input");
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros, guion y guion_bajo
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,12}$/, // 4 a 12 digitos.
};

/* --------------- Validar Caracteres del formulario y evento al soltar una tecla o salir de una sección del mismo.  --------------- */

const validarFormulario = (e) => {
  if ($("#formulario__invalido")) {
    $("#formulario__invalido").removeClass("d-flex");
    $("#formulario__invalido").addClass("d-none");
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
    $(`#${campo}Incorrecto`).addClass("opacity-0");
    $(`#${campo}Incorrecto`).removeClass("opacity-100");
    $(`#${campo}`).removeClass("error-input");
    $(`#${campo}`).addClass("input-correcto");
  } else {
    $(`#${campo}Incorrecto`).removeClass("opacity-0");
    $(`#${campo}Incorrecto`).addClass("opacity-100");
    $(`#${campo}`).addClass("error-input");
    $(`#${campo}`).removeClass("input-correcto");
  }
  return expresion.test(input.value);
};

/* --------------- Fin Validar Caracteres del formulario y evento al soltar una tecla o salir de una sección del mismo.  --------------- */

// Por cada input debe suceder X evento.
inputs.keyup(function (event) {
  validarFormulario(event);
  if (event.key === "Enter") {
    $("#boton-registro").click();
  }
});
inputs.blur(validarFormulario);

/* -------------------------------- Escuchar al boton registro al hacer "click" en él.  -------------------------------- */

$("#boton-registro").on("click", () => {
  if (
    expresiones.nombre.test(nombre.value) &&
    expresiones.apellido.test(apellido.value) &&
    expresiones.email.test(email.value) &&
    expresiones.password.test(password.value)
  ) {
    clickRegistro(
      $("#nombre").val(),
      $("#apellido").val(),
      $("#email").val(),
      $("#password").val(),
      puntosBienvenidaCliente
    );
    $("#formulario__invalido").removeClass("d-flex");
    $("#formulario__invalido").addClass("d-none");
    window.location.href = "../index.html";
  } else {
    $("#formulario__invalido").addClass("d-flex");
    $("#formulario__invalido").removeClass("d-none");
  }
});
