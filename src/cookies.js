const cookiesDiv = document.querySelector('#cookies'); 

// check if cookies are already accepted and hide the banner if true
const cookiesAccepted = localStorage.getItem("cookiesAccepted");

if (cookiesAccepted) {
    cookiesDiv.style.display = "none";
} else {
    cookiesDiv.style.display = "flex";
}
// add event listener for load/DOMContentLoaded 
window.addEventListener("load", () => {
  const acceptBtn = document.querySelector("#accept-btn"); 

  acceptBtn.addEventListener("click", () => {
    // calculate the expiration date for the cookies (30 days from now)
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    const expires = expireDate.toUTCString();

    // set the "cookiesAccepted" value in localStorage
    localStorage.setItem("cookiesAccepted", "true");

    // set the "cookiesAcceptedExpires" value in localStorage
    localStorage.setItem("cookiesAcceptedExpires", expires);

    // hide the cookies banner
    cookiesDiv.style.display = "none";
  });
});