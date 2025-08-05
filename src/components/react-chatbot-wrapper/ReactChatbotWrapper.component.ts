import { Component, ElementRef, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ChatbotWidget } from '../react-chatbot';

@Component({
  selector: 'app-react-chatbot',
  template: '<div class="react-chatbot-container"></div>',
  standalone: true,
  styles: [`
    .react-chatbot-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ReactChatbotWrapperComponent implements OnInit, OnDestroy, OnChanges {
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
    const container = this.elementRef.nativeElement.querySelector('.react-chatbot-container');
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