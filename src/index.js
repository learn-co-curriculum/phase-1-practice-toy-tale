const API = 'http://localhost:3000/toys'
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    console.log("Clicking Button!")
    // hide & seek with the form
    addToy = !addToy;
    console.log(addToy)
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
  console.log("inside appendToys", toys)
  const toysArray = toys.forEach((toy) => {
    const toyCollectionDiv = document.getElementById('#toy-collection')
    const toyCardDiv = document.createElement('div')
    const toyNameH2 = document.createElement('h2')
    const toyImage = document.createElement('img')
    const toyCardLikesCount = document.createElement('p')
    const toyLikeButton = document.createElement('button')
    toyCardDiv.setAttribute('class', 'card')
    toyNameH2.innerText = toy.name
    toyImage.setAttribute("src", toy.image)
    toyImage.setAttribute("class", "toy-avatar")
    toyLikeButton.setAttribute("class", "like-btn")
    toyLikeButton.setAttribute("id", toy.id)
    toyLikeButton.innerText = "Like ❤️"
    toyCardDiv.append(toyNameH2)
    toyCardDiv.append(toyImage)
    toyCardDiv.append(toyCardLikesCount)
    toyCardDiv.append(toyLikeButton)
    toyCollectionDiv.append(toyCardDiv)
  })
}


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