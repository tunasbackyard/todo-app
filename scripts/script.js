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
let taskIndex = 0;

DOM.getElements();

DOM.inputIcon.addEventListener("click", function () {
  const taskInput = getUserInput(DOM.inputForm);
  if (checkUserInput(taskInput)) {
    addToList(todoList, getUserInput(DOM.inputForm));
    const taskItem = createTaskItem(DOM.taskList);
    taskItem.children[1].textContent = todoList[taskItem.dataset.index];
    removeClass(DOM.taskList, "hidden");
    addClass(DOM.noItemAlert, "hidden");
  } else {
    DOM.inputForm.setAttribute("placeholder", "task cannot be empty");
    addClass(DOM.inputForm.parentElement, "failed");
    removeFailedState();
  }
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

function checkUserInput(input) {
  if (input) return true;
  return false;
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
  item.setAttribute("data-index", taskIndex++);
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  const task = document.createElement("span");
  const menu = document.createElement("i");
  addClass(menu, "fa-solid");
  addClass(menu, "fa-ellipsis-vertical");
  item.appendChild(input);
  item.appendChild(task);
  item.appendChild(menu);
  return parent.appendChild(item);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function removeFailedState() {
  await sleep(700);
  removeClass(DOM.inputForm.parentElement, "failed");
  DOM.inputForm.setAttribute("placeholder", "max 20 character");
}
