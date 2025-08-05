# Chatbot Widget Micro Frontend

A standalone React chatbot component that can be easily integrated into any web application as a micro frontend.

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
npm install @your-org/chatbot-widget
```

## Usage

### In React Applications

```tsx
import React from 'react';
import { ChatbotWidget } from '@your-org/chatbot-widget';

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

First, install React dependencies:

```bash
npm install react react-dom @types/react @types/react-dom
```

Create a wrapper component:

```typescript
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ChatbotWidget } from '@your-org/chatbot-widget';

@Component({
  selector: 'app-chatbot',
  template: '<div></div>',
  standalone: true
})
export class ChatbotWrapperComponent implements OnInit, OnDestroy {
  @Input() apiKey!: string;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() primaryColor = '#3B82F6';

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
          primaryColor: this.primaryColor
        })
      );
    }
  }
}
```

Use in your template:

```html
<app-chatbot
  apiKey="your-tachyon-api-key"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6">
</app-chatbot>
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

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

## License

MIT