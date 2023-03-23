const form = document.getElementById("bmi-form");
const showQuestionsBtn = document.getElementById("show-questions-btn");
const interventionQuestions = document.getElementById("intervention-questions");

const underweightDiv = document.getElementById("underweight");
const normalDiv = document.getElementById("normal");
const overweightDiv = document.getElementById("overweight");
const obeseDiv = document.getElementById("obese");
const morbidlyObeseDiv = document.getElementById("morbidly-obese");

const gastricSleeveDiv = document.getElementById("gastric-sleeve");
const gastricBandDiv = document.getElementById("gastric-band");
const gastricBypassDiv = document.getElementById("gastric-bypass");

let bmiValue;
let previousSurgery;
let diabetes;
let hypertension;

form.addEventListener("submit", function(event) {
    event.preventDefault(); //stops page from reloading

    // get BMI value from form
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    bmiValue = weight / (height / 100 * height / 100);

    // create container div for result and associated div
    const containerDiv = document.createElement("div");
    containerDiv.className = "bmi-result";

    // show appropriate div based on BMI value and add to container div
    if (bmiValue < 18.5) {
        underweightDiv.style.display = "block";
        containerDiv.appendChild(document.createElement("p").appendChild(document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)));
        containerDiv.appendChild(underweightDiv);
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
        normalDiv.style.display = "block";
        containerDiv.appendChild(document.createElement("p").appendChild(document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)));
        containerDiv.appendChild(normalDiv);
    } else if (bmiValue >= 25 && bmiValue < 30) {
        overweightDiv.style.display = "block";
        containerDiv.appendChild(document.createElement("p").appendChild(document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)));
        containerDiv.appendChild(overweightDiv);
    } else if (bmiValue >= 30 && bmiValue < 40) {
        obeseDiv.style.display = "block";
        containerDiv.appendChild(document.createElement("p").appendChild(document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)));
        containerDiv.appendChild(obeseDiv);
    } else {
        morbidlyObeseDiv.style.display = "block";
        containerDiv.appendChild(document.createElement("p").appendChild(document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)));
        containerDiv.appendChild(morbidlyObeseDiv);
    }

    // append container div to result and show "show-questions-btn"
    const result = document.getElementById("result");
    result.appendChild(containerDiv);
    if (bmiValue > 25) {
        showQuestionsBtn.style.display = "block";
    }
    resetBtn.style.display = "block";
    form.style.display = "none";
});

// show intervention questions when "show-questions-btn" is clicked
showQuestionsBtn.addEventListener("click", function() {
    interventionQuestions.style.display = "flex";
    showQuestionsBtn.style.display = "none";
});

// get user answers to intervention questions and recommend appropriate surgery
const recommendBtn = document.getElementById("recommend-btn");

recommendBtn.addEventListener("click", function() {
    
    // get user answers to questions
    previousSurgery = document.getElementById("previous-surgery").value;
    diabetes = document.getElementById("diabetes").value;
    hypertension = document.getElementById("hypertension").value;
    
    // hide divs if the user changes an option and presses the button again (so the answers don't stack)
    gastricBypassDiv.style.display = "none";
    gastricSleeveDiv.style.display = "none";
    gastricBandDiv.style.display = "none";

    // determine appropriate intervention based on BMI and answers to questions
    if (bmiValue < 35 && diabetes === "yes" && hypertension === "yes") {
        gastricBypassDiv.style.display = "flex";
    } else if (bmiValue < 35 && (diabetes === "yes" || hypertension === "yes")) {
        gastricSleeveDiv.style.display = "flex";
    } else if (bmiValue < 40 && previousSurgery === "no") {
        gastricBandDiv.style.display = "flex";
    } else if (bmiValue < 40) {
        gastricSleeveDiv.style.display = "flex";
    } else {
        gastricBypassDiv.style.display = "flex";
    }
});

const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", function() {

    // reset input values
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("previous-surgery").value = "";
    document.getElementById("diabetes").value = "";
    document.getElementById("hypertension").value = "";

    // hide all the divs that were displayed based on the person's BMI
    underweightDiv.style.display = "none";
    normalDiv.style.display = "none";
    overweightDiv.style.display = "none";
    obeseDiv.style.display = "none";
    morbidlyObeseDiv.style.display = "none";

    // hide all the intervention divs
    gastricSleeveDiv.style.display = "none";
    gastricBandDiv.style.display = "none";
    gastricBypassDiv.style.display = "none";

    // reset BMI value to null
    bmiValue = null;

    // hide the intervention questions and result divs
    interventionQuestions.style.display = "none";

    // hide show-questions-btn
    showQuestionsBtn.style.display = "none";

    // remove the bmi-result div 
    const containerDiv = document.querySelector(".bmi-result");
    if (containerDiv) {
        result.removeChild(containerDiv);
    }

    // show form again & hide reset-btn after it is clicked
    form.style.display = "flex";
    resetBtn.style.display = "none";
});