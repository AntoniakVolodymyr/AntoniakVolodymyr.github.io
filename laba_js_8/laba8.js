// Гамбургер
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('show');
});

// Карусель
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.style.background = i === index ? 'black' : 'gray';
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Індикатори
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
  dotsContainer.appendChild(dot);
});

showSlide(currentIndex);
setInterval(nextSlide, 5000);
