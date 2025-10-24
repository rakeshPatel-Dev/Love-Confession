const yesButton = document.querySelector('.yes-btn');
const noButton = document.querySelector('.no-btn');
const container = document.querySelector('.container');

const pickupContainer = document.querySelector('.pickup-container');
const close = document.querySelector('.close');
const pickuplineText = document.querySelector('.pickupline-text');
const heartsLayer = document.querySelector('.hearts');

function getRandomLine() {
  const lines = window.PICKUP_LINES || [];
  if (!lines.length) return 'You are my favorite notification.';
  const index = Math.floor(Math.random() * lines.length);
  return lines[index];
}

function showPopup() {
  pickuplineText.textContent = getRandomLine();
  pickupContainer.style.display = 'block';
  container.classList.add('dimmed');
}

function hidePopup() {
  pickupContainer.style.display = 'none';
  container.classList.remove('dimmed');
}

function moveNoButtonRandomly() {
  const containerRect = container.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxLeft = containerRect.width - btnRect.width;
  const maxTop = containerRect.height - btnRect.height;

  const randomLeft = Math.max(0, Math.floor(Math.random() * maxLeft));
  const randomTop = Math.max(0, Math.floor(Math.random() * maxTop));

  // Switch to absolute within the container for free movement
  noButton.style.position = 'absolute';
  // Convert container-relative position
  noButton.style.left = randomLeft + 'px';
  noButton.style.top = randomTop + 'px';
}

// Wire events
noButton.addEventListener('click', () => {
  moveNoButtonRandomly();
  showPopup();
});

close.addEventListener('click', () => {
  hidePopup();
});

// clicking outside popup won't happen since we only dim the container

yesButton.addEventListener('click', () => {
  pickuplineText.textContent = 'Yay! You just made my day ❤️';
  pickupContainer.style.display = 'block';
  container.classList.add('dimmed');
  heartBurst();
  heartFlood();
});

// Hearts background animation
function createHeart({ xPercent, sizePx, durationMs, delayMs, speedFactor }) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = xPercent + 'vw';
  heart.style.bottom = '-20px';
  heart.style.width = sizePx + 'px';
  heart.style.height = sizePx + 'px';
  heart.style.animationDuration = (durationMs / 1000) + 's';
  heart.style.animationDelay = (delayMs / 1000) + 's';
  heart.style.opacity = (0.5 + Math.random() * 0.4).toFixed(2);
  heartsLayer.appendChild(heart);

  const remove = () => heart.remove();
  heart.addEventListener('animationend', remove);
}

function seedFloatingHearts() {
  if (!heartsLayer) return;
  // initial batch
  for (let i = 0; i < 18; i++) {
    createHeart({
      xPercent: Math.random() * 100,
      sizePx: 10 + Math.random() * 18,
      durationMs: 9000 + Math.random() * 6000,
      delayMs: Math.random() * 4000,
      speedFactor: 1
    });
  }
  // continuous gentle spawn
  setInterval(() => {
    createHeart({
      xPercent: Math.random() * 100,
      sizePx: 8 + Math.random() * 20,
      durationMs: 9000 + Math.random() * 7000,
      delayMs: 0,
      speedFactor: 1
    });
  }, 700);
}

function heartBurst() {
  if (!heartsLayer) return;
  const burstContainer = document.createElement('div');
  burstContainer.className = 'hearts burst';
  document.body.appendChild(burstContainer);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 80; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 10 + Math.random() * 24;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 280;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');
    heart.style.animationDuration = (0.9 + Math.random() * 0.9) + 's';
    heart.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);

    burstContainer.appendChild(heart);
  }

  setTimeout(() => {
    burstContainer.remove();
  }, 1800);
}

seedFloatingHearts();

function heartFlood() {
  if (!heartsLayer) return;
  const floodContainer = document.createElement('div');
  floodContainer.className = 'hearts';
  document.body.appendChild(floodContainer);

  const total = 120;
  for (let i = 0; i < total; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart stay';
    const size = 10 + Math.random() * 26;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.animationDelay = (Math.random() * 0.6) + 's';
    heart.style.opacity = (0.6 + Math.random() * 0.35).toFixed(2);
    floodContainer.appendChild(heart);
  }

  setTimeout(() => {
    floodContainer.remove();
  }, 3200);
}
