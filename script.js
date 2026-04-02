// --- Configuration ---
const PARTICLE_COUNT = 150;
const COLORS = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#ffbe0b', '#fb5607', '#8338ec', '#3a86ff'];

// --- Elements ---
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const flame = document.getElementById('flame');
const btn = document.getElementById('wish-btn');
const card = document.getElementById('card');

// --- Resize Canvas ---
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Confetti Logic ---
let particles = [];
let animationRunning = false;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.opacity = 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        // Fade out near bottom
        if (this.y > canvas.height - 50) {
            this.opacity -= 0.02;
        }
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
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.opacity <= 0 || p.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        requestAnimationFrame(animate);
    }
}

// --- Interaction ---
function makeWish() {
    // 1. Blow out candle
    flame.classList.add('out');
    
    // 2. Change Button Text
    btn.textContent = "🎉 Wish Made! 🎉";
    btn.style.background = "#4caf50";
    btn.style.pointerEvents = "none";

    // 3. Trigger Confetti
    startConfetti();

    // 4. Play a sound (Optional: Add an mp3 file named 'happy.mp3' to your folder and uncomment below)
    /* 
    let audio = new Audio('happy.mp3');
    audio.play();
    */
}

// --- 3D Tilt Effect ---
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
