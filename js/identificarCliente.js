function desloguear() {
  let obtenerUsuarioLogueado = JSON.parse(
    localStorage.getItem("Usuario Logueado")
  );
  let obtenerUsuariosRegistrados = JSON.parse(
    localStorage.getItem("Usuarios Registrados")
  );
  for (let i = 0; i < obtenerUsuariosRegistrados.length; i++) {
    if (obtenerUsuarioLogueado.mail === obtenerUsuariosRegistrados[i].mail) {
      obtenerUsuariosRegistrados[i] = obtenerUsuarioLogueado;
    }
  }
  localStorage.setItem(
    "Usuarios Registrados",
    JSON.stringify(obtenerUsuariosRegistrados)
  );
  localStorage.removeItem("Usuario Logueado");
  $("#usuario-actual").text("Ingresar a mi cuenta");
  $("#monto").text("Ingresar a mi cuenta");
  $("#log-out").removeClass("d-block");
  $("#log-out").addClass("d-none");
  $(".shop-cart").addClass("d-none");
  $(".shop-cart").removeClass("d-block");
  $("#monto-container").addClass("d-none");
  $("#monto-container").removeClass("d-flex");
  window.location.href = "../index.html";
}

function identificarClienteLogueado() {
  const usuarioStorage = JSON.parse(localStorage.getItem("Usuario Logueado"));
  if (usuarioStorage !== null) {
    const nombreCompletoCliente = `${usuarioStorage.nombre} ${usuarioStorage.apellido}`;
    $("#usuario-actual").text(nombreCompletoCliente);
    $("#monto").text(usuarioStorage.puntos);
    $("#log-out").addClass("d-block");
    $("#log-out").removeClass("d-none");
    $(".shop-cart").addClass("d-block");
    $(".shop-cart").removeClass("d-none");
    $("#monto-container").addClass("d-flex");
    $("#monto-container").removeClass("d-none");
  }
}

// Identificar al cliente logueado luego de iniciar sesion.

identificarClienteLogueado();

/* --------------- Evento al hacer click en el icono de "desloguear". --------------- */

$("#log-out").on("click", () => {
  desloguear();
});
