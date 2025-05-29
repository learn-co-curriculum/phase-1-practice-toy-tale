const toyContainer = document.querySelector("#toy-collection")
const toysUrl = "http://localhost:3000/toys"
const inputForm = document.querySelector("form")
const [nameInput, imageInput] = document.querySelectorAll("input")

let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  fetch(toysUrl)
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => renderCollection(toy))
    })

  const postNewToy = (name, image, likes) => {
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes,
      }),
    })
      .then((res) => res.json())
      .then((newToy) => {
        renderCollection(newToy)
      })
  }

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const name = nameInput.value
    const image = imageInput.value
    const likes = 0
    postNewToy(name, image, likes)
  })

  const renderCollection = (toy) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p class="likes">${toy.likes} Likes</p>`
    const likeButton = document.createElement("button")
    likeButton.classList.add("like-button")
    likeButton.id = `${toy.id}`
    likeButton.textContent = "Like ❤️"
    toyContainer.appendChild(card)
    card.appendChild(likeButton)

    const likeText = card.querySelector(".likes")
    likeButton.addEventListener("click", () => {
      toy.likes++
      likeText.innerText = `${toy.likes} Likes`
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: toy.likes,
        }),
      })
        .then((response) => response.json())
        .then(console.log)
        .catch((error) => console.error("Error:", error))
    })
  }
})
