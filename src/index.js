let addToy = false
const url = 'http://localhost:3000/toys/'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const toyCollection = document.querySelector('#toy-collection')
  const nameInput = document.querySelector('#name-input')
  const imgInput = document.querySelector('#image-input')
  const form = document.querySelector('.add-toy-form')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  const createElementWithText = (tag, text, className) => {
    const element = document.createElement(tag)
    element.textContent = text
    if (className) element.classList.add(className)
    return element
  }

  const createImage = (src, className) => {
    const img = document.createElement('img')
    img.src = src
    if (className) img.classList.add(className)
    return img
  }

  const createLikeButton = (toy, toyLikesElement) => {
    const btn = document.createElement('button')
    btn.textContent = 'Like ❤️'
    btn.classList.add('like-btn')
    btn.id = toy.id

    btn.addEventListener('click', () => {
      addLike(toy, toyLikesElement)
    })

    return btn
  }

  const addLike = (toy, toyLikesElement) => {
    fetch(`${url}${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: toy.likes + 1 })
      })
        .then(res => res.json())
        .then(updatedToy => {
          toy.likes = updatedToy.likes
          toyLikesElement.textContent = `${toy.likes} likes`
        })
  }

  const constructToy = (toy) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const name = createElementWithText('h2', toy.name)
    const img = createImage(toy.image, 'toy-avatar')
    const likes = createElementWithText('p', `${toy.likes} likes`)
    const likeBtn = createLikeButton(toy, likes)

    card.append(name, img, likes, likeBtn)

    toyCollection.appendChild(card)

    return card
  }

  const getToys = () => {
    fetch(url)
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => constructToy(toy))
      })
  }

  const postToy = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imgInput.value,
        likes: 0
      })
    })
      .then(response => response.json())
      .then(newToy => {
        constructToy(newToy)
        nameInput.value = ''
        imgInput.value = ''
      })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    postToy()
  })



  getToys()

})
