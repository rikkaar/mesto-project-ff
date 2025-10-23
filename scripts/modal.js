const closeModalOnEscapeButton = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeModalOnEscapeButton);
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeModalOnEscapeButton);
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

  modal.addEventListener("click", handleModalClick);
};

export const openModalOnElementClick = (
  trigger,
  modal,
  onOpenCallback = openModal
) => {
  trigger.addEventListener("click", () => onOpenCallback(modal));
};
