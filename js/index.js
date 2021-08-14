function desloguear() {
    localStorage.removeItem("Usuario Logueado")
    const usuariologueado = document.getElementById("usuario-actual");
    let montoUsuarioLogueado = document.getElementById("monto");
    usuariologueado.innerText = "Ingresar a mi cuenta"
    montoUsuarioLogueado.innerText = ""
}

function identificarClienteLogueado() {
    const usuariologueado = document.getElementById("usuario-actual");
    let montoUsuarioLogueado = document.getElementById("monto");
    const usuarioStorage = JSON.parse(localStorage.getItem("Usuario Logueado"))
    if (usuarioStorage !== null) {
        const nombreCompletoCliente = `${usuarioStorage.nombre} ${usuarioStorage.apellido}`
        usuariologueado.innerText = nombreCompletoCliente;
        montoUsuarioLogueado.innerText = usuarioStorage.puntos
    }
}

identificarClienteLogueado()

let botonDesloguear = document.getElementById("log-out")

botonDesloguear.onclick = desloguear
