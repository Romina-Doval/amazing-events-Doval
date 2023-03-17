const API_URL = "https://mindhub-xj03.onrender.com/api/amazing";
const containerCardsDetails = document.getElementById('containerDetails')

const queryString = location.search;
let params = new URLSearchParams(queryString);
let idURL = params.get("id")


fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const events = data.events;
    const eventDetails = events.find(event => event._id == idURL);
    drawDetails(eventDetails);
  })
  .catch(error => {
    console.log(error);
  });


/* ---------------------------------- DRAW --------------------------------- */
function drawDetails(eventDetails) {
  containerCardsDetails.innerHTML = `<div class="card d-flex bg-dark p-1 scale-in-center" style="max-width: 50%;" id="card-details">
<div class="row g-0">
    <div class="text-center pt-4">
        <h3 class="card-title title-details mb-3 fs-2 text-uppercase fw-bold">${eventDetails.name}</h3>
        <p class="card-text description-details fs-5">"${eventDetails.description}"</p>
    </div>
    <div class="col-sm-12 col-md-6 p-4 d-flex">
        <img src="${eventDetails.image}" class="card-img img-fluid"  alt="${eventDetails.name}">
    </div>
    <div class="col-sm-12 col-md-6 d-flex align-items-center">
        <div class="card-body text-center">
            
            <div class="card-details mt-1 text-start">
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Date:<span class="text-details2">${eventDetails.date}</span></p>
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Place:<span class="text-details2">${eventDetails.place}</span></p>
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Price:<span class="text-details2">$ ${eventDetails.price}</span></p>
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Capacity:<span class="text-details2">${eventDetails.capacity}</span></p>
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Assistance:<span class="text-details2">${eventDetails.assistance}</span></p>
                <p class="mb-1 text-details fw-bold"><i class="fa-regular fa-star"></i>Estimate:<span class="text-details2">${eventDetails.estimate}</span></p>
                
            </div>
            <a href="../index.html" class="btn btn-outline-light mt-3 buttonClear">Back</a>
        </div>
    </div>
</div>
</div>`
}