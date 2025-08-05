# React Chatbot Widget

A standalone React chatbot component that can be easily integrated into any React or Angular application as a micro frontend.

## Features

- 🤖 AI-powered conversations using Tachyon Chat API
- 🎨 Customizable themes (light/dark)
- 📱 Responsive design
- 🎯 Flexible positioning (bottom-right/bottom-left)
- 🎨 Customizable colors and branding
- 🔧 Easy integration with any framework
- ♿ Accessibility support

## Installation

```bash
npm install react react-dom
```

## Usage

### In React Applications

```tsx
import React from 'react';
import { ChatbotWidget } from './components/react-chatbot';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatbotWidget 
        apiKey="your-tachyon-api-key"
        theme="light"
        position="bottom-right"
        primaryColor="#3B82F6"
        title="AI Assistant"
        subtitle="Online"
        placeholder="Type your message..."
        welcomeMessage="Hello! How can I help you today?"
      />
    </div>
  );
}

export default App;
```

### In Angular Applications

First, create a React wrapper component:

```typescript
// react-chatbot-wrapper.component.ts
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ChatbotWidget } from '../react-chatbot';

@Component({
  selector: 'app-react-chatbot',
  template: '<div></div>',
  standalone: true
})
export class ReactChatbotWrapperComponent implements OnInit, OnDestroy {
  @Input() apiKey!: string;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() primaryColor = '#3B82F6';
  @Input() title = 'AI Assistant';
  @Input() subtitle = 'Online';
  @Input() placeholder = 'Type your message...';
  @Input() welcomeMessage = "Hello! How can I help you today?";

  private root: Root | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.root = createRoot(this.elementRef.nativeElement);
    this.renderReactComponent();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private renderReactComponent() {
    if (this.root) {
      this.root.render(
        React.createElement(ChatbotWidget, {
          apiKey: this.apiKey,
          theme: this.theme,
          position: this.position,
          primaryColor: this.primaryColor,
          title: this.title,
          subtitle: this.subtitle,
          placeholder: this.placeholder,
          welcomeMessage: this.welcomeMessage
        })
      );
    }
  }
}
```

Then use it in your Angular template:

```html
<app-react-chatbot
  apiKey="your-tachyon-api-key"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6"
  title="AI Assistant"
  subtitle="Online"
  placeholder="Type your message..."
  welcomeMessage="Hello! How can I help you today?">
</app-react-chatbot>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **Required** | Your Tachyon Chat API key |
| `apiUrl` | `string` | `https://api.tachyon.chat/v1/chat/completions` | API endpoint URL |
| `theme` | `'light' \| 'dark'` | `'light'` | Widget theme |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position |
| `primaryColor` | `string` | `'#3B82F6'` | Primary color for branding |
| `title` | `string` | `'AI Assistant'` | Chatbot title |
| `subtitle` | `string` | `'Online'` | Chatbot subtitle |
| `placeholder` | `string` | `'Type your message...'` | Input placeholder text |
| `welcomeMessage` | `string` | `"Hello! I'm your AI assistant..."` | Initial welcome message |

## Styling

The component uses CSS custom properties for theming. You can override the primary color:

```css
.chatbot-container {
  --primary-color: #your-color;
}
```

## API Integration

The component is configured to work with the Tachyon Chat API. Make sure you have a valid API key from Tachyon Chat.

## Browser Support

- Modern browsers with ES6+ support
- React 16.8+ (hooks support)
- CSS custom properties support

## License

MIT