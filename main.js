const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let array = [];

let gruposProductos = [];

let itemsCarrito = [];

let tableTitles = [
  "Item",
  "Qty.",
  "Description",
  "Unit Price",
  "Amount",
  "Modify",
];

class Carrito {
  constructor(items) {
    this.total = 0;
    this.items = items;
    this.numItems = 0;
  }

  addItem(item) {
    let index = -1;
    let añadir;
    for (let i = 0; i < this.items.length && index == -1; i++) {
      if (this.items[i].name == item.name) {
        index = i;
      }
    }

    if (index == -1) {
      añadir = new ItemCarrito(1, item.name, item.price, item.price);
      this.items.push(añadir);
    } else {
      this.items[index].addItem();
    }

    this.total = this.total + item.price;
    this.numItems = this.numItems + 1;
  }
}

let carrito = new Carrito(itemsCarrito);

class ItemCarrito {
  constructor(qty, name, uPrice, amount) {
    this.qty = qty;
    this.name = name;
    this.uPrice = uPrice;
    this.amount = amount;
  }

  addItem() {
    this.qty = this.qty + 1;
    this.amount = this.amount + this.uPrice;
  }

  deleteItem() {
    this.qty = this.qty - 1;
    this.amount = this.amount - this.uPrice;
  }
}

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
      callback(res);
    });
}

function filtrarProductos(idGrupo) {
  mostrarTarjetas(idGrupo);
}

function agregarCarrito(grupo, producto) {
  grupo = gruposProductos.find((element) => (element.name = grupo));
  carrito.addItem(producto);
  document.getElementById("carrito").innerText = "Items " + carrito.numItems;
  console.log(itemsCarrito.length);
}

function mostrarTarjetas(idGrupo) {
  let grupo = gruposProductos[idGrupo];

  vitrina = document.getElementById("ponerTarjetas");

  while (vitrina.hasChildNodes()) {
    vitrina.removeChild(vitrina.firstChild);
  }

  tituloGrupo = document.getElementById("tituloGrupo");
  tituloGrupo.innerHTML = grupo.name;

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
    button.className = "btn addToCart";
    button.innerHTML = "Add to Cart";
    button.onclick = () => agregarCarrito(grupo.name, producto);

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(button);

    division.appendChild(imagen);
    division.appendChild(cuerpo);

    vitrina.appendChild(division);
  }
}

function verDetalleOrden() {
  mainDiv = document.getElementById("vitrina");
  vitrina = document.getElementById("ponerTarjetas");

  /** Limpia el espacio donde normalmente hay tarjetas */
  while (vitrina.hasChildNodes()) {
    vitrina.removeChild(vitrina.firstChild);
  }

  tituloGrupo = document.getElementById("tituloGrupo");
  tituloGrupo.innerHTML = "ORDER DETAIL";

  /** <table class="table table-striped"> */
  let table = document.createElement("table");
  table.className = "table table-striped";

  /** <thead> */
  let tableHead = document.createElement("thead");

  /** <tr> */
  let tableRow = document.createElement("tr");

  /** Crea los encabezados */
  for (let i = 0; i < 6; i++) {
    /** <th> */
    let tableHeader = document.createElement("th");
    tableHeader.scope = "col";
    tableHeader.innerHTML = tableTitles[i];
    tableRow.appendChild(tableHeader);
  }
  tableHead.appendChild(tableRow);
  table.appendChild(tableHead);

  /** <tbody> */
  let tableBody = document.createElement("tbody");

  for (let i = 0; i < Object.keys(itemsCarrito).length; i++) {
    let item = itemsCarrito[i];
    /** <tr> */
    tableRow = document.createElement("tr");
    tableHeader = document.createElement("th");
    tableHeader.scope = "col";
    tableHeader.innerHTML = i + 1;
    tableRow.appendChild(tableHeader);

    for (let j = 0; j < 5; j++) {
      let tableData = document.createElement("td");
      if (j == 0) {
        tableData.innerHTML = item.qty;
      } else if (j == 1) {
        tableData.innerHTML = item.name;
      } else if (j == 2) {
        tableData.innerHTML = item.uPrice;
      } else if (j == 3) {
        tableData.innerHTML = item.amount;
      }
      tableRow.appendChild(tableData);
    }

    tableBody.appendChild(tableRow);
  }
  table.appendChild(tableBody);
  vitrina.appendChild(table);

  let row = document.createElement("div");
  row.className = "row";
  let total = document.createElement("p");
  total.className = "precio";
  total.innerHTML = "Total: " + carrito.total;
  row.appendChild(total);
  mainDiv.appendChild(row);
}

function llenarMenu() {
  menu = document.getElementById("Menu");

  for (let i = 0; i < gruposProductos.length; i++) {
    let grupo = document.createElement("li");
    let link = document.createElement("a");
    grupo.className = "menuItem";
    link.innerHTML = gruposProductos[i].name;
    link.id = i;
    grupo.appendChild(link);
    menu.appendChild(grupo);
  }
}

getData((value) => {
  array = value;

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
  }

  llenarMenu();
  mostrarTarjetas(0);

  document.getElementById("0").onclick = () => filtrarProductos(0);
  document.getElementById("1").onclick = () => filtrarProductos(1);
  document.getElementById("2").onclick = () => filtrarProductos(2);
  document.getElementById("3").onclick = () => filtrarProductos(3);
  document.getElementById("4").onclick = () => filtrarProductos(4);
  document.getElementById("botonCarrito").onclick = () => verDetalleOrden();
});
