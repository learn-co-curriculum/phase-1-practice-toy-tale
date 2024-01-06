Access the list of toys from an API (mocked using JSON Server) and render
each of them in a "card" on the page

1. ✅ fetch to http://127.0.0.1:3000/toys to get an array of all toy objects. 
2. ✅ Create a card element for each toy object. 
3. ✅ Append toy cards to <div id="toy-collection"></div>

Hook up a form that enables users to add new toys. Create an event listener
so that, when the form is submitted, the new toy is persisted to the database. 

1. addEventListener to form.
2. callback function should be seperate a use POST method.  
3. Toy should be appended to dom after submitting and refreshing. 