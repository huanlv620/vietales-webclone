const modal = document.querySelector("#modal");
const iconSearch = document.querySelector(".header__icon-search");
const modalIconArrow = document.querySelector(".modal__icon-arrow");

const audio = document.getElementById("background-music");
const playPauseButton = document.getElementById("play-pause-button");
const playIcon = document.getElementById("play-music");
const pauseIcon = document.getElementById("pause-music");
let isPlaying = false;

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

// Slider swiper
function findMissingNumber(arr) {
	let n = arr.length + 1;
	let sum = arr[0];

	for (let i = 1; i < arr.length; i++) {
		sum += arr[i];
	}

	let sumMax = (n * (n + 1)) / 2;
	return sumMax - sum;
}

function togglePlayPause() {
	if (isPlaying) {
		audio.pause();
		playIcon.classList.remove("hidden");
		pauseIcon.classList.add("hidden");
	} else {
		audio.play();
		playIcon.classList.add("hidden");
		pauseIcon.classList.remove("hidden");
	}
	isPlaying = !isPlaying;
}

// playPauseButton.addEventListener("click", togglePlayPause);

var swiper = new Swiper(".swiper", {
	grabCursor: true,
	initialSlide: 4,
	centeredSlides: true,
	slidesPerView: "auto",
	spaceBetween: 10,
	speed: 1000,
	freeMode: false,
	mousewheel: {
		thresholdDelta: 30,
	},
	pagination: {
		el: ".swiper-pagination",
	},
	on: {
		click(event) {
			swiper.slideTo(this.clickedIndex);
		},
	},
});

// Gộp sự kiện scroll
window.addEventListener("scroll", () => {
	const scrollPosition = window.scrollY;
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight;

	// Cập nhật header khi cuộn
	if (scrollPosition > 300) {
		header.style.color = "#8917ee";
		header.style.background = "#fff";
		logoSvg.classList.add("logo__small");
		buttonDecorMessage.classList.add("show");
	} else {
		header.style.color = "#fff";
		header.style.background = "transparent";
		logoSvg.classList.remove("logo__small");
		buttonDecorMessage.classList.remove("show");
	}

	// Hiển thị feedback khi cuộn đến nửa trang
	if (scrollPosition > (documentHeight / 2 - windowHeight)) {
		buttonDecorFeedback.classList.add("show");
	}
});