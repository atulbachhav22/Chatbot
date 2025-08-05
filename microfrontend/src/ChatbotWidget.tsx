import React, { useState, useEffect, useRef } from 'react';
import './ChatbotWidget.css';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TachyonResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotWidgetProps {
  apiKey: string;
  apiUrl?: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  welcomeMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  apiKey,
  apiUrl = 'https://api.tachyon.chat/v1/chat/completions',
  theme = 'light',
  position = 'bottom-right',
  primaryColor = '#3B82F6',
  title = 'AI Assistant',
  subtitle = 'Online',
  placeholder = 'Type your message...',
  welcomeMessage = "Hello! I'm your AI assistant. How can I help you today?",
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize conversation with system message and welcome message
    setConversationHistory([{
      role: 'system',
      content: 'You are a helpful AI assistant. Provide concise, friendly, and helpful responses.'
    }]);

    setMessages([{
      id: 0,
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setMessageId(1);
  }, [welcomeMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || isTyping) return;

    const userMessage = currentMessage;
    const newUserMessage: Message = {
      id: messageId,
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessageId(prev => prev + 1);
    setCurrentMessage('');
    setIsTyping(true);

    // Add user message to conversation history
    const updatedHistory = [...conversationHistory, { role: 'user' as const, content: userMessage }];
    setConversationHistory(updatedHistory);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: updatedHistory,
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TachyonResponse = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      // Add bot response to conversation history
      const finalHistory = [...updatedHistory, { role: 'assistant' as const, content: botResponse }];
      setConversationHistory(finalHistory);

      // Add bot message to UI
      const newBotMessage: Message = {
        id: messageId,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      setMessageId(prev => prev + 1);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      const errorMessage: Message = {
        id: messageId,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setMessageId(prev => prev + 1);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const positionClass = position === 'bottom-left' ? 'chatbot-bottom-left' : 'chatbot-bottom-right';
  const themeClass = theme === 'dark' ? 'chatbot-dark' : 'chatbot-light';

  return (
    <div 
      className={`chatbot-container ${positionClass} ${themeClass} ${className}`} 
      style={{ '--primary-color': primaryColor, ...style } as React.CSSProperties}
    >
      {/* Floating Action Button */}
      <button 
        className={`fab ${isOpen ? 'active' : ''}`}
        onClick={toggleChatbot}
        type="button"
        aria-label="Toggle chatbot"
      >
        {!isOpen ? (
          <svg className="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        ) : (
          <svg className="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
      </button>

      {/* Chatbot Popup */}
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="header-info">
            <div className="avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="header-text">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChatbot} type="button" aria-label="Close chatbot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`message-wrapper ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper bot-message">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <form onSubmit={sendMessage} className="input-form">
            <input 
              type="text" 
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={placeholder}
              className="message-input"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="send-btn" 
              disabled={!currentMessage.trim() || isTyping}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;