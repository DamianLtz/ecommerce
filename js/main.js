/* -------------------------------- Registro Cliente -------------------------------- */

class Cliente {
    constructor(nombreApellido, puntosUsuario, mailCliente) {
        this.nombreApellido = nombreApellido
        this.cantidadPuntos = puntosUsuario
        this.mail = mailCliente
        this.datosCliente = function () {
            console.log("El Usuario que ha iniciado sesión es: " + this.nombreApellido + " " + "\ncon el siguiente e-mail: " + this.mail + "\ny con " + this.cantidadPuntos + " puntos.")
            alert("Bienvenid@ " + this.nombreApellido + " \nTienes " + this.cantidadPuntos + " puntos.")
        }
    }
}



function solicitarMailCliente() {
    let emailClienteNuevo = prompt("¿Cual es tu e-mail?")
    while (emailClienteNuevo == "" || emailClienteNuevo == null || emailClienteNuevo.search("@") === -1 || emailClienteNuevo.search(".com") === -1 || emailClienteNuevo.length <= 8) {
        alert("Error, intente nuevamente")
        emailClienteNuevo = prompt("¿Cual es tu e-mail?")
    }
    return emailClienteNuevo
}

function datosCliente() {
    let nombre = prompt("¿Cual es tu nombre?")
    while (nombre == "" || nombre == null || Number(nombre)) {
        alert("Error , intente nuevamente")
        nombre = prompt("Cual es tu nombre?")
    }
    let apellido = prompt("¿Cual es tu apellido?")
    while (apellido == "" || apellido == null || Number(apellido)) {
        alert("Error , intente nuevamente")
        apellido = prompt("Cual es tu apellido?")
    }
    return [nombre, apellido]
}

/* -------------------------------- Verificar Compra -------------------------------- */

function verificarPuntosCliente() {
    let solicitarPuntos = parseInt(prompt("Ingrese su cantidad de puntos"))
    while (isNaN(solicitarPuntos) || solicitarPuntos <= 0) {
        alert("Error, intente nuevamente.")
        solicitarPuntos = parseInt(prompt("Ingrese su cantidad de puntos"))
    }
    return solicitarPuntos
}

function puntosCliente() {
    let puntosActuales = parseInt(prompt("¿Cuantos puntos tienes?"))
    while (isNaN(puntosActuales || puntosActuales == "")) {
        alert("Error, intente nuevamente")
        puntosActuales = parseInt(prompt("¿Cuantos puntos tienes?"))
    }
    return puntosActuales
}

function verificarCostoProducto() {
    let solicitarCosto = parseInt(prompt("Ingrese el costo del producto"))
    while (isNaN(solicitarCosto) || solicitarCosto <= 0) {
        alert("Error, intente nuevamente.")
        solicitarCosto = parseInt(prompt("Ingrese el costo del producto"))
    }
    return solicitarCosto
}

function total(puntosCliente, costoProducto) {
    if (puntosCliente < costoProducto) {
        console.log("Recuerde que usted tiene " + puntosUsuario + " puntos por eso no puede realizar esta compra.")
        alert("Recuerde que usted tiene " + puntosUsuario + " puntos por eso no puede realizar esta compra.")
    } else {
        puntosTotales = puntosCliente - costoProducto
        console.log("Usted tiene: " + puntosTotales + " puntos restantes.")
        alert("Usted tiene: " + puntosTotales + " puntos restantes.")
        return puntosTotales
    }
}

/* -------------------------------- Inicio Simulador: Solicitando datos del usuario  -------------------------------- */


let [nombre, apellido] = datosCliente() //Devuelve el nombre y apellido ingresado del cliente.

let nombreApellido = [nombre, apellido].join(" ")

let mailUsuario = solicitarMailCliente()

let puntosUsuario = puntosCliente()

/* -------------------------------- Salida datos usuario por Consola y Alert -------------------------------- */

const clienteNuevo1 = []
clienteNuevo1.push(new Cliente(nombreApellido, puntosUsuario, mailUsuario))

/* -------------------------------- Modificacion Datos Usuario en el HTML Según valores Ingresados -------------------------------- */

/* for (const nuevoCliente of clienteNuevo1) {
    const contenedorUsuario = document.getElementById("datos-cliente-container")
    const contenedorMonto = document.getElementById("monto-container")
    const usuarioLoggeado = document.getElementById("usuario-actual")
    let montoUsuarioLoggeado = document.getElementById("monto")
    let nombreUsuario = document.createElement('a')
    nombreUsuario.innerHTML = `<a href="#" id="usuario-actual" class="fw-bold log-in">${nuevoCliente.nombreApellido}</a>`
    let montoUsuario = document.createElement('p')
    montoUsuario.innerHTML = `<p id="monto">${nuevoCliente.cantidadPuntos}</p>`
    contenedorUsuario.replaceChild(nombreUsuario, usuarioLoggeado);
    contenedorMonto.replaceChild(montoUsuario, montoUsuarioLoggeado)
} */

//  Modificacion datos del usuario en la página (Nombre y Cantidad de puntos):

for (const nuevoCliente of clienteNuevo1) {
    const usuarioLoggeado = document.getElementById("usuario-actual")
    let montoUsuarioLoggeado = document.getElementById("monto")
    usuarioLoggeado.innerText = nuevoCliente.nombreApellido
    montoUsuarioLoggeado.innerText = nuevoCliente.cantidadPuntos
}

/* -------------------------------- Guardando datos en localStorage  -------------------------------- */

let datosSesion = []

function ComprobarLocalStorage() {
    if (localStorage.getItem("datosSesion")) {
        datosSesion = JSON.parse(localStorage.getItem("datosSesion"))
        console.log(datosSesion)
    } else {
        localStorage.setItem("datosSesion", JSON.stringify(clienteNuevo1))
    }
}

ComprobarLocalStorage()

/* const clienteNuevo1 = []
clienteNuevo1.push(new Cliente(nombreApellido, puntosUsuario, mailUsuario)) */

/* -------------------------------- Simulador: Solicitando costo del producto al usuario y devolviendo el resultado de la compra -------------------------------- */

/* let costoProducto = verificarCostoProducto()

let resultadoCompra = total(puntosUsuario, costoProducto) */ // Funciones para Operar la para compra.