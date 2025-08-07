// 🚀 Lightweight Metallic Paint - Performance Optimized
class MetallicPaintLite {
  constructor() {
    this.logoElements = [];
    this.isInitialized = false;
  }

  // 🎯 Simple CSS-only initialization
  static initializeMetallicLogo(logoElement) {
    try {
      // Create container (simple version)
      const container = document.createElement('div');
      container.className = 'metallic-logo-container';
      
      // Wrap original element
      logoElement.parentNode.insertBefore(container, logoElement);
      container.appendChild(logoElement);
      
      // Add metallic classes
      logoElement.classList.add('metallic-logo', 'metallic-logo-navbar');
      
      console.log('🎨 Lightweight metallic effect applied');
      return true;
      
    } catch (error) {
      console.error('Failed to apply metallic effect:', error);
      return false;
    }
  }

  // 🔧 Auto-initialize on page load (lightweight)
  static autoInitialize() {
    const logoSelectors = [
      '.navbar-brand img',
      '[data-metallic-logo]'
    ];
    
    let appliedCount = 0;
    
    logoSelectors.forEach(selector => {
      const logos = document.querySelectorAll(selector);
      logos.forEach((logo) => {
        if (MetallicPaintLite.initializeMetallicLogo(logo)) {
          appliedCount++;
        }
      });
    });
    
    console.log(`🚀 Applied lightweight metallic effect to ${appliedCount} logos`);
  }
}

// 🚀 Auto-initialize when DOM is ready (performance-friendly)
document.addEventListener('DOMContentLoaded', function() {
  // Only apply on desktop with good performance
  if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    MetallicPaintLite.autoInitialize();
  } else {
    console.log('🚀 Metallic effects disabled for performance');
  }
});

// 📦 Export for manual usage
window.MetallicPaintLite = MetallicPaintLite;