class Producto {
    constructor(id, nombre, descripcion, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
};

const papasFS = new Producto(1, "Papas Fritas", "Papas rústicas, fritas y condimentadas", 600, "../assets/img/papasFR.jpg");
const papasCD = new Producto(2, "Papas con cheddar", "Papas rústicas fritas con cheddar y verdeo", 800, "../assets/img/papasFR.jpg");
const hamburguesaBC = new Producto(3, "Hamburguesa BC", "Hamburguesa doble carne, con cheddar y bacon", 900, "../assets/img/papasFR.jpg");
const hamburguesaPM = new Producto(4, "Hamburguesa Pampeana", "Hamburguesa doble carne, con queso tybo y salsa criolla", 1200, "../assets/img/papasFR.jpg");
const tablaCH = new Producto(5, "Tabla Chica", "Tabla con variedad de quesos, fiambres y aceitunas", 1200, "../assets/img/papasFR.jpg");
const tablaGR = new Producto(6, "Tabla Grande", "Tabla con variedad de quesos, fiambres. Incluye fondeu", 2500, "../assets/img/papasFR.jpg");
const cervezaRB = new Producto(7, "Cerveza Rubia", "Tirada Artesanal", 600, "../assets/img/papasFR.jpg");
const cervezaIPA = new Producto(8, "Cerveza IPA", "Tirada Artesanal", 600, "../assets/img/papasFR.jpg");
const fernetBR = new Producto(9, "Fernet Branca", "Vaso de Fernet Branca 900cc.", 1000, "../assets/img/papasFR.jpg");
const agua = new Producto(10, "Agua Mineral", "Agua mineral 500ml", 300, "../assets/img/papasFR.jpg");

const menu = [papasFS, papasCD, hamburguesaBC, hamburguesaPM, tablaCH, tablaGR, cervezaRB, cervezaIPA, fernetBR, agua];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const wrapper = document.getElementById("wrapper");

const menuDinamico = () => {
    menu.forEach(producto => {
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
        agregar.addEventListener("click", () => {
            agregarProducto(producto.id);
            Toastify({
                text: "Producto agregado al carrito!",
                duration: 2000,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#65B262",
                }
            }).showToast();
        })
    })
};

menuDinamico();

const agregarProducto = (id) => {
    const productoAgregado = carrito.find(producto => producto.id === id);
    if (productoAgregado) {
        productoAgregado.cantidad++;
    } else {
        const producto = menu.find(producto => producto.id === id);
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
            title: 'Su pedido ha sido registrado con éxito!',
            text: 'en unos minutos podrás ver su estado en tiempo real',
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
})  