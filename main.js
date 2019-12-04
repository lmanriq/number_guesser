// Variables
var minRange = document.getElementById('min-range');
var maxRange = document.getElementById('max-range');
var updateRangeBtn = document.getElementById('update-range');

// Event Listeners
updateRangeBtn.addEventListener('click', updateRange);
window.addEventListener('keyup', enableSetRangeBtn);

// Enabling set range button
function enableSetRangeBtn() {
  if (minRange.value !== '' && maxRange.value !== '') {
    updateRangeBtn.classList.add('enable');
  }
}

// Set ranges
function updateRange() {
  // Variables
  var currentMin = document.getElementById('current-min-range');
  var currentMax = document.getElementById('current-max-range');

  // Validate & set values
  if (minRange.value !== '' && maxRange.value !== '') {
    currentMin.innerText = minRange.value;
    currentMax.innerText = maxRange.value;
    updateRangeBtn.classList.add('enable');
  }

  if (minRange.value === '') {
    minRange.style.border = "2px solid red";
  }

  if (maxRange.value === '') {
    maxRange.style.border = "2px solid red";
  }
}
