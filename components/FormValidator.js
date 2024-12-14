class FormValidator {
  constructor(settings, formEl) {
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.errorClass = settings.errorClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.formEl = formEl;
  }

  hideInputError() {}

  showInputError(inputElement) {
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this.formEl.querySelector(this.errorElementId);
    inputElement.classList.add(this.inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this.errorClass);
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        this.formEl,
        inputElement,
        inputElement.validationMessage,
        this.settings
      );
    } else {
      this.hideInputError(inputElement);
    }
  }

  hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this.hasInvalidInput(this.inputSelector)) {
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

    this.toggleButtonState(this.inputList, this.buttonElement);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState(this.inputList, this.buttonElement);
      });
    });
  }

  enableValidation() {
    console.log("success");
    this.formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
