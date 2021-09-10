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

      const cargarProductosSegunCategoria = (categoria) => {
        if (`${categoria.id}` === "Todos") {
          $("#seccionProductos").html(``).fadeOut(0);
          $("#titulo-container").html(``);
          $("#titulo-container").append(`
            <h2 class="text-nowrap" id="${categoria.name}">${categoria.title}</h2>`);
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
                                    <p aria-hidden="true">
                                        - 15% OFF
                                    </p>
                                </div>
                                <p class="text-muted card-precio-anterior" aria-hidden="true">
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
            <h2 class="text-nowrap" id=${categoria.id}-categoria>${categoria.title}</h2>
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
                            <p aria-hidden="true">
                                - 15% OFF
                            </p>
                        </div>
                        <p class="text-muted card-precio-anterior" aria-hidden="true">
                            ${producto.oldPrice}
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
      };
      // ----------------------------------------------------- //
      for (const categoria of listaCategorias) {
        /* ---------------------------- Categorias del Header. ---------------------------- */

        $("#navbarDropdown-category").append(`
            <li><a class="dropdown-item ${categoria.id}">${categoria.title}</a></li>`);

        /* ---------------------------- Categorias del Main. ---------------------------- */

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

        // En El Header.

        $(`.${categoria.id}`).on("click", (e) => {
          e.preventDefault();
          cargarProductosSegunCategoria(categoria);
          window.scroll(0, 500);
        });

        // En El Main.

        $(`#${categoria.id}`).on("click", (e) => {
          e.preventDefault();
          cargarProductosSegunCategoria(categoria);
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
          <p aria-hidden="true">
          - 15% OFF
          </p>
          </div>
          <p class="text-muted card-precio-anterior" aria-hidden="true">
          ${producto.oldPrice}
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

  /* ------------------------------------------------------------------ Vista del Carrito ------------------------------------------------------------------ */

  $("#carrito-view").hide();

  function vistaCarrito() {
    let obtenerUsuarioLogueado = JSON.parse(
      localStorage.getItem("Usuario Logueado")
    );
    let obtenerCarritoUsuario = obtenerUsuarioLogueado.carrito;

    if (obtenerCarritoUsuario === undefined) {
      obtenerCarritoUsuario = [];
    }

    if (obtenerCarritoUsuario.length === 0) {
      $("#carritoDeCompras").html(``);
      $("#carritoDeCompras").addClass("row");
      $("#carritoDeCompras").prepend(`
                  <div class="d-flex flex-column justify-content-center align-items-center col-lg-12">
                      <h1>Ups! Parece que tu carrito esta vacío</h1>
                      <h2 class="pt-5">Agrega primero productos a tu carrito para verlos aquí.</h2>
                      <a href="index.html" class="fs-4 pt-5">Volver al catalogo</a>
                  </div>`);
    } else {
      // Crea el carrito según los productos seleccionados previamente.

      for (const producto of obtenerCarritoUsuario) {
        let tituloProducto = producto.title;
        let descripcionProducto = producto.description;
        let imagenProducto = producto.image;
        let precioProducto = producto.price;
        let idProducto = producto.id;
        let cantidadProducto = producto.quantity;
        $("#carritoDeCompras").addClass(
          "row align-items-center justify-content-center"
        );
        $("#carritoDeCompras").append(`
    <div class="row align-items-center justify-content-center my-3 my-lg-2 py-lg-4 py-3 box-item-carrito" id=${idProducto}>
    <div class="col-lg-2 col-md-2 col-sm-3 d-flex justify-content-center">
    <img src=${imagenProducto} alt="" class="img-producto-carrito"
        id="imgProductoCarrito">
  </div>
<div class="col-lg-10 col-md-10 col-sm-9">
    <div class="row align-items-center">
        <div class="col-lg-6 col-md-4 col-sm-12 gy-lg-0 gy-3">
            <h4 class="text-dark">${tituloProducto}</h4>
            <p class="text-muted pt-3">${descripcionProducto}</p>
        </div>
        <div class="col-lg-6 col-md-8 col-sm-12 gy-lg-0 gy-3">
            <div class="d-flex justify-content-lg-evenly justify-content-center align-items-lg-center column-mobile">
                <div class="d-flex align-items-center container-price">
                <div class="d-flex align-items-center py-2 py-lg-0 order-3 order-lg-0">
                <img src="assets/img/main/coin.png" alt="" class="coin">
                <p class="text-dark fs-4 mx-2" id=${idProducto}-costo>${
          precioProducto * cantidadProducto
        }</p>
                </div>
                <p class="text-muted pe-0 pe-lg-2">Unidades:</p>
                    <div class="container-buttons py-2">
                        <button class="border border-primary p-0 bg-primary rounded-circle" id=${idProducto}-minus>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                              </svg>
                        </button>
                        <p class="mx-2 px-2 py-1 border-cantidad" id=${idProducto}-cantidad>${cantidadProducto}</p>
                        <button class="border border-primary p-0 bg-primary rounded-circle" id=${idProducto}-add>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                              </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <button class="btn btn-danger p-1 mt-2 mt-lg-0 ms-0 ms-lg-1 w-100" id=${idProducto}-delete>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="#ffffff" class="bi bi-trash d-none d-lg-inline-block" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        <p class="d-block d-lg-none">Eliminar</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`);

        /* --------------- evento al hacer click en "sumar" a la cantidad de productos. --------------- */

        let cantidad = $(`#${idProducto}-cantidad`);
        let costo = $(`#${idProducto}-costo`);

        $(`#${idProducto}-add`).on("click", () => {
          let obtenerUsuarioLogueado = JSON.parse(
            localStorage.getItem("Usuario Logueado")
          );
          cantidad.removeClass("border-danger");
          if (producto.quantity === 10) {
            cantidad.addClass("border-danger");
          } else {
            producto.quantity++;
            for (const productoEnCarrito of obtenerUsuarioLogueado.carrito) {
              if (producto.id === productoEnCarrito.id) {
                productoEnCarrito.quantity++;
              }
            }
            localStorage.setItem(
              "Usuario Logueado",
              JSON.stringify(obtenerUsuarioLogueado)
            );
            cantidad.text(parseInt(cantidad.text()) + 1);
            costo.text(`${precioProducto * producto.quantity}`);
            calcularMonto();
          }
        });

        /* --------------- evento al hacer click en "restar" a la cantidad de productos. --------------- */

        $(`#${idProducto}-minus`).on("click", () => {
          let obtenerUsuarioLogueado = JSON.parse(
            localStorage.getItem("Usuario Logueado")
          );
          if (producto.quantity === 1) {
            cantidad.addClass("border-danger");
          } else {
            producto.quantity--;
            for (const productoEnCarrito of obtenerUsuarioLogueado.carrito) {
              if (producto.id === productoEnCarrito.id) {
                productoEnCarrito.quantity--;
              }
            }
            localStorage.setItem(
              "Usuario Logueado",
              JSON.stringify(obtenerUsuarioLogueado)
            );
            cantidad.text(parseInt(cantidad.text()) - 1);
            cantidad.removeClass("border-danger");
            costo.text(`${precioProducto * producto.quantity}`);
            calcularMonto();
          }
        });
        /* --------------- evento al hacer click en "eliminar" en el producto. --------------- */

        $(`#${idProducto}-delete`).on("click", () => {
          let obtenerUsuarioLogueado = JSON.parse(
            localStorage.getItem("Usuario Logueado")
          );
          let obtenerCarritoUsuario = obtenerUsuarioLogueado.carrito;
          const productosRestantes = [];
          for (const producto of obtenerCarritoUsuario) {
            if (producto.id !== idProducto) {
              productosRestantes.push(producto);
            }
          }
          obtenerUsuarioLogueado.carrito = productosRestantes;
          localStorage.setItem(
            "Usuario Logueado",
            JSON.stringify(obtenerUsuarioLogueado)
          );
          $(`#${idProducto}`).remove();
          botonPagar();
          if (obtenerUsuarioLogueado.carrito.length === 0) {
            $("#carritoDeCompras").html(``);
            $("#carritoDeCompras").append(`
            <div class="d-flex flex-column justify-content-center align-items-center col-lg-12">
              <h1>Ups! Parece que tu carrito esta vacío</h1>
              <h2 class="pt-5">Agrega primero productos a tu carrito para verlos aquí.</h2>
              <a href="index.html" class="fs-4 pt-5">Volver al catalogo</a>
            </div>`);
          }
        });
      }
    }
    // Al presionar botón pagar sale el msj "gracias por su compra o puntos insuficientes."

    function botonPagar() {
      let obtenerUsuarioLogueado = JSON.parse(
        localStorage.getItem("Usuario Logueado")
      );
      if (obtenerUsuarioLogueado.carrito.length !== 0) {
        if ($("#botonPagar").length === 0) {
          $("#carritoDeCompras").append(`
      <div class="pt-3" id="box-botonPagar">
        <div class="d-flex align-items-center justify-content-end">
          <div class="d-flex align-items-center">
            <h4 class="fw-light me-3">Total: </h4>
            <img src="assets/img/main/coin.png" alt="" class="coin me-2">
            <h4 class="fw-light me-3" id="total"></h4>
          </div>
          <button class="btn btn-primary" id="botonPagar">
              Pagar
          </button>
        </div>
      </div>  
        <p class="d-none text-danger text-end pt-2 pe-1 fw-bold" id="errorCompra">Error , puntos insuficientes</p>`);

          $("#botonPagar").on("click", () => {
            /* --------------------- Calcular si el monto es correcto para pagar los productos con los puntos al presionar "pagar". --------------------- */
            let montoUsuario = parseInt($("#monto").text());
            let montoFinal = calcularMonto();
            if (montoUsuario - montoFinal < 0) {
              $("#errorCompra").removeClass("d-none");
              return setTimeout(function () {
                $("#errorCompra").addClass("d-none");
              }, 1000);
            } else {
              $("#errorCompra").remove();
              $("#monto").text(`${montoUsuario - montoFinal}`);
              obtenerUsuarioLogueado = JSON.parse(
                localStorage.getItem("Usuario Logueado")
              );
              obtenerUsuarioLogueado.puntos = parseInt($("#monto").text());
            }

            /* ------------------------------------- Al clickear en pagar , borra todos los elementos del carrito tanto en pantalla como en el localStorage ------------------------------------- */

            let itemsCarrito = $(".box-item-carrito");
            for (const item of itemsCarrito) {
              item.remove();
            }
            $("#box-botonPagar").remove();
            obtenerUsuarioLogueado.carrito = [];
            localStorage.setItem(
              "Usuario Logueado",
              JSON.stringify(obtenerUsuarioLogueado)
            );
            $("#carritoDeCompras").append(`
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1 class="text-center">Muchas gracias por su compra!</h1>
          <a href="index.html" class="fs-4 pt-5">Volver al catalogo</a>
        </div>`);
          });
        }
      } else {
        if ($("#box-botonPagar")) {
          $("#box-botonPagar").remove();
        }
      }
      if (obtenerUsuarioLogueado.carrito.length !== 0) {
        calcularMonto();
      }
    }
    // Calcula el monto restante del usuario segun la cantidad de productos en el carrito.

    function calcularMonto() {
      let obtenerUsuarioLogueado = JSON.parse(
        localStorage.getItem("Usuario Logueado")
      );
      let carritoUsuario = obtenerUsuarioLogueado.carrito;
      let montoFinal = 0;
      for (const producto of carritoUsuario) {
        montoFinal = montoFinal + producto.price * producto.quantity;
      }
      $("#total").text(montoFinal);
      return montoFinal;
    }

    botonPagar();
  }

  $(".shop-cart-container").on("click", () => {
    $("#index-view").fadeOut(350);
    $("#carrito-view").fadeIn(450);
    $(".shop-cart-container").remove();
    $(".navbar-nav").remove();
    $(".navbar-collapse").css("flex-grow", "0");
    vistaCarrito();
  });
});
