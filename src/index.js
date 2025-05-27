let addToy = false;
const url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  loadToys();
  toyForm.addEventListener('submit', createAndDisplayToy)
});

const loadToys = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => displayToy(toy)))
}

const createAndDisplayToy = (submitEvent) => {
  submitEvent.preventDefault()
  createToy()
}

const createToy = () => {
  const nameInput = document.querySelector('input[name="name"]')
  const imageInput = document.querySelector('input[name="image"]')
  if (imageInput.value && nameInput.value) {
    const options = {
      body: JSON.stringify({ name: nameInput.value, image: imageInput.value, likes: 0 }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(url, options)
      .then(resp => resp.json())
      .then(data => displayToy(data))
      .catch(err => console.log(err.message))
    nameInput.value = ""
    imageInput.value = ''
  } else {
    console.log("You're missing an image url or name...")
  }
}

const displayToy = (toy) => {
  const toyCollectionDiv = document.querySelector('#toy-collection')
  const toyCardDiv = document.createElement('div')
  toyCardDiv.classList.add('card')
  const header2 = document.createElement('h2')
  header2.textContent = toy.name
  toyCardDiv.appendChild(header2)
  const image = document.createElement('img')
  image.src = toy.image
  image.classList.add('toy-avatar')
  toyCardDiv.appendChild(image)
  const likes = document.createElement('p')
  likes.textContent = `${toy.likes} likes`
  toyCardDiv.appendChild(likes)
  const likeButton = document.createElement('button')
  likeButton.classList.add('like-btn')
  likeButton.id = toy.id
  likeButton.textContent = "Like ❤️"
  likeButton.addEventListener('click', addLike)
  toyCardDiv.appendChild(likeButton)
  toyCollectionDiv.appendChild(toyCardDiv)
}

function addLike() {
  const toyId = this.id
  const toyCardDiv = this.parentNode
  const currLikeCount = Number.parseInt(toyCardDiv.querySelector('p').textContent.split(' ')[0])
  const options = {
    body: JSON.stringify({ likes: currLikeCount + 1 }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch(url + `/${toyId}`, options)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      toyCardDiv.querySelector('p').textContent = `${currLikeCount + 1} like${currLikeCount + 1 === 1 ? '' : 's'}`
    })
    .catch(err => console.log(err.message))
}
