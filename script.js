function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
    return (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
    );
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();
    let winnerText = "";

    if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        winnerText = `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
        winnerText = `It's a tie! Both chose ${userOption}`;
    } else {
        computerScore++;
        winnerText = `Computer wins! ${computerResult} beats ${userOption}`;
    }

    return {
        computerResult,
        winnerText
    };
}
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
    const roundResult = getRoundResults(userOption);

    roundResultsMsg.innerHTML = `Computer chose: ${roundResult.computerResult}. </br> ${roundResult.winnerText}`;
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;

    if (computerScore === 3) {
        winnerMsgElement.innerText = "Computer has won the game!";
        optionsContainer.style.display = "none";
        resetGameBtn.style.display = "block";
    }
    else if (playerScore === 3) {
        winnerMsgElement.innerText = "Player has won the game!";
        optionsContainer.style.display = "none";
        resetGameBtn.style.display = "block";
    } else {
        winnerMsgElement.innerText = "";
    }
    localStorage.setItem('computerScore', JSON.stringify(computerScore));
    localStorage.setItem('playerScore', JSON.stringify(playerScore));
}

function resetGame() {
    computerScore = 0;
    playerScore = 0;
    localStorage.setItem('computerScore', JSON.stringify(computerScore));
    localStorage.setItem('playerScore', JSON.stringify(playerScore));
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;
    optionsContainer.style.display = "block";
    resetGameBtn.style.display = "none";
    winnerMsgElement.innerText = "";
    roundResultsMsg.innerText = "";

}

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
    showResults("Rock");
});
resetGameBtn.addEventListener("click", function () {
    resetGame();
});

paperBtn.addEventListener("click", function () {
    showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
    showResults("Scissors");
});
