/*eslint-disable */

export const switchTabs = (e) => {
  const liveBids = document.querySelector('.websocket-background');
  const tabProduct = e.target.closest('#product');
  const tabLive = e.target.closest('#liveBid');
  const product = document.getElementById('product');
  const productContent = document.getElementById('productContent');
  const live = document.getElementById('liveBid');
  const liveContent = document.getElementById('liveBidContent');

  if (!tabProduct && !tabLive) return;

  product.classList.toggle('active');
  productContent.classList.toggle('none');
  productContent.classList.toggle('card-flex');

  live.classList.toggle('active');
  liveContent.classList.toggle('none');
  liveContent.classList.toggle('card-flex');
  liveBids.scrollTop = liveBids.scrollHeight;
};
