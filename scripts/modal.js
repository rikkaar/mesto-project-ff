export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");

  if (modal._handleEscapeKey) {
    document.removeEventListener("keydown", modal._handleEscapeKey);
    delete modal._handleEscapeKey;
  }
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onclose(modal);
    }
  };

  modal._handleEscapeKey = handleEscapeKey;
  document.addEventListener("keydown", handleEscapeKey);
};

const closeModalOnEscapeButton = (event, modal) => {
  if (event.key === "Escape") {
    closeModal(modal);
  }
};

const closeModalOnOverlayClick = (event, modal) => {
  if (event.currentTarget === event.target) {
    closeModal(modal);
  }
};

const closeModalOnCloseClick = (event, modal) => {
  if (event.target.matches(".popup__close")) {
    closeModal(modal);
  }
};

export const setBaseModalEventListeners = (modal) => {
  const handleModalClick = (event) => {
    closeModalOnCloseClick(event, modal);
    closeModalOnOverlayClick(event, modal);
  };

  const handleEscapeKey = (event) => {
    closeModalOnEscapeButton(event, modal);
  };

  modal.addEventListener("click", handleModalClick);
  document.addEventListener("keydown", handleEscapeKey);
};

export const openModalOnElementClick = (
  trigger,
  modal,
  onOpenCallback = openModal
) => {
  trigger.addEventListener("click", () => onOpenCallback(modal));
};
