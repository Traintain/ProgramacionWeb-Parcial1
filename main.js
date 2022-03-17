const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let array = [];

let gruposProductos = [];

let grupoActual = 0;

class Producto {
  constructor(name, description, price, image) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

class GrupoProductos {
  constructor(name, productos) {
    this.name = name;
    this.productos = productos;
  }
}

function getData(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log("Resultados", res);
      callback(res);
    });
}

function filtrarProductos(categoria) {}

function mostrarTarjetas(idGrupo) {
  let grupo = gruposProductos[idGrupo];
  vitrina = document.getElementById("vitrina");
  tituloGrupo = document.getElementById("tituloGrupo");
  tituloGrupo.innerHTML = grupo.name;

  let row = document.createElement("div");
  row.className = "row";

  for (let i = 0; i < Object.keys(grupo).length; i++) {
    let producto = grupo.productos[i];
    let division = document.createElement("div");
    let imagen = document.createElement("img");

    division.className = "col-6 col-md-3 mt-4 card mx-auto";
    division.style = "width: 18rem";

    imagen.className = "card-img-top";
    imagen.src = producto.image;

    let cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    let titulo = document.createElement("h5");
    titulo.className = "card-title text-center titulos";
    titulo.innerHTML = producto.name;

    let descripcion = document.createElement("p");
    descripcion.className = "textoPlano";
    descripcion.innerHTML = producto.description;

    let precio = document.createElement("p");
    precio.className = "precio";
    precio.innerHTML = "$ " + producto.price;

    let button = document.createElement("a");
    button.className = "btn";
    button.innerHTML = "Comprar";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(button);

    division.appendChild(imagen);
    division.appendChild(cuerpo);

    row.appendChild(division);
    vitrina.appendChild(row);
  }
}

function llenarMenu() {
  menu = document.getElementById("Menu");

  for (let i = 0; i < gruposProductos.length; i++) {
    let grupo = document.createElement("li");
    grupo.className = "menuItem";
    grupo.innerHTML = gruposProductos[i].name;
    menu.appendChild(grupo);
  }
}

getData((value) => {
  array = value;
  console.log("Array", array);
  console.log("Elemento", array[1]);
  console.log("Elemento", array[1].name);
  console.log("Elemento", array[1].products);
  console.log("Elemento", array[1].products[1]);
  console.log("Elemento", Object.keys(array).length);

  for (let i = 0; i < Object.keys(array).length; i++) {
    let productos = [];
    let element = array[i];

    for (let j = 0; j < Object.keys(element.products).length; j++) {
      let producto = new Producto(
        element.products[j].name,
        element.products[j].description,
        element.products[j].price,
        element.products[j].image
      );
      productos.push(producto);
    }

    let grupo = new GrupoProductos(element.name, productos);
    gruposProductos.push(grupo);
    console.log("Grupo ya creado", grupo);
  }

  llenarMenu();
  mostrarTarjetas(0);
});

//console.log("Elemento", document.getElementsByTagName("p"));*/
//a = document.getElementsByTagName("p")[0];*/
//console.log("Elemento", a);*/

//let lista = document.getElementById("tabla");*/

//const tableRow = document.createElement("tr");*/
//const evento = document.createElement("td");*/
//const resultado = document.createElement("td");*/

//tableRow.appendChild(evento);*/
//tableRow.appendChild(resultado);*/
//lista.appendChild(tableRow);*/

//evento.innerHTML = "aaaa";*/
