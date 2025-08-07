// React Bits Style JavaScript Utilities - Simple Version

class ReactBitsAnimations {
  
  // 1. SplitText Animation
  static splitText(element, options = {}) {
    const {
      delay = 0.1,
      duration = 0.8,
      stagger = 0.05
    } = options;
    
    const text = element.textContent;
    element.innerHTML = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${delay + (index * stagger)}s`;
      span.style.animationDuration = `${duration}s`;
      element.appendChild(span);
    });
    
    element.classList.add('split-text');
  }
  
  // 2. TypeWriter Effect
  static typeWriter(element, options = {}) {
    const {
      speed = 50,
      cursor = true,
      loop = false
    } = options;
    
    const text = element.textContent;
    element.textContent = '';
    
    if (cursor) {
      element.style.borderRight = `3px solid #66fcf1`;
    }
    
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (loop) {
        setTimeout(() => {
          element.textContent = '';
          i = 0;
          type();
        }, 2000);
      }
    };
    
    type();
  }
  
  // 3. Ripple Effect
  static addRipple(button) {
    button.classList.add('btn-ripple');
    
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  }
  
  // 4. Create Particle Background
  static createParticleBackground(container, options = {}) {
    const {
      particleCount = 20,
      speed = 25,
      particleColor = 'rgba(102, 252, 241, 0.4)'
    } = options;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.6';
    
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Resize function
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1
      });
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx * speed * 0.01;
        particle.y += particle.vy * speed * 0.01;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    
    window.addEventListener('resize', resize);
    
    console.log('✨ Particle background created');
  }
  
  // 5. Initialize all animations
  static init(options = {}) {
    console.log('🎨 ReactBitsAnimations initializing...');
    
    // Auto-apply effects
    document.querySelectorAll('.auto-glow').forEach(el => {
      el.classList.add('glow-text');
    });
    
    document.querySelectorAll('.auto-typewriter').forEach(el => {
      this.typeWriter(el, options.typewriter || {});
    });
    
    document.querySelectorAll('.auto-ripple, .btn, button').forEach(btn => {
      this.addRipple(btn);
    });
    
    // Add particle background if enabled
    if (options.particles !== false) {
      setTimeout(() => {
        this.createParticleBackground(document.body, options.particles || {});
      }, 500);
    }
    
    console.log('🎨 ReactBitsAnimations initialized');
  }
}

// Export for global use
window.ReactBitsAnimations = ReactBitsAnimations;

console.log('🎨 ReactBitsAnimations loaded');