export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
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

const closeModalOnCloseClick = (
  event,
  modal,
  onCloseCallback = closeModal
) => {
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
  modalTrigger,
  modal,
  onOpenCallback = openModal
) => {
  modalTrigger.addEventListener("click", () => onOpenCallback(modal));
};

export const openModalOnClassNameClick = (
  modalTriggerClassName,
  modal,
  onOpenCallback = openModal
) => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(modalTriggerClassName)) {
      onOpenCallback(modal, event);
    }
  });
};
