class Producto {
    constructor(id, nombre, descripcion, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this. img = img;
        this.cantidad = 1;
    }
};

const papasFS = new Producto (1, "Papas Fritas", "Papas rústicas, fritas y condimentadas", 600, "../assets/img/papasFR.jpg");
const papasCD = new Producto (2, "Papas con cheddar", "Papas rústicas fritas con cheddar y verdeo", 800, "../assets/img/papasFR.jpg");
const hamburguesaBC = new Producto (3, "Hamburguesa BC", "Hamburguesa doble carne, con cheddar y bacon", 900, "../assets/img/papasFR.jpg");
const hamburguesaPM = new Producto (4, "Hamburguesa Pampeana", "Hamburguesa doble carne, con queso tybo y salsa criolla", 1200, "../assets/img/papasFR.jpg");
const tablaCH = new Producto (5, "Tabla Chica", "Tabla con variedad de quesos, fiambres y aceitunas", 1200, "../assets/img/papasFR.jpg");
const tablaGR = new Producto (6, "Tabla Grande", "Tabla con variedad de quesos, fiambres. Incluye fondeu", 2500, "../assets/img/papasFR.jpg");
const cervezaRB = new Producto (7, "Cerveza Rubia", "Tirada Artesanal", 600, "../assets/img/papasFR.jpg");
const cervezaIPA = new Producto (8, "Cerveza IPA", "Tirada Artesanal", 600, "../assets/img/papasFR.jpg");
const fernetBR = new Producto (9, "Fernet Branca", "Vaso de Fernet Branca 900cc.", 1000, "../assets/img/papasFR.jpg");
const agua = new Producto (10, "Agua Mineral", "Agua mineral 500ml", 300, "../assets/img/papasFR.jpg");

const menu = [papasFS, papasCD, hamburguesaBC, hamburguesaPM, tablaCH, tablaGR, cervezaRB, cervezaIPA, fernetBR, agua];

let carrito = [];

const wrapper = document.getElementById("wrapper");

const wrapperCarrito = document.getElementById("wrapperCarrito");

/** Modificación del DOM **/
const menuDinamico = () =>{
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
        agregar.addEventListener("click", ()=>{
            agregarProducto(producto.id);
        })
    })
};

menuDinamico();

     const agregarProducto = (id)=> {
    const productoAgregado = carrito.find(producto=> producto.id === id);
    if(productoAgregado){
        productoAgregado.cantidad++;
    } else {
        const producto = menu.find(producto =>producto.id === id);
        carrito.push(producto)
    }
    console.log(carrito); 
};

/** Mostrar el carrito **/

const carritoDinamico = ()=> {
    wrapperCarrito.innerHTML = "";
    carrito.forEach(producto =>{
        const itemCarrito = document.createElement("div");
        itemCarrito.className = ("itemCarrito");
        itemCarrito.innerHTML = `
                                <h3>${producto.nombre}</h3>
                                <p>${producto.precio}</p>
                                <p>${producto.cantidad}</p>
                                <p></p>
        `
        wrapperCarrito.appendChild(itemCarrito);
    })
};

carritoDinamico();