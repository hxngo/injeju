import React from 'react';
import TargetCursor from './TargetCursor';
import './App.css';

export default function App() {
  return (
    <div className="app">
      {/* 🎯 Target Cursor Component - 정확히 요청하신 방식! */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      {/* Demo Content */}
      <div className="demo-container">
        <h1>Hover over the elements below</h1>
        
        <div className="demo-grid">
          {/* 정확히 요청하신 예제들 */}
          <button className="cursor-target">Click me!</button>
          <div className="cursor-target">Hover target</div>
          
          {/* 추가 데모 요소들 */}
          <button className="cursor-target demo-btn primary">
            Another Button
          </button>
          
          <div className="cursor-target demo-card">
            <h3>Interactive Card</h3>
            <p>Watch the cursor expand to fit this element!</p>
          </div>
          
          <a href="#" className="cursor-target demo-link">
            Link Element
          </a>
          
          <input 
            type="text" 
            placeholder="Input field..." 
            className="cursor-target demo-input"
          />
          
          <div className="cursor-target demo-large">
            <h2>Large Target Area</h2>
            <p>The cursor adapts to different element sizes</p>
            <p>✨ Original design preserved</p>
            <p>🎯 Mix-blend-mode: difference</p>
            <p>⚡ Smooth corner animations</p>
          </div>
        </div>
        
        <div className="demo-info">
          <h3>원래 디자인 특징:</h3>
          <ul>
            <li>🎨 mix-blend-mode: difference 효과</li>
            <li>⚪ 흰색 중앙 점과 모서리</li>
            <li>📐 정확한 코너 위치 (translate -150%, 50% 등)</li>
            <li>🎯 요소 크기에 맞춘 정확한 확장</li>
            <li>📱 모바일에서 자동 숨김</li>
            <li>⚡ GPU 가속 최적화</li>
          </ul>
        </div>
      </div>
    </div>
  );
}