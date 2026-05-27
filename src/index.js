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

  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {

      toys.forEach(toy => {

        const card = document.createElement("div")
        card.className = "card"

        const h2 = document.createElement("h2")
        h2.textContent = toy.name

        const img = document.createElement("img")
        img.src = toy.image
        img.className = "toy-avatar"

        const p = document.createElement("p")
        p.textContent = `${toy.likes} Likes`

        const button = document.createElement("button")
        button.className = "like-btn"
        button.textContent = "Like ❤️"

        button.addEventListener("click", () => {

          const newLikes = toy.likes + 1

          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: newLikes
            })
          })
            .then(response => response.json())
            .then(updatedToy => {

              toy.likes = updatedToy.likes

              p.textContent = `${updatedToy.likes} Likes`

            })

        })

        card.append(h2)
        card.append(img)
        card.append(p)
        card.append(button)

        toyCollection.append(card)

      })
    })
  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener("submit", event => {
    event.preventDefault()

    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(response => response.json())
      .then(toy => {
        const card = document.createElement("div")
        card.className = "card"

        const h2 = document.createElement("h2")
        h2.textContent = toy.name

        const img = document.createElement("img")
        img.src = toy.image
        img.className = "toy-avatar"

        const p = document.createElement("p")
        p.textContent = `${toy.likes} Likes`

        const button = document.createElement("button")
        button.className = "like-btn"
        button.id = toy.id
        button.textContent = "Like ❤️"

        button.addEventListener("click", () => {

          const newLikes = toy.likes + 1

          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: newLikes
            })
          })
            .then(response => response.json())
            .then(updatedToy => {

              toy.likes = updatedToy.likes

              p.textContent = `${updatedToy.likes} Likes`

            })

        })

        card.append(h2, img, p, button)
        toyCollection.append(card)

        toyForm.reset()
      })
  })
});
