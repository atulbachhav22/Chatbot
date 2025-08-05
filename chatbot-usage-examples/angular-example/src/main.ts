import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ChatbotWrapperComponent } from './components/ChatbotWrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatbotWrapperComponent],
  template: `
    <div class="app-container">
      <div class="content">
        <h1>Angular Chatbot Integration</h1>
        <p>This is an Angular application with the React chatbot widget integrated</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <h3>🅰️ Angular Integration</h3>
            <p>React chatbot seamlessly integrated into Angular</p>
          </div>
          <div class="feature-card">
            <h3>🔧 Micro Frontend</h3>
            <p>Standalone component that works across frameworks</p>
          </div>
          <div class="feature-card">
            <h3>⚡ Performance</h3>
            <p>Optimized for fast loading and smooth interactions</p>
          </div>
        </div>
      </div>
      
      <app-chatbot
        apiKey="YOUR_TACHYON_API_KEY_HERE"
        theme="light"
        position="bottom-right"
        primaryColor="#764ba2"
        title="Angular Assistant"
        subtitle="Powered by Angular"
        placeholder="Ask me anything..."
        welcomeMessage="Hello! I'm integrated into this Angular app. How can I help you?">
      </app-chatbot>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      padding: 40px 20px;
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      color: white;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .feature-card {
      background: white;
      color: #333;
      padding: 30px 20px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
    }

    .feature-card h3 {
      margin-bottom: 12px;
      font-size: 1.3rem;
    }

    .feature-card p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {}

bootstrapApplication(App);