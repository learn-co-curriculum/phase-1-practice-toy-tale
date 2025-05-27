let addToy = false;
const url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyForm.addEventListener('submit', createAndDisplayToy)
});

const createAndDisplayToy = (submitEvent) => {
  submitEvent.preventDefault()
  createToy()
}

const createToy = () => {
  const nameInput = document.querySelector('input[name="name"]')
  const imageInput = document.querySelector('input[name="image"]')
  if (imageInput.value && nameInput.value) {
    const options = {
      body: JSON.stringify({ name: nameInput.value, image: imageInput.value, likes: 0 }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(url, options)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message))
    nameInput.value = ""
    imageInput.value = ''
  } else {
    console.log("You're missing an image url or name...")
  }
}
