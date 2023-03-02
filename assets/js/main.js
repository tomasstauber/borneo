//IMPORTANTE//
//La consigna solicitada para la tercer PreEntega esta realizada en el archivo: productos.js, el sistema de reservas del index aun no está terminado
const irPedidos = document.getElementById("irPedidos");

const iraPedidos = () =>{
    location.href = "./pages/pedidos.html"
}

irPedidos.addEventListener("click", () =>{
    iraPedidos();
})
