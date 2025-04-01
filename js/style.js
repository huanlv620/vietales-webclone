const modal = document.querySelector("#modal");
const iconSearch = document.querySelector(".header__icon-search");
const modalIconArrow = document.querySelector(".modal__icon-arrow");

const audio = document.getElementById("background-music");
const playPauseButton = document.getElementById("play-pause-button");
const playIcon = document.getElementById("play-music");
const pauseIcon = document.getElementById("pause-music");
let isPlaying = false;


const header = document.querySelector(".header");

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

// particlesJS("particles-js", {
// 	particles: {
// 		number: {
// 			value: 180,
// 			density: {
// 				enable: true,
// 				value_area: 800,
// 			},
// 		},
// 		color: {
// 			value: "#fff",
// 		},
// 		shape: {
// 			type: "circle",
// 		},
// 		opacity: {
// 			value: 0.3,
// 			random: false,
// 			anim: {
// 				enable: false,
// 				speed: 4,
// 				opacity_min: 0.1,
// 				sync: false,
// 			},
// 		},
// 		size: {
// 			value: 4,
// 			random: true,
// 			anim: {
// 				enable: true,
// 				speed: 2,
// 				size_min: 0.1,
// 				sync: false,
// 			},
// 		},
// 		line_linked: {
// 			enable: false,
// 		},
// 		move: {
// 			enable: true,
// 			speed: 0.4,
// 			direction: "right",
// 			random: true,
// 			straight: false,
// 			out_mode: "none",
// 			bounce: false,
// 			attract: {
// 				enable: false,
// 				rotateX: 600,
// 				rotateY: 1200,
// 			},
// 		},
// 	},
// 	retina_detect: true,
// });

// Call the function when the DOM is fully loaded

// Add scroll event listener to change header background color


const logo = document.querySelector(".logo")
const logoSvg= document.querySelector(".logo__svg")

console.log(logoSvg)

window.addEventListener("scroll", () => {
	if (window.scrollY > 300) {
		header.style.color ="#8917ee"
		header.style.background ="#fff"
		logoSvg.classList.add("logo__small")
	} else {
		header.style.color ="#fff"
		header.style.background ="transparent"
		logoSvg.classList.remove("logo__small")
	}
});

console.log(logo)
