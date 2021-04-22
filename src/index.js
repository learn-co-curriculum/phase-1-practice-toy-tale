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
  card.innerHTML = `
  <h2> ${toy.name} </h2>
  <img src="${toy.image}" class="toy-avatar"/>
  <p> Likes = ${toy.likes} </p>
  `
const button = document.createElement("button")
button.innerText = "Like"
collection.appendChild(card)
card.appendChild(button)
return button
}
//document.addEventListener('click' , )
console.log(button)