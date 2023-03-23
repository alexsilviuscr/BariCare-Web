const cookiesDiv = document.querySelector('#cookies'); 

// check if cookies are already accepted and hide the banner if true
const cookiesAccepted = document.cookie.includes('cookiesAccepted=true');
if (cookiesAccepted) {
    cookiesDiv.style.display = 'none';
} else {
    cookiesDiv.style.display = 'flex';
}
// add event listener for DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
  const acceptBtn = document.querySelector('#accept-btn'); 

  acceptBtn.addEventListener('click', () => {
    // calculate the expiration date for the cookies (30 days from now)
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();

    // set the "cookies_accepted" cookie with an expiration date 30 days from now
    document.cookie = `cookiesAccepted=true; expires=${expires}; path=/`;

    // hide the cookies banner
    cookiesDiv.style.display = 'none';
  });
});
