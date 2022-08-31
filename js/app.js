const productosConteiner = document.querySelector('#contenedor-productos')
var contenedor = document.getElementById('ListaProducto');

const item = stockProductos[0]
var articulos=[];

stockProductos.forEach((item) => {
    const div = document.createElement('div')
    div.classList.add('producto')

    div.innerHTML = `
                    <img id="imgcomida" src="${item.img}" alt="">
                    <h3>${item.nombre}</h3>
                    <p>${item.desc}</p>
                    <P class="precioProducto">Precio: ${item.precio}</P>
                    <div>
                    <input type="number" class="form-control" id="Cantidad${item.id}" placeholder="Cantidad" style="width:150px">
                    <button class="boton-agregar" onclick="agregarCarro(${item.id})">Agregar <i class="fas fa-shopping-cart"></i></button>
                    </div>

    `
    productosConteiner.append(div);
})

function chiste(){
    fetch('https://v2.jokeapi.dev/joke/Any?lang=es&idRange=1-6')
    .then(response => response.json())
    .then(json => mostrarchiste(json.type, json.setup, json.delivery, json.joke))
}

function mostrarchiste(tipo, chiste1, chiste2, chiste3){
    if (tipo == "single") {
        alert(chiste3)        
    } else{
        alert(chiste1 + "\n" + chiste2)
    }
        

}


function agregarCarro(articulo){

    const agregar = stockProductos.find((item) => item.id === articulo);
    const cant=document.getElementById(`Cantidad${articulo}`).value;
    for (let index = 0; index <cant; index++) {
        articulos.push(agregar);   
    }
    

    document.getElementById("contadorcarrito").textContent = articulos.length;

    mostrarArticulos();
}

const removerDelCarrito = (id) =>{

    const remover = articulos.find((item) => item.id === id)
    const index = articulos.indexOf(remover);
    articulos.splice(index, 1);

    document.getElementById("contadorcarrito").textContent = articulos.length;

    mostrarArticulos();
}

function mostrarArticulos(){

var total = 0;
contenedor.innerHTML = ``;

articulos.forEach((item) => {

    var newDiv = document.createElement('div');

    newDiv.classList.add('productoEnCarrito')

    newDiv.innerHTML = `
        <label> ${item.nombre} - $ ${ item.precio} </label>
        <br>
        <button onClick="removerDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `
    var contenedor = document.getElementById('ListaProducto');
    contenedor.appendChild(newDiv);

    total = total + item.precio;
    
})

document.getElementById("precioTotal").innerHTML = "Total: $" + total;

}