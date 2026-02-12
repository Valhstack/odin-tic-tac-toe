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
            if (button.dataset.row == row && button.dataset.col == col) button.textContent = mark;
        }
    };

    const showWinner = (winner) => {
        document.getElementById("winner-dialog-text").textContent = winner === "Draw" ? "It's a draw" : `Winner is ${winner}`;
        document.getElementById("winner-dialog").showModal();
    };

    const reset = () => {
        for (const button of document.querySelectorAll("#board button")) {
            button.disabled = false;
            button.textContent = ""
        }
    };

    const remove = () => {
        document.getElementById("board").replaceChildren();
    };

    return { generate, placeMark, showWinner, reset, remove };
})();