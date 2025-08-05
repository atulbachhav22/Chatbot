# Chatbot Micro Frontend Projects

This repository contains two separate projects demonstrating a React chatbot widget as a micro frontend component.

## Project Structure

```
├── chatbot-microfrontend/          # Standalone React chatbot widget
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatbotWidget.tsx
│   │   │   └── ChatbotWidget.css
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── rollup.config.js
│
└── chatbot-usage-examples/         # Examples of using the chatbot
    ├── react-example/              # React integration example
    │   ├── src/
    │   │   ├── App.tsx
    │   │   ├── main.tsx
    │   │   └── index.css
    │   ├── package.json
    │   └── vite.config.ts
    │
    └── angular-example/             # Angular integration example
        ├── src/
        │   ├── components/
        │   │   └── ChatbotWrapper.component.ts
        │   ├── main.ts
        │   ├── index.html
        │   └── styles.css
        ├── package.json
        └── angular.json
```

## Getting Started

### 1. Chatbot Micro Frontend

The standalone React chatbot widget that can be published as an npm package.

```bash
cd chatbot-microfrontend
npm install
npm run build    # Build for production
npm run dev      # Development mode
```

### 2. React Usage Example

Example of integrating the chatbot into a React application.

```bash
cd chatbot-usage-examples/react-example
npm install
npm run dev      # Start development server
```

### 3. Angular Usage Example

Example of integrating the chatbot into an Angular application.

```bash
cd chatbot-usage-examples/angular-example
npm install
npm start        # Start development server
```

## Features

### Chatbot Widget Features
- 🤖 AI-powered conversations using Tachyon Chat API
- 🎨 Customizable themes (light/dark)
- 📱 Responsive design
- 🎯 Flexible positioning (bottom-right/bottom-left)
- 🎨 Customizable colors and branding
- 🔧 Easy integration with any framework
- ♿ Accessibility support

### Integration Features
- ⚛️ **React Integration**: Direct component usage
- 🅰️ **Angular Integration**: Wrapper component for seamless integration
- 🔧 **Framework Agnostic**: Can be integrated into any web framework
- 📦 **NPM Package Ready**: Built with Rollup for distribution
- 🎯 **TypeScript Support**: Full type safety

## Usage

### In React Applications

```tsx
import { ChatbotWidget } from '@your-org/chatbot-widget';

<ChatbotWidget 
  apiKey="your-tachyon-api-key"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6"
/>
```

### In Angular Applications

```typescript
// Component
import { ChatbotWrapperComponent } from './components/ChatbotWrapper.component';

// Template
<app-chatbot
  apiKey="your-tachyon-api-key"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6">
</app-chatbot>
```

## Configuration

Replace `YOUR_TACHYON_API_KEY_HERE` with your actual Tachyon Chat API key in the example applications.

## Publishing

To publish the chatbot widget as an npm package:

```bash
cd chatbot-microfrontend
npm run build
npm publish
```

## License

MIT