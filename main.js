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
var rangeForm = document.getElementById('range-form');
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
var deleteWinCard = document.getElementById('deleteWinCard');
var clearWinCardBtn = document.getElementById('clearWinCardBtn');
var gameStart = null;
var gameEnd = null;

// We might eventually want to put this into an on load event listener
disableButtons();
makeInitialRandomNumber();
// Event Listeners
updateRangeBtn.addEventListener('click', function () {
  updateRange();
  testIfMaxIsBigger();
  makeRandomNumber();
  clearForm(rangeForm);
  resetButtonClass(updateRangeBtn);
});

window.addEventListener('keyup', function () {
  enableSetRangeBtn();
  testIfMaxIsBigger();
});

clearButton.addEventListener('click', function () {
  clearForm(guessForm);
  clearForm(rangeForm);
  resetButtonClass(clearButton);
  resetButtonClass(submitButton);
  resetButtonClass(updateRangeBtn);
});

window.addEventListener('input', function () {
  enableSubmitButton();
  disableSubmitButton();
  enableClearButton();
  displayOutsideRangeError();
});

resetButton.addEventListener('click', function(){
  newGame();
  resetButtonClass(resetButton);
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
  resetButtonClass(updateRangeBtn);
});

submitButton.addEventListener('click', function () {
  addLatestGuess();
  resetButtonClass(submitButton);
  generateGuessHint(challenger1Guess, challenger1Hint);
  generateGuessHint(challenger2Guess, challenger2Hint);
  increaseGuessCount();
  gameWin();
  enableSubmitButton();
});

gameCardContainer.addEventListener('click', function(event) {
  removeWinCard(event);
  clearWinCards(event);
});



// Functions
function clearForm(form) {
  form.reset();
}

function disableButtons() {
  clearButton.disabled = true;
  submitButton.disabled = true;
  resetButton.disabled = true;
  updateRangeBtn.disabled = true;
}

function enableSubmitButton() {
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
  parseInt(challenger2Guess.value) < parseInt(currentMax.innerText)) {
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

function setMinMax () {
  challenger1Guess.setAttribute('min', minRange.value);
  challenger1Guess.setAttribute('max', maxRange.value);
  challenger2Guess.setAttribute('min', minRange.value);
  challenger2Guess.setAttribute('max', maxRange.value);
}
// Validate & set values
function validateRange() {
  if (minRange.value !== '' && maxRange.value !== '') {
    // Set ranges to current ranges section
    currentMin.innerText = minRange.value;
    currentMax.innerText = maxRange.value;
    // Set min and max values on challenger guess inputs
    setMinMax();
  }
}
// Add error class for styling inputs
// function addErrorClass() {
//   if (minRange.value === '') {
//     minRange.classList.add('error');
//   }
//   if (maxRange.value === '') {
//     maxRange.classList.add('error');
//   }
// }

function updateRange() {
  validateRange();
  // addErrorClass();
  enableSubmitButton();
}

function checkForError(guess, index) {
  if (parseInt(guess.value) > parseInt(currentMax.innerText) ||
  parseInt(guess.value) < parseInt(currentMin.innerText)) {
    rangeAlerts[index].innerHTML = rangeAlertHTML;
    guess.classList.add('error');
    resetButtonClass(submitButton);
  } else {
    rangeAlerts[index].innerHTML = '';
    guess.classList.remove('error');
  }
}

function displayOutsideRangeError() {
  // Put parseInt values as variables to shorten these lines
  checkForError(challenger1Guess, 0);
  checkForError(challenger2Guess, 1);
  var rangeAlertMsg = document.getElementById('range-alert-msg');
}

//longer than 10
function testIfMaxIsBigger() {
  if (parseInt(maxRange.value) <= parseInt(minRange.value)) {
    //we could probably remove this chunk and give it its own function
    alertZone.innerHTML = alertHTML;
    var alertMsg = document.getElementById('alert-msg');
    maxRange.classList.add('error');
    alertMsg.classList.add('alert');
    resetButtonClass(updateRangeBtn)
    disableSubmitButton();
  } else if (parseInt(minRange.value) < parseInt(maxRange.value)) {
    alertZone.innerHTML = '';
    updateRangeBtn.disabled = false;
  }
}

function makeInitialRandomNumber() {
  randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  setTimeStart();
}

function makeRandomNumber() {
  randomNumber = Math.floor(Math.random() * (parseInt(currentMax.innerText) - parseInt(currentMin.innerText) + 1) + parseInt(currentMin.innerText));
  // Make random number should "restart" the game
  resetGuessCounter();
  setTimeStart();
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

function widenRange() {
  currentMin.innerText = parseInt(currentMin.innerText) - 10;
  currentMax.innerText = parseInt(currentMax.innerText) + 10;
}

function determineWinner(winnerName, winnerGuess) {
  if (winnerGuess.value == randomNumber) {
    gameWinner = winnerName.value;
    totalGuesses = guessCounter;
    // Call function to populate winning card
    addWinCard();
    newGame();
  }
  resetButtonClass(resetButton);
}

//longer than 10
function addWinCard() {
  setTimeEnd();
  var timeDifference = gameEnd - gameStart;
  var seconds = Math.floor(timeDifference / 1000);
  var minutes = Math.floor(timeDifference / 60000);
  var winCardHTML = `<section class="game-card">
    <p class="game-header"><span class="challenger-vs">${challengerOne.value}</span>vs<span class="challenger-vs">${challengerTwo.value}</span></p>
    <p class="winner-name">${gameWinner}</p>
    <p class="winner-statement">Winner</p>
    <section class="game-footer">
      <p><span class="guess-number">${totalGuesses}</span> Guesses</p>
      <p class="time"><span class="minute">${minutes}</span> Minute <span class="second">${seconds}</span> second</p>
      <div class="btn-wrap">
        <button type="button" name="remove-box"><img class="deleteWinCard" src="assets/close.svg" alt="Close game winning card"></button>
      </div>
    </section>
  </section>`;
  // Insert win card into container
  gameCardContainer.insertAdjacentHTML('afterbegin', winCardHTML);
  widenRange();
}

function gameWin() {
  var gameWinner = null;
  var totalGuesses = null;
  determineWinner(challengerOne, challenger1Guess);
  determineWinner(challengerTwo, challenger2Guess);
  // Create game winning card with players info
  // addWinCard();
  if (clearWinCardBtn.classList != 'active') {
    clearWinCardBtn.classList.add('active');
  }
}

function increaseGuessCount() {
  guessCounter += 2;
}

function resetGuessCounter() {
  guessCounter = 0;
}

function newGame() {
  clearForm(guessForm);
  clearForm(rangeForm);
  resetButtonClass(clearButton);
  resetGuessCounter();
  makeRandomNumber();
  // resetDefaultRange();
}

// function resetDefaultRange() {
//   currentMin.innerText = 1;
//   currentMax.innerText = 100;
// }

function setTimeStart() {
  gameStart = performance.now();
}

function setTimeEnd() {
  gameEnd = performance.now();
}

function removeWinCard(event) {
  var clickedCard = null;
  if (event.target.classList == 'deleteWinCard') {
    clickedCard = event.target.closest('.game-card');
    clickedCard.parentNode.removeChild(clickedCard);
  }
}

function clearWinCards(event) {
  var gameCards = document.querySelectorAll('.game-card');
  if (event.target.id === 'clearWinCardBtn') {
    for (var i = 0; i < gameCards.length; i++) {
      gameCards[i].remove();
    }
    clearWinCardBtn.classList.remove('active');
  }
}
