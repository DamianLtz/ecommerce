$(function () {
  // Esta funcion tiene que retornar true si los titulos son parecidos o iguales y false si no lo son
  const tituloParaComparar = (tituloIngresado, tituloParaComparar) => {
    if (similarity(tituloIngresado, tituloParaComparar)) {
      return true;
    } else {
      return false;
    }
  };

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength) >
      0.4
    );
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
  /* -------------------------------------------------------------- */

  const GETJSON = "https://api.jsonbin.io/b/612d354d259bcb6118ef5034/7";
  $.get(GETJSON, function (respuesta, estado) {
    if (estado === "success") {
      let listaProductos = respuesta.listaProductos;

      /* ---------------------------------------- */

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

      // quiero recopilar resultados que coincidan con lo que el usuario pone en el input -> necesito una letiable donde guardar esos resultados.

      $("#searchIcon").on("click", (e) => {
        e.preventDefault();
        window.scroll(0, 500);
        let resultados = [];
        for (const producto of listaProductos) {
          for (const palabra of producto.title.split(" ")) {
            if (tituloParaComparar($("#searchInput").val(), palabra)) {
              if (!resultados.includes(producto)) {
                // Evita duplicar resultados.
                resultados.push(producto);
              }
            }
          }
        }
        $("#seccionProductos").html(``);

        if (resultados.length === 0) {
          $("#seccionProductos").append(`
          <h2 class="py-5 text-center">No se han encontrado resultados</h2>
          `);
        }

        for (const producto of resultados) {
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
          AgregarAlCarrito(producto);
        }
      });

      $("#searchInput").keyup(function (event) {
        if (event.key === "Enter") {
          $("#searchIcon").click();
        }
      });

      $(".form-style").submit(function (event) {
        event.preventDefault();
      });
    }
  });
});
