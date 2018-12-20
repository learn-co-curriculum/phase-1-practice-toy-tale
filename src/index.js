const addBtnEl = document.querySelector('#new-toy-btn')
const toyFormContainerEl = document.querySelector('.container')
const toyFormEl = document.querySelector('.add-toy-form')

const toyCollectionEl = document.querySelector('#toy-collection')

const toyNameInput = document.querySelector('input[name=name]')
const toyImageInput = document.querySelector('input[name=image]')

let addToy = false

const apiURL = 'http://localhost:3000/toys'

addBtnEl.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainerEl.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainerEl.style.display = 'none'
  }
})


/////////// Render the toys we get from the server

// First we get the array of all toys from the server
const fetchToys = () => {
  return fetch(apiURL)
    .then(response => response.json())
    .then(renderAllToys)
}

// Then we iterate over the array and for each single toy...
const renderAllToys = toys => {
  // Version 1
  toys.forEach(renderSingleToy)
  // Version 2
  // for(let i = 0; i < toys.length; i++) {
  //   renderSingleToy(toys[i])
  // }
}

// We render a div on the page
const renderSingleToy = toy => {
  const toyEl = document.createElement('div')
  toyEl.className = 'card'
  toyEl.dataset.id= toy.id
  toyEl.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn" data-id="${toy.id}">Delete</button>`

  toyEl.querySelector('.like-btn').addEventListener('click', handleToyLike)
  toyEl.querySelector('.delete-btn').addEventListener('click', handleToyDelete) // bonus feature

  // append toy to the end of the list of toys
  toyCollectionEl.appendChild(toyEl)

  // if we wanted to add the new toys BEFORE the old toys we could use:
  // for older browsers:
  // const firstToy = toyCollectionEl.firstChild
  // toyCollectionEl.insertBefore(toyEl, firstToy)
  // for newer browsers:
  // toyCollectionEl.prepend(toyEl)
}

///////////////// Allow the user to add a new toy
/*
When a user clicks on the add new toy button -
a POST request is sent to http://localhost:3000/toys
The toy should conditionally render to the page.
*/


// function to handle the form submit
const handleNewToySubmit = event => {
  event.preventDefault()

  fetch(apiURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      "name": toyNameInput.value,
      "image": toyImageInput.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    renderSingleToy(newToy)
    toyFormEl.reset()
  })
}
// then add the event listener
toyFormEl.addEventListener('submit', handleNewToySubmit)


///////////////// Allow the user to like a toy

/*
 Conditionally increase the toy's like count
 Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
 Headers and body are provided below. If your request isn't working, make sure your header and keys match the documentation.
*/

// function to handle the form submit
const handleToyLike = event => {
  // event.target is the button
  // event.target.parentElement is the div.card
  // div.card has the data-id attribute we can read with dataset
  const toyCardEl = event.target.parentElement
  const toyId = toyCardEl.dataset.id

  // get current number of Likes
  const likesText = toyCardEl.querySelector('p').innerText
  let likesNr = parseInt(likesText)
  likesNr++

  fetch(`${apiURL}/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      "likes": likesNr
    })
  })
  .then(response => response.json())
  .then(toy => {
    toyCardEl.querySelector('p').innerText = `${toy.likes} Likes`
  })
} // end fn handleNewToySubmit


// event listener isn't added globally, buy above when we renderSingleToy ^^^


// Bonus: Allow the user to delete a toy
const handleToyDelete = (event) => {

  // display a little popup dialog
  const confirmDelete = confirm('Are you sure you want to delete this toy? Press OK to delete or CANCEL to keep this toy.')
  // confirm() returns true if user clicks OK or false if they click Cancel
  // If they cancel, return now, don't execute the rest of the function..
  if(!confirmDelete) return

  // If they clicked OK, carry on and delete...

  const toyId = event.target.dataset.id

  fetch(`${apiURL}/${toyId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(toy => {
    // remove the child we jsut deleted
    // event.target.parentElement is the div.card
    event.target.parentElement.remove()

    // we could also rerender the whole page and fetch all toys again, but that's a lot more expensive
    // toyCollectionEl.innerHTML = ''
    // fetchToys()
  })
}
//  Once we are all set, all functions are defined, fetch the toys to kick it all off...
fetchToys()
