let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const listado = document.getElementById("listado");

const listadoProductos = "../assets/json/productos.json";

fetch(listadoProductos)
.then(respuesta => respuesta.json())
.then(datos =>  {
    console.log(datos)
    datos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
                                <div class="tarjeta">
                                    <h3> ${producto.nombre} </h3>
                                    <img src="${producto.img}" alt="${producto.nombre}">
                                    <p> ${producto.descripcion} </p>
                                    <p>$${producto.precio} </p>
                                    <button id="agregar${producto.id}">Agregar al carrito</button>
                                </div>
                            `
        wrapper.appendChild(tarjeta);

        const agregar = document.getElementById(`agregar${producto.id}`);
            agregar.addEventListener("click", ()=> {
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

const agregarProducto = (id) => {
    const productoAgregado = carrito.find(producto => producto.id === id);
    if (productoAgregado) {
        productoAgregado.cantidad++;
    } else {
        const producto = listadoProductos.search(producto => producto.id === id);
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
            title: 'El carrito está vacio',
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
                                    <button class = "" id="eliminar${producto.id}" > Eliminar </button>
                                </div>
        `
        wrapperCarrito.appendChild(itemCarrito);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarItem(producto.id);
        })
    })
    sumaCarrito();
};

const eliminarItem = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    if (producto.cantidad === 1) {
        carrito.splice(indice, 1);
    } else {
        producto.cantidad--
    }
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

const finalizarCompra = document.getElementById("finalizarCompra");

finalizarCompra.addEventListener("click", () => {
    if (carrito.length >= 1) {
        Swal.fire({
            title: 'Su orden ha sido registrada con éxito!',
            text: 'el restaurante ya esta preparando tu pedido, te enviaremos los detalles por mail',
            icon: 'success',
            color: '#fafafa',
            background: '#494443',
            confirmButtonColor: '#000000'
        })
    } else {
        Swal.fire({
            title: 'El carrito está vacio',
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