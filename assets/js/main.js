//IMPORTANTE//
//La consigna solicitada para la tercer PreEntega esta realizada en el archivo: productos.js, el sistema de reservas del index aun no está terminado
const irPedidos = document.getElementById("irPedidos");

const iraPedidos = () =>{
    location.href = "./pages/pedidos.html"
}

irPedidos.addEventListener("click", () =>{
    iraPedidos();
})

const loaderContainer = document.querySelector('.loading');
let inicio = new Date;

window.addEventListener('load', () => {
    
    let fin = new Date;
    let segundos = (fin-inicio);

    if(segundos < 2000){
        setTimeout(() => {
            loaderContainer.style.display = 'none';
        }, 2000);
    }else{
        loaderContainer.style.display = 'none';
    }
});

const formulario =document.getElementById("formulario");

const reservar = (event) => {
    event.preventDefault();
    const datos = new FormData(event.target);
    const datosCompletos = Object.fromEntries(datos.entries());
    console.log(JSON.stringify(datosCompletos));
}

const procesaDatos = (event) => {
    event.preventDefault();
    const datos = new FormData(event.target);
    const nombre = datos.get("nombre");
    const email = datos.get("email");
    const dni = datos.get("dni");
    const fecha = datos.get("fecha");
    const hora = datos.get("hora");
    const cantidad = datos.get("cantidad");
    console.log({nombre}, {email}, {dni}, {fecha}, {hora}, {cantidad})
}

formulario.addEventListener("submit", reservar);