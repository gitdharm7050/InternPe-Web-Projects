const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';
const boardEl = document.getElementById('board');
const message = document.getElementById('message');

// Initialize board
function createBoard() {
  board = Array(rows).fill().map(() => Array(cols).fill(null));
  boardEl.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => dropToken(c));
      boardEl.appendChild(cell);
    }
  }
}

function dropToken(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      updateBoard();
      if (checkWinner(row, col)) {
        message.textContent = `🎉 Player ${currentPlayer === 'red' ? '1' : '2'} wins!`;
        boardEl.style.pointerEvents = 'none';
        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      message.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'}'s turn ${currentPlayer === 'red' ? '🔴' : '🟡'}`;
      return;
    }
  }
}

function updateBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      cell.classList.remove('red', 'yellow');
      if (board[r][c]) {
        cell.classList.add(board[r][c]);
      }
    }
  }
}

function checkWinner(r, c) {
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];
  const color = board[r][c];

  for (let [dr, dc] of directions) {
    let count = 1;
    let i = 1;
    while (inBounds(r + dr * i, c + dc * i) && board[r + dr * i][c + dc * i] === color) {
      count++;
      i++;
    }
    i = 1;
    while (inBounds(r - dr * i, c - dc * i) && board[r - dr * i][c - dc * i] === color) {
      count++;
      i++;
    }
    if (count >= 4) return true;
  }
  return false;
}

function inBounds(r, c) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function resetGame() {
  currentPlayer = 'red';
  message.textContent = `Player 1's turn 🔴`;
  boardEl.style.pointerEvents = 'auto';
  createBoard();
}

createBoard();
