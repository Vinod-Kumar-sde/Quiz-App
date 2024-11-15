��#   Q u i z - A p p 
 JavaScript Quiz App
Description
This is a simple quiz application built using HTML, CSS, and JavaScript. The app fetches trivia questions from the Open Trivia Database API, displays them with multiple-choice options, and allows users to select answers. Upon submission, the app provides feedback on whether the user's selected answer was correct or not.

Features
Fetches trivia questions from the Open Trivia Database API.
Randomizes answer options for each question.
Allows users to select an answer and submit it.
Provides immediate feedback on whether the selected answer is correct or incorrect.
Displays a visual cue for the selected answer.
Technologies Used
HTML: To structure the webpage and quiz layout.
CSS: For styling and creating a user-friendly interface.
JavaScript: To dynamically load quiz data, handle user interactions, shuffle answers, and validate answers.

Usage
Upon loading the page, the app will automatically fetch 10 trivia questions from the API.
The first question will be displayed along with randomized answer options.
Click on one of the options to select your answer.
Click Submit to check if your selected answer is correct.
After submission, a message will appear showing whether the answer was correct or incorrect.
Code Overview
script.js
The script.js file fetches quiz data from the Open Trivia Database API, shuffles the answers, and allows the user to interact with the quiz.

API Fetch: The app makes a GET request to the Open Trivia Database API to retrieve a list of trivia questions.
Shuffling Answers: Answers are shuffled so that the correct answer doesn’t always appear in the same position.
Answer Selection: Users can click on an option to select their answer, and the selected answer is highlighted.
Submit Feedback: The app checks if the selected answer is correct and displays a feedback message.
index.html
The index.html file contains the structure of the quiz page, including:

A label for displaying the question.
Multiple buttons for the answer options.
A submit button to check the answer.
style.css
The style.css file provides the styling for the quiz page, including:

Layout styling for centering the quiz.
Styling for the options, selected answers, and submit button.
Simple animations for user interactions.
Example Screenshot

Add a screenshot of the app here for a visual demonstration.

Contributing
If you'd like to contribute to this project:

Fork the repository.
Create a new branch for your changes.
Make your changes and commit them.
Push your changes and open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Trivia questions are provided by the Open Trivia Database API.
Thanks to all the developers and the community for helpful resources and support.
 
