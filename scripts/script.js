"use strict";

const DOM = {
  getElements() {
    this.sectionBox = document.querySelector(".box");
    this.inputBox = document.querySelector(".box__input");
    this.addTodoButtonBox = document.querySelector(".box__icon");
    this.listNav = document.querySelector(".nav__list");
    this.itemsNav = document.querySelectorAll(".nav__item");
    this.containerTabs = document.querySelectorAll(".container");
    this.alertDialogsTabs = document.querySelectorAll(".container__alert-box");
    this.containerListsTabs = document.querySelectorAll(".container__list");
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
    alertDialogDisplayHandler({
      activeContainerID: getActiveContainer().id,
      isArrayEmpty: isEmptyArray(ARRAYS[getActiveContainer().id]),
    });
    containerListDisplayHandler({
      activeContainerID: getActiveContainer().id,
      isArrayEmpty: isEmptyArray(ARRAYS[getActiveContainer().id]),
    });
  }
});

function todoCreationHandler(elementBox, inputForm) {
  if (isInputEmpty(inputForm)) inputFailAnimationHandler(elementBox);
  else {
    ARRAYS.all.push(
      createTaskElement(getActiveContainerList("all"), inputForm.value)
    );
    alertDialogDisplayHandler({
      activeContainerID: getActiveContainer().id,
      isArrayEmpty: isEmptyArray(ARRAYS[getActiveContainer().id]),
    });
    containerListDisplayHandler({
      activeContainerID: getActiveContainer().id,
      isArrayEmpty: isEmptyArray(ARRAYS[getActiveContainer().id]),
    });
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

function alertDialogDisplayHandler(arg) {
  if (arg.isArrayEmpty) {
    DOM.alertDialogsTabs.forEach((alert) => {
      if (arg.activeContainerID == getLinkedContainerID(alert)) {
        removeClass(alert, HIDDEN_ALERT_MODIFIER);
      }
    });
  } else {
    DOM.alertDialogsTabs.forEach((alert) => {
      if (arg.activeContainerID == getLinkedContainerID(alert)) {
        addClass(alert, HIDDEN_ALERT_MODIFIER);
      }
    });
  }
}

function containerListDisplayHandler(args) {
  if (!args.isArrayEmpty)
    addClass(
      getActiveContainerList(args.activeContainerID),
      ACTIVE_LIST_MODIFIER
    );
  else
    removeClass(
      getActiveContainerList(args.activeContainerID),
      ACTIVE_LIST_MODIFIER
    );
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

function getActiveContainerList(id) {
  let activeList;
  DOM.containerListsTabs.forEach((list) => {
    if (getLinkedContainerID(list) == id) activeList = list;
  });
  return activeList;
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

let taskIndex = 0;
function createTaskElement(parent, taskText) {
  const item = document.createElement("li");
  item.setAttribute("class", "item");
  const input = document.createElement("input");
  input.setAttribute("class", "item__checkbox");
  const span = document.createElement("span");
  span.setAttribute("class", "item__task");
  span.textContent = taskText;
  const i = document.createElement("i");
  addClass(i, "fa-solid");
  addClass(i, "fa-ellipsis-vertical");
  item.appendChild(input);
  item.appendChild(span);
  item.appendChild(i);
  return parent.appendChild(item);
}
