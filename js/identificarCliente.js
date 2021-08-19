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
  let montoUsuarioLogueado = document.getElementById("monto");
  const usuariologueado = document.getElementById("usuario-actual");
  const botonDeslogueo = document.getElementById("log-out");
  const carritoUsuario = document.querySelector(".shop-cart");
  const puntosUsuario = document.getElementById("monto-container");
  usuariologueado.innerText = "Ingresar a mi cuenta";
  montoUsuarioLogueado.innerText = "";
  botonDeslogueo.classList.remove("d-block");
  botonDeslogueo.classList.add("d-none");
  carritoUsuario.classList.add("d-none");
  carritoUsuario.classList.remove("d-block");
  puntosUsuario.classList.add("d-none");
  puntosUsuario.classList.remove("d-flex");
  window.location.href = "../index.html";
}

function identificarClienteLogueado() {
  const usuariologueado = document.getElementById("usuario-actual");
  let montoUsuarioLogueado = document.getElementById("monto");
  const usuarioStorage = JSON.parse(localStorage.getItem("Usuario Logueado"));
  const botonDeslogueo = document.getElementById("log-out");
  const carritoUsuario = document.querySelector(".shop-cart");
  const puntosUsuario = document.getElementById("monto-container");
  if (usuarioStorage !== null) {
    const nombreCompletoCliente = `${usuarioStorage.nombre} ${usuarioStorage.apellido}`;
    usuariologueado.innerText = nombreCompletoCliente;
    montoUsuarioLogueado.innerText = usuarioStorage.puntos;
    botonDeslogueo.classList.add("d-block");
    botonDeslogueo.classList.remove("d-none");
    carritoUsuario.classList.add("d-block");
    carritoUsuario.classList.remove("d-none");
    puntosUsuario.classList.add("d-flex");
    puntosUsuario.classList.remove("d-none");
  }
}

identificarClienteLogueado();

/* --------------- Evento al hacer click en el icono de "desloguear". --------------- */

let botonDesloguear = document.getElementById("log-out");

botonDesloguear.onclick = desloguear;