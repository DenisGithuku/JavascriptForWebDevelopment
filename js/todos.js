const completed_todos = [];
const active_todo_list = document.querySelector(".active-todos");
// const completed_todo_list = document.querySelector(".completed-todos");
const modal = document.querySelector(".modal-wrapper");
const overlay = document.querySelector(".overlay");
const addTodoBtn = document.querySelector(".add-todo-btn");
const errorContainer = document.querySelector(".error-container");
const status_text = document.querySelector(".todos-status-text");
const upcomingTodosStatusText = document.querySelector(
  ".no-active-todos-status"
);
// const completedTodos = document.querySelector(".section-completed-todos");

const createTodo = (todo) => {
  let todo_title = document.createElement("span");
  todo_title.textContent = todo.name;

  let todo_date = document.createElement("span");
  todo_date.textContent = todo.time;

  let todo_completed = document.createElement("input");
  todo_completed.type = "checkbox";
  todo_completed.checked = !todo.active;

  let cross_icon = document.createElement("span");
  cross_icon.innerHTML = "&Cross;";
  cross_icon.setAttribute("id", "clear_todo");

  let todo_card = document.createElement("div");
  todo_card.classList.add("todo-card");
  todo_card.appendChild(todo_completed);
  todo_card.appendChild(todo_title);
  todo_card.appendChild(todo_date);
  todo_card.appendChild(cross_icon);
  let todo_element = document.createElement("li");
  todo_element.appendChild(todo_card);
  todo_element.animate(
    [
      {
        transform: "translateY(100%)",
      },

      {
        transform: "translateY(0%)",
      },
    ],
    { duration: 400 }
  );
  active_todo_list.appendChild(todo_element);
  active_todo_list.classList.remove("hidden");
  upcomingTodosStatusText.classList.add("hidden");
  status_text.classList.add("hidden");
};

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
  }, 3000);
};

document
  .querySelector(".show-create-todos-modal-btn")
  .addEventListener("click", showModal);

const addTodo = () => {
  const description = document.querySelector(".description-input").value;
  const date = new Date(document.querySelector(".todo-time-input").value);
  const errorMessage = document.querySelector(".error-message");

  if (
    description.length <= 0 ||
    document.querySelector(".todo-time-input").value <= 0
  ) {
    errorMessage.textContent = "Todo cannot be empty.";
    showErrorMessage();
    return false;
  } else if (description.length <= 10) {
    errorMessage.textContent = "Write a proper description";
    showErrorMessage();
    return false;
  } else if (date.getDate() < new Date(Date.now()).getDate()) {
    errorMessage.textContent = "Please choose a valid date";
    showErrorMessage();
    return false;
  } else {
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
    createTodo(todo);
    return true;
  }
};

addTodoBtn.addEventListener("click", () => {
  if (addTodo() === true) {
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
});

document.querySelector(".cross-icon").addEventListener("click", hideModal);

active_todo_list.addEventListener("click", (event) => {
  const element = event.target;
  if (element.checked === true) {
    element.parentNode.classList.add("completed");
    if (active_todo_list.children.length === 0) {
      if (!upcomingTodosStatusText.classList.contains("hidden")) {
        upcomingTodosStatusText.classList.add("hidden");
      }
    }
  }
  if (element.checked === false) {
    element.parentNode.classList.remove("completed");
  }
  if (element.id === "clear_todo") {
    if (element.parentNode.parentNode.parentNode.children.length <= 1) {
      if (upcomingTodosStatusText.classList.contains("hidden")) {
        upcomingTodosStatusText.animate(
          [
            {
              color: "white",
            },
            {
              color: "black",
            },
          ],
          {
            duration: 500,
          }
        );
        upcomingTodosStatusText.classList.remove("hidden");
      }
    }
    element.parentNode.parentNode.animate(
      [{ from: "scale(1)" }, { transform: "scale(0)" }],
      { duration: 399 }
    );
    setTimeout(() => {
      active_todo_list.removeChild(element.parentNode.parentNode);
    }, 400);
  }
});
