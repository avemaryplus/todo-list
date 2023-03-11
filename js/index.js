const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const inProgressList = document.getElementById("in-progress-list");
const doneList = document.getElementById("done-list");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  if (input.value !== "") {
    todos.push({text: input.value, status: "new"});
    input.value = "";
  } else {
    alert ('Для начала введите что-нибудь!');
  }
};

