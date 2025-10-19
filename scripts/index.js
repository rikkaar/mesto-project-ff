import "../pages/index.css";
import {
  addEventListenersToModal,
  addEventListenerToModalTrigger,
  addEventListenerToModalTriggerByClassName,
} from "./modal";
// @todo: Темплейт карточки

// @todo: DOM узлы

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditTrigger = document.querySelector(".profile__edit-button");
addEventListenersToModal(popupEdit);
addEventListenerToModalTrigger(popupEditTrigger, popupEdit);

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardTrigger = document.querySelector(".profile__add-button");
addEventListenersToModal(popupNewCard);
addEventListenerToModalTrigger(popupNewCardTrigger, popupNewCard);

const popupImage = document.querySelector(".popup_type_image");
addEventListenersToModal(popupImage);
addEventListenerToModalTriggerByClassName(".card-template", popupImage);

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
