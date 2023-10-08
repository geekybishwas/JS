"use strict";

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const imgContainer = document.getElementsByClassName("images")[0];

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement("img");
        img.src = imgPath;

        img.addEventListener("load", function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};
let currentImage;
createImage("1.png")
    .then((img) => {
        currentImage = img;
        console.log("Image 1 Loaded");
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = "none";
        return createImage("2.png");
    })
    .then((img) => {
        currentImage = img;
        console.log("2 image loaded");
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = "none";
    })
    .catch((err) => console.error(err));
