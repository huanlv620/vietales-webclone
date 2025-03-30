const modal = document.querySelector("#modal");
const iconSearch = document.querySelector(".header__icon-search");
const modalIconArrow = document.querySelector(".modal__icon-arrow");

iconSearch.onclick = (e) => {
  modal.classList.add("show");
};

modalIconArrow.onclick = (e) => {
  modal.classList.remove("show");
};

modal.onclick = (e) => {
  if (modal === e.target) {
    modal.classList.remove("show");
  }
};
