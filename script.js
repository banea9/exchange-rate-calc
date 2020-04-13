const rateEl = document.getElementsByClassName("rate")[0];
const swapBtn = document.getElementById("rate");
const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

function swap() {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculate();
}

swapBtn.addEventListener("click", swap);

function calculate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.value}`)
    .then(resp => resp.json())
    .then(data => {
      const rate = data.rates[currencyTwo.value];
      amountTwo.value = (rate * +amountOne.value).toFixed(2);

      rateEl.textContent = `1 ${currencyOne.value} = ${rate} ${currencyTwo.value}`;
    });
}

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swapBtn.addEventListener("click", swap);
