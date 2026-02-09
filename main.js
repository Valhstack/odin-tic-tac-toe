const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameBoard = (function () {
    const board = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
    ];

    const getBoard = () => board;

    const placeMark = (row, col, mark) => {
        if (board[row][col] === "0") {
            board[row][col] = mark;
        }
    };

    const returnMark = (row, col) => board[row][col];

    const hasWinner = () => {
        console.log(board);
        for (const [a, b, c] of WIN_PATTERNS) {
            if (board[a] !== "0" && board[a] === board[b] && board[a] === board[c]) {
                console.log("WIN ON", a, b, c, "VALUES:", board[a], board[b], board[c]);
                return true;
            }
        }
        return false;
    } // ==> buggy

    return { getBoard, placeMark, returnMark, hasWinner };
})();

const createPlayer = (name, mark) => {
    let wins = 0;

    const player = { name, mark }

    const getPlayerInfo = () => player;
    const getWins = () => wins;
    const addWin = () => { wins++; };

    return { getPlayerInfo, getWins, addWin };
};

function playGame() {
    console.log(gameBoard.getBoard());

    let playerName1 = prompt("Add player's name (X mark): ");
    let playerName2 = prompt("Add player's name (O mark): ");

    let playerX = createPlayer(playerName1, "X");
    let playerO = createPlayer(playerName2, "O");

    let endGame = false;

    let winner;

    while (!endGame) {
        let moveX = prompt("Make your move (row, col, mark)");
        moveX = moveX.split(", ");
        console.log("Player X: ", playerX.getPlayerInfo(), playerO.getPlayerInfo(), moveX);

        gameBoard.placeMark(moveX[0], moveX[1], moveX[2]);

        if (gameBoard.hasWinner()) {
            endGame = true;
            playerX.addWin();

            winner = playerX.mark;

            break;
        }

        let moveO = prompt("Make your move (row, col, mark)");
        moveO = moveO.split(", ");
        console.log("Player O: ", playerX.getPlayerInfo(), playerO.getPlayerInfo(), moveO);

        gameBoard.placeMark(moveO[0], moveO[1], moveO[2]);

        if (gameBoard.hasWinner()) {
            endGame = true;
            playerO.addWin();

            winner = playerO.mark;
        }

        let board = gameBoard.getBoard();
        if (!board.some(a => a === "0") && !gameBoard.hasWinner()) {
            winner = "Draw";
            break;
        }
    }

    console.log(winner);
}

playGame();