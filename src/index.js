document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  const toyCollection = document.getElementById("toy-collection");

  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((items) => {
      renderToys(items);
    });

  let addToy = false;

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newToy = {
      name: formData.get("name"),
      image: formData.get("image"),
      likes: 0,
    };
    createItem(newToy);
    form.reset();
  });

  function renderToys(items) {
    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";

      const image = document.createElement("img");
      image.src = item.image;
      image.className = "toy-avatar";

      const name = document.createElement("h3");
      name.innerText = `Name: ${item.name}`;

      const likesCount = document.createElement("p");
      likesCount.innerText = `Likes: ${item.likes}`;

      const likesBtn = document.createElement("button");
      likesBtn.className = "like-btn";
      likesBtn.textContent = "Like";

      likesBtn.addEventListener("click", () => {
        const newLikes = item.likes + 1;

        fetch(`http://localhost:3000/toys/${item.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ likes: newLikes }),
        })
          .then((response) => response.json())
          .then((updatedToy) => {
            item.likes = updatedToy.likes;
            likesCount.innerText = `Likes: ${item.likes}`;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });

      div.appendChild(image);
      div.appendChild(name);
      div.appendChild(likesCount);
      div.appendChild(likesBtn);
      toyCollection.appendChild(div);
    });
  }

  function createItem(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdItem) => {
        renderToys([createdItem]);
      });
  }
});
