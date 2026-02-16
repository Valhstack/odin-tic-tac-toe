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

        game.resetTurn(game.getCurrentTurn());
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

    const getCurrentTurn = () => currentTurn;
    const resetTurn = (turn) => { if (turn === "O") currentTurn = "X"; };

    const hasWinner = (row, col) => {
        const board = gameBoard.getBoard();
        const mark = gameBoard.returnMark(row, col);
        const size = board.length;

        if (board[row].every(cell => cell === mark)) {
            winner = mark;
            return board[row].map((_, c) => [row, c]);
        }

        if (board.every(r => r[col] === mark)) {
            winner = mark;
            return board.map((_, r) => [r, col]);
        }

        if (row === col && board.every((r, i) => r[i] === mark)) {
            winner = mark;
            return board.map((_, i) => [i, i]);
        }

        if (row + col === size - 1 && board.every((r, i) => r[size - 1 - i] === mark)) {
            winner = mark;
            return board.map((_, i) => [i, size - 1 - i]);
        }

        return null;
    };

    const getWinner = () => winner;

    const newTurn = (e) => {
        const row = Number(e.currentTarget.dataset.row);
        const col = Number(e.currentTarget.dataset.col);
        const mark = currentTurn;

        gameBoard.placeMark(row, col, mark);
        renderBoard.placeMark(row, col, mark);

        const cells = hasWinner(row, col);

        if (cells) {
            endGame = true;
            renderBoard.highlightWinner(cells);

            winner === "X" ? playerX.addWin() : playerO.addWin();
        }

        if (endGame) gameEnd();
        else {
            const board = gameBoard.getBoard();

            if (!board.some(row => row.some(cell => cell === "0"))) {
                winner = "Draw";
                gameEnd();
            }

            currentTurn = currentTurn === "X" ? "O" : "X";
            renderBoard.announceTurn(currentTurn);
        }
    };

    const gameEnd = () => {
        renderBoard.displayScore();
        renderBoard.disableBoard();
        renderBoard.updateResetBtn();

        setTimeout(() => {
            renderBoard.showWinner(winner)
        }, 300
        )

        endGame = false;
    };

    return { newTurn, hasWinner, getWinner, getCurrentTurn, resetTurn };

})();