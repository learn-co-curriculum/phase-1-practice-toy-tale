let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})

const url = "http://localhost:4000/toys"
const toyCollection = document.querySelector("#toy-collection")
let allToys = []

const incrementLikes = ({ target }) => {
  const clickedToy = allToys.find((toy) => toy.id === target.id)
  const likes = clickedToy.likes

  fetch(`${url}/${target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: likes + 1 }),
  })
    .then((response) => response.json())
    .then((toy) => {
      const pTag = target.parentElement.querySelector("p")

      pTag.innerText = `${toy.likes} Likes`
      clickedToy.likes++
    })
}

const appendToy = (toy) => {
  const card = document.createElement("div")
  card.className = "card"
  const header = document.createElement("h2")
  header.innerText = toy.name
  card.appendChild(header)

  const image = document.createElement("img")
  image.src = toy.image
  image.className = "toy-avatar"
  card.appendChild(image)

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`
  card.appendChild(p)

  const button = document.createElement("button")
  button.className = "like-btn"
  button.setAttribute("id", toy.id)
  button.innerText = "Like ❤️"
  button.addEventListener("click", incrementLikes)
  card.appendChild(button)

  toyCollection.appendChild(card)
}

fetch(url)
  .then((response) => response.json())
  .then((toys) => {
    allToys = toys
    toys.forEach(appendToy)
  })

const form = document.querySelector(".add-toy-form")
const nameInput = form.querySelector("input[name=name]")
const imageInput = form.querySelector("input[name=image]")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then(appendToy)
})
