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
const liveBiddingArea = document.querySelector('.imessage');

if (productTabs) {
  userEmail = document.cookie.split('=')[1].replace('%40', '@');
  const uri = `ws://${window.location.host.split(':')[0]}:8080`;
  const ws = new WebSocket(uri);
  const wsBidding = (formValue) => {
    const id = document.getElementById('product').dataset.id;
    const message = JSON.stringify({
      _id: id,
      amount: formValue,
      bidder: '',
    });
    ws.send(message);
  };

  ws.onopen = function open() {
    console.log('connected');
    // ws.send(Date.now());
  };

  ws.onclose = function close() {
    ws.close();
    console.log('disconnected');
  };

  ws.onmessage = (event) => {
    let markup;
    console.log(`Message from server: ${event.data}`);
    const message = JSON.parse(event.data);
    // console.log(event);
    if (message.type === 'initialBids') {
      // Handle the initial bid data when connecting to the WebSocket
      const initialBids = message.data;
      initialBids.forEach((bid) => {
        console.log(bid);
        markup += `<p class=${
          bid.bidder === userEmail ? 'from-me' : 'from-them'
        }>${bid.bidder} <br><span>Added bid: </span><strong>${
          bid.amount
        }</strong></p>`;
      });

      liveBiddingArea.insertAdjacentHTML('beforeend', markup);

      // Update the UI or do any other processing with the initial bid data
      //TODO Inner html manipulation
    } else if (message.type === 'newBid') {
      // Handle updates for new bids in real-time
      const markup = `<p class=${
        message.data.bidder === userEmail ? 'from-me' : 'from-them'
      }>${message.data.bidder} <br><span>Added bid: </span><strong>${
        message.data.amount
      }</strong></p>`;
      const newBid = message.data;
      // Update the UI or do any other processing with the new bid data
      liveBiddingArea.insertAdjacentHTML('beforeend', markup);
    }
  };

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
