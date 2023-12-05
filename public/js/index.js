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
const liveBiddingElement = document.querySelector('.imessage');

// const updateBiddingUI = (state, messageData, updateElement) => {
//   let markup;
//   console.log(state);
//   const lastBid = state.at(-1);
//   console.log(messageData);
//   if (messageData.type === 'initialBids') {
//     messageData._activeBids.forEach((bid) => {
//       markup = state
//         .map((bid) => {
//           return `<p class=${
//             bid.bidder === userEmail ? 'from-me' : 'from-them'
//           }>${bid.bidder} <br><span>Added bid: </span><strong>${
//             bid.amount
//           }</strong></p>`;
//         })
//         .join(' ');
//     });

//     updateElement.insertAdjacentHTML('beforeend', markup);
//     //TODO Inner html manipulation
//   }
//   if (messageData.type === 'newBid') {
//     console.log(lastBid.bidder);
//     console.log(userEmail);
//     markup = `<p class=${
//       lastBid.bidder === userEmail ? 'from-me' : 'from-them'
//     }>${lastBid.bidder} <br><span>Added bid: </span><strong>${
//       lastBid.amount
//     }</strong></p>`;
//     console.log('Updating innerHTML');
//     updateElement.innerHTML += markup;
//     console.log('Updated!');
//   }
//   console.log(state, lastBid.bidder === userEmail);
// };

const updateBiddingUI = (state, newBid, messageData, updateElement) => {
  let markup;

  console.log(state);
  console.log(messageData);

  if (messageData.type === 'initialBids') {
    markup = state
      .map((bid) => {
        return `<p class=${
          bid.bidder === userEmail ? 'from-me' : 'from-them'
        }>${bid.bidder} <br><span>Added bid: </span><strong>${
          bid.amount
        }</strong></p>`;
      })
      .join(' ');

    if (id === bid._id) updateElement.innerHTML = markup;
  }

  if (messageData.type === 'newBid') {
    markup = `<p class=${
      newBid.bidder === userEmail ? 'from-me' : 'from-them'
    }>${newBid.bidder} <br><span>Added bid: </span><strong>${
      newBid.amount
    }</strong></p>`;

    console.log('Updating innerHTML; USER:', userEmail);
    if (id === newBid._id) updateElement.innerHTML += markup;
    console.log('Updated!');
  }
};

if (productTabs) {
  userEmail = document.cookie.split('=')[1].replace('%40', '@');
  const uri = `ws://${window.location.host.split(':')[0]}:8080`;
  const ws = new WebSocket(uri);
  const wsBidding = (formValue) => {
    const id = document.getElementById('product').dataset.id;
    const messageData = {
      _id: id,
      amount: formValue,
      bidder: userEmail,
    };
    const message = JSON.stringify(messageData);
    console.log(userEmail, messageData.bidder);
    if (userEmail === messageData.bidder) {
      ws.send(message);
    }
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
    const message = JSON.parse(event.data);
    const biddingState = message._activeBids;
    console.log(biddingState);
    const newBid = message.bid;

    updateBiddingUI(biddingState, newBid, message, liveBiddingElement);
    // let markup;
    console.log(`Message from server: ${event.data}`);
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
