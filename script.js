const form = document.querySelector('#ask-form');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('#menu-toggle');
const loginScreen = document.querySelector('#login-screen');
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');
const passwordInput = document.querySelector('#login-password');
const logoutButton = document.querySelector('#logout-button');
const dashboardMain = document.querySelector('main');

const showDashboard = () => document.body.classList.add('logged-in');
if (localStorage.getItem('finrag-session') === 'remembered') showDashboard();

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim();
  if (!email || !passwordInput.value) return;
  loginMessage.textContent = '';
  if (document.querySelector('#remember-me').checked) localStorage.setItem('finrag-session', 'remembered');
  showDashboard();
});

document.querySelector('#demo-login').addEventListener('click', () => {
  document.querySelector('#login-email').value = 'demo@finrag.ai';
  passwordInput.value = 'demo-access';
  showDashboard();
});

document.querySelector('#toggle-password').addEventListener('click', (event) => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  event.currentTarget.textContent = isPassword ? 'Hide' : 'Show';
  event.currentTarget.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
});

document.querySelector('#forgot-password').addEventListener('click', (event) => {
  event.preventDefault();
  loginMessage.textContent = 'Password reset instructions would be sent to your email.';
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('finrag-session');
  document.body.classList.remove('logged-in');
  loginForm.reset();
  loginMessage.textContent = '';
  loginScreen.querySelector('#login-email').focus();
});

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
  item.addEventListener('click', (event) => {
    const view = item.dataset.view;
    if (!view) return;
    event.preventDefault();
    dashboardMain.className = `view-${view}`;
    document.querySelectorAll('.nav-item').forEach((navItem) => navItem.classList.remove('active'));
    item.classList.add('active');
    window.location.hash = view;
    sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const initialView = ['research', 'watchlist'].includes(window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'overview';
dashboardMain.className = `view-${initialView}`;
if (initialView !== 'overview') {
  document.querySelector(`.nav-item[data-view="${initialView}"]`).classList.add('active');
  document.querySelector('.nav-item[data-view="overview"]').classList.remove('active');
}

document.querySelector('#briefing-button').addEventListener('click', () => {
  document.querySelector('#research').scrollIntoView({ behavior: 'smooth' });
  question.focus();
});
