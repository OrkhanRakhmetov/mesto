// Открытие попапа 
export const openPopup = (popup) => {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByClickEscape);
}

// Закрытие попапа
export const closePopup = (popup) => {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByClickEscape);
}
// Закрытие попапа по нажатию Escape
export function closePopupByClickEscape(e) {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}