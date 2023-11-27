import { login, logout } from './login';
import { switchTabs } from './productPage';
import { signup } from './signup';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutbtn');
const signupForm = document.querySelector('.form--signup');
const productTabs = document.querySelector('.nav-tabs');
const liveBids = document.querySelector('.websocket-background');

console.log(productTabs);
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

if (productTabs) {
  productTabs.addEventListener('click', switchTabs);
}

if (liveBids) liveBids.scrollTop = liveBids.scrollHeight;
