let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector('#toy-collection')
  const toyInputs = document.querySelectorAll('.input-text')
  const toyForm = document.querySelector('.add-toy-form')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const renderToyCard = (toy) => {
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')

    const toyName = document.createElement('h2')
    toyName.textContent = toy.name

    const toyImg = document.createElement('img')
    toyImg.setAttribute('src', toy.image)
    toyImg.classList.add('toy-avatar')

    const likeCount = document.createElement('p')
    likeCount.textContent = `${toy.likes} likes`

    const likeBtn = document.createElement('button')
    likeBtn.textContent = 'Like ❤️'
    likeBtn.classList.add('like-btn')
    likeBtn.setAttribute('id', toy.id)

    likeBtn.addEventListener('click', () => {
      patchLikes(toy.id, toy.likes)
        .then(updatedLikeCount => {
          likeCount.textContent = `${updatedLikeCount} likes`
          toy.likes = updatedLikeCount
        })
    })

    toyCard.append(toyName, toyImg, likeCount, likeBtn)
    toyCollectionDiv.appendChild(toyCard)
  }

  const getToys = () => {
    fetch('http://localhost:3000/toys', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(toys => {
        toys.forEach(renderToyCard)
      })
      .catch(error => console.log('Error: ', error.message))
  }

  const postToy = () => {
    const mappedInputs = [...toyInputs].map(input => input.value)

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
          name: mappedInputs[0],
          image: mappedInputs[1],
          likes: 0
        })
    })
      .then(res => res.json())
      .then(toy => {
        renderToyCard(toy)
        toyInputs.forEach(input => input.value = '')
      })
  }

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    postToy()
  })

  const patchLikes = (id, likeCount) => {

    return fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likeCount + 1
      })
    })
      .then(res => res.json())
      .then(patchedToy => patchedToy.likes)
      .catch(error => console.log("Error:", error.message))
  }

  getToys()

});
