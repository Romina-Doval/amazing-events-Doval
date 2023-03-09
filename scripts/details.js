const arrayEvents = data.events;
const queryString = location.search;
let params = new URLSearchParams(queryString);
let idURL = params.get("id")
const eventDetails = arrayEvents.find(event => event._id == idURL)
const containerCardsDetails = document.getElementById('containerDetails')

containerCardsDetails.innerHTML = `<div class="card d-flex bg-dark p-1" style="max-width: 50%;" id="card-hover">
<div class="row g-0">
    <div class="col-sm-12 col-md-6 p-4 d-flex">
        <img src="${eventDetails.image}" class="card-img img-fluid" alt="${eventDetails.name}">
    </div>
    <div class="col-sm-12 col-md-6 d-flex align-items-center">
        <div class="card-body text-center">
            <h3 class="card-title title-details mb-3">${eventDetails.name}</h3>
            <p class="card-text text-white">"${eventDetails.description}"</p>
            <div class="card-details mt-4 text-start">
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Date:<span class="text-white">${eventDetails.date}</span></p>
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Place:<span class="text-white">${eventDetails.place}</span></p>
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Price:<span class="text-white">$ ${eventDetails.price}</span></p>
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Capacity:<span class="text-white">${eventDetails.capacity}</span></p>
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Assistance:<span class="text-white">${eventDetails.assistance}</span></p>
                <p class="mb-1 text-details"><i class="fa-regular fa-star"></i>Estimate:<span class="text-white">${eventDetails.estimate}</span></p>
            </div>
            <a href="../index.html" class="btn btn-outline-light mt-3 buttonError">Back</a>
        </div>
    </div>
</div>
</div>`




