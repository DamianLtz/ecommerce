function verificarPuntosCliente() {
    let solicitarPuntos = parseInt(prompt("Ingrese su cantidad de puntos"))
    while (isNaN(solicitarPuntos) || solicitarPuntos <= 0) {
        alert("Error, intente nuevamente.")
        solicitarPuntos = parseInt(prompt("Ingrese su cantidad de puntos"))
    }
    return solicitarPuntos
}

function verificarCostoProducto() {
    let solicitarCosto = parseInt(prompt("Ingrese el costo del producto"))
    while (isNaN(solicitarCosto) || solicitarCosto <= 0) {
        alert("Error, intente nuevamente.")
        solicitarCosto = parseInt(prompt("Ingrese el costo del producto"))
    }
    return solicitarCosto
}

function puntos(costoDelProducto, puntosDelCliente) { //los parametros no necesariamente tienen que ser variables al declarar la funcion PERO SI al llamarla.
    if (costoDelProducto > puntosDelCliente) {
        alert("Puntos Insuficientes para realizar la compra.")
        console.log("Puntos Insuficientes para realizar la compra.")
        return puntosDelCliente
    } else {
        return puntosDelCliente - costoDelProducto
    }
}

function total(puntosTotales) {
    if (puntosCliente < costoProducto) {
        console.log("Recuerde que usted tiene " + puntosTotales + " puntos por eso no puede realizar la compra.")
        alert("Recuerde que usted tiene " + puntosTotales + " puntos por eso no puede realizar la compra.")
    } else {
        console.log("Usted tiene: " + puntosTotales + " puntos restantes.")
        alert("Usted tiene: " + puntosTotales + " puntos restantes.")
    }
}


let puntosCliente = verificarPuntosCliente()

let costoProducto = verificarCostoProducto()

let puntosTotales = puntos(costoProducto, puntosCliente)

total(puntosTotales)