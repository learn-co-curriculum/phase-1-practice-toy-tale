const toysUrl = "http://localhost:3000/toys"
const divNotOnToysPage = document.querySelector('#toy-collection')

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

// function upDateLikesCounter() {
//   fetch(toysUrl, {
//     method: "POST",
//     headers: 
//     {
//       "Content-Type": "application/json", 
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "likes": newNumberOfLikes
//     })
//  })
//  }

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
  p.textContent = toy.likes

  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.innerText = 'Like'
  
  newCard.append(h2, img, p, button)
  divNotOnToysPage.append(newCard)
}


function fetchToys() {
  fetch(toysUrl)
  .then(Response => Response.json())
  .then(data => renderToy(data))

}

fetchToys()

document.addEventListener('click', (e) => {
  const likeBtn = document.getElementsByClassName('like-btn')
  const likesContainer = document.querySelector('div.card > p')
  const currentToyId = t
  const likeNumber = 
  if()
  let newNumberOfLikes = likesContainer.textContent++
   function upDateLikesCounter() {
    fetch(toysUrl, {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json", 
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
   })
   }
})
//save for review