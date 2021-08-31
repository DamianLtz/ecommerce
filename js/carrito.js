/* --------------- Obtener el carrito del usuario logueado. --------------- */
$(function () {
  let obtenerUsuarioLogueado = JSON.parse(
    localStorage.getItem("Usuario Logueado")
  );
  let obtenerCarritoUsuario = obtenerUsuarioLogueado.carrito;

  if (obtenerCarritoUsuario === undefined) {
    obtenerCarritoUsuario = [];
  }

  if (obtenerCarritoUsuario.length === 0) {
    $("#carritoDeCompras").addClass("row");
    $("#carritoDeCompras").prepend(`
                  <div class="col-lg-12">
                      <h1 class="text-center">Ups! Parece que tu carrito esta vacío</h1>
                      <h2 class="text-center pt-5">Agrega primero productos a tu carrito para verlos aquí.</h2>
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
            <div class="d-flex justify-content-lg-evenly justify-content-center align-items-center">
                <div class="d-flex align-items-center container-price">
                <div class="d-flex align-items-center pt-2">
                <img src="assets/img/main/coin.png" alt="" class="coin">
                <p class="text-dark fs-4 mx-2" id=${idProducto}-costo>${
        precioProducto * cantidadProducto
      }</p>
                </div>
                    <p class="text-muted pe-2" id="cantidadProducto">Cantidad:</p>
                    <div class="container-buttons">
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
                    <button class="btn btn-danger p-1 ms-2 d-none d-lg-block" id=${idProducto}-delete>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="#ffffff" class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </div>
            </div>
            <button class="btn btn-danger mt-3 w-100 d-lg-none" id=${idProducto}>
                        Eliminar
            </button>
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
          $("#carritoDeCompras").append(`
        <div class="col-lg-12">
        <h1 class="text-center">Ups! Parece que tu carrito esta vacío</h1>
        <h2 class="text-center pt-5">Agrega primero productos a tu carrito para verlos aquí.</h2>
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

        $("#box-botonPagar").on("click", () => {
          /* --------------------- Calcular si el monto es correcto para pagar los productos con los puntos al presionar "pagar". --------------------- */
          let montoUsuario = parseInt($("#monto").text());
          let montoFinal = calcularMonto();
          if (montoUsuario - montoFinal < 0) {
            return $("#errorCompra").removeClass("d-none");
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
});
