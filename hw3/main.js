//********************************************************************************************************** */

let totalNumber = 0;
let completedNumber = 0;
let todoTotal = document.getElementById("todo-total");
todoTotal.innerText = `${totalNumber - completedNumber.toString()} left`;
let footer = document.getElementById("todo-footer");

let tasker = {
  construct: function () {
    tasker.selectElements();
    tasker.bindEvents();
    this.scanTodoList();
  },
  selectElements: function () {
    this.inputTag = document.getElementById("todo-input");
    this.todoList = document.getElementById("todo-list");
    this.todoListChildren = this.todoList.children;
  },

  // Build a todo task
  buildTodo: function () {
    let todoItem = document.createElement("li");
    todoItem.setAttribute("class", "todo-app_item");
    //checkbox
    let checkBoxDiv = document.createElement("div");
    checkBoxDiv.setAttribute("class", "todo-app_checkbox");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", `${totalNumber.toString()}`);
    let label = document.createElement("label");
    label.setAttribute("for", `${totalNumber.toString()}`);
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.appendChild(label);
    //input value
    let inputValue = document.createElement("h1");
    inputValue.setAttribute("class", "todo-app_item-detail");
    inputValue.innerHTML = this.inputTag.value;
    //delete btn
    let deleteX = document.createElement("img");
    deleteX.setAttribute("src", "./img/x.png");
    deleteX.setAttribute("class", "todo-app_item-x");
    deleteX.onclick = this.deleteTodos.bind(this);
    // deleteX.setAttribute("onclick", "deleteTodos(this);");

    //Append all
    todoItem.appendChild(checkBoxDiv);
    todoItem.appendChild(inputValue);
    todoItem.appendChild(deleteX);

    this.todoList.appendChild(todoItem);
  },

  // add the todo
  addTodo: function (event) {
    let inputValue = this.inputTag.value;
    if (inputValue === "") {
      alert("you must write sth!");
    } else {
      totalIndex = totalNumber + 1;
      this.buildTodo();
      this.inputTag.value = "";
      totalNumber = totalNumber + 1;
      this.scanTodoList();
    }
  },
  // press enter to add the todo
  enterKey: function (event) {
    if (event.which === 13) {
      this.addTodo();
    }
  },
  bindEvents: function () {
    this.inputTag.onkeypress = this.enterKey.bind(this);
  },

  // //Scan the todo list
  scanTodoList: function () {
    let todoItem, deleteX, checkBox;
    for (i = 0; i < totalNumber; i++) {
      todoItem = this.todoListChildren[i];
      checkBox = todoItem.firstElementChild.firstElementChild;
      deleteX = todoItem.lastElementChild;
      // //bind onclick event

      checkBox.onclick = this.completeTodos.bind(this, todoItem, checkBox);
      deleteX.onclick = this.deleteTodos.bind(this, i, checkBox);
    }
    if (totalNumber === 0) {
      footer.style["opacity"] = 0;
    } else {
      footer.style["opacity"] = 1;
    }

    todoTotal.innerText = `${(totalNumber - completedNumber).toString()} left`;
  },

  completeTodos: function (todoItem, checkBox) {
    todoItem.style["textDecoration"] = checkBox.checked ? "line-through" : "";
    todoItem.style["opacity"] = checkBox.checked ? 0.5 : 1;
    completedNumber = checkBox.checked
      ? completedNumber + 1
      : completedNumber - 1;
    this.scanTodoList();
  },

  deleteTodos: function (i, checkBox) {
    // todoItem.style.display = "none";
    this.todoListChildren[totalNumber - 1].remove();
    this.changeIndex(i);
    if (!checkBox.checked) {
      totalNumber = totalNumber - 1;
    }
    // completedNumber = checkBox.checked ? completedNumber - 1 : completedNumber;
    this.scanTodoList();
  },

  changeIndex: function (index) {
    // this.todoListChildren[totalNumber - 1] = this.todoListChildren[index];
    for (i = index; i < totalNumber - 1; i++) {
      this.todoListChildren[i] = this.todoListChildren[i + 1];
    }
  },
};

// function deleteTodos() {}
