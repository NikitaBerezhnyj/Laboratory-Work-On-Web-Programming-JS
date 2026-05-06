const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

const BASE_URL =
  "https://laboratory-web-programming-js-default-rtdb.europe-west1.firebasedatabase.app/todos";
const JSON_URL = `${BASE_URL}.json`;

let todos = [];

const loadingSpinner = document.createElement("div");
loadingSpinner.innerHTML = `<div class="text-center my-3" id="loader">
    <div class="spinner-border text-primary" role="status"></div>
    <p>Завантаження...</p>
</div>`;

const errorMessage = document.createElement("div");
errorMessage.className = "alert alert-danger d-none";
errorMessage.id = "error-msg";

document.querySelector(".container").insertBefore(errorMessage, list);
document.querySelector(".container").insertBefore(loadingSpinner, list);

function toggleLoader(show) {
  loadingSpinner.style.display = show ? "block" : "none";
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove("d-none");
  setTimeout(() => errorMessage.classList.add("d-none"), 3000);
}

async function fetchTodos() {
  toggleLoader(true);
  try {
    const response = await fetch(JSON_URL);
    const data = await response.json();

    if (data) {
      todos = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } else {
      todos = [];
    }
    render();
  } catch (error) {
    showError("Помилка завантаження даних з сервера.");
  } finally {
    toggleLoader(false);
  }
}

async function addTodo(todoText) {
  const newTodoData = {
    text: todoText,
    checked: false,
  };

  try {
    const response = await fetch(JSON_URL, {
      method: "POST",
      body: JSON.stringify(newTodoData),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    todos.push({ id: result.name, ...newTodoData });
    render();
  } catch (error) {
    showError("Не вдалося зберегти справу.");
  }
}

async function deleteTodoFromDB(id) {
  try {
    await fetch(`${BASE_URL}/${id}.json`, { method: "DELETE" });
    todos = todos.filter((t) => t.id !== id);
    render();
  } catch (error) {
    showError("Не вдалося видалити справу.");
  }
}

async function updateTodoInDB(id, checkedStatus) {
  try {
    await fetch(`${BASE_URL}/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ checked: checkedStatus }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    showError("Не вдалося оновити статус.");
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="check-${todo.id}" 
        ${todo.checked ? "checked" : ""} 
        onchange="checkTodo('${todo.id}')"
      />
      <label for="check-${todo.id}">
        <span class="${todo.checked ? "text-success text-decoration-line-through" : ""}">
          ${todo.text}
        </span>
      </label>
      <button 
        class="btn btn-danger btn-sm float-end" 
        onclick="deleteTodo('${todo.id}')"
      >
        delete
      </button>
    </li>
  `;
}

function render() {
  list.innerHTML = todos.map((t) => renderTodo(t)).join("");
  updateCounter();
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter((t) => !t.checked).length;
}

function newTodo() {
  const text = prompt("Що потрібно зробити?");
  if (text && text.trim() !== "") {
    addTodo(text.trim());
  }
}

function deleteTodo(id) {
  deleteTodoFromDB(id);
}

function checkTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    updateTodoInDB(id, todo.checked);
    render();
  }
}

fetchTodos();
