"use strict";

const DOM = {
  getElements() {
    this.inputForm = document.querySelector(".user-input input");
    this.inputIcon = document.querySelector(".user-input i");
    this.noItemAlert = document.querySelector(".no-item");
    this.taskList = document.querySelector(".todo-list");
  },
};

const todoList = [];

DOM.getElements();

DOM.inputIcon.addEventListener("click", function () {
  addToList(todoList, getUserInput(DOM.inputForm));
  removeClass(DOM.taskList, "hidden");
  addClass(DOM.noItemAlert, "hidden");
  createTaskItem(DOM.taskList).children[1].textContent =
    todoList[todoList.length - 1];
});

function addClass(element, className) {
  if (checkClass(element, className)) return;
  element.classList.add(className);
}

function removeClass(element, className) {
  if (!checkClass(element, className)) return;
  element.classList.remove(className);
}

function checkClass(element, className) {
  return element.classList.contains(className);
}

function getUserInput(form) {
  return form.value;
}

function addToList(list, element) {
  list.push(element);
}

function removeFromList(list, element, index) {}

function createTaskItem(parent) {
  const item = document.createElement("li");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  const task = document.createElement("span");
  const menu = document.createElement("i");
  addClass(menu, "fa-solid");
  addClass(menu, "fa-ellipsis-vertical");
  item.appendChild(input);
  item.appendChild(task);
  item.appendChild(menu);
  // parent.appendChild(item);
  return parent.appendChild(item);
}
