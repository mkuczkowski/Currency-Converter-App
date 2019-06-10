const url = "https://api.exchangeratesapi.io/latest?base=";
let baseCurrency = "PLN";
let valueToConvert = null;

const currencyDate = document.getElementById("currency-date");
const loadingSpinner = document.querySelector(".spinner-border");
const results = document.querySelector(".results");
const inputValue = document.getElementById("input-value");
const resultsList = document.querySelector(".list-group");
const convertBtn = document.getElementById("convert");

hide(loadingSpinner);
hide(results);

inputValue.addEventListener("keyup", (event) => {
    valueToConvert = event.target.value;
});

inputValue.addEventListener("input", (event) => {
    valueToConvert = event.target.value;
});

convertBtn.addEventListener("click", async () => {
    if(valueToConvert !== null && valueToConvert !== NaN) {
        show(loadingSpinner);
        getCurrency()
        .then(data => {
            while(resultsList.firstChild) {
                resultsList.removeChild(resultsList.firstChild);
            }
            show(results);
            currencyDate.innerHTML = data.date;
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
});

async function getCurrency() {
    let response = await fetch(url.concat(baseCurrency));
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