import "../pages/index.css";
import {
  setBaseModalEventListeners,
  openModalOnElementClick,
  openModalOnClassNameClick,
  openModal,
  closeModal,
} from "./modal";
import {
  createCard,
  setCardImageInPopup,
  handleDeleteCard,
  handleLikeCard,
} from "./card";
import { initialCards } from "./cards";

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

  const cardElement = createCard(newCardData);

  placesList.insertBefore(cardElement, placesList.firstChild);
  closeModal(popupNewCard);
  resetNewCardForm();
};

setBaseModalEventListeners(popupEdit, (modal) => {
  closeModal(modal);
});

setBaseModalEventListeners(popupNewCard);

setBaseModalEventListeners(popupImage);

openModalOnElementClick(popupEditTrigger, popupEdit, (modal) => {
  setEditProfileFormInitialValues();
  openModal(modal);
});

openModalOnElementClick(popupNewCardTrigger, popupNewCard, (modal) => {
  openModal(modal);
});

openModalOnClassNameClick(".card__image", popupImage, (modal, event) => {
  const cardData = {
    name: event.target.alt,
    link: event.target.src,
  };
  setCardImageInPopup(cardData, popupImage);
  openModal(modal);
});

placesList.addEventListener("click", (event) => {
  if (event.target.matches(".card__delete-button")) {
    const cardElement = event.target.closest(".card");
    handleDeleteCard(cardElement);
  }

  if (event.target.matches(".card__like-button")) {
    handleLikeCard(event.target);
  }
});

editForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.appendChild(cardElement);
});
