export const openModal = (modal, onCloseCallback = onclose) => {
  modal.classList.add("popup_is-opened");

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onCloseCallback(modal);
    }
  };

  modal._handleEscapeKey = handleEscapeKey;
  document.addEventListener("keydown", handleEscapeKey);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");

  if (modal._handleEscapeKey) {
    document.removeEventListener("keydown", modal._handleEscapeKey);
    delete modal._handleEscapeKey;
  }
};

const closeModalOnEscapeButton = (
  event,
  modal,
  onCloseCallback = closeModal
) => {
  if (event.key === "Escape") {
    onCloseCallback(modal);
  }
};

const closeModalOnOverlayClick = (
  event,
  modal,
  onCloseCallback = closeModal
) => {
  if (event.currentTarget === event.target) {
    onCloseCallback(modal);
  }
};

const closeModalOnCloseClick = (event, modal, onCloseCallback = closeModal) => {
  if (event.target.matches(".popup__close")) {
    onCloseCallback(modal);
  }
};

export const setBaseModalEventListeners = (
  modal,
  onCloseCallback = closeModal
) => {
  const handleModalClick = (event) => {
    closeModalOnCloseClick(event, modal, onCloseCallback);
    closeModalOnOverlayClick(event, modal, onCloseCallback);
  };

  const handleEscapeKey = (event) => {
    closeModalOnEscapeButton(event, modal, onCloseCallback);
  };

  modal.addEventListener("click", handleModalClick);
  document.addEventListener("keydown", handleEscapeKey);
};

export const openModalOnElementClick = (
  trigger,
  modal,
  onOpenCallback = openModal,
  onCloseCallback = closeModal
) => {
  trigger.addEventListener("click", () =>
    onOpenCallback(modal, onCloseCallback)
  );
};
