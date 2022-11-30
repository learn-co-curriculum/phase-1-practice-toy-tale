// once the DOM Content loads...
document.addEventListener("DOMContentLoaded", () => {
    // set up the add toy form
    buildAddToyForm();

    // fetch toys
    fetch("http://localhost:3000/toys")
        .then(response => response.json())
        // once toys are fetched, render a card for each toy by calling createToyCard()
        .then(toys => toys.forEach(toy => createToyCard(toy)))
});

function buildAddToyForm() {
    // starter code for the form display:
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

    // add submit event listener to form
    toyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // on submit, the form triggers the addNewToy function
        addNewToy();

        // reset form inputs to empty
        toyForm.reset();
    })
}

function createToyCard(toy) {
    // create div for toy card
    // create elements for header, image, etc
    const toyCard = document.createElement("div");
    const toyCollection = document.getElementById("toy-collection");
    const toyName = document.createElement("h2");
    const toyImg = document.createElement("img");
    const toyLikes = document.createElement("p");
    const likeButton = document.createElement("button");

    // insert content and/or apply class names and IDs to elements
    toyCard.className = "card";
    toyName.innerText = toy.name;
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";
    toyLikes.innerText = `Likes: ${toy.likes}`;
    likeButton.className = "like-btn";
    likeButton.innerText = "Like ❤️";
    likeButton.id = toy.id;

    // append elements to card
    // append card to collection
    toyCard.append(toyName, toyImg, toyLikes, likeButton);
    toyCollection.append(toyCard);
}

function addNewToy() {
    // create a new object (same shape as toy objects in DB)
    // grab form inputs with .value
    // "id" key not included because DB adds it automatically
    const newToy = {
        "name": document.getElementById("new-name").value,
        "image": document.getElementById("new-image").value,
        "likes": 0
    };

    // send a fetch POST request to toys endpoint
    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        // the body of the request is the newToy object just created
        body: JSON.stringify(newToy)
    })
        .then(res => res.json())
        // after the fetch, create a toy card for the new toy
        .then(toy => createToyCard(toy))
}