"use strict";

const DOM = {
  getElements() {
    this.sectionBox = document.querySelector(".box");
    this.inputBox = document.querySelector(".box__input");
    this.addTodoButtonBox = document.querySelector(".box__icon");
    this.listNav = document.querySelector(".nav__list");
    this.itemsNav = document.querySelectorAll(".nav__item");
    this.containerTabs = document.querySelectorAll(".container");
    this.alertDialogs = document.querySelectorAll(".container__alert-box");
  },
};

const ARRAYS = {
  all: [],
  completed: [],
  deleted: [],
};

const BOX_FAIL_MODIFIER = "box--fail";
const ACTIVE_LINK_MODIFIER = "link--active";
const ACTIVE_LIST_MODIFIER = "list--active";
const ACTIVE_CONTAINER_MODIFIER = "container--active";
const HIDDEN_ALERT_MODIFIER = "alert--hidden";
const NAV_LINK_CLASS = "nav__link";
const NAV_ITEM_CLASS = "nav__item";
const NAV_ICON_CLASS = "nav__icon";

DOM.getElements();

DOM.addTodoButtonBox.addEventListener("click", function () {
  todoCreationHandler(DOM.sectionBox, DOM.inputBox);
});

DOM.listNav.addEventListener("click", function (e) {
  e.preventDefault();
  const clickedElement = e.target;
  if (isNavItemParent(clickedElement)) {
    activeLinkAnimationHandler(clickedElement);
    activeContainerHandler(getElementParent(clickedElement));
    alertDialogHandler({
      activeContainerID: getActiveContainer().id,
      isArrayEmpty: isEmptyArray(ARRAYS[getActiveContainer().id]),
    });
  }
});

function todoCreationHandler(elementBox, inputForm) {
  if (isInputEmpty(inputForm)) inputFailAnimationHandler(elementBox);
  else {
    // add todo to the list
  }
}

async function inputFailAnimationHandler(elementBox) {
  addClass(elementBox, BOX_FAIL_MODIFIER);
  await sleep(700);
  removeClass(elementBox, BOX_FAIL_MODIFIER);
}

function activeLinkAnimationHandler(element) {
  DOM.itemsNav.forEach((item) => {
    removeClass(item, ACTIVE_LINK_MODIFIER);
  });
  addClass(getElementParent(element), ACTIVE_LINK_MODIFIER);
}

function activeContainerHandler(navItem) {
  const activeContainer = getLinkedContainerByID(getLinkedContainerID(navItem));

  DOM.containerTabs.forEach((container) => {
    removeClass(container, ACTIVE_CONTAINER_MODIFIER);
  });
  addClass(activeContainer, ACTIVE_CONTAINER_MODIFIER);
}

function alertDialogHandler(arg) {
  if (arg.isArrayEmpty) {
    DOM.alertDialogs.forEach((alert) => {
      if (arg.activeContainerID == getLinkedContainerID(alert)) {
        removeClass(alert, HIDDEN_ALERT_MODIFIER);
      }
    });
  } else {
    DOM.alertDialogs.forEach((alert) => {
      if (arg.activeContainerID == getLinkedContainerID(alert)) {
        addClass(alert, HIDDEN_ALERT_MODIFIER);
      }
    });
  }
}

function isEmptyArray(array) {
  return !array.length;
}

function isInputEmpty(inputForm) {
  if (inputForm.value) return false;
  return true;
}

function isNavItemParent(element) {
  if (
    checkClass(element, NAV_ICON_CLASS) ||
    checkClass(element, NAV_LINK_CLASS)
  )
    return true;

  return false;
}

function getActiveContainer() {
  let activeContainer;
  DOM.containerTabs.forEach((container) => {
    if (checkClass(container, ACTIVE_CONTAINER_MODIFIER)) {
      activeContainer = container;
    }
  });
  return activeContainer;
}

function getElementParent(element) {
  return element.parentElement;
}

function getLinkedContainerID(element) {
  return element.dataset.linkedContainerId;
}

function getLinkedContainerByID(id) {
  return document.getElementById(id);
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function checkClass(element, className) {
  return element.classList.contains(className);
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// const todoList = [];
// const completedList = [];
// let taskIndex = 0;

// DOM.inputIcon.addEventListener("click", function () {
//   const taskInput = getUserInput(DOM.inputForm);
//   if (checkUserInput(taskInput)) {
//     addToList(todoList, getUserInput(DOM.inputForm));
//     const taskItem = createTaskItem(DOM.taskList);
//     setItemText(taskItem, todoList[taskItem.dataset.index]);
//     removeClass(DOM.taskList, "hidden");
//     addClass(DOM.noItemAlert, "hidden");
//     clearInputArea();
//     DOM.checkBox = document.querySelector("#checkbox");
//     DOM.checkBox.addEventListener("click", function (e) {
//       const checkedElement = e.target.parentElement;
//       addToList(completedList, checkedElement);
//       removeElement(DOM.taskList, taskItem);
//       removeClass(DOM.noItemAlert, "hidden");
//     });
//   } else {
//     handleInputFail(DOM.inputForm);
//   }
// });

// DOM.linkList.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (!checkClass(e.target, "link")) return;
//   DOM.links.forEach((link) => {
//     removeClass(link, "link--active");
//   });
//   addClass(e.target, "link--active");
//   const id = e.target.dataset.id;
//   DOM.containers.forEach((container) => {
//     addClass(container, "hidden");
//     if (container.dataset.selector === id) {
//       removeClass(container, "hidden");
//     }
//   });
// });

// function addClass(element, className) {
//   if (checkClass(element, className)) return;
//   element.classList.add(className);
// }

// function removeClass(element, className) {
//   if (!checkClass(element, className)) return;
//   element.classList.remove(className);
// }

// function checkClass(element, className) {
//   return element.classList.contains(className);
// }

// function checkUserInput(input) {
//   if (input) return true;
//   return false;
// }

// function getUserInput(form) {
//   return form.value;
// }

// function setItemText(element, string) {
//   [...element.children].forEach((child) => {
//     if (child.tagName === "SPAN") {
//       child.textContent = string;
//     }
//   });
// }

// function clearInputArea() {
//   DOM.inputForm.value = "";
// }

// function addToList(list, element) {
//   list.push(element);
// }

// function removeFromList(list, element, index) {}

// function createTaskItem(parent) {
//   const item = document.createElement("li");
//   item.setAttribute("data-index", taskIndex++);
//   const input = document.createElement("input");
//   input.setAttribute("type", "checkbox");
//   input.setAttribute("id", "checkbox");
//   const task = document.createElement("span");
//   const menu = document.createElement("i");
//   addClass(menu, "fa-solid");
//   addClass(menu, "fa-ellipsis-vertical");
//   item.appendChild(input);
//   item.appendChild(task);
//   item.appendChild(menu);
//   return parent.appendChild(item);
// }

// function removeElement(parent, element) {
//   parent.removeChild(element);
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function handleInputFail(element) {
//   element.setAttribute("placeholder", "task cannot be empty");
//   addClass(element.parentElement, "failed");
//   removeFailedState();
// }

// async function removeFailedState() {
//   await sleep(700);
//   removeClass(DOM.inputForm.parentElement, "failed");
//   DOM.inputForm.setAttribute("placeholder", "max 20 character");
// }
