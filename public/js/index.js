import WebSocket from 'isomorphic-ws';

import { login, logout } from './login.js';
import { switchTabs } from './productPage.js';
import { signup } from './signup.js';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutbtn');
const signupForm = document.querySelector('.form--signup');
const productTabs = document.querySelector('.nav-tabs');
const wsForm = document.querySelector('.websocket-form');
const btnAddBid = document.getElementById('btnAddBid');

function heartbeat() {
  clearTimeout(this.pingTimeout);
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}

if (productTabs) {
  const uri = 'ws://localhost:8080';
  const ws = new WebSocket(uri);

  const wsBidding = (formValue) => {
    ws.send(formValue);
    formValue = '';
  };

  ws.onopen = function open() {
    console.log('connected');
    ws.send(Date.now());
  };

  ws.onclose = function close() {
    ws.close();
    console.log('disconnected');
  };

  ws.onmessage = (event) => {
    console.log(`Message from server: ${event.data}`);
    // console.log(`Roundtrip time: ${Date.now() - data.data} ms`);

    // setTimeout(function timeout() {
    //   ws.send(Date.now());
    // }, 500);
  };

  // ws.on('error', console.error);
  // ws.on('open', heartbeat);
  // ws.on('ping', heartbeat);
  // ws.on('close', function clear() {
  //   clearTimeout(this.pingTimeout);
  // });

  if (btnAddBid) {
    wsForm.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        wsBidding(wsForm.value);
        wsForm.value = '';
      }
    });

    btnAddBid.addEventListener('click', (e) => {
      e.preventDefault;
      wsBidding(wsForm.value);
      wsForm.value = '';
    });
  }
  // ws.onclose = function (e) {
  //   console.log('connection closed');
  // };
  window.addEventListener('unload', function () {
    if (ws.readyState == WebSocket.OPEN) ws.close();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
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
