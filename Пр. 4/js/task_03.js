import { breeds } from "./data_sample.js";

const list = document.querySelector("#breeds");

const items = breeds.map((breed) => {
  const li = document.createElement("li");
  li.classList.add("card");

  const img = document.createElement("img");
  img.src = `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
  img.alt = breed.name;

  const title = document.createElement("h2");
  title.textContent = breed.name;

  const group = document.createElement("p");
  group.classList.add("group");
  group.textContent = breed.breed_group || "";

  const bredFor = document.createElement("p");
  bredFor.classList.add("group");
  bredFor.textContent = breed.bred_for || "";

  const temperament = document.createElement("p");
  temperament.textContent = breed.temperament || "";

  const weight = document.createElement("p");
  weight.innerHTML = `Weight: <span>${breed.weight.metric} kg</span>`;

  li.append(img, title, group, bredFor, temperament, weight);

  return li;
});

list.append(...items);
