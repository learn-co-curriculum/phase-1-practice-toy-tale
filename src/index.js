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
  }),
document.addEventListener('submit', () => {

const newToyImg = document.querySelector('input#image')
console.log(newToyImg)
const newToyName = document.querySelector('input#name')


fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name":newToyName.value,
    "image":newToyImg.value,
    "likes": 0
  })
})
.then(resp => resp.json())
.then(toyX => cardRender(toyX))
});
});
//Rendering the API data to webpage

 fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => cardsRender(data))
  .catch(error => console.error(error))

function cardsRender(toys){
  toys.forEach(toy => {
    cardRender(toy)
  })
}

function cardRender(toy){
  const card = document.createElement("a")
  const collection = document.getElementById('toy-collection')
  card.className = 'card'

  const button = document.createElement("button")
  button.innerText = "Like"
  button.id = "cardsButton"
  
  card.innerHTML = `
  <h2> ${toy.name} </h2>
  <img src="${toy.image}" class="toy-avatar"/>
  <p> Likes = ${toy.likes} </p>
  `
  collection.appendChild(card);  card.appendChild(button)
}
const form = document.querySelector('form')


// function renderNewToy(toyX){
//   const card = document.createElement("a")
//   const collection = document.getElementById('toy-collection')
//   card.className = 'card'

//   const button = document.createElement("button")
//   button.innerText = "Like"
//   button.id = "cardsButton"
  
//   card.innerHTML = `
//   <h2> ${toyX.name} </h2>
//   <img src="${toyX.image}" class="toy-avatar"/>
//   <p> Likes = ${toyX.likes} </p>
//   `
//   collection.appendChild(card);  card.appendChild(button)
// }
