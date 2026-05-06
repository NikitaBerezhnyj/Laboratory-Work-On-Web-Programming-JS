const listItems = document.querySelectorAll("li");

listItems.forEach((li) => {
  const nestedList = li.querySelector("ul");

  if (nestedList) {
    const count = nestedList.querySelectorAll("li").length;

    const titleEl = li.querySelector("h2");

    if (titleEl) {
      titleEl.textContent = `${titleEl.textContent} [${count}]`;
    }
  }
});
