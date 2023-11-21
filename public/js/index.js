import { login, logout } from './login';
import { signup } from './signup';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutbtn');
const signupForm = document.querySelector('.form--signup');

console.log(logOutBtn);
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
console.log(signupForm);
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    console.log('signup event listener');
    e.preventDefault();
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(firstName, lastName, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
