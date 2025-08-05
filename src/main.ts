import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactChatbotWrapperComponent } from './components/react-chatbot-wrapper/ReactChatbotWrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactChatbotWrapperComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>React Chatbot Micro Frontend Demo</h1>
        <p>Experience our React chatbot component integrated into Angular</p>
      </header>
      
      <main class="app-main">
        <div class="content-section">
          <h2>Micro Frontend Integration</h2>
          <p>This demonstrates a React chatbot component seamlessly integrated into an Angular application. The chatbot is built as a standalone React component that can be used in any framework.</p>
          
          <div class="features">
            <div class="feature-card">
              <h3>⚛️ React Component</h3>
              <p>Built with React and TypeScript for maximum compatibility and performance.</p>
            </div>
            <div class="feature-card">
              <h3>🔧 Framework Agnostic</h3>
              <p>Can be integrated into Angular, React, Vue, or any other web framework.</p>
            </div>
            <div class="feature-card">
              <h3>🎨 Highly Customizable</h3>
              <p>Supports themes, custom colors, positioning, and branding options.</p>
            </div>
          </div>
        </div>
      </main>
      
      <app-react-chatbot
        apiKey="YOUR_TACHYON_API_KEY_HERE"
        theme="light"
        position="bottom-right"
        primaryColor="#3B82F6"
        title="React AI Assistant"
        subtitle="Powered by Tachyon"
        placeholder="Ask me anything..."
        welcomeMessage="Hello! I'm a React chatbot component integrated into this Angular app. How can I help you?">
      </app-react-chatbot>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-header {
      text-align: center;
      padding: 60px 20px 40px;
      color: white;
    }

    .app-header h1 {
      font-size: 3rem;
      margin: 0 0 16px 0;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .app-header p {
      font-size: 1.2rem;
      margin: 0;
      opacity: 0.9;
    }

    .app-main {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-section {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      margin-bottom: 40px;
    }

    .content-section h2 {
      color: #1F2937;
      font-size: 2.5rem;
      margin: 0 0 20px 0;
      text-align: center;
    }

    .content-section > p {
      color: #6B7280;
      font-size: 1.1rem;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 40px;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }

    .feature-card {
      background: #F8FAFC;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      transition: transform 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
    }

    .feature-card h3 {
      color: #1F2937;
      font-size: 1.3rem;
      margin: 0 0 12px 0;
    }

    .feature-card p {
      color: #6B7280;
      margin: 0;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .app-header h1 {
        font-size: 2rem;
      }
      
      .content-section {
        padding: 24px;
      }
      
      .content-section h2 {
        font-size: 2rem;
      }
      
      .features {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {
  name = 'React Chatbot Micro Frontend';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});