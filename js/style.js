function getElement(selector) {
  return document.querySelector(selector);
}

function addEventListenerIfExists(element, event, callback) {
  if (element) {
    element.addEventListener(event, callback);
  }
}

function toggleClassIfExists(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

function removeClassIfExists(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

function setStyleIfExists(element, styleProp, value) {
  if (element) {
    element.style[styleProp] = value;
  }
}

// Elements
const modal = getElement("#modal");
const iconSearch = getElement(".header__icon-search");
const modalIconArrow = getElement(".modal__icon-arrow");
const header = getElement(".header");
const logoSvg = getElement(".logo__svg");
const buttonDecorMessage = getElement(".decor-message");
const buttonDecorFeedback = getElement(".decor-feedback");
const btnDetailShowModal = getElement(".reading-list-btn");
const modalDetail = getElement(".modal-detail");
const btnDecorItemOne = getElement(".reading-list-btn__item-one");
const btnDecorItemThree = getElement(".reading-list-btn__item-three");
const navbarViegazine = getElement(".navbar-viegazine");
const moreNewList = getElement(".navbar__btn-newText");
const subMenu = getElement(".navbar__sub-menu");
const iconSvgBtnMore = getElement(".navbar__btn-svg");
const progressBar = getElement(".progress-bar");

console.log(navbarViegazine);

// Event Handlers
addEventListenerIfExists(iconSearch, "click", () =>
  modal?.classList.add("show")
);
addEventListenerIfExists(modalIconArrow, "click", () =>
  modal?.classList.remove("show")
);
addEventListenerIfExists(moreNewList, "click", () => {
  toggleClassIfExists(subMenu, "show");
  toggleClassIfExists(iconSvgBtnMore, "navbar__btn-svg--rotate");
});
addEventListenerIfExists(modal, "click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
addEventListenerIfExists(btnDetailShowModal, "click", () => {
  toggleClassIfExists(modalDetail, "show");
  toggleClassIfExists(btnDecorItemOne, "active");
  toggleClassIfExists(btnDecorItemThree, "active");
});
addEventListenerIfExists(modalDetail, "click", () => {
  modalDetail.classList.remove("show");
  toggleClassIfExists(btnDecorItemOne, "active");
  toggleClassIfExists(btnDecorItemThree, "active");
});

// Click anywhere to close subMenu
window.addEventListener("click", (e) => {
  if (!subMenu.contains(e.target) && !moreNewList.contains(e.target)) {
    removeClassIfExists(subMenu, "show");
    removeClassIfExists(iconSvgBtnMore, "navbar__btn-svg--rotate");
  }
});

// Scroll Event
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Header updates
  if (scrollPosition > 300) {
    setStyleIfExists(header, "color", "#8917ee");
    setStyleIfExists(header, "background", "#fafafa");
    logoSvg?.classList.add("logo__small");
    buttonDecorMessage?.classList.add("show");
    navbarViegazine?.classList.add("navbar-viegazine--active");
  } else {
    setStyleIfExists(header, "color", "#fff");
    setStyleIfExists(header, "background", "transparent");
    logoSvg?.classList.remove("logo__small");
    buttonDecorMessage?.classList.remove("show");
    navbarViegazine?.classList.remove("navbar-viegazine--active");
  }

  // Feedback button
  if (scrollPosition > documentHeight / 2 - windowHeight) {
    buttonDecorFeedback?.classList.add("show");
  }

  // Loading bar
  if (progressBar) {
    let progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = progress + "%";
  }
});

// Initialize Swiper
function handleSwiper() {
  if (typeof Swiper !== "undefined") {
    var swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 2,
      speed: 600,
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 350,
        modifier: 1,
        slideShadows: true,
      },
      on: {
        click(event) {
          swiper.slideTo(this.clickedIndex);
        },
      },
    });

    document.querySelectorAll(".swiper-slide").forEach((slide, index) => {
      slide.addEventListener("mouseenter", () => {
        swiper.slideTo(index);
      });
    });
  }
}

handleSwiper();
