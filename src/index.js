const API = 'http://localhost:3000/toys'
let addToy = false;

const formToAddToyHTMLCollection = document.getElementsByClassName('add-toy-form')
const formToAddToyArray = Array.from(formToAddToyHTMLCollection)  
const formToAddToyDiv = formToAddToyArray[0]

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container"); 
    fetch(API)
    .then((r) => r.json())
      .then((toys) => appendToyCard(toys))
      .catch(console.error)
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  })

});

formToAddToyDiv.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target))

  // const data = {
  //   toyName: event.target[0].value,
  //   toyImage: event.target[1].value,
  // }

  console.log(data)
  data.likes = 0;

  fetch(API, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((r) => r.json())
    .then((data) => console.log(data))
  }) 


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



    toyCardDiv.append(toyNameH2, toyImage, toyCardLikesCount, toyLikeButton)
    toyCollectionDiv.append(toyCardDiv)
  })
}


const addNewToy = () => {
  return 
}


addNewToy()
appendToyCard()