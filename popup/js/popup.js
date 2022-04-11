const buttonOpen = document.querySelector(".button_open");
const buttonClose = document.querySelector(".button_close");
const body = document.querySelector("body");
const popup = document.querySelector("#test-popup");

const OPEN_CLASS = "open";
const LOCK_CLASS = "locked";

const onClickDimmed = (e) => {
  if(e.target === e.currentTarget) {
    closePopup();
  };
}

const closePopup = () => {
  popup.classList.remove(OPEN_CLASS);
  body.classList.remove(LOCK_CLASS);

  buttonClose.removeEventListener("click", closePopup);
  popup.removeEventListener("click", onClickDimmed);
}

const openPopup = () => {
  popup.classList.add(OPEN_CLASS);
  body.classList.add(LOCK_CLASS);

  buttonClose.addEventListener("click", closePopup);
  popup.addEventListener("click", onClickDimmed);
}

buttonOpen.addEventListener("click", openPopup);
