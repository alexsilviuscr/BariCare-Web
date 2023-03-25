const form = document.getElementById("bmi-form");
const showQuestionsBtn = document.getElementById("show-questions-btn");
const interventionQuestions = document.getElementById("intervention-questions");

const underweightDiv = document.getElementById("underweight");
const normalDiv = document.getElementById("normal");
const overweightDiv = document.getElementById("overweight");
const obeseDiv = document.getElementById("obese");
const morbidlyObeseDiv = document.getElementById("morbidly-obese");

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
    let weightDiv;

    if (bmiValue < 18.5) weightDiv = underweightDiv;
    else if (bmiValue < 25) weightDiv = normalDiv;
    else if (bmiValue < 30) weightDiv = overweightDiv;
    else if (bmiValue < 40) weightDiv = obeseDiv;
    else weightDiv = morbidlyObeseDiv;

    weightDiv.style.display = "block";
    containerDiv.appendChild(
        document.createElement("p").appendChild(
            document.createTextNode(`Your BMI is ${bmiValue.toFixed(1)}.`)
        )
    );
    containerDiv.appendChild(weightDiv);

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

const interventionsWrap = document.querySelector(".items-wrap");
const [
    itemGastricSleeve,
    itemGastricBypass,
    itemGastricBand
] = interventionsWrap.children;
const recommendInterventionDiv = document.querySelector(".recommendation");

recommendBtn.addEventListener("click", function() {
    // clone the intervention items
    const clonedGSleeve = itemGastricSleeve.cloneNode(true);
    const clonedGBypass = itemGastricBypass.cloneNode(true);
    const clonedGBand = itemGastricBand.cloneNode(true);

    // get user answers to questions
    previousSurgery = document.getElementById("previous-surgery").value;
    diabetes = document.getElementById("diabetes").value;
    hypertension = document.getElementById("hypertension").value;
    
    // clear previous recommendations if button is pressed more than once
    recommendInterventionDiv.innerHTML = '';

    const hasDiabetes = document.getElementById("diabetes").value === "yes";
    const hasHypertension = document.getElementById("hypertension").value === "yes";

    // bmiValues as variables
    const isNormalWeight = bmiValue < 25;
    const isOverweight = bmiValue < 30;
    const isObese = bmiValue < 40;
    const isMorbidlyObese = bmiValue >= 40;
    
    if (isNormalWeight && hasDiabetes && hasHypertension) {
        recommendInterventionDiv.appendChild(clonedGBypass);
      } else if (isNormalWeight && (hasDiabetes || hasHypertension)) {
        recommendInterventionDiv.appendChild(clonedGSleeve);
      } else if (isOverweight && !previousSurgery) {
        recommendInterventionDiv.appendChild(clonedGBand);
      } else if (isOverweight) {
        recommendInterventionDiv.appendChild(clonedGSleeve);
      } else {
        recommendInterventionDiv.appendChild(clonedGBypass);
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
    recommendInterventionDiv.innerHTML = "";

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