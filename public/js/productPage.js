/*eslint-disable */
import WebSocket from 'isomorphic-ws';

export const switchTabs = (e) => {
  const allLinks = document.querySelectorAll('.nav-link');
  const allContent = document.querySelectorAll('.card-body');
  const liveBids = document.querySelector('.websocket-background');
  const tabProduct = e.target.closest('#product');
  const tabLive = e.target.closest('#liveBid');
  const tabCheckout = e.target.closest('#checkoutLink');
  const product = document.getElementById('product');
  const productContent = document.getElementById('productContent');
  const live = document.getElementById('liveBid');
  const liveContent = document.getElementById('liveBidContent');
  const checkout = document.getElementById('checkoutLink');
  const checkoutContent = document.getElementById('checkoutContent');
  if (!tabProduct && !tabLive && !tabCheckout) return;
  allContent.forEach((element) => {
    element.classList.remove('card-flex');
    element.classList.add('none');
  });
  allLinks.forEach((el, i) => {
    el.classList.remove('active');
  });
  e.target.closest('.nav-link').classList.add('active');
  allContent.forEach((element, i) => {
    if (i == e.target.closest('.nav-link').dataset.tab)
      element.classList.add('card-flex');
  });
};
