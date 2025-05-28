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

  const toysUrl = "http://localhost:3000/toys";
  const toyCollection = document.querySelector("#toy-collection");
  const submitBtn = document.querySelector("input.submit");

  fetch(toysUrl)
    .then((response) => response.json())
    .then((toyData) => toyData.forEach((toy) => createCard(toy)));

  function createCard(toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;
    const toyAvatar = document.createElement("img");
    toyAvatar.src = toy.image;
    toyAvatar.className = "toy-avatar";
    const toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} likes`;
    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.id = toy.id;
    likeButton.textContent = "Like ❤️";
    toyCollection.append(toyCard);
    toyCard.append(toyName, toyAvatar, toyLikes, likeButton);
  }

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("input.name").value;
    const imgInput = document.querySelector("input.image").value;

    const newToy = {
      name: nameInput,
      image: imgInput,
      likes: 0,
    };

    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => createCard(toy));
  });
});
