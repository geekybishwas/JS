// Create a new element (e.g., a <div>)
var newElement = document.createElement("img");

// Set some properties or attributes for the new element (optional)
newElement.textContent = "This is a new element";

// Get a reference to an existing element in the DOM where you want to append the new element
const parentElement = document.querySelector(".countries"); // Replace 'parent' with the ID or reference to your target element

console.log(parentElement);

// Append the new element to the parent element
// parentElement.appendChild(newElement);
