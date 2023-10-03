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

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

//Selecting Element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

// document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

//Creating and Inserting Elements
const message = document.createElement("div");
message.classList.add("cookie-message");

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

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

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
// console.log(link.getAttribute("href"));

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

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
        });
    }
});

//Tabbed Component
