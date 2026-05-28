let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const url = "http://localhost:3000/toys";
fetch(url)
  .then(response => response.json())
.then(toys => {
  toys.forEach(toy => {
    console.log(toy)

  // to create elements
  const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src = "${toy.image}" class= "toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class = "like-btn" id="${toy.id}"> Like ❤️</button>`;

    document.querySelector('#toy-collection').append(toyCard);

const button = toyCard.querySelector(".like-btn");

button.addEventListener("click", () => {

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then(response => response.json())
    .then(updatedToy => {

  toy.likes = updatedToy.likes;

  button.previousElementSibling.textContent =
    `${updatedToy.likes} Likes`;

})

});

  });
})
.catch((err) => console.log("Can't access " + url + " response. Blocked by browser?" + err));


//POST request: http://localhost:3000/toys ###Add a New Toy
const toyNameInput = document.querySelector('input[name="name"]');
const toyImgInput = document.querySelector('input[name="image"]');
const toyForm = document.querySelector(".add-toy-form");
toyForm.addEventListener("submit", event => {
  event.preventDefault();
  newToy();
});
async function newToy() {
  fetch("http://localhost:3000/toys", {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   Accept: "application/json"
 },
 
 body: JSON.stringify({
   "name": toyNameInput.value ,
   "image": toyImgInput.value,
   "likes": 0
 })
})
.then(response => response.json())
.then(toy => {

  const toyCard = document.createElement("div");
  toyCard.className = "card";

  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`;

  document.querySelector("#toy-collection").append(toyCard);

const button = toyCard.querySelector(".like-btn");

button.addEventListener("click", () => {

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then(response => response.json())
    .then(updatedToy => {

  toy.likes = updatedToy.likes;

  button.previousElementSibling.textContent =
    `${updatedToy.likes} Likes`;

})

})

})


}





//get request fetching toy objects, make a div = class="card" for ech toy
    // look in db.json for links
  //include h2 for each toy, 
  //img src for each toy, class name 'toy-avatar"
  //p tag for likes
  // button tage w class of 'like-btn', id set to number