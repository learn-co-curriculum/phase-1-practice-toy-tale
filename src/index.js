// 1. Execute succesful console.log line 6
// 2. Locate div in html with id "toy-collection"
// got to HTML file
// 3. Save that div to a variable and console.log
// 4. create a temp element and append temp element to ensure I can add to the DOM.
// 5. Add fetch, add a console.log of the data, and then save data by creating callback function renderToys.
// 6. Confirm that renderToys can access fetch data by console logging the toys Array.
// 7. Iterate over toysArray with .forEach.
// Create event listener using provided toyFormContainer

//

console.log("js is connected");
const toyCollectionDiv = document.querySelector("#toy-collection");
console.log("This is: ", toyCollectionDiv);

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => renderToys(data));

function renderToys(toysArray) {
  console.log(toysArray);
  // Code below shows a successful target of toyCollectionDiv
  // const temp1 = document.createElement("h1");
  // temp1.textContent = toysArray[0].name;
  // toyCollectionDiv.append(temp1);
  toysArray.forEach((toy) => {
    let toyCard = document.createElement("div");
    toyCard.className = "card";
    let toyName = document.createElement("h2");
    toyName.textContent = toy.name;
    let toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";
    let toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} Likes`;
    let toyButton = document.createElement("button");
    toyButton.className = "like-btn";
    toyButton.id = `[${toy.id}]`;

    toyCard.append(toyName, toyImg, toyLikes, toyButton);
    toyCollectionDiv.append(toyCard);
  });
}
function renderOneToy(toyObject) {
  console.log(toyObject);
  let oneToyCard = document.createElement("div");
  oneToyCard.className = "card";
  let oneToyName = document.createElement("h2");
  oneToyName.textContent = toyObject.name;
  let oneToyImg = document.createElement("img");
  oneToyImg.src = toyObject.image;
  oneToyImg.className = "toy-avatar";
  let oneToyLikes = document.createElement("p");
  oneToyLikes.textContent = toyObject.likes;
  let oneToyButton = document.createElement("button");
  oneToyButton.className = "like-btn";
  oneToyButton.id = `[${toyObject.id}]`;

  oneToyCard.append(oneToyName, oneToyImg, oneToyLikes, oneToyButton);
  toyCollectionDiv.append(oneToyCard);
}

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
  toyFormContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyUrl = event.target.image.value;
    console.log(toyName, toyUrl);

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: toyName,
        image: toyUrl,
        likes: 0,
      }),
    })
      .then((response = response.json()))
      .then((data) => renderOneToy(data));
  });
});

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

// TO SELECT ONE TOY
// fetch("http://localhost:3000/toys/1")
//   .then((response) => response.json())
//   .then((data) => renderOneToy(data));

// function renderOneToy(toyObject) {
//   console.log(toyObject);
//   let oneToyCard = document.createElement("div");
//   oneToyCard.className = "card";
//   let oneToyName = document.createElement("h2");
//   oneToyName.textContent = toyObject.name;
//   let oneToyImg = document.createElement("img");
//   oneToyImg.src = toyObject.image;
//   oneToyImg.className = "toy-avatar";
//   let oneToyLikes = document.createElement("p");
//   oneToyLikes.textContent = toyObject.likes;
//   let oneToyButton = document.createElement("button");
//   oneToyButton.className = "like-btn";
//   oneToyButton.id = `[${toyObject.id}]`;

//   oneToyCard.append(oneToyName, oneToyImg, oneToyLikes, oneToyButton);
//   toyCollectionDiv.append(oneToyCard);
// }
