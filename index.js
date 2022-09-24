// Codigo para agregar elementos a la lista de productos
// Capturando los elementos de form para manipularlos
let input_refcomponent = document.getElementById("refComponent");
let input_componentdesc = document.getElementById("descComponent");
let input_pricecomponent = document.getElementById("price");
let hasSMD = document.getElementById("smd");
let add_button = document.getElementById("add_button");

// Definiendo el objeto del producto (referencia, descripcion, precio y SMD)

let producto = {
    referencia: "",
    descripcion: "",
    precio: "",
    superficie: false
}

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
const agregar_elemento = () => {
    let localstorage_list = JSON.parse(localStorage.getItem('lista_productos'));
    localstorage_list.push(producto);
    input_componentdesc.value = '';
    input_pricecomponent.value = '';
    input_refcomponent.value = '';
    document.getElementById('index').value = '';
    hasSMD.checked = false;
    producto = {};
    localStorage.setItem('lista_productos', JSON.stringify(localstorage_list));
    show_list();
    }

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
            <td> <button class='action_but_edit' onclick='rellenar_input(${ind})'> Editar </button> 
            <button class='action_but_delete' onclick='delete_action(${ind})'> Eliminar </button> </td>
            `;
            row.style.textAlign = 'center';
            tbody.appendChild(row);
        })
    }
}

// Función para rellenar los inputs y permitir edición
const rellenar_input = (index) => { 
    localstorage_list = JSON.parse(localStorage.getItem('lista_productos'));
    input_refcomponent.value = localstorage_list[index]['referencia'];
    input_componentdesc.value = localstorage_list[index]['descripcion'];
    input_pricecomponent.value = localstorage_list[index]['precio'];
    hasSMD.checked = localstorage_list[index]['superficie'];
    document.getElementById('index').value = index;
    let element_edit = document.getElementsByTagName('td');
    document.getElementById('add_button').innerHTML = 'Actualizar';
}

// Función para editar elementos en tabla
const editar_elemento = () => {
    let indice = parseInt(document.getElementById('index').value);
    localstorage_list = JSON.parse(localStorage.getItem('lista_productos'))
    localstorage_list.forEach((elem, i) => {
        if (i === indice){
            elem.referencia = input_refcomponent.value;
            elem.descripcion = input_componentdesc.value;
            elem.precio = input_pricecomponent.value;
            elem.superficie = hasSMD.checked;
        }
    });
    input_refcomponent.value = '';
    input_componentdesc.value = '';
    input_pricecomponent.value = '';
    hasSMD.checked = false;
    document.getElementById('index').value = '';
    document.getElementById('add_button').innerHTML = 'Agregar';
    localStorage.setItem('lista_productos', JSON.stringify(localstorage_list));
    show_list();
}

// Función para actualizar los elementos una vez editados
const update_item = () => {
    if (document.getElementById('index').value === ''){
        document.getElementById('add_button').innerHTML = 'Agregar';
        agregar_elemento();
    }else{
        console.log('actualizar elemento');
        document.getElementById('add_button').innerHTML = 'Editar';
        editar_elemento();
    }
    
}

// Función para eliminar elementos
const delete_action = (index) => {
    let localstorage_list = JSON.parse(localStorage.getItem('lista_productos'));
    localstorage_list = localstorage_list.filter((elem, ind) => ind !== index);
    localStorage.setItem('lista_productos', JSON.stringify(localstorage_list));
    show_list();
}

show_list();