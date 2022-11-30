// const { create } = require("json-server");

// 1. fetch toys
// fetch GET request

// 2. add toy info to the card
// for each toy in toys array:
// create new div with class "card"
// append that card to "#toy-collection" div


document.addEventListener("DOMContentLoaded", () => {
    displayAddToyForm();

    fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(toys => renderToys(toys))
});

function displayAddToyForm() {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const toyForm = document.querySelector("#add-toy-form");

    let addToy = false;

    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
        toyFormContainer.style.display = "block";
        } else {
        toyFormContainer.style.display = "none";
        }
    });

    toyForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // on submit, the form triggers the addNewToy function
        addNewToy()
        
        fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(toys => toys.forEach((toy) => createToyCard(toy)))

        toyForm.reset()
    })
}

function createToyCard(toy) {
    const toyCard = document.createElement("div")
    const toyCollection = document.getElementById("toy-collection")
    const toyName = document.createElement("h2")
    const toyImg = document.createElement("img")
    const toyLikes = document.createElement("p")
    const likeButton = document.createElement("button")

    toyCard.className = "card"
    toyName.innerText = toy.name
    toyImg.src = toy.image
    toyImg.className = "toy-avatar"
    toyLikes.innerText = `Likes: ${toy.likes}`
    likeButton.className = "like-btn"
    likeButton.innerText = "Like ❤️"
    likeButton.id = toy.id

    toyCard.append(toyName, toyImg, toyLikes, likeButton)
    toyCollection.append(toyCard)
}

// 3. add new toy to db and display it without reloading page
// 3a. POST to db
//// target the new toy form & add event listener
//// grab new toy form input
//// create new object from that input
//// POST that new object to db.json
// 3b. renderToys() again with new toy included

function addNewToy(toyInfo) {
    // create a new object (same shape as toy objects in DB)
    // grabs form inputs with .value
    // "id" key not included because DB adds it automatically
    const newToy = {
        "name": document.getElementById("new-name").value,
        "image": document.getElementById("new-image").value,
        "likes": 0
    }

    // send a fetch POST request to toys endpoint
    // the body of the request is the newToy object just created


    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(newToy)
    })
    // after the fetch, create a toy card for the new toy
        .then(res => res.json())
        .then(toy => createToyCard(toy))
}
