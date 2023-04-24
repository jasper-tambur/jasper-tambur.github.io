const secretWordDiv = document.getElementById('secret-word');
const wrongLettersDiv = document.getElementById('wrong-letters');
const wrongLetterDiv = document.getElementById("wrong-word");
const livesDiv = document.getElementById('lives');
let inCorrectLetter = [];
let lives = 9;
let strike = 0;
let secretWord = '';

fetch('words_hangman.txt')
.then(response => response.text())
.then(data => {
    words = data.split('\n');

    secretWord = words[Math.floor(Math.random() * words.length)];

    initGameBoard();

});
function initGameBoard () {
    for ( let i = 0; i < secretWord.length; i++ ) {
        const charSpan = document.createElement('span');
        charSpan.setAttribute('id', 'char-' + i);
        charSpan.innerText = '_ ';
        secretWordDiv.appendChild(charSpan);
    }
}


const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü'];
let inncorrectLetters = [];
for (let i = 0; i < secretWord.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.setAttribute('id', 'char-' + i);
    charSpan.innerText = '_ ';
    secretWordDiv.appendChild(charSpan);
    //<span id="char-0"></span>
    console.log(secretWord[i]);


}
document.addEventListener('keydown', (e) => {
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
            } if (lives > 0) {
                livesDiv.innerText = lives;
                if (strike > 0) {
                    let stickDiv = document.getElementById("hangman-" + strike);
                    stickDiv.style.display = "block";
                }
            } else {
                livesDiv.innerHTML = 'MÄNG LÄBI!<br>' + secretWord;
                let stickDiv = document.getElementById("hangman-9");
                stickDiv.style.display = "block";
        }
    }
});