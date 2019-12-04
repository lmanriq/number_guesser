var submitButton = document.getElementById('submit-btn');
var inputs = document.querySelectorAll('.card_guess input');

function enableSubmitButton () {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== ''
    && inputs[3].value !== '') {
      submitButton.classList.add('enable');
    }
  }
}

window.addEventListener('input', enableSubmitButton);
