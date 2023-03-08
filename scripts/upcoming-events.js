function createCard(events) {
  let containerUpcoming = document.getElementById('cardsUpcoming')
  let cards = ' '

  for (const event of events) {
    if (event.date > data.currentDate) {
      cards += `<div class="card bg-dark bg-gradient text-white mb-5" style="width: 18rem;">
      <img src="${event.image}" class="card-img-top p-1" style="height: 10rem;" alt="${event.name}"/>
      <div class="card-body text-center">
          <h5 class="card-title fw-bold">${event.name}</h5>
          <p class="card-text mb-4">${event.description}</p>
          <span class="me-5">Price $ ${event.price}</span>
          <a href="./details.html" class="btn btn-outline-light card-button">+ Info</a>
      </div>
  </div>`}
  }
  return containerUpcoming.innerHTML = cards
}

createCard(data.events)



 /* --------------------- ARRAY CATEGORIES + ARRAY FILTER -------------------- */
 const arrayCat = [];
 for (let event of data.events) {
   arrayCat.push(event.category)
 }
 
 
 const arrayFilter = [];
 arrayCat.forEach(category => {
   if (!arrayFilter.includes(category)) {
     arrayFilter.push(category)
   }
 });
 
 
  /* ----------------------------- CREATE CATEGORY ---------------------------- */
 function createCategory (arrayFilter) {
   const containerCheckbox = document.getElementById('containerCheckbox');
   let categories = '';
 
   for (const category of arrayFilter) {
       categories += `<input class="form-check-input" type="checkbox"  name="category" value="category" id="category">
       <label class="form-check-label text-white me-4" for="category">${category}</label>`
 } return containerCheckbox.innerHTML = categories
 };
 
 createCategory(arrayFilter)