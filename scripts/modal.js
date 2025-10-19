const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};

export const addEventListenersToModal = (modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__close")) {
      closeModal(modal);
    }
    if (event.currentTarget === event.target) {
      closeModal(modal);
    }
    if (event.key === "Escape") {
      closeModal(modal);
    }
  });
};

export const addEventListenerToModalTrigger = (modalTrigger, modal) => {
  modalTrigger.addEventListener("click", () => openModal(modal));
};

export const addEventListenerToModalTriggerByClassName = (
  modalTriggerClassName,
  modal
) => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains(modalTriggerClassName)) {
      openModal(modal);
    }
  });
};
