const auth = firebase.auth();
const form = document.querySelector("form");
const alertCard = document.querySelector(".alert-card");
const alert = document.querySelector(".alert");
const googleBtn = document.querySelector(".google-logo");
const facebookBtn = document.querySelector(".facebook-logo");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const confirm_pass = event.target.confirm.value;
  const terms = event.target.terms;

  const email_entry = document.querySelector(".email-entry");
  const password_entry = document.querySelector(".password-entry");
  const confirm_entry = document.querySelector(".confirm-entry");

  event.target.email.style.borderColor = "rgba(0, 0, 0, 0.08)";
  event.target.password.style.borderColor = "rgba(0, 0, 0, 0.08)";
  event.target.confirm.style.borderColor = "rgba(0, 0, 0, 0.08)";

  email_entry.style.color = "rgba(0, 0, 0, 0.08)";
  password_entry.style.color = "rgba(0, 0, 0, 0.08)";
  confirm_entry.style.color = "rgba(0, 0, 0, 0.08)";

  email_entry.innerHTML = "We don't share personal data with other sites";
  password_entry.innerHTML = "";
  confirm_entry.innerHTML = "";

  if (email.length <= 0) {
    email_entry.innerHTML = "Please provide an valid email address";
    event.target.email.style.borderColor = "red";
    email_entry.style.color = "red";
  } else if (password.length <= 0) {
    password_entry.innerHTML = "Please provide a valid password";
    event.target.password.style.borderColor = "red";
    password_entry.style.color = "red";
  } else if (password.length < 6) {
    password_entry.innerHTML = "Please should not be less than 6 characters";
    event.target.password.style.borderColor = "red";
    password_entry.style.color = "red";
  } else if (confirm_pass.length <= 0) {
    confirm_entry.innerHTML = "Please confirm your password";
    event.target.confirm.style.borderColor = "red";
    confirm_entry.style.color = "red";
  } else if (password !== confirm_pass) {
    event.target.password.style.borderColor = "red";
    password_entry.style.color = "red";
    event.target.confirm.style.borderColor = "red";
    confirm_entry.style.color = "red";
    password_entry.innerHTML = "Password do not match";
    confirm_entry.innerHTML = "Passwords do not match";
  } else if (!terms.checked) {
    alert.innerHTML = "Please accept terms and conditions";
    toggleAlert(alertCard, true);
    setTimeout(() => {
      toggleAlert(alertCard, true);
    }, 5000);
  } else {
    event.target.email.style.borderColor = "rgba(0,128,0,0.739)";
    event.target.password.style.borderColor = "rgba(0,128,0,0.739)";
    event.target.confirm.style.borderColor = "rgba(0,128,0,0.739)";

    email_entry.style.color = "rgba(0,128,0,0.739)";
    password_entry.style.color = "rgba(0,128,0,0.739)";
    confirm_entry.style.color = "rgba(0,128,0,0.739)";

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        userInfo.user.sendEmailVerification().then(() => {
          alert.innerHTML =
            "Email verification link sent. Please check your inbox";
          toggleAlert(alertCard, false);
          setTimeout(() => {
            toggleAlert(alertCard, false);
            window.location.href = "login.html";
          }, 5000);
        });
      })
      .catch((err) => {
        alert.innerHTML = err.message;
        toggleAlert(alertCard, true);
        setTimeout(() => {
          toggleAlert(alertCard, true);
        }, 5000);
      });
  }
});

googleBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  signInWithProvider(provider);
});

facebookBtn.addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  signInWithProvider(provider)
})

const signInWithProvider = (provider) => {
  auth
    .signInWithPopup(provider)
    .then((userInfo) => {
      alert.innerHTML = `Signed in as ${userInfo.user.email}`;
      toggleAlert(alertCard, false);
      setTimeout(() => {
        toggleAlert(alertCard);
        window.location.href = "home.html";
      }, 5000);
    })
    .catch((err) => {
      alert.innerHTML = err.message;
      toggleAlert(alertCard, true);
      setTimeout(() => {
        toggleAlert(alertCard);
      }, 5000);
    });
};

const toggleAlert = (element, isError) => {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    if (!isError) element.style.backgroundColor = "green";
  } else {
    element.classList.add("hidden");
  }
};
