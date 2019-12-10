// Variables
var alertHTML = `<p id="alert-msg" class="alert"><img src="assets/error-icon.svg" alt="error
alert icon">Must be greater than min</p>`;
var alertZone = document.getElementById('alert-zone');
var challenger1Guess = document.getElementById('challenger1-guess');
var challenger2Guess = document.getElementById('challenger2-guess');
var challenger1Hint = document.getElementById('challenger1-hint');
var challenger2Hint = document.getElementById('challenger2-hint');
var challengerOne = document.getElementById('challenger1');
var challengerTwo = document.getElementById('challenger2');
var clearButton = document.getElementById('clear-btn');
var clearWinCardBtn = document.getElementById('clearWinCardBtn');
var currentMax = document.getElementById('current-max-range');
var currentMin = document.getElementById('current-min-range');
var deleteWinCard = document.getElementById('deleteWinCard');
var gameCardContainer = document.getElementById('wonGamesCol');
var gameEnd = null;
var gameStart = null;
var guessCounter = 0;
var guessForm = document.getElementById('guess-form');
var inputs = document.querySelectorAll('.card_guess input');
var maxFieldset = document.getElementById('max-field');
var maxRange = document.getElementById('max-range');
var minRange = document.getElementById('min-range');
var rangeAlertHTML = `<p id="range-alert-msg" class="alert"><img src="assets/error-icon.svg" alt="error
alert icon">Must be within range</p>`;
var rangeAlerts = document.querySelectorAll('.range-alert');
var randomNumber = null;
var rangeForm = document.getElementById('range-form');
var resetButton = document.getElementById('reset-btn');
var submitButton = document.getElementById('submit-btn');
var updateRangeBtn = document.getElementById('update-range');
var withinRange = false;

//Functions to call on load
disableButtons();
makeInitialRandomNumber();

// Event Listeners
window.addEventListener('keyup', function () {
  enableSetRangeBtn();
  testIfMaxIsBigger();
});

window.addEventListener('input', function () {
  enableSubmitButton();
  disableSubmitButton();
  enableClearButton();
  displayOutsideRangeError();
});

clearButton.addEventListener('click', function () {
  clearForm(guessForm);
  clearForm(rangeForm);
  resetButtonClass(clearButton);
  resetButtonClass(submitButton);
  resetButtonClass(updateRangeBtn);
});

gameCardContainer.addEventListener('click', function(event) {
  removeWinCard(event);
  clearWinCards(event);
});

resetButton.addEventListener('click', function(){
  newGame();
  resetButtonClass(resetButton);
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
  resetButtonClass(updateRangeBtn);
  resetDefaultRange();
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

updateRangeBtn.addEventListener('click', function () {
  updateRange();
  testIfMaxIsBigger();
  makeRandomNumber();
  clearForm(rangeForm);
  resetButtonClass(updateRangeBtn);
});

// Functions
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
  gameCardContainer.insertAdjacentHTML('afterbegin', winCardHTML);
  widenRange();
  // Only add button if a game was won
  if (clearWinCardBtn.classList != 'active') {
    clearWinCardBtn.classList.add('active');
  }
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

function clearForm(form) {
  form.reset();
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

function determineWinner(winnerName, winnerGuess) {
  if (winnerGuess.value == randomNumber) {
    gameWinner = winnerName.value;
    totalGuesses = guessCounter;
    addWinCard();
    newGame();
  }
  resetButtonClass(resetButton);
}

function disableButtons() {
  clearButton.disabled = true;
  submitButton.disabled = true;
  resetButton.disabled = true;
  updateRangeBtn.disabled = true;
}

function disableSubmitButton () {
  if (inputs[0].value == '' || inputs[1].value == '' || inputs[2].value == ''
  || inputs[3].value == '') {
    resetButtonClass(submitButton)
  }
}

function displayOutsideRangeError() {
  checkForError(challenger1Guess, 0);
  checkForError(challenger2Guess, 1);
}

function enableClearButton () {
  if (inputs[0].value !== '' || inputs[1].value || '' || inputs[2].value || ''
  || inputs[3].value !== '') {
    clearButton.classList.add('enable');
    clearButton.disabled = false;
  }
}

function enableSetRangeBtn() {
  if (minRange.value !== '' && maxRange.value !== '') {
    updateRangeBtn.classList.add('enable');
    minRange.classList.remove('error');
    maxRange.classList.remove('error');
  }
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

function gameWin() {
  var gameWinner = null;
  var totalGuesses = null;
  determineWinner(challengerOne, challenger1Guess);
  determineWinner(challengerTwo, challenger2Guess);
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

function increaseGuessCount() {
  guessCounter += 2;
}

function isWithinRange() {
  if (parseInt(challenger1Guess.value) > parseInt(currentMin.innerText) &&
  parseInt(challenger2Guess.value) > parseInt(currentMin.innerText) &&
  parseInt(challenger1Guess.value) < parseInt(currentMax.innerText) &&
  parseInt(challenger2Guess.value) < parseInt(currentMax.innerText)) {
    withinRange = true;
  }
}

function makeInitialRandomNumber() {
  randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  setTimeStart();
}

function makeRandomNumber() {
  randomNumber = Math.floor(Math.random() * (parseInt(currentMax.innerText) -
  parseInt(currentMin.innerText) + 1) + parseInt(currentMin.innerText));
  resetGuessCounter();
  setTimeStart();
}

function newGame() {
  clearForm(guessForm);
  clearForm(rangeForm);
  resetButtonClass(clearButton);
  resetGuessCounter();
  makeRandomNumber();
}

function removeWinCard(event) {
  var clickedCard = null;
  if (event.target.classList == 'deleteWinCard') {
    clickedCard = event.target.closest('.game-card');
    clickedCard.parentNode.removeChild(clickedCard);
  }
}

function resetButtonClass(button) {
  button.classList.remove('enable');
  button.disabled = true;
}

function resetDefaultRange() {
  currentMin.innerText = 1;
  currentMax.innerText = 100;
}

function resetGuessCounter() {
  guessCounter = 0;
}

function setMinMax () {
  challenger1Guess.setAttribute('min', minRange.value);
  challenger1Guess.setAttribute('max', maxRange.value);
  challenger2Guess.setAttribute('min', minRange.value);
  challenger2Guess.setAttribute('max', maxRange.value);
}

function setTimeEnd() {
  gameEnd = performance.now();
}

function setTimeStart() {
  gameStart = performance.now();
}

function styleAlertMsg() {
  alertZone.innerHTML = alertHTML;
  var alertMsg = document.getElementById('alert-msg');
  maxRange.classList.add('error');
  alertMsg.classList.add('alert');
}

function testIfMaxIsBigger() {
  if (parseInt(maxRange.value) <= parseInt(minRange.value)) {
    styleAlertMsg();
    resetButtonClass(updateRangeBtn)
    disableSubmitButton();
  } else if (parseInt(minRange.value) < parseInt(maxRange.value)) {
    alertZone.innerHTML = '';
    updateRangeBtn.disabled = false;
  }
}

function updateRange() {
  validateRange();
  enableSubmitButton();
}

function validateRange() {
  if (minRange.value !== '' && maxRange.value !== '') {
    currentMin.innerText = minRange.value;
    currentMax.innerText = maxRange.value;
    setMinMax();
  }
}

function widenRange() {
  currentMin.innerText = parseInt(currentMin.innerText) - 10;
  currentMax.innerText = parseInt(currentMax.innerText) + 10;
}
