class nuevoCliente {
    constructor(nuevoUsuario) {
        this.nombre = nuevoUsuario.nombre
        this.apellido = nuevoUsuario.apellido
        this.mail = nuevoUsuario.email
        this.password = nuevoUsuario.password
        this.puntos = nuevoUsuario.puntos
    }
}

/* -------------------------------- Verifica si existe la lista en el local storage al hacer "Click". -------------------------------- */

function clickRegistro(nombre, apellido, email, password, puntosBienvenida) {

    const nuevoClienteRegistrado = new nuevoCliente({
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        password: password.value,
        puntos: puntosBienvenida
    });

    if (nombre.value !== "" && apellido.value !== "" && email.value !== "" && password.value !== "") {
        if (!existeUsuariosStorage()) {
            crearUsuarioStorage();
        }

        cargarNuevoUsuario(nuevoClienteRegistrado);

    } else {
        if (nombre.value === "") {
            document.getElementById("nombre").classList.add("error-input");
            document.getElementById("nombre").classList.remove("input-correcto");
            document.getElementById("nombreIncorrecto").classList.remove("opacity-0");
            document.getElementById("nombreIncorrecto").classList.add("opacity-100");
        }
        if (apellido.value === "") {
            document.getElementById("apellido").classList.add("error-input");
            document.getElementById("apellido").classList.remove("input-correcto");
            document.getElementById("apellidoIncorrecto").classList.remove("opacity-0");
            document.getElementById("apellidoIncorrecto").classList.add("opacity-100");
        }
        if (email.value === "") {
            document.getElementById("email").classList.add("error-input");
            document.getElementById("email").classList.remove("input-correcto");
            document.getElementById("emailIncorrecto").classList.remove("opacity-0");
            document.getElementById("emailIncorrecto").classList.add("opacity-100")
        }
        if (password.value === "") {
            document.getElementById("password").classList.add("error-input");
            document.getElementById("password").classList.remove("input-correcto");
            document.getElementById("passwordIncorrecto").classList.remove("opacity-0");
            document.getElementById("passwordIncorrecto").classList.add("opacity-100")
        }
    }
}

function existeUsuariosStorage() {
    let existe = false;
    if (localStorage.getItem("Usuarios Registrados") !== null) { // si NO existe la key "usuarios registrados" , la crea.
        existe = true;
    }
    return existe;
}

// Crear la lista vacia en el local storage en formato JSON.

function crearUsuarioStorage() {
    localStorage.setItem("Usuarios Registrados", JSON.stringify([]));
}

// obtener la lista del local storage en forma JS.

function obtenerUsuariosStorage() {
    return JSON.parse(localStorage.getItem("Usuarios Registrados"));
}

// Guarda el registro del usuario en el local storage.

function guardarUsuariosEnStorage(datosDeUsuarioRecibidos) {
    localStorage.setItem("Usuarios Registrados", JSON.stringify(datosDeUsuarioRecibidos));
}

function cargarNuevoUsuario(usuarioACargar) {
    let datosUsuarioArray = obtenerUsuariosStorage();
    datosUsuarioArray.push(usuarioACargar); // 
    guardarUsuariosEnStorage(datosUsuarioArray);
}

/* -------------------------------- Evento al hacer "click" en "Registrarse".  -------------------------------- */

let nombreCliente = document.getElementById("nombre");
let apellidoCliente = document.getElementById("apellido");
let emailCliente = document.getElementById("email");
let passwordCliente = document.getElementById("password");
let puntosBienvenidaCliente = 4000;

let inputs = document.querySelectorAll("#formulario input")
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros, guion y guion_bajo
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/ // 4 a 12 digitos.
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById("nombreIncorrecto").classList.add("opacity-0");
                document.getElementById("nombreIncorrecto").classList.remove("opacity-100");
                document.getElementById("nombre").classList.remove("error-input");    
            } else {
                document.getElementById("nombreIncorrecto").classList.remove("opacity-0");
                document.getElementById("nombreIncorrecto").classList.add("opacity-100");
                document.getElementById("nombre").classList.add("error-input");
            }
            break
        case "apellido":
            if (expresiones.apellido.test(e.target.value)) {
                document.getElementById("apellidoIncorrecto").classList.add("opacity-0");
                document.getElementById("apellidoIncorrecto").classList.remove("opacity-100");
                document.getElementById("apellido").classList.remove("error-input");
            } else {
                document.getElementById("apellidoIncorrecto").classList.remove("opacity-0");
                document.getElementById("apellidoIncorrecto").classList.add("opacity-100");
                document.getElementById("apellido").classList.add("error-input");
            }
            break
        case "email":
            if (expresiones.email.test(e.target.value)) {
                document.getElementById("emailIncorrecto").classList.add("opacity-0");
                document.getElementById("emailIncorrecto").classList.remove("opacity-100");
                document.getElementById("email").classList.remove("error-input");
            } else {
                document.getElementById("emailIncorrecto").classList.remove("opacity-0");
                document.getElementById("emailIncorrecto").classList.add("opacity-100");
                document.getElementById("email").classList.add("error-input");
            }
            break
        case "password":
            if (expresiones.password.test(e.target.value)) {
                document.getElementById("passwordIncorrecto").classList.add("opacity-0");
                document.getElementById("passwordIncorrecto").classList.remove("opacity-100");
                document.getElementById("password").classList.remove("error-input");
            } else {
                document.getElementById("passwordIncorrecto").classList.remove("opacity-0");
                document.getElementById("passwordIncorrecto").classList.add("opacity-100");
                document.getElementById("password").classList.add("error-input");
            }
            break
        default:
            alert("Error 404 (?)")
            break
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

/* -------------------------------- Escuchar al boton registro al hacer "click" en él.  -------------------------------- */

const guardarRegistro = document.getElementById("boton-registro");
/* guardarRegistro.addEventListener("click", clickRegistro); */
guardarRegistro.onclick = () => clickRegistro(nombreCliente, apellidoCliente, emailCliente, passwordCliente, puntosBienvenidaCliente);
