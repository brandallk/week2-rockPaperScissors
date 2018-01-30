
var game = {
    player1: {name: "human", wins: 0},
    player2: {name: "computer", wins: 0},
    maxRounds: 3,
    currentRound: 1,
    winner: this.player2,
    complete: false
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

    if (!this.complete) {
        var player1gambit = input;
        var player2gambit = this.getRandomGambit();

        var winner = this.getRoundWinner(player1gambit, player2gambit);
        var winnerName = (winner == "draw") ? "draw" : winner.name;

        this.player1.wins = (winner === this.player1) ? this.player1.wins + 1 : this.player1.wins;
        this.player2.wins = (winner === this.player2) ? this.player2.wins + 1 : this.player2.wins;

        displayRoundWinner(this.currentRound, player1gambit, player2gambit, winnerName);

        if (this.player1.wins == 2) {
            this.registerWinner(this.player1.name);
        } else if (this.player2.wins == 2) {
            this.registerWinner(this.player2.name);
        } else if (this.currentRound < this.maxRounds) {
            this.currentRound++

        } else {
            this.registerWinner(this.getWinner());
        }
    }
}

game.registerWinner = function registerWinner(winner) {
    this.complete = true;
    this.winner = winner;
    displayWinner();
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
    if (this.player1.wins > this.player2.wins) {
        return this.player1.name;
    } else if (this.player2.wins > this.player1.wins) {
        return this.player2.name;
    } else {
        return "draw";
    }
}

game.reset = function reset() {
    this.currentRound = 1;
    this.player1.wins = 0;
    this.player2.wins = 0;
    this.winner = this.player2;
    this.complete = false;
}

function displayRoundWinner(currentRound, player1gambit, player2gambit, roundWinner) {
    document.querySelector(".round"+currentRound+".player1choice").textContent = `${game.player1.name} selected: ${player1gambit}.`;
    document.querySelector(".round"+currentRound+".player2choice").textContent = `${game.player2.name} selected: ${player2gambit}.`;
    document.querySelector(".round"+currentRound+".winner").textContent = `Round ${game.currentRound} winner: ${roundWinner}`;
}

function displayWinner() {
    document.querySelector(".game.winner").textContent = `Game winner: ${game.winner}`;
}

function handleInput(evt) {
    if (evt.target != document.querySelector(".reset")) {
        game.playRound(evt.target.getAttribute("data-playerInput"));
    }
}

function handleReset(evt) {
    game.reset();

    var parapgraphs = document.querySelectorAll("p");
    parapgraphs.forEach( pElt => {
        pElt.textContent = "";
    });
}

document.querySelectorAll(".playerInput").forEach( button => {
    addEventListener("click", handleInput);
});

document.querySelector(".reset").addEventListener("click", handleReset);
