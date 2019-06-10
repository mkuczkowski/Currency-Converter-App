const url = "https://api.exchangeratesapi.io/latest?base=";
let baseCurrency = "PLN";
let endpoint = url.concat("?base=" + baseCurrency);
let valueToConvert = null;

const currencyDate = document.getElementById("currency-date");
document.querySelector(".results").style.visibility = "hidden";

const inputValue = document.getElementById("input-value");
inputValue.addEventListener("keyup", (event) => {
    valueToConvert = event.target.value;
});

inputValue.addEventListener("input", (event) => {
    valueToConvert = event.target.value;
});

const convertBtn = document.getElementById("convert");
convertBtn.addEventListener("click", async () => {
    if(valueToConvert !== null && valueToConvert !== NaN) {
        getCurrency()
        .then(data => {
            const resultsList = document.querySelector(".list-group");
            while(resultsList.firstChild) {
                resultsList.removeChild(resultsList.firstChild);
            }
            document.querySelector(".results").style.visibility = "visible";
            currencyDate.innerHTML = data.date;
            for(let value in data.rates) {
                if(data.rates.hasOwnProperty(value)) {
                    const listViewItem = document.createElement('li');
                    listViewItem.className = "list-group-item";
                    listViewItem.appendChild(document.createTextNode(value + ": " + data.rates[value] * valueToConvert));
                    resultsList.appendChild(listViewItem);
                }
            }
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