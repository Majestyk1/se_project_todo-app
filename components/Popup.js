class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupEl.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }
  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }
  setEventListeners() {
    // this._popupCloseBtn.addEventListener("click", () => {
    //   this.close();
    // });
    this._popupEl.addEventListener("mousedown", (evt) => {
      //if the event targets classlist contains "popup__close" or "popup"
      console.log(evt.target);
      if (evt.target === ".popup__close" || evt.target === ".popup") {
        this.close();
      }
      // then close the modal
    });
  }
}

export default Popup;
