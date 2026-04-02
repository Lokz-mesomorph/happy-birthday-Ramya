// --- 1. CONFIGURATION ---
const NAME = "Ramya"; // 👈 CHANGE THIS TO HER NAME
const MUSIC_VOLUME = 0.5;

// --- 2. ELEMENTS ---
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const flame = document.getElementById('flame');
const overlay = document.getElementById('overlay');
const card = document.getElementById('card');
const container = document.getElementById('main-card');
const greetingEl = document.getElementById('greeting');
const audio = document.getElementById('bg-music');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 3. INTRO SEQUENCE ---
document.getElementById('open-btn').addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 1000);
    
    container.classList.add('show');
    audio.volume = MUSIC_VOLUME;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    startHearts();
    typeWriter();
});

// --- 4. TYPEWRITER EFFECT ---
const textToType = `Happy Birthday, ${NAME}! 🎂`;
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        greetingEl.textContent += textToType.charAt(charIndex);
        greetingEl.classList.add('typing');
        charIndex++;
        setTimeout(typeWriter, 100); // Speed of typing
    } else {
        greetingEl.classList.remove('typing');
        document.getElementById('body-text').style.display = 'block';
        document.getElementById('body-text').style.animation = 'fadeIn 1s';
        document.getElementById('wish-btn').style.display = 'inline-block';
        document.getElementById('wish-btn').classList.add('hidden-text'); // Remove helper
        document.getElementById('wish-btn').style.display = 'block'; // Ensure visible
    }
}

// --- 5. INTERACTION ---
function makeWish() {
    flame.classList.add('out');
    const btn = document.getElementById('wish-btn');
    btn.textContent = "🎉 Wish Made! 🎉";
    btn.style.background = "#4caf50";
    startConfetti();
}

// --- 6. BACKGROUND HEARTS ---
function startHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

// --- 7. CONFETTI LOGIC ---
let particles = [];
const COLORS = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#ffbe0b', '#fb5607', '#8338ec', '#3a86ff'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 10 + 5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.speedY = Math.random() * 4 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.rotation = Math.random() * 360;
        this.opacity = 1;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += 5;
        if (this.y > canvas.height - 50) this.opacity -= 0.02;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function startConfetti() {
    for (let i = 0; i < 200; i++) particles.push(new Particle());
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.opacity <= 0) particles.splice(i, 1);
    });
    if (particles.length > 0) requestAnimationFrame(animate);
}
