const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

const STORAGE_KEY = "todos_data";

let todos = loadFromLocalStorage();

function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : [
        { id: 1, text: "Вивчити HTML", checked: true },
        { id: 2, text: "Вивчити CSS", checked: true },
        { id: 3, text: "Вивчити JavaScript", checked: false },
      ];
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="check-${todo.id}" 
        ${todo.checked ? "checked" : ""} 
        onchange="checkTodo(${todo.id})"
      />
      <label for="check-${todo.id}">
        <span class="${todo.checked ? "text-success text-decoration-line-through" : ""}">
          ${todo.text}
        </span>
      </label>
      <button 
        class="btn btn-danger btn-sm float-end" 
        onclick="deleteTodo(${todo.id})"
      >
        delete
      </button>
    </li>
  `;
}

function render() {
  const htmlRows = todos.map((todo) => renderTodo(todo));
  list.innerHTML = htmlRows.join("");
  updateCounter();
  saveToLocalStorage();
}

function updateCounter() {
  const total = todos.length;

  const unchecked = todos.filter((todo) => !todo.checked).length;

  itemCountSpan.textContent = total;
  uncheckedCountSpan.textContent = unchecked;
}

function newTodo() {
  const text = prompt("Що потрібно зробити?");

  if (text && text.trim() !== "") {
    const newTodoObj = {
      id: Date.now(),
      text: text.trim(),
      checked: false,
    };

    todos.push(newTodoObj);
    console.log("Поточний масив справ:", todos);
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

function checkTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });
  render();
}

render();
