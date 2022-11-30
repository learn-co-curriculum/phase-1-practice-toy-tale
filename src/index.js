// const { create } = require("json-server");

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

  fetchToyData();
  newToyListener();
});

function fetchToyData() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => displayToys(data));
}

function displayToys(toysArray) {
  toysArray.forEach(toy => {
    createToyCard(toy);
  });   

}

function createToyCard(toy) {
  const toyName = document.createElement("h2");
  toyName.textContent = toy.name;
  
  const toyImg = document.createElement("img");
  toyImg.className = "toy-avatar";
  toyImg.src = toy.image;
  
  const toyLikes = document.createElement("p");
  toyLikes.textContent = `Likes: ${toy.likes}`;
  
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.textContent = "like me!";
  
  const toyCard = document.createElement("div");
  toyCard.className = "card";
  toyCard.appendChild(toyName);
  toyCard.appendChild(toyImg);
  toyCard.appendChild(toyLikes);
  toyCard.appendChild(likeButton);
  
  const toyContainer = document.getElementById("toy-collection");
  toyContainer.appendChild(toyCard);
  
  likeBtnListener(toy.id, toy.likes);
}

function addNewToy(toyInfo) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyInfo)
  })
  .then(res => res.json())
  .then(toy => createToyCard(toy))
}

function newToyListener() {
  const newToyForm = document.querySelector("form");

  newToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToyInfo = {
      "name" : e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    }

    addNewToy(newToyInfo);
  });

}

function likeBtnListener(id, likes) {
  const likeBtn = document.getElementById(id);

  likeBtn.addEventListener("click", (e) => incrementLikes(id, likes));
}

function incrementLikes(id, likes) {

  const updatedLikes = ++likes;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": updatedLikes})
  })
}
