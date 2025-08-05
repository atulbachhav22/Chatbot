// Angular Integration Example
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';

// Import the React component
declare const ChatbotWidget: any;

@Component({
  selector: 'app-chatbot-widget',
  template: '<div class="chatbot-wrapper"></div>',
  styleUrls: ['./chatbot-wrapper.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    // Load the React component dynamically
    this.loadChatbotWidget();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private async loadChatbotWidget() {
    try {
      // Dynamic import of the micro frontend
      const { ChatbotWidget } = await import('@your-org/chatbot-widget');
      
      this.root = createRoot(this.elementRef.nativeElement.querySelector('.chatbot-wrapper'));
      this.renderReactComponent(ChatbotWidget);
    } catch (error) {
      console.error('Failed to load chatbot widget:', error);
    }
  }

  private renderReactComponent(ChatbotWidget: any) {
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

// Usage in Angular template:
/*
<app-chatbot-widget
  [apiKey]="tachyonApiKey"
  theme="light"
  position="bottom-right"
  primaryColor="#3B82F6"
  title="Support Bot"
  subtitle="Always here to help"
  placeholder="Ask me anything..."
  welcomeMessage="Hi! I'm your virtual assistant. How can I help you today?">
</app-chatbot-widget>
*/