import { Component, ElementRef, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
// Import the chatbot widget (in a real scenario, this would be from npm package)
// import { ChatbotWidget } from '@your-org/chatbot-widget';

// For demo purposes, we'll import from the local chatbot project
import { ChatbotWidget } from '../../../../chatbot-microfrontend/src/components/ChatbotWidget';

@Component({
  selector: 'app-chatbot',
  template: '<div class="chatbot-wrapper"></div>',
  standalone: true,
  styles: [`
    .chatbot-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ChatbotWrapperComponent implements OnInit, OnDestroy, OnChanges {
  @Input() apiKey!: string;
  @Input() apiUrl?: string;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() primaryColor = '#3B82F6';
  @Input() title = 'AI Assistant';
  @Input() subtitle = 'Online';
  @Input() placeholder = 'Type your message...';
  @Input() welcomeMessage = "Hello! I'm your AI assistant. How can I help you today?";

  private root: Root | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const container = this.elementRef.nativeElement.querySelector('.chatbot-wrapper');
    if (container) {
      this.root = createRoot(container);
      this.renderReactComponent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.root) {
      this.renderReactComponent();
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  private renderReactComponent() {
    if (this.root && this.apiKey) {
      this.root.render(
        React.createElement(ChatbotWidget, {
          apiKey: this.apiKey,
          apiUrl: this.apiUrl,
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