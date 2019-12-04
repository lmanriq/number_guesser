// Variables
var minRange = document.getElementById('min-range');
var maxRange = document.getElementById('max-range');
var updateRangeBtn = document.getElementById('update-range');
var challenger1Guess = document.getElementById('challenger1-guess');
var challenger2Guess = document.getElementById('challenger2-guess');

// Event Listeners
updateRangeBtn.addEventListener('click', updateRange);
window.addEventListener('keyup', enableSetRangeBtn);

// Enabling set range button
function enableSetRangeBtn() {
  if (minRange.value !== '' && maxRange.value !== '') {
    // Enable Button
    updateRangeBtn.classList.add('enable');
    // Remove potential error class
    minRange.classList.remove('error');
    maxRange.classList.remove('error');
  }
}

// Set ranges
function updateRange() {
  // Variables
  var currentMin = document.getElementById('current-min-range');
  var currentMax = document.getElementById('current-max-range');

  // Validate & set values
  if (minRange.value !== '' && maxRange.value !== '') {
    // Set ranges to current ranges section
    currentMin.innerText = minRange.value;
    currentMax.innerText = maxRange.value;

    // Set min and max values on challenger guess inputs
    challenger1Guess.setAttribute('min', minRange.value);
    challenger2Guess.setAttribute('min', minRange.value);
    challenger1Guess.setAttribute('max', maxRange.value);
    challenger2Guess.setAttribute('max', maxRange.value);
  }

  // Add error class for styling inputs
  if (minRange.value === '') {
    minRange.classList.add('error');
  }

  if (maxRange.value === '') {
    maxRange.classList.add('error');
  }
}
