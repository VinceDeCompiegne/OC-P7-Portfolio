var modal = document.querySelector(".modal");
var trigger = document.querySelector(".edition-button-edition");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
    closeButton.focus();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);