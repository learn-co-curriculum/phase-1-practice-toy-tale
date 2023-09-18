const toysUrl = "http://localhost:3000/toys"
const divNotOnToysPage = document.querySelector('#toy-collection')

const newToyForm = document.querySelector('.add-toy-form')

newToyForm.addEventListener('submit', e => {
  e.preventDefault()
  const newName = e.target.name.value
  const newImage = e.target.image.value
  const newLikes = 0

  const newToy = {
    name: newName,
    image: newImage,
    likes: newLikes
  }
  renderToyCard(newToy)
})

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
});


function fetchToys() {
  fetch(toysUrl)
  .then(r => r.json())
  .then(data => renderToy(data))

}
fetchToys()

function renderToy(toys) {
  toys.forEach((toy) => renderToyCard(toy))
}

function renderToyCard(toy) {
  const newCard = document.createElement('div')
  newCard.className = 'card'   

  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image

  const p = document.createElement('p')
  p.textContent = toy.likes + ' likes'

  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.innerText = 'Like ❤️'
  button.addEventListener('click', updateLikes)
  
  newCard.append(h2, img, p, button)
  divNotOnToysPage.append(newCard)

}

function updateLikes(likeButtonObject) {
  const theClickedCard = likeButtonObject.target.parentElement
  const likesContainer = theClickedCard.querySelector('p')
  const previousLikes = likesContainer.innerText
  const stringSplitToArray = previousLikes.split(' ')
  ++stringSplitToArray[0]
  likesContainer.innerText = stringSplitToArray.join (' ')
      }
