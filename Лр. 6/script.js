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

function getLastDates(days = 7) {
  const dates = [];

  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const formatted =
      d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");

    dates.push(formatted);
  }

  return dates;
}

async function fetchRate(valcode, date) {
  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${valcode}&date=${date}&json`;

  const res = await fetch(url);
  const data = await res.json();

  return data[0];
}

async function loadCurrencyHistory(code) {
  const dates = getLastDates(7);

  try {
    const promises = dates.map((date) => fetchRate(code, date));
    const results = await Promise.all(promises);

    results.sort((a, b) => b.exchangedate.localeCompare(a.exchangedate));

    renderHistory(results, code);
  } catch (err) {
    console.error("Помилка історії:", err);
  }
}

function renderHistory(data, code) {
  const container = document.getElementById("history-output");
  const title = document.getElementById("history-title");

  container.innerHTML = "";
  title.textContent = `Курс ${code} за тиждень`;

  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <span>${item.exchangedate}</span>
      <strong>${item.rate.toFixed(2)} грн</strong>
    `;

    container.appendChild(div);
  });
}

function renderCurrencies(data) {
  const list = document.getElementById("currency-list");
  list.innerHTML = "";

  data.forEach((cur) => {
    const li = document.createElement("li");

    li.textContent = `${cur.cc} - ${cur.txt}: ${cur.rate.toFixed(2)} грн`;

    li.dataset.code = cur.cc;

    list.appendChild(li);
  });
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

document.getElementById("currency-list").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  document.querySelectorAll("#currency-list li").forEach((el) => {
    el.classList.remove("active");
  });

  li.classList.add("active");

  loadCurrencyHistory(li.dataset.code);
});
