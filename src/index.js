let addToy = false;
let toyContainer;

document.addEventListener("DOMContentLoaded", () => {
  toyContainer = document.getElementById("toy-collection");

  toggleFormContainer();
  // 1. The page needs to be loaded (before we do anything else)
  fetchToys();
  createNewToy();
  updateLikes();
});

function updateLikes() {
  // Event delegation
  toyContainer.addEventListener("click", function(event) {
    event.preventDefault();

    if (event.target.className === "like-btn") {
      const toyId = event.target.dataset.id;
      const likeElement = event.target.previousElementSibling;
      const previousLikeCount = parseInt(likeElement.innerText.split(" ")[0]);
      const newLikeCount = previousLikeCount + 1;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newLikeCount
        })
      }).then(resp => {
        // Pessimistic render
        if (resp.ok) {
          // likeElement.innerText = `${newLikeCount} Likes`;
          console.log("this worked");
        } else {
          console.error("this did not work");
        }
      });

      // Optimistic render
      likeElement.innerText = `${newLikeCount} Likes`;

      // PATCH http://localhost:3000/toys/:id
      // headers:
      // {
      //   "Content-Type": "application/json",
      //   Accept: "application/json"
      // }

      // body: JSON.stringify({
      //   "likes": <new number>
      // })
    }
  });
}

function createNewToy() {
  const newToyForm = document.querySelectorAll(".add-toy-form")[0];

  newToyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const toyNameInput = event.target.name;
    const toyImageInput = event.target.image;
    const data = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0,
      aaronNeedsToKnow: true
    };

    toyNameInput.value = "";
    toyImageInput.value = "";

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(newToy => {
        // we need to pass our newToy into the template we made
        const newToyDiv = renderSingleToy(newToy);
        toyContainer.innerHTML += newToyDiv;
      });

    // These below are all the same thing (more or less)
    // .then(resp => resp.json())
    // .then(resp => { return resp.json() })
    // .then(function(resp){ return resp.json() })

    // POST http://localhost:3000/toys
    // headers:
    // {
    //   "Content-Type": "application/json",
    //   Accept: "application/json"
    // }

    // body: JSON.stringify({
    //   "name": "Jessie",
    //   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    //   "likes": 0
    // })
  });
}

function fetchToys() {
  // 2. Make a 'GET' fetch request (to fetch all toys)
  // fetch("http://localhost:3000/toys").then(function(resp) {
  //   return resp.json();
  // });

  // fetch("http://localhost:3000/toys").then(resp => {
  //   return resp.json();
  // });

  // fetch("http://localhost:3000/toys").then(resp => resp.json());

  fetch("http://localhost:3000/toys")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(toys) {
      // console.log(toys);
      // debugger;
      // 3. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

      toys.forEach(toy => {
        // const divElement = document.createElement("div");
        // divElement.className = "card";
        // console.log(divElement);
        toyContainer.innerHTML += renderSingleToy(toy);
      });

      // toys.forEach(function(toy){
      // })
    });

  // I do NOT have access to my toys variable here!
}

function renderSingleToy(toy) {
  return `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>
  </div>
  `;
}

function toggleFormContainer() {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  // const toyForm = document.querySelectorAll(".container")[0];

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
}
