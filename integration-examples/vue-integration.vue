<!-- Vue.js Integration Example -->
<template>
  <div id="app">
    <header>
      <h1>My Vue Application</h1>
    </header>
    
    <main>
      <p>This is my main application content.</p>
    </main>
    
    <!-- Chatbot Widget Container -->
    <div ref="chatbotContainer" class="chatbot-mount-point"></div>
  </div>
</template>

<script>
import React from 'react';
import { createRoot } from 'react-dom/client';

export default {
  name: 'App',
  data() {
    return {
      chatbotRoot: null,
      apiKey: process.env.VUE_APP_TACHYON_API_KEY
    };
  },
  async mounted() {
    await this.loadChatbotWidget();
  },
  beforeUnmount() {
    if (this.chatbotRoot) {
      this.chatbotRoot.unmount();
    }
  },
  methods: {
    async loadChatbotWidget() {
      try {
        // Dynamic import of the micro frontend
        const { ChatbotWidget } = await import('@your-org/chatbot-widget');
        
        // Create React root and render the component
        this.chatbotRoot = createRoot(this.$refs.chatbotContainer);
        this.chatbotRoot.render(
          React.createElement(ChatbotWidget, {
            apiKey: this.apiKey,
            theme: 'light',
            position: 'bottom-right',
            primaryColor: '#42b883', // Vue green
            title: 'Vue Assistant',
            subtitle: 'Powered by Vue + React',
            placeholder: 'Type your message...',
            welcomeMessage: 'Hello from Vue! How can I assist you today?'
          })
        );
      } catch (error) {
        console.error('Failed to load chatbot widget:', error);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chatbot-mount-point {
  /* Ensure the chatbot has a proper mounting point */
  position: relative;
}
</style>