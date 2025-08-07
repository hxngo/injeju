# 🎯 TargetCursor React Component

Ultra-lightweight, GPU-accelerated target cursor component for React applications.

## 🚀 Quick Start

```jsx
import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spinDuration` | `number` | `2` | Animation duration in seconds |
| `hideDefaultCursor` | `boolean` | `true` | Hide the default system cursor |
| `color` | `string` | `#66fcf1` | Primary cursor color |
| `hoverColor` | `string` | `#4de1d7` | Color when hovering over elements |
| `size` | `number` | `4` | Size of the center dot in pixels |
| `cornerSize` | `number` | `8` | Size of corner indicators in pixels |

## 🎨 Customization Examples

### Basic Usage
```jsx
<TargetCursor />
```

### Custom Colors
```jsx
<TargetCursor 
  color="#ff6b6b"
  hoverColor="#ff5252"
/>
```

### Custom Sizes
```jsx
<TargetCursor 
  size={6}
  cornerSize={12}
/>
```

### Keep Default Cursor
```jsx
<TargetCursor 
  hideDefaultCursor={false}
/>
```

## 🎯 Target Elements

Add the `cursor-target` class to any element you want the cursor to interact with:

```jsx
{/* Buttons */}
<button className="cursor-target">Interactive Button</button>

{/* Cards */}
<div className="cursor-target">
  <h3>Interactive Card</h3>
  <p>Content here...</p>
</div>

{/* Links */}
<a href="#" className="cursor-target">Interactive Link</a>

{/* Inputs */}
<input className="cursor-target" placeholder="Interactive Input" />
```

## 🔧 Automatic Detection

The cursor automatically detects these elements without needing the `cursor-target` class:
- `button`
- `.btn`, `.btn-enhanced`
- `.nav-link`
- `a` (links)
- `input`, `textarea`

## 📱 Mobile Support

The cursor automatically hides on mobile devices (screens ≤ 768px) and restores normal touch interactions.

## ♿ Accessibility

Respects user preferences:
- `prefers-reduced-motion`: Disables animations
- `prefers-contrast: high`: Uses high-contrast colors

## 🚀 Performance Features

- **GPU Acceleration**: Uses `translate3d()` for smooth animations
- **RequestAnimationFrame**: 60fps optimized rendering  
- **Memory Efficient**: Minimal DOM manipulation
- **Throttled Events**: Prevents excessive calculations
- **Automatic Cleanup**: Removes event listeners on unmount

## 📁 File Structure

```
/src
├── TargetCursor.jsx      # Main component
├── TargetCursor.css      # Component styles
├── App.jsx              # Demo application
└── App.css              # Demo styles
```

## 🎭 Component Features

### ✨ Visual Effects
- Smooth expanding animation when hovering elements
- Glowing effects with customizable colors
- Responsive sizing based on target element dimensions
- Corner indicators that adapt to element shapes

### ⚡ Performance Optimizations
- GPU-accelerated transforms
- Minimal re-renders with useRef
- Efficient event handling
- Automatic mobile detection

### 🛠 Developer Experience
- TypeScript-ready props
- CSS custom properties support
- Easy integration with existing projects
- Comprehensive prop validation

## 🎨 Styling

Override default styles by targeting these classes:

```css
.target-cursor-wrapper {
  /* Wrapper container */
}

.target-cursor-dot {
  /* Center dot */
}

.target-cursor-corner {
  /* Corner indicators */
}

.target-cursor-wrapper.expanded {
  /* Expanded state */
}
```

## 🐛 Troubleshooting

### Cursor not showing
- Ensure the component is mounted
- Check browser console for errors
- Verify you're not on a mobile device

### Performance issues
- Reduce `spinDuration` value
- Limit the number of `.cursor-target` elements
- Check for conflicting CSS animations

### Styling conflicts
- Ensure `z-index` is not being overridden
- Check for conflicting `pointer-events` CSS
- Verify `position: fixed` support

## 📄 License

MIT License - feel free to use in your projects!

## 🙋‍♂️ Contributing

Found a bug or want to add a feature? Feel free to submit issues and pull requests!
