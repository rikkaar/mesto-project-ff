import { addLikeCard, deleteLikeCard, handleApiError } from "./api.js";

const cardTemplate = document.querySelector("#card-template");

const handleLikeCard = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? deleteLikeCard : addLikeCard;

  likeAction(cardId)
    .then((cardData) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = cardData.likes.length;
    })
    .catch(handleApiError);
};

export const createCard = (
  cardData,
  userId,
  handleDeleteCard,
  handleCardImageClick
) => {
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector(".card");
  const cardImage = cardFragment.querySelector(".card__image");
  const cardTitle = cardFragment.querySelector(".card__title");
  const deleteButton = cardFragment.querySelector(".card__delete-button");
  const likeButton = cardFragment.querySelector(".card__like-button");
  const likeCounter = cardFragment.querySelector(".card__like-counter");

  cardElement.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isLikedByMe = cardData.likes.some((like) => like._id === userId);

  if (isLikedByMe) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const isCreatedByUser = cardData.owner._id === userId;

  if (isCreatedByUser) {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(cardElement, cardData._id)
    );
  } else {
    deleteButton.hidden = true;
  }

  cardImage.addEventListener("click", () =>
    handleCardImageClick(cardData.link, cardData.name)
  );

  likeButton.addEventListener("click", () =>
    handleLikeCard(cardData._id, likeButton, likeCounter)
  );

  return cardFragment;
};
