const validate = () => {
  let email = document.forms[0].children[0].children[1].value;
  let password = document.forms[0].children[1].children[1].value;
  let email_input = document.forms[0].children[1];
  let password_input = document.forms[0].children[1];

  let span = document.createElement("span");
  span.style = "color: red";

  if (email.length <= 0) {
    span.textContent = "Email cannot be empty";
    email_input.appendChild(span);
  } else if (password.length <= 0) {
    span.textContent = "Password cannot be empty";
    password_input.appendChild(span);
  } else if (password.length < 6) {
    span.textContent = "Password should not be less than 6 characters";
    password_input.appendChild(span);
  } else {
    email_input.removeChild(span);
    password_input.removeChild(span);
  }
};

let form = document.forms[0];
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});
