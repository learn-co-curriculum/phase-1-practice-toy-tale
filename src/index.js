document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    toyFormContainer.style.display === "block" ? toyFormContainer.style.display = "none" : toyFormContainer.style.display = "block" 
  });
});
