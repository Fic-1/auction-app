import WebSocket from 'isomorphic-ws';

import { login, logout } from './login.js';
import { switchTabs } from './productPage.js';
import { signup } from './signup.js';
import {
  updateSettings,
  updateCover,
  updateProductData,
  createNewProduct,
} from './updateSettings';
import { nextPage, previousPage } from './paginate.js';

const currentUrl = window.location.href;
const url = new URL(currentUrl);

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logoutbtn');
const signupForm = document.querySelector('.form--signup');
const productTabs = document.querySelector('.nav-tabs');
const wsForm = document.querySelector('.websocket-form');
const btnAddBid = document.getElementById('btnAddBid');
const liveBiddingElement = document.querySelector('.imessage');
const userDataForm = document.querySelector('.user-data');
const userPasswordForm = document.querySelector('.change-password');
const coverImageForm = document.querySelector('.product-cover-form');
const productDataForm = document.querySelector('.product-data-form');
const addProduct = document.querySelector('.add-product');
const addProductFormDiv = document.querySelector('.add-product-form-div');
const addProductBtn = document.querySelector('.add-product-btn');
const addProductBtnToggled = document.querySelector('.add-product-btn-toggled');
const addProductForm = document.querySelector('.add-product-form');
const paginateDiv = document.querySelector('.paginateDiv');

if (addProduct) {
  const pageControl = document.getElementById('pages');
  let currentPage = parseInt(url.searchParams.get('page')) || 1;
  const resultsNumberOfPages = Math.ceil(Number(pageControl.dataset.pages) / 5);
  console.log(resultsNumberOfPages);
  pageControl.textContent = `${
    currentPage - 1 <= 0 ? '' : currentPage - 1
  } [${currentPage}] ${
    currentPage + 1 > resultsNumberOfPages ? '' : currentPage + 1
  }`;
  addProduct.addEventListener('click', (e) => {
    addProductBtn.classList.toggle('hidden');
    addProductBtnToggled.classList.toggle('hidden');
    addProductFormDiv.classList.toggle('hidden');
  });

  addProductForm.addEventListener('submit', (e) => {
    const elementArray = [
      addProductForm,
      addProductBtnToggled,
      addProductFormDiv,
    ];
    const formData = new FormData();
    formData.append('name', document.getElementById('create-form--name').value);
    formData.append(
      'description',
      document.getElementById('create-form--description').value,
    );
    formData.append(
      'startingBid',
      document.getElementById('create-form--price').value,
    );
    formData.append(
      'coverImage',
      document.getElementById('coverImage').files[0],
    );
    formData.append(
      'endDate',
      document.getElementById('create-form--date').value,
    );
    console.log(...formData);
    createNewProduct(formData, elementArray);
  });

  paginateDiv.addEventListener('click', (e) => {
    if (e.target.closest('.nextPage')) nextPage();
    if (e.target.closest('.previousPage')) previousPage();
  });
}

if (coverImageForm) {
  const productId = document.querySelector('.label-id').dataset.id;
  //*UPDATE COVER IMAGE
  coverImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'coverImage',
      document.getElementById('coverImage').files[0],
    );
    console.log(...formData);
    updateCover(formData, productId);
  });

  //* UPDATE PRODUCT DATA
  productDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('product-data--name').value;
    const productDescription = document.getElementById(
      'product-data--description',
    ).value;
    const productEndDate = document.getElementById(
      'product-data--endDate',
    ).value;
    const productPhotos = document.getElementById('photos');
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('endDate', productEndDate);
    for (let i = 0; i < productPhotos.files.length; i++) {
      formData.append('photos', productPhotos.files[i]);
    }
    console.log(...formData);
    updateProductData(formData, productId);
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

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    // updateSettings(form, 'data');
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('photo', document.getElementById('photo').files[0]);
    updateSettings(formData, 'data');
  });
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password ').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save-password ').textContent =
      'Change password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

/*----- Websocket logic -----*/

let productId;
if (productTabs) productId = document.getElementById('product').dataset.id;

const updateBiddingUI = (state, newBid, messageData, updateElement) => {
  let markup;
  productId = document.getElementById('product').dataset.id;

  console.log(state);
  console.log(messageData);

  if (messageData.type === 'initialBids') {
    markup = state
      .map((bid) => {
        let formatedAmount = numeral(bid.amount).format('0,0.00');
        return `<p class=${
          bid.bidder === userEmail ? 'from-me' : 'from-them'
        }>${
          bid.bidder
        } <br><span>Added bid: </span><strong>${formatedAmount} €</strong></p>`;
      })
      .join(' ');

    updateElement.innerHTML = markup;
  }

  if (messageData.type === 'newBid') {
    const formatedAmount = numeral(newBid.amount).format('0,0.00');
    console.log(formatedAmount);
    markup = `<p class=${
      newBid.bidder === userEmail ? 'from-me' : 'from-them'
    }>${
      newBid.bidder
    } <br><span>Added bid: </span><strong>${formatedAmount} €</strong></p>`;

    console.log('Updating innerHTML; USER:', userEmail);
    if (productId === newBid._id) updateElement.innerHTML += markup;
    console.log('Updated!');
  }
};

if (productTabs) {
  userEmail = document.cookie
    .split(';')
    .filter((el) => el.includes('user'))[0]
    .trim()
    .split('=')[1]
    .replace('%40', '@');
  console.log(userEmail);
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
  window.addEventListener('unload', function () {
    if (ws.readyState == WebSocket.OPEN) ws.close();
  });
}
