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

const reservar = () => {
    const nombre = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const dni = document.getElementById("dni").value
    const fecha = document.getElementById("fecha").value
    const hora = document.getElementById("hora").value
    const cantidad = document.getElementById("cantidad").value

    const reserva = {
        nombre: nombre,
        email: email,
        dni: dni,
        fecha: fecha,
        hora: hora,
        cantidad: cantidad
    }
    console.log(reserva);
    localStorage.setItem("reserva", JSON.stringify(reserva));
}

const reservaOk = () => {
    Swal.fire({
        title: 'Su reserva ha sido registrada con éxito!',
        text: 'te enviaremos los detalles y métodos de pago al mail que nos indicaste',
        icon: 'success',
        color: '#fafafa',
        background: '#494443',
        confirmButtonColor: '#000000'
    }) 
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    reservar();
    reservaOk();
});

formulario.addEventListener("reset", () =>{
    Swal.fire({
        title: 'Estás seguro de cancelar tu reserva?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Continuar con la reserva',
        confirmButtonColor: '#d33' ,
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, deseo cancelarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '',
            'Su reserva ha sido cancelada',
            'success'
          )
        }
      })
})