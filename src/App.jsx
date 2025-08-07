import React from 'react'
import TargetCursor from './components/TargetCursor'
import './App.css'

function App() {
  return (
    <div className="App">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      {/* Demo Content */}
      <div className="content">
        <header className="header">
          <h1 className="title cursor-target">React Bits Target Cursor</h1>
          <p className="subtitle">Official Implementation from reactbits.dev</p>
        </header>
        
        <main className="main">
          <div className="demo-section">
            <h2>Interactive Elements</h2>
            <div className="button-group">
              <button className="demo-button primary cursor-target">Hover & Click Me!</button>
              <button className="demo-button secondary cursor-target">Another Button</button>
              <button className="demo-button accent cursor-target">Special Effect</button>
            </div>
          </div>
          
          <div className="demo-section">
            <h2>Cards & Links</h2>
            <div className="card-grid">
              <div className="demo-card cursor-target">
                <h3>Interactive Card 1</h3>
                <p>Move your mouse over this card to see the fluid dynamics in action.</p>
                <a href="#" className="card-link cursor-target">Learn More</a>
              </div>
              
              <div className="demo-card cursor-target">
                <h3>Interactive Card 2</h3>
                <p>Hover over elements to see the precise targeting cursor effect.</p>
                <a href="#" className="card-link cursor-target">Explore</a>
              </div>
              
              <div className="demo-card cursor-target">
                <h3>Interactive Card 3</h3>
                <p>This is the official React Bits implementation - not a recreation!</p>
                <a href="#" className="card-link cursor-target">Documentation</a>
              </div>
            </div>
          </div>
          
          <div className="demo-section">
            <h2>Large Interactive Area</h2>
            <div className="large-area">
              <div className="area-content">
                <h3>🎨 Fluid Canvas</h3>
                <p>Move your mouse around this area</p>
                <p>Move cursor to see targeting animation</p>
                <p>Experience real-time fluid dynamics</p>
                <p>🎯 Hover over me for Target Cursor effect!</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="footer">
          <p>
            Powered by <strong>React Bits</strong> - 
            <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer">
              Visit reactbits.dev
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App