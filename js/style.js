const modal = document.querySelector("#modal");
const iconSearch = document.querySelector(".header__icon-search");
const modalIconArrow = document.querySelector(".modal__icon-arrow");

const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const logoSvg = document.querySelector(".logo__svg");

const buttonDecorMessage = document.querySelector(".decor-message");
const buttonDecorFeedback = document.querySelector(".decor-feedback");

// modal detail// modal detail
const btnDetailShowModal = document.querySelector(".reading-list-btn");
const modalDetail = document.querySelector(".modal-detail");
const btnDecorItemOne = document.querySelector(".reading-list-btn__item-one");
const btnDecorItemThree = document.querySelector(
  ".reading-list-btn__item-three"
);

// viegazine
const navbarViegazine = document.querySelector(".navbar-viegazine");

// viegazine .navbar__btn-svg.navbar__btn-svg--rotate
const moreNewList = document.querySelector(".navbar__btn-newText");
const subMenu = document.querySelector(".navbar__sub-menu");
const iconSvgBtnMore = document.querySelector(".navbar__btn-svg");

// show new list subject
moreNewList.onclick = () => {
  subMenu.classList.toggle("show");
  iconSvgBtnMore.classList.toggle("navbar__btn-svg--rotate");
};

// Modal header
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

    navbarViegazine.classList.add("navbar--viegazine");
  } else {
    header.style.color = "#fff";
    header.style.background = "transparent";
    logoSvg.classList.remove("logo__small");
    buttonDecorMessage.classList.remove("show");

    navbarViegazine.classList.remove("navbar--viegazine");
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

// modal detail// modal detail
btnDetailShowModal.onclick = () => {
  modalDetail.classList.toggle("show");
  btnDecorItemOne.classList.toggle("active");
  btnDecorItemThree.classList.toggle("active");
};

modalDetail.onclick = () => {
  modalDetail.classList.remove("show");
  btnDecorItemOne.classList.toggle("active");
  btnDecorItemThree.classList.toggle("active");
};

// loading bar
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY; // Số pixel đã cuộn từ trên xuống
  let scrollHeight = document.documentElement.scrollHeight - window.innerHeight; // Tổng chiều cao có thể cuộn
  let progress = (scrollTop / scrollHeight) * 100; // Tính phần trăm

  document.querySelector(".progress-bar").style.width = progress + "%";
});
