let secretNumber;
let attemptsLeft;
let score = 0;
let gameOver = false;

const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");

function startGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    attemptsLeft = 5;
    gameOver = false;

    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;

    attemptsDisplay.innerText = attemptsLeft;
    scoreDisplay.innerText = score;
    message.innerText = "Good luck! 🎯";
    playAgainBtn.hidden = true;

    guessInput.focus();
}

function checkGuess() {
    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    if (guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 || guess > 20) {
        message.innerText = "Please enter a whole number from 1 to 20!";
        return;
    }

    if (guess === secretNumber) {
        score += attemptsLeft * 10;
        scoreDisplay.innerText = score;
        message.innerText = "Correct! You Won! 🎉🎊";
        message.style.color = "green";
        endGame();
        return;
    }

    attemptsLeft--;
    attemptsDisplay.innerText = attemptsLeft;

    if (guess > secretNumber) {
        message.innerText = "Too High! Try a smaller number.";
    } else {
        message.innerText = "Too Low! Try a bigger number.";
    }

    message.style.color = "#dc2626";

    if (attemptsLeft === 0) {
        message.innerText =
            "Game Over! The secret number was " + secretNumber + ".";
        endGame();
    }
}

function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    checkBtn.disabled = true;
    playAgainBtn.hidden = false;
}

checkBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

playAgainBtn.addEventListener("click", startGame);

startGame();
