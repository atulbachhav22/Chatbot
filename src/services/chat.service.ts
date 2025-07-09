import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.tachyon.chat/v1/chat/completions';
  private apiKey = environment.tachyonApiKey;

  constructor(private http: HttpClient) {}

  sendMessage(messages: ChatMessage[]): Observable<TachyonResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 150,
      temperature: 0.7
    };

    return this.http.post<TachyonResponse>(this.apiUrl, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong with the chat service. Please try again.'));
  }
}