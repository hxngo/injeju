// 🎯 React Bits Style Target Cursor - Performance Optimized Implementation

class ReactBitsTargetCursor {
  constructor() {
    this.isInitialized = false;
    this.cursorWrapper = null;
    this.currentElement = null;
    
    // Performance optimized variables
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    
    // Simplified configuration
    this.config = {
      easing: 0.12,
      magnetRadius: 60,
      magnetStrength: 0.3
    };
    
    this.animationId = null;
    this.init();
  }
  
  init() {
    if (this.isInitialized) return;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createCursor());
    } else {
      this.createCursor();
    }
  }
  
  createCursor() {
    console.log('Creating cursor...');
    
    // Create simplified cursor structure
    this.cursorWrapper = document.createElement('div');
    this.cursorWrapper.className = 'target-cursor-wrapper';
    
    this.cursorWrapper.innerHTML = `
      <div class="target-cursor-dot"></div>
      <div class="target-cursor-corner corner-tl"></div>
      <div class="target-cursor-corner corner-tr"></div>
      <div class="target-cursor-corner corner-br"></div>
      <div class="target-cursor-corner corner-bl"></div>
    `;
    
    document.body.appendChild(this.cursorWrapper);
    
    // 디버그: 커서 요소가 제대로 생성되었는지 확인
    console.log('Cursor wrapper:', this.cursorWrapper);
    console.log('Cursor wrapper style:', getComputedStyle(this.cursorWrapper));
    
    // 강제로 초기 위치 설정 (화면 중앙)
    this.cursorWrapper.style.left = (window.innerWidth / 2) + 'px';
    this.cursorWrapper.style.top = (window.innerHeight / 2) + 'px';
    this.cursorWrapper.style.display = 'block';
    this.cursorWrapper.style.visibility = 'visible';
    
    this.setupEventListeners();
    this.startAnimation();
    
    this.isInitialized = true;
    console.log('🎯 React Bits Target Cursor initialized (optimized)');
  }
  
  setupEventListeners() {
    // Optimized mouse movement tracking
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Show/hide cursor
    document.addEventListener('mouseenter', () => {
      this.cursorWrapper.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      this.cursorWrapper.style.opacity = '0';
    });
    
    // 색상 변화 효과 제거 - 호버/클릭 시에도 동일한 모양 유지
    const interactiveElements = document.querySelectorAll(
      'button, .btn, a, .nav-link, .cursor-target, .clickable-part'
    );
    
    interactiveElements.forEach(el => {
      // 색상 변화 클래스 추가 제거
      // el.addEventListener('mouseenter', () => {
      //   this.cursorWrapper.classList.add('magnetic');
      // });
      
      // el.addEventListener('mouseleave', () => {
      //   this.cursorWrapper.classList.remove('magnetic');
      // });
      
      // el.addEventListener('mousedown', () => {
      //   this.cursorWrapper.classList.add('expanded');
      // });
      
      // el.addEventListener('mouseup', () => {
      //   this.cursorWrapper.classList.remove('expanded');
      // });
    });
  }
  
  startAnimation() {
    const animate = () => {
      // Smooth cursor following with easing
      this.cursorX += (this.mouseX - this.cursorX) * this.config.easing;
      this.cursorY += (this.mouseY - this.cursorY) * this.config.easing;
      
      // Update cursor position
      this.cursorWrapper.style.left = this.cursorX + 'px';
      this.cursorWrapper.style.top = this.cursorY + 'px';
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.cursorWrapper) {
      this.cursorWrapper.remove();
    }
  }
}

// Auto-initialize for desktop
if (window.innerWidth > 768) {
  window.reactBitsTargetCursor = new ReactBitsTargetCursor();
}

console.log('🎯 React Bits Target Cursor loaded (performance optimized)');
