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
  function showToy(toy) {
    const toyCollection = document.querySelector("#toy-collection");
    const card = document.createElement("div");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = toy.name;

    const img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";

    const p = document.createElement("p");
    p.textContent = toy.likes + " Likes";

    const btn = document.createElement("button");
    btn.className = "like-btn";
    btn.id = toy.id;
    btn.textContent = "Like ❤️";
    btn.addEventListener("click", (e) => {
      const toyId = e.target.id;
      const p = e.target.parentElement.querySelector("p");
      const currentLikes = parseInt(p.textContent);

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: currentLikes + 1 }),
      })
        .then((res) => res.json())
        .then((updatedToy) => {
          p.textContent = updatedToy.likes + " Likes";
        });
    });

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(btn);

    toyCollection.appendChild(card);
  }
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => showToy(toy));
    });

  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("input[name='name']").value;
    const image = document.querySelector("input[name='image']").value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name, image: image, likes: 0 }),
    })
      .then((res) => res.json())
      .then((newToy) => showToy(newToy));
  });
});


