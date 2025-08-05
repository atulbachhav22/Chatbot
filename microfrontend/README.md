# Chatbot Widget Micro Frontend

A standalone React chatbot widget that can be easily integrated into any React, Angular, Vue, or vanilla JavaScript application as a micro frontend.

## 🚀 Features

- **Framework Agnostic**: Works with React, Angular, Vue, or vanilla JS
- **AI-Powered**: Integrates with Tachyon Chat API
- **Customizable**: Themes, colors, positioning, and branding
- **Responsive**: Mobile-friendly design
- **TypeScript**: Full type safety
- **Zero Dependencies**: Only requires React as peer dependency

## 📦 Installation

### As NPM Package

```bash
npm install @your-org/chatbot-widget
```

### As Standalone Script (CDN)

```html
<script src="https://unpkg.com/@your-org/chatbot-widget/dist/chatbot-widget.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@your-org/chatbot-widget/dist/style.css">
```

## 🔧 Usage

### React Application

```tsx
import React from 'react';
import { ChatbotWidget } from '@your-org/chatbot-widget';

function App() {
  return (
    <div>
      <h1>My React App</h1>
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

### Angular Application

First, install and create a wrapper component:

```typescript
// chatbot-wrapper.component.ts
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
<app-chatbot
  apiKey="your-tachyon-api-key"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6"
  title="AI Assistant">
</app-chatbot>
```

### Vue.js Application

```vue
<template>
  <div>
    <h1>My Vue App</h1>
    <div ref="chatbotContainer"></div>
  </div>
</template>

<script>
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatbotWidget } from '@your-org/chatbot-widget';

export default {
  name: 'App',
  mounted() {
    const root = createRoot(this.$refs.chatbotContainer);
    root.render(
      React.createElement(ChatbotWidget, {
        apiKey: 'your-tachyon-api-key',
        theme: 'light',
        position: 'bottom-right',
        primaryColor: '#3B82F6',
        title: 'AI Assistant'
      })
    );
  }
}
</script>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@your-org/chatbot-widget/dist/style.css">
</head>
<body>
  <div id="app">
    <h1>My Vanilla JS App</h1>
    <div id="chatbot-container"></div>
  </div>

  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@your-org/chatbot-widget/dist/chatbot-widget.umd.js"></script>
  
  <script>
    const container = document.getElementById('chatbot-container');
    const root = ReactDOM.createRoot(container);
    
    root.render(
      React.createElement(ChatbotWidget, {
        apiKey: 'your-tachyon-api-key',
        theme: 'light',
        position: 'bottom-right',
        primaryColor: '#3B82F6',
        title: 'AI Assistant'
      })
    );
  </script>
</body>
</html>
```

## 🎛️ Props

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
| `className` | `string` | `''` | Additional CSS class |
| `style` | `React.CSSProperties` | `{}` | Additional inline styles |

## 🎨 Customization

### Custom Colors

```tsx
<ChatbotWidget 
  apiKey="your-api-key"
  primaryColor="#FF6B6B"  // Custom red color
/>
```

### Custom Styling

```tsx
<ChatbotWidget 
  apiKey="your-api-key"
  className="my-custom-chatbot"
  style={{ zIndex: 9999 }}
/>
```

```css
.my-custom-chatbot {
  --primary-color: #FF6B6B;
}

.my-custom-chatbot .fab {
  width: 70px;
  height: 70px;
}
```

## 🏗️ Building from Source

```bash
# Clone the repository
git clone https://github.com/your-org/chatbot-widget.git
cd chatbot-widget

# Install dependencies
npm install

# Build the package
npm run build

# The built files will be in the `dist` directory
```

## 📝 Development

```bash
# Start development server
npm run dev

# Build and watch for changes
npm run build:watch
```

## 🤝 Integration Patterns

### Module Federation (Webpack 5)

```javascript
// webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        chatbot: 'chatbot@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};
```

### Single-SPA

```javascript
// chatbot.app.js
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'chatbot',
  app: () => import('@your-org/chatbot-widget'),
  activeWhen: ['/'],
});

start();
```

## 🔒 Security

- API keys should be stored securely (environment variables)
- Consider implementing rate limiting
- Validate and sanitize user inputs
- Use HTTPS for all API communications

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- GitHub Issues: [Report bugs or request features](https://github.com/your-org/chatbot-widget/issues)
- Documentation: [Full documentation](https://your-org.github.io/chatbot-widget)
- Email: support@your-org.com