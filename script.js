const productos = [
    {id: 1, nombre: "CUARZO ROSA", precio: 650, imagen: "images/cuarzo-rosa.jpg"}, 
    {id: 2, nombre: "AMATISTA", precio: 680, imagen: "images/amatista.jpg"}, 
    {id: 3, nombre: "CUARZO CRISTAL", precio: 630, imagen: "images/cuarzo-cristal.jpg"}, 
    {id: 4, nombre: "VELA DRAMA", precio: 580, imagen: "images/velas1.jpg"}, 
    {id: 5, nombre: "VELA ROSE", precio: 590, imagen: "images/velas2.jpg"}, 
    {id: 6, nombre: "VELA AWESOME", precio: 560, imagen: "images/velas3.jpg"},  
]


// creacion de carrito
let carrito = []

const mostrar = document.getElementById("mostrarCarrito")
// guardar productos del carrito en el localstorage
if(localStorage.getItem("carrito")) {
    tareas = JSON.parse(localStorage.getItem("carrito"))
    
} else {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// interaccion con el dom y ejecucion de eventos
const contenedor = document.getElementById("contenedorProductos")

// mostrar los productos cuando el usuario ingrese a la pagina.
productos.forEach((producto) => {
    const div = document.createElement("div")
    div.classList.add("divPadre")
    div.innerHTML += `
        <div class="card" style="width: 18rem; height: 25rem;">
            <img src="${producto.imagen}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title fw-light tituloProd">  ${producto.nombre} </h5>
                <p class="card-text text-center textoProd">$${producto.precio}</p>
                <button id="producto${producto.id}" class="btn text-center btnProd"> Comprar </button>
            </div>
        </div> 
    `
    contenedor.appendChild(div)
    
    //referencia el boton de cada producto para agregar al carrito
    const botonComprar = document.getElementById(`producto${producto.id}`)
    botonComprar.addEventListener("click", () => {
    agregarAlCarrito(producto.id)

   
    })
  
})


// agrego los productos al carrito 
const agregarAlCarrito = (productosId) => {
    const item = productos.find((producto) => producto.id === productosId)
    carrito.push(item)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log(carrito);

}


// mostrar los productos del carrito

const botonCarrito = document.getElementById("botonCarrito")

botonCarrito.addEventListener("click", () => {
    mostrar.innerHTML = "" 
    carrito.forEach((producto, indice) => {
        mostrar.innerHTML += `
        <div id="producto${indice}" class="flexRowCarrito">
            <img src="${producto.imagen}"
            <p> ${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button class="btnEliminar"> Eliminar </button>
        </div>
        `    
        
    }) 
   
})


//buscar productos

const input1 = document.getElementById("input1");
const botonBuscar = document.getElementById("botonBuscar");

botonBuscar.addEventListener("click", (e) => {
    e.preventDefault()
    contenedor.innerHTML = ''
    const texto = input1.value.toLowerCase()
    productosBuscados = productos.filter(producto => producto.nombre.toLowerCase() == texto)
    productosBuscados.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("divPadre")
        div.innerHTML += `
            <div class="card" style="width: 18rem; height: 25rem;">
                <img src="${producto.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fw-light tituloProd">  ${producto.nombre} </h5>
                    <p class="card-text text-center textoProd">$${producto.precio}</p>
                    <button id="producto${producto.id}" class="btn text-center btnProd"> Comprar </button>
                </div>
            </div> 
        `
        contenedor.appendChild(div)

        const botonComprar = document.getElementById(`producto${producto.id}`)
        botonComprar.addEventListener("click", () => {
        agregarAlCarrito(producto.id)
    })
    });

    if (productosBuscados.length === 0) {
        const div = document.createElement("div")
        div.classList.add("divPadre")
        div.innerHTML += `
        Producto no encontrado`
        contenedor.appendChild(div)

    }
})


// volver a mostrar el catalogo de productos luego de la busqueda
input1.addEventListener("keyup", () => {
    contenedor.innerHTML = ''
    if (input1.value === '') {
        productos.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("divPadre")
            div.innerHTML += `
            <div class="card" style="width: 18rem; height: 25rem;">
                <img src="${producto.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fw-light tituloProd">  ${producto.nombre} </h5>
                    <p class="card-text text-center textoProd">$${producto.precio}</p>
                    <button id="producto${producto.id}" class="btn text-center btnProd"> Comprar </button>
                </div>
            </div> 
            `
            contenedor.appendChild(div)
            const botonComprar = document.getElementById(`producto${producto.id}`)
            botonComprar.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            })
        });
    }
})






