/* ---------------------------------------------------- Creando Catalogo de productos en la pagina principal ---------------------------------------------------- */

for (const producto of listaProductos) {
  let id = producto.id;
  let type = producto.type;
  let image = producto.image;
  let title = producto.title;
  let oldPrice = producto.oldPrice;
  let price = producto.price;
  let pricePoints = producto.pricePoints;
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
                    Agregar al carrito
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

  /* --------------- evento al hacer click en "agregar al carrito" --------------- */

  let botonComprar = document.getElementById(`${id}`);
  botonComprar.onclick = (e) => {
    e.preventDefault();
    let usuarioLogueado = JSON.parse(localStorage.getItem("Usuario Logueado"));
    if (!usuarioLogueado.carrito) {
      usuarioLogueado.carrito = [];
    }
    // Esta function cambia el texto del boton "agregar al carrito" luego de 1.5s de haberlo presionado.
    function CambioTextoBoton() {
      if (botonComprar.innerText === "Agregar al carrito") {
        botonComprar.innerText = "Agregado al carrito!";
      }
      setTimeout(function () {
        botonComprar.innerText = "Agregar al carrito";
      }, 750);
    }

    for (const producto of usuarioLogueado.carrito) {
      if (producto.id === id) {
        producto.quantity = producto.quantity + 1; //++
        CambioTextoBoton();
        return localStorage.setItem(
          "Usuario Logueado",
          JSON.stringify(usuarioLogueado)
        );
      }
    }
    usuarioLogueado.carrito.push(producto);
    localStorage.setItem("Usuario Logueado", JSON.stringify(usuarioLogueado));
  };
}