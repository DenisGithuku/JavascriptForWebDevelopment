const auth = firebase.auth();
const form = document.querySelector("form");
const alertCard = document.querySelector(".alert-card");
const alert = document.querySelector(".alert");
const googleBtn = document.querySelector('.google-logo')
const facebookBtn = document.querySelector('.facebook-logo')
const githubBtn = document.querySelector('.github-logo')

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  const stay_signed_in = event.target.preference;

  const email_entry = document.querySelector(".email-entry");
  const password_entry = document.querySelector(".password-entry");

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
  } else if (!stay_signed_in.checked) {
    alert.innerHTML = "Please accept terms and conditions";
    toggleAlert(alertCard, true);
    setTimeout(() => {
      toggleAlert(alertCard, true);
    }, 5000);
  } else {
    event.target.email.style.borderColor = "rgba(0,128,0,0.739)";
    event.target.password.style.borderColor = "rgba(0,128,0,0.739)";

    email_entry.style.color = "rgba(0,128,0,0.739)";
    password_entry.style.color = "rgba(0,128,0,0.739)";

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        if (!userInfo.user.emailVerified) {
          toggleAlert(alertCard, false);
          alert.innerHTML = "Email not verified. Please verify first";
          setTimeout(() => {
            toggleAlert(alertCard, false);
          }, 5000);
          return;
        }
        alert.innerHTML = "Logged in successfully. Redirecting...";
        toggleAlert(alertCard, false);
        setTimeout(() => {
          toggleAlert(alertCard, false);
          window.location.href = "home.html";
        }, 5000);
      })
      .catch((err) => {
        alert.innerHTML = err.message;
        toggleAlert(alertCard, false);
        setTimeout(() => {
          toggleAlert(alertCard, false);
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

githubBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GithubAuthProvider()
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