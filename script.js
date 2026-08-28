const form = document.querySelector('#ask-form');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('#menu-toggle');

document.querySelectorAll('.suggestion-row button').forEach((button) => {
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
  answer.textContent = `Research request received: “${text}” FinRAG will ground its response across the four enabled sources.`;
  answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => sidebar.classList.remove('open'));
});

document.querySelector('#briefing-button').addEventListener('click', () => {
  document.querySelector('#research').scrollIntoView({ behavior: 'smooth' });
  question.focus();
});
