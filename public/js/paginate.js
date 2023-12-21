export const nextPage = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  let currentPage = parseInt(url.searchParams.get('page')) || 1;
  currentPage++;

  url.searchParams.set('page', currentPage);
  window.location.href = url.href;
};

export const previousPage = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  let currentPage = parseInt(url.searchParams.get('page')) || 1;
  currentPage--;

  url.searchParams.set('page', currentPage);
  window.location.href = url.href;
};
