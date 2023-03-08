/* -------------------------------- VARIABLES ------------------------------- */
const eventos = data.events;
const containerMain = document.getElementById('containerMain')
const containerCheckbox = document.getElementById('containerCheckbox')
const search = document.getElementById('filterSearch')

const setCategorias = new Set()
for (let event of data.events) {
  setCategorias.add(event.category)
}
let selected = []

/* ---------------------------------- CARDS --------------------------------- */
function showCards(events) {
    let cards = '';
  
    for (const event of events) {
      if (event.date < data.currentDate) {
        cards += `<div class="card bg-dark bg-gradient text-white mb-5" style="width: 18rem;">
          <img src="${event.image}" class="card-img-top p-1" style="height: 10rem;" alt="${event.name}"/>
          <div class="card-body text-center">
              <h5 class="card-title fw-bold">${event.name}</h5>
              <p class="card-text mb-4">${event.description}</p>
              <span class="me-5">Price $ ${event.price}</span>
              <a href="./details.html?id=${event._id}" class="btn btn-outline-light card-button">+ Info</a>
          </div>
      </div>`}
    }
    return containerMain.innerHTML = cards
  }
  
/* ---------------------------- CREATE CHECKBOXES --------------------------- */

function createCategory(setCategorias) {
  let categories = '';

  for (const category of setCategorias) {
    categories += `
      <input class="form-check-input" type="checkbox" name="category" value="${category}" id="checkbox"></input>
      <label class="form-check-label text-white me-4" for="checkbox">${category}</label>`
  } return containerCheckbox.innerHTML = categories
};


// Se puede sacar si incorporas este filtro directo en showcards
function filterByCategory() {

  if (selected.length == 0) {
    containerMain.innerHTML = showCards(eventos)
  } else {
    let parcial = eventos.filter(evento => selected.includes(evento.category))
    containerMain.innerHTML = showCards(parcial)
  }
}


/* ----------------------------- FILTER CHECKBOX ---------------------------- */
function checkboxCategory() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]")
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", (e) => {

      if (e.target.checked) {
        selected.push(e.target.value)
        filterByCategory()
      } else {
        selected = selected.filter(notcheck => notcheck !== e.target.value)
        filterByCategory()
      }
    })
  }
}


/* --------------------------------- SEARCH --------------------------------- */
function searchBar(events) {
  search.addEventListener("change", () => {

    let filtered = eventos.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
    filterByCategory(eventos)

    if (filtered.length == 0) {
      containerMain.innerHTML = `
    <div class="text-center fw-bold divError mt-4 mb-2 w-50 pt-4 p-5">
    <div>
        <img src="assets/images/Error2.gif" alt="Result Not Found" class="error w-50 mb-3">
    </div>
    <div>
        <p class="text-white fs-3">Sorry, but are not results for your search.</p>
        <a href="./index.html" class="btn btn-outline-light mt-3 p-2 buttonError">Search again!</a>
    </div>
    </div>`
    } else {
      showCards(filtered)
    }
  })
}

/* -------------------------------- RENDERED -------------------------------- */
showCards(eventos)
createCategory(setCategorias)
checkboxCategory()
searchBar(eventos)