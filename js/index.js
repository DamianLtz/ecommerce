/* ---------------------------------------------------- Creando Categorias y el Catalogo de productos en la pagina principal ---------------------------------------------------- */
$(function () {
  const GETJSON = "https://api.jsonbin.io/b/612d354d259bcb6118ef5034/7";
  $.get(GETJSON, function (respuesta, estado) {
    if (estado === "success") {
      let listaProductos = respuesta.listaProductos;
      let listaCategorias = respuesta.listaCategorias;

      // ----------------------------------------------------- //

      const AgregarAlCarrito = (producto) => {
        $(`#${producto.id}`).on("click", (e) => {
          e.preventDefault();
          let usuarioLogueado = JSON.parse(
            localStorage.getItem("Usuario Logueado")
          );
          if (!usuarioLogueado.carrito) {
            usuarioLogueado.carrito = [];
          }

          // Esto cambia el texto del boton "agregar al carrito" luego de X's segundos de haberlo presionado.

          if ($(`#${producto.id}`).text("Agregar al carrito")) {
            $(`#${producto.id}`).text("Agregado al carrito!");
            $(`#${producto.id}`).addClass("disabled");
          }
          setTimeout(function () {
            $(`#${producto.id}`).text("Agregar al carrito");
            $(`#${producto.id}`).removeClass("disabled");
          }, 850);

          for (const productoCarrito of usuarioLogueado.carrito) {
            if (productoCarrito.id === producto.id) {
              productoCarrito.quantity = productoCarrito.quantity + 1; //++
              return localStorage.setItem(
                "Usuario Logueado",
                JSON.stringify(usuarioLogueado)
              );
            }
          }
          usuarioLogueado.carrito.push(producto);
          localStorage.setItem(
            "Usuario Logueado",
            JSON.stringify(usuarioLogueado)
          );
        });
      };

      // ----------------------------------------------------- //
      for (const categoria of listaCategorias) {
        $(".categorias-container").append(`
        <button href="#" class="btn shadow-none btn-drop-shadow p-0 col-lg-2 col-md-3 col-sm-4 col-xs-6 gy-4 gy-lg-0"
        id=${categoria.id}>
          <div class="btn-categoria-container">
          <div class="btn-categoria">
          <img src=${categoria.image} alt="">
          <p class="d-none d-sm-block">${categoria.name}</p>
          </div>
          </div>
          <p class="d-sm-none d-block mb-4 mt-1 fw-bold">${categoria.name}</p>
        </button>
        `);

        /* --------------------------- Crea el titulo de las categorias según la categoria seleccionada --------------------------- */

        $(`#${categoria.id}`).on("click", (e) => {
          e.preventDefault();
          if (`${categoria.id}` === "Todos") {
            $("#seccionProductos").html(``).fadeOut(0);
            $("#titulo-container").html(``);
            $("#titulo-container").append(`
              <h2 class="text-nowrap">${categoria.title}</h2>`);
            for (const producto of listaProductos) {
              $("#seccionProductos")
                .append(
                  `<div class="col-xl-3 col-lg-4 col-md-6 gy-4">
                      <div class="card position-static text-dark">
                        <div class="bg-img-container">
                            <img src=${producto.image} alt=""
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
                                      ${producto.oldPrice} puntos
                                  </p>
                              </div>
                              <h5 class="card-title">${producto.title}</h5>
                              <p class="text-muted text-truncate py-3">
                              ${producto.description}
                              </p>
                              <div class="d-flex align-items-center card-coins-cost">
                                  <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                                  <p class="card-text">${producto.price}</p>
                              </div>
                              <button class="btn btn-comprar shadow-none" id=${producto.id}>
                              Agregar al carrito
                              </button>
                              </div>
                              </div>
                              </div>`
                )
                .fadeIn(500);
              const usuarioLogueadoExiste = JSON.parse(
                localStorage.getItem("Usuario Logueado")
              );
              if (usuarioLogueadoExiste === null) {
                $(`#${producto.id}`).remove();
              }
              AgregarAlCarrito(producto);
            }
          } else {
            $("#seccionProductos").html(``).fadeOut(0);
            $("#titulo-container").html(``);
            $("#titulo-container h2").text(`${categoria.title}`);
            $("#titulo-container").append(`
              <h2 class="text-nowrap">${categoria.title}</h2>
              <img src=${categoria.image} alt="" class="ms-3 icon-categoria">`);

            /* --------------------------- Crea los productos según la categoria seleccionada --------------------------- */

            for (const producto of listaProductos) {
              if (producto.category === `${categoria.id}`) {
                $("#seccionProductos")
                  .append(
                    `
              <div class="col-xl-3 col-lg-4 col-md-6 gy-4">
              <div class="card position-static text-dark">
                <div class="bg-img-container">
                    <img src=${producto.image} alt=""
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
                              ${producto.oldPrice} puntos
                          </p>
                      </div>
                      <h5 class="card-title">${producto.title}</h5>
                      <p class="text-muted text-truncate py-3">
                      ${producto.description}
                      </p>
                      <div class="d-flex align-items-center card-coins-cost">
                          <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                          <p class="card-text">${producto.price}</p>
                      </div>
                      <button class="btn btn-comprar shadow-none" id=${producto.id}>
                      Agregar al carrito
                      </button>
                      </div>
                      </div>
                      </div>`
                  )
                  .fadeIn(500);
              }
              const usuarioLogueadoExiste = JSON.parse(
                localStorage.getItem("Usuario Logueado")
              );
              if (usuarioLogueadoExiste === null) {
                $(`#${producto.id}`).remove();
              }
              AgregarAlCarrito(producto);
            }
          }
        });
      }

      /* --------------------------- Crea los producto la 1° vez al ingresar al Home. --------------------------- */

      for (const producto of listaProductos) {
        $("#seccionProductos").append(`
        <div class="col-xl-3 col-lg-4 col-md-6 gy-4">
          <div class="card position-static text-dark">
          <div class="bg-img-container">
          <img src=${producto.image} alt=""
          class="img-fluid p-4">
          </div>
          <div class="card-body">
          <div class="d-flex align-items-center card-descuento-container">
          <div class="card-descuento">
          <p>
          - 15% OFF
          </p>
          </div>
          <p class="text-muted card-precio-anterior">
          ${producto.oldPrice} puntos
          </p>
          </div>
          <h5 class="card-title">${producto.title}</h5>
          <p class="text-muted text-truncate py-3">
                  ${producto.description}
                  </p>
                  <div class="d-flex align-items-center card-coins-cost">
                      <img src="assets/img/main/coin.png" alt="" class="img-fluid coin">
                      <p class="card-text">${producto.price}</p>
                  </div>
                  <button class="btn btn-comprar shadow-none" id=${producto.id}>
                      Agregar al carrito
                  </button>
              </div>
            </div>
        </div>`);

        // El botón "agregar al carrito" SOLO aparece si hay un usuario logueado , de lo contrario no se muestra.

        const usuarioLogueadoExiste = JSON.parse(
          localStorage.getItem("Usuario Logueado")
        );

        if (usuarioLogueadoExiste === null) {
          $(`#${producto.id}`).remove();
        }

        /* --------------- function que llama el evento al hacer click en "agregar al carrito" --------------- */

        AgregarAlCarrito(producto);
      }
    }
  });
});
