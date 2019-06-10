const url = "https://api.exchangeratesapi.io/";
let baseCurrency = "PLN";
let valueToConvert = null;

const currencyDate = document.getElementById("currency-date");
const loadingSpinner = document.querySelector(".spinner-border");
const results = document.querySelector(".results");
const inputValue = document.getElementById("input-value");
const resultsList = document.querySelector(".list-group");
const convertBtn = document.getElementById("convert");
const dateInput = document.getElementById("date-input");
const dateUpdateBtn = document.getElementById("update-date");

hide(loadingSpinner);
hide(results);

inputValue.addEventListener("keyup", (event) => {
    valueToConvert = event.target.value;
});

inputValue.addEventListener("input", (event) => {
    valueToConvert = event.target.value;
});

convertBtn.addEventListener("click", () => {
    const date = !dateInput.value ? "latest" : dateInput.value;
    convertCurrency(date)
});

dateUpdateBtn.addEventListener("click", () => {
    const date = !dateInput.value ? "latest" : dateInput.value;
    convertCurrency(date)
});

async function convertCurrency(date) {
    if(valueToConvert !== null && valueToConvert !== "" && !isNaN(valueToConvert)) {
        show(loadingSpinner);
        getCurrency(date)
        .then(data => {
            while(resultsList.firstChild) {
                resultsList.removeChild(resultsList.firstChild);
            }
            show(results);
            currencyDate.innerHTML = data.date;
            dateInput.value = data.date;
            listAllElements(data.rates);
            hide(loadingSpinner);
        });
    }
}

async function getCurrency(date) {
    const response = await fetch(url.concat(date + "?base=" + baseCurrency));
    const data = await response.json();
    return data;
}

function updateBaseCurrency(select) {
    baseCurrency = select.options[select.selectedIndex].text;
}

function show(element) {
    element.style.visibility = "visible";
}

function hide(element) {
    element.style.visibility = "hidden";
}

function listAllElements(object) {
    for(let value in object) {
        if(object.hasOwnProperty(value)) {
            const listItem = document.createElement('li');
            listItem.className = "list-group-item";
            listItem.appendChild(document.createTextNode(value + ": " + object[value] * valueToConvert));
            resultsList.appendChild(listItem);
        }
    }
}