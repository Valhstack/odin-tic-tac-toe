const renderBoard = (function () {
    const board = document.getElementById("board");

    const generate = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let button = document.createElement("button");
                button.classList.add("board-btn");
                button.dataset.row = i;
                button.dataset.col = j;

                button.addEventListener("click", (e) => {
                    game.newTurn(e);
                    button.disabled = true;
                });

                board.insertAdjacentElement("beforeend", button);
            }
        }
    };

    const placeMark = (row, col, mark) => {
        for (const button of document.querySelectorAll("#board button")) {
            if (button.dataset.row == row && button.dataset.col == col) {
                button.textContent = mark;
                button.dataset.mark = mark
            }
        }
    };

    const showWinner = (winner) => {
        document.getElementById("winner-dialog-text").textContent = winner === "Draw" ? "It's a draw" : `Winner is ${winner}`;
        document.getElementById("winner-dialog").showModal();
    };

    const reset = () => {
        for (const button of document.querySelectorAll("#board button")) {
            button.disabled = false;
            button.textContent = "";
            button.classList.remove("board-winner-btn");
        }

        document.getElementById("turn-announcement-mark").textContent = "X";
    };

    const disableBoard = () => {
        for (const button of document.querySelectorAll("#board button")) {
            if (!button.disabled) button.disabled = true;
        }
    };

    const announceTurn = (mark) => {
        document.getElementById("turn-announcement-mark").textContent = mark;
        if (mark === "X") document.getElementById("turn-announcement-mark").style.color = "#FF6B6B";
        else document.getElementById("turn-announcement-mark").style.color = "#4ECDC4";
    };

    const updateResetBtn = () => {
        document.getElementById("reset-new-game-btn-label").textContent = "New Game";
    };

    const remove = () => {
        document.getElementById("board").replaceChildren();
    };

    const highlightWinner = (cells) => {
        for (const button of document.querySelectorAll("#board button")) {
            if (cells.some(([r, c]) => r == button.dataset.row && c == button.dataset.col)) {
                button.classList.add("board-winner-btn");
            }
        }
    };

    return { generate, placeMark, showWinner, reset, remove, disableBoard, updateResetBtn, announceTurn, highlightWinner };
})();