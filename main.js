var clearButton = document.getElementById('clear-btn');
var submitButton = document.getElementById('submit-btn');
var inputs = document.querySelectorAll('.card_guess input');

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
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

clearButton.addEventListener('click', clearForm);

window.addEventListener('input', function () {
  enableSubmitButton();
  enableClearButton();
});
