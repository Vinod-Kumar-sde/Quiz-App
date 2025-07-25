
document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const quizQuestion = document.getElementById("questionBox");
    const quizCheck = document.getElementById("Check");
    const quizNext = document.getElementById("Next");
    const quizFinish = document.getElementById("Finish");
    const quizRestart = document.getElementById("Restart");
    const progressBar = document.getElementById("progressBar");
    const questionNumber = document.getElementById("questionNumber");
    const totalQuestions = document.getElementById("totalQuestions");
    const scoreSection = document.getElementById("scoreSection");
    const finalScore = document.getElementById("finalScore");
    const finalTotal = document.getElementById("finalTotal");
    const scorePercentage = document.getElementById("scorePercentage");
    
    const radioButtons = document.querySelectorAll('input[name="option"]');
    const optionLabels = document.querySelectorAll('.option');
    const optionTexts = [
        document.getElementById("option1"),
        document.getElementById("option2"),
        document.getElementById("option3"),
        document.getElementById("option4")
    ];

    // Quiz state
    let currentQuestionIndex = 0;
    let selectedAnswer = "";
    let correctAnswer = "";
    let quizData = [];
    let userScore = 0;
    let isAnswerChecked = false;

    // Initialize quiz
    initializeQuiz();

    async function initializeQuiz() {
        try {
            showLoading();
            await loadQuizData();
            displayQuestion();
        } catch (error) {
            showError("Failed to load quiz. Please try again.");
            console.error("Quiz initialization error:", error);
        }
    }

    async function loadQuizData() {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.response_code !== 0) {
            throw new Error("API returned an error");
        }
        
        quizData = data.results.map(question => ({
            question: decodeHtml(question.question),
            correct_answer: decodeHtml(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(answer => decodeHtml(answer))
        }));
    }

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function displayQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            showFinalScore();
            return;
        }

        const question = quizData[currentQuestionIndex];
        
        // Reset states
        isAnswerChecked = false;
        selectedAnswer = "";
        clearSelection();
        
        // Update UI
        hideLoading();
        quizQuestion.textContent = question.question;
        
        // Prepare answers
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        const shuffledAnswers = shuffleArray(allAnswers);
        correctAnswer = question.correct_answer;
        
        // Display options
        optionTexts.forEach((optionText, index) => {
            if (shuffledAnswers[index]) {
                optionText.textContent = shuffledAnswers[index];
                optionText.parentElement.parentElement.style.display = 'block';
            } else {
                optionText.parentElement.parentElement.style.display = 'none';
            }
        });
        
        // Update progress
        updateProgress();
        
        // Update button states
        quizCheck.disabled = true;
        quizNext.style.display = 'none';
        quizFinish.style.display = 'none';
        
        // Update question counter
        questionNumber.textContent = currentQuestionIndex + 1;
        totalQuestions.textContent = quizData.length;
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex) / quizData.length) * 100;
        progressBar.style.width = progress + '%';
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function clearSelection() {
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
        optionLabels.forEach(label => {
            label.classList.remove('selected', 'correct', 'incorrect');
        });
    }

    function showLoading() {
        quizQuestion.innerHTML = '<div class="loading-spinner"></div> Loading question...';
    }

    function hideLoading() {
        // Loading will be replaced by actual question text
    }

    function showError(message) {
        quizQuestion.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function showFinalScore() {
        // Hide quiz elements
        document.querySelector('.quiz-header').style.display = 'none';
        document.querySelector('.question-section').style.display = 'none';
        document.querySelector('.options-section').style.display = 'none';
        document.querySelector('.buttons-section').style.display = 'none';
        
        // Show score section
        scoreSection.style.display = 'block';
        
        // Update final scores
        finalScore.textContent = userScore;
        finalTotal.textContent = quizData.length;
        
        const percentage = Math.round((userScore / quizData.length) * 100);
        scorePercentage.textContent = percentage + '%';
        
        // Add performance message
        let message = '';
        if (percentage >= 80) message = 'Excellent! 🎉';
        else if (percentage >= 60) message = 'Good job! 👍';
        else if (percentage >= 40) message = 'Not bad! 👌';
        else message = 'Keep practicing! 💪';
        
        scorePercentage.setAttribute('data-message', message);
    }

    // Event listeners
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('change', function() {
            if (isAnswerChecked) return; // Prevent changing after check
            
            selectedAnswer = optionTexts[index].textContent;
            quizCheck.disabled = false;
            
            // Update visual selection
            optionLabels.forEach(label => label.classList.remove('selected'));
            optionLabels[index].classList.add('selected');
        });
    });

    quizCheck.addEventListener("click", function() {
        if (!selectedAnswer || isAnswerChecked) return;
        
        isAnswerChecked = true;
        quizCheck.disabled = true;
        
        // Show correct/incorrect answers
        optionTexts.forEach((optionText, index) => {
            const label = optionLabels[index];
            if (optionText.textContent === correctAnswer) {
                label.classList.add('correct');
            } else if (optionText.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
                label.classList.add('incorrect');
            }
        });
        
        // Update score
        if (selectedAnswer === correctAnswer) {
            userScore++;
        }
        
        // Show next button or finish button
        if (currentQuestionIndex < quizData.length - 1) {
            quizNext.style.display = 'inline-block';
        } else {
            quizFinish.style.display = 'inline-block';
        }
    });

    quizNext.addEventListener("click", function() {
        currentQuestionIndex++;
        displayQuestion();
    });

    quizFinish.addEventListener("click", function() {
        currentQuestionIndex = quizData.length; // Trigger final score
        showFinalScore();
    });

    quizRestart.addEventListener("click", function() {
        // Reset all states
        currentQuestionIndex = 0;
        userScore = 0;
        selectedAnswer = "";
        correctAnswer = "";
        isAnswerChecked = false;
        
        // Show quiz elements
        document.querySelector('.quiz-header').style.display = 'block';
        document.querySelector('.question-section').style.display = 'block';
        document.querySelector('.options-section').style.display = 'block';
        document.querySelector('.buttons-section').style.display = 'block';
        scoreSection.style.display = 'none';
        
        // Reinitialize quiz
        initializeQuiz();
    });

    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (isAnswerChecked) return;
        
        switch(e.key.toLowerCase()) {
            case 'a':
                if (radioButtons[0]) radioButtons[0].click();
                break;
            case 'b':
                if (radioButtons[1]) radioButtons[1].click();
                break;
            case 'c':
                if (radioButtons[2]) radioButtons[2].click();
                break;
            case 'd':
                if (radioButtons[3]) radioButtons[3].click();
                break;
            case 'enter':
                if (!quizCheck.disabled) quizCheck.click();
                else if (quizNext.style.display !== 'none') quizNext.click();
                else if (quizFinish.style.display !== 'none') quizFinish.click();
                break;
        }
    });
}); 

