let currentStep = 1;

function showStep(stepNumber) {
  document.querySelectorAll('.step').forEach(step => {
    step.style.display = 'none';
  });

  document.getElementById(`step${stepNumber}`).style.display = 'block';
}

function nextStep() {
  currentStep++;

  if (currentStep <= 3) {
    showStep(currentStep);
  } else {
    calculateAverageCheapestDestination();
  }
}

function addDestinationNames() {
    const destinationCount = document.getElementById("destinationCount").value;
    const destinationsContainer = document.getElementById("destinationsContainer");
  
    destinationsContainer.innerHTML = ''; // Clear previous destinations
  
    for (let i = 1; i <= destinationCount; i++) {
      const destinationDiv = document.createElement("div");
      destinationDiv.innerHTML = `
        <h3>Destination ${i}</h3>
        <label for="destinationName${i}">Destination Name:</label>
        <input type="text" id="destinationName${i}" name="destinationName${i}" class="awesomplete" required>
      `;
  
      destinationsContainer.appendChild(destinationDiv);
  
      // Initialize Awesomplete on the input field
      new Awesomplete(document.getElementById(`destinationName${i}`), {
        list: ["City1", "City2", "City3", /* Add your list of international cities here */],
      });
    }
  
    showStep(2); // Move to the next step after adding destination names
  }
  
  

function addPricesAndDesirability() {
    const destinationCount = document.getElementById("destinationCount").value;
    const pricesContainer = document.getElementById("pricesContainer");
  
    pricesContainer.innerHTML = ''; // Clear previous inputs
  
    for (let i = 1; i <= destinationCount; i++) {
      const destinationName = document.getElementById(`destinationName${i}`).value;
  
      const pricesDiv = document.createElement("div");
      pricesDiv.innerHTML = `
        <h3>${destinationName}</h3>
        <label for="priceYou${i}">David's Price to Israel (without third destination):</label>
        <input type="number" id="priceYou${i}" name="priceYou${i}" required>
  
        <label for="priceWithThird${i}">David's Price to Israel (with third destination):</label>
        <input type="number" id="priceWithThird${i}" name="priceWithThird${i}" required>
  
        <label for="priceBrother${i}">Ben's Price to Third Destination:</label>
        <input type="number" id="priceBrother${i}" name="priceBrother${i}" required>
  
        <label for="desirability${i}">Desirability (1 to 10):</label>
        <input type="number" id="desirability${i}" name="desirability${i}" min="1" max="10" required>
      `;
  
      pricesContainer.appendChild(pricesDiv);
    }
  
    showStep(3); // Move to the next step after adding prices and desirability
  }
  

document.getElementById("travelForm").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateAverageCheapestDestination();
});

function calculateAverageCheapestDestination() {
    const destinationCount = document.getElementById("destinationCount").value;
    const destinations = [];
  
    for (let i = 1; i <= destinationCount; i++) {
      const destinationName = document.getElementById(`destinationName${i}`).value;
      const priceYou = parseFloat(document.getElementById(`priceYou${i}`).value);
      const priceWithThird = parseFloat(document.getElementById(`priceWithThird${i}`).value);
      const priceBrother = parseFloat(document.getElementById(`priceBrother${i}`).value);
      const desirability = parseFloat(document.getElementById(`desirability${i}`).value);
  
      destinations.push({ name: destinationName, prices: [priceYou, priceWithThird, priceBrother], desirability });
    }
  
    const result = calculateAverage(destinations);
    displayResults(result);
    showStep(4); // Show the results step
  }
  
  function calculateAverage(destinations) {
    const result = [];
  
    destinations.forEach(({ name, prices, desirability }) => {
      const averagePrice = (prices.reduce((sum, price) => sum + price, 0)) / prices.length;
      const score = averagePrice / desirability;
      result.push({ name, score });
    });
  
    return result;
  }
  

  function displayResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ''; // Clear previous results
  
    const maxScore = 10; // Assuming the scores are on a scale from 1 to 10
  
    results.forEach(({ name, score }) => {
      // Calculate the opposite score
      const oppositeScore = maxScore - score;
  
      const resultDiv = document.createElement("div");
      resultDiv.textContent = `${name}: ${oppositeScore.toFixed(2)}`;
      resultsContainer.appendChild(resultDiv);
    });
  }
  

// Initialize with the first step
document.addEventListener("DOMContentLoaded", function () {
  showStep(1);
});
