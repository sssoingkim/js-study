const formTodo = document.querySelector(".form_todo")
const inputTodo = document.querySelector("#input-todo");
const todoList = document.querySelector(".todo_list");

//삭제
const deleteTodo = (e) => {
  e.currentTarget.parentNode.remove();
}

//추가
const addTodos = (item) => {
  const todoId = Date.now();

  const li = document.createElement("li");

  const label = document.createElement("label");
  label.setAttribute("for", todoId);
  label.classList.add("label_checkbox");
  label.innerText = item;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = todoId;
  checkbox.classList.add("input_checkbox");

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("btn_delete");
  button.innerText = "✕";
  button.addEventListener("click", deleteTodo);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);
  todoList.appendChild(li).classList.add("list_item");
}

const onSubmitTodo = (e) => {
  e.preventDefault();

  const newItem = inputTodo.value;
  inputTodo.value = "";
  
  addTodos(newItem);
}

formTodo.addEventListener("submit", onSubmitTodo);