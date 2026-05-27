const newEle = (tag) => document.createElement(tag)
let addToy = false
const baseUrl = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const toyInput = document.querySelector(".add-toy-form")

  toyInput.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    if (formData.get("name") != "" && formData.get("image") != "") {
      newToy(formData.get("name"), formData.get("image"))
      toyInput.reset()
    } else {
      alert("Please fill in both form inputs.")
    }
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  getToys()
})

function getToys() {
  const toyCollection = document.getElementById("toy-collection")

  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((toys) => {
      const cardArr = []
      for (const toy of toys) {
        const toyCard = newEle("div")
        const cardName = newEle("h2")
        const cardImg = newEle("img")
        const cardLkes = newEle("p")
        const cardBtn = newEle("button")
        const delBtn = newEle("button")

        toyCard.classList.add("card")
        cardImg.classList.add("toy-avatar")
        cardBtn.classList.add("like-btn")
        delBtn.classList.add("del-btn")

        cardName.textContent = toy.name
        cardImg.src = toy.image
        cardLkes.textContent = `Likes: ${toy.likes}`
        cardBtn.id = toy.id
        cardBtn.textContent = "Like ❤️"
        cardBtn.addEventListener("click", (e) => {
          likeToy(e.target)
        })
        delBtn.id = toy.id
        delBtn.textContent = "X"
        delBtn.addEventListener("click", (e) => {
          if (confirm("Are you sure you want to delete this toy?")) {
            deleteToy(e.target)
          }
        })

        toyCard.append(delBtn, cardName, cardImg, cardLkes, cardBtn)
        cardArr.push(toyCard)
      }
      toyCollection.replaceChildren(...cardArr)
    })
}

function newToy(name, imgURL) {
  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      image: imgURL,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getToys()
    })
}

function likeToy(likeBtn) {
  const currLikes = +likeBtn.parentElement
    .getElementsByTagName("p")[0]
    .textContent.slice(7)
  fetch(baseUrl + likeBtn.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      likes: currLikes + 1,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getToys()
    })
}

function deleteToy(delBtn) {
  fetch(baseUrl + delBtn.id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      getToys()
    })
}
