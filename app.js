const url = "https://api.exchangeratesapi.io/latest";
let baseCurrency = "PLN";
let endpoint = url.concat("?base=" + baseCurrency);
let valueToConvert = null;

const currencyDate = document.getElementById("currency-date");
document.querySelector(".results").style.visibility = "hidden";

const inputValue = document.getElementById("input-value");
inputValue.addEventListener("keyup", (event) => {
    valueToConvert = event.target.value;
    console.log(valueToConvert);
})

const convertBtn = document.getElementById("convert");
convertBtn.addEventListener("click", async () => {
    if(valueToConvert !== null || valueToConvert === NaN) {
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
                    console.log(value + ": " + data.rates[value] * valueToConvert);
                }
            }
        });
    }
});


async function getCurrency() {
    let response = await fetch(endpoint);
    let data = await response.json();
    return data;
}