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

// We might eventually want to put this into an on load event listener
disableButtons();
makeInitialRandomNumber();
// Event Listeners
updateRangeBtn.addEventListener('click', function () {
  updateRange();
  makeRandomNumber();
});

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
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
  generateGuessHint(challenger1Guess, challenger1Hint);
  generateGuessHint(challenger2Guess, challenger2Hint);
  // clearForm();
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

var currentMin = document.getElementById('current-min-range');
var currentMax = document.getElementById('current-max-range');
var challenger1Hint = document.getElementById('challenger1-hint');
var challenger2Hint = document.getElementById('challenger2-hint');

function makeRandomNumber() {
  randomNumber = Math.floor(Math.random() * (parseInt(currentMax.innerText) - parseInt(currentMin.innerText) + 1) + parseInt(currentMin.innerText));
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
  // If challenger 1 wins..
  if (challenger1Guess.value == randomNumber) {
    console.log('Challenger 1 wins!');
    gameWinner = challengerOne.value;
  }
  // If challenger 1 wins..
  if (challenger2Guess.value == randomNumber) {
    console.log('Challenger 2 wins!');
    gameWinner = challengerTwo.value;
  }
  console.log(`And the winner is... ${gameWinner}!!!`);

  // Create game winning card with players info
  function addWinCard() {
    var winCard = `<section class="game-card">
      <p class="game-header"><span class="challenger-vs">${challengerOne}</span>vs<span class="challenger-vs">${challengerTwo}</span></p>
      <p class="winner-name">${gameWinner}</p>
      <p class="winner-statement">Winner</p>
      <section class="game-footer">
        <p><span class="guess-number">8</span> Guesses</p>
        <p class="time"><span class="minute">1</span> Minute <span class="second">35</span> second</p>
        <div class="btn-wrap">
          <button type="button" name="remove-box"><img src="assets/close.svg" alt="Close game winning card"></button>
        </div>
      </section>
    </section>`;
    // gameCardContainer.insertAdjacentHTML('beforEnd', winCard);
  }
  // Call function to populate winning card
  addWinCard();
  console.log(winCard);
}
