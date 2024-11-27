document.addEventListener("DOMContentLoaded", function () {

    const wordElement = document.getElementById("word");
    const inputLetter = document.getElementById("inputLetter")
    const guessBtn = document.getElementById("btnGuess");
    const resetBtn = document.getElementById("btnReset");
    const gameMessageElement = document.getElementById("gameMessage");



    const words = ["tomato", "cucumber", "carrot", "peas", "selleri"];


    let selectedWord;
    let guessLetters = [];
    let remainingGuessess = 10;
    let gameActive = false;




    function initGame() {

        gameActive = true;

        guessLetters = [];
        gameMessageElement.textContent = "";
        inputLetter.value = "";
        wordElement.textContent = "";

        selectedWord = words[Math.floor(Math.random() * words.length)];
        remainingGuessess = selectedWord.length + 3;
        updateGame();
    }

    function handleGuess() {

        let letter = inputLetter.value.toLowerCase().trim();
        inputLetter.value = "";

        if (!letter) {
            alert("Enter a letter!");
        } else if (guessLetters.includes(letter) === true) {
            gameMessageElement.textContent = "Du har redan gissat på bokstaven!!";
        } else if (selectedWord.includes(letter) === true) {
            gameMessageElement.textContent = "Rätt gissning!";
            guessLetters.push(letter);
        } else {
            remainingGuessess--;
            gameMessageElement.textContent = `Fel fissning. Du har ${remainingGuessess} kvar.`;
            guessLetters.push(letter);
        }
        updateGame();
        checkGameStatus();
    }



    function updateGame() {
        let displayText = "";
        for (let i = 0; i < selectedWord.length; i++) {
            const letter = selectedWord[i];
            guessLetters.includes(letter) ? displayText += letter : displayText += "_";
        }
        wordElement.textContent = displayText;
    }




    function checkGameStatus() {
        if (!wordElement.textContent.includes("_")) {
            gameMessageElement.textContent = "U won!"
            gameActive = false;
        } else if (remainingGuessess === 0) {
            gameMessageElement.textContent = "U lost";
            gameActive = false;
        }
    }
    guessBtn.addEventListener("click", handleGuess);
    resetBtn.addEventListener("click", initGame);
    initGame();
});