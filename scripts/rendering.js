const renderBoard = (function () {
    const board = document.getElementById("board");

    const WIN_PREFIXES = [
        "🏆 ",
        "🎉 ",
        "🔥 ",
        "💥 ",
        "👏 ",
        "🙌 ",
        "✨ ",
        "🎯 ",
        "🚀 ",
        "⚡ "
    ];

    const WIN_SUFFIXES = [
        " takes the win!",
        " wins the round!",
        " comes out on top!",
        " gets it done!",
        " wins it!",
        " pulls it off!",
        " takes this one!",
        " finishes it!",
        " makes it happen!",
        " closes it out!"
    ];

    const DRAW_PHRASES = [
        "🤝 It’s a draw — perfectly matched!",
        "⚖️ Total balance — draw!",
        "🧩 Deadlock!",
        "👏 No winner this time!"
    ];

    const SUB_LINES = [
        "Ready for the rematch?",
        "Run it back!",
        "Think you can top that?",
        "Another round awaits.",
        "Switch sides and try again.",
        "Can the result be changed?",
        "Queue up the next battle.",
        "Let’s go again!",
        "Who wins the next one?",
        "Don’t stop now."
    ];

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
        if (winner === "Draw") {
            document.getElementById("winner-dialog-text").textContent = DRAW_PHRASES[Math.floor(Math.random() * DRAW_PHRASES.length)];
        }
        else {
            document.getElementById("winner-dialog-pre-text").textContent = WIN_PREFIXES[Math.floor(Math.random() * WIN_PREFIXES.length)];

            let winnerName = winner === "X" ? playerX.getPlayerName() : playerO.getPlayerName();

            document.getElementById("winner-mark-dialog").textContent = winnerName;
            document.getElementById("winner-dialog-text").textContent = WIN_SUFFIXES[Math.floor(Math.random() * WIN_SUFFIXES.length)];
            winner === "X" ? document.getElementById("winner-mark-dialog").classList.add("turn-announcement-X") : document.getElementById("winner-mark-dialog").classList.add("turn-announcement-O");

            document.getElementById("winner-subline-text").textContent = SUB_LINES[Math.floor(Math.random() * SUB_LINES.length)]
        }

        document.getElementById("winner-dialog").showModal();
    };

    const reset = () => {
        for (const button of document.querySelectorAll("#board button")) {
            button.disabled = false;
            button.textContent = "";
            button.classList.remove("board-winner-btn");
        }

        document.getElementById("turn-announcement-mark").textContent = "X";
        document.getElementById("turn-announcement-mark").classList.remove("turn-announcement-O");
        document.getElementById("turn-announcement-mark").classList.add("turn-announcement-X");
    };

    const disableBoard = () => {
        for (const button of document.querySelectorAll("#board button")) {
            if (!button.disabled) button.disabled = true;
        }
    };

    const announceTurn = (mark) => {
        document.getElementById("turn-announcement-mark").textContent = mark;
        if (mark === "X") {
            document.getElementById("turn-announcement-mark").classList.remove("turn-announcement-O");
            document.getElementById("turn-announcement-mark").classList.add("turn-announcement-X");
        }
        else {
            document.getElementById("turn-announcement-mark").classList.add("turn-announcement-O");
            document.getElementById("turn-announcement-mark").classList.remove("turn-announcement-X");
        }
    };

    const updateResetBtn = () => {
        document.getElementById("reset-new-game-btn-label").textContent = "New Game";
        document.getElementById("reset-new-game-btn").classList.remove("reset-game-btn");
        document.getElementById("reset-new-game-btn").classList.add("new-game-btn");
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

    const displayNames = () => {
        document.getElementById("player-x-name").textContent = playerX.getPlayerName();
        document.getElementById("player-o-name").textContent = playerO.getPlayerName();

        document.getElementById("player-x-name").classList.add("turn-announcement-X");
        document.getElementById("player-o-name").classList.add("turn-announcement-O");
    };

    const displayScore = () => {
        if (game.getWinner() === "X") {
            document.getElementById("x-score").classList.remove("scoreAnimation");
            void document.getElementById("x-score").offsetWidth;
            document.getElementById("player-x-score").textContent = playerX.getWins();
            document.getElementById("x-score").classList.add("scoreAnimation");
        }
        else if (game.getWinner() === "O") {
            document.getElementById("o-score").classList.remove("scoreAnimation");
            void document.getElementById("o-score").offsetWidth;
            document.getElementById("player-o-score").textContent = playerO.getWins();
            document.getElementById("o-score").classList.add("scoreAnimation");
        }
    };

    return { generate, placeMark, showWinner, reset, remove, disableBoard, updateResetBtn, announceTurn, highlightWinner, displayNames, displayScore };
})();