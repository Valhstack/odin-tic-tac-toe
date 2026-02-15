document.getElementById("start-game").addEventListener("click", () => {
    document.getElementById("start-game").classList.add("inactive");

    document.getElementById("playerX").classList.remove("inactive");
});

document.getElementById("player-x-btn").addEventListener("click", () => {
    if (document.getElementById("player-x").value != "") {
        playerX = createPlayer(document.getElementById("player-x").value, "X");
        document.getElementById("player-x").value = "";

        document.getElementById("playerX").classList.add("inactive");

        document.getElementById("playerO").classList.remove("inactive");
    }
});

document.getElementById("player-o-btn").addEventListener("click", () => {
    if (document.getElementById("player-o").value != "") {
        playerO = createPlayer(document.getElementById("player-o").value, "O");
        document.getElementById("player-o").value = "";

        document.getElementById("playerO").classList.add("inactive");

        document.getElementById("board").classList.remove("inactive");

        renderBoard.generate();

        document.getElementById("control-btns").classList.remove("inactive");
        document.getElementById("turn-announcement").classList.remove("inactive");
    }
});

document.getElementById("close-dialog").addEventListener("click", () => {
    document.getElementById("winner-dialog").close();
});

document.getElementById("reset-new-game-btn").addEventListener("click", () => {
    if (document.getElementById("reset-new-game-btn-label").textContent === "New Game") {
        document.getElementById("reset-new-game-btn-label").textContent = "Reset Game"
    }
    renderBoard.reset();
    gameBoard.resetBoard();
});

document.getElementById("change-players-btn").addEventListener("click", () => {
    renderBoard.reset();
    gameBoard.resetBoard();
    renderBoard.remove();

    document.getElementById("board").classList.add("inactive");
    document.getElementById("playerX").classList.remove("inactive");
    document.getElementById("control-btns").classList.add("inactive");
    document.getElementById("turn-announcement").classList.add("inactive");
});