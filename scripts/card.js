const cardTemplate = document.querySelector("#card-template");

const setCardValues = (cardElement, cardData) => {
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
};

export const handleDeleteCard = (cardElement) => {
  cardElement.remove();
};

export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export const createCard = (cardData) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  setCardValues(cardElement, cardData);
  return cardElement;
};

export const setCardImageInPopup = (cardData, imageModal) => {
  const modalImage = imageModal.querySelector(".popup__image");
  const modalCaption = imageModal.querySelector(".popup__caption");

  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
};
