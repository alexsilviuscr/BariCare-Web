const cookiesDiv = document.querySelector('#cookies'); 

// check if cookies are already accepted and hide the banner if true
const cookiesAccepted = document.cookie.includes("ookiesAccepted=true");

if (cookiesAccepted) {
    cookiesDiv.style.display = "none";
} else {
    cookiesDiv.style.display = "flex";
}
// add event listener for DOMContentLoaded 
document.addEventListener("load", () => {
  const acceptBtn = document.querySelector("#accept-btn"); 

  acceptBtn.addEventListener("click", () => {
    // calculate the expiration date for the cookies (30 days from now)
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    const expires = expireDate.toUTCString();

    // set the "cookies_accepted" cookie with an expiration date 30 days from now
    document.cookie = "cookiesAccepted=true; expires=${expires}; path=/";

    // hide the cookies banner
    cookiesDiv.style.display = "none";
  });
});