document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start-button');
    const setupDiv = document.getElementById('setup');
    const gameContainer = document.getElementById('game');
    const block = document.getElementById('block');
    const scoreSpan = document.getElementById('score');
    const timeLeftSpan = document.getElementById('time-left');
    


    const difficulties = {
        easy:    { time: 8, size: 60, range: 0.5 },
        normal:  { time: 4, size: 45, range: 0.75 },
        hard:    { time: 1, size: 30, range: 1 }
    };

    let score = 0;
    let timeLeft = 0;
    let timer = null;
    let gameActive = false;
    let currentDifficulty = null;

    startButton.addEventListener('click', () => {
        const difficultyKey = document.getElementById('difficulty').value;
        const color = document.getElementById('color').value;

        currentDifficulty = difficulties[difficultyKey];
        block.style.backgroundColor = color;

        const easterEgg = document.getElementById('easter-egg');

        if (difficultyKey === 'hard' && color === '#F8F8F8') 
        {
            easterEgg.textContent = "Удачі піймати примару (:";
        } 
        else 
        {
            easterEgg.textContent = "";
        }
        setupDiv.style.display = 'none';
        gameContainer.style.display = 'block';
        
        startGame();
    });

    function startGame() {
        score = 0;
        updateScore();
        gameActive = true;
        block.style.pointerEvents = 'auto';
        setBlockSize(currentDifficulty.size);
        moveBlock();
        startTimer();
    }

    function updateScore() {
        scoreSpan.textContent = score;
    }

    function setBlockSize(size) {
        block.style.width = `${size}px`;
        block.style.height = `${size}px`;
    }

    function moveBlock() {
        const gameArea = gameContainer.getBoundingClientRect();
        const maxX = gameArea.width - block.offsetWidth;
        const maxY = gameArea.height - block.offsetHeight;

        const range = currentDifficulty.range;

        const randomX = Math.random() * maxX * range;
        const randomY = Math.random() * maxY * range;

        block.style.left = `${randomX}px`;
        block.style.top = `${randomY}px`;
    }

    function startTimer() {
        timeLeft = currentDifficulty.time;
        timeLeftSpan.textContent = timeLeft;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timeLeftSpan.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        gameActive = false;
        block.style.pointerEvents = 'none';
        alert(`Гра завершена! Ваш рахунок: ${score} \n Перезагрузіть сторінку щоб почати нову гру`);
    }

    block.addEventListener('click', () => {
        if (!gameActive) return;
        score++;
        updateScore();
        clearInterval(timer);
        moveBlock();
        startTimer();
        const easterEgg = document.getElementById('easter-egg');
        const currentColor = block.style.backgroundColor;
        const isGhostMode = currentDifficulty.time === 1 && currentColor === '#F8F8F8';
    
        if (isGhostMode)
        {
            if (score >= 20) {
                easterEgg.textContent = "Ясно понятно, чіти вирубай";
            } else if (score >= 10) {
                easterEgg.textContent = "Бро... схаменися";
            } else if (score >= 3) {
                easterEgg.textContent = "Як ти це робиш?";
            }
        }
    });
});
