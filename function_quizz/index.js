function validate_user(username, email, password, confirm_password) {
  let user_message = "All good";
  if (
    username.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    confirm_password.length === 0
  ) {
    user_message = "Fields cannot be empty";
  }
  if (password.length < 8) {
    user_message = "Password must be at least 8 characters";
  }
  if (password !== confirm_password) {
    user_message = "Password do not match";
  }
  return user_message;
}

document.getElementById("login-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("#email").value;
  const username = document.getElementById("#username").value;
  const password = document.getElementById("#password").value;
  const confirm_password = document.getElementById("#confirm_password").value;

  console.log(validate_user(username, email, password, confirm_password));
});
