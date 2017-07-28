var config = {
   apiKey: "AIzaSyCkdKbGAFizbTfKB6hQHmtwHAw0PaWaUrE",
   authDomain: "hangry-b32e3.firebaseapp.com",
   databaseURL: "https://hangry-b32e3.firebaseio.com",
   storageBucket: "hangry-b32e3.appspot.com",
   messagingSenderId: "1022227134758"
 };

 firebase.initializeApp(config);

 var database =   firebase.database();

   var foodList = 0;

   //  On Click event associated with the add-to-do function
   $("#add-to-do").on("click", function(event){
     event.preventDefault();

       // Grabs user input
 var ingredient = $("#to-do").val().trim();
 // Creates local "temporary" object for holding employee data
 var newIngredient = {
   name: ingredient,
 };

 // Uploads employee data to the database
 database.ref().push(newIngredient);

 // Logs everything to console
 console.log(newIngredient.name);

 // Alert
   var queryURL = "https://api.edamam.com/search?app_key=670728d7841ac0e159d0b3461150d48b&q="+ newIngredient.name;
 // Clears all of the text-boxes
 $("data-to-do").val("");

       $.ajax({
         url: queryURL,
         method: "GET"
       }).done(function(response) {
         $("#data-to-do").text(JSON.stringify(response));
         console.log(response)
         console.log(response.hits[0].recipe.image)

         //new image element to store photo
         newImage = $("img");
         newImage.attr('src', response.hits[0].recipe.image);
         
         var source = (response.hits[0].recipe.url)

         newLink = $("<a>");
         newLink.attr('href');

         $("#recipeBook1").html(newImage);
         $("#recipeBook2").html("<a href=" + source +">Hangry? Check this out!");
         $("#recipeBook3").html(newLink);

         // $("#recipeBook2").click()
         // "<a href=(')" + source +"(') target='blank'>" The ()

       });

         // $(document).on("click", "#recipeBook1", function() {
         // $(this).attr('src');

 // Prevents moving to new page
 return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
 console.log("On child added");
 console.log(childSnapshot.val());

 // Store everything into a variable.
 var ingredient = childSnapshot.val().name;  

     // Get the to-do "value" from the textbox and store it a variable
     var toDoTask = $("#to-do").val().trim();

     // Create a new variable that will hold a "<p>" tag.
     // Then give it an ID in the following form:
     // "item-4" or "item-3" or "item-99", where the number is equal to foodList.
     // Then append the to-do "value" as text to this <p> element.
     var toDoItem = $("0");

     toDoItem.attr("id", "item-" + foodList);
     toDoItem.append(" " + toDoTask);

     // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
     // Give your button a data attribute called data-to-do and a class called "checkbox".
     // Lastly append the letter X inside.

     var toDoClose = $("<div>");

     toDoClose.attr("data-to-do", foodList);
     toDoClose.addClass("checkbox");
     toDoClose.append("");

     // Append the button to the to do item
     toDoItem = toDoItem.prepend(toDoClose);

     // Add the button and to do item to the to-dos div
     $("#to-dos").append(toDoItem);

     // Clear the textbox when done
     $("#to-do").val("");

     // Add to the foodList
     foodList++;
 
     var toDoNumber = $(this).attr("data-to-do");

     // Select and Remove the specific <p> element that previously held the to do item number.
     $("#item-" + toDoNumber).remove();

     // $("#data-to-do > tbody").append("<tr><td>" + ingredient + "is so good for you!" + "</td><td>");

   }); 
