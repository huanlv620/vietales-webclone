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
  if (
    subMenu &&
    !subMenu.contains(e.target) &&
    !moreNewList.contains(e.target)
  ) {
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
    // var swiper = new Swiper(".swiper", {
    //   effect: "coverflow",
    //   grabCursor: true,
    //   centeredSlides: true,
    //   initialSlide: 2,
    //   speed: 600,
    //   preventClicks: true,
    //   slidesPerView: "auto",
    //   coverflowEffect: {
    //     rotate: 0,
    //     stretch: 80,
    //     depth: 350,
    //     modifier: 1,
    //     slideShadows: true,
    //   },
    // });
  }
}

// handleSwiper();

const items = document.querySelectorAll(".swiper-slide");

function handleSlideEffect() {
  items.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      // const index = +item.getAttribute("data-swiper-slide-index");

      items.forEach((i, currentIndex) => {
        // const currentIndex = +i.getAttribute("data-swiper-slide-index");
        const gap = Math.abs(currentIndex - index);

        i.style.zIndex = 10 - gap;

        if (gap === 0) {
          i.classList.add("swiper-slide-active");
          i.style.transform = "translate3d(0,0,0) scale3d(1, 1, 1)";
        } else {
          i.classList.remove("swiper-slide-active");

          const scale = [];
          scale[0] = 1 - gap * 0.1;
          scale[1] = 1 - gap * 0.1;
          scale[2] = 1 - gap * 0.1;

          const translate = [];
          translate[0] = 0;
          translate[1] = 0;
          translate[2] = 0;

          const delta = 37;
          const sign = currentIndex < index ? 1 : -1;

          translate[0] = sign * (gap / 4) * delta;

          i.style.transform = `translate3d(${translate[0]}px, ${translate[1]}px, ${translate[2]}px) scale3d(${scale[0]}, ${scale[1]}, ${scale[2]})`;
        }
      });
    });
  });
}

function handleSlideMobileEffect() {
  new Swiper(".swiper", {
    effect: "cards",
    loop: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    parallax: true,
    initialSlide: 2,
    activeIndex: 3,
    loopedSlides: 4,
    slidesPerView: "auto",
    cardsEffect: { rotate: false, perSlideOffset: 15, slideShadows: false },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) {
    handleSlideMobileEffect();
  }
  handleSlideEffect();
});

// document.addEventListener("DOMContentLoaded", function (event) {
//   handleSlideMobileEffect();
//   handleSlideEffect();
// });
