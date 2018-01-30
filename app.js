
var game = {
    player1: "human",
    player2: "computer",
    maxRounds: 3,
    rounds: [
        {number: 1, winner: this.player2},
        {number: 2, winner: this.player2},
        {number: 3, winner: this.player2},
    ],
    currentRound: 1,
    winner: this.player2,
}

game.playRound = playRound;
game.getWinner = getWinner;

function getRandomGambit() {
    var randNum = Math.floor(Math.random() * 3 + 1);
    switch (randNum) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

function getRoundWinner(p1gambit, p2gambit) {
    switch (p1gambit) {

        case "rock":
            if (p2gambit == "paper") {
                return game.player2;
            } else if (p2gambit == "scissors") {
                return game.player1;
            } else {
                return "draw";
            }
            break;

        case "paper":
        if (p2gambit == "rock") {
            return game.player1;
        } else if (p2gambit == "scissors") {
            return game.player2;
        } else {
            return "draw";
        }
            break;

        case "scissors":
        if (p2gambit == "paper") {
            return game.player1;
        } else if (p2gambit == "rock") {
            return game.player2;
        } else {
            return "draw";
        }
            break;
    }
}

function displayRoundWinner(currentRound, roundWinner) {
    document.querySelector(".round"+currentRound+".winner").textContent = `Round ${game.currentRound} winner: ${roundWinner}`;
}

function displayWinner() {
    document.querySelector(".game.winner").textContent = `Game winner: ${game.winner}`;
}

function playRound(input) {
    var player1gambit = input;
    var player2gambit = getRandomGambit();
    var roundWinner = getRoundWinner(player1gambit, player2gambit);
    game.rounds[game.currentRound - 1].winner = roundWinner;
    displayRoundWinner(game.currentRound, roundWinner);
    if (game.currentRound < game.maxRounds) {
        game.currentRound++
    } else {
        game.winner = game.getWinner();
        displayWinner();
    }
}

function getWinner() {
    var roundResults = game.rounds.map( round => round.winner );
    var player1Wins = roundResults.filter( result => result === game.player1 ).length;
    var player2Wins = roundResults.filter( result => result === game.player2 ).length;
    if (player1Wins > player2Wins) {
        return game.player1;
    } else if (player2Wins > player1Wins) {
        return game.player2;
    } else {
        return "draw";
    }
}

function handleInput(evt) {
    playRound(evt.target.getAttribute("data-playerInput"));
}

document.querySelectorAll(".playerInput").forEach( button => {
    addEventListener("click", handleInput);
});
