// Character data
const characters = [
  { name: "Jotaro Kujo", image: "https://i.postimg.cc/vTSFb8Ps/400px-Jotaro-SC-Infobox-Manga.png" },
  { name: "Spike Spiegel", image: "https://i.postimg.cc/zDd1npqc/6-spike-spiegel-1660778366361.png" },
  { name: "Vegeta", image: "https://i.postimg.cc/B64GCV8d/7-vegeta-1660778366361.jpg" },
  { name: "Guts", image: "https://i.postimg.cc/k4sPYvKD/Guts-Berserk.png" },
  { name: "Goku", image: "https://i.postimg.cc/vTmFJxth/Screen-Shot-2024-11-21-at-22-07-01.png" },
  { name: "Edward Elric", image: "https://i.postimg.cc/g0vW8W0V/Screen-Shot-2024-11-21-at-22-07-19.png" },
  { name: "Ichigo", image: "https://i.postimg.cc/g09pxJGc/Screen-Shot-2024-11-21-at-22-07-33.png" },
  { name: "Saitama", image: "https://i.postimg.cc/9QwVXT5N/Screen-Shot-2024-11-21-at-22-07-46.png" },
  { name: "Mikasa", image: "https://i.postimg.cc/7YWwy9c2/Screen-Shot-2024-11-21-at-22-08-54.png" },
  { name: "Shinji Ikari", image: "https://i.postimg.cc/PrxTc96H/Screen-Shot-2024-11-21-at-22-09-37.png" },
  { name: "Light Yagami", image: "https://i.postimg.cc/zDpqx8Fp/Screen-Shot-2024-11-21-at-22-09-49.png" },
  { name: "Uchiha Itachi", image: "https://i.postimg.cc/MHsxHmpg/Screen-Shot-2024-11-21-at-22-09-59.png" },
  { name: "Tanjiro", image: "https://i.postimg.cc/6q6tBmtd/Screen-Shot-2024-11-21-at-22-10-17.png" },
  { name: "Motoko Kusanagi", image: "https://i.postimg.cc/XYtj9Lkb/Screen-Shot-2024-11-21-at-22-10-34.png" },
  { name: "Kakashi", image: "https://i.postimg.cc/tgPXk6BV/Screen-Shot-2024-11-21-at-22-10-56.png" },
  { name: "Gon Freecss", image: "https://i.postimg.cc/50SfdVd4/Screen-Shot-2024-11-21-at-22-11-09.png" },
  { name: "Monkey D. Luffy", image: "https://i.postimg.cc/ydH7bNGp/Screen-Shot-2024-11-21-at-22-11-23.png" },
  { name: "Kaido", image: "https://i.postimg.cc/g2xcwQRs/Screen-Shot-2024-11-21-at-22-11-37.png" }
];

let currentCharacterIndex = 0;
let incorrectGuesses = 0;
let timer;
let timeLeft = 20;

// Start the game
function startGame() {
  currentCharacterIndex = 0;
  incorrectGuesses = 0;
  timeLeft = 20;
  document.getElementById("time-left").textContent = timeLeft;
  displayCharacter();
  startTimer();
  document.getElementById("feedback").textContent = "";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("win-feedback").style.display = "none";
}

// Display the current character's image
function displayCharacter() {
  const character = characters[currentCharacterIndex];
  document.getElementById("character-photo").src = character.image;
  document.getElementById("guess-input").value = "";
  resetTimer();
}

// Reset and start the timer
function resetTimer() {
  clearInterval(timer);
  timeLeft = 20;
  document.getElementById("time-left").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleIncorrectGuess();
    }
  }, 1000);
}

// Handle guess submission
document.getElementById("submit-guess-btn").addEventListener("click", () => {
  const guess = document.getElementById("guess-input").value.trim().toLowerCase();
  const correctAnswer = characters[currentCharacterIndex].name.toLowerCase();

  if (guess === correctAnswer) {
    clearInterval(timer);
    currentCharacterIndex++;
    if (currentCharacterIndex < characters.length) {
      document.getElementById("feedback").textContent = "Correct! Moving to the next character.";
      setTimeout(() => {
        displayCharacter();
      }, 1000);
    } else {
      document.getElementById("feedback").textContent = "Congrats! You guessed all characters!";
    }
  } else {
    handleIncorrectGuess();
  }
});

// Handle incorrect guesses
function handleIncorrectGuess() {
  incorrectGuesses++;
  clearInterval(timer);

  if (incorrectGuesses >= 2) {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-over").textContent = "Game Over! Restarting...";
    setTimeout(() => {
      startGame();
    }, 3000);
  } else {
    document.getElementById("feedback").textContent = `Incorrect! Try again. (${2 - incorrectGuesses} chances left)`;
    resetTimer();
  }
}

// Initialize the game
startGame();
