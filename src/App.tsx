import React from 'react';
import { ChatbotWidget } from './components/react-chatbot';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Chatbot Micro Frontend Demo</h1>
        <p>Experience our React chatbot component integrated into a React application</p>
      </header>
      
      <main className="app-main">
        <div className="content-section">
          <h2>Micro Frontend Integration</h2>
          <p>This demonstrates a React chatbot component that can be seamlessly integrated into any React or Angular application. The chatbot is built as a standalone React component that can be used in any framework.</p>
          
          <div className="features">
            <div className="feature-card">
              <h3>⚛️ React Component</h3>
              <p>Built with React and TypeScript for maximum compatibility and performance.</p>
            </div>
            <div className="feature-card">
              <h3>🔧 Framework Agnostic</h3>
              <p>Can be integrated into Angular, React, Vue, or any other web framework.</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Highly Customizable</h3>
              <p>Supports themes, custom colors, positioning, and branding options.</p>
            </div>
          </div>
        </div>
      </main>
      
      <ChatbotWidget
        apiKey="YOUR_TACHYON_API_KEY_HERE"
        theme="light"
        position="bottom-right"
        primaryColor="#3B82F6"
        title="React AI Assistant"
        subtitle="Powered by Tachyon"
        placeholder="Ask me anything..."
        welcomeMessage="Hello! I'm a React chatbot component. How can I help you?"
      />
    </div>
  );
}

export default App;