// YOUR CODE HERE
// all the elements needed
const addBtn = document.querySelector('#new-toy-btn')
const toyCollection = document.querySelector("#toy-collection")
const toyUrl = 'http://localhost:3000/toys'
let addToy = false
const toyForm = document.querySelector('.container')
const inputs = document.querySelectorAll('.input-text')
const submitForm = document.querySelector('.add-toy-form')
let flash = {}

document.addEventListener("DOMContentLoaded", init)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    submitForm.addEventListener('submit', getToyData)
  } else {
    toyForm.style.display = 'none'
  }
})

function init(){
  getToys()
}

// STEP 2

function getToys(){
  // fetch and render toys
  return fetch(toyUrl).then(res => res.json()).then(json => {
    json.forEach(toy => {
      makeToy(toy)
    })
    addClicksToLikes()
  })
}

// STEP 3

function makeToy(toy) {
  // render a toy to the page (reusable)
  toyCollection.innerHTML += `
    <div class="card" >
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} </p>
      <button class='like-btn' data-id="${toy.id}">Like <3</button>
    </div>
    `
}

// STEP 4

function getToyData(e) {
  e.preventDefault();
  // remove alert notices
  (document.querySelector('.alert')) ? document.querySelector('.alert').remove() : null

  // get input object
  let mappedInputs = mapInputs()

  if (mappedInputs.name !== "" && mappedInputs.image !== ""){
    createNewToy(mappedInputs)
  } else {
    flash['notice'] = "Sorry, fields cannot be blank!";
    let newP = document.createElement('p')
    newP.innerText = flash['notice']
    newP.className = 'alert'
    toyForm.prepend(newP)
  }
}

function mapInputs() {
  let mappedInputs = {likes: 0}
  for (let input of inputs) {
    mappedInputs[input.name] = input.value
    input.value = ""
  };
  return mappedInputs
}

function createNewToy(data) {
  // clears the flash notices
  flash = {}
  // POST to toys
  return fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json()).then(makeToy)
}


// STEP 5

function addClicksToLikes() {
  // adds listeners to like buttons
  const likes = document.getElementsByClassName('like-btn')
    for (btn of likes) {
      btn.addEventListener('click', (e) => {
        // conditionally render the like number
        let likeNum = e.target.previousElementSibling
        likeNum.innerText = parseInt(likeNum.innerText) + 1
        likeToy(e.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)
      })
    }
}


function likeToy(toyId, data) {
  // send a patch request to server increasing a toy's like count
  return fetch(toyUrl + `/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: data})
  }).then(res => res.json())
}
