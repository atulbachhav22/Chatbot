import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService, ChatMessage, TachyonResponse } from '../../services/chat.service';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ChatService],
  template: `
    <div class="chatbot-container">
      <!-- Floating Action Button -->
      <button 
        class="fab" 
        (click)="toggleChatbot()"
        [class.active]="isOpen"
        type="button"
        aria-label="Toggle chatbot">
        <svg *ngIf="!isOpen" class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg *ngIf="isOpen" class="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Chatbot Popup -->
      <div class="chatbot-popup" [class.open]="isOpen">
        <div class="chatbot-header">
          <div class="header-info">
            <div class="avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="header-text">
              <h3>AI Assistant</h3>
              <p>Online</p>
            </div>
          </div>
          <button class="close-btn" (click)="toggleChatbot()" type="button" aria-label="Close chatbot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="chat-messages" #messagesContainer>
          <div 
            *ngFor="let message of messages" 
            class="message-wrapper"
            [class.user-message]="message.sender === 'user'"
            [class.bot-message]="message.sender === 'bot'">
            <div class="message-bubble">
              <p>{{ message.text }}</p>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
          </div>
          <div *ngIf="isTyping" class="message-wrapper bot-message">
            <div class="message-bubble typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <form (ngSubmit)="sendMessage()" class="input-form">
            <input 
              type="text" 
              [(ngModel)]="currentMessage" 
              placeholder="Type your message..."
              class="message-input"
              [disabled]="isTyping"
             name="messageInput"
              #messageInput>
            <button 
              type="submit" 
              class="send-btn" 
              [disabled]="!currentMessage.trim() || isTyping"
              aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .fab {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3B82F6, #1D4ED8);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1001;
    }

    .fab:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
    }

    .fab.active {
      background: linear-gradient(135deg, #EF4444, #DC2626);
    }

    .fab-icon {
      width: 24px;
      height: 24px;
    }

    .chatbot-popup {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 380px;
      max-width: calc(100vw - 40px);
      height: 500px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chatbot-popup.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      visibility: visible;
    }

    .chatbot-header {
      background: linear-gradient(135deg, #3B82F6, #1D4ED8);
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 16px 16px 0 0;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar svg {
      width: 20px;
      height: 20px;
    }

    .header-text h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .header-text p {
      margin: 0;
      font-size: 12px;
      opacity: 0.8;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s ease;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .close-btn svg {
      width: 16px;
      height: 16px;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .message-wrapper {
      display: flex;
      flex-direction: column;
    }

    .message-wrapper.user-message {
      align-items: flex-end;
    }

    .message-wrapper.bot-message {
      align-items: flex-start;
    }

    .message-bubble {
      max-width: 280px;
      padding: 12px 16px;
      border-radius: 20px;
      position: relative;
      animation: messageSlideIn 0.3s ease;
    }

    .user-message .message-bubble {
      background: linear-gradient(135deg, #3B82F6, #1D4ED8);
      color: white;
      border-bottom-right-radius: 6px;
    }

    .bot-message .message-bubble {
      background: white;
      color: #1F2937;
      border-bottom-left-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .message-bubble p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .message-time {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
      display: block;
    }

    .typing {
      background: white !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 4px 0;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #6B7280;
      animation: typing 1.4s infinite;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    .chat-input {
      padding: 20px;
      background: white;
      border-top: 1px solid #E5E7EB;
    }

    .input-form {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .message-input {
      flex: 1;
      border: 2px solid #E5E7EB;
      border-radius: 25px;
      padding: 12px 16px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .message-input:focus {
      border-color: #3B82F6;
    }

    .send-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3B82F6, #1D4ED8);
      border: none;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .send-btn:hover:not(:disabled) {
      transform: scale(1.05);
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-btn svg {
      width: 16px;
      height: 16px;
    }

    @keyframes messageSlideIn {
      from {
        transform: translateY(10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    @media (max-width: 480px) {
      .chatbot-container {
        bottom: 15px;
        right: 15px;
      }
      
      .chatbot-popup {
        width: calc(100vw - 30px);
        height: 60vh;
        max-height: 500px;
      }
    }
  `]
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: Message[] = [];
  currentMessage = '';
  isTyping = false;
  private messageId = 0;
  private conversationHistory: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Initialize conversation with system message
    this.conversationHistory.push({
      role: 'system',
      content: 'You are a helpful AI assistant. Provide concise, friendly, and helpful responses.'
    });

    // Add welcome message
    this.messages.push({
      id: this.messageId++,
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.isTyping) return;

    // Add user message
    this.messages.push({
      id: this.messageId++,
      text: this.currentMessage,
      sender: 'user',
      timestamp: new Date()
    });

    const userMessage = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;

    // Add user message to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Call Tachyon Chat API
    this.chatService.sendMessage(this.conversationHistory).subscribe({
      next: (response) => {
        const botResponse = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        
        // Add bot response to conversation history
        this.conversationHistory.push({
          role: 'assistant',
          content: botResponse
        });

        // Add bot message to UI
        this.messages.push({
          id: this.messageId++,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        });
        
        this.isTyping = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Error calling chat API:', error);
        
        // Show error message to user
        this.messages.push({
          id: this.messageId++,
          text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
          sender: 'bot',
          timestamp: new Date()
        });
        
        this.isTyping = false;
        this.scrollToBottom();
      }
    });

    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}