/*
GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guess
-Notify player of guesses remaining
-Notify the player of the correct answear if loose
-Let player choose to play agian
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Linsten for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, `red`);
  }

  // Check if won
  if (guess === winningNum) {
    // GAMEOVER - WON
    gameOver(true, `${winningNum} is correct, YOU WON!`);
    // // Disable input
    // guessInput.disabled = true;
    // // Change color
    // guessInput.style.borderColor = "#66FF00";
    // guessInput.style.boxShadow = "3px 3px 7px rgba(112, 230, 17, 0.89)";
    // // Set message
    // setMessage(`${winningNum} is correct, YOU WON!`, "#66FF00");
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over lost
      gameOver(
        false,
        `GAME OVER, you lost. The correct number was ${winningNum}`
      );

      // // Disable input
      // guessInput.disabled = true;
      // // Change color
      // guessInput.style.borderColor = "#red";
      guessInput.style.boxShadow = "3px 3px 7px rgba(226, 50, 19, 0.918)";
      // // Set message
      // setMessage(
      //   `GAME OVER, you lost. The correct number was ${winningNum}`,
      //   "red"
      // );
    } else {
      // Game continiues - anwear wrong
      guessInput.style.borderColor = "#red";
      guessInput.style.boxShadow = "3px 3px 7px rgba(226, 50, 19, 0.918)";

      // Clear the input
      guessInput.value = "";

      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// GAME OVER function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "#66FF00") : (color = "red");
  // Disable input
  guessInput.disabled = true;
  // Change color
  guessInput.style.borderColor = "color";
  guessInput.style.boxShadow = "3px 3px 7px rgba(112, 230, 17, 0.89)";
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // PLAY AGAIN
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
