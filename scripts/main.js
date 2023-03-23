/* -------------------------------- VARIABLES ------------------------------- */
const API_URL = "https://mindhub-xj03.onrender.com/api/amazing";
const containerMain = document.getElementById('containerMain')
const containerCheckbox = document.getElementById('containerCheckbox')
const search = document.getElementById('filterSearch')

let filteredEventsByCategory = [];
let filteredEventsBySearch = [];
let events;



/* ----------------------------- FETCH Y RENDER ----------------------------- */
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    events = data.events;
    drawCards(events);
    drawCategories(events);
    filterByCategory();
    filterBySearch();
    filterAll();
  })
  .catch(error => {
    console.log("error");
  })


/* ---------------------------------- DRAW --------------------------------- */
function drawCards(listEvents) {
  let cards = '';

  if (listEvents.length == 0) {
    drawNotFound();
  } else {
    for (const event of listEvents) {
      cards += `<div class="card bg-dark bg-gradient text-white mb-5" style="width: 18rem;">
          <img src="${event.image}" class="card-img-top p-1" style="height: 10rem;" alt="${event.name}"/>
          <div class="card-body text-center">
              <h5 class="card-title fw-bold">${event.name}</h5>
              <p class="card-text mb-4">${event.description}</p>
              <span class="me-5">Price $ ${event.price}</span>
              <a href="./pages/details.html?id=${event._id}" class="btn btn-outline-light card-button">+ Info</a>
          </div>
      </div>`
    }
    containerMain.innerHTML = cards;
  }
}


function drawCategories(events) {
  const categories = events.reduce((accumulator, event) => {
    if (!accumulator.includes(event.category)) {
      accumulator.push(event.category);
    }
    return accumulator;
  }, []).sort();

  const checkboxes = categories.map(category => {
    return `
      <input class="form-check-input me-2" type="checkbox" name="category" value="${category}" id="checkbox"></input>
      <label class="form-check-label text-white me-4" for="checkbox">${category}</label>
    `;
  }).join('');

  containerCheckbox.innerHTML = checkboxes;
}


function drawNotFound() {
  containerMain.innerHTML = `
    <div class="text-center fw-bold divError mb-2 w-50 p-5">
      <div>
        <img src="assets/images/notFound.gif" alt="Result Not Found" class="error w-50 mb-3">
      </div>
      <div>
        <p class="text-white fs-3">Sorry, but are not results for your search.</p>
        <a href="./index.html" class="btn btn-outline-light mt-3 p-2 buttonError">Search again!</a>
      </div>
    </div>`;
}


/* ----------------------------  CHECKBOX --------------------------------- value de categias */
function filterByCategory() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      filteredEventsByCategory = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      // Si no hay ninguna casilla de verificación seleccionada, mostrar todos los eventos
      if (filteredEventsByCategory.length === 0) {
        drawCards(events);
        return;
      }

      filteredEventsByCategory = events.filter((event) => filteredEventsByCategory.includes(event.category));
      drawCards(filteredEventsByCategory);
    });
  });
}


/* --------------------------------- SEARCH --------------------------------- */
search.addEventListener("keyup", () => {
  if (filteredEventsByCategory.length != 0) {
    filteredEventsBySearch = filteredEventsByCategory.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()));
  } else {
    filteredEventsBySearch = events.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()));
  }

  if (filteredEventsBySearch.length === 0) {
    drawNotFound();
  } else {
    drawCards(filteredEventsBySearch);
  }
});


/* --------------------------------- LOADER --------------------------------- */
const loader = `<div class="loader d-flex justify-content-center"></div>`
containerMain.innerHTML = loader