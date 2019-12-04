// Variables
var clearButton = document.getElementById('clear-btn');
var submitButton = document.getElementById('submit-btn');
var resetButton = document.getElementById('reset-btn')
var inputs = document.querySelectorAll('.card_guess input');
var challengerOne = document.getElementById('challenger1');
var challengerTwo = document.getElementById('challenger2');
var challenger1Guess = document.getElementById('challenger1-guess');
var challenger2Guess = document.getElementById('challenger2-guess');
var guessForm = document.getElementById('guess-form');
var minRange = document.getElementById('min-range');
var maxRange = document.getElementById('max-range');
var updateRangeBtn = document.getElementById('update-range');

// We might eventually want to put this into an on load event listener
disableButtons();

// Event Listeners
updateRangeBtn.addEventListener('click', updateRange);
window.addEventListener('keyup', enableSetRangeBtn);

clearButton.addEventListener('click', function () {
  clearForm();
  resetButtonClass(clearButton);
});

window.addEventListener('input', function () {
  enableSubmitButton();
  enableClearButton();
});

submitButton.addEventListener('click', function () {
  addLatestGuess();
  clearForm();
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
});

// Functions
function clearForm() {
  guessForm.reset();
}

function disableButtons() {
  clearButton.disabled = true;
  submitButton.disabled = true;
  resetButton.disabled = true;
}

function enableSubmitButton () {
  if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== ''
  && inputs[3].value !== '') {
    submitButton.classList.add('enable');
    submitButton.disabled = false;
  }
}

function enableClearButton () {
  if (inputs[0].value !== '' || inputs[1].value || '' || inputs[2].value || ''
  || inputs[3].value !== '') {
    clearButton.classList.add('enable');
    clearButton.disabled = false;
  }
}

function resetButtonClass(button) {
  button.classList.remove('enable');
  button.disabled = true;
}

function addLatestGuess() {
  var latestGuessNameOne = document.getElementById('challenger1-name');
  var latestGuessNameTwo = document.getElementById('challenger2-name');
  var latestGuessOne = document.getElementById('challenger1-guess-display');
  var latestGuessTwo = document.getElementById('challenger2-guess-display');
  latestGuessNameOne.innerText = challengerOne.value;
  latestGuessNameTwo.innerText = challengerTwo.value;
  latestGuessOne.innerText = challenger1Guess.value;
  latestGuessTwo.innerText = challenger2Guess.value;
}

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
