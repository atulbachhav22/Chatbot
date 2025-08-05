import React from 'react';
// Import the chatbot widget (in a real scenario, this would be from npm package)
// import { ChatbotWidget } from '@your-org/chatbot-widget';

// For demo purposes, we'll import from the local chatbot project
import { ChatbotWidget } from '../../../chatbot-microfrontend/src/components/ChatbotWidget';

function App() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          React Chatbot Integration
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '40px',
          opacity: 0.9
        }}>
          This is a React application with the chatbot widget integrated
        </p>
        
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          color: '#333'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Features</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <h3>⚛️ React Integration</h3>
              <p>Seamlessly integrated React chatbot component</p>
            </div>
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <h3>🎨 Customizable</h3>
              <p>Fully customizable themes and colors</p>
            </div>
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <h3>📱 Responsive</h3>
              <p>Works perfectly on all device sizes</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot Widget */}
      <ChatbotWidget 
        apiKey="YOUR_TACHYON_API_KEY_HERE"
        theme="light"
        position="bottom-right"
        primaryColor="#667eea"
        title="React Assistant"
        subtitle="Powered by React"
        placeholder="Ask me anything..."
        welcomeMessage="Hello! I'm integrated into this React app. How can I help you?"
      />
    </div>
  );
}

export default App;