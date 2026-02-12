let playerX;
let playerO;

const gameBoard = (function () {
    const board = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
    ];

    const getBoard = () => board.map(row => [...row]);

    const placeMark = (row, col, mark) => {
        if (board[row][col] === "0") {
            board[row][col] = mark;
        }
    };

    const returnMark = (row, col) => board[row][col];

    const resetBoard = () => {
        for (let row in board) {
            for (let col in board[row]) {
                board[row][col] = "0";
            }
        }
    };

    return { getBoard, placeMark, returnMark, resetBoard };
})();

const createPlayer = (name, mark) => {
    let wins = 0;

    const player = { name, mark };

    const getPlayerName = () => player.name;
    const getPlayerMark = () => player.mark;
    const getWins = () => wins;
    const addWin = () => { wins++; };

    return { getPlayerName, getPlayerMark, getWins, addWin };
};

const game = (function () {
    let winner = "", endGame = false, currentTurn = "X";

    const hasWinner = (row, col) => {
        const board = gameBoard.getBoard();
        const mark = gameBoard.returnMark(row, col);
        const size = board.length;

        if (board[row].every(cell => cell === mark)) { winner = mark; return true; }

        if (board.every(r => r[col] === mark)) { winner = mark; return true; }

        if (row === col && board.every((r, i) => r[i] === mark)) { winner = mark; return true; }

        if (row + col === size - 1 && board.every((r, i) => r[size - 1 - i] === mark)) { winner = mark; return true; }

        return false;
    };

    const returnWinner = () => winner;

    const newTurn = (e) => {
        const row = Number(e.currentTarget.dataset.row);
        const col = Number(e.currentTarget.dataset.col);
        const mark = currentTurn;

        gameBoard.placeMark(row, col, mark);
        renderBoard.placeMark(row, col, mark)

        if (hasWinner(row, col)) {
            endGame = true;
            winner = gameBoard.returnMark(row, col);

            winner === "X" ? playerX.addWin() : playerO.addWin();
        }

        if (endGame) gameEnd();
        else {
            const board = gameBoard.getBoard();

            if (!board.some(row => row.some(cell => cell === "0"))) {
                winner = "Draw";
            }

            currentTurn = currentTurn === "X" ? "O" : "X";
        }
    };

    const gameEnd = () => {
        for (const button of document.querySelectorAll("#board button")) {
            if (!button.disabled) button.disabled = true;
        }

        document.getElementById("reset-new-game-btn-label").textContent = "New Game";

        renderBoard.showWinner(winner);

        endGame = false;
    };

    return { newTurn, hasWinner, returnWinner };

})();