const completed_todos = [];
const active_todo_list = document.querySelector(".active-todos");
const completed_todo_list = document.querySelector(".completed-todos");
const modal = document.querySelector(".modal-wrapper");
const overlay = document.querySelector(".overlay");
const addTodosBtn = document.querySelector(".add-todo-btn");
const errorContainer = document.querySelector(".error-container");
const active_todos = [
  // {
  //   id: 0,
  //   name: "Go to the shop",
  //   time: new Date(Date.now()).getDate(),
  //   active: true,
  // },
];

const createTodo = (todo) => {
  let todo_title = document.createElement("span");
  todo_title.textContent = todo.name;

  let todo_date = document.createElement("span");
  todo_date.textContent = todo.time;

  let todo_completed = document.createElement("input");
  todo_completed.type = "checkbox";
  todo_completed.checked = !todo.active;

  let todo_card = document.createElement("div");
  todo_card.classList.add("todo-card");
  todo_card.appendChild(todo_title);
  todo_card.appendChild(todo_date);
  todo_card.appendChild(todo_completed);
  let todo_element = document.createElement("li");
  todo_element.appendChild(todo_card);
  active_todo_list.appendChild(todo_element);
};

const refreshTodos = () => {
  if (active_todos.length > 0) {
    document.querySelector(".no-todos-status-text").classList.add("hidden");
    document
      .querySelector(".section-upcoming-todos")
      .classList.remove("hidden");

    active_todos
      .filter((todos) => todos.active === true)
      .forEach((todo) => {
        createTodo(todo);
      });
  }
};

refreshTodos();

// window.addEventListener("load", () => {
//   if (active_todos.length > 0) {
//     document
//       .querySelector(".section-upcoming-todos")
//       .classList.remove("hidden");
//   } else {
//     console.log("There are no todos");
//   }
// });

const showModal = () => {
  document.getElementsByClassName("description-input")[0].value = "";
  document.getElementsByClassName("todo-time-input")[0].value = "";
  if (
    modal.classList.contains("hidden") &&
    overlay.classList.contains("hidden")
  ) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
};

const hideModal = () => {
  if (
    !modal.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};

// const modalScaleOut = [
//   {
//     transform: "scale(1)",
//   },
//   {
//     transform: "scale(0)",
//   },
// ];

// const modalTiming = {
//   duration: 300,
// };

const showErrorMessage = () => {
  if (errorContainer.classList.contains("hidden")) {
    errorContainer.classList.remove("hidden");
  }
  setTimeout(() => {
    errorContainer.classList.add("hidden");
  }, 2000);
};

document
  .querySelector(".show-create-todos-modal-btn")
  .addEventListener("click", showModal);

const addTodos = () => {
  const description = document.querySelector(".description-input").value;
  const date = new Date(document.querySelector(".todo-time-input").value);
  const errorMessage = document.querySelector(".error-message");

  if (
    description.length <= 0 ||
    document.querySelector(".todo-time-input").value <= 0
  ) {
    errorMessage.textContent = "Invalid input";
    showErrorMessage();
    return false;
  } else if (description.length <= 10) {
    errorMessage.textContent = "Write a proper description";
    showErrorMessage();
    return false;
  } else if (date.getDate() < new Date(Date.now()).getDate()) {
    // console.log(new Date(Date.now()).getDate());
    errorMessage.textContent = "Please choose a valid date";
    showErrorMessage();
    return false;
  } else {
    // console.log("All good");
    // console.log(`${date.toDateString().split(" ")[1]} ${date.getDate()}`);
    let formattedDate;
    if (date.getDate() === new Date(Date.now()).getDate()) {
      formattedDate = "Today";
    } else if (date.getDate() - new Date(Date.now()).getDate() === 1) {
      formattedDate = "Tomorrow";
    } else {
      formattedDate = `${date.toDateString().split(" ")[1]} ${date.getDate()}`;
    }
    const todo = {
      id: Math.floor(Math.random()),
      name: description,
      time: formattedDate,
      active: true,
    };
    active_todos.push(todo);
    refreshTodos();
    return true;
  }
};

addTodosBtn.addEventListener("click", () => {
  if (addTodos() === true) {
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
  // refreshTodos();
});

document.querySelector(".cross-icon").addEventListener("click", hideModal);
