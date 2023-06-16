
const alertCard = document.querySelector(".alert-card");
const alert = document.querySelector(".alert");
const auth = firebase.auth()


const form = document.getElementsByTagName('form')[0]
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const email = event.target.email.value
    event.target.email.style.borderColor = 'rgba(0, 0, 0, 0.08)'

    if (email.length <= 0) {
        alert.innerHTML = 'Please provide a valid email address'
        event.target.email.style.borderColor = "red"
        toggleAlert(alertCard, true)
        setTimeout(() => {
            toggleAlert(alertCard)
        }, 5000)
        return
    }

    auth.sendPasswordResetEmail(email)
    .then(() => {
        alert.innerHTML = "Password reset email sent. Please check your inbox";
        toggleAlert(alertCard, false)
        setTimeout(() => {
            toggleAlert(alertCard)
        }, 5000)
    })
    .catch(err => {
        alert.innerHTML = err.message;
        toggleAlert(alertCard, true)
        setTimeout(() => {
            toggleAlert(alertCard)
        }, 5000)
    })
})

const toggleAlert = (element, isError) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
      if (!isError) element.style.backgroundColor = "green";
    } else {
      element.classList.add("hidden");
    }
  };