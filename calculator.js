const calculator_btns = document.getElementsByClassName("calculator-btn");
let result_display = document.querySelector(".result");

let first_num;
let operator;
let second_num;
let previous_key;

for (let i = 0; i < calculator_btns.length; i++) {
  calculator_btns[i].addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      previous_key = "";
      const key = e.target;
      const action = key.dataset.action;
      if (!action) {
        if (result_display.textContent === "0" || previous_key === "operator") {
          result_display.textContent = key.textContent;
        } else {
          result_display.textContent =
            result_display.textContent + key.textContent;
          previous_key = "operator";
        }
      } else {
        if (action === "decimal") {
          result_display.textContent = result_display.textContent + ".";
          previous_key = "operator";
        }

        if (
          action === "add" ||
          action === "multiply" ||
          action === "subtract" ||
          action === "divide"
        ) {
          operator = key.textContent;
          first_num = result_display.textContent;
          previous_key = "operator";
          result_display.textContent = "0";
        }

        if (action === "clear") {
          result_display.textContent = "0";
        }

        if (action === "equals") {
          second_num = result_display.textContent;
          result_display.textContent = calculate_result(
            parseFloat(first_num),
            operator,
            parseFloat(second_num)
          );
        }
      }
    }
  });
}

const calculate_result = (first_num, operator, second_num) => {
  let result;
  if (operator === "+") {
    result = first_num + second_num;
  } else if (operator === "-") {
    result = first_num - second_num;
  } else if (operator === "*") {
    result = first_num * second_num;
  } else if (operator === "/") {
    result = first_num / second_num;
  }
  return result;
};
