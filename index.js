// Codigo para agregar elementos a la lista de productos
// Capturando los elementos de form para manipularlos
let input_refcomponent = document.getElementById("refComponent");
let input_componentdesc = document.getElementById("descComponent");
let input_pricecomponent = document.getElementById("price");
let add_button = document.getElementById("add_button");
let hasSMD = document.getElementById("smd");

// Definiendo el objeto del producto (referencia, descripcion, precio y SMD)

let producto = {
    referencia: "",
    descripcion: "",
    precio: "",
    superficie: false
}

// class producto {
//     referencia = '';
//     descripcion = '';
//     precio = '';
//     superficie = false;
// }

// Definiendo la lista que almacenara los componentes/productos
let product_list = []
let localstorage_list = localStorage.getItem('lista_productos')

// Definiendo los eventos para los campos de referencia, descripcion y precio
input_refcomponent.addEventListener('change', () => {
    producto.referencia = input_refcomponent.value;
})

input_componentdesc.addEventListener('change', () => {
    producto.descripcion = input_componentdesc.value
})

input_pricecomponent.addEventListener('change', () => {
    producto.precio = input_pricecomponent.value
})

hasSMD.addEventListener('change', () => {
    producto.superficie = hasSMD.checked
})

// Definiendo evento de guardado para el boton de agregado
add_button.addEventListener('click', () => {
    console.log(product_list);
    product_list.push(producto);
    input_componentdesc.value = '';
    input_pricecomponent.value = '';
    input_refcomponent.value = '';
    hasSMD.checked = false;
    producto = {};
    localstorage_list = product_list;
    localStorage.setItem('lista_productos', JSON.stringify(localstorage_list));
    show_list();
})

// Agregando rendering de elementos en tabla
const show_list = () => {
    let tbody = document.getElementsByTagName('tbody')[0];
    let lista = JSON.parse(localStorage.getItem('lista_productos'));
    tbody.innerHTML = ''
    if (lista != null){
        lista.forEach((element, ind) => {
            let row = document.createElement('tr');
            row.innerHTML = `
            <td> ${ind + 1} </td>
            <td> ${element['referencia']} </td>
            <td> ${element['descripcion']}</td>
            <td> ${'$' + element['precio']}</td>
            <td> ${element['superficie']?'Activo':'Inactivo'}</td>
            <td> <button class='action_but_edit' onclick='edit_action(${ind})'> Editar </button> 
            <button class='action_but_delete' onclick='delete_action(${ind})'> Eliminar </button> </td>
            `;
            row.style.textAlign = 'center';
            tbody.appendChild(row);
        })
    }
}

// Definiendo operaciones de eliminacion y edicion
const edit_action = (index) => { 
    console.log("Edit" + index)
}

const delete_action = (index) => {
    console.log("Delete" + index)
}

