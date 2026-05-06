const API_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

let currencies = [];

document.getElementById("current-date").textContent =
  new Date().toLocaleDateString("uk-UA");

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    currencies = data;
    renderCurrencies(data);
    fillSelects(data);
  })
  .catch((err) => console.error(err));

function renderCurrencies(data) {
  const list = document.getElementById("currency-list");
  list.innerHTML = "";

  data.forEach((cur) => {
    const li = document.createElement("li");
    li.textContent = `${cur.cc} - ${cur.txt}: ${cur.rate.toFixed(2)} грн`;
    list.appendChild(li);
  });
}

function fillSelects(data) {
  const select1 = document.getElementById("currency-foreign");
  const select2 = document.getElementById("currency-uah");

  select1.innerHTML = '<option value="">Оберіть валюту</option>';
  select2.innerHTML = '<option value="">Оберіть валюту</option>';

  data.forEach((cur) => {
    const option1 = document.createElement("option");
    option1.value = cur.cc;
    option1.textContent = `${cur.cc} - ${cur.txt}`;

    const option2 = option1.cloneNode(true);

    select1.appendChild(option1);
    select2.appendChild(option2);
  });

  select1.value = "USD";
  select2.value = "USD";
}

function getRate(code) {
  const currency = currencies.find((c) => c.cc === code);
  return currency ? currency.rate : null;
}

const amountForeign = document.getElementById("amount-foreign");
const currencyForeign = document.getElementById("currency-foreign");
const amountUAH = document.getElementById("amount-uah");

function convertToUAH() {
  const amount = parseFloat(amountForeign.value);
  const rate = getRate(currencyForeign.value);

  if (isNaN(amount) || !rate) {
    amountUAH.value = "";
    return;
  }

  amountUAH.value = (amount * rate).toFixed(2);
}

amountForeign.addEventListener("input", convertToUAH);
currencyForeign.addEventListener("input", convertToUAH);

const amountUAHInput = document.getElementById("amount-uah-input");
const currencyUAH = document.getElementById("currency-uah");
const amountForeignResult = document.getElementById("amount-foreign-result");

function convertFromUAH() {
  const amount = parseFloat(amountUAHInput.value);
  const rate = getRate(currencyUAH.value);

  if (isNaN(amount) || !rate) {
    amountForeignResult.value = "";
    return;
  }

  amountForeignResult.value = (amount / rate).toFixed(2);
}

amountUAHInput.addEventListener("input", convertFromUAH);
currencyUAH.addEventListener("input", convertFromUAH);

currencyForeign.addEventListener("change", convertToUAH);
currencyUAH.addEventListener("change", convertFromUAH);
