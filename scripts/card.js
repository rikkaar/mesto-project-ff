const cardTemplate = document.querySelector("#card-template");

export const createCard = (
  cardData,
  handleLikeCard,
  handleDeleteCard,
  handleCardImageClick
) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.addEventListener("click", handleCardImageClick);
  likeButton.addEventListener("click", handleLikeCard);
  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
};
