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
}