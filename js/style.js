// Helper Functions
const getElement = (selector) => document.querySelector(selector);
const addEventListenerIfExists = (element, event, callback) => {
  element?.addEventListener(event, callback);
};
const toggleClassIfExists = (element, className) => {
  element?.classList.toggle(className);
};
const removeClassIfExists = (element, className) => {
  element?.classList.remove(className);
};
const setStyleIfExists = (element, styleProp, value) => {
  element?.style && (element.style[styleProp] = value);
};

// Elements
const elements = {
  modal: getElement("#modal"),
  iconSearch: getElement(".header__icon-search"),
  modalIconArrow: getElement(".modal__icon-arrow"),
  header: getElement(".header"),
  logoSvg: getElement(".logo__svg"),
  btnDecorMessage: getElement(".decor-message"),
  btnDecorFeedback: getElement(".decor-feedback"),
  btnDetailShowModal: getElement(".reading-list-btn"),
  modalDetail: getElement(".modal-detail"),
  btnDecorItemOne: getElement(".reading-list-btn__item-one"),
  btnDecorItemThree: getElement(".reading-list-btn__item-three"),
  navbarViegazine: getElement(".navbar-viegazine"),
  moreNewList: getElement(".navbar__btn-newText"),
  subMenu: getElement(".navbar__sub-menu"),
  iconSvgBtnMore: getElement(".navbar__btn-svg"),
  progressBar: getElement(".progress-bar"),
};

// Event Handlers
addEventListenerIfExists(elements.iconSearch, "click", () =>
  elements.modal?.classList.add("show")
);
addEventListenerIfExists(elements.modalIconArrow, "click", () =>
  elements.modal?.classList.remove("show")
);
addEventListenerIfExists(elements.moreNewList, "click", () => {
  toggleClassIfExists(elements.subMenu, "show");
  toggleClassIfExists(elements.iconSvgBtnMore, "navbar__btn-svg--rotate");
});
addEventListenerIfExists(elements.modal, "click", (e) => {
  if (e.target === elements.modal) elements.modal.classList.remove("show");
});
addEventListenerIfExists(elements.btnDetailShowModal, "click", () => {
  toggleClassIfExists(elements.modalDetail, "show");
  toggleClassIfExists(elements.btnDecorItemOne, "active");
  toggleClassIfExists(elements.btnDecorItemThree, "active");
});
addEventListenerIfExists(elements.modalDetail, "click", () => {
  elements.modalDetail.classList.remove("show");
  toggleClassIfExists(elements.btnDecorItemOne, "active");
  toggleClassIfExists(elements.btnDecorItemThree, "active");
});

// Click anywhere to close subMenu
window.addEventListener("click", (e) => {
  if (
    !elements.subMenu.contains(e.target) &&
    !elements.moreNewList.contains(e.target)
  ) {
    removeClassIfExists(elements.subMenu, "show");
    removeClassIfExists(elements.iconSvgBtnMore, "navbar__btn-svg--rotate");
  }
});

// Scroll Event
window.addEventListener("scroll", () => {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.documentElement;

  // Header updates
  const isScrolled = scrollY > 300;
  setStyleIfExists(elements.header, "color", isScrolled ? "#8917ee" : "#fff");
  setStyleIfExists(
    elements.header,
    "background",
    isScrolled ? "#fafafa" : "transparent"
  );
  elements.logoSvg?.classList.toggle("logo__small", isScrolled);
  elements.btnDecorMessage?.classList.toggle("show", isScrolled);
  elements.navbarViegazine?.classList.toggle(
    "navbar-viegazine--active",
    isScrolled
  );

  // Feedback button
  elements.btnDecorFeedback?.classList.toggle(
    "show",
    scrollY > scrollHeight / 2 - innerHeight
  );

  // Loading bar
  if (elements.progressBar) {
    elements.progressBar.style.width = `${
      (scrollY / (scrollHeight - innerHeight)) * 100
    }%`;
  }
});

// Lazy Load Options
window.lazyLoadOptions = [
  {
    elements_selector:
      "img[data-lazy-src], .rocket-lazyload, iframe[data-lazy-src]",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
    callback_loaded: (element) => {
      if (
        element.tagName === "IFRAME" &&
        element.dataset.rocketLazyload === "fitvidscompatible"
      ) {
        if (
          element.classList.contains("lazyloaded") &&
          window.jQuery?.fn?.fitVids
        ) {
          jQuery(element).parent().fitVids();
        }
      }
    },
  },
  {
    elements_selector: ".rocket-lazyload",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 300,
  },
];

window.addEventListener("LazyLoad::Initialized", (e) => {
  const lazyLoadInstance = e.detail.instance;

  if (window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
      let imageCount = 0,
        iframeCount = 0,
        rocketLazyCount = 0;

      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (typeof node.getElementsByTagName !== "function") return;
          if (typeof node.getElementsByClassName !== "function") return;

          imageCount +=
            node.getElementsByTagName("img").length +
            (node.tagName === "IMG" ? 1 : 0);
          iframeCount +=
            node.getElementsByTagName("iframe").length +
            (node.tagName === "IFRAME" ? 1 : 0);
          rocketLazyCount +=
            node.getElementsByClassName("rocket-lazyload").length;
        });
      });

      if (imageCount || iframeCount || rocketLazyCount)
        lazyLoadInstance.update();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});
