let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  function renderToyCard(toy) {
    const card = document.createElement("div");
    card.className = "card";
    
    const h2 = document.createElement("h2");
    h2.textContent = toy.name;

    const img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";

    const p = document.createElement("p");
    
    const likeCountSpan = document.createElement("span");
    likeCountSpan.className = "like-count";
    likeCountSpan.textContent = toy.likes;

    p.appendChild(likeCountSpan);
    p.appendChild(document.createTextNode(" Likes"));

    const button = document.createElement("button");
    button.className = "like-btn";
    button.id = toy.id;
    button.textContent = "Like ❤️";

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);

    toyCollection.appendChild(card);
  }
 
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach(toy => renderToyCard(toy));
    });

  
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = event.target.name.value;
    const imageInput = event.target.image.value;

    const configObj = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0
      })
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(newToy => {
        renderToyCard(newToy); 
        toyForm.reset();
      });
  });

  toyCollection.addEventListener("click", (event) => {
    if (event.target.className === "like-btn") {
      const button = event.target;
      const card = button.closest(".card");
      const likeSpan = card.querySelector(".like-count");
      
      const currentLikes = parseInt(likeSpan.textContent, 10);
      const newLikes = currentLikes + 1;

      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
      };

      fetch(`http://localhost:3000/toys/${button.id}`, configObj)
        .then(response => response.json())
        .then(updatedToy => {
          likeSpan.textContent = updatedToy.likes;
        });
    }
  });
});
