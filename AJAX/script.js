/*

"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//Using old ajax method.
//Create a XMLHttpRequest
const getCountryName = function (name) {
    const request = new XMLHttpRequest();

    //Open a connection to the specified url
    request.open("GET", `https://restcountries.com/v3.1/name/${name}`);

    request.send(); //Sends a request to the specified url

    //When request is done ,server emits the load event.
    request.addEventListener("load", function () {
        // console.log(this.responseText);

        //Converiting the json data into array of object of lenght 1,then destruct the array into object
        const [data] = JSON.parse(this.responseText);

        console.log(data);

        const html = `
    <article class="country">
          <img class="country__img" src="${data.flags["svg"]}" />
          <div class="country__data">
            <h3 class="country__name">${data.altSpellings[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${+(
                data.population / 1000000
            ).toFixed(2)} M</p>
            <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0]["name"]
            }</p>
          </div>
    </article>
    `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
};

getCountryName("nepal");

getCountryName("china");

getCountryName("india");
*/

"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, neighbourName = "") {
    const html = `
    <article class="country ${neighbourName}">
          <img class="country__img" src="${data.flags?.["svg"]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name["common"]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${+(
                data.population / 1000000
            ).toFixed(2)} M</p>
            <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0]["name"]
            }</p>
          </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};
/* 

//Using old ajax method to haldle multiple call back

//Gettig country and neighbour country
//Create a XMLHttpRequest
const getCountryNameandNeighbour = function (name) {
    const request = new XMLHttpRequest();

    //Open a connection to the specified url
    request.open("GET", `https://restcountries.com/v3.1/name/${name}`);

    request.send(); //Sends a request to the specified url

    //When request is done ,server emits the load event.
    request.addEventListener("load", function () {
        // console.log(this.responseText);

        //Converiting the json data into array of object of lenght 1,then destruct the array into object
        const [data] = JSON.parse(this.responseText);

        console.log(data);

        renderCountry(data);

        //Get neighbour country
        const neighbour = data.borders?.[0];

        if (!neighbour) return;

        //AJAX call country 2

        const request2 = new XMLHttpRequest();

        request2.open(
            "GET",
            `https://restcountries.com/v3.1/alpha/${neighbour}`
        );

        request2.send();

        request2.addEventListener("load", function () {
            const [data2] = JSON.parse(this.responseText);

            // console.log(data2);

            renderCountry(data2, "neighbour");
        });
    });
};

getCountryNameandNeighbour("nepal");

*/

const renderError = (msg) => {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, error = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${error} (${response.status})`);
        return response.json();
    });
};

//Using promises and fetch API
const getCountryData = function (country) {
    //Country 1
    getJSON(
        `https://restcountries.com/v3.1/name/${country}`,
        "Country not found"
    )
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];

            if (!neighbour) throw new Error("Neighbour not found");

            //Country 2
            return getJSON(
                `https://restcountries.com/v3.1/alpha/${neighbour}`,
                "Neighbour country doesn't found"
            );
        })
        .then((data) => {
            renderCountry(data[0], "neighbour");
        })
        .catch((err) =>
            renderError(`Something went wrong, ${err.message}. Try again`)
        );
};

getCountryData("Bhutan");

//Get country name using geocoding api
const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then((response) => {
            if (!response.ok)
                throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const getCountry = data.country;
            console.log(`You are in city ${data.city} ,${getCountry}.`);
            console.log(data);
            getCountryData(getCountry);
        })
        .catch((error) => {
            console.error(`${error.msg}`);
        });
};
// whereAmI(52.508, 13.381);

//Gets the current position of the user,it accepts two call back, one for success and another for deny
// navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
// );

//Promisifying geolocation
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => resolve(position),
        //     (err) => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
/*
getPosition()
    .then((data) => console.log(data.coords))
    .catch((err) => console.error(err));
*/

//Jumping into next Step without specifying the lag,lng

const whereIAm = function () {
    getPosition()
        .then((pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;

            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const getCountry = data.country;
            console.log(`You are in city ${data.city} ,${getCountry}.`);
            console.log(data);
            getCountryData(getCountry);
        })
        .catch((error) => {
            console.error(`${error.msg}`);
        });
};

// whereIAm();

//With await function

const whereAmIWithAwait = async function () {
    try {
        //Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        //Reverse Geocoding,get data based on lat and lng
        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        console.log(resGeo);
        const dataGeo = await resGeo.json();

        //Country Data
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${dataGeo.country}`
        );
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        renderCountry(data[0]);

        return `You are in ${dataGeo.city},${dataGeo.country}`;
    } catch (err) {
        renderError(err);
        console.error(`Error Detected: ${err.message}`);
    }
};

// whereAmIWithAwait()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err + "deteted"));

//Same as

//IIFE
// (async function () {
//     const data = await whereAmIWithAwait();
//     console.log(data);
// })();

const getCountries = async function (c1, c2, c3) {
    try {
        //Promise.all is a combinator function which allows us to combine multiple promises in parallel
        //Promise.all short circuit if there is one error,if there is one rejected promise
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`),
        ]);
        console.log(data);
        const capital = data.map((d) => d[0].capital);
        console.log(capital);
        console.log(capital.map((d) => d[0]));
    } catch (err) {
        console.error(err);
    }
};

getCountries("Nepal", "Portugal", "Canada");

//Other Promise Combinators

(async function () {
    //Returns array of promise
    //In Promise.race([]), each promise race against each other
    //It returns where the promise is resolve or rejected
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/nepal`),
        getJSON(`https://restcountries.com/v3.1/name/india`),
    ]);
    console.log(res[0]);
})();

//Promise.allSettled
//It doesn't short circuit ,if any of the promises get rejected,it returns an array of fullfilled promises either they are resolved or rejected
Promise.allSettled([
    Promise.resolve("Sucess"),
    Promise.reject("Error"),
    Promise.resolve("A Success"),
]).then((res) => console.log(res));

//Promise.any , it is very similar to Promise.race with the difference that rejected promises are ignored,thereofr the results of promise.any is always gonna be fullfilled promises
console.log("ss");
Promise.any([
    Promise.resolve("Sucess"),
    Promise.reject("Error"),
    Promise.resolve("A Success"),
]).then((res) => console.log(res));
