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
  toyFetcher()
});

function toyFetcher(){
 fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => cardsRender(data))
  .catch(error => console.error(error))
  console.log(data)
}

function cardsRender(toys){
  const card = document.createElement("a")
  const collection = document.getElementById('toy-collection')
  card.className = 'cards'
  
  card.innerHTML = `
  <h2> ${toys.name} </h2>
  <img src="${toys.image}" />
  `
collection.appendChild(card)
}