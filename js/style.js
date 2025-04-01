const modal = document.querySelector("#modal");
const iconSearch = document.querySelector(".header__icon-search");
const modalIconArrow = document.querySelector(".modal__icon-arrow");

const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const logoSvg = document.querySelector(".logo__svg");

const buttonDecorMessage = document.querySelector(".decor-message");
const buttonDecorFeedback = document.querySelector(".decor-feedback");

iconSearch.onclick = () => {
  modal.classList.add("show");
};

modalIconArrow.onclick = () => {
  modal.classList.remove("show");
};

modal.onclick = (e) => {
  if (modal === e.target) {
    modal.classList.remove("show");
  }
};

// Gộp sự kiện scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Cập nhật header khi cuộn
  if (scrollPosition > 300) {
    header.style.color = "#8917ee";
    header.style.background = "#fafafa";
    logoSvg.classList.add("logo__small");
    buttonDecorMessage.classList.add("show");
  } else {
    header.style.color = "#fff";
    header.style.background = "transparent";
    logoSvg.classList.remove("logo__small");
    buttonDecorMessage.classList.remove("show");
  }

  // Hiển thị feedback khi cuộn đến nửa trang
  if (scrollPosition > documentHeight / 2 - windowHeight) {
    buttonDecorFeedback.classList.add("show");
  }
});

// Swiper
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

// Thêm sự kiện hover để chuyển slide
document.querySelectorAll(".swiper-slide").forEach((slide, index) => {
  slide.addEventListener("mouseenter", () => {
    swiper.slideTo(index);
  });
});
