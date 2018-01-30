
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
    winner: this.player2
}

game.getRandomGambit = function getRandomGambit() {

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

game.playRound = function playRound(input) {

    var player1gambit = input;
    var player2gambit = this.getRandomGambit();
    var roundWinner = this.getRoundWinner(player1gambit, player2gambit);

    this.rounds[this.currentRound - 1].winner = roundWinner;

    displayRoundWinner(this.currentRound, player1gambit, player2gambit, roundWinner);

    if (this.currentRound < this.maxRounds) {
        this.currentRound++

    } else {
        this.winner = this.getWinner();
        displayWinner();
    }
}

game.getRoundWinner = function getRoundWinner(p1gambit, p2gambit) {
    switch (p1gambit) {

        case "rock":
            if (p2gambit == "paper") {
                return this.player2;
            } else if (p2gambit == "scissors") {
                return this.player1;
            } else {
                return "draw";
            }
            break;

        case "paper":
        if (p2gambit == "rock") {
            return this.player1;
        } else if (p2gambit == "scissors") {
            return this.player2;
        } else {
            return "draw";
        }
            break;

        case "scissors":
        if (p2gambit == "paper") {
            return this.player1;
        } else if (p2gambit == "rock") {
            return this.player2;
        } else {
            return "draw";
        }
            break;
    }
}

game.getWinner = function getWinner() {

    var roundResults = this.rounds.map( round => round.winner );

    var player1Wins = roundResults.filter( result => result === this.player1 ).length;
    var player2Wins = roundResults.filter( result => result === this.player2 ).length;

    if (player1Wins > player2Wins) {
        return this.player1;
    } else if (player2Wins > player1Wins) {
        return this.player2;
    } else {
        return "draw";
    }
}

game.reset = function reset() {
    this.currentRound = 1;
    this.winner = this.player2;
    this.rounds.forEach( round => {
        round.winner = this.player2;
    });
}

function displayRoundWinner(currentRound, player1gambit, player2gambit, roundWinner) {
    document.querySelector(".round"+currentRound+".player1choice").textContent = `${game.player1} selected: ${player1gambit}.`;
    document.querySelector(".round"+currentRound+".player2choice").textContent = `${game.player2} selected: ${player2gambit}.`;
    document.querySelector(".round"+currentRound+".winner").textContent = `Round ${game.currentRound} winner: ${roundWinner}`;
}

function displayWinner() {
    document.querySelector(".game.winner").textContent = `Game winner: ${game.winner}`;
}

function handleInput(evt) {
    game.playRound(evt.target.getAttribute("data-playerInput"));
}

function handleReset(evt) {
    game.reset();

    document.querySelectorAll(".playerInput").forEach( button => {
        removeEventListener("click", handleInput);
    });

    var parapgraphs = document.querySelectorAll("p");
    parapgraphs.forEach( pElt => {
        pElt.textContent = "";
    });
}

document.querySelectorAll(".playerInput").forEach( button => {
    addEventListener("click", handleInput);
});

document.querySelector(".reset").addEventListener("click", handleReset);
