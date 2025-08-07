// 🧲 Enhanced Magnetic Target Cursor - 요소 인식 개선
document.addEventListener('DOMContentLoaded', function() {
  
  // 커서 HTML 구조 생성
  const cursorWrapper = document.createElement('div');
  cursorWrapper.className = 'target-cursor-wrapper';
  
  cursorWrapper.innerHTML = `
    <div class="target-cursor-dot"></div>
    <div class="target-cursor-corner corner-tl"></div>
    <div class="target-cursor-corner corner-tr"></div>
    <div class="target-cursor-corner corner-br"></div>
    <div class="target-cursor-corner corner-bl"></div>
  `;
  
  document.body.appendChild(cursorWrapper);

  const corners = {
    tl: cursorWrapper.querySelector('.corner-tl'),
    tr: cursorWrapper.querySelector('.corner-tr'),
    br: cursorWrapper.querySelector('.corner-br'),
    bl: cursorWrapper.querySelector('.corner-bl')
  };

  let currentElement = null;
  let isExpanded = false;
  let magneticElement = null;
  
  // 🧲 자석 효과 변수 (더 민감하게 조정)
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let magnetStrength = 0.4; // 자석 세기 증가 (0.3 → 0.4)
  let magnetRadius = 100; // 자석 효과 반경 증가 (80px → 100px)
  
  // 🎯 모든 인터랙티브 요소들 포함
  const interactiveSelectors = [
    // 기본 요소들
    'button', 'a', 'input', 'textarea', 'select',
    // 클래스 기반 요소들
    '.btn', '.btn-enhanced', '.nav-link', '.cursor-target',
    '.test-button', '.test-card', '.test-input', '.test-large',
    '.demo-btn', '.demo-card', '.demo-link', '.demo-input', '.demo-large',
    // 네비게이션 요소들
    '.navbar-links a', '.nav-link', '.navbar-brand',
    // 파일 관련 요소들
    '.file-drop', '.file-item', '.upload-btn',
    // 일반적인 클릭 가능한 요소들
    '[onclick]', '[href]', '[role="button"]', '[tabindex]',
    // 커스텀 속성
    '[data-cursor-target]', '[data-magnetic]',
    // HTML5 요소들
    'summary', 'details', 'label',
    // 추가적인 인터랙티브 요소들
    '.clickable', '.interactive', '.hoverable',
    // 특정 태그들
    'li a', 'div[onclick]', 'span[onclick]'
  ];
  
  // 🎯 부드러운 애니메이션을 위한 requestAnimationFrame
  function updateCursor() {
    let targetX = mouseX;
    let targetY = mouseY;
    
    // 🧲 자석 효과 계산 (개선된 버전)
    if (magneticElement && !isExpanded) {
      const rect = magneticElement.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - elementCenterX, 2) + 
        Math.pow(mouseY - elementCenterY, 2)
      );
      
      // 자석 반경 내에 있을 때만 효과 적용
      if (distance < magnetRadius) {
        const magnetForce = Math.max(0, 1 - (distance / magnetRadius));
        const pullStrength = Math.pow(magnetForce, 1.5) * magnetStrength; // 곡선 강도 적용
        
        targetX = mouseX + (elementCenterX - mouseX) * pullStrength;
        targetY = mouseY + (elementCenterY - mouseY) * pullStrength;
        
        // 자석 효과 시각적 피드백
        cursorWrapper.classList.add('magnetic');
      } else {
        cursorWrapper.classList.remove('magnetic');
      }
    } else {
      cursorWrapper.classList.remove('magnetic');
    }
    
    // 부드러운 이동 (easing) - 더 반응성 있게
    const easing = isExpanded ? 0.25 : 0.18;
    cursorX += (targetX - cursorX) * easing;
    cursorY += (targetY - cursorY) * easing;
    
    // 커서 위치 업데이트
    cursorWrapper.style.left = cursorX + 'px';
    cursorWrapper.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
  }
  
  // 애니메이션 시작
  updateCursor();

  // 호버 가능한 요소들 배열
  let hoverElements = [];
  
  // 🔍 개선된 요소 감지 시스템
  function getAllInteractiveElements() {
    const elements = new Set();
    
    // 각 셀렉터로 요소들 찾기
    interactiveSelectors.forEach(selector => {
      try {
        const found = document.querySelectorAll(selector);
        found.forEach(el => {
          // 보이는 요소만 추가 (display: none이나 숨겨진 요소 제외)
          const style = window.getComputedStyle(el);
          if (style.display !== 'none' && 
              style.visibility !== 'hidden' && 
              style.opacity !== '0' &&
              el.offsetWidth > 0 && 
              el.offsetHeight > 0) {
            elements.add(el);
          }
        });
      } catch (e) {
        // 잘못된 셀렉터 무시
        console.warn('Invalid selector:', selector);
      }
    });
    
    return Array.from(elements);
  }

  // 🖱️ 마우스 움직임 추적 (개선된 버전)
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // 🧲 가장 가까운 자석 요소 찾기 (개선된 알고리즘)
    if (!isExpanded && hoverElements.length > 0) {
      let closestElement = null;
      let closestDistance = magnetRadius;
      
      hoverElements.forEach(element => {
        try {
          const rect = element.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - elementCenterX, 2) + 
            Math.pow(mouseY - elementCenterY, 2)
          );
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = element;
          }
        } catch (e) {
          // 요소가 DOM에서 제거된 경우 무시
        }
      });
      
      magneticElement = closestElement;
    }
    
    // 현재 호버 중인 요소 범위 체크 (여유 공간 추가)
    if (currentElement && isExpanded) {
      const rect = currentElement.getBoundingClientRect();
      const margin = 15; // 여유 공간
      if (e.clientX < rect.left - margin || e.clientX > rect.right + margin || 
          e.clientY < rect.top - margin || e.clientY > rect.bottom + margin) {
        resetCursor();
      }
    }
  });

  // 🔄 요소 설정 함수 (대폭 개선)
  function setupHoverElements() {
    hoverElements = getAllInteractiveElements();
    
    console.log(`🎯 발견된 인터랙티브 요소: ${hoverElements.length}개`);
    
    hoverElements.forEach((element, index) => {
      // 기존 이벤트 리스너 제거 (중복 방지)
      element.removeEventListener('mouseenter', element._magneticEnter);
      element.removeEventListener('mouseleave', element._magneticLeave);
      
      // 새로운 이벤트 리스너 함수 생성
      element._magneticEnter = function(e) {
        if (!isExpanded) {
          expandToElement(this);
        }
      };
      
      element._magneticLeave = function(e) {
        // 더 관대한 leave 감지
        setTimeout(() => {
          if (isExpanded && currentElement === this) {
            const rect = this.getBoundingClientRect();
            const margin = 25;
            if (mouseX < rect.left - margin || mouseX > rect.right + margin || 
                mouseY < rect.top - margin || mouseY > rect.bottom + margin) {
              resetCursor();
            }
          }
        }, 30);
      };
      
      // 이벤트 리스너 등록
      element.addEventListener('mouseenter', element._magneticEnter);
      element.addEventListener('mouseleave', element._magneticLeave);
      
      // 디버그: 요소에 표시 (개발용)
      if (window.location.pathname.includes('cursor-test')) {
        element.setAttribute('data-magnetic-index', index);
        element.style.position = 'relative';
      }
    });
    
    // 자석 효과 범위 시각화 (개발용)
    if (window.location.pathname.includes('cursor-test')) {
      console.log(`🧲 자석 반경: ${magnetRadius}px, 세기: ${magnetStrength}`);
    }
  }

  // 🎯 확장 로직
  function expandToElement(element) {
    currentElement = element;
    isExpanded = true;
    magneticElement = null; // 확장 시 자석 효과 비활성화
    
    const rect = element.getBoundingClientRect();
    
    // 요소의 중심점을 기준으로 상대적 위치 계산
    const width = rect.width;
    const height = rect.height;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    
    // 각 모서리의 위치 계산 (요소의 경계선에 맞춤)
    corners.tl.style.transform = `translate(-${halfWidth + 6}px, -${halfHeight + 6}px)`;
    corners.tr.style.transform = `translate(${halfWidth - 6}px, -${halfHeight + 6}px)`;
    corners.br.style.transform = `translate(${halfWidth - 6}px, ${halfHeight - 6}px)`;
    corners.bl.style.transform = `translate(-${halfWidth + 6}px, ${halfHeight - 6}px)`;
    
    cursorWrapper.classList.add('expanded');
    
    // 🧲 확장 시 부드러운 중심 이동
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    cursorX = elementCenterX;
    cursorY = elementCenterY;
    
    console.log('🎯 확장:', element.tagName, element.className);
  }

  // 🔄 커서 초기 상태로 복원
  function resetCursor() {
    currentElement = null;
    isExpanded = false;
    
    // 기본 위치로 복원
    corners.tl.style.transform = 'translate(-150%, -150%)';
    corners.tr.style.transform = 'translate(50%, -150%)';
    corners.br.style.transform = 'translate(50%, 50%)';
    corners.bl.style.transform = 'translate(-150%, 50%)';
    
    cursorWrapper.classList.remove('expanded');
    
    console.log('🔄 커서 리셋');
  }

  // 초기 설정
  setupHoverElements();
  
  // 🔍 강화된 MutationObserver - DOM 변경 감지
  let observerTimeout;
  const observer = new MutationObserver(function(mutations) {
    let shouldUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // 새로운 노드가 추가되었는지 확인
        if (mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      }
    });
    
    if (shouldUpdate) {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        setupHoverElements();
        console.log('🔄 DOM 변경 감지 - 요소 재스캔');
      }, 200);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false // 속성 변경은 무시 (성능 최적화)
  });

  // 🎯 수동 업데이트 함수 (디버그용)
  window.updateMagneticCursor = function() {
    setupHoverElements();
    console.log('🔄 수동 업데이트 완료');
  };

  console.log('🧲 Enhanced Magnetic Target Cursor 초기화 완료!');
  console.log(`📏 자석 반경: ${magnetRadius}px, 세기: ${magnetStrength}`);
  console.log(`🎯 감지된 요소: ${hoverElements.length}개`);
});