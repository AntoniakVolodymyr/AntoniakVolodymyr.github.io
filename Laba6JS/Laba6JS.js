const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const counterEl = document.getElementById('counter');
let clickCount = 0;
let grid = [];

const variants = ['variant1.json', 'variant2.json', 'variant3.json'];
const randomFile = variants[Math.floor(Math.random() * variants.length)];
const url = `data/${randomFile}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    grid = data;
    render();
    attachEvents();
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
      clickCount++;
      toggle(row, col);
      toggle(row - 1, col);
      toggle(row + 1, col);
      toggle(row, col - 1);
      toggle(row, col + 1);
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
}

function updateCounter() {
  counterEl.textContent = `Кількість кліків: ${clickCount}`;
}

restartBtn.addEventListener('click', () => {
  location.reload();
});


