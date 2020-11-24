var restart = document.getElementById('resetButton')
var board = document.getElementById("board")

var game = []
for (var i = 0; i < 3; i++) {
    var tempRow = []
    for (var j = 0; j < 3; j++) {
        board.rows[i].cells[j].addEventListener('click', dropMark)
        tempRow.push(board.rows[i].cells[j])
    }
    game.push(tempRow);
}

var gameFinished = false;
var totalMarks = 0;
restart.addEventListener('click', function () {
    gameFinished = false;
    totalMarks = 0;
    restart.classList.replace('btn-success', 'btn-outline-success')
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            game[i][j].textContent = ''
            game[i][j].style.backgroundColor = 'white'
        }
    }
})

function checkCells(cellIndex) {
    if (game[cellIndex[0][0]][cellIndex[0][1]].textContent == game[cellIndex[1][0]][cellIndex[1][1]].textContent &&
        game[cellIndex[1][0]][cellIndex[1][1]].textContent == game[cellIndex[2][0]][cellIndex[2][1]].textContent &&
        game[cellIndex[1][0]][cellIndex[1][1]].textContent != '') {
        gameFinished = true;
        restart.classList.replace('btn-outline-success', 'btn-success')
        for (var i = 0; i < 3; i++)
            game[cellIndex[i][0]][cellIndex[i][1]].style.backgroundColor = 'yellow'
    }
}

function checkGame() {
    checkCells([[0, 0], [1, 1], [2, 2]])
    checkCells([[2, 0], [1, 1], [0, 2]])

    checkCells([[0, 0], [0, 1], [0, 2]])
    checkCells([[1, 0], [1, 1], [1, 2]])
    checkCells([[2, 0], [2, 1], [2, 2]])
    checkCells([[0, 0], [1, 0], [2, 0]])
    checkCells([[0, 1], [1, 1], [2, 1]])
    checkCells([[0, 2], [1, 2], [2, 2]])
}

var lastMark = 'O'
function dropMark() {
    if (this.textContent == '' && !gameFinished) {
        if (lastMark == 'O')
            this.textContent = globalThis.lastMark = 'X'
        else
            this.textContent = globalThis.lastMark = 'O'
        totalMarks++;
        if (totalMarks == 9)
            restart.classList.replace('btn-outline-success', 'btn-success')
        checkGame()
    }
}