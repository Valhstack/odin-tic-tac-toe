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
    }
});