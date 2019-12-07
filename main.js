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
var gameCardContainer = document.getElementById('wonGamesCol');
var randomNumber = null;
var alertZone = document.getElementById('alert-zone');
var maxFieldset = document.getElementById('max-field');
var alertHTML = `<p id="alert-msg" class="alert"><img src="assets/error-icon.svg" alt="error
alert icon">Must be greater than min</p>`
var rangeAlertHTML = `<p id="range-alert-msg" class="alert"><img src="assets/error-icon.svg" alt="error
alert icon">Must be within range</p>`
var rangeAlerts = document.querySelectorAll('.range-alert');
var currentMin = document.getElementById('current-min-range');
var currentMax = document.getElementById('current-max-range');
var challenger1Hint = document.getElementById('challenger1-hint');
var challenger2Hint = document.getElementById('challenger2-hint');
var guessCounter = 0;
var withinRange = false;

// We might eventually want to put this into an on load event listener
disableButtons();
makeInitialRandomNumber();
// Event Listeners
updateRangeBtn.addEventListener('click', function () {
  // updateRange();
  testIfMaxIsBigger();
  makeRandomNumber();
});

window.addEventListener('keyup', function () {
  enableSetRangeBtn();
  testIfMaxIsBigger();
});

clearButton.addEventListener('click', function () {
  clearForm();
  resetButtonClass(clearButton);
});

window.addEventListener('input', function () {
  enableSubmitButton();
  disableSubmitButton();
  enableClearButton();
  displayOutsideRangeError();
});

resetButton.addEventListener('click', function(){
  newGame();
  resetDefaultRange();
  resetButtonClass(resetButton);
  // resetButtonClass(updateRangeBtn);
});

submitButton.addEventListener('click', function () {
  addLatestGuess();
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
  generateGuessHint(challenger1Guess, challenger1Hint);
  generateGuessHint(challenger2Guess, challenger2Hint);
  increaseGuessCount();
  gameWin();
});

// Functions
function clearForm() {
  guessForm.reset();
}

function disableButtons() {
  clearButton.disabled = true;
  submitButton.disabled = true;
  resetButton.disabled = true;
  updateRangeBtn.disabled = true;
}

function enableSubmitButton () {
isWithinRange();
  if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== ''
  && inputs[3].value !== '' && withinRange == true) {
    submitButton.classList.add('enable');
    submitButton.disabled = false;
  }

  resetButton.classList.add('enable');
  resetButton.disabled = false;
}

function isWithinRange() {
  if (parseInt(challenger1Guess.value) > parseInt(currentMin.innerText) &&
  parseInt(challenger2Guess.value) > parseInt(currentMin.innerText) &&
  parseInt(challenger1Guess.value) < parseInt(currentMax.innerText) &&
  parseInt(challenger1Guess.value) < parseInt(currentMax.innerText)) {
    withinRange = true;
  }
}

function disableSubmitButton () {
  if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == ''
  || inputs[3].value == '') {
    resetButtonClass(submitButton)
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
  enableSubmitButton();
}

function displayOutsideRangeError() {
  // Put parseInt values as variables to shorten these lines
  if (parseInt(challenger1Guess.value) > parseInt(currentMax.innerText) ||
  parseInt(challenger1Guess.value) < parseInt(currentMin.innerText)) {
    rangeAlerts[0].innerHTML = rangeAlertHTML;
    challenger1Guess.classList.add('error');
  } else if (parseInt(challenger2Guess.value) > parseInt(currentMax.innerText) ||
  parseInt(challenger2Guess.value) < parseInt(currentMin.innerText)) {
    rangeAlerts[1].innerHTML = rangeAlertHTML;
    challenger2Guess.classList.add('error');
  } else {
    rangeAlerts[0].innerHTML = '';
    rangeAlerts[1].innerHTML = '';
    challenger1Guess.classList.remove('error');
    challenger2Guess.classList.remove('error');
  }
  var rangeAlertMsg = document.getElementById('range-alert-msg');
}

function testIfMaxIsBigger() {
  if (parseInt(maxRange.value) <= parseInt(minRange.value)) {
    alertZone.innerHTML = alertHTML;
    var alertMsg = document.getElementById('alert-msg');
    maxRange.classList.add('error');
    alertMsg.classList.add('alert');
    updateRangeBtn.classList.remove('enable');
    disableSubmitButton();
  } else if (parseInt(minRange.value) < parseInt(maxRange.value)) {
    console.log('Max is bigger than min');
    alertZone.innerHTML = '';
    updateRangeBtn.disabled = false;
    updateRange();
  }
}

function makeRandomNumber() {
  randomNumber = Math.floor(Math.random() * (parseInt(currentMax.innerText) - parseInt(currentMin.innerText) + 1) + parseInt(currentMin.innerText));
  // Make random number should "restart" the game
  resetGuessCounter();
}

function makeInitialRandomNumber() {
  randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

function generateGuessHint(currentGuess, hint) {
  if (currentGuess.value > randomNumber) {
    hint.innerText = "that's too high";
  } else if (currentGuess.value < randomNumber) {
    hint.innerText = "that's too low";
  } else if (currentGuess.value == randomNumber) {
    hint.innerText = "BOOM!";
  }
}



function gameWin() {
  var gameWinner = null;
  var totalGuesses = null;

  determineWinner(challengerOne, challenger1Guess);
  determineWinner(challengerTwo, challenger2Guess);

  function determineWinner(winnerName, winnerGuess) {
    if (winnerGuess.value == randomNumber) {
      gameWinner = winnerName.value;
      totalGuesses = guessCounter;
      // Call function to populate winning card
      addWinCard();
      newGame();
    }
  }

  // Create game winning card with players info
  function addWinCard() {
    var winCardHTML = `<section class="game-card">
      <p class="game-header"><span class="challenger-vs">${challengerOne.value}</span>vs<span class="challenger-vs">${challengerTwo.value}</span></p>
      <p class="winner-name">${gameWinner}</p>
      <p class="winner-statement">Winner</p>
      <section class="game-footer">
        <p><span class="guess-number">${totalGuesses}</span> Guesses</p>
        <p class="time"><span class="minute">1</span> Minute <span class="second">35</span> second</p>
        <div class="btn-wrap">
          <button type="button" name="remove-box"><img src="assets/close.svg" alt="Close game winning card"></button>
        </div>
      </section>
    </section>`;
    // Insert win card into container
    gameCardContainer.insertAdjacentHTML('afterbegin', winCardHTML);
  }
}

function increaseGuessCount() {
  guessCounter += 2;
}

function resetGuessCounter() {
  guessCounter = 0;
}

function newGame() {
  clearForm();
  resetGuessCounter();
  makeRandomNumber();
  resetDefaultRange();
}

function resetDefaultRange() {
  currentMin.innerText = 1;
  currentMax.innerText = 100;
};
