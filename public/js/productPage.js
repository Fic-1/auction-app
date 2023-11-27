/*eslint-disable */

export const switchTabs = (e) => {
  const tabProduct = e.target.closest('#product');
  const tabLive = e.target.closest('#liveBid');
  const product = document.getElementById('product');
  const live = document.getElementById('liveBid');
  if (!tabProduct && !tabLive) return;

  product.classList.toggle('active');
  live.classList.toggle('active');
};
