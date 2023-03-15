/* -------------------------------- VARIABLES ------------------------------- */
const API_URL= "https://mindhub-xj03.onrender.com/api/amazing";
const containerMain = document.getElementById('containerMain')
const containerCheckbox = document.getElementById('containerCheckbox')
const search = document.getElementById('filterSearch')
let selected = []
let filtered = []
let eventos;
let date;

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    eventos = data.events;
    date = data.currentDate
    showCards(eventos);
    createCategory(eventos);
    checkboxCategory();
    searchBar();
    filterAll()
  })
  .catch(error => {
    console.log("error");
  })


/* ---------------------------------- DRAW --------------------------------- */
function showCards(listaEventos) {
  let cards = '';

  if (listaEventos[0].name == "error" || listaEventos.length == 0) {
    containerMain.innerHTML = `
  <div class="text-center fw-bold divError mt-4 mb-2 w-50 pt-4 p-5">
  <div>
      <img src="../assets/images/Error2.gif" alt="Result Not Found" class="error w-50 mb-3">
  </div>
  <div>
      <p class="text-white fs-3">Sorry, but are not results for your search.</p>
      <a href="../pages/upcoming-events.html" class="btn btn-outline-light mt-3 p-2 buttonError">Search again!</a>
  </div>
  </div>`
  } else {
  for (const evento of listaEventos) {
    if (evento.date < date) {
      cards += `<div class="card bg-dark bg-gradient text-white mb-5" style="width: 18rem;">
      <img src="${evento.image}" class="card-img-top p-1" style="height: 10rem;" alt="${evento.name}"/>
      <div class="card-body text-center">
          <h5 class="card-title fw-bold">${evento.name}</h5>
          <p class="card-text mb-4">${evento.description}</p>
          <span class="me-5">Price $ ${evento.price}</span>
          <a href="./details.html?id=${evento._id}" class="btn btn-outline-light card-button">+ Info</a>
      </div>
  </div>`}
  }
  return containerMain.innerHTML = cards
}
}


function createCategory() {
  const setCategorias = new Set()
  for (let event of eventos) {
    setCategorias.add(event.category)
  }
  let categories = '';

  for (const category of setCategorias) {
    categories += `
      <input class="form-check-input" type="checkbox" name="category" value="${category}" id="checkbox"></input>
      <label class="form-check-label text-white me-4" for="checkbox">${category}</label>`
  } return containerCheckbox.innerHTML = categories
}

/* ----------------------------  CHECKBOX --------------------------------- */
function checkboxCategory() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]")
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", (e) => {

      if (e.target.checked) {
        selected.push(e.target.value)
        filterAll()
      } else {
        selected = selected.filter(notcheck => notcheck !== e.target.value)
        filterAll()
      }
    })
  }
}

/* --------------------------------- SEARCH --------------------------------- */
function searchBar() {
  search.addEventListener("change", () => {
    const error = { name: 'error' }
    filtered = eventos.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
    if (filtered.length == 0) {
      filtered.push(error)
    }
    filterAll()
  })
}

/* ------------------------------ CROSS FILTER ------------------------------ */
function filterAll() {

  let selectedEvents = []
  for (const i of selected)
    for (const evento of eventos)
      if (i == evento.category)
        selectedEvents.push(evento)

  //caso 0: falló la busqueda
  if (filtered.length == 1 && filtered[0].name == "error")
    showCards(filtered)

  //caso 1: los 2 vacios
  else if (selectedEvents.length == 0 && filtered.length == 0) {
    showCards(selected)
  }

  //caso 2: solo valores en searh
  else if (selectedEvents.length == 0 && filtered.length != 0) {
    showCards(filtered)
  }

  //caso 3: solo valores en checkbox
  else if (selectedEvents.length != 0 && filtered.length == 0) {
    showCards(selectedEvents)
  }

  //caso 4: los 2 tienen valores hago la interseccion
  else {
    const filteredArray = selectedEvents.filter(value => filtered.includes(value));
    showCards(filteredArray)
  }
}


