import React, { useEffect, useRef, useState } from 'react';
import './TargetCursor.css';

const TargetCursor = ({ 
  spinDuration = 2, 
  hideDefaultCursor = true,
  color = '#fff',
  hoverColor = '#66fcf1'
}) => {
  const cursorWrapperRef = useRef(null);
  const cornersRef = useRef({});
  const dotRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const cursorWrapper = cursorWrapperRef.current;
    if (!cursorWrapper) return;

    // GPU 가속 최적화된 마우스 움직임
    const updateCursorPosition = () => {
      cursorWrapper.style.left = mousePos.x + 'px';
      cursorWrapper.style.top = mousePos.y + 'px';
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (animationRef.current) return;
      animationRef.current = requestAnimationFrame(() => {
        updateCursorPosition();
        animationRef.current = null;
      });
    };

    // 호버 가능한 요소들 설정
    const setupHoverElements = () => {
      const hoverElements = document.querySelectorAll(
        '.cursor-target, button, .btn, .btn-enhanced, .nav-link, a, input, textarea'
      );

      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => expandToElement(element));
        element.addEventListener('mouseleave', () => resetCursor());
      });
    };

    // 요소 크기에 맞춰 커서 확장
    const expandToElement = (element) => {
      if (isExpanded) return;
      
      setIsExpanded(true);
      
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // 요소의 중심점을 기준으로 상대적 위치 계산
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      
      // 각 모서리의 위치 계산 (요소의 경계선에 맞춤)
      const corners = cornersRef.current;
      if (corners.tl) corners.tl.style.transform = `translate(-${halfWidth + 6}px, -${halfHeight + 6}px)`;
      if (corners.tr) corners.tr.style.transform = `translate(${halfWidth - 6}px, -${halfHeight + 6}px)`;
      if (corners.br) corners.br.style.transform = `translate(${halfWidth - 6}px, ${halfHeight - 6}px)`;
      if (corners.bl) corners.bl.style.transform = `translate(-${halfWidth + 6}px, ${halfHeight - 6}px)`;
      
      cursorWrapper.classList.add('expanded');
    };

    // 커서 초기 상태로 복원
    const resetCursor = () => {
      if (!isExpanded) return;
      
      setIsExpanded(false);
      
      // 기본 위치로 복원
      const corners = cornersRef.current;
      if (corners.tl) corners.tl.style.transform = 'translate(-150%, -150%)';
      if (corners.tr) corners.tr.style.transform = 'translate(50%, -150%)';
      if (corners.br) corners.br.style.transform = 'translate(50%, 50%)';
      if (corners.bl) corners.bl.style.transform = 'translate(-150%, 50%)';
      
      cursorWrapper.classList.remove('expanded');
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousemove', handleMouseMove);
    setupHoverElements();

    // 초기 위치 설정
    updateCursorPosition();

    // MutationObserver로 동적 요소 감지
    const observer = new MutationObserver(setupHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // 정리
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y, isExpanded]);

  // 기본 커서 숨김 스타일 적용
  useEffect(() => {
    if (hideDefaultCursor) {
      const style = document.createElement('style');
      style.textContent = `
        * { cursor: none !important; }
        input, textarea, [contenteditable] { cursor: text !important; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
          .target-cursor-wrapper { display: none !important; }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, [hideDefaultCursor]);

  // 모바일에서는 렌더링하지 않음
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <div 
      ref={cursorWrapperRef}
      className={`target-cursor-wrapper ${isExpanded ? 'expanded' : ''}`}
    >
      {/* 중앙 점 */}
      <div 
        ref={dotRef}
        className="target-cursor-dot"
        style={{
          background: isExpanded ? hoverColor : color
        }}
      />
      
      {/* 4개 모서리 - 원래 디자인 그대로 */}
      <div 
        ref={el => cornersRef.current.tl = el}
        className="target-cursor-corner corner-tl"
        style={{
          borderColor: isExpanded ? hoverColor : color
        }}
      />
      
      <div 
        ref={el => cornersRef.current.tr = el}
        className="target-cursor-corner corner-tr"
        style={{
          borderColor: isExpanded ? hoverColor : color
        }}
      />
      
      <div 
        ref={el => cornersRef.current.br = el}
        className="target-cursor-corner corner-br"
        style={{
          borderColor: isExpanded ? hoverColor : color
        }}
      />
      
      <div 
        ref={el => cornersRef.current.bl = el}
        className="target-cursor-corner corner-bl"
        style={{
          borderColor: isExpanded ? hoverColor : color
        }}
      />
    </div>
  );
};

export default TargetCursor;