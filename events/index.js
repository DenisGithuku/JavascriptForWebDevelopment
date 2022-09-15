// Note: Using getElementsByTagName or getElementsByClassName returns a NodeList
// That is:- a list of elements in our DOM. This means that there is more than one element
// in memory and so we have to access the elements with their index in the list inorder to perfom the operation

// function addParagraph() {
//   let div = document.getElementsByTagName("div");
//   let p = document.createElement("p");
//   p.innerHTML = "Add paragraph";
//   div[0].appendChild(p);
// }

// const buttons = document.getElementsByClassName("save-btn");
// // buttons[0].addEventListener("click", () => addParagraph());
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", () => addParagraph());
// }

const validateUser = () => {
  const email = document.getElementById("email").value;
  if (email.length <= 0) {
    let span = document.createElement("span");
    span.textContent = "Please enter your email";
    span.style = "color: red";
    document.body.appendChild(span);
  }
};

let forms = document.getElementsByClassName("registration-form")[0];
forms.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUser();
});
