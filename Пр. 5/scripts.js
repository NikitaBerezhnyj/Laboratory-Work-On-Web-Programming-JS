function changeValue(id, delta) {
  const el = document.getElementById(id);
  let value = parseInt(el.dataset.value);

  value += delta;

  if (id === "temp") {
    value = Math.max(-50, Math.min(50, value));
  }
  if (id === "fan") {
    value = Math.max(0, Math.min(10, value));
  }
  if (id === "humidity") {
    value = Math.max(0, Math.min(100, value));
  }

  el.dataset.value = value;
  renderValue(id);
}

function renderValue(id) {
  const el = document.getElementById(id);
  const value = el.dataset.value;

  if (id === "temp") {
    el.textContent = `${value}°C`;
  } else if (id === "humidity") {
    el.textContent = `${value}%`;
  } else {
    el.textContent = value;
  }
}

document.querySelectorAll(".value").forEach((el) => {
  el.dataset.value = el.textContent;
  renderValue(el.id);
});
