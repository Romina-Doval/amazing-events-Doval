/* -------------------------------- VARIABLES ------------------------------- */
const API_URL= "https://mindhub-xj03.onrender.com/api/amazing";
const containerMain = document.getElementById('containerMain');



fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const sortedPercentages = calculateAttendancePercentage(data);
    const lowerAttendance = sortedPercentages.slice(-3);
    const eventsLargerCapacity = calculateCapacity(data);
    const averageAssistancePast = calculateAverageAssistancePast(data.events, data.currentDate);
    const averageAssistanceUpcoming= calculateAverageAssistanceUpcoming(data.events, data.currentDate);
  
   
    const { catPast, catUpcoming } = eventsByCategory(data);
    const { revenuesPast, revenuesUpcoming } = calculateIncomesByCategory(data.events, data.currentDate);

    console.log(averageAssistanceUpcoming);



    showStats(
      sortedPercentages,
      lowerAttendance,
      eventsLargerCapacity,
      catPast,
      catUpcoming,
      revenuesPast,
      revenuesUpcoming,
      averageAssistancePast,
      averageAssistanceUpcoming
    );

    
  })
  .catch((error) => {
    console.log("Error:", error);
  });
  

/* ------------------------------- DRAW TABLE ------------------------------- */
  function showStats(sorted, lower, larger, catPast, catUpcoming, revPast, revUpcoming, averagePast, averageUpcoming) {
    containerMain.innerHTML = `<table class="table-bordered border-3 mb-5 mt-5 bg-light border-dark">
    <tr>
        <th colspan="3" class="text-uppercase fs-4 text-center bg-dark text">Events statistics</th>
    </tr>
    <tr class="text-center fs-5 text-white bg-black bg-opacity-75">
        <th>Events with the highest percentage of attendance</th>
        <th>Events with the lowest percentage of attendance</th>
        <th>Events with larger capacity</th>
    </tr>
    <tr>
        <td class="fs-6 text-center fw-bold">${sorted[0]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${lower[2]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${larger[0]} of capacity</td>
    </tr>
    <tr>
        <td class="fs-6 text-center fw-bold">${sorted[1]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${lower[1]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${larger[1]} of capacity</td>
    </tr>
    <tr>
        <td class="fs-6 text-center fw-bold">${sorted[2]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${lower[0]} of attendance</td>
        <td class="fs-6 text-center fw-bold">${larger[2]} of capacity</td>
    </tr>

    <tr>
        <th colspan="3" class="text-uppercase fs-5 text-center bg-dark text">Upcoming events statistics by
            category</th>
    </tr>
    <tr class="text-center fs-5 text-white bg-black bg-opacity-75">
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[0]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Books']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[0].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[1]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Cinema']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[1].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[2]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Concert']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[2].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[3]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Food']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[3].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[4]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Museum']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[4].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[5]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Party']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[5].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catPast[6]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Race']}</td>
        <td class="fs-5 text-center fw-bold">${(averagePast[6].percentage)} %</td>
    </tr>


    <tr>
        <th colspan="3" class="text-uppercase fs-5 text-center bg-dark text">Past events statistics by category
        </th>
    </tr>
    <tr class="text-center fs-5 text-white bg-black bg-opacity-75">
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[0]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revUpcoming['Books']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[0].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[1]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revUpcoming['Concert']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[1].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[2]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revUpcoming['Food']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[2].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[3]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revPast['Museum']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[3].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[4]}</td>
        <td class="fs-5 text-center fw-bold">$ ${revUpcoming['Party']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[4].percentage)} %</td>
    </tr>
    <tr>
        <td class="fs-5 text-center fw-bold text-uppercase">${catUpcoming[5]}</td>  
        <<td class="fs-5 text-center fw-bold">$ ${revUpcoming['Race']}</td>
        <td class="fs-5 text-center fw-bold">${(averageUpcoming[5].percentage)} %</td>
    </tr>

</table>`
    return containerMain.innerHTML
}


/* ---------------- Calculate Attendance Percentages ---------------- */
  function calculateAttendancePercentage(data) {
    const eventsPercentages = data.events
      .filter((event) => event.estimate !== null && event.assistance !== undefined && event.capacity !== null && event.capacity !== undefined)
      .map((event) => ({
        ...event,
        percentage: Math.round((event.assistance / event.capacity) * 100),
      }));

    const sortedPercentages = eventsPercentages.sort(
      (a, b) => b.percentage - a.percentage
    );
    return sortedPercentages.map((event) => `${event.name}: ${event.percentage}%`);
  }


/* --------------------------- Calculate Capacity --------------------------- */
function calculateCapacity(data) {
    const eventsCapacity = data.events
      .filter((event) => event.capacity !== null && event.capacity !== undefined &&
        new Date(event.date) < new Date(data.currentDate))
      .sort((a, b) => b.capacity - a.capacity);
  
    return eventsCapacity.map((event) => `${event.name}: ${event.capacity}`);
  }
  
 
  /* --------------------- Filter Category - Past/Upcoming -------------------- */
  function eventsByCategory(data) {
    const currentDate = new Date(data.currentDate);
    const eventsPast = data.events.filter((event) => new Date(event.date) < currentDate);
    const catPast = [...new Set(eventsPast.map((event) => `${event.category}`))].sort();
    const eventsUpcoming = data.events.filter((event) => new Date(event.date) >= currentDate);
    const catUpcoming = [...new Set(eventsUpcoming.map((event) => `${event.category}`))].sort();
    
    return {catPast, catUpcoming};
  }
  

/* --------------- Calculate Incomes - Filter by Past/Upcoming -------------- */
  function calculateIncomesByCategory(events, currentDate) {
    let beforeEvents = [];
    let afterEvents = [];
  
    for (let i = 0; i < events.length; i++) {
      if (events[i].date < currentDate) {
        beforeEvents.push(events[i]);
      } else {
        afterEvents.push(events[i]);
      }
    }
  
    let revenuesPast = {};
    let revenuesUpcoming = {};
  
    // Calcular los ingresos por categoría para los eventos pasados
    for (let i = 0; i < beforeEvents.length; i++) {
      let event = beforeEvents[i];
      let income = event.price * event.assistance;
  
      if (revenuesPast[event.category] == undefined) {
        revenuesPast[event.category] = income;
      } else {
        revenuesPast[event.category] += income;
      }
    }
  
    // Calcular los ingresos por categoría para los eventos futuros
    for (let i = 0; i < afterEvents.length; i++) {
      let event = afterEvents[i];
      let income = event.price * event.estimate;
  
      if (revenuesUpcoming[event.category] == undefined) {
        revenuesUpcoming[event.category] = income;
      } else {
        revenuesUpcoming[event.category] += income;
      }
    }
  
    return {revenuesPast, revenuesUpcoming};
  }


/* ------------ Calculate Percentages Attendance - Past/Upcoming ------------ */
  function calculateAverageAssistancePast(events, currentDate) {
    
    const eventsPast = events.filter((event) => event.date < currentDate);
    const categories = [...new Set(eventsPast.map((event) => event.category))];
    const averagePast = categories.map((category) => {
      const eventsByCategory = eventsPast.filter((event) => event.category === category);
      const totalAssistance = eventsByCategory.reduce((sum, event) => sum + event.assistance, 0);
      const totalCapacity = eventsByCategory.reduce((sum, event) => sum + event.capacity, 0);
      const percentage = ((totalAssistance / totalCapacity) * 100).toFixed(0);
      return { category, percentage };
    });

    averagePast.sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return 0;
    });

    return averagePast;
  }
  

  function calculateAverageAssistanceUpcoming(events, currentDate) {
    
    const eventsUpcoming = events.filter((event) => event.date > currentDate);
    const categories = [...new Set(eventsUpcoming.map((event) => event.category))];
    const averageUpcoming = categories.map((category) => {
      const eventsByCategory = eventsUpcoming.filter((event) => event.category === category);
      const totalEstimate = eventsByCategory.reduce((sum, event) => sum + event.estimate, 0);
      const totalCapacity = eventsByCategory.reduce((sum, event) => sum + event.capacity, 0);
      const percentage = ((totalEstimate / totalCapacity) * 100).toFixed(0);
      return { category, percentage };
    });

    averageUpcoming.sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return 0;
    });

    return averageUpcoming;
  }
  






