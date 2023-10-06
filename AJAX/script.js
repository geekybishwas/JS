// "use strict";

// const btn = document.querySelector(".btn-country");
// const countriesContainer = document.querySelector(".countries");

// //Create a XMLHttpRequest
// const getCountryName = function (name) {
//     const request = new XMLHttpRequest();

//     //Open a connection to the specified url
//     request.open("GET", `https://restcountries.com/v3.1/name/${name}`);

//     request.send(); //Sends a request to the specified url

//     //When request is done ,server emits the load event.
//     request.addEventListener("load", function () {
//         // console.log(this.responseText);

//         //Converiting the json data into array of object of lenght 1,then destruct the array into object
//         const [data] = JSON.parse(this.responseText);

//         console.log(data);

//         const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags["svg"]}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.altSpellings[0]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${+(
//                 data.population / 1000000
//             ).toFixed(2)} M</p>
//             <p class="country__row"><span>🗣️</span>${
//                 Object.values(data.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//                 Object.values(data.currencies)[0]["name"]
//             }</p>
//           </div>
//     </article>
//     `;
//         countriesContainer.insertAdjacentHTML("beforeend", html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryName("nepal");

// getCountryName("china");

// getCountryName("india");

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

//Gettig country and neighbour country
// //Create a XMLHttpRequest
// const getCountryNameandNeighbour = function (name) {
//     const request = new XMLHttpRequest();

//     //Open a connection to the specified url
//     request.open("GET", `https://restcountries.com/v3.1/name/${name}`);

//     request.send(); //Sends a request to the specified url

//     //When request is done ,server emits the load event.
//     request.addEventListener("load", function () {
//         // console.log(this.responseText);

//         //Converiting the json data into array of object of lenght 1,then destruct the array into object
//         const [data] = JSON.parse(this.responseText);

//         console.log(data);

//         renderCountry(data);

//         //Get neighbour country
//         const neighbour = data.borders?.[0];

//         if (!neighbour) return;

//         //AJAX call country 2

//         const request2 = new XMLHttpRequest();

//         request2.open(
//             "GET",
//             `https://restcountries.com/v3.1/alpha/${neighbour}`
//         );

//         request2.send();

//         request2.addEventListener("load", function () {
//             const [data2] = JSON.parse(this.responseText);

//             // console.log(data2);

//             renderCountry(data2, "neighbour");
//         });
//     });
// };

// getCountryNameandNeighbour("nepal");

//Using promises and fetch API
const getCountryData = function (country) {
    //Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];

            if (!neighbour) return;

            //Country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            renderCountry(data[0], "neighbour");
        });
};

getCountryData("USA");
