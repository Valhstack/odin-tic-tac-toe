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

    return { getBoard, placeMark, returnMark };
})();

const createPlayer = (name, mark) => {
    let wins = 0;

    const player = { name, mark };

    const getPlayerInfo = () => player;
    const getWins = () => wins;
    const addWin = () => { wins++; };

    return { getPlayerInfo, getWins, addWin };
};

const game = (function () {
    let winner = "";

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

    const newTurn = () => {
        let move = prompt("Make your move (row, col, mark)");
        move = move.split(", ");

        const row = Number(move[0]);
        const col = Number(move[1]);
        const mark = move[2];

        gameBoard.placeMark(row, col, mark);

        return [row, col];
    };

    const play = () => {
        let playerName1 = prompt("Add player's name (X mark): ");
        let playerName2 = prompt("Add player's name (O mark): ");

        let playerX = createPlayer(playerName1, "X");
        let playerO = createPlayer(playerName2, "O");

        let endGame = false;
        winner = "";

        while (!endGame) {
            const board = gameBoard.getBoard();

            let move = newTurn();

            console.log(board);

            if (hasWinner(move[0], move[1])) {
                endGame = true;
                break;
            }

            if (!board.some(row => row.some(cell => cell === "0"))) {
                winner = "Draw";
                break;
            }
        }

        console.log("Winner is ", winner);
    };

    return { play, hasWinner, returnWinner };

})();

game.play();