$(document).ready(function () {
  // Elements
  const $modal = $(".menu-modal");
  const $iconSearch = $(".header__icon-search");
  const $modalIconArrow = $(".modal__icon-arrow");
  const $header = $(".header");
  const $logoSvg = $(".logo__svg");
  const $buttonDecorMessage = $(".decor-message");
  const $buttonDecorFeedback = $(".decor-feedback");
  const $btnDetailShowModal = $(".reading-list-btn");
  const $modalDetail = $(".modal-detail");
  const $btnDecorItemOne = $(".reading-list-btn__item-one");
  const $btnDecorItemThree = $(".reading-list-btn__item-three");
  const $navbarViegazine = $(".navbar-viegazine");
  const $moreNewList = $(".navbar__btn-newText");
  const $subMenu = $(".navbar__sub-menu");
  const $iconSvgBtnMore = $(".navbar__btn-svg");
  const $progressBar = $(".progress-bar");

  // page-love__nav-drop-down
  const $loveNavDropdown = $(".page-love__nav-drop-down");
  const $loveNavDropdownContent = $(".page-love__nav-drop-content");

  $loveNavDropdown.on("click", function () {
    $loveNavDropdownContent.toggleClass("show");
  });

  // choose gender
  const $btnGender = $(".form-group__gender-user-profile-row");
  const $bodyGender = $(".form-group__gender-user-profile-body");
  const $output = $(".form-group__gender-user-profile-gender");

  $btnGender.on("click", function () {
    $bodyGender.toggleClass("show");
  });

  $bodyGender.on("click", "li", function (e) {
    const text = $(e.target).text();
    $output.text(text);
    $bodyGender.removeClass("show");
    $(this).siblings().removeClass("form-group__gender-user-profile-active");
    $(this).addClass("form-group__gender-user-profile-active");
  });

  // Events
  $iconSearch.on("click", function () {
    $modal.addClass("show");
  });

  $modalIconArrow.on("click", function () {
    $modal.removeClass("show");
  });

  $moreNewList.on("click", function (e) {
    e.stopPropagation();
    $subMenu.toggleClass("show");
    $iconSvgBtnMore.toggleClass("navbar__btn-svg--rotate");
  });

  $modal.on("click", function (e) {
    if (e.target === this) {
      $modal.removeClass("show");
    }
  });

  $btnDetailShowModal.on("click", function () {
    $modalDetail.toggleClass("show");
    $btnDecorItemOne.toggleClass("active");
    $btnDecorItemThree.toggleClass("active");
  });

  $modalDetail.on("click", function () {
    $modalDetail.removeClass("show");
    $btnDecorItemOne.toggleClass("active");
    $btnDecorItemThree.toggleClass("active");
  });

  // Click anywhere to close subMenu
  $(window).on("click", function (e) {
    if (
      !$subMenu.is(e.target) &&
      $subMenu.has(e.target).length === 0 &&
      !$moreNewList.is(e.target) &&
      $moreNewList.has(e.target).length === 0
    ) {
      $subMenu.removeClass("show");
      $iconSvgBtnMore.removeClass("navbar__btn-svg--rotate");
    }
  });

  // Scroll Event
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();

    if (scrollPosition > 300) {
      $header.css({ color: "#8917ee", background: "#fafafa" });
      $logoSvg.addClass("logo__small");
      $buttonDecorMessage.addClass("show");
      $navbarViegazine.addClass("navbar-viegazine--active");
    } else {
      $header.css({ color: "#fff", background: "transparent" });
      $logoSvg.removeClass("logo__small");
      $buttonDecorMessage.removeClass("show");
      $navbarViegazine.removeClass("navbar-viegazine--active");
    }

    if (scrollPosition > documentHeight / 2 - windowHeight) {
      $buttonDecorFeedback.addClass("show");
    }

    if ($progressBar.length) {
      let progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      $progressBar.css("width", progress + "%");
    }
  });

  // Swiper Slide Hover Effect
  $(".swiper-slide").on("mouseover", function () {
    const $items = $(".swiper-slide");
    const index = $items.index(this);

    $items.each(function (i) {
      const gap = Math.abs(i - index);
      const $el = $(this);

      $el.css("z-index", 10 - gap);

      if (gap === 0) {
        $el.addClass("swiper-slide-active").css({
          transform: "translate3d(0,0,0) scale3d(1, 1, 1)",
        });
      } else {
        $el.removeClass("swiper-slide-active");

        const scale = 1 - gap * 0.1;
        const delta = 37;
        const sign = i < index ? 1 : -1;
        const translateX = sign * (gap / 4) * delta;

        $el.css({
          transform: `translate3d(${translateX}px, 0, 0) scale3d(${scale}, ${scale}, ${scale})`,
        });
      }
    });
  });

  // Mobile Swiper effect placeholder
  function handleSlideMobileEffect() {
    // Nếu muốn dùng Swiper cho mobile thì khởi tạo ở đây
  }

  handleSlideMobileEffect();
});
