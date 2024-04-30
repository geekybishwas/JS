"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
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

// console.log("Heyyyyyyy");

// document.addEventListener("keydown", function (e) {
//     console.log(e);
// });

if (modal.classList.contains("hidden")) {
    console.log("Contains");
} else {
    console.log("Doesn't");
}

// console.log("Endinggggggggg");

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

//Selecting Element
console.log("Selecting Elements");
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log("Ending Selecting Elements");

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

// document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

//Creating and Inserting Elements
const message = document.createElement("div");
message.classList.add("cookie-message");

console.log("Message showing");
console.log(message);

message.innerHTML =
    'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got It!</button>';

// header.prepend(message); //Insert as the first child
header.append(message); //Insert as last child
// header.append(message.cloneNode(true)); //It is used to insert same child multiple times.

// header.before(message); //It is use to insert before the spcified element as a siblings
// header.after(message); //It is used to insert after the specified element as a siblings

//Delete ELement
document
    .querySelector(".btn--close-cookie")
    .addEventListener("click", function () {
        message.remove();
        // message.parentElement.removeChild(message);
    });

//Style
message.style.backgroundColor = "#37383d";
message.style.width = "130%";

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
    Number.parseInt(getComputedStyle(message).height, 10) + 30 + "px";
console.log(message.style.height);

// document.documentElement.style.setProperty("--color-primary", "orangered");

// //Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.className);

// //Non-standard,for getting non-standard attributes we have to use getAttrtibute function
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "cloud9");

// console.log(logo.src);
// console.log(logo.getAttribute("src"));

// const link = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("class"));

// //Data attributes
// console.log(logo.dataset.versionNumber);

// //Classes
// logo.classList.add("v");
// logo.classList.remove("v");
// logo.classList.toggle("v");
// logo.classList.contains("v");

//Implementing scroll

const btnScrollTo = document.querySelector(".btn--scroll-to");

const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
    console.log("getBoundingClientRect");
    const s1coods = section1.getBoundingClientRect();
    console.log(s1coods);

    console.log(e.target.getBoundingClientRect());

    console.log("Current scroll X/Y", window.pageXOffset, window.pageYOffset);

    //Get height and width of current webpage
    console.log(
        "height/width of view port",
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
    );

    console.log(s1coods.left, s1coods.top);

    //Scrolling
    // window.scrollTo(
    //     s1coods.left + window.pageXOffset,
    //     s1coods.top + window.pageYOffset
    // );

    //For smooth scrolling
    // window.scrollTo({
    //     left: s1coods.left + window.pageXOffset,
    //     top: s1coods.top + window.pageYOffset,
    //     behavior: "smooth",
    // });

    //Modern scrolling
    section1.scrollIntoView({
        behavior: "smooth",
    });
});

//Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();
//         const id = this.getAttribute("href");

//         document.querySelector(id).scrollIntoView({
//             behavior: "smooth",
//         });
//     });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target, e.currentTarget);

    //Matching strategy
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        console.log("Showing attribute");
        console.log(e.target.getAttribute("href"));

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
        });
    }
});

//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations_content");

tabsContainer.addEventListener("click", function (e) {
    console.log(e.target);
    const clicked = e.target.closest(".operations__tab");
    console.log(e.target.closest(".operations__tab"));

    //Guard Clause
    if (!clicked) return;

    //Remove Active tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));

    //Remove content areeas
    tabsContent.forEach((c) => {
        c.classList.remove("operations__content--active");
    });

    //Active tab
    clicked.classList.add("operations__tab--active");

    //ACTIVE content areas
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

//Menu fade animation

const nav = document.querySelector(".nav");

const handleHover = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        console.log(link, e.currentTarget);

        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        // console.log(siblings);

        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

//Passing argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener("scroll", function () {
//     console.log(window.scrollY);

//     if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//     else nav.classList.remove("sticky");
// });

//Sticky navigation: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickNav = function (entries) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickNav, {
    root: null,
    threshold: 0,
    rootMargin: `${-navHeight}px`,
});

headerObserver.observe(header);

//Reveal section
/* When you create an IntersectionObserver and specify a callback function, this callback function will be called initially for each observed target element that meets the criteria you specified. This means that when you first set up the observer, it will immediately call the callback function for all elements that are already in the viewport or meet the intersection criteria, even if no scrolling or intersection changes have occurred.*/
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// document.querySelectorAll("img[data_src]"); //Select all img tag whose has a property of data_src

// Lazy Loading Images
const imgTarget = document.querySelectorAll(".lazy-img");
console.log(imgTarget);

const loadImage = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    //When the browser finish loadig a images,it emit a load function
    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0.9,
});

imgTarget.forEach(function (image) {
    imageObserver.observe(image);
});
