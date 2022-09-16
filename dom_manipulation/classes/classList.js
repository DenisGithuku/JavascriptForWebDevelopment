const openModal = () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  if (
    modal.classList.contains("hidden") &&
    overlay.classList.contains("hidden")
  ) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
};

const closeModal = () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  if (
    !modal.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};

document.querySelector(".btn-open-modal").addEventListener("click", openModal);
document
  .querySelector(".btn-close-modal")
  .addEventListener("click", closeModal);
document.querySelector(".overlay").addEventListener("click", closeModal);
