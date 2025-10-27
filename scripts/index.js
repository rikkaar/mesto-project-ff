import "../pages/index.css";
import {
  setBaseModalEventListeners,
  openModalOnElementClick,
  openModal,
  closeModal,
} from "./modal";
import { createCard } from "./card";
import { initialCards } from "./cards";
import { enableValidation, clearValidation } from "./validation";

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupEditTrigger = document.querySelector(".profile__edit-button");
const popupNewCardTrigger = document.querySelector(".profile__add-button");

const editForm = document.querySelector('form[name="edit-profile"]');
const newCardForm = document.querySelector('form[name="new-place"]');

const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="description"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
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

const handleDeleteCard = (event) => {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
};

const handleLikeCard = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

const setEditProfileFormInitialValues = () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
};

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closeModal(popupEdit);
};

const resetNewCardForm = () => {
  newCardForm.reset();
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  const cardElement = createCard(
    newCardData,
    handleLikeCard,
    handleDeleteCard,
    handleCardImageClick
  );

  placesList.insertBefore(cardElement, placesList.firstChild);
  closeModal(popupNewCard);
  resetNewCardForm();
};

setBaseModalEventListeners(popupEdit);

setBaseModalEventListeners(popupNewCard);

setBaseModalEventListeners(popupImage);

openModalOnElementClick(popupEditTrigger, popupEdit, (modal) => {
  clearValidation(editForm, validationConfig);
  setEditProfileFormInitialValues();
  openModal(modal);
});

openModalOnElementClick(popupNewCardTrigger, popupNewCard, (modal) => {
  clearValidation(newCardForm, validationConfig);
  openModal(modal);
});

editForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleLikeCard,
    handleDeleteCard,
    handleCardImageClick
  );
  placesList.appendChild(cardElement);
});

enableValidation(validationConfig);
