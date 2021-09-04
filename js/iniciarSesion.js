/* -------------------------------- Verifica si existe la lista en el local storage al hacer "Click". -------------------------------- */
$(function () {
  function clickInicioSesion(email, password) {
    let usuariosRegistrados = JSON.parse(
      localStorage.getItem("Usuarios Registrados")
    );
    if (!usuariosRegistrados) {
      $("#formulario__invalido").addClass("d-flex");
      return $("#formulario__invalido").removeClass("d-none");
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
          return (window.location.href = "index.html");
        }
      }
      $("#formulario__invalido").addClass("d-flex");
      $("#formulario__invalido").removeClass("d-none");
    }
  }

  /* -------------------------------- Evento al hacer "click" en "Iniciar Sesion".  -------------------------------- */

  let inputs = $("#formulario input");
  const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
  };

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

  inputs.keyup(function (event) {
    validarFormulario(event);
    if (event.key === "Enter") {
      $("#boton-registro").click();
    }
  });
  inputs.blur(validarFormulario);

  /* -------------------------------- Escuchar al boton registro al hacer "click" en él.  -------------------------------- */

  $("#boton-registro").on("click", () => {
    if ($("#email").val() === "" || $("#password").val() === "") {
      $("#formulario__invalido").addClass("d-flex");
      $("#formulario__invalido").removeClass("d-none");
    } else {
      $("#formulario__invalido").removeClass("d-flex");
      $("#formulario__invalido").addClass("d-none");
      clickInicioSesion($("#email").val(), $("#password").val());
    }
  });
});
