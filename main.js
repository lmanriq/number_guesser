var clearButton = document.getElementById('clear-btn');
var submitButton = document.getElementById('submit-btn');
var inputs = document.querySelectorAll('.card_guess input');
var challengerOne = document.getElementById('challenger1');
var challengerTwo = document.getElementById('challenger2');
var guessOne = document.getElementById('challenger1-guess');
var guessTwo = document.getElementById('challenger2-guess');
var guessForm = document.getElementById('guess-form');

function clearForm() {
  guessForm.reset();
}

function enableSubmitButton () {
  if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== ''
  && inputs[3].value !== '') {
    submitButton.classList.add('enable');
  }
}

function enableClearButton () {
  if (inputs[0].value !== '' || inputs[1].value || '' || inputs[2].value || ''
  || inputs[3].value !== '') {
    clearButton.classList.add('enable');
  }
}

function resetButtonClass(button) {
  button.classList.remove('enable');
}

clearButton.addEventListener('click', function () {
  clearForm();
  resetButtonClass(clearButton);
});

window.addEventListener('input', function () {
  enableSubmitButton();
  enableClearButton();
});

function addLatestGuess() {
  var latestGuessNameOne = document.getElementById('challenger1-name');
  var latestGuessNameTwo = document.getElementById('challenger2-name');
  var latestGuessOne = document.getElementById('challenger1-guess-display');
  var latestGuessTwo = document.getElementById('challenger2-guess-display');
  latestGuessNameOne.innerText = challengerOne.value;
  latestGuessNameTwo.innerText = challengerTwo.value;
  latestGuessOne.innerText = guessOne.value;
  latestGuessTwo.innerText = guessTwo.value;
}

submitButton.addEventListener('click', function () {
  addLatestGuess();
  clearForm();
  resetButtonClass(submitButton);
  resetButtonClass(clearButton);
});
