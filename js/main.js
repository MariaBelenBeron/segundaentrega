const productos = [
    { imagen: '💐', codigo: 1, tipo: 'producto', precio: 1500 },
    { imagen: '🌱', codigo: 2, tipo: 'producto', precio: 3500 },
    { imagen: '🌸', codigo: 3, tipo: 'producto', precio: 2700 },
    { imagen: '🌵', codigo: 4, tipo: 'producto', precio: 1800 },
    { imagen: '🌺', codigo: 5, tipo: 'producto', precio: 2200 },
    { imagen: '🍃', codigo: 6, tipo: 'producto', precio: 2900 },
    { imagen: '🌻', codigo: 7, tipo: 'producto', precio: 3100 },
    { imagen: '🌳', codigo: 8, tipo: 'producto', precio: 1600 }
];

const mensajeInicial = "SELECCIONA EL CÓDIGO DEL PRODUCTO QUE QUIERAS COMPRAR:\n" +
    productos.map(producto => `${producto.codigo}. ${producto.tipo} ${producto.imagen}- $${producto.precio}`).join('\n');

let carrito = [];

function buscarProducto(codigo) {
    return productos.find(producto => producto.codigo === parseInt(codigo));
}

function verCarrito() {
    console.table(carrito);
}

class Compra {
    constructor(carrito) {
        this.carrito = carrito;
    }

obtenerSubtotal() {
    return this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    }
}

function mostrarEnvio(envio) {
    let envioElement = document.getElementById('total-envio');
    envioElement.innerHTML = `<h3>Envío: $${envio}</h3>`;
}

function mostrarCuantasCuotas(cantidad) {
    let cuotasElement = document.getElementById('cuantas-cuotas');
    cuotasElement.innerHTML = `<h3>Cantidad de Cuotas: ${cantidad}</h3>`;
}

function mostrarTotalCuotas(precioCuota) {
    let totalCuotasElement = document.getElementById('total-cuotas');
    totalCuotasElement.innerHTML = `<h3>Cuotas de: $${precioCuota}</h3>`;
}

function mostrarTotal(total) {
    let totalElement = document.getElementById('total-text');
    totalElement.innerHTML = `<h3>Total: $${total}</h3>`;
}

function finalizarCompra() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito);
        let resultado = confirm("¿Desea pagar en cuotas sin interes?");
        let cuotas;
        if (resultado) {
            cuotas = prompt("Ingrese la cantidad de cuotas (3, 6 o 12):").trim();
            if (cuotas !== "3" && cuotas !== "6" && cuotas !== "12") {
                alert("❌ Cantidad de cuotas inválida, ingrese 3, 6 o 12");
                return finalizarCompra();
            } else {
                const valorCuota = shopping.obtenerSubtotal() / cuotas;
                alert("El valor de cada cuota es $" + valorCuota.toFixed(2));
            }
        }

        let costEnvio = 0;
        let envio = confirm("¿Desea agregar envío por $3000 🚚?");
        if (envio) {
            costEnvio = 3000;
        }

        let total = shopping.obtenerSubtotal() + costEnvio;
        mostrarTotal(total);

        if (envio) {
            mostrarEnvio(costEnvio);
        }

        if (resultado) {
            mostrarCuantasCuotas(cuotas);
            let precioCuota = shopping.obtenerSubtotal() / cuotas;
            mostrarTotalCuotas(precioCuota.toFixed(2));
        }

        let respuesta = confirm("¿Quieres realizar el pago?");
        if (respuesta) {
            alert(`El pago de $${total} fue exitoso ✅ \n ¡Muchas gracias por tu compra 🙂!`);
            carrito = [];
        }
    } else {
        console.warn("No hay productos en el carrito.");
    }
}

function comprar() {
    let codigo = prompt(mensajeInicial);
    if (!parseInt(codigo)) {
        alert("❌ Código inexistente, ingrese código válido.");
        let respuesta = confirm("¿Deseas intentar nuevamente?");
        if (respuesta) {
            comprar();
        }
        return;
    }

    let productoElegido = buscarProducto(codigo);
    if (productoElegido !== undefined) {
        alert(`El ${productoElegido.tipo} ${productoElegido.imagen} ha sido agregado al carrito.\nPrecio $${productoElegido.precio}`);
        carrito.push(productoElegido);
        let respuesta = confirm("¿Deseas llevar otro producto?");
        if (respuesta) {
            comprar();
        } else {
            finalizarCompra();
        }
    } else {
        alert("❌ Código inexistente, ingrese código válido.");
        let respuesta = confirm("¿Deseas intentar de nuevo?");
        if (respuesta) {
            comprar();
        }
    }
}

comprar();