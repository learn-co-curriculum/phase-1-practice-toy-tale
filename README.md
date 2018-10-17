# Toy Tale
You got a friend in need!

Your friend Andy recently misplaced all their toys!

Help Andy recover their toys and get the toys back in the toy collection.

## STEP 1: Create your server!

All of the toy data is stored in the db.json file. You'll want to access this data using a json server. In order to do this, run the following two commands:
   * npm install -g json-server
   * json-server --watch db.json
   
##### This will create a server storing all of our lost toy data with restful routes at http://localhost:3000/toys.
You can also check out http://localhost:3000/toys/:id

## STEP 2: Fetch Andy's Toys!

On the index.html page, there is a div with the id "toy-collection"

When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a `<div class="card">` for each toy and add it to the toy-collection div.

## STEP 3: Add toy info to the card!

Each card should have the following child elements:
  * h2 tag with the toy's name
  * image tag with the src of the toy's image attribute - needs a class name of "toy-avatar"
  * p tag with how many likes that toy has
  * button tag with an class of "like-btn"

After all if that - the toy card should resemble:

  ```
  <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  ```

## STEP 4: Add a new toy!

* When a user clicks on the add new toy button - a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
* The toy should conditionally render to the page.
* In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSONified data for the request. If your request isn't working, make sure your header and keys match the documentation.

```
POST http://localhost:3000/toys
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body:
{
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
}
```

* For examples, refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

## STEP 5: Increase toy's likes!

When a user clicks on a toy's like button, two things should happen:
  * Conditionally increase the toy's like count
  * Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
  * Headers and body are provided below. If your request isn't working, make sure your header and keys match the documentation.
  
```
PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body:
{
  "likes": <new number>
}
```
