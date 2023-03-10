let carrito = [];

let productos = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const listadoProductos = "../assets/json/productos.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        productos = datos;
        datos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");
            tarjeta.classList.add("articulo")
            tarjeta.innerHTML = `
                                <div>
                                    <h3> ${producto.nombre} </h3>
                                    <img src="${producto.img}" alt="${producto.nombre}">
                                    <p> ${producto.descripcion} </p>
                                    <p>$${producto.precio} </p>
                                    <button id="agregar${producto.id}">Agregar al carrito</button>
                                </div>
                            `
            wrapper.appendChild(tarjeta);

            const agregar = document.getElementById(`agregar${producto.id}`);
            agregar.addEventListener("click", () => {
                agregarProducto(producto.id);
                Toastify({
                    text: "Producto agregado al carrito!",
                    duration: 1000,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#65B262",
                    }
                }).showToast();
            })
        })
    })
    .catch(error => console.error(error));


const agregarProducto = (id) => {
    const productoAgregado = carrito.find(producto => producto.id === id);
    if (productoAgregado) {
        productoAgregado.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto)
    }
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


const wrapperCarrito = document.getElementById("wrapperCarrito");
const verCarrito = document.getElementById("btnCarrito");
verCarrito.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'El carrito est?? vacio',
            text: 'primero debes agregar productos al carrito',
            icon: 'warning',
            color: '#fafafa',
            background: '#494443',
            confirmButtonColor: '#000000'
        })
    }
    carritoDinamico();
})

const carritoDinamico = () => {
    wrapperCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const itemCarrito = document.createElement("div");
        itemCarrito.className = ("itemCarrito");
        itemCarrito.innerHTML = `
                                <div>
                                    <h3>${producto.nombre}</h3>
                                    <p>Precio: $${producto.precio}</p>
                                    <p>Cantidad: ${producto.cantidad}</p>
                                    <button id="a??ade${producto.id}"> + </button>
                                    <button id="quita${producto.id}"> - </button>
                                    <button id="eliminar${producto.id}"> Eliminar </button>
                                </div>
        `
        wrapperCarrito.appendChild(itemCarrito);

        const botonMas = document.getElementById(`a??ade${producto.id}`);
        botonMas.addEventListener("click", () => {
            a??ade(producto.id)
        })

        const botonMenos = document.getElementById(`quita${producto.id}`);
        botonMenos.addEventListener("click", () => {
            quita(producto.id)
        })

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarItem(producto.id);
        })
    })
    sumaCarrito();
};

const a??ade = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoDinamico();
}

const quita = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad--;
    if (producto.cantidad === 0) {
        eliminarItem(id);
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    carritoDinamico();
}

const eliminarItem = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    carritoDinamico();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const limpiarCarrito = document.getElementById("limpiarCarrito");
limpiarCarrito.addEventListener("click", () => {
    vaciarCarrito();
})
const vaciarCarrito = () => {
    carrito = [];
    carritoDinamico();
    localStorage.clear();
}

const totalCompra = document.getElementById("totalCompra");
const sumaCarrito = () => {
    let precioFinal = 0;
    carrito.forEach(producto => {
        precioFinal += producto.precio * producto.cantidad;
    })
    totalCompra.innerHTML = `${precioFinal}`;
}

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", e => {
    console.log(e.target.value)
    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = "";

        document.querySelectorAll(".articulo").forEach(tarjeta => {

            tarjeta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? tarjeta.classList.remove("filtro")
                : tarjeta.classList.add("filtro");
        })
    }
})

const finalizarCompra = document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    if (carrito.length >= 1) {
        Swal.fire({
            title: 'Su orden ha sido registrada con ??xito!',
            text: 'el restaurante ya esta preparando tu pedido, te enviaremos los detalles por mail',
            icon: 'success',
            color: '#fafafa',
            background: '#494443',
            confirmButtonColor: '#000000'
        })
    } else {
        Swal.fire({
            title: 'El carrito est?? vacio',
            text: 'primero debes agregar productos al carrito',
            icon: 'warning',
            color: '#fafafa',
            background: '#494443',
            confirmButtonColor: '#000000'
        })
    }
    vaciarCarrito();
    modal.classList.remove("mostrarModal");
})

const abrirModal = document.querySelector(".abrirModal");
const cerrarModal = document.querySelector(".cerrarModal");
const modal = document.querySelector(".modalCarrito");

abrirModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("mostrarModal")
})

cerrarModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("mostrarModal")
})
