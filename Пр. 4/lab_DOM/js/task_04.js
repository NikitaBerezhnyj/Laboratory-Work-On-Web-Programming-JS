import { breeds } from "./data_sample.js";

const list = document.querySelector("#breeds");

const markup = breeds
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

list.insertAdjacentHTML("beforeend", markup);
