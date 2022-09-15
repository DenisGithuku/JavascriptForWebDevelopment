function get_name() {
  const name = prompt("Enter your name: ");
  greet_user(name);
}

function greet_user(name) {
  console.log(`Hello ${name}`);
}

get_name();

const date = new Date();
console.log(date.getFullYear());
