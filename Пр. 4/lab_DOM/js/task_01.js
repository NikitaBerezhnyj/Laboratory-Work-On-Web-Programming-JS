const categories = document.querySelectorAll(".item");

console.log(`Кількість категорій: ${categories.length}`);

categories.forEach((category) => {
  const title = category.querySelector("h2").textContent;

  const items = category.querySelectorAll("ul li");

  console.log(`Категорія: ${title}`);
  console.log(`Кількість елементів: ${items.length}`);
});
