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
    saveTodos();
    createTodos();
    input.value = "";
  } else {
    alert ('Для начала введите что-нибудь!');
  }
};

function createTodos() {
  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerText = todo.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      createTodos();
    });
    switch (todo.status) {
      case "new":
        const inProgressBtn = document.createElement("button");
        inProgressBtn.innerText = "In Progress >";
        inProgressBtn.addEventListener("click", () => {
          todos[index].status = "inProgress";
          saveTodos();
          createTodos();
        });
        li.append(inProgressBtn);
        li.append(deleteBtn);
        todoList.append(li);
        break;
      case "inProgress":
        const doneBtn = document.createElement("button");
        doneBtn.innerText = "Done >";
        doneBtn.addEventListener("click", () => {
          todos[index].status = "done";
          saveTodos();
          createTodos();
        });
        li.append(doneBtn);
        li.append(deleteBtn);
        inProgressList.appendChild(li);
        break;
      case "done":
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.remove('deleteBtn')
        li.append(deleteBtn);
        doneList.append(li);
        break;
      default:
        break;
    }
  });
}


addBtn.addEventListener("click", addTodo);

createTodos();