class FormValidator {
  constructor(settings, formEl) {
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.errorClass = settings.errorClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.formEl = formEl;
  }

  _hideInputError(inputElement) {
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this.formEl.querySelector(this.errorElementId);
    inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.classList.remove(this.errorClass);
    this.errorElement.textContent = "";
  }

  _showInputError(inputElement) {
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this.formEl.querySelector(this.errorElementId);
    inputElement.classList.add(this.inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputSelector)) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this.inputList = Array.from(
      this.formEl.querySelectorAll(this.inputSelector)
    );
    this.buttonElement = this.formEl.querySelector(this.submitButtonSelector);

    this._toggleButtonState(this.inputList, this.buttonElement);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this.formEl.reset();
    this._toggleButtonState();
    // this._setEventListeners;
  }
}

export default FormValidator;
