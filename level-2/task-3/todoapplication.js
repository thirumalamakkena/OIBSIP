let todoItemsContainerEle = document.getElementById("todoItemsContainer");
let saveButtonEle = document.getElementById("saveButton");

let getTodoListFromLocalStrorage = () => {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
};

let todoList = getTodoListFromLocalStrorage();
let todoCount = todoList.length;

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
}

function onAddTodo() {
  let userTitleInputElement = document.getElementById("title-input");
  let userDescriptionInputElement = document.getElementById(
    "description-input"
  );

  let userTitleInputValue = userTitleInputElement.value;
  let userDescriptionInputvalue = userDescriptionInputElement.value;

  if (userTitleInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    title: userTitleInputValue,
    description: userDescriptionInputValue,
    uniqueNo: todosCount,
    isChecked: false,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userTitleInputElement.value = "";
  userDescriptionInputElement.value = "";
}

saveButtonEle.onclick = function () {
  onAddTodo();
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
