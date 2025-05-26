const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const counterEl = document.getElementById('counter');
const timerEl = document.getElementById('timer');
const minMovesEl = document.getElementById('min-moves');

let clickCount = 0;
let grid = [];
let timer = 0;
let timerInterval;
let oldclicked = (-1,-1);
const variants = ['variant1.json', 'variant2.json', 'variant3.json'];
const randomFile = variants[Math.floor(Math.random() * variants.length)];
const url = `data/${randomFile}`;

let originalGrid = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    grid = JSON.parse(JSON.stringify(data.grid));
    originalGrid = JSON.parse(JSON.stringify(data.grid));  
    render();
    attachEvents();
    startTimer();
    if (data.minMoves !== undefined) {
      minMovesEl.textContent = `Мінімальна кількість ходів: ${data.minMoves}`;
    } else {
      minMovesEl.textContent = `Мінімальна кількість ходів: невідомо`;
    }
  })
  .catch(err => {
    message.textContent = 'Помилка завантаження JSON';
    console.error(err);
  });


function attachEvents() {
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    cell.addEventListener('click', () => {
      toggle(row, col);
      toggle(row - 1, col);
      toggle(row + 1, col);
      toggle(row, col - 1);
      toggle(row, col + 1);
      clicked = (row,col);
      if(clicked === oldclicked)
      {
        clickCount--;
        oldclicked=(-1,-1);
      }
      else if(clicked != oldclicked)
      {
        clickCount++;
        oldclicked = clicked;
      }
      render();
      updateCounter();
      checkWin();
    });
  });
}

function toggle(row, col) {
  if (row < 0 || row > 4 || col < 0 || col > 4) return;
  grid[row][col] = grid[row][col] === 1 ? 0 : 1;
}

function render() {
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (grid[row][col] === 1) {
      cell.classList.add('on');
    } else {
      cell.classList.remove('on');
    }
  });
}

function checkWin() {
  for (let row of grid) {
    if (row.includes(1)) return;
  }
  message.textContent = 'Ви виграли!';
  stopTimer();
}

function updateCounter() {
  counterEl.textContent = `Кількість кліків: ${clickCount}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = `Час: ${timer} сек`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

restartBtn.addEventListener('click', () => {
  grid = JSON.parse(JSON.stringify(originalGrid)); 
  clickCount = 0;
  timer = 0;
  message.textContent = '';
  updateCounter();
  timerEl.textContent = `Час: 0 сек`;  
  render();
  stopTimer();
  startTimer();
});
