$(document).ready(function () {
	// ELEMENTS
	const $modal = $(".menu-modal");
	const $iconSearch = $(".header__icon-search");
	const $modalIconArrow = $(".modal__icon-arrow");
	const $header = $(".header");
	const $logoSvg = $(".logo__svg");
	const $btnDecorMessage = $(".decor-message");
	const $btnDecorFeedback = $(".decor-feedback");
	const $btnDetailShowModal = $(".reading-list-btn");
	const $modalDetail = $(".modal-detail");
	const $btnItemOne = $(".reading-list-btn__item-one");
	const $btnItemThree = $(".reading-list-btn__item-three");
	const $navbar = $(".navbar-viegazine");
	const $btnMoreNews = $(".navbar__btn-newText");
	const $subMenu = $(".navbar__sub-menu");
	const $iconMoreSvg = $(".navbar__btn-svg");
	const $progressBar = $(".progress-bar");
	const $loveNav = $(".page-love__nav-drop-down");
	const $loveNavContent = $(".page-love__nav-drop-content");
	const $btnGender = $(".form-group__gender-user-profile-row");
	const $genderBody = $(".form-group__gender-user-profile-body");
	const $genderOutput = $(".form-group__gender-user-profile-gender");

	// TOGGLE LOVE NAVIGATION DROPDOWN
	$loveNav.on("click", function () {
		$loveNavContent.toggleClass("show");
	});

	// TOGGLE GENDER DROPDOWN
	$btnGender.on("click", function () {
		$genderBody.toggleClass("show");
	});

	$genderBody.on("click", "li", function () {
		const text = $(this).text();
		$genderOutput.text(text);
		$genderBody.removeClass("show");
		$(this)
			.addClass("form-group__gender-user-profile-active")
			.siblings()
			.removeClass("form-group__gender-user-profile-active");
	});

	// MODAL SEARCH
	$iconSearch.on("click", () => $modal.addClass("show"));
	$modalIconArrow.on("click", () => $modal.removeClass("show"));
	$modal.on("click", function (e) {
		if (e.target === this) $modal.removeClass("show");
	});

	// DETAIL MODAL
	$btnDetailShowModal.on("click", function () {
		$modalDetail.toggleClass("show");
		$btnItemOne.toggleClass("active");
		$btnItemThree.toggleClass("active");
	});

	$modalDetail.on("click", function () {
		$modalDetail.removeClass("show");
		$btnItemOne.toggleClass("active");
		$btnItemThree.toggleClass("active");
	});

	// SUBMENU TOGGLE
	$btnMoreNews.on("click", function (e) {
		e.stopPropagation();
		$subMenu.toggleClass("show");
		$iconMoreSvg.toggleClass("navbar__btn-svg--rotate");
	});

	$(window).on("click", function (e) {
		if (
			!$subMenu.is(e.target) &&
			!$subMenu.has(e.target).length &&
			!$btnMoreNews.is(e.target)
		) {
			$subMenu.removeClass("show");
			$iconMoreSvg.removeClass("navbar__btn-svg--rotate");
		}
	});

	// SCROLL EVENT
	$(window).on("scroll", function () {
		const scrollTop = $(this).scrollTop();
		const winHeight = $(window).height();
		const docHeight = $(document).height();

		if (scrollTop > 300) {
			$header.css({ color: "#8917ee", background: "#fafafa" });
			$logoSvg.addClass("logo__small");
			$btnDecorMessage.addClass("show");
			$navbar.addClass("navbar-viegazine--active");
		} else {
			$header.css({ color: "#fff", background: "transparent" });
			$logoSvg.removeClass("logo__small");
			$btnDecorMessage.removeClass("show");
			$navbar.removeClass("navbar-viegazine--active");
		}

		if (scrollTop > docHeight / 2 - winHeight) {
			$btnDecorFeedback.addClass("show");
		}

		if ($progressBar.length) {
			const progress = (scrollTop / (docHeight - winHeight)) * 100;
			$progressBar.css("width", progress + "%");
		}
	});

	// SWIPER SLIDE HOVER EFFECT
	$(".swiper-slide").on("mouseover", function () {
		const $slides = $(".swiper-slide");
		const currentIndex = $slides.index(this);

		$slides.each(function (i) {
			const $el = $(this);
			const gap = Math.abs(i - currentIndex);
			const translateX = (i < currentIndex ? 1 : -1) * (gap / 4) * 37;
			const scale = 1 - gap * 0.1;

			$el.css("z-index", 10 - gap);

			if (gap === 0) {
				$el.addClass("swiper-slide-active").css({
					transform: "translate3d(0,0,0) scale3d(1,1,1)",
				});
			} else {
				$el.removeClass("swiper-slide-active").css({
					transform: `translate3d(${translateX}px,0,0) scale3d(${scale},${scale},${scale})`,
				});
			}
		});
	});
});

// Video modal functionality
document.addEventListener("DOMContentLoaded", function () {
	// Get all video item links
	const videoLinks = document.querySelectorAll(".video-item-link");
	const videoModal = document.querySelector(".video-modal");
	const closeButton = document.querySelector(".video-modal__close-icon");
	const videoIframe = document.querySelector(".video-modal__iframe");

	// Function to open modal
	function openVideoModal(event) {
		event.preventDefault();

		// Get video data from data attributes if available
		const videoId = this.getAttribute("data-video-id");
		const videoTitle = this.getAttribute("data-title");
		const videoAuthor = this.getAttribute("data-author");
		const videoCategory = this.getAttribute("data-category");
		const videoDescription = this.getAttribute("data-description");

		// Update iframe source if videoId is available
		if (videoId) {
			videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&loop=0&fs=1&hl=vi&enablejsapi=1&origin=https://vietales.vn&widgetid=1&playsinline=1`;
		}

		// Update modal content if data is available
		if (videoTitle && document.querySelector(".video-modal__source")) {
			document.querySelector(".video-modal__source").textContent = videoTitle;
		}

		if (videoDescription && document.querySelector(".video-modal__desc")) {
			document.querySelector(".video-modal__desc").textContent = videoDescription;
		}

		// Show the modal
		videoModal.style.display = "block";

		// Prevent scrolling on body
		document.body.style.overflow = "hidden";
	}

	// Function to close modal
	function closeVideoModal() {
		videoModal.style.display = "none";

		// Stop video playback by resetting the src
		if (videoIframe) {
			const currentSrc = videoIframe.src;
			videoIframe.src = "";
			setTimeout(() => {
				videoIframe.src = currentSrc.replace("autoplay=1", "autoplay=0");
			}, 100);
		}

		// Re-enable scrolling
		document.body.style.overflow = "";
	}

	// Add click event listener to all video links
	videoLinks.forEach((link) => {
		link.addEventListener("click", openVideoModal);
	});

	// Add click event listener to close button
	if (closeButton) {
		closeButton.addEventListener("click", closeVideoModal);
	}

	// Close modal when clicking outside content area (optional)
	videoModal.addEventListener("click", function (event) {
		if (event.target === videoModal) {
			closeVideoModal();
		}
	});
});
