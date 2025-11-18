// Animation de fond pour EvaM Group - version hero-only
class ParticleBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.colors = {
      primary: '#0021B5',
      secondary: '#FF6B9D',
      light: '#F3F4F6'
    };

    this.init();
  }

  init() {
    const container = document.querySelector('.hero-animation-container');
    if (!container) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particle-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';

    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const container = document.querySelector('.hero-animation-container');
    if (!container) return;

    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
  }

  createParticles() {
    const container = document.querySelector('.hero-animation-container');
    if (!container) return;

    const particleCount = Math.min(40, Math.floor(container.clientWidth / 25));
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.5 ? this.colors.primary : this.colors.secondary,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * 0.02 + 0.01
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    document.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  updateParticles() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      p.opacity += p.pulse;
      if (p.opacity > 0.7 || p.opacity < 0.1) p.pulse = -p.pulse;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        const force = (80 - distance) / 80;
        p.x -= dx * force * 0.02;
        p.y -= dy * force * 0.02;
      }

      if (p.x < 0 || p.x > this.canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > this.canvas.height) p.vy = -p.vy;

      p.x = Math.max(0, Math.min(this.canvas.width, p.x));
      p.y = Math.max(0, Math.min(this.canvas.height, p.y));
    });
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    this.drawConnections();
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.15;
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.colors.light;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Auto-init si .hero-animation-container est présent
if (typeof window !== 'undefined') {
  let particleAnimation = null;

  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.hero-animation-container')) {
      particleAnimation = new ParticleBackground();
    }
  });

  window.addEventListener('beforeunload', () => {
    if (particleAnimation) particleAnimation.destroy();
  });
}

export default ParticleBackground;





