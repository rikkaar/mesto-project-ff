const cardTemplate = document.querySelector("#card-template");

const getIsCardCreatedByUser = (cardData, userId) => {
  return cardData.owner._id === userId;
};

const geLikesCount = (cardData) => {
  return cardData.likes.length;
};

const getIsLikedByMe = (cardData, userId) => {
  return cardData.likes.some((like) => like._id === userId);
};

export const createCard = (
  cardData,
  userId,
  handleLikeCard,
  handleDeleteCard,
  handleCardImageClick
) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardItem = cardElement.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardItem.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const isCardCreatedByUser = getIsCardCreatedByUser(cardData, userId);
  const likesCount = geLikesCount(cardData);
  const isLikedByMe = getIsLikedByMe(cardData, userId);

  likeCounter.textContent = likesCount;

  if (isLikedByMe) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (isCardCreatedByUser) {
    deleteButton.addEventListener("click", handleDeleteCard);
  } else {
    deleteButton.hidden = true;
  }

  cardImage.addEventListener("click", handleCardImageClick);
  likeButton.addEventListener("click", handleLikeCard);

  return cardElement;
};
