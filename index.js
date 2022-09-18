// Codigo para agregar elementos a la lista de productos
// Capturando los elementos de form para manipularlos
let input_refcomponent = document.getElementById("refComponent");
let input_componentdesc = document.getElementById("descComponent");
let input_pricecomponent = document.getElementById("price");
let add_button = document.getElementById("add_button");
let hasSMD = document.getElementById("smd");

// Definiendo variables para almacenar input o datos de entrada

let ref = ''
let desc = ''
let price = ''

// Definiendo el objeto del producto (referencia, descripcion, precio y SMD)

let producto = {
    referencia: "",
    descripcion: "",
    precio: "",
    superficie: ""
}

// Definiendo la lista que almacenara los componentes/productos
let product_list = []

// Definiendo los eventos para los campos de referencia, descripcion y precio
input_refcomponent.addEventListener('change', function(){
    ref = input_refcomponent.value
})

input_componentdesc.addEventListener('change', function(){
    desc = input_componentdesc.value
})

input_pricecomponent.addEventListener('change', function(){
    price = input_pricecomponent.value
})

// Definiendo evento de guardado para el boton de agregado
add_button.addEventListener('click', function(){
    producto.referencia = ref;
    producto.descripcion = desc;
    producto.precio = price;
    producto.superficie = hasSMD
    product_list.push(producto);
    localStorage.setItem("lista_productos", JSON.stringify('product_list'))
})
console.log(product_list)

