import "../pages/index.css";
import {
  setBaseModalEventListeners,
  openModalOnElementClick,
  openModal,
  closeModal,
} from "./modal";
import { createCard } from "./card";
import { enableValidation, clearValidation } from "./validation";
import * as api from "./api";

let userId;

const popupEdit = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupDelete = document.querySelector(".popup_type_delete");

const popupEditTrigger = document.querySelector(".profile__edit-button");
const popupAvatarTrigger = document.querySelector(".profile__image-button");
const popupNewCardTrigger = document.querySelector(".profile__add-button");

const editForm = document.querySelector('form[name="edit-profile"]');
const editFormSubmitButton = editForm.querySelector('button[type="submit"]');
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardFormSubmitButton = editForm.querySelector('button[type="submit"]');
const avatarForm = document.querySelector('form[name="avatar"]');
const avatarFormSubmitButton = editForm.querySelector('button[type="submit"]');
const deleteCardSubmitButton = popupDelete.querySelector(
  'button[type="submit"]'
);

const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');
const avatarLinkInput = avatarForm.querySelector('input[name="link"]');

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const avatarElement = document.querySelector(".profile__image");

const placesList = document.querySelector(".places__list");

const modalImage = popupImage.querySelector(".popup__image");
const modalCaption = popupImage.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const updateUserProfile = ({ name, about, avatar }) => {
  nameElement.textContent = name;
  jobElement.textContent = about;
  avatarElement.src = avatar;
};

const handleCardImageClick = (event) => {
  const cardData = {
    name: event.target.alt,
    link: event.target.src,
  };

  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;

  openModal(popupImage);
};

const handleConfirmDelete = () => {
  const cardId = deleteCardSubmitButton.dataset.cardId;
  const cardElement = document.getElementById(cardId);
  deleteCardSubmitButton.textContent = "Удаление...";
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(api.handleApiError)
    .finally(() => {
      delete deleteCardSubmitButton.dataset.cardId;
      deleteCardSubmitButton.textContent = "Да";
      closeModal(popupDelete);
    });
};

const handleDeleteCard = (event) => {
  const cardElement = event.target.closest(".card");
  deleteCardSubmitButton.dataset.cardId = cardElement.id;
  openModal(popupDelete);
};

const handleDeleteLikeCard = (cardId, likeButton, likeCounter) => {
  api
    .deleteLikeCard(cardId)
    .then((cardData) => {
      likeButton.classList.remove("card__like-button_is-active");
      likeCounter.textContent = cardData.likes.length;
    })
    .catch(api.handleApiError);
};

const handleAddLikeCard = (cardId, likeButton, likeCounter) => {
  api
    .addLikeCard(cardId)
    .then((cardData) => {
      likeButton.classList.add("card__like-button_is-active");
      likeCounter.textContent = cardData.likes.length;
    })
    .catch(api.handleApiError);
};

const handleLikeCard = (event) => {
  const cardElement = event.target.closest(".card");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = event.target;
  const isCurrentlyLiked = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  if (isCurrentlyLiked) {
    return handleDeleteLikeCard(cardId, likeButton, likeCounter);
  } else {
    return handleAddLikeCard(cardId, likeButton, likeCounter);
  }
};

const setEditProfileFormInitialValues = () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
};

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();
  editFormSubmitButton.textContent = "Сохранение...";
  api
    .changeUserInfo({
      name: nameInput.value,
      about: jobInput.value,
    })
    .then(updateUserProfile)
    .catch(api.handleApiError)
    .finally(() => {
      editFormSubmitButton.textContent = "Сохранить";
      closeModal(popupEdit);
    });
};

const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  avatarFormSubmitButton.textContent = "Сохранение...";
  api
    .changeProfileImage({
      avatar: avatarLinkInput.value,
    })
    .then(updateUserProfile)
    .catch(api.handleApiError)
    .finally(() => {
      avatarFormSubmitButton.textContent = "Сохранить";
      closeModal(popupAvatar);
    });
};

const resetNewCardForm = () => {
  newCardForm.reset();
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  api
    .addNewCard({
      name: placeNameInput.value,
      link: placeLinkInput.value,
    })
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        handleLikeCard,
        handleDeleteCard,
        handleCardImageClick
      );
      placesList.prepend(cardElement);
    })
    .catch(api.handleApiError)
    .finally(() => {
      editFormSubmitButton.textContent = "Сохранить";
      closeModal(popupNewCard);
      resetNewCardForm();
    });
};

setBaseModalEventListeners(popupEdit);

setBaseModalEventListeners(popupAvatar);

setBaseModalEventListeners(popupNewCard);

setBaseModalEventListeners(popupImage);

setBaseModalEventListeners(popupDelete);

openModalOnElementClick(popupEditTrigger, popupEdit, (modal) => {
  clearValidation(editForm, validationConfig);
  setEditProfileFormInitialValues();
  openModal(modal);
});

openModalOnElementClick(popupAvatarTrigger, popupAvatar, (modal) => {
  clearValidation(avatarForm, validationConfig);
  openModal(modal);
});

openModalOnElementClick(popupNewCardTrigger, popupNewCard, (modal) => {
  clearValidation(newCardForm, validationConfig);
  openModal(modal);
});

editForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
avatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
deleteCardSubmitButton.addEventListener("click", handleConfirmDelete);

enableValidation(validationConfig);

const appendCardsToDOM = (cardDataList) => {
  cardDataList.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      userId,
      handleLikeCard,
      handleDeleteCard,
      handleCardImageClick
    );
    placesList.append(cardElement);
  });
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    console.log(userInfo);
    userId = userInfo._id;
    updateUserProfile(userInfo);

    console.log(initialCards);
    appendCardsToDOM(initialCards);
  })
  .catch(api.handleApiError);
