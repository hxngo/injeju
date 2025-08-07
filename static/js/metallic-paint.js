// 🎨 React Bits Style Metallic Paint Effect Implementation
class MetallicPaint {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.imageData = null;
    this.animationId = null;
    this.params = {
      edge: 2,
      patternBlur: 0.005,
      patternScale: 2,
      refraction: 0.015,
      speed: 0.3,
      liquid: 0.07
    };
    this.time = 0;
  }

  // 🖼️ Parse logo image and extract ImageData
  static async parseLogoImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Extract image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        resolve({
          imageData,
          width: canvas.width,
          height: canvas.height,
          canvas
        });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = imageUrl;
    });
  }

  // 🎯 Initialize metallic effect on logo element
  static async initializeMetallicLogo(logoElement, options = {}) {
    try {
      // Get image source
      const imageSrc = logoElement.src || logoElement.getAttribute('src');
      if (!imageSrc) {
        throw new Error('No image source found');
      }

      // Parse image
      const logoData = await MetallicPaint.parseLogoImage(imageSrc);
      
      // Create metallic paint instance
      const metallicPaint = new MetallicPaint();
      
      // Configure parameters
      metallicPaint.params = {
        ...metallicPaint.params,
        ...options
      };
      
      // Apply effect
      metallicPaint.applyToElement(logoElement, logoData);
      
      return metallicPaint;
      
    } catch (error) {
      console.error('Failed to initialize metallic logo:', error);
      
      // Fallback to CSS-only effect
      MetallicPaint.applyCSSFallback(logoElement);
      return null;
    }
  }

  // 🎨 Apply metallic effect to element
  applyToElement(element, logoData) {
    // Create container
    const container = document.createElement('div');
    container.className = 'metallic-logo-container premium';
    
    // Wrap original element
    element.parentNode.insertBefore(container, element);
    container.appendChild(element);
    
    // Add metallic classes
    element.classList.add('metallic-logo', 'metallic-logo-navbar');
    
    // Create refraction layer
    const refractionLayer = document.createElement('div');
    refractionLayer.className = 'metallic-refraction';
    container.appendChild(refractionLayer);
    
    // Create canvas for advanced effects
    this.createCanvas(container, logoData);
    
    // Start animation
    this.startAnimation();
    
    // Add interaction handlers
    this.addInteractionHandlers(container);
  }

  // 🖼️ Create canvas for advanced metallic effects
  createCanvas(container, logoData) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = logoData.width;
    this.canvas.height = logoData.height;
    this.imageData = logoData.imageData;
    
    // Style canvas
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.mixBlendMode = 'overlay';
    this.canvas.style.opacity = '0.6';
    
    container.appendChild(this.canvas);
  }

  // 🌊 Start liquid metal animation
  startAnimation() {
    const animate = () => {
      this.time += this.params.speed * 0.016; // 60fps normalized
      
      if (this.canvas && this.ctx && this.imageData) {
        this.renderMetallicEffect();
      }
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  // ✨ Render metallic effect frame
  renderMetallicEffect() {
    const { width, height } = this.canvas;
    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Generate liquid metal pattern
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        
        // Original pixel
        const originalIndex = index;
        const alpha = this.imageData.data[originalIndex + 3];
        
        if (alpha > 128) { // Only process non-transparent pixels
          // Calculate liquid metal color
          const metallic = this.calculateMetallicColor(x, y, width, height);
          
          data[index] = metallic.r;     // Red
          data[index + 1] = metallic.g; // Green
          data[index + 2] = metallic.b; // Blue
          data[index + 3] = alpha * 0.8; // Alpha
        } else {
          data[index + 3] = 0; // Transparent
        }
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // 🎨 Calculate metallic color for pixel
  calculateMetallicColor(x, y, width, height) {
    const normalizedX = x / width;
    const normalizedY = y / height;
    
    // Create flowing liquid pattern
    const wave1 = Math.sin(normalizedX * Math.PI * 4 + this.time) * 0.5 + 0.5;
    const wave2 = Math.cos(normalizedY * Math.PI * 3 + this.time * 0.7) * 0.5 + 0.5;
    const wave3 = Math.sin((normalizedX + normalizedY) * Math.PI * 2 + this.time * 1.3) * 0.5 + 0.5;
    
    // Combine waves for complex pattern
    const pattern = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3);
    
    // Apply refraction effect
    const refraction = this.params.refraction;
    const refractionX = Math.sin(normalizedY * Math.PI * 8 + this.time * 2) * refraction;
    const refractionY = Math.cos(normalizedX * Math.PI * 6 + this.time * 1.5) * refraction;
    
    // Calculate final color
    const baseHue = (pattern + refractionX + refractionY + this.time * 0.1) % 1;
    const saturation = 0.8 + pattern * 0.2;
    const lightness = 0.5 + pattern * 0.3;
    
    return this.hslToRgb(baseHue * 360, saturation, lightness);
  }

  // 🌈 Convert HSL to RGB
  hslToRgb(h, s, l) {
    h = h / 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 1/6) {
      r = c; g = x; b = 0;
    } else if (h < 2/6) {
      r = x; g = c; b = 0;
    } else if (h < 3/6) {
      r = 0; g = c; b = x;
    } else if (h < 4/6) {
      r = 0; g = x; b = c;
    } else if (h < 5/6) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  // 🎯 Add interaction handlers
  addInteractionHandlers(container) {
    let isHovering = false;
    
    container.addEventListener('mouseenter', () => {
      isHovering = true;
      this.params.speed = 0.6; // Faster animation on hover
      container.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    container.addEventListener('mouseleave', () => {
      isHovering = false;
      this.params.speed = 0.3; // Normal speed
      container.style.transform = '';
    });
    
    // Mouse movement effect
    container.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      container.style.transform = `
        scale(1.05) 
        translateY(-2px) 
        rotateX(${deltaY * 5}deg) 
        rotateY(${deltaX * 5}deg)
      `;
    });
  }

  // 🎭 CSS Fallback for unsupported browsers
  static applyCSSFallback(element) {
    // Create container
    const container = document.createElement('div');
    container.className = 'metallic-logo-container premium';
    
    // Wrap original element
    element.parentNode.insertBefore(container, element);
    container.appendChild(element);
    
    // Add metallic classes
    element.classList.add('metallic-logo', 'metallic-logo-navbar');
    
    // Create refraction layer
    const refractionLayer = document.createElement('div');
    refractionLayer.className = 'metallic-refraction';
    container.appendChild(refractionLayer);
    
    console.log('🎨 Applied CSS fallback for metallic logo effect');
  }

  // 🛑 Stop animation and cleanup
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }
  }
}

// 🚀 Auto-initialize metallic logos on page load
document.addEventListener('DOMContentLoaded', function() {
  // Find all logo images
  const logoSelectors = [
    '.navbar-brand img',
    '.logo',
    '.brand-logo',
    '[data-metallic-logo]'
  ];
  
  logoSelectors.forEach(selector => {
    const logos = document.querySelectorAll(selector);
    logos.forEach(async (logo) => {
      try {
        await MetallicPaint.initializeMetallicLogo(logo, {
          edge: 2,
          patternBlur: 0.005,
          patternScale: 2,
          refraction: 0.015,
          speed: 0.3,
          liquid: 0.07
        });
        console.log('🎨 Metallic effect applied to logo:', selector);
      } catch (error) {
        console.warn('Failed to apply metallic effect:', error);
      }
    });
  });
});

// 📦 Export for manual usage
window.MetallicPaint = MetallicPaint;

// 🎛️ Utility functions
window.MetallicPaintUtils = {
  // Apply to specific element
  applyToElement: async (element, options = {}) => {
    return await MetallicPaint.initializeMetallicLogo(element, options);
  },
  
  // Parse image data
  parseImage: async (imageUrl) => {
    return await MetallicPaint.parseLogoImage(imageUrl);
  },
  
  // Create custom metallic element
  createMetallicElement: (imageUrl, container, options = {}) => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = async () => {
      await MetallicPaint.initializeMetallicLogo(img, options);
      container.appendChild(img);
    };
  }
};