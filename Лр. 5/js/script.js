import { breeds } from "./data_full.js";

const list = document.querySelector("#breeds");
const sortSelect = document.querySelector("#sort");
const groupSelect = document.querySelector("#groupFilter");
const weightMinInput = document.querySelector("#weightMin");
const weightMaxInput = document.querySelector("#weightMax");
const searchInput = document.querySelector("#search");

let currentSort = "name";

let filters = {
  group: "",
  weightMin: null,
  weightMax: null,
};

let searchQuery = "";

function getAverage(value) {
  if (!value) return 0;

  const numbers = value.match(/\d+/g);
  if (!numbers) return 0;

  const nums = numbers.map(Number);
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function initGroups() {
  const groups = [...new Set(breeds.map((b) => b.breed_group).filter(Boolean))];

  const options = groups
    .map((group) => `<option value="${group}">${group}</option>`)
    .join("");

  groupSelect.insertAdjacentHTML("beforeend", options);
}

function sortData(data, type) {
  const sorted = [...data];

  switch (type) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "weight":
      return sorted.sort((a, b) => {
        const diff = getAverage(a.weight.metric) - getAverage(b.weight.metric);

        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });

    case "height":
      return sorted.sort((a, b) => {
        const diff = getAverage(a.height.metric) - getAverage(b.height.metric);

        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });

    case "life":
      return sorted.sort((a, b) => {
        const diff = getAverage(a.life_span) - getAverage(b.life_span);

        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });

    default:
      return sorted;
  }
}

function filterData(data) {
  return data.filter((breed) => {
    if (filters.group && breed.breed_group !== filters.group) {
      return false;
    }

    const weight = getAverage(breed.weight.metric);

    if (filters.weightMin !== null && weight < filters.weightMin) {
      return false;
    }

    if (filters.weightMax !== null && weight > filters.weightMax) {
      return false;
    }

    return true;
  });
}

function searchData(data) {
  if (!searchQuery) return data;

  const query = searchQuery.toLowerCase();

  return data.filter((breed) => {
    const name = breed.name.toLowerCase();
    const temperament = (breed.temperament || "").toLowerCase();

    return name.includes(query) || temperament.includes(query);
  });
}

function render(data) {
  const markup = data
    .map((breed) => {
      return `
        <li class="card">
          <img src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg" alt="${breed.name}">
          <h2>${breed.name}</h2>
          <p class="group">${breed.breed_group || ""}</p>
          <p class="group">${breed.bred_for || ""}</p>
          <p>${breed.temperament || ""}</p>
          <p>Weight: <span>${breed.weight.metric} kg</span></p>
        </li>
      `;
    })
    .join("");

  list.innerHTML = markup;
}

function updateView() {
  let result = [...breeds];

  result = searchData(result);
  result = filterData(result);
  result = sortData(result, currentSort);

  render(result);
}

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  updateView();
});

groupSelect.addEventListener("change", (e) => {
  filters.group = e.target.value;
  updateView();
});

weightMinInput.addEventListener("input", (e) => {
  filters.weightMin = e.target.value ? Number(e.target.value) : null;
  updateView();
});

weightMaxInput.addEventListener("input", (e) => {
  filters.weightMax = e.target.value ? Number(e.target.value) : null;
  updateView();
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  updateView();
});

initGroups();
updateView();
