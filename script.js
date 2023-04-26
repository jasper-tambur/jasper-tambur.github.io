const alphabet = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "Õ", "Ä", "Ö", "Ü"];
const secretWordDiv = document.getElementById("secret-word");
const wrongLetterDiv = document.getElementById("wrong-word");
const livesDiv = document.getElementById("lives");
const stickImg = document.querySelectorAll(".img");
let inCorrectLetter = [];
let secretWord = '';
let lives = 9;
let strike = 0;
let isGameOver = false;

fetch('words_hangman.txt')
.then(response => response.text())
.then(data => {
    words = data.trim().split(/\s+/);
    secretWord = words[Math.floor(Math.random() * words.length)];
    initGameBoard();
});

function initGameBoard() {
    for (let i = 0; i < secretWord.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.setAttribute('id', 'char-' + i);
        charSpan.innerText = "_";
        secretWordDiv.appendChild(charSpan);
    };
}

function endGame(isWin) {
    isGameOver = true;
    if (isWin) {
        livesDiv.style.color = "green";
        livesDiv.innerHTML = "Õige vastus!";
    } else {
        document.getElementById("hangman-9").style.display = "block";
        livesDiv.innerHTML = 'Mäng läbi! Proovi uuesti.<br>' + secretWord;
    }
}

document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    const charGuess = e.key.toUpperCase();
    if (alphabet.includes(charGuess) && lives != 0) {

        let isCorrectLetter = false;

        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i].toUpperCase() == charGuess) {
                const charSpan = document.getElementById('char-' + i)
                charSpan.innerText = charGuess.toUpperCase();
                isCorrectLetter = true;
            }
        }
        if (!isCorrectLetter && !inCorrectLetter.includes(charGuess)) {
            inCorrectLetter.push(charGuess);
            wrongLetterDiv.innerHTML += charGuess;
            lives--;
            strike++;
            if (lives == 0) {
                endGame(false);
            } else {
                livesDiv.innerText = lives;
                if (strike > 0) {
                    let stickDiv = document.getElementById("hangman-" + strike);
                    stickDiv.style.display = "block";
                }
            }
        } else if (!secretWordDiv.innerText.includes("_")) {
            endGame(true);
        }
    }
});
