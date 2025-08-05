// React Integration Example
import React from 'react';
import { ChatbotWidget } from '@your-org/chatbot-widget';

function App() {
  return (
    <div className="app">
      <header>
        <h1>My React Application</h1>
      </header>
      
      <main>
        <p>This is my main application content.</p>
      </main>
      
      {/* Chatbot Widget - Micro Frontend */}
      <ChatbotWidget 
        apiKey={process.env.REACT_APP_TACHYON_API_KEY}
        theme="light"
        position="bottom-right"
        primaryColor="#3B82F6"
        title="Support Assistant"
        subtitle="Online"
        placeholder="How can we help you?"
        welcomeMessage="Welcome! I'm here to help you with any questions."
      />
    </div>
  );
}

export default App;