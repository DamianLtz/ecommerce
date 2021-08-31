$(function () {
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
    $("#log-out").remove();
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
      $("#datos-cliente-container a:last-child").remove();
      $("#datos-cliente-container").append(`
      <p id="usuario-actual" class="fw-bold log-in">${nombreCompletoCliente}</p>
      <button class="btn p-0 shadow-none" id="log-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000"
          viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
              <polyline points="174.011 86 216 128 174.011 170" fill="none" stroke="#000000"
              stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                <line x1="104" y1="128" x2="215.97057" y2="128" fill="none" stroke="#000000"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
               <path d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56" fill="none" stroke="#000000"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
         </svg>
      </button>`);
      $("#monto").text(usuarioStorage.puntos);
      $(".shop-cart").addClass("d-block");
      $(".shop-cart").removeClass("d-none");
      $("#monto-container").addClass("d-flex");
      $("#monto-container").removeClass("d-none");
      $("#footer-options li:first-child").remove()
    }
  }

  // Identificar al cliente logueado luego de iniciar sesion.

  identificarClienteLogueado();

  /* --------------- Evento al hacer click en el icono de "desloguear". --------------- */

  $("#log-out").on("click", () => {
    desloguear();
  });
});
