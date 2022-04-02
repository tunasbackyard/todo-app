"use strict";

const DOM = {
  getElements() {
    this.inputForm = document.querySelector(".user-input input");
    this.inputIcon = document.querySelector(".user-input i");
    this.noItemAlert = document.querySelector(".no-item");
    this.containers = document.querySelectorAll(".container");
    this.taskList = document.querySelector(".todo-list");
    this.linkList = document.querySelector(".sections ul");
    this.links = document.querySelectorAll(".link");
  },
};

const todoList = [];
const completedList = [];
let taskIndex = 0;

DOM.getElements();

DOM.inputIcon.addEventListener("click", function () {
  const taskInput = getUserInput(DOM.inputForm);
  if (checkUserInput(taskInput)) {
    addToList(todoList, getUserInput(DOM.inputForm));
    const taskItem = createTaskItem(DOM.taskList);
    setItemText(taskItem, todoList[taskItem.dataset.index]);
    removeClass(DOM.taskList, "hidden");
    addClass(DOM.noItemAlert, "hidden");
    clearInputArea();
    DOM.checkBox = document.querySelector("#checkbox");
    DOM.checkBox.addEventListener("click", function (e) {
      const checkedElement = e.target.parentElement;
      addToList(completedList, checkedElement);
      removeElement(DOM.taskList, checkedElement);
      removeClass(DOM.noItemAlert, "hidden");
    });
  } else {
    handleInputFail(DOM.inputForm);
  }
});

DOM.linkList.addEventListener("click", function (e) {
  e.preventDefault();
  if (!checkClass(e.target, "link")) return;
  DOM.links.forEach((link) => {
    removeClass(link, "link--active");
  });
  addClass(e.target, "link--active");
  const id = e.target.dataset.id;
  DOM.containers.forEach((container) => {
    addClass(container, "hidden");
    if (container.dataset.selector === id) {
      removeClass(container, "hidden");
    }
  });
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

function setItemText(element, string) {
  [...element.children].forEach((child) => {
    if (child.tagName === "SPAN") {
      child.textContent = string;
    }
  });
}

function clearInputArea() {
  DOM.inputForm.value = "";
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
  input.setAttribute("id", "checkbox");
  const task = document.createElement("span");
  const menu = document.createElement("i");
  addClass(menu, "fa-solid");
  addClass(menu, "fa-ellipsis-vertical");
  item.appendChild(input);
  item.appendChild(task);
  item.appendChild(menu);
  return parent.appendChild(item);
}

function removeElement(parent, element) {
  parent.removeChild(element);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleInputFail(element) {
  element.setAttribute("placeholder", "task cannot be empty");
  addClass(element.parentElement, "failed");
  removeFailedState();
}

async function removeFailedState() {
  await sleep(700);
  removeClass(DOM.inputForm.parentElement, "failed");
  DOM.inputForm.setAttribute("placeholder", "max 20 character");
}
