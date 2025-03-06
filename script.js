"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// create and insert element
const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  "we use cookied for improved functionality and analytics. <button class='btn btn-close-cookie'>Got it!</button>";

header.append(message);

// delete element after clicking button
document
  .querySelector(".btn-close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// add auto scoll
const btnScollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScollTo.addEventListener("click", function () {
  section1.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
});

// navbar auto scoll
const navBar = document.querySelector(".nav");
const featureSec = document.querySelector("#section--1");
const operationSec = document.querySelector("#section--2");
const testimonialSec = document.querySelector("#section--3");

navBar.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id == "features_nav") {
    featureSec.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else if (e.target.id == "operations_nav") {
    operationSec.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else if (e.target.id == "testimonials_nav") {
    testimonialSec.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
});

// achieve tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  // console.log(clicked);
  clicked.classList.add("operations__tab--active");
  tabs.forEach((tab) => {
    if (tab !== clicked) tab.classList.remove("operations__tab--active");
  });

  const content = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  // console.log(content);
  content.classList.add("operations__content--active");
  tabsContent.forEach((con) => {
    if (con !== content) con.classList.remove("operations__content--active");
  });
});

// fade navbar
function handleHover(e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    link.closest(".nav").querySelector(".nav__logo").style.opacity = opacity;
  }
}
navBar.addEventListener("mouseover", (e) => {
  handleHover(e, 0.5);
});

navBar.addEventListener("mouseout", (e) => {
  handleHover(e, 1);
});

// sticky navbar
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function (e) {
//   if (window.scrollY > initialCoords.top) {
//     navBar.classList.add("sticky");
//   } else {
//     navBar.classList.remove("sticky");
//   }
// });

const options = {
  root: null,
  rootMargin: "90%",
  threshold: 0.9,
};

const observer = new IntersectionObserver(function (e) {
  if (e[0].isIntersecting) {
    navBar.classList.remove("sticky");
  } else {
    navBar.classList.add("sticky");
  }
}, options);

observer.observe(header);

// reveal section
const allSections = document.querySelectorAll(".section");

const optionsSection = {
  root: null,
  threshold: 0.15,
};

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, optionsSection);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  rootMargin: "-200px",
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider component
let curSlide = 0;
const slides = document.querySelectorAll(".slide");
const maxSlide = slides.length;
const dotContainer = document.querySelector(".dots");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

gotoSlide(0);

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = Number(e.target.dataset.slide);
    gotoSlide(slide);
    activateDot(slide);
  }
});

function activateDot(slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}
