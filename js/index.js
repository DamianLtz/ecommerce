/* ---------------------------------------------------- Creando Catalogo de productos en la pagina principal ---------------------------------------------------- */
for (const producto of listaProductos) {
  let id = producto.id;
  let type = producto.type;
  let image = producto.image;
  let title = producto.title;
  let oldPrice = producto.oldPrice;
  let price = producto.price;
  let description = producto.description;
  let div = document.createElement("div");
  div.classList.add("col-xl-3", "col-lg-4", "col-md-6", "gy-4");
  div.innerHTML = `
          <div class="card position-static text-dark">
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
                          ${oldPrice} puntos
                      </p>
                  </div>
                  <h5 class="card-title">${title}</h5>
                  <p class="text-muted py-3">
                  ${description}
                  </p>
                  <div class="d-flex align-items-center card-coins-cost">
                      <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                      <p class="card-text">${price}</p>
                  </div>
                  <button class="btn btn-comprar shadow-none" id=${id}>
                      Agregar al carrito
                  </button>
              </div>
          </div>`;
  if (type === "featured") {
    $("#primera");
    $("#primeraSeccion").append(div);
  }
  if (type === "products") {
    $("#segundaSeccion").append(div);
  }
  if (type === "discount") {
    $("#terceraSeccion").append(div);
  }

  /* --------------- evento al hacer click en "agregar al carrito" --------------- */

  $(`#${id}`).on("click", (e) => {
    e.preventDefault();
    let usuarioLogueado = JSON.parse(localStorage.getItem("Usuario Logueado"));
    if (!usuarioLogueado.carrito) {
      usuarioLogueado.carrito = [];
    }
    // Esto cambia el texto del boton "agregar al carrito" luego de X's de haberlo presionado.
    if ($(`#${id}`).text("Agregar al carrito")) {
      $(`#${id}`).text("Agregado al carrito!");
    }
    setTimeout(function () {
      $(`#${id}`).text("Agregar al carrito");
    }, 850);

    for (const producto of usuarioLogueado.carrito) {
      if (producto.id === id) {
        producto.quantity = producto.quantity + 1; //++
        return localStorage.setItem(
          "Usuario Logueado",
          JSON.stringify(usuarioLogueado)
        );
      }
    }
    usuarioLogueado.carrito.push(producto);
    localStorage.setItem("Usuario Logueado", JSON.stringify(usuarioLogueado));
  });
}
