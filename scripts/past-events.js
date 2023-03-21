/* -------------------------------- VARIABLES ------------------------------- */
const API_URL = "https://mindhub-xj03.onrender.com/api/amazing";
const containerMain = document.getElementById('containerMain');
const containerCheckbox = document.getElementById('containerCheckbox');
const search = document.getElementById('filterSearch');
let selected = [];
let filtered = [];
let events;
let date;


/* ----------------------------- FETCH Y RENDER ----------------------------- */
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    events = data.events;
    date = data.currentDate;
    drawCards(events);
    drawCategories(events);
    filterByCategory();
    filterSearch();
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
      if (event.date > date) {
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
}


function drawCategories(events) {
  const categories = events.reduce((accumulator, event) => {
    if (event.date < date && !accumulator.includes(event.category)) {
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
        <img src="../assets/images/notFound.gif" alt="Result Not Found" class="error w-50 mb-3">
      </div>
      <div>
        <p class="text-white fs-3">Sorry, but are not results for your search.</p>
        <a href="./index.html" class="btn btn-outline-light mt-3 p-2 buttonError">Search again!</a>
      </div>
    </div>`;
}


// /* ----------------------------  CHECKBOX --------------------------------- */
function filterByCategory() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {

      if (e.target.checked) {
        selected.push(e.target.value);
        filterAll();
      } else {
        selected = selected.filter((notcheck) => notcheck !== e.target.value);
        filterAll();
      }
    });
  });
}


// /* --------------------------------- SEARCH --------------------------------- */
function filterSearch() {
  search.addEventListener("change", () => {
    filtered = events.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))

    if (filtered.length == 0) {
      drawNotFound();
    } else {
      filterAll();
    }
  })
}


// /* ------------------------------ CROSS FILTER ------------------------------ */
function filterAll() {
  const selectedEvents = events.filter(event => selected.includes(event.category));
 
  if (filtered.length === 1 && filtered[0].name === "error") {
    drawCards(filtered);

  } else if (selectedEvents.length === 0 && filtered.length === 0) {
    drawCards(events);

  } else if (selectedEvents.length === 0 && filtered.length !== 0) {
    drawCards(filtered);

  } else if (selectedEvents.length !== 0 && filtered.length === 0) {
    drawCards(selectedEvents);

  } else {
    const filteredArray = selectedEvents.filter(event => filtered.includes(event));
    drawCards(filteredArray);
  }
}