// LightRays.js - Simple light rays effect
window.LightRays = function(options) {
  const defaults = {
    container: document.body,
    raysOrigin: 'top-center',
    raysColor: '#00ffff',
    raysSpeed: 1.5,
    lightSpread: 0.8,
    rayLength: 1.2,
    followMouse: true,
    mouseInfluence: 0.1,
    noiseAmount: 0.1,
    distortion: 0.05
  };
  
  const config = Object.assign({}, defaults, options);
  
  // Create canvas for light rays
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.3';
  
  if (config.container) {
    config.container.appendChild(canvas);
  }
  
  const ctx = canvas.getContext('2d');
  let animationId;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simple light ray effect
    const centerX = canvas.width / 2;
    const centerY = 0;
    const time = Date.now() * 0.001;
    
    ctx.save();
    
    // Create gradient rays
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * config.raysSpeed;
      const gradient = ctx.createLinearGradient(
        centerX, centerY,
        centerX + Math.cos(angle) * canvas.height,
        centerY + Math.sin(angle) * canvas.height
      );
      
      gradient.addColorStop(0, config.raysColor + '33');
      gradient.addColorStop(0.5, config.raysColor + '11');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle - 0.1) * canvas.height, centerY + Math.sin(angle - 0.1) * canvas.height);
      ctx.lineTo(centerX + Math.cos(angle + 0.1) * canvas.height, centerY + Math.sin(angle + 0.1) * canvas.height);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Initialize
  resize();
  animate();
  
  window.addEventListener('resize', resize);
  
  // Cleanup function
  this.destroy = function() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resize);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
};

console.log('LightRays.js loaded successfully');
