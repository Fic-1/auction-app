export const nextPage = () => {
  const currentUrl = window.location.href;

  // Parse the URL to get its components
  const url = new URL(currentUrl);

  // Get the current page query parameter value (default to 1 if not present)
  let currentPage = parseInt(url.searchParams.get('page')) || 1;

  // Increment the page number
  currentPage++;

  // Set the new page value in the URL
  url.searchParams.set('page', currentPage);

  // Redirect to the new URL
  window.location.href = url.href;
};

export const previousPage = () => {
  const currentUrl = window.location.href;

  // Parse the URL to get its components
  const url = new URL(currentUrl);

  // Get the current page query parameter value (default to 1 if not present)
  let currentPage = parseInt(url.searchParams.get('page')) || 1;

  // Increment the page number
  currentPage--;

  // Set the new page value in the URL
  url.searchParams.set('page', currentPage);

  // Redirect to the new URL
  window.location.href = url.href;
};
