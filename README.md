I choose to create this game as I enjoy playing memory games and believe this appeals to all ages. It is particularly relevant as a ‘brain game’ for older people, as these have been proven to improve memory function and prevent or delay the onset of dementia such as Alzheimer’s disease. I made the colour scheme subtle to make it accessible yet fun images within the game, in addition to an increase in complexity at different levels to keep the user engaged.

Within the game I have an event listener on the boxes so that when a box is first clicked I passed this event into one function firstly to identify if the user was on level one or two (as the arrays with the words that needed to be pulled out randomly were of different lengths), and then passed this argument along with the event into a callback function. I used this next function to pull out random words from an array, so when a box is clicked random text shows up on it. This part was accomplished by adding a p class to the clicked box (referred to as ‘this’), which had the random word within it. I then faded out and removed the class shortly afterwards, to fade out the text.

I used a loop to add the text of the id to the boxes. I also added a class at this point which was already added in CSS, which showed up a different image for each box, and later hid this again.

I used a counter to loop around each of the words in the actual answer array and to check if the id of the clicked box (the user’s answer) at that index matched it. (The index was important as I was looking at sequence). I had to remember to reset this when replaying the game as it created an issue at one point!

I really enjoyed making this game and learned a lot about CSS and Javascript, and using jQuery.
