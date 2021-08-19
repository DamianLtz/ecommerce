/* -------------------------------- Verifica si existe la lista en el local storage al hacer "Click". -------------------------------- */

function clickInicioSesion(email, password) {
  let usuariosRegistrados = JSON.parse(
    localStorage.getItem("Usuarios Registrados")
  );
  let formularioInvalido = document.getElementById("formulario__invalido");
  if (!usuariosRegistrados) {
    formularioInvalido.classList.add("d-flex");
    return formularioInvalido.classList.remove("d-none");
  }
  if (email.value !== "" && password.value !== "") {
    for (let i = 0; i < usuariosRegistrados.length; i++) {
      if (
        usuariosRegistrados[i].mail === email &&
        usuariosRegistrados[i].password === password
      ) {
        localStorage.setItem(
          "Usuario Logueado",
          JSON.stringify(usuariosRegistrados[i])
        );
        return (window.location.href = "../index.html");
      }
    }
    formularioInvalido.classList.add("d-flex");
    formularioInvalido.classList.remove("d-none");
  } else {
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

/* -------------------------------- Evento al hacer "click" en "Iniciar Sesion".  -------------------------------- */

let emailCliente = document.getElementById("email");
let passwordCliente = document.getElementById("password");

let inputs = document.querySelectorAll("#formulario input");
const expresiones = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,12}$/, // 4 a 12 digitos.
};

const validarFormulario = (e) => {
  let formularioInvalido = document.getElementById("formulario__invalido");
  if (formularioInvalido) {
    formularioInvalido.classList.remove("d-flex");
    formularioInvalido.classList.add("d-none");
  }
  switch (e.target.name) {
    case "email":
      if (expresiones.email.test(e.target.value)) {
        document.getElementById("emailIncorrecto").classList.add("opacity-0");
        document
          .getElementById("emailIncorrecto")
          .classList.remove("opacity-100");
        document.getElementById("email").classList.remove("error-input");
        document.getElementById("email").classList.add("input-correcto");
      } else {
        document
          .getElementById("emailIncorrecto")
          .classList.remove("opacity-0");
        document.getElementById("emailIncorrecto").classList.add("opacity-100");
        document.getElementById("email").classList.add("error-input");
        document.getElementById("email").classList.remove("input-correcto");
      }
      break;
    case "password":
      if (expresiones.password.test(e.target.value)) {
        document
          .getElementById("passwordIncorrecto")
          .classList.add("opacity-0");
        document
          .getElementById("passwordIncorrecto")
          .classList.remove("opacity-100");
        document.getElementById("password").classList.remove("error-input");
        document.getElementById("password").classList.add("input-correcto");
      } else {
        document
          .getElementById("passwordIncorrecto")
          .classList.remove("opacity-0");
        document
          .getElementById("passwordIncorrecto")
          .classList.add("opacity-100");
        document.getElementById("password").classList.add("error-input");
        document.getElementById("password").classList.remove("input-correcto");
      }
      break;
    default:
      alert("Error 404 (?)");
      break;
  }
};

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
/* guardarRegistro.addEventListener("click", clickInicioSesion); */
guardarRegistro.onclick = () => {
  let formularioInvalido = document.getElementById("formulario__invalido");
  if (emailCliente.value === "" || passwordCliente.value === "") {
    formularioInvalido.classList.add("d-flex");
    formularioInvalido.classList.remove("d-none");
  } else {
    formularioInvalido.classList.remove("d-flex");
    formularioInvalido.classList.add("d-none");
    clickInicioSesion(emailCliente.value, passwordCliente.value);
  }
};