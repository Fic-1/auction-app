import { login, logout } from './login';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutbtn');
console.log(logOutBtn);
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
