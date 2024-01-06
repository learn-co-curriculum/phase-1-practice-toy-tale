const API = 'http://localhost:3000/toys'
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function getToys() {
  fetch(API)
  .then((r) => r.json())
  .then((toys) => appendToyCard(toys))
  .catch(console.error)
}


function appendToyCard(toys) {
  const toysArray = toys.forEach((toy) => {
    const toyCollectionDiv = document.getElementById('#toy-collection')
    const toyCardDiv = document.createElement('div')
    const toyNameH2 = document.createElement('h2')
    const toyImage = document.createElement('img')
    const toyCardLikesCount = document.createElement('p')
    const toyLikeButton = document.createElement('button')
    const toyId = toy.id
    toyCardDiv.setAttribute('class', 'card')
    toyNameH2.textContent = toy.name
    toyImage.setAttribute("src", toy.image)
    toyImage.setAttribute("class", "toy-avatar")
    toyLikeButton.setAttribute("class", "like-btn")
    toyLikeButton.setAttribute("id", toy.id)
    toyLikeButton.innerText = "Like ❤️"
    toyCardLikesCount.innerText = `Likes: ${toy.likes}`



    toyCardDiv.append(toyNameH2)
    toyCardDiv.append(toyImage)
    toyCardDiv.append(toyCardLikesCount)
    toyCardDiv.append(toyLikeButton)
    toyCollectionDiv.append(toyCardDiv)
  })
}

const formToAddToyHTMLCollection = document.getElementsByClassName('add-toy-form')
const formToAddToyArray = Array.from(formToAddToyHTMLCollection)  
const formToAddToyDiv = formToAddToyArray[0]
console.log(formToAddToyDiv)

const addNewToy = () => {


}

formToAddToyDiv.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(e)
  console.log(e.target[0].value)
  console.log(e.target[1].value)
  console.log(e.target[2].value)
})

addNewToy()

/* 

<div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div>

*/

getToys()
appendToyCard()