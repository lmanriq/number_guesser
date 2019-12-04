var submitButton = document.getElementById('submit-btn');
var clearButton = document.getElementById('clear-btn');
var inputs = document.querySelectorAll('.card_guess input');

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

window.addEventListener('input', function () {
  enableSubmitButton();
  enableClearButton();
});
