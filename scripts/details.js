const arrayEvents = data.events;

const queryString = location.search;

let params = new URLSearchParams(queryString);

let idURL = params.get("id")

const eventDetails = arrayEvents.find(event => event._id == idURL)

const containerCardsDetails = document.getElementById('containerDetails')
containerCardsDetails.innerHTML = `<div class="card d-flex bg-dark p-1" style="max-width: 50%;" id="card-hover">
<div class="row g-0">
    <div class="col-sm-12 col-md-6 p-2 d-flex">
        <img src="${eventDetails.image}" class="card-img img-fluid" alt="${eventDetails.name}">
    </div>
    <div class="col-sm-12 col-md-6 d-flex align-items-center">
        <div class="card-body text-center">
            <h3 class="card-title mb-3">${eventDetails.name}</h3>
            <p class="card-text text-white">"${eventDetails.description}"</p>
            <div class="card-details mt-4 text-start">
                <p class="mb-1 text-details">Date:<span class="text-white">${eventDetails.date}</span></p>
                <p class="mb-1 text-details">Place:<span class="text-white">${eventDetails.place}</span></p>
                <p class="mb-1 text-details">Price:<span class="text-white">$ ${eventDetails.price}</span></p>
                <p class="mb-1  text-details">Capacity:<span class="text-white">${eventDetails.capacity}</span></p>
                <p class="mb-1 text-details">Assistance:<span class="text-white">${eventDetails.assistance}</span></p>
            </div>
        </div>
    </div>
</div>
</div>`



/* ---------------------- FILTER assistance || capacity --------------------- */
// let result_est_ass=[]
//  result_est_ass=calculate()


// function calculate(){
// let result=[]
// // result=one_event.assistance || one_event.estimate
//   result[0]=one_event.assistance
//   result[1] ="assistance"
//   if(result[0]==undefined){
//     result[0]=one_event.estimate
//     result[1]="estimate"
//   }
//   return result
// }

{/* <p class="pt-4 col-6">${result_est_ass[1]} ${result_est_ass[0]} </p> */}
