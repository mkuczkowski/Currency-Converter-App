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

convertBtn.addEventListener("click", () => convertCurrency("latest"));
dateUpdateBtn.addEventListener("click", () => convertCurrency(dateInput.value));

async function convertCurrency(date) {
    if(valueToConvert !== null && valueToConvert !== NaN) {
        show(loadingSpinner);
        getCurrency(date)
        .then(data => {
            while(resultsList.firstChild) {
                resultsList.removeChild(resultsList.firstChild);
            }
            show(results);
            currencyDate.innerHTML = data.date;
            dateInput.value = data.date;
            console.log(dateInput.value);
            for(let value in data.rates) {
                if(data.rates.hasOwnProperty(value)) {
                    const listViewItem = document.createElement('li');
                    listViewItem.className = "list-group-item";
                    listViewItem.appendChild(document.createTextNode(value + ": " + data.rates[value] * valueToConvert));
                    resultsList.appendChild(listViewItem);
                }
            }
            hide(loadingSpinner);
        });
    }
}

async function getCurrency(date) {
    let response = await fetch(url.concat(date + "?base=" + baseCurrency));
    let data = await response.json();
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