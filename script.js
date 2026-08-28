const form = document.querySelector('#ask-form');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');

document.querySelectorAll('.examples button').forEach((button) => {
  button.addEventListener('click', () => {
    question.value = button.textContent;
    question.focus();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = question.value.trim();
  if (!text) {
    question.focus();
    return;
  }
  answer.hidden = false;
  answer.textContent = `Your question is queued for grounded analysis: “${text}”`;
});