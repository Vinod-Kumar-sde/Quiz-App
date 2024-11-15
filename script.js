
document.addEventListener("DOMContentLoaded", function() {
const options = document.querySelectorAll(".option");
const quizSubmit = document.getElementById("submit");
const quizQuestion = document.getElementById("questionBox");
const quizCheck = document.getElementById("Check");
const quizNext = document.getElementById("Next");


let currentQuestionIndex = 0;
let selectedAnswer = "";
let quizData = [];

// if (quizSubmit === null) {
//   console.error("Submit button not found!");
//   return; // Stop the script if submit button is missing
// }

options.forEach(option => {
  option.addEventListener("click", function() {
    selectedAnswer = this.textContent.trim(); // Store selected answer
    console.log(`You selected: ${selectedAnswer}`);
    options.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");

  });
});

// Handle quiz submission
quizSubmit.addEventListener("click", function() {
  if (selectedAnswer) {
    console.log(`You submitted: ${selectedAnswer}`);
  } else {
    alert("Please select an answer first.");
  }
 
});

setTimeout(() => {

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986")

.then(response => response.json())
    .then(data => {
      const firstQuestion = data.results[0];
      const decodedQuestion = decodeURIComponent(firstQuestion.question);
      quizQuestion.textContent = decodedQuestion;
      console.log("firstQuestion:", decodedQuestion.question);
      
    
const allAnswer = [...firstQuestion.incorrect_answers, firstQuestion.correct_answer];
const shuffleAnswers = shuffleArray(allAnswer);

options.forEach((option, index) => {
  option.textContent = decodeURIComponent(shuffleAnswers[index]);
});
 quizCheck.addEventListener("click", function() {
if (selectedAnswer === decodeURIComponent(firstQuestion.correct_answer)) {
      alert("Correct!");
    } else {
      alert("Incorrect. The correct answer was: " + decodeURIComponent(firstQuestion.correct_answer));
    }
  });
quizNext.addEventListener("click", function() {
  location.reload();
})
})
.catch(error => {
  console.error("error detected");
  });
},1000)

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5); // Randomize the order of answers
}
}); 

