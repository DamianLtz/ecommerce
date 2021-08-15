/* ---------------------------------------------------- Iniciar Sesion ---------------------------------------------------- */

function desloguear() {
  localStorage.removeItem("Usuario Logueado");
  const usuariologueado = document.getElementById("usuario-actual");
  let montoUsuarioLogueado = document.getElementById("monto");
  usuariologueado.innerText = "Ingresar a mi cuenta";
  montoUsuarioLogueado.innerText = "";
}

function identificarClienteLogueado() {
  const usuariologueado = document.getElementById("usuario-actual");
  let montoUsuarioLogueado = document.getElementById("monto");
  const usuarioStorage = JSON.parse(localStorage.getItem("Usuario Logueado"));
  if (usuarioStorage !== null) {
    const nombreCompletoCliente = `${usuarioStorage.nombre} ${usuarioStorage.apellido}`;
    usuariologueado.innerText = nombreCompletoCliente;
    montoUsuarioLogueado.innerText = usuarioStorage.puntos;
  }
}

identificarClienteLogueado();

let botonDesloguear = document.getElementById("log-out");

botonDesloguear.onclick = desloguear;

// col-xl-3 col-lg-4 col-md-6 gy-4

{
  /* <div class="col-xl-3 col-lg-4 col-md-6 gy-4">
                    <a href="#" class="card position-static  text-dark">
                        <div class="bg-img-container">
                            <img src="assets/img/main/iphone-se.png" alt=""
                                class="img-fluid position absolute top-0 p-4">
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center card-descuento-container">
                                <div class="card-descuento">
                                    <p>
                                        - 15% OFF
                                    </p>
                                </div>
                                <p class="text-muted card-precio-anterior">
                                    $20.000
                                </p>
                            </div>
                            <h5 class="card-title">IPhone SE</h5>
                            <div class="d-flex align-items-center card-coins-cost">
                                <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                                <p class="card-text">$11.000</p>
                            </div>
                            <p class="text-muted text-uppercase pt-3 pb-2">
                                Puntos + Pesos
                            </p>
                            <div class="d-flex align-items-center card-coins-cost">
                                <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                                <p class="card-text text-muted fw-light">1000 + $5500</p>
                            </div>
                            <button class="btn btn-comprar shadow-none">
                                Comprar
                            </button>
                        </div>
                    </a>
                </div> */
}
/* ---------------------------------------------------- JSON ---------------------------------------------------- */

const listaProductos = [
  {
    id: 1,
    type: "points",
    image: "assets/img/main/samsunggalaxyzfold2.png",
    oldPrice: "$30.000",
    title: "IPhone",
    price: "$15.250",
    pricePoints: "5000 + $5.350",
  },
  {
    id: 2,
    type: "points",
    image: "assets/img/main/iphone.png",
    oldPrice: "$20.000",
    title: "Samsung Galaxy Z Fold",
    price: "$15.250",
    pricePoints: "5000 + $6.350",
  },
  {
    id: 3,
    type: "points",
    image: "assets/img/main/motog9plus.png",
    oldPrice: "$30.000",
    title: "Moto G9 Plus",
    price: "$15.250",
    pricePoints: "5000 + $3.470",
  },
  {
    id: 4,
    type: "points",
    image: "assets/img/main/a52.png",
    oldPrice: "$30.000",
    title: "Samsung A52",
    price: "$15.250",
    pricePoints: "7000 + $2.350",
  },
  {
    id: 5,
    type: "pricePoints",
    image: "assets/img/main/a02s.png",
    oldPrice: "$30.000",
    title: "Samsung A02s",
    price: "$15.250",
    pricePoints: "5000 + $5.350",
  },
  {
    id: 6,
    type: "pricePoints",
    image: "assets/img/main/motog100.png",
    oldPrice: "$30.000",
    title: "Moto G100",
    price: "$15.250",
    pricePoints: "5000 + $8.650",
  },
  {
    id: 7,
    type: "pricePoints",
    image: "assets/img/main/auriculares.png",
    oldPrice: "$10.000",
    title: "Auriculares Sony Bluetooth",
    price: "$5.250",
    pricePoints: "1000 + $1.050",
  },
  {
    id: 8,
    type: "pricePoints",
    image: "assets/img/main/sd32gb.png",
    oldPrice: "$1.200",
    title: "Memoria MicroSD 32Gb",
    price: "$1.000",
    pricePoints: "500 + $350",
  },
  {
    id: 9,
    type: "discount",
    image: "assets/img/main/iphone-se.png",
    oldPrice: "$100.000",
    title: "IPhone 12",
    price: "$55.250",
    pricePoints: "35000 + $25.000",
  },
];

// id: 1,
// type: "points",
// image: "assets/img/main/samsunggalaxyzfold2.png",
// oldPrice: "$30.000",
// title: "IPhone",
// price: "$15.250",
// pricePoints: "5000 + $5.350"

for (let i = 0; i < listaProductos.length; i++) {
  let id = listaProductos[i].id;
  let type = listaProductos[i].type;
  let image = listaProductos[i].image;
  let title = listaProductos[i].title;
  let oldPrice = listaProductos[i].oldPrice;
  let price = listaProductos[i].price;
  let pricePoints = listaProductos[i].pricePoints;
  let primerSeccion = document.getElementById("primeraSeccion");
  let segundaSeccion = document.getElementById("segundaSeccion");
  let tercerSeccion = document.getElementById("terceraSeccion");
  let div = document.createElement("div");
  div.classList.add("col-xl-3", "col-lg-4", "col-md-6", "gy-4");
  div.innerHTML = `
        <a href="#" class="card position-static text-dark">
            <div class="bg-img-container">
                <img src=${image} alt=""
                    class="img-fluid position absolute top-0 p-4">
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center card-descuento-container">
                    <div class="card-descuento">
                        <p>
                            - 15% OFF
                        </p>
                    </div>
                    <p class="text-muted card-precio-anterior">
                        ${oldPrice}
                    </p>
                </div>
                <h5 class="card-title">${title}</h5>
                <div class="d-flex align-items-center card-coins-cost">
                    <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                    <p class="card-text">${price}</p>
                </div>
                <p class="text-muted text-uppercase pt-3 pb-2">
                    Puntos + Pesos
                </p>
                <div class="d-flex align-items-center card-coins-cost">
                    <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                    <p class="card-text text-muted fw-light">${pricePoints}</p>
                </div>
                <button class="btn btn-comprar shadow-none" id=${id}>
                    Comprar
                </button>
            </div>
        </a>`;
  if (type === "points") {
    primerSeccion.appendChild(div);
  }
  if (type === "pricePoints") {
    segundaSeccion.appendChild(div);
  }
  if (type === "discount") {
    tercerSeccion.appendChild(div);
  }
}
